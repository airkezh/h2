/*common*/
var undefined = void 0
var POLLINGAP = 3000
var WHISTLE   = {
    "host": "pigeon.w.meilishuo.com"
}
//	WHISTLE.init = "//" + WHISTLE.host + "/init"

var BEHOST

/*tools*/
var util = {
    toArray: function( colletions, offset ) {
        return Array.prototype.slice.call( colletions, offset || 0 )
    }
    , isArray: function( obj ) {
        return _detectType( obj, 'Array' )
    }
}

/*tools end*/
/*emmiter*/
var evts      = {}
    , onceTag = '__event_once'

function emit( event ) {
    var args = util.toArray( arguments, 1 )
    if ( !(event in evts) ) return
    var _dels = []
    for ( var i = 0, j = evts[ event ].length; i < j; i++ ) {
        var cbk = evts[ event ][ i ]
        if ( !cbk ) return
        cbk.apply( null, args )
        if ( cbk[ onceTag ] ) {
            evts[ event ][ i ] = null
            _dels.push( i )
        }
    }
    for ( var i = _dels.length - 1; i >= 0; i-- ) evts[ event ].splice( _dels[ i ], 1 )
}

function addListener( event, listener, once ) {


    if ( !(event in evts) ) evts[ event ] = []
    if ( once ) listener[ onceTag ] = true
    evts[ event ].push( listener )
}

function removeListener( event, listener ) {
    if ( !listener ) {
        delete evts[ event ]
        return
    }
    for ( var i = evts[ event ].length - 1; i >= 0; i-- ) {
        if ( evts[ event ][ i ] === listener ) {
            evts[ event ].splice( i, 1 );
            break
        }
    }
}

function listeners( event ) {
    return evts[ event ]
}

var emitter = {
    on: addListener
    , once: function( event, listener ) {
        addListener( event, listener, true )
    }
    , emit: emit
    , removeListener: removeListener
    , off: removeListener
    , listeners: listeners
}
/*emiter end */

var beid
    , roomid
    , guid
    , last_trace_id  = ''
    , appendArgs     = {}
    , _hangUpPolling = false
    , stat           = 0 //0 not work,1 inited ,2 connected


function http_build_query( params ) {
    var qs = []
    for ( var k in params ) qs.push( encodeURIComponent( k ) + '=' + encodeURIComponent( params[ k ] ) )
    return qs.join( '&' )
}

function _appendUrl( url, append ) {
    return (url.indexOf( '?' ) < 0 ? '?' : '&') + append
}

function request( opt, cbk ) {
    var method = opt.method || 'GET'
        , url  = opt.url || 'http://' + opt.host + opt.path
        , data

    var data = opt.data || null
    if ( appendArgs ) {
        if ( !data ) data = opt.data = {}
        data.appendArgs = JSON.stringify( appendArgs )
    }

    var xhr = new XMLHttpRequest()
    try {
        if ( !opt.noCookie ) xhr.withCredentials = true
    }catch(e) {}

    if ( !xhr ) return cbk && cbk( 'HttpRequest is not working' )
    if ( opt.data ) data = http_build_query( opt.data )
    if ( 'POST' != method && data ) {
        url += _appendUrl( url, data )
        data = null
    }
    xhr.open( method, url, true )
    if ( 'POST' == method ) xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )


    xhr.onreadystatechange = handler
    xhr.send( data )

    function handler( evtXHR ) {
        if ( xhr.readyState != 4 ) return
        if ( xhr.status != 200 ) return cbk( 'request status:' + xhr.status )
        var response = xhr.responseText
            , ret
        try {
            ret = JSON.parse( response )
        } catch ( err ) {
        }
        cbk && cbk( ret ? null : 'parse error', ret )
    }
}

//发送给谁， 类型 ， 内容
function send( toid, type, content, opts ) {
    request( {
        host: WHISTLE.host
        , path: '/send'
        , method: 'POST'
        , data: {
            be: beid
            , roomid: roomid
            , guid: guid
            , sendto: toid
            , type: type
            , con: content
        }
    }, function( err, res ) {

    } )

}

function pull( trace_start, trace_end, limit, cbk, appendParams ) {
    var params = {
        be: beid
        , roomid: roomid
        , guid: guid,
        _timestamp: +new Date
    }
    if ( limit > 0 ) params.limit = limit
    if ( trace_start ) params.trace_startid = trace_start
    if ( trace_end ) params.trace_endid = trace_end

    request( {
        host: WHISTLE.pullServer
        , path: '/pull'
        , data: params
    }, cbk )

}

//处理拉到的数据
function filterPullData( err, res, cbk ) {
    //update last_trace_id
    if ( err ) {
        emitter.emit( 'error', err )
    } else {
        if ( res.last_trace_id ) {
            last_trace_id = res.last_trace_id
        }
        emitter.emit( 'data', res.raw_data )
    }
    cbk && cbk()
}

//ajax 轮询
function polling( opt ) {
    var _tr
    var gap       = opt.gap
        , pullNum = opt.pullNum

    function callBE() {
        _tr && window.clearTimeout( _tr )
        if ( _hangUpPolling ) {
            _tr = window.setTimeout( callBE, gap )
            return
        }
        pull( last_trace_id, null, pullNum, function( err, res ) {
            filterPullData( err, res, function() {
                _tr = window.setTimeout( callBE, gap )
            } )
        } )
    }

    callBE()
    //emitter.emit('data' , data)
}

//websocket
function connWS( opt ) {
    try {
        var ws       = new WebSocket( opt.wsServer )
        var fallBack = opt && opt.fallBack
    } catch ( err ) {
        //fallback to polling
        //emitter.emit('error' ,err)
        fallBack && fallBack()
    }

    ws.onopen    = function() {
    }
    ws.onclose   = function() {
        fallBack && fallBack()
    }
    ws.onmessage = function( evt ) {
        if ( '--' == evt.data.slice( 0, 2 ) ) {
            console.log( evt.data )
            return
        }
        var err
        try {
            var data = JSON.parse( evt.data )
        } catch ( e ) {
            err = e
        }
        filterPullData( err, data )
    }
    ws.onerror   = function( evt ) {
        //fallback to polling
        emitter.emit( 'error', evt )
    }
}

function eventOn( name, fnc ) {
    emitter.on( name, fnc )
}

function eventOnce( name, fnc ) {
    emitter.once( name, fnc )
}

/*
 *business 业务id
 *roomid   房间id
 *appendArgs 附加参数 {'access_token':1}
 **/

function init( opt ) {
    opt        = opt || {}
    appendArgs = opt.appendArgs || {}
    roomid     = opt.room

    if ( opt.whistleServer ) {
        WHISTLE.host = opt.whistleServer
    }

    window.setTimeout( function() {
        request( {
            host: WHISTLE.host
            , path: '/init'
            , data: {
                "business": opt.business
                , "roomid": roomid
                , "supportWS": ''//!!window.WebSocket
            }
        }, function( err, res ) {
            if ( err || res.error ) return emitter.emit( 'error', err || res.error )
            var serverOpt = res.opt
            beid          = serverOpt.be
            guid          = serverOpt.guid

            WHISTLE.pullServer = serverOpt.pserver

            var pullOpt = {
                "gap": serverOpt.gap || POLLINGAP
                , "pullNum": serverOpt.pullNum || 10
            }

            switch ( serverOpt.conn ) {
                case 'polling':
                    polling( pullOpt )
                    break
                case 'ws':
                    pull( last_trace_id, null, pullOpt.pullNum, filterPullData )
                    //
                    connWS( {
                        "wsServer": serverOpt.wsServer,
                        "fallback": function() {
                            polling( pullOpt )
                        }
                    } )

                    break
            }
            emitter.emit( 'ready' )
        } )

    }, 0 )

    return {
        "send": send
        , "on": eventOn
        , "once": eventOnce
        , "pull": pull
        , "switchPull": function( stop ) {
            _hangUpPolling = !stop
        }
        , "updateLastTraceId": function( id ) {
            last_trace_id = id
        }
    }
}

exports.init = init
