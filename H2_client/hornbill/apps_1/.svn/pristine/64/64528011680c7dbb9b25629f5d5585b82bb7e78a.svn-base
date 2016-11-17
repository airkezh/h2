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

;
(function init() {

    $.each($(".post-desc"),function(index, el) {
        var text=el.innerHTML;
        el.innerHTML=text.replace(/(.{0,300}).*/,'$1');

    });
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


}())
