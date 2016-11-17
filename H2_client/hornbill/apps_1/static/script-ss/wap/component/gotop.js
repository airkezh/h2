/*common*/
/**
 * @name: 回到顶部
 * @use:
 *      var GoTop = require( 'wap/component/gotop' )
 *
 *      GoTop.init({
 *          el: 'xxx',        // tap 事件会绑定在该元素上,点击后回到顶部
 *          isImmediate: true // 是否需要立即回到顶部,默认是 false
 *      })
 */
require( 'wap/zepto/fastclick' )

var $            = require( 'wap/zepto/touch' ),
    RAF          = require( 'wap/core/rAF' ),
    doc          = document,
    $doc         = $( doc ),
    body         = doc.body,
    rAF          = RAF.rAF,
    cAF          = RAF.cAF,

    TAP          = 'tap',
    EVENT_BEGIN  = 'gotop.begin',
    EVENT_FINISH = 'gotop.finish'

function immediateTop() {
    $doc.triggerHandler( EVENT_BEGIN )
    body.scrollTop = 0
    $doc.triggerHandler( EVENT_FINISH )
}

function goTop() {
    $doc.triggerHandler( EVENT_BEGIN )

    var top   = body.scrollTop,
        speed = parseInt( top / 20 ),
        animId

    function scroll() {
        top -= speed
        body.scrollTop = top

        if ( top > 1 ) {
            animId = rAF( scroll )
        } else {
            $doc.triggerHandler( EVENT_FINISH )
            cAF( animId )
        }
    }

    scroll()
}

exports.init = function( config ) {
    var $el         = $( config.el ),
        isImmediate = typeof config.isImmediate == 'undefined' ? false : config.isImmediate

    $el.on( TAP, isImmediate ? immediateTop : goTop )
}
