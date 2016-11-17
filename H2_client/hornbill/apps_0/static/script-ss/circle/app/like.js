/*common*/
/**
 *
 * 喜欢分成单品的喜欢和消息的喜欢
 *
 * 元素上要设置
 *      data-id
 *      data-type: 'item' 或 'msg'
 *      data-islike: 0 表示不喜欢，1 表示喜欢
 *
 * 单品：
 *      http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Twitterlike
 * 消息：
 *      http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Snake_Documentation#富消息相关
 *
 *
 */
var $          = require( 'circle/zepto' ),
    CheckLogin = require( 'circle/app/checkLogin' ),

    msgLikeApi = '/aw/msg_like/',
    likeApi    = '/aw/twitter/like',

    EVENT      = 'touchend'

function like( callback ) {
    if ( !CheckLogin() ) {
        return
    }

    var $el  = $( this ),
        data = {
            nt: Meilishuo.config.nt
        },
        id, type, isLike, url

    if ( $el.data( 'loading' ) ) {
        return
    }

    id   = $el.data( 'id' )
    type = $el.data( 'type' ) || 'item'
    /*
     * Zepto 默认的 data 方法只能存储字符串，所以下方做比较的时候没有使用 ===
     */
    isLike = $el.data( 'islike' ) || 0

    $el.data( 'loading', true )

    if ( type == 'item' ) {
        url       = likeApi
        data.stid = id
    } else if ( type == 'msg' ) {
        url         = msgLikeApi + ( isLike == 0 ? 'like' : 'unlike' )
        data.msg_id = id
    }

    $.ajax( {
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        success: function( data ) {
            if ( data.status === -21 ) {
                alert( '请求失败，请刷新页面重试。' )
            } else {
                var nowState = isLike == 0 ? 1 : 0
                callback.call( $el, nowState )
                $el.data( 'islike', nowState )
            }
        },

        complete: function() {
            $el.data( 'loading', false )
        }
    } )
}

/**
 * el 是字符串，会使用事件代理，否则按 DOM 元素处理
 *
 * callback 的 this 值是当前触发元素的 Zepto 对象
 */
return function( el, callback ) {
    callback = callback || function() {
            return true
        }

    function cbk( e ) {
        like.call( this, callback )
        return false
    }

    if ( typeof el == 'string' ) {
        $( document.body ).on( EVENT, el, cbk )
    } else {
        $( el ).on( EVENT, cbk )
    }
}
