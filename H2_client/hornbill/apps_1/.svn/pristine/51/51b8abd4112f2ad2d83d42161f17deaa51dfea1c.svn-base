/*common*/

require( 'wap/page/mainapp/audio' )

var $              = require( 'wap/zepto/touch' ),
    ShareTmp       = require( 'wap/component/shareTmp' ),
    WindowScroll   = require( 'wap/component/windowScroll' ),
    GoTop          = require( 'wap/component/gotop' ),
    OpenAppLink    = require( 'wap/app/openAppLink' ),

    $win           = $( window ),
    $doc           = $( document ),
    $main          = $doc.find( '.js-main' ),
    $loadingBar    = $( '#loading-bar' ),

    documentHeight = $doc.height(),
    traceId        = fml.vars.trace,
    offset         = fml.vars.offset,
    isLoading      = false,

    MIN_OFFSET     = 3 * $win.height(),
    TIME_GAP       = 1000,

    timeoutID

function getAppLink( protocal, params ) {
    return OpenAppLink.getAppLink( {
        protocol: protocal,
        param: params
    } )
}

function parseTime( time ) {
    var date = new Date( 1000 * time ),
        text = (date.getMonth() + 1) + '月' + date.getDate() + '日'

    if ( date.getFullYear() === (new Date).getFullYear() ) {
        return text
    } else {
        return date.getFullYear() + '年' + text
    }
}

function parseAudioDuration( duration ) {
    var MINUTE = 60,
        mins, remain

    if ( duration < MINUTE ) {
        return duration + '\'\''
    } else {
        mins   = parseInt( duration / MINUTE, 10 )
        remain = duration - mins * MINUTE
        return mins + '\'' + ( remain ? remain + '"' : '' )
    }
}

function fetch() {
    if ( isLoading ) {
        return
    }

    $loadingBar.attr( 'status', 'loading' )
    isLoading = true

    $.ajax( {
        url: '/aj/mainapp/index',
        method: 'get',
        dataType: 'json',
        data: {
            trace: traceId,
            limit: 10,
            is_after: 1,
            offset: offset
        },
        success: function( data ) {
            var list

            isLoading = false

            if ( data.list && data.list.length ) {
                list           = data.list
                $main.append( ShareTmp( 'circle-list-tmpl', {
                    circles: list,
                    parseTime: parseTime,
                    parseAudioDuration: parseAudioDuration,
                    getAppLink: getAppLink
                } ) )
                traceId        = data.trace
                offset += list.length
                documentHeight = $doc.height()
                $loadingBar.attr( 'status', 'stop' )
                $doc.triggerHandler( 'audio-preload' )
            }
        }
    } )
}

;
(function init() {
    var $gotop      = $doc.find( '.gotop-wrap' ),
        isGotopHide = true

    GoTop.init( {
        el: $gotop
    } )

    /**
     * 使用 isGotopHide 来避免对 DOM 的过多操作(其实没什么必要……)
     */
    WindowScroll.bind( function( pos, isDown ) {
        if ( pos < 400 ) {
            if ( !isGotopHide ) {
                $gotop.hide()
                isGotopHide = true
            }
        } else {
            if ( isDown ) {
                if ( !isGotopHide ) {
                    $gotop.hide()
                    isGotopHide = true
                }
            } else if ( isGotopHide ) {
                $gotop.show()
                isGotopHide = false
            }
        }
    }, 'gotop-wrap' )

    $win.on( 'scroll', function() {
        clearTimeout( timeoutID )

        timeoutID = setTimeout( function() {
            if ( documentHeight - $win.scrollTop() <= MIN_OFFSET ) {
                fetch()
            }
        }, TIME_GAP )
    } )

    /**
     * node 会加载第一屏，所以得手动触发转音频格式事件
     */
    $doc.triggerHandler( 'audio-preload' )
}())
