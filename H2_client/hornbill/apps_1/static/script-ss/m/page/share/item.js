/*common*/	
require('m/zepto')
require('m/zepto/touch')
require('m/zepto/ajax')
require('m/zepto/form')
require('m/component/lazyLoad')

var callApi = require('m/component/callApi')
var shareTmp = require('wap/component/shareTmp')
callApi.read({'url':'/share/service_guarantee'},{},function(data){
	$('#service_list').html(shareTmp('service_list_dfz', data))
})
callApi.read({'url':'/share/goods_specifications'},{'twitter_id':fml.vars.twitter_id},function(data){
	$('#format_list').html(shareTmp('format_list_dfz', data))
})
callApi.read({'url':'/share/goods_details'},{'twitter_id':fml.vars.twitter_id},function(data){
	$('#detail_list').html(shareTmp('detail_list_dfz', data))
})

var stock = require('wap/app/doota/stock')
	,checkLogin = require('wap/app/checkLogin')
	,carts = require('wap/app/doota/shopping_carts')
	,urlHandle = require('wap/component/urlHandle')
//	,tracking = require('wap/app/tracking')

var goods_prop = fml.vars.goods_prop
	,goods_stock = fml.vars.goods_stock
	,goods_id = fml.vars.goods.id
	, sessid = fml.vars.globalKey
	,goods_pid = 'wap.' + sessid + '.'  + fml.vars.goods.pid
	,goods_twitter = fml.vars.goods.twitter_id
	,shop_id = fml.vars.shop_id

if (!goods_stock) return
var orderSize
	,orderColor
	,_dataName = 'si'

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

function getOrderInfo(){
	var ret = {
		source : '5-0.0.1',
		'goods_pid': goods_pid,
		'goods_id' : goods_id,
		'twitter_id' : goods_twitter, 
		'amount' : $('.amount .nums').val() - 0,
		'shop_id': shop_id
	}
	if (orderSize)
		ret.size =  goods_prop.size.name + '__' + (goods_prop.size.value[orderSize.attr(_dataName) - 1] )
	if (orderColor)
		ret.color =  goods_prop.color.name + '__' + (goods_prop.color.value[orderColor.attr(_dataName) -1] )
	return ret
}

var btn_box = $('.btn_box span').on('tap', function(){
	var ele = $(this)
	if (ele.is('.non_buy')) return
	
	if (!checkLogin()) return
	var confirmCbk = ele.is('.buy_btn') ?function(){
		var orderedInfo = getOrderInfo()
		orderedInfo['_cd'] = Meilishuo.config.nt
		orderedInfo['ori'] = 'share'
		var query = urlHandle.http_build_query(orderedInfo)
		window.location.href = '/order/init/?'+ query	
	} : function(){
		carts.addToCarts( getOrderInfo() ,function(){
		})
	}
	if (!orderSize && goods_prop.size.is_show){
		alert('请选择 尺寸')
		return
	}else if (!orderColor && goods_prop.color.is_show){
		alert('请选择 颜色')
		return
	}
	confirmCbk()
})

order_num.outStock = function(isOut){
	if (isOut)
		$(btn_box).addClass('non_buy')	
	else
		$(btn_box).removeClass('non_buy')	
}
updateStockMax()

var sizeList = $('#sizeList>li>span')
	,colorList = $('#colorList>li>span')

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
	list.on('tap'  , function(){
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
		list.eq(0).trigger('tap')
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
}

if (sizeList.length) {
	bindClick(sizeList , orderSize ,function(foo){
		orderSize = foo
		resetColorBox(orderSize && orderSize.attr(_dataName))
		checkActive()
		updateStockMax()
		var size_selected = orderSize && orderSize.attr(_dataName)
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
	}) 
	resetColorBox()

}


$('.moreDetailBtn').on('tap', function(){
	var $box = $(this).parents('.details')
	$box.is('.hide') ? $box.removeClass('hide') : $box.addClass('hide')
})


fml.use(['wap/app/doota/timedown','m/zepto'] , function(){
	var timedown = this.timedown
	
	timedown.down('.countdown>span', parseInt($('.countdown').attr('remain')) )

	$('.countdown_l').each(function(){
		var ele = $(this)
		var remain = parseInt(ele.attr('remain'))
		if (!remain) return
		timedown.down(this , remain)
	})
})

fml.use('m/component/lazyLoad' , function(){
	var lazyLoad = this.init({
		xpath:'.more_pic>span'
	//	, loadStyle:'img'
		, step_x : 'auto'
		, step_y : 20
	})
	lazyLoad.load()
	lazyLoad.scroll()
});

// fml.use('m/app/slideOpen' , function(){
//  	this.tapSlider();
//  	this.tapDefault();
//  	//即唤起又下载
//  	// $('.daoliuBanner').find('.slider').trigger('tap')

//  	//只唤起客户端
//  	$('#openApp').trigger('tap')
//  });

fml.use('wap/app/goAppWelcome' , function(){
	this.init();
});
