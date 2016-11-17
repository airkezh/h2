fml.use(['page/doota/itemCom' , 'app/tracking' , 'core/animation','app/checkLogin','component/urlHandle'
	,'app/doota/stock','page/common/shopping_carts' ,'app/doota/picZoom', 'ui/alert', 'jquery'] , function(){
	var goods_prop = fml.vars.goods_prop
		,goods_stock = fml.vars.goods_stock
		,goods_id = fml.vars.goods.id
		,goods_pid = fml.vars.goods.pid
		,goods_twitter = fml.vars.goods.twitter_id
		,shop_id = fml.vars.goods.shop_id
	
	if (!goods_stock) return
	var orderSize
		,orderColor
		,_dataName = 'si'

	var stock = this.stock
		,picZoom = this.picZoom
		,checkLogin = this.checkLogin 
		,Tween = this.animation.Tween
		,requestFrame = this.animation.requestFrame
		,urlHandle = this.urlHandle
		,tracking = this.tracking
		,itemCom = this.itemCom
		,$ = this.jquery

	var numBox = $('.amount .numBox')
	var order_num = stock.bind({
		'input' : $('input' ,numBox) 
		,'minus' : $('.minus' ,numBox)
		,'plus' : $('.plus' ,numBox)
		,'stockMax' : $('.amount .stock span')
		})	
	order_num.tipOnout = function(stat){
		var msg_limit = $('.msg_limit')
			,msg_over = $('.msg_over')
			,msg_zero = $('.msg_zero')
		switch(stat){
			case 1:
				msg_limit.show(); msg_over.hide() ; msg_zero.hide()
				break;
			case 2:
				msg_limit.hide(); msg_over.show(); msg_zero.hide()
				break;
			case 3:
				msg_limit.hide(); msg_over.hide(); msg_zero.show()
				break;
			default:
				msg_limit.hide(); msg_over.hide(); msg_zero.hide()
			}
		}
	var orderSkinBox = $('.promptBox')
	var defineCbk
		,defineUnReadyCbk

	function  getlogUnit (type , typeCont){
		var ret = {
			'goods_pid': goods_pid
			,'goods_id' : goods_id
			,'twitter_id' : goods_twitter 
			,'user_id' : Meilishuo.config.user_id
			,'url' : window.location.href
			}
		ret[type] = typeCont
		return ret
		}

	function getOrderInfo(){
		var ret = {
			'goods_pid': goods_pid,
			'goods_id' : goods_id,
			'twitter_id' : goods_twitter, 
			'amount' : $('.amount .nums').val() - 0,
			'shop_id' : shop_id
			}
		if (orderSize) ret.size =  goods_prop.size.name + '__' + 
					(goods_prop.size.value[orderSize.attr(_dataName) - 1] )
		if (orderColor) ret.color =  goods_prop.color.name + '__' +
					(goods_prop.color.value[orderColor.attr(_dataName) -1] )
		return ret
		}
	
	function closePromtBox(){
		$('.define').hide()
		defineCbk = null
		defineUnReadyCbk = null
		orderSkinBox.hide()
		}
	$('.close_z' , orderSkinBox).click(closePromtBox)

	function checkSelectDone(){
		if (!orderSize && goods_prop.size.is_show) return false
		if (!orderColor && goods_prop.color.is_show) return false
		return true
		}	

	var btn_box = $('.btn_box a , .tab_tle .buy_btn').click(function(){
		var ele = $(this)
		if (ele.is('.non_buy')) return
		tracking.cr('buy' , getlogUnit('btn' , ele.is('.buy_btn')?'buy_btn':'add_cart') )
		if (ele.is('.buy_btn')){
			if (!checkLogin()) return
		}
		var confirmCbk = ele.is('.buy_btn') ? function(){
				var orderedInfo = getOrderInfo()
				//orderedInfo['_cd'] = Meilishuo.config.nt
				orderedInfo['ori'] = 'share'
				var query = urlHandle.http_build_query(orderedInfo)
				window.location.href = '/order/init/?'+ query	
			} : function(){
				/*carts.addToCarts( getOrderInfo() ,
					{'element' : orderColor || orderSize 
					, 'from' :  '.sel_box .buy_btn'  
					} ,function(){
					closePromtBox()
					})*/
				itemCom.addToCart(getOrderInfo())
				}

		orderSkinBox.show()
		if (ele.is('.tab_tle .buy_btn') ){ 
			var ct = 0 , posTop = $(document).scrollTop() ,posMove= posTop - (orderSkinBox.offset().top - 90)
			var duration  = posMove>10 ? Math.ceil(posMove /10) :1 
			if (duration > 60) duration = 60
			function showOrderSkinBox(){
				var top = Tween.Cubic.easeInOut(ct++ , posTop ,-posMove  , duration)	
				window.scrollTo(0 , top)
				if (ct <= duration) requestFrame(showOrderSkinBox)
				}
			showOrderSkinBox()
		}
		//window.scrollTo(0, orderSkinBox.offset().top - 90)	
		defineCbk = function(){
			$('.sel_box .buy_btn').unbind('click').click(function(){
				if (!checkSelectDone()) return
				confirmCbk()
				defineCbk = null	
				defineUnReadyCbk = null
				})
			//defineCbk = null	
			}
		defineUnReadyCbk = function(){
			$('.define').hide()
			//defineUnReadyCbk = null
			}

		checkActive()

		})

	order_num.outStock = function(isOut){
		var btns = $(btn_box).not('.disabled')
		if (!btns.length) return
		if (isOut)
			btns.addClass('non_buy')	
		else
			btns.removeClass('non_buy')	
			
		}
	updateStockMax()

	var sizeList = $('#sizeList>li>a')
		,colorList = $('#colorList>li>a')
	

	
	function resetSizeBox(color){
		for (var i = 1, j = goods_stock.length; i< j ;i++){
			var stock = goods_stock[i]
			stock = color? stock.color[color] : stock.sum	
			var boxItem = sizeList.eq(i-1)
			!color && boxItem.attr(_dataName , i)
			if (stock <= 0){
				boxItem.addClass('out_of_stock')	
			}else{
				boxItem.removeClass('out_of_stock')	
				}
			}
		}
	function resetColorBox(size){
		var colorSum = goods_stock[size || 0].color
		for (var i in colorSum){
			var stock = colorSum[i]
			var boxItem = colorList.eq(i-1)
			!size && boxItem.attr(_dataName , i)
			if (stock <= 0){
				boxItem.addClass('out_of_stock')	
			}else{
				boxItem.removeClass('out_of_stock')	
				}
			}
		}
	
	function bindClick(list , fObj , cbk){
		list.on('click'  , function(){
			var ele = $(this)
			if (ele.is('.out_of_stock')) return false
			if (ele.is('.active')){
				ele.removeClass('active')
				fObj = null
			}else{
				if (fObj) fObj.removeClass('active') 
				fObj = ele.addClass('active')
			}
			cbk && cbk(fObj)
			return false
			})
		if (1 == list.length){
			list.eq(0).trigger('click')
			}
		}
	function updateStockMax(){
		var size = orderSize && orderSize.attr(_dataName) || 0
			,color = orderColor && orderColor.attr(_dataName) 
		var stocks = goods_stock[size]
		stocks = color ? stocks.color[color] : stocks.sum
		order_num.upStockNum(stocks)
		}
	function checkActive(){
		var foos = [orderSize,orderColor]
		for (var i =0 ;i<foos.length;i++){
			var foo = foos[i]
			if (foo && foo.is('.out_of_stock')){ 
				foo.removeClass('active')
				foo = null
				}
			}
		if (checkSelectDone()) {
			defineCbk && defineCbk()
		}else{
			defineUnReadyCbk && defineUnReadyCbk()
			
			}
		}
	var big_pic = $('.big_pic>img')

	if (sizeList.length) {
		bindClick(sizeList , orderSize ,function(foo){
			orderSize = foo
			resetColorBox(orderSize && orderSize.attr(_dataName))
			checkActive()
			updateStockMax()
			var size_selected = orderSize && orderSize.attr(_dataName)
			size_selected && tracking.cr('selectProp' , getlogUnit('size' , size_selected ))
			}) 
		resetSizeBox()
	}
	if (colorList.length){
		bindClick(colorList , orderColor ,function(foo){
			orderColor = foo
			resetSizeBox(orderColor && orderColor.attr(_dataName))
			checkActive()
			updateStockMax()
			
			var color_selected = orderColor && orderColor.attr(_dataName)  
			color_selected && tracking.cr('selectProp' , getlogUnit('color' , color_selected ))
			}) 
		resetColorBox()
	
		colorList.on('click' , function(){
			//if ($(this).is('.out_of_stock')) return
			_thumbHover && _thumbHover.removeClass('active')
			picZoom.placeBig(big_pic , $('img',this).attr('bsrc'))	
			})
	}
	var _thumbHover = $('.picture .thumb a.active')
	$('.picture .thumb a').hover(function(){
		if (_thumbHover) _thumbHover.removeClass('active')
		_thumbHover = $(this).addClass('active')
		picZoom.placeBig(big_pic ,$('img',this).attr('bsrc'))	
		}).click(function(){return false}).eq(0).trigger('mouseenter');
})


fml.use(['app/doota/timedown','jquery'] , function(){
	var $ = this.jquery
		,timedown = this.timedown

	var remain = parseInt($('.countdown').attr('remain') )
	if (!remain) return

	timedown
		.down('.countdown>span', remain, '0d-0h-0i-0s-e', [
			'<samp>%v</samp>天',
			'<samp>%v</samp>小时',
			'<samp>%v</samp>分',
			'<samp>%v</samp>秒',
			'<samp>%v</samp>'
		])
		.setHeartHum(100)
		.onTimeOver(function(){
			$('.countdown>span').html('<samp>0</samp>秒')
		})
})

fml.use(['app/like','jquery'] , function(){
	var like_btn = this.jquery('.like_btn')
		,like_num = like_btn.next()
		,love_msg = this.jquery('.love_msg')

	var numLiked = like_num.text().match(/\d+/)
	numLiked = numLiked ? numLiked[0]*1 : 0 

	this.like.twitterLike('#twitter_like' , '.like_btn' ,function(res){
		if (like_btn.attr('liked')|0 ){
			like_btn.attr('liked',0).html('<em class="love_ico">&nbsp;</em>喜欢')
			numLiked--
			like_num.html(numLiked ?'('+numLiked+')' : '')
			 
		}else{
			like_btn.attr('liked',1).html('已喜欢')
			numLiked++
			like_num.html(numLiked ?'('+numLiked+')' : '')
			}
		},
		love_msg.length && {
		'hoverOn' : function(){
			love_msg.show()	
			},
		'hoverOff' : function (){
			love_msg.hide()	
			}
		}
	);
});

fml.use('app/marquee' , function(){
	this('.user_from',34 , 10 , 3500)
})

fml.define('page/doota/beauty', [] , function(){});