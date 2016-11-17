/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick')
require('wap/zepto/fx_methods')
require('wap/zepto/scroll')

var stock = require('wap/app/doota/stock')
	,Confirm = require('wap/ui/confirm')
	,urlHandle = require('wap/component/urlHandle')
	,api = require('component/callApi')
	,Alert = require('wap/ui/alert')
	,tracking = require('wap/app/tracking')
	,goods_prop = fml.vars.goods_prop
	,goods_stock = fml.vars.goods_stock
	,price_max = fml.vars.goods.price_max
	,price = fml.vars.goods.price
	,org_price = fml.vars.goods.original_price
	,org_price_max = fml.vars.goods.original_price_max
	,$price_dom = $('.price')
	

if (!goods_stock) return;
var orderSize
	, orderColor
	, _dataName = 'si'

var numBox = $('.amount .numBox')             //数量
	, sizeList = $('#sizeList>li>span')
	, colorList = $('#colorList>li>span')
	, colorShow = $('.colorShow')

var $notice = $('#propNotice')        //弹出框
	, t = null

var extraParamsStr = ''

/*兼容input 返回缓存*/
if($('input.nums').val() > 1 ){
	$('input.nums').val(1);
}


fml.on('update_num',function(data){
	numBox.children('.buy_num').html(data.num);     //购物车数量
})

var gnameTop = 0;
var $goods_name = $('#goods_name');

var $win = $(window);
var $nav = null;
var navOffsetT = 0;
var navOffsetH = 0;
/* 中部 菜单吸顶 */
$(function (){
	/* 取#goods_name高度，定位屏幕到SKU部分 */
	gnameTop = $goods_name.offset().top
	$nav = $('.nav')
	$nav.css({
		'position' : '-webkit-sticky',
		'top' : 0
	})
	if(!($nav.css('position')).match('sticky')){

		navOffsetT = parseInt( $('.goods_detail').offset().top );
		navOffsetH = $nav.offset().height;

		$win.on('scroll',function (){ 			
			if( navOffsetT < $win.scrollTop() + navOffsetH ){
				$nav.css({
					'position' : 'fixed',
					'top' : 0
				})
			}else{
				$nav.css('position','static')
			}
		})
	}
})

var showNotice = function(obj, txt){
	clearTimeout(t)
	if(gnameTop < 500){
		gnameTop = $goods_name.offset().top
	}
	$.scrollTo({
	    endY: gnameTop,
	    duration: 0,
	    callback: function() {}
	});

	if(obj.attr('shown') != '1')
		obj.attr('shown', '1').fadeIn()

	obj.html(txt)

	t = setTimeout(function(){
		obj.attr('shown', '0').fadeOut()
	}, 3000)
}

$.scrollTo({
    endY: $.os.android ? 46 : 45,
    duration: 0,
    callback: function() {}
});

var order_num = stock.bind({
	'input': $('input', numBox),
	'minus': $('.minus', numBox),
	'plus': $('.plus', numBox),
	'stockMax': $('.amount .stock span')
});

order_num.tipOnout = function(stat) {
	var msg_limit = $('.msg_limit'),      //限购100
		msg_over = $('.msg_over'),      //超过库存
		msg_zero = $('.msg_zero')        // 卖完了
	switch (stat) {
		case 1:
			tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addMaxAmount'})
			msg_limit.show();
			msg_over.hide();
			msg_zero.hide()
			break;
		case 2:
			tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addMaxAmount'})
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

function getOrderInfo() {
	var goodsArea = $(this).parents('.goodsArea')

	if(!goodsArea.length)
		goodsArea = $('.goodsArea')

	var ret = {
		'source': '8-0.0.8',
		'goods_pid': goodsArea.attr('pid'),
		'goods_id': goodsArea.attr('goods_id'),
		'twitter_id': goodsArea.attr('twitter_id'),
		'amount': $('.amount .nums').val() - 0
	}

	var skuInfo = {}
	fml.vars.skuInfo.forEach(function(v, i){
		skuInfo[i] = v;
	});

	if (orderSize){
		ret.size = goods_prop.size.name + '__' + (goods_prop.size.value[orderSize.attr(_dataName) - 1]);
	}
	if (orderColor){
		ret.color = goods_prop.color.name + '__' + (goods_prop.color.value[orderColor.attr(_dataName) - 1]);
		var skuAll = skuInfo[0];
		skuAll.value.forEach(function(v, i){
			if (v == goods_prop.color.value[orderColor.attr(_dataName) - 1]) {
				if (!orderSize) {
					ret.sku_id = skuAll.stock[i][0].sku_id;
				}else{
					skuAll.stock[i].forEach(function(_v, _i){
						if (_v.stock_prop == '-') {
							ret.sku_id = _v.sku_id;
						}else if (_v.stock_prop == goods_prop.size.value[orderSize.attr(_dataName) - 1]) {
							ret.sku_id = _v.sku_id;
						};
					});
				}
			};
		});
	}

	return ret
}

var $cartNum = $('.cart_img');
/* 获取购物车数量 */
api.read({'url':'/cart/number'},{}, function(data){
	if(data.code == 0 && data.info.count != 0){
		$cartNum.show().children('.cart_num').html(data.info.count);
	}
})

/*加入购物车*/
var $cart_btn = $('.btn_box .cart_btn')
$cart_btn.on('click',function(){
	tracking.cr('wx/statistics_action', {'action': 'twitterClickBuy', 'value': 'addCart'})
	var add_cart = function(){
		//发请求，加入购物车
		var orderedInfo = getOrderInfo();
		// 微信的增加用 update api: /wx/cart_add  /cart/add
		api.write({'url':'/cart/add'},orderedInfo, function(data){
			if(data.code == 0 && data.info.contain_china > 0){
				$cartNum.show().children('.cart_num').html(data.info.contain_china);
				tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addCartSucc'})
				showNotice($notice, '加入购物车成功')
			}else if (data.code == 0) {
				tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addCartSucc'})
				showNotice($notice, '加入购物车成功')
			}else{
				var a = new Alert({
					content : data.info.msg
				})
			}
		})
	}
	sku_hint(add_cart);
})

/*立即购买*/
var $btn_box = $('.btn_box span.go_buy').on('click', function() {
	var ele = $(this)
	if (ele.is('.non_buy')) return

	var confirmCbk = function() {
		tracking.cr('wx/statistics_action', {'action': 'twitterClickBuy', 'value': 'buy'})
		var orderedInfo = getOrderInfo()
		orderedInfo['_cd'] = Meilishuo.config.nt
		orderedInfo['ori'] = 'share'
		var query = urlHandle.http_build_query(orderedInfo)
		window.location.href = '/wx/orderconfirm?' + query + '&max=' + fml.vars.goods_stock_max + '&wechat_card_js=1' + extraParamsStr;
	}
	sku_hint(confirmCbk);
})

/* 选择SKU属性 提示判断 */
var sku_hint = function(callback){
	if (!orderColor && goods_prop.color.is_show) {
		tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'selectProp'})
		if (!orderSize && goods_prop.size && goods_prop.size.is_show){
			showNotice($notice, '请选择颜色/尺寸分类')
		}
		else{
			showNotice($notice, '请选择颜色分类')
		}
	}else{
		if (!orderSize && goods_prop.size && goods_prop.size.is_show){
			tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'selectProp'})
			showNotice($notice, '请选择尺寸分类')
		}
		else{
			if(callback && callback()==false){
				return false;
			}
		}
	}
}

updateStockMax()

/*     存货      */
function resetSizeBox(color) {
	if(color === null){
		tracking.cr('wx/statistics_action', {'action': 'twitterSelectProp', 'value': 'color_unselected'})
	}else if(color){
		tracking.cr('wx/statistics_action', {'action': 'twitterSelectProp', 'value': 'color_selected'})
	}
	for (var i = 1, j = goods_stock.length; i < j; i++) {
		var stock = goods_stock[i]
		stock = color ? stock.color[color] : stock.sum
		var boxItem = sizeList.eq(i - 1)
		!color && boxItem.attr(_dataName, i)
		if (stock <= 0) {
			boxItem.addClass('out_of_stock')
		} else {
			boxItem.removeClass('out_of_stock')
		}
	}
}
/*    重置颜色     */
function resetColorBox(size) {
	if(size === null){
		tracking.cr('wx/statistics_action', {'action': 'twitterSelectProp', 'value': 'size_unselected'})
	}else if(size){
		tracking.cr('wx/statistics_action', {'action': 'twitterSelectProp', 'value': 'size_selected'})
	}
	// if(size){
	// 	tracking.cr('wx/statistics_action', {'action': 'twitterSelectProp', 'value': 'size'})
	// }
	var colorSum = goods_stock[size || 0].color

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

function bindClick(list, fObj, cbk) {
	list.on('click', function() {
		var ele = $(this)
		if (ele.is('.out_of_stock')) return false
		if (ele.is('.active')) {
			ele.removeClass('active');
			if(list == colorList){
				colorShow.hide()
			}
			fObj = null
		} else {
			if (fObj) fObj.removeClass('active')
			fObj = ele.addClass('active')
			var imgurl = $(this).attr('imgurl')
			if(imgurl){
				colorShow
					.css({'background-image' : 'url("' + imgurl + '")'})
					.show()
			}else if(!imgurl && list==colorList){
				colorShow.css({'background-image' : ''}).hide();
			}
		}
		cbk && cbk(fObj)
		return false
	})
	if (1 == list.length) {
		list.eq(0).attr(_dataName,1).trigger('click')
		// list.eq(0).trigger('click');
	}
}
/*   更新存货大小*/
function updateStockMax() {
	var size = orderSize && orderSize.attr(_dataName) || 0,
		color = orderColor && orderColor.attr(_dataName)
		var stocks = goods_stock[size]

	changePrice(color,stocks);
	stocks = color ? stocks.color[color] : stocks.sum
	order_num.upStockNum(stocks)

	fml.vars.goods_stock_max = stocks
}
/*   改价格*/
function changePrice(color,stocks){
	var price_now = (color && stocks.price && stocks.price[color]) ? stocks.price[color] : (price > 0 && price_max > 0 && price != price_max) ? price + " ~ " + price_max : price;

	var org_price_now = (color && stocks.original_price && stocks.original_price[color]) ? stocks.original_price[color] : (org_price > 0 && org_price_max > 0 && org_price != org_price_max) ? org_price + " ~ " + org_price_max : org_price;

	$price_dom.children('.now_price').html("￥" + price_now);
	$price_dom.children('.normal').html("￥" + org_price_now);
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

if (sizeList.length) {
	bindClick(sizeList, orderSize, function(foo) {
		orderSize = foo
		resetColorBox(orderSize && orderSize.attr(_dataName))

		checkActive()
		updateStockMax()
		var size_selected = orderSize && orderSize.attr(_dataName)
	})
	resetSizeBox()
}
if (colorList.length) {
	bindClick(colorList, orderColor, function(foo) {
		orderColor = foo
		resetSizeBox(orderColor && orderColor.attr(_dataName));

		checkActive()
		updateStockMax()
		var color_selected = orderColor && orderColor.attr(_dataName)
	})
	resetColorBox()
};

/* 添加跳转订单确认页时需带上额外的参数 */
function addExtraParams(data) {
	if (!data) return
	extraParamsStr = '&' + urlHandle.http_build_query(data)
}
exports.addExtraParams = addExtraParams

/* 菜单 Tab 切换 */
var tabNav = require('wap/app/doota/tab');
tabNav.bind({
	'tagPnl': '.tab_tle',
	'tabTag': '.tabArea',
	'actType' : 'click' ,
	'activeTagClass': 'cur',
	'contents': '.contentArea'
});

/* lazyLoad */
fml.use('wap/component/lazyLoad', function() {
this.load('.more_pic span', 'asrc');
this.load('.pro_pic span', 'asrc');
})


/* 拉评价 */
var fallAdd = require('wap/app/fallAdd');
var $comments = $('#comments');
var commentsNum = $comments.data('num');
//数据拉取完毕 回调函数
function rollCommentPnl() { }
/*   用户评价     */
$comments.on('click', function() {
	$(this).off('click')
	if(commentsNum > 0){
		fallAdd({
			'tid': fml.vars.goods.twitter_id,
			'cbk': rollCommentPnl,
			'url': '/aj/getComment/shop?wxmall=1&filter=1',// 取4/5星的评论
			'processData': function(res) {
				// console.log(res)
				return {
					'item': res.cInfos,
					'totalNum': res.pages.totalNum
				}
			},
			'box': '.comments_content',
			'tmpId': 'twitter_comment',
			'page': 0
		});
	}
	
});

//商品详情，下面的评论 ，加载f
$('.comm_more_list').on('click', function() {   
    //查看更多评价
	$comments.trigger('click');
});

/*购物晒单*/
$('.show_more').on('click', function() {
	$(this).off('click')
	fallAdd({
		'cbk': rollCommentPnl,
		'url': '/aj/wx/detail/show_img_list?twitter_id='+fml.vars.goods.twitter_id,
		'processData': function(res) {
			// console.log(res)
			return {
				'item': res.aInfo,
				'totalNum': res.totalNum
			}
		},
		'box': '.show_pic',
		'tmpId': 'twitter_show_pic',
		'page': 1
	});	
});

var $imgMark = $('#img-mark');
var $detail = $('.goods_detail');

$detail.on('click', '.more_pic img , .item-img', function() {
	$imgMark.css('background-image' , 'url('+$(this).attr('src')+')' ).show(); 
});
colorShow.on('click',function(){
	var colorShowImg =  $(this).css('background-image');
	$imgMark.css('background-image' , colorShowImg ).show(); 
});
$imgMark.on('click', function() {
	$(this).hide();
});
/***
活动倒计时代码
fml.use(['wap/app/doota/timedown', 'wap/zepto'], function() {
	var timedown = this.timedown
	    , remain = parseInt($('.countdown').attr('remain'))

	if(!remain) return
	var down = timedown.down('.time_v>span', remain)
	down.onTimeOver(function(){
		//1.立即购买按钮置灰
		//2.倒计时部分，秒杀商品的倒计时，只读取秒杀结束的时间，当倒计时到0
	    $('.countdown').children('.time_v').html('活动结束');
		$('.btn_box span.go_buy').addClass('non_buy');
	})
})

***/

