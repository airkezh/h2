/*common*/

var $        = require( 'jquery' ),
    ShareTmp = require( 'component/shareTmp' ),
    Tracking = require('app/tracking'),

    $shopNav = $( '#shop-nav' ),

    NAV_CHANGED = 'nav.changed'

;(function navFix() {
    var $top      = $shopNav.find( '.shop-nav-top' ),
        $children = $top.children(),
        $first    = $children.first(),
        $last     = $children.last(),
        $items    = $top.find( '.js-nav-item > a' ),
        $newGoods = $top.find( '.js-new-goods' ),

        fWidth    = $first.width(),
        lWidth    = $last.width(),

        topWidth  = $top.width(),

        nums      = $items.length,
        nWidth    = 0,

        MIN_PADDING = 5

    if ( nums != 0 ) {
        fixWidth()
    }

    function fixWidth() {
        var item, avgWidth, w, rw,
            remain        = topWidth - fWidth - lWidth - nWidth,
            itemWidths    = [],
            allItemsWidth = 0,
            i = 0

        $items.each( function( i, el ) {
            itemWidths[ i ] = el.offsetWidth
            allItemsWidth += itemWidths[ i ]
        })

        if ( remain < allItemsWidth ) {
            avgWidth = Math.floor( remain / nums )

            for ( ; i < nums; i++ ) {
                item = $items[ i ]
                w    = itemWidths[ i ]

                if ( w > avgWidth ) {
                    rw = avgWidth - MIN_PADDING * 2
                    item.style.cssText = 'width:' + rw +
                            'px;padding-left:' + MIN_PADDING +
                            'px;padding-right:' + MIN_PADDING + 'px;'
                    remain -= avgWidth
                } else {
                    remain  -= w
                }
            }
        }
    }

    $shopNav.on( NAV_CHANGED, function() {
        nWidth = $newGoods.width()
        fixWidth()
    })
})()

;(function newGoods() {
    /**
     * TODO 『新品到货』
     * 点击
     *
     */
    var shopId          = fml.vars.shop_id,
        $newGoods       = $( '.js-new-goods' ),
        $newGoodsNum    = $( '.js-new-goods-num' )

    $.getJSON( '/aj/shop/new_goods_nums', {
        shop_id: shopId
    } )
    .done( function( data ) {
        if ( data && data.list.length ) {
            $newGoods.css( 'display', 'inline-block' )
                .find( 'ul' )
                .html( ShareTmp( 'tmpl_newgoods', { item: data.list }) )

            $newGoods.addClass( 'has-new-goods' ).find('.js-new-all').attr('href', $('.js-newest-goods').attr('href'))

            if ( !data.show_data.is_onclick ) {
                $newGoodsNum.html( data.show_data.show_nums )
                $('.js-new-all, .js-newest-goods').one( 'click', function() {
                    $.getJSON( '/aj/shop/new_goods_nums', {
                        shop_id: shopId,
                        is_onclick: 1
                    } )
                    .done( function() {
                        $newGoodsNum.remove()
                        $('.label-item-num').remove()
                    })
                })
            } else {
                $newGoodsNum.remove()
                $('.label-item-num').remove()
            }

            $shopNav.trigger( NAV_CHANGED )

            // 点击埋点、展现埋点
            // wiki http://shiji.meiliworks.com/log-track-designer/pc_log_track/wikis/PC-TWITTER-PAGE
            var cr_detail = '',
                cr_area = 'shop_main'
            if(fml.vars.goodsInfo){
                cr_detail += 'twitter_id:' + fml.vars.goodsInfo.twitterId + '.'
                cr_area = 'share_main'
            }
            cr_detail += 'shop_id:'+shopId
            Tracking.cr('newgoods_arrival', {action:'show', area: cr_area, detail: cr_detail})

            $newGoods.on('click', function(){
                Tracking.cr('newgoods_arrival', {action:'click', area: cr_area, detail: cr_detail})
            })
        }
    })
}())
