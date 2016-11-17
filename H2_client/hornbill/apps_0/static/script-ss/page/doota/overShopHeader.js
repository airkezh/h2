fml.define( 'page/doota/overShopHeader', [ 'jquery' ], function( require ) {

    var $       = require( 'jquery' ),
        $rate   = $( '.js-shop-rate' ),
        $panel  = $( '.js-shop-rate-panel' ),
        $arrow  = $rate.find( '.shop_arrows' ),
        timeout = 500,
        timeoutID, w,

        ARROW_ACTIVE = 'shop_arrows_active'

    if ( ( w = $rate.width()) > $panel.width()) {
        $panel.width( w )
    }

    function hide() {
        clearTimeout( timeoutID )
        timeoutID = setTimeout( function() {
            $panel.hide()
            $arrow.removeClass( ARROW_ACTIVE )
        }, timeout )
    }

    $rate.on( 'mouseenter', function() {
        var offset = $rate.offset()
        clearTimeout( timeoutID )
        $panel.show()
            .css( {
                top: offset.top,
                left: offset.left
            } )
        $arrow.addClass( ARROW_ACTIVE )
    } ).on( 'mouseleave', hide )

    $panel.on( 'mouseenter', function() {
        clearTimeout( timeoutID )
    } ).on( 'mouseleave', hide )
} )
/**
 * TODO
 *      去掉 shop_arrows_active，在 $rate 上设置状态来控制箭头方向
 */
