/*common*/
/**
 * TODO:
 *      跳转至其他页面再返回到当前页，无法记录上一次浏览的位置。
 */

require( 'circle/page/chat/audio' )

var $                = require( 'circle/zepto' ),
    ShareTmp         = require( 'circle/component/shareTmp' ),
    Like             = require( 'circle/app/like' ),
    Message          = require( 'circle/page/chat/message' ),
    Time             = require( 'circle/page/chat/time' ),
    pigeon           = require( 'circle/page/chat/pigeon' ),
    OpenAppLink      = require( 'circle/app/openAppLink' ),
    Escape           = require( 'circle/core/escape' ),

    $doc             = $( document ),
    $scrollWrap      = $( window ),
    $loadingBar      = $( '#loading-bar' ),
    circleID         = fml.vars.circle_id,
    adminId          = fml.vars.circle_admin_id,

    duplicateIDs     = {
        length: 0
    },

    mineID           = Meilishuo.config.user_id,
    isLoadingHistory = false,
    isNoMoreHistory  = false,
    isOnlyLoadOnce   = false, //如果用户未登录或未加入圈子，那只加载一次就停止

    /**
     * ios 下进行音频格式转换
     */
    AUDIO_PRELOAD    = 'audio-preload',
    LIMIT            = 10,
    MIN_TOP_OFFSET   = 2,
    FETCH_TIMEOUT    = 300,
    SCROLL_HISTORY   = 'scroll.history',

    IS_LIKE          = 'is-like',
    NOT_LIKE         = 'not-like',
    LIKE_NUM         = '.js-num',

    $main, mainEl, $el, MSG, updateTimeFn, updateTimeID,
    traceStartId, traceEndId, fetchID

function getAppLink( protocal, params ) {
    return OpenAppLink.getAppLink( {
        protocol: protocal,
        param: params
    } )
}

/**
 * 解析音频播放时长
 * @param duration
 * @returns {string}
 */
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

/**
 * element.scrollTo() 在移动端不存在,所以采用 scrollIntoView
 */
function scrollDown() {
    $el.children().last()[ 0 ].scrollIntoView()
}

/**
 * 将新增信息追加到显示区域后面
 * @param html
 */
function append( html ) {
    if ( html ) {
        $el.append( html )
    }

    /**
     * 没登录或没加入就不滚动底部了。
     */
    !isOnlyLoadOnce && scrollDown()
}

/**
 * 历史信息插入到显示区域前面
 * @param html
 */
function prepend( html ) {
    if ( html ) {
        $el.prepend( html )
    }
}

/**
 * 根据消息的不同类型构建 html 字符串
 */
function constructHTML( datas ) {
    var i    = 0,
        len  = datas.length,
        html = '',
        uid, msg

    for ( ; i < len; i++ ) {
        msg = datas[ i ]
        uid = msg.uinfo.user_id
        /**
         * 处理 emoji 表情,发送的时候要转码,接收以后再转回去
         * 客户端暂时也不支持 emoji,所以这里就不改了.
         */
        html += ShareTmp( 'message', {
            msg: msg,
            isMine: mineID == uid,
            isAdmin: uid == adminId,
            getAppLink: getAppLink,
            parseAudioDuration: parseAudioDuration,
            escape: Escape.escape
        } )
    }

    return html
}

/**
 * 获取历史消息
 */
function fetchHistory() {
    $loadingBar.attr( 'status', 'loading' )

    if ( isNoMoreHistory ) {
        $scrollWrap.off( SCROLL_HISTORY )
    }

    MSG.pull( null, traceStartId, LIMIT, function( err, data ) {
        var list
        isLoadingHistory = false
        $loadingBar.attr( 'status', 'stop' )

        if ( err ) {
            return
        }

        list = data.raw_data
        if ( list.length ) {
            traceStartId = list[ 0 ].id
            prepend( constructHTML( list ) )
            updateTimeFn()
            $doc.triggerHandler( AUDIO_PRELOAD )
        } else {
            isNoMoreHistory = true
        }
    } )
}

/**
 * 向上滚动，加载历史信息
 */
function handleScroll() {
    clearTimeout( fetchID )
    fetchID = setTimeout( function() {
        if ( !isLoadingHistory && MIN_TOP_OFFSET > $scrollWrap.scrollTop() ) {
            isLoadingHistory = true
            fetchHistory()
        }
    }, FETCH_TIMEOUT )
}

/**
 * 处理返回的数据
 * @param data
 */
function handleData( data ) {

    $loadingBar.attr( 'status', 'stop' )

    if ( data && data.length ) {
        append( constructHTML( filterDuplicateMsg( data ) ) )

        /**
         * 经过 filterDuplicateMsg 处理后，可能会没有数据
         */
        if ( data.length ) {
            if ( !traceStartId ) {
                traceStartId = data[ 0 ].id
            }
            traceEndId = data[ data.length - 1 ].id
            MSG.updateLastTraceId( traceEndId )
            updateTimeFn()
            $doc.triggerHandler( AUDIO_PRELOAD )
        }
    }

    if ( isOnlyLoadOnce ) {
        MSG.switchPull( false )
        Time.stopUpdate( updateTimeFn )
    }
}

/**
 * 过滤自己发送的消息，防止重复显示
 * @param data
 * @returns {*}
 */
function filterDuplicateMsg( data ) {
    var id,
        len = data.length

    if ( duplicateIDs.length ) {
        while ( len-- ) {
            id = data[ len ].id
            if ( id in duplicateIDs ) {
                delete duplicateIDs[ id ]
                duplicateIDs.length--
                data.splice( len, 1 )

                if ( !duplicateIDs.length ) {
                    break
                }
            }
        }
    }

    return data
}

/**
 * 处理请求报错，目前不做任何处理
 * @param err
 */
function handleError( err ) {
    console.error( err )
}

exports.init = function( parentClass ) {
    $main  = $( parentClass )
    mainEl = $main[ 0 ]
    $el    = $( '.js-area' )

    if ( !fml.vars.islogin || !fml.vars.isIn ) {
        isOnlyLoadOnce = true
    }

    Like( '.js-like', function( isLike ) {
        var $num = this.find( LIKE_NUM )

        if ( isLike ) {
            this.removeClass( NOT_LIKE ).addClass( IS_LIKE )
            $num.html( 1 + +$num.html() )
        } else {
            this.removeClass( IS_LIKE ).addClass( NOT_LIKE )
            $num.html( $num.html() - 1 )
        }
    } )

    MSG = pigeon.init( {
        'business': 'circle',
        'room': circleID,
        'appendArgs': {
            'limit': 10
        }
    } )

    MSG.on( 'ready', function() {
        var update   = Time.autoUpdate( $el, '.js-time' )
        updateTimeFn = update.update
        updateTimeID = update.stopId

        Message.init( function( data, isMine ) {
            append( constructHTML( data ), isMine )
            updateTimeFn()
        } )

        MSG.on( 'data', handleData )
        MSG.on( 'error', handleError )
    } )

    if ( !isOnlyLoadOnce ) {
        $scrollWrap.on( SCROLL_HISTORY, handleScroll )
    }

    $main.on( 'tap', function() {
        $doc.trigger( 'losefocus' )
    } )

    /**
     * 用户加入圈子成功后，绑定滚动获取历史信息事件，重新启动轮询
     */
    $doc.one( 'user.join', function() {
        var update = Time.autoUpdate( $el, '.js-time' )

        updateTimeFn = update.update
        updateTimeID = update.stopId

        $scrollWrap.on( SCROLL_HISTORY, handleScroll )

        MSG.switchPull( true )
    } ).on( 'message.id', function( e, id ) {
        duplicateIDs[ id ] = 1
        duplicateIDs.length++
    } ).on( 'message.scrolldown', scrollDown )
}
