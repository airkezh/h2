/*common*/
/**
 * @name: 回到顶部
 * @use:
 *      var GoTop = require( 'circle/component/gotop' )
 *
 *      GoTop.init({
 *          el: 'xxx',        // tap 事件会绑定在该元素上,点击后回到顶部
 *          isImmediate: true // 是否需要立即回到顶部,默认是 false
 *      })
 */
require( 'circle/zepto/fastclick' )

var $            = require( 'circle/zepto/touch' ),
    RAF          = require( 'circle/core/rAF' ),
    WindowScroll = require( 'circle/component/windowScroll' ),
    body         = document.body,
    rAF          = RAF.rAF,
    cAF          = RAF.cAF,
    isGotopHide  = false,
    maxTop       = 400,  //离顶部超过 maxTop，按钮显示，否则隐藏。
    TAP          = 'tap',
    $gotop

function immediateTop() {
    body.scrollTop = 0
}

/**
 * 使用 isGotopHide 来避免对 DOM 的过多操作
 */
function scroll( pos, isDown ) {
    if ( pos < maxTop ) {
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
}

function goTop() {
    var top   = body.scrollTop,
        speed = parseInt( top / 20 ),
        animId

    function scroll() {
        top -= speed
        body.scrollTop = top

        if ( top > 1 ) {
            animId = rAF( scroll )
        } else {
            cAF( animId )
        }
    }

    scroll()
}

exports.init = function( config ) {
    var $el = $( config.el ),
        isImmediate

    if ( typeof config.isImmediate == 'undefined' ) {
        isImmediate = false
    } else {
        isImmediate = config.isImmediate
    }

    config.maxTop && ( maxTop = config.maxTop )
    $gotop  = config.btnWrap ? $( config.btnWrap ) : $( '.gotop-wrap' )

    $el.on( TAP, isImmediate ? immediateTop : goTop )
    WindowScroll.bind( scroll, $gotop[ 0 ] )
}
