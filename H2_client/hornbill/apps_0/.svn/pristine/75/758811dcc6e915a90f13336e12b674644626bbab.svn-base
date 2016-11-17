/*common*/
require('m/zepto/ajax')
require('m/zepto/form')
require('m/component/lazyLoad')
require('wap/app/dialog')
require('wap/zepto/fastclick');
/*
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
*/
var stock = require('wap/app/doota/stock')
	,checkLogin = require('wap/app/checkLogin')
	,carts = require('wap/app/doota/shopping_carts')
	,urlHandle = require('wap/component/urlHandle')
	,tab = require('wap/app/doota/tab')
	,timedown = require('wap/app/doota/timedown')
	,fallAdd = require('wap/app/fallAdd')
	,shareTmp = require('wap/component/shareTmp')
	,callApi = require('wap/component/callApi')
	,WaterFall = require( 'circle/component/waterfall')
    optimiseFn = require('circle/component/waterfallOptimise');

var goods_prop = fml.vars.goods_prop
	,goods_stock = fml.vars.goods_stock
	,goods_id = fml.vars.goods.id
	, sessid = fml.vars.globalKey
	,goods_pid = fml.vars.goods.pid
	,goods_twitter = fml.vars.goods.twitter_id
	,goodsSKU = fml.vars.goods_sku
	,shop_id = fml.vars.shop_id
	,price_max = fml.vars.goods.price_max
	,price = fml.vars.goods.price
	,org_price = fml.vars.goods.original_price
	,org_price_max = fml.vars.goods.original_price_max
	,$price_dom = $('.sku_meta')
	, couponList = $('#couponList')
	, gotop = $('.gotop')
	, sku_info_new = $('#sku_info_new')
	, curColor
	, curSize

if (!goods_stock) return
var orderSize
	,orderColor
	,_dataName = 'si'

var waterFallInstance = createWaterFall();

/*弹窗*/
var dialogFn = function(id){
	var tpl = shareTmp(id);
	$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('#maskLayer').on('tap' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
}

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


var skuInfoShow = function(){
	sku_info_new.show()
	$('#skuSize').find('.hide_msg').addClass('show_msg').attr('msgStatu', 1)
}

var skuInfoHide = function(){
	sku_info_new.hide()
	$('#skuSize').find('.hide_msg').removeClass('show_msg').attr('msgStatu', 0)
}


if(('#colorList li').length == 1) {
	if($('#colorList img').length == 0) {
		curColor = $('#colorList span').text()
	} else {
		curColor = $('#colorList span').children('img').attr('title')
	}
} else {
	$('#colorList span').on('tap',function(){
		if($(this).children('img').length == 0) {
			curColor = $(this).text()
		} else {
			curColor = $(this).children('img').attr('title')
		}
	})
}

if(('#sizeList li').length == 1) {
	curSize = $('#sizeList span').html()
} else {
	$('#sizeList span').on('tap', function(){
		curSize = $(this).html()
	})
}

var btn_box = $('.btn_box span').on('tap', function(){
	var ele = $(this)
	if (ele.is('.non_buy')) return

	if (!checkLogin()) return

	if(ele.is('.add_cart') || ele.is('.buy_btn')) {
		if (!orderSize && goods_prop.size && goods_prop.size.is_show){
			skuInfoShow()
			alert('请选择 尺寸')
			return
		}else if (!orderColor && goods_prop.color.is_show){
			skuInfoShow()
			alert('请选择 颜色')
			return
		}
	}

	if(ele.is('.sure_btn')) {
		if (!orderSize && goods_prop.size && goods_prop.size.is_show){
			alert('请选择 尺寸')
			return
		}else if (!orderColor && goods_prop.color.is_show){
			alert('请选择 颜色')
			return
		}else {
			$('#skuSize').find('.normal_title').hide()

			if(!curColor) {
				$('#skuSize').find('.choice_size').html('已选："'+ curSize + '"')
			} else if (!curSize) {
				$('#skuSize').find('.choice_size').html('已选："' + curColor + '"')
			} else {
				$('#skuSize').find('.choice_size').html('已选："' + curColor + '-' + curSize + '"')
			}

			skuInfoHide()
		}
	}

	var confirmCbk = ele.is('.buy_btn') || ele.is('.sure_btn') ?function(){
		var orderedInfo = getOrderInfo()
		orderedInfo['_cd'] = Meilishuo.config.nt
		orderedInfo['ori'] = 'share'
		var query = urlHandle.http_build_query(orderedInfo)
		// window.location.href = '/order/init/?'+ query
		window.location.href = window.__get_r('/order/init/?'+ query, fml.vars.common_r)
	} : function(){
		carts.addToCarts( getOrderInfo() ,function(){
		})
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
	changePrice(color,stocks);
	stocks = color ? stocks.color[color] : stocks.sum
	order_num.upStockNum(stocks)
}
function changePrice(color,stocks){
	var price_now = (color && stocks.price && stocks.price[color]) ? stocks.price[color] : (price > 0 && price_max > 0 && price != price_max) ? price + " ~ " + price_max : price;

	var org_price_now = (color && stocks.original_price && stocks.original_price[color]) ? stocks.original_price[color] : (org_price > 0 && org_price_max > 0 && org_price != org_price_max) ? org_price + " ~ " + org_price_max : org_price;

	// console.log(color);

	$price_dom.find('.price').html("￥" + price_now);
	$price_dom.find('.org_price').html("￥" + org_price_now);
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


$('.moreDetailBtn').on('click', function(){
	var $box = $(this).parents('.details')
	$box.is('.hide') ? $box.removeClass('hide') : $box.addClass('hide')
})


timedown.down('.countdown>span', parseInt($('.countdown').attr('remain')))
$('.countdown_l').each(function(){
	var ele = $(this)
	var remain = parseInt(ele.attr('remain'))
	if (!remain) return
	timedown.down(this , remain)
})


fml.use('m/component/lazyLoad' , function(){
	var lazyLoad = this.init({
		xpath:'.more_pic>span'
	//	, loadStyle:'img'
		, step_x : 60
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

/*
fml.use('wap/app/goAppWelcome' , function(){
	this.init();
});
*/

tab.bind({
	'tagPnl': '.tab_tle',
	'tabTag': '.tabArea',
	'activeTagClass': 'cur',
	'contents': '.contentArea'
});


function rollCommentPnl() {}

//点击详情的更多评论时 跳转评价详情标签
$('.comm_more').on('click', function() {
	$('#comments').trigger('tap')
})

$('.koubei_more').on('tap', function() {
	$('#koubei').trigger('tap')
})

$('.cosmetic').on('tap', function() {
	$(this).off('tap')

	fallAdd({
		'tid': fml.vars.goods.twitter_id,
		'cbk': rollCommentPnl,
		'url': '/aj/getComment/koubei',
		'processData': function(res) {
			return {
				'item': res.infos,
				'totalNum': res.pages.totalNum
			}
		},
		'box': '.cosmetic_content',
		'tmpId': 'twitter_cosmetic',
		'page': 0
	});
})

$('.recommend').on('tap', function() {
	$(this).off('tap')

	fallAdd({
		'tid': fml.vars.goods.twitter_id,
		'cbk': rollCommentPnl,
		'url': '/aj/getComment/shop?filter=0&filter_point=0',// 取4/5星的评论
		'processData': function(res) {
			return {
				'item': res.cInfos,
				'totalNum': res.pages.totalNum
			}
		},
		'box': '.comments_content',
		'tmpId': 'twitter_comment',
		'page': 0
	});
})

/*  优惠券领取   */
callApi.read({'url':'/coupon/coupon_share_for_wap'}, {shop_id: fml.vars.shop_id}, function(data) {
	$('#couponList').html(shareTmp('shopCoupon', {'item': data}));
})

couponList.on('click', '.js-cpn-btn' ,function(){
	if(!checkLogin()) return

	var $that = $(this)
		, code = $that.attr('data-code')
		, timeoutId

	callApi.write( {
        url: '/coupon/coupon_apply'
    }, {
        coupon_apply_code: code
    }, function( data ) {
        if ( data.code ) {
            $that.removeClass('js-cpn-btn').text('已领完').css({'color': '#ccc', 'border': 'none'});
        } else {
        	clearTimeout(timeoutId)
        	$('.tips').show()
        }

        timeoutId = setTimeout(function(){
        	$('.tips').hide()
        }, 2000)

    } )
})


$('#cpn_info').on('click',function(){
	var tpl = shareTmp('downloadApp');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('.dialog_box').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
})

/*尺寸*/

/*购买评论*/
$.get('/aj/share_item/goodsTag', {goods_id : fml.vars.goodsId}, function(data){
	var infos = data.tInfos
		,item;
	if ( infos && infos.tags_info ) {
		item = infos.tags_info
	}
	$('#cmt_evaluate').html(shareTmp('cmt_evaluateTpl', {'item' : item, 'totalTags' : infos.total_tags}));
},'json');

/*购买评论列表*/
$.get('/aj/share_item/goodsCmt', {'tid' : fml.vars.twitter_id , 'page' : 0}, function(data){
	if(!data || !data.length) {
		return
	}
	//如果评论数为 0，则不显示分类。data[0] 表示“全部评价”
	if(!data[0].total) {
		return
	}

	$('#cmt_tab').html(shareTmp('cmt_tabTpl', {'item' : data}))

	tab.bind({
		'tagPnl': '.cmt_tab',
		'tabTag': '.tab_list',
		'activeTagClass': 'cur',
		'contents': '.evaluateArea'
	});

},'json');

$('#cmt_tab').on('tap','.tab_list',function(){
	var cur = $(this).index()
	$('.evaluateArea').removeAttr('binded')
	$('.evaluate').empty()
	fallAdd({
		'tid': fml.vars.goods.twitter_id,
		'cbk': rollCommentPnl,
		'url': '/aj/getComment/shop?filter=0&filter_point='+cur,// 取4/5星的评论
		'processData': function(res) {
			return {
				'item': res.cInfos,
				'totalNum': res.pages.totalNum
			}
		},
		'box': '.evaluateArea',
		'tmpId': 'twitter_comment',
		'page': 0
	});
})

/*  店铺优惠券   */

$('.sku_coupon').on('tap','.hide_msg',function(event){
	event.stopPropagation();

	var msgStatu = $(this).attr('msgStatu')

	if(msgStatu == 0) {
		$(this).addClass('show_msg').attr('msgStatu', 1)
		$('.normal').hide()
		$('.cpn_list').show()
	} else {
		$(this).removeClass('show_msg').attr('msgStatu', 0)
		$('.normal').show()
		$('.cpn_list').hide()
	}

})

/* 选择尺码  */
var skuSize = function(ele){
	var _this = ele
		, statuIcon = _this.find('.hide_msg')
		, msgStatu = statuIcon.attr('msgStatu')

	if(msgStatu == 0) {
		_this.siblings('.sku_info_new').show()
		statuIcon.addClass('show_msg').attr('msgStatu', 1)
	} else {
		_this.siblings('.sku_info_new').hide()
		statuIcon.removeClass('show_msg').attr('msgStatu', 0)
	}
}

$('.sku_size').on('tap',function(){
	skuSize($(this))
})

/*  下载app  */

var downloadApp = function() {
	$('.noDownload').on('tap',function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	})

	$('.downloadBtn').on('tap',function(){
		$('.headApp').trigger('tap')
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	})
}

//店铺  联系卖家
$('.cnt_seller').on('click',function(event){
	dialogFn('downloadApp')

	downloadApp()

})

/*   buyBox   */
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop()
	if(scrollTop < 100) {
		$('.buyBox').hide()
	} else {
		$('.buyBox').show()
	}
})

/*  更多商品  */
function createWaterFall(type){
    var waterFallInstance = WaterFall.init({
        el: '#goods_wall',
        url: '/aj/shop/shop',
        tmpl: 'poster_tpl',
        data: {
            frame : 0 ,
            shop_id : fml.vars.shop_id,
            limit : 20
        },
         dataFilter : function(data){
            fml.vars.poster_r = data.r || '';
            return data.data.gInfo
        },
        colNum : 2,
        colGap : 0,
        optimiseFn : optimiseFn,
        onFetchSuccess: function(data){
            if(data.length == 0){
                $('.pullUp').attr('status','stop');
                this.lock();
            }
        }
    }).start();
    return waterFallInstance;
}






