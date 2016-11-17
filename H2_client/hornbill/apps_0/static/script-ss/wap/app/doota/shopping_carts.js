fml.define( 'wap/app/doota/shopping_carts', ['wap/zepto', 'component/iStorage', 'wap/component/callApi', 'wap/app/risk' ], function( require, exports ) {
    var iStorage           = require( 'component/iStorage' ),
        $                  = require( 'wap/zepto' ),
        callApi           = require( 'wap/component/callApi' ),
        goodsCountCacheKey = 'numInCart'
    var risk = require('wap/app/risk')

    function addCartsCbk( res ) {
        var errMsg

        /*
           加车风控，加车操作被风控的调至风控页
         */
        if(res && res.code==7){
            return risk.go(res.info.rule_id)
        }

        if ( !res ) {
            errMsg = 'opps,有点错误,一会儿再试试吧'
        } else if ( res.code ) {
            errMsg = res.info.msg
        }

        if ( errMsg ) {
            return alert( errMsg )
        }
        if(res.info && res.info.contain_china){
            exports.upShoppintCartsNum(res.info.contain_china, false)
        } else {
            exports.clearCartsNumCache()
        }
        return true
    }

    exports.addToCarts = function( goodsInfo, addedCbck ) {
        $.post( '/aw/doota/addToCarts', goodsInfo, function( res ) {
            if ( addCartsCbk( res ) ) {
                alert( '加入购物车成功\n【顶部右上角查看购物车】' )
            }
        }, 'json' )
        addedCbck && addedCbck()
    }
    function upShoppintCartsNum( num, innerCacll ) {
        //兼容
        var cartsBotNum = $('#goTop .cart_nums, .page_head .cart_nums')
        if (num > 0){
            num = num > 99 ? '99+' : num
            cartsBotNum.text(num).show()
        }else{
            cartsBotNum.hide()
        }

        if (!innerCacll) exports.clearCartsNumCache()
    }

    exports.upShoppintCartsNum = upShoppintCartsNum

    exports.clearCartsNumCache = function() {
        iStorage.removeCookie( goodsCountCacheKey )
        return this
    }

    exports.readShopsCount = function() {
        if(window.location.host == 'account.meilishuo.com') return ''
        iStorage.getCookie( goodsCountCacheKey, function( num ) {
            if ( parseInt( num ) >= 0 ) {
                return upShoppintCartsNum( num, true )
            }

            callApi.read({'url' : '/cart/number'}, function( res ) {
                if ( res && res.info ) {
                    num = res.info.count
                    if(num === 0 || num){
                        upShoppintCartsNum( num )
                        iStorage.setCookie( goodsCountCacheKey, num )
                    }
                }
            })
        } )
        return this
    }

} )
