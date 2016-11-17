fml.define( 'wap/app/doota/shopping_carts', [ 'component/iStorage', 'wap/component/callApi' ], function( require, exports ) {
    var iStorage           = require( 'component/iStorage' ),
        callApi           = require( 'wap/component/callApi' ),
        goodsCountCacheKey = 'numInCart'

    function addCartsCbk( res ) {
        var errMsg

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
                alert( '加入购物车成功' )
            }
        }, 'json' )
        addedCbck && addedCbck()
    }
    function upShoppintCartsNum( num, innerCacll ) {
        //兼容
        var cartsBotNum = $('#goTop .cart_nums')
        if (num > 0){
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
        iStorage.getCookie( goodsCountCacheKey, function( num ) {
            if ( parseInt( num ) >= 0 ) {
                return upShoppintCartsNum( num, true )
            }

            callApi.read({'url' : '/cart/number'}, function( res ) {
                if ( res && res.info && res.info.count ) {
                    num = res.info.count
                    num && upShoppintCartsNum( num )
                    iStorage.setCookie( goodsCountCacheKey, num )
                }
            })
        } )
        return this
    }

} )
