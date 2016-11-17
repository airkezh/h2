fml.define('app/doota/shopping_carts' , ['jquery', 'component/iStorage','ui/alert','component/ajax' ,'core/animation', 'component/callApi'] , function(require , exports){
	var $  = require('jquery')
		,animation = require('core/animation')
		,ajax = require('component/ajax')
		,Alert = require('ui/alert')
		,iStorage = require('component/iStorage')
		,callApi = require('component/callApi')

	var Tween = animation.Tween
		,requestFrame = animation.requestFrame


	var goodsCountCacheKey = 'numInCart'
	var adding = {}
	function addCartsCbk(){
		if (!adding.aw || !adding.animate ) return
		var res = adding.res
		var errMsg
		if (!res ) errMsg = 'opps,有点错误,一会儿再试试吧'
		else if (res.code) errMsg = res.info.msg

		if (errMsg) {
			new Alert({
				width : 370,
                title : '我的购物车',
				confirmTxt : res && '去整理购物车',
                content : errMsg
            }).onSure(function(){
				if (res )  window.open( '/cart')
			})

		}else {
			var info = res.info
			if (info && info.contain) upShoppintCartsNum(info.contain)
			}
		}


	function addAnimate (icoOrgin , from , to , cbk){
		var icoOrginSrc =icoOrgin.find('img').attr('src')
		var thumbZoom = 0.5
		if (icoOrginSrc) {
			var ico = $('<div style="z-index:9;display:block;position:absolute;border:1px solid #ccc;"><img src="'+ icoOrginSrc +'" style="width:100%;height:100%;"/></div>')
		}else{
			var ico = $('<div style="z-index:9;display:block;position:absolute;font-size:70%;background:#f7f7f7;text-align:center;border:3px solid #f7f7f7;">'+ icoOrgin.text() +'</div>')
			thumbZoom = 0.7
			}
		ico.css('overflow','hidden').width(0).height(0)

		from = $(from)
		to = $(to)
		var fromOff = from.offset()
			,toOff = to.offset()
		var posStart = {
					'left' : fromOff.left + from.width() * 0.4
					,'top': fromOff.top
					}
		var posEnd = {
					'left' : toOff.left
					,'top': toOff.top + to.height()
					}
		ico.css(posStart)
		var duration = 30, ct = 0 ,move1 = -50
			,icoOrgWidth = icoOrgin.width()
			,icoOrgHeight = icoOrgin.height()
		function movie(){
			var top = Tween.Cubic.easeOut(ct , posStart.top , move1  , duration)
			var zoom = ct / duration * thumbZoom
			ct++

			ico.css({'top' : top ,'width': icoOrgWidth* zoom,'height': icoOrgHeight*zoom})
			if (top > posStart.top + move1) {
				requestFrame(movie)
			}else {
				posStart.top = top
				ct = 0, duration = 25
				movie2()
				}
			}
		function movie2(){
			var top = Tween.Quart.easeIn(ct , posStart.top , posEnd.top - posStart.top , duration)
				,left = Tween.Linear(ct , posStart.left , posEnd.left - posStart.left , duration)
			ct++
			ico.css({'left': left , 'top': top})
			if ( left <= posEnd.left) requestFrame(movie2)
			else onEnd()
			}
		function onEnd(){
			ico.remove()
			adding.animate = true
			addCartsCbk()
			cbk && cbk()
			}
		movie()

		$('body').append(ico)
		}
	// exports.addToCarts = function(goodsInfo , opt ,addedCbck){
	// 	adding = {}
	// 	ajax.aw('/aw/doota/addToCarts',goodsInfo , function(res){
	// 		adding.aw = true
	// 		adding.res = res
	// 		addCartsCbk()
	// 		})
	// 	addAnimate(opt.element , opt.from ,'#goTop .ico_cart' , addedCbck)

	// 	}
	function upShoppintCartsNum(num , innerCacll){
		var cartsBotNum = $('.bot_cart .cart_nums')
			,cartsTopNum = $('.header_top .carts_num')
		if (num > 0){
			cartsBotNum.text(num).show()
			cartsTopNum.show().find('span').text(num)
		}else{
			cartsBotNum.hide()
			cartsTopNum.hide()
			}

		if (!innerCacll) exports.clearCartsNumCache()

		}
	exports.upShoppintCartsNum = upShoppintCartsNum

	exports.clearCartsNumCache = function(){
		iStorage.removeCookie(goodsCountCacheKey)
		return this
		}

	exports.readShopsCount = function(){
		if(window.location.host == 'account.meilishuo.com') return ''
		iStorage.getCookie(goodsCountCacheKey ,function(num){
			if (parseInt(num) >= 0) return upShoppintCartsNum(num , true)

			callApi.read({'url' : '/cart/number'}, function( res ) {
				if ( res && res.info && res.info.count >=0 ) {
					num = res.info.count
					num && upShoppintCartsNum( num )
					iStorage.setCookie( goodsCountCacheKey, num )
				}
			})
		})
		return this
		}

	})
