fml.define('m/app/doota/shopping_carts' , ['component/iStorage','m/component/callApi'] , function(require , exports){
	var iStorage = require('component/iStorage')
	var callApi = require('m/component/callApi')
	var goodsCountCacheKey = 'numInCart'
	var adding = {}
	function addCartsCbk(){
		if (!adding.aw || !adding.animate ) return
		var res = adding.res
		var errMsg 
		if (!res ) errMsg = 'opps,有点错误,一会儿再试试吧'
		else if (res.code) errMsg = res.info.msg 
			
		if (errMsg) {
			alert(res && '去整理购物车')
			if (res )  window.open( '/cart')
			
		}else {
			var info = res.info
			if (info && info.contain) upShoppintCartsNum(info.contain)	
		}
	}


	exports.addToCarts = function(goodsInfo ,addedCbck){
		adding = {}
		callApi.write({'url':'/cart/add'},goodsInfo, function(res){
			adding.aw = true	
			adding.res = res
			addCartsCbk()
			alert('加入购物车成功')
		})
		addedCbck && addedCbck()
	}

	function upShoppintCartsNum(num , innerCacll){
		/*
		var cartsRightNum = $('#goTop .ico_cart .cart_nums')
			,cartsTopNum = $('.header_top .carts_num')
		if (num > 0){
			cartsRightNum.text(num).show()
			cartsTopNum.show().find('span').text(num)
		}else{
			cartsRightNum.hide()
			cartsTopNum.hide()
		}

		if (!innerCacll) exports.clearCartsNumCache()
			*/
		
	}
	exports.upShoppintCartsNum = upShoppintCartsNum

	exports.clearCartsNumCache = function(){
		iStorage.removeCookie(goodsCountCacheKey)
		return this
	}

	exports.readShopsCount = function(){
		iStorage.getCookie(goodsCountCacheKey ,function(num){
			if (parseInt(num) >= 0) return upShoppintCartsNum(num , true)
			callApi.read({'url':'/cart/number'}, function(res){
				if (res && res.info && res.info.count) {
					num = res.info.count
					num && upShoppintCartsNum(num)
					iStorage.setCookie(goodsCountCacheKey , num) 
				}
			})	
		})
		return this
	}

})
