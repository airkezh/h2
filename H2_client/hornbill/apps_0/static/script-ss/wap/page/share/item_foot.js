/*common*/
require('m/zepto/ajax')
require('m/zepto/form')
require('wap/app/dialog')
require('wap/zepto/fastclick');

var stock = require('wap/app/doota/stock')
	, checkLogin = require('wap/app/checkLogin')
	, carts = require('wap/app/doota/shopping_carts')
	, urlHandle = require('wap/component/urlHandle')
	, shareTmp = require('wap/component/shareTmp')
	, noticeUi = require("wap/ui/notice")

var goods_prop = fml.vars.goods_prop
	, goods_stock = fml.vars.goods_stock
	, goods_id = fml.vars.goods.id
	, sessid = fml.vars.globalKey
	, goods_pid = fml.vars.goods.pid
	, goods_twitter = fml.vars.goods.twitter_id
	, goodsSKU = fml.vars.goods_sku
	, shop_id = fml.vars.shop_id
	, price_max = fml.vars.goods.price_max
	, price = fml.vars.goods.price
	, org_price = fml.vars.goods.original_price
	, org_price_max = fml.vars.goods.original_price_max
	, $price_dom = $('.sku_h')
	, curColor
	, curSize

if (!goods_stock) return

var orderSize
	, orderColor
	, _dataName = 'si'


/*弹窗*/
function shotDwon(){
	$('body').off('touchmove', stopMove)
	$('.fixed_download').remove()
}
var dialogFn = function(id){
	var tpl = shareTmp(id);
	$('body').append(tpl);
	$('body').on('touchmove', stopMove)
	$('.fixed_download .black_mask').on('click', shotDwon);
}
function notice(msg, noticeClass, duration) {
	return new noticeUi({
		content : msg,
		dialogClass : noticeClass,
		duration : duration
	})
}

/* 显示sku动画 */
var scroll_slide_top = 0;
function stopMove(e){
	e.preventDefault();
	return false
}
function slide_bottom_out(){
	$('.fixed_sku').removeClass('slide_bottom_in').addClass('slide_bottom_out')
	$('.black_mask, .sku_h, .confirm_wrap').off('touchmove', stopMove)
	setTimeout(function(){
		$('.fixed_sku').css('visibility', 'hidden')
	}, 500)
}
function slide_bottom_in(){
	$('.confirm_btn').data('type', $(this).data('type'))
	$('.black_mask, .sku_h, .confirm_wrap').on('touchmove', stopMove)
	$('.fixed_sku').off('touchmove').css('visibility', 'visible').removeClass('slide_bottom_out').addClass('slide_bottom_in')
}
$('.add_cart, .buy_btn').on('click', slide_bottom_in)
$('.fixed_sku .close, .black_mask').on('click', slide_bottom_out)


/**
 * 下架商品，不选择sku
 */
if(fml.vars.is_zero) return false

var numBox = $('.numBox')
var order_num = stock.bind({
	'input' : $('input', numBox)
	,'minus' : $('.minus', numBox)
	,'plus' : $('.plus', numBox)
	,'stockMax' : $('.stock span')
})

order_num.tipOnout = function(stat){
	switch(stat){
		case 1:
			notice('对不起！每人最多限购100件！')
			break;
		case 2:
			notice('您所选的宝贝数量超过库存！')
			break;
		case 3:
			notice('对不起，这件宝贝已经卖光啦！')
			break;
	}
}
order_num.outStock = function(isOut){
	if (isOut)
		$(btn_box).addClass('non_buy')
	else
		$(btn_box).removeClass('non_buy')
}


/*
 * sku 选择
 */
curColor = $('#colorList .active').data('name') || ''
curSize = $('#sizeList .active').data('name') || ''

$('#colorList .p_color_btn').on('tap',function(){
	curColor = $(this).data('name')
})
$('#sizeList .p_size_btn').on('tap', function(){
	curSize = $(this).data('name')
})

var colorList = $('#colorList .p_color_btn')
	, sizeList = $('#sizeList .p_size_btn')
	, first_trigger = false

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
function bindClick(list, fObj, cbk){
	list.on('tap', function(){
		var ele = $(this)
		// if (ele.is('.out_of_stock')) return false
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
		first_trigger = true
		list.eq(0).trigger('tap')
	}
}
function checkActive(){
	var foos = [orderSize, orderColor]
	for (var i =0 ;i<foos.length;i++){
		var foo = foos[i]
		if (foo && foo.is('.out_of_stock')){
			foo.removeClass('active')
			foo = null
		}
	}
}

var $goods_title = $('.sku_h .title')
	, $goods_image = $('.sku_h .img_wrap')
	, old_goods_title = $goods_title.html()
function changeSkuMate(){
	if(first_trigger) return first_trigger = false
	var color_name = $('#colorList .active').data('name') || ''
	var color_image_src = $('#colorList .active img').attr('src')
	var size_name = $('#sizeList .active').data('name') || ''
	if(color_image_src){
		$goods_image.css('background-image', 'url(' + color_image_src+ ')')
	}
	if(color_name || size_name){
		$goods_title.html('已选择： ' + color_name + ' ' + size_name)
	} else {
		$goods_title.html(old_goods_title)
	}

}
if (sizeList.length) {
	bindClick(sizeList , orderSize ,function(foo){
		orderSize = foo
		resetColorBox(orderSize && orderSize.attr(_dataName))
		checkActive()
		updateStockMax()
		changeSkuMate()

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

		changeSkuMate()

		var color_selected = orderColor && orderColor.attr(_dataName)
	})
	resetColorBox()
}

function getOrderInfo(){
	var ret = {
		source : '5-0.0.1',
		'goods_pid': goods_pid,
		'goods_id' : goods_id,
		'twitter_id' : goods_twitter,
		'amount' : $('.numBox .nums').val() - 0,
		'shop_id': shop_id
		},
		sizeId  = '',
		colorId = '';

	if (orderSize) {
		sizeId = orderSize.data( 'id' )
		ret.size =  goods_prop.size.name + '__' + (goods_prop.size.value[orderSize.attr(_dataName) - 1] )
	}

	if (orderColor) {
		colorId = orderColor.data( 'id' )
		ret.color = goods_prop.color.name + '__' + (goods_prop.color.value[ orderColor.attr( _dataName ) - 1 ] )
	}

	ret.sku_id = getSKUId( colorId, sizeId )
	ret.r = $('[name="order_init_r"]').val() || ''
	return ret
}


function getSKUId( pref, suf ) {
	var tmp

	if ( pref && suf ) {
		tmp = pref + '_' + suf

		if ( !(tmp in goodsSKU) ) {
			tmp = suf + '_' + pref
		}
	} else {
		tmp = pref || suf
	}

	return goodsSKU[ tmp ].sku_id || goodsSKU[ tmp + '_' ].sku_id
}

var btn_box = $('.confirm_btn').on('tap', function(){
	var ele = $(this)
	if (ele.is('.non_buy')) return

	if (!checkLogin()) return

	if (!orderSize && goods_prop.size && goods_prop.size.is_show){
		alert('请选择 尺寸')
		return
	}else if (!orderColor && goods_prop.color.is_show){
		alert('请选择 颜色')
		return
	}

	var confirmCbk = ele.data('type') == 'buy' ? function(){
		var orderedInfo = getOrderInfo()
		orderedInfo['_cd'] = Meilishuo.config.nt
		orderedInfo['ori'] = 'share'
		var query = urlHandle.http_build_query(orderedInfo)
		window.location.href = window.__get_r('/order/init/?'+ query, fml.vars.common_r)
	} : function(){
		carts.addToCarts( getOrderInfo(), function(){})
	}

	confirmCbk()
	slide_bottom_out()

})

function updateStockMax(){
	var size = orderSize && orderSize.attr(_dataName) || 0
		,color = orderColor && orderColor.attr(_dataName)
	var stocks = goods_stock[size]
	changePrice(color,stocks);
	stocks = color ? stocks.color[color] : stocks.sum
	order_num.upStockNum(stocks)
}
function changePrice(color,stocks){
	var price_now = (color && stocks.price && stocks.price[color]) ? stocks.price[color] : (price > 0 && price_max > 0 && price != price_max) ? price + " ~ " + price_max : price;
	var org_price_now = (color && stocks.original_price && stocks.original_price[color]) ? stocks.original_price[color] : (org_price > 0 && org_price_max > 0 && org_price != org_price_max) ? org_price + " ~ " + org_price_max : org_price;

	$price_dom.find('.price').html("￥" + price_now);
	$price_dom.find('.org_price').html("￥" + org_price_now);
}

$('.cnt_seller').on('click', function(e){
	if(Meilishuo.config.user_id == 0){
		e.preventDefault()
		window.location.href = '/user/login'
		return false
	}
})
