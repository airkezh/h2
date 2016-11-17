/*common*/
var touch = require('wap/zepto/touch')
var stock = require('wap/app/doota/stock')
var urlHandle = require('wap/component/urlHandle')
var notice = require('meidian/app/notice')
var storage = require('component/wxstorage')
var timedown = require('wap/app/doota/timedown')

window.timedown = this.timedown;
$('#meta_add').attr('content','width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=2.0')

// type: weixin, weixin_timeline, weixin_favorite
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

var $_this = this;
    $('.time').each(
	function($_this){
		var _this = $(this);
		_this.removeClass('time');
		timedown.down(this, _this.attr('time'), 'd-0h-0i-0s',['<b>%v</b>天','<b>%v</b>小时','<b>%v</b>分','<b>%v</b>秒']).setHeartHum(100);
	})

var goods_sku = fml.vars.goods_sku
	, goods_wrap = $('.goods_wrap')
	, numBox = $('.amount .numBox')
	, colorList = $('#colorList>li>span')
	, goodsSku
	, goods_sku_id 
	, is_event = !!fml.vars.is_event

var order_num = stock.bind({
		'input': $('input', numBox),
		'minus': $('.minus', numBox),
		'plus': $('.plus', numBox),
		'stockMax': $('.amount .stock span')
	})

var pre_pink = $('.presale_acti_pink'),
	pre_pingray = $('.presale_acti_pingray'),
	pre_forws = $('.presale_acti_forws')
var pre_arr = [pre_pink,pre_pingray,pre_forws]
for(var i = 0;i < pre_arr.length; i++){
	(function(index){
	var pre_arrs = pre_arr[index]
		pre_arrs.on('tap',function(i){
			$('.black').removeClass('black').addClass('on');
			$(this).removeClass('on').addClass('black');
			isShow()			
		})

	}(i))
}
function isShow(){
	$('.pre_goods_msg').hide()
	if($('.black')){		
		$('.black .pre_goods_msg').css('display','block')
	}else{
		$('.black .pre_goods_msg').css('display','none')
	}
}

order_num.tipOnout = function(stat) {
		var msg_limit = $('.msg_limit'),
			msg_over = $('.msg_over'),
			msg_zero = $('.msg_zero')
		switch (stat) {
			case 1:
				msg_limit.show();
				msg_over.hide();
				msg_zero.hide()
				break;
			case 2:
				msg_limit.hide();
				msg_over.show();
				msg_zero.hide()
				break;
			case 3:
				msg_limit.hide();
				msg_over.hide();
				msg_zero.show()
				break;
			default:
				msg_limit.hide();
				msg_over.hide();
				msg_zero.hide()
		}
	}

if (colorList.length) {
	bindClick(colorList, goodsSku, function(foo) {
		goodsSku = foo
		//resetSizeBox(goodsSku && goodsSku.attr(_dataName))
		//checkActive()
		updateStockMax(goodsSku)
		updatePrice(goodsSku)
		updateSkuId(goodsSku)
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

function updateStockMax(goodsSku) {
	if(goodsSku){
		order_num.upStockNum(goodsSku.attr("sku_rep"))
		fml.vars.goods_total_repertory = goodsSku.attr("sku_rep")
	}
}

function updatePrice(goodsSku) {
	var price = goodsSku ? goodsSku.attr("sku_price") : fml.vars.goods_current_price;
	$('.price .now').html(price)
	var price_add = goodsSku ? goodsSku.attr("sku_o_price") : fml.vars.goods_o_current_price;
	$('.price .del').html('￥' + price_add)
	if(parseInt(price) == parseInt(price_add) && goodsSku){
		$('.price .del').css('display','none')
	}else{
		$('.price .del').css('display','inline-block')
	}
}



function updateSkuId(goodsSku) {
	goods_sku_id = goodsSku ? goodsSku.attr("sku_id") : $('#colorList li')[0].attr("sku_id")
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

function resetColorBox(size) {
		var colorSum = goods_sku[size || 0].color
		for (var i in colorSum) {
			var stock = colorSum[i]
			var boxItem = colorList.eq(i - 1)
			!size && boxItem.attr(_dataName, i)
			if (stock <= 0) {
				boxItem.addClass('out_of_stock')
			} else {
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
var $buy_btn = $('.buy_btn').on('tap', function(event) {
	event.preventDefault();
	var ele = $(this)
	if (ele.is('.non_buy')) return
 
	var confirmCbk = function() {
			var orderedInfo = getOrderInfo()
			if(goods_wrap.attr('goods_id')) 
				orderedInfo['goods_id'] = goods_wrap.attr('goods_id')
			if(goods_wrap.attr('share_id')) 
				orderedInfo['share_id'] = goods_wrap.attr('share_id')
			if(goods_sku_id) 
			 	orderedInfo['sku_id'] = goods_sku_id
			if($('.black').length > 0) {
				orderedInfo['item_id'] = $('.black').attr('item_id')
			}


			var query = urlHandle.http_build_query(orderedInfo)
			window.location.href = '/md/orderConfirm?' + query
		}
	if(storage.getCookie('mls_in_app') == 1){
		if(storage.getCookie('mls_logged_in') != 1){
			location.href = 'meilishuo://login.meilishuo';
			return
		}
	}else if (!window.WeixinJSBridge) {
		notice.show('请在微信内购买')
		return
	}

	if (is_event && $('.black').length == 0) {
		notice.show('请选择优惠方案', 'goods_msg')
		document.body.scrollTop = document.querySelector('.goods_wrap').clientHeight
	} else if(!goodsSku && fml.vars.goods_sku){
		notice.show('请选择型号', 'goods_msg')
	} else if(fml.vars.goods_total_repertory == 0){
		notice.show('暂无库存', 'goods_msg')
	} else{
		confirmCbk()
	}

})