/*common*/
require('wap/app/dialog')
var stock = require('wap/app/doota/stock')
var shareTmp = require('wap/component/shareTmp')
var urlHandle = require('wap/component/urlHandle')
var storage = require('component/wxstorage')
var notice = require('md/app/notice')
var touch = require('wap/zepto/touch')
 

var str = $('#goods_dec').text();
if (str.length > 141) {
	var newStr = str.substring(0, 140) + "...";
	$('#goods_dec').text(newStr);
}

$('.buy_btn1').on('tap', function(event) {
	
	event.preventDefault();
	var tpl = shareTmp('share_md');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''}); 
    $('#dialogLayer').css({'top':'','bottom':'0px','width':'100%','height':'280px','left':'0'})
    $('#dialogLayer .dialogTitle .close').text('');
    
    updatePrice();
    window.shareToWeixin = function shareToWeixin(type) {
		var params = {
			message_type : 'webpage',
			type : type,
			title: $('.goods_name').text(),
			text : $('.goods_name').text(),
			thumb_url : $('.goods_img img').attr('image_thumbnail'),
			url : location.href
		};

		var url = 'meilishuo://share.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(params));
		location.href = url;
	};

    var goods_sku = fml.vars.goods_sku
	, goods_wrap = $('.goods_wrap')
	, numBox = $('.amount .numBox')
	, sizeList = $('#sizeList>li>span')
	, colorList = $('#colorList>li>span')
	, goodsSku
	,orderColor
	,orderSize
	, goods_sku_id 
	, is_event = !!fml.vars.is_event
	,_dataName = 'si'
	,goods_prop = fml.vars.goods_prop
	,goods_stock = fml.vars.goods_stock
	,globalStat

var order_num = stock.bind({
	'input': $('input', numBox),
	'minus': $('.minus', numBox),
	'plus': $('.plus', numBox),
	'stockMax': $('.amount .stock span')
})

order_num.tipOnout = function(stat){
	globalStat = stat
}

if (sizeList.length) {
	bindClick(sizeList, orderSize, function(foo) {
		orderSize = foo
		resetColorBox(orderSize && orderSize.attr(_dataName))
		//checkActive()
		updateStockMax()
		updatePrice(orderSize)
		updateSkuId(orderSize)
	})
	resetSizeBox()
}

if (colorList.length){
	bindClick(colorList , orderColor ,function(foo){
		orderColor = foo
		updateStockMax()
		updatePrice(orderColor)
		updateSkuId(orderColor)
		resetSizeBox(orderColor && orderColor.attr(_dataName))
	}) 
	resetColorBox()

}

function bindClick(list, fObj, cbk) {
	list.on('tap', function() {
		var ele = $(this)
		if (ele.is('.out_of_stock')) return false
		if (ele.is('.active')) {
			ele.removeClass('active')
			fObj = null
		} else {
			if (fObj) fObj.removeClass('active')
			fObj = ele.addClass('active')
		}
		cbk && cbk(fObj)
		return false
	})
	if (1 == list.length) {
		list.eq(0).trigger('tap')
	}
}

function updateStockMax() {
	var size = orderSize && orderSize.attr(_dataName) || 0
		,color = orderColor && orderColor.attr(_dataName) 
	var stocks = goods_stock[size]
	stocks = color ? stocks.color[color].sku_repertory : stocks.sum
	order_num.upStockNum(stocks)
}

fml.on('update_num',updatePrice);
function updatePrice(data) {
	var size = orderSize && orderSize.attr(_dataName) || 0,
            color = orderColor && orderColor.attr(_dataName)
    var price = color ? goods_stock[size].color[color].sku_price : fml.vars.goods_current_price
    //console.log(parseInt($('.nums').val())*Number(price))
	$('.price .now').html(price)
	var price_k = color ? goods_stock[size].color[color].sku_price_korea : fml.vars.goods_price_korea;
	$('.price .now_k').html(price_k)
	$('#total_price').html((parseInt($('.nums').val())*Number(price)).toFixed(2));
}



function updateSkuId(goodsSku) {
	goods_sku_id = goodsSku ? goodsSku.attr("sku_id") : $('#sizeList li').eq(0).attr("sku_id")
}

function checkActive() {
	var foos = [orderSize, orderColor]
	for (var i = 0; i < foos.length; i++) {
		var foo = foos[i]
		if (foo && foo.is('.out_of_stock')) {
			foo.removeClass('active')
			foo = null
		}
	}
}

function resetSizeBox(color){
	for (var i = 1, j = goods_stock.length; i< j ;i++){
		var stock = goods_stock[i]
		stock = color ? (stock.color[color].sku_price || 0) : stock.sum	
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
	for (var i = 0; i < colorSum.length; i++){
		var stock = colorSum[i].sku_price || 0
		var boxItem = colorList.eq(i)
		!size && boxItem.attr(_dataName , i)
		if (stock <= 0){
			boxItem.addClass('out_of_stock')	
		}else{
			boxItem.removeClass('out_of_stock')	
		}
	}
}

function getOrderInfo() {
	var ret = {
		'amount' : is_event ? 1 : $('.nums').val()
	}
	var params = location.search.substr(1).split('&');
	for (var i=0; i < params.length; i++) {
		var pair = params[i],
		index = pair.indexOf('='),
		key = pair.substr(0,index),
		val = pair.substr(index+1);
		ret[key] = decodeURIComponent(val);
	};
	return ret
}

$('.buy_btn').on('tap', function(event) {
	event.preventDefault();
	var ele = $(this)
	if (ele.is('.non_buy')) return

	var size = orderSize && orderSize.attr(_dataName) || 0
		,color = orderColor && orderColor.attr(_dataName) 
	var confirmCbk = function() {
		var orderedInfo = getOrderInfo()
		if(goods_wrap.attr('goods_id')) 
			orderedInfo['goods_id'] = goods_wrap.attr('goods_id')
		if(goods_wrap.attr('share_id')) 
			orderedInfo['share_id'] = goods_wrap.attr('share_id')
		if(goods_stock[size].color[color]){
			orderedInfo['sku_id'] = goods_stock[size].color[color].sku_id
		}else{
			orderedInfo['sku_id'] = goods_stock[size].color[0].sku_id
		}
		// alert(goods_stock[size].color[color].sku_id)

		var query = urlHandle.http_build_query(orderedInfo)
		window.location.href = '/mdNew/orderConf?' + query
	}
	if(storage.getCookie('mls_in_app') == 1){
		if(storage.getCookie('mls_logged_in') != 1){
			location.href = 'meilishuo://login.meilishuo';
			return
		}
	}
	else if(storage.getCookie('md_in_app') == 1){
		
	}
	else if (!window.WeixinJSBridge) {
		notice.show('请在微信内购买')
		return
	}
	if (!orderSize && goods_prop[0].is_show){
		notice.show('请选择 尺寸', 'goods_msg')
		return
	}else if (!orderColor && goods_prop[1].is_show){
		notice.show('请选择 颜色', 'goods_msg')
		return
	}
	//3 ： 库存为0
	if(globalStat == 3){
		notice.show('暂无库存', 'goods_msg')
		return
	} else{
		confirmCbk()
	}
})

})

