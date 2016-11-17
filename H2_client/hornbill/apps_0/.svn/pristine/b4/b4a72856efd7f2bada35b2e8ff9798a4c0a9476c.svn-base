/*common*/
var $=require('wap/zepto'),
	Swipe = require( 'wap/component/swipe' ),
	WaterFall = require( 'circle/component/waterfall' ),
	optimiseFn = require('circle/component/waterfallOptimise'),
	lazy = require( 'm/component/lazyLoad' ),
	openAppLink = require('wap/app/openAppLink'),
	scroll = require('wap/component/windowScroll'),
    tracking = require('wap/app/tracking'),
	isManualSlide = false,//控制点击圆点之后，ppt不再滑动
	touchiSlide = false//控制滑动之后，ppt不再滑动
var classficationInfo = $('.classficationInfo'),
	designerShop = $('.designerShop'),
	designerGoods = $('.designerGoods'),
	swipe_wrap = $('.swipe-wrap'),
	spotWrap = $('.spotWrap'),
	qualityWrap = $('.qualityWrap'),
	saler = $('.saler'),
	designPortrait = $('.designPortrait'),
	select0 = $('.select0'),
	shopName = $('.shopName'),
	classification = $('.classification'),
	shopWrap = $('.shopWrap'),
	banner= $('.banner')
var lazyLoad = lazy.init({xpath:'.pic_load'});
var type = 'selected';//点击的时候获取关键字，带到链接地址
//banner跳转
function getBannerUrl(ele) {
	var url = ele.data('url');
	var params = '{"url":"' + url + '","inApp":"1"}';
	var href='meilishuo://openURL.meilishuo/?json_params=' + encodeURIComponent( params )
	var	openlink = Meilishuo.config.os.mlsApp ? href: url ;
	var param = ':_page_code=excellentShop:_page_area=good_shop:_pos_id=1';
	if(url){
		window.location.href =window.__get_r(openlink, banner.data('xr')+param);
	}
}
$('.banner').on('click' , function(){
	getBannerUrl($(this));
})

//改变圆点的样式
function changeSpot(index,elem){
	var str = '.'+'spot'+index
	var ind  = $(str);
	ind.addClass('on').siblings().removeClass('on');
}


//点击圆点跳转到相应的幻灯片
$( '.spotWrap' ).on( 'click' , '.spot' , function(){
	var index = $(this).data('id');
	mySwipe.slide( index , 400 );
	isManualSlide = true
} )
$('.preferablyInfoWrap').on( 'touchmove' , function(){
	touchiSlide = true;
} )

//分类瀑布流
function initWaterFall(key){
	var waterFallInstance = WaterFall.init({
		el: '.goods_wall',
		url: '/wx/excellentShop/aj/class_list',
		//dataName: 'tInfo', //默认
		colNum: 1,
		colGap : '0 0',
		hasSideGap : true,
		data : {
			'key' : key,
			'frame' : 0
		},
		dataFilter:function( data ) {
			return data
		},
		onFetchSuccess: function(data,index){
			lazyLoad.scroll();
			waterFallInstance._config.data.offset += 10
		},
		onFetchFinished: function(data){
			lazyLoad.load()
		},
		optimiseFn: optimiseFn
	});
	return waterFallInstance;
}
var water = initWaterFall('GARMENT');
water.start();//默认精选的数据
var classOffset = classification.offset().top;
// 判断时候支持position：sticky
function hasSticky() {
	var element = document.createElement('div');
	if ('position' in element.style) {
		element.style['position'] = '-webkit-sticky';
		element.style['position'] = '-moz-sticky';
		element.style['position'] = '-o-sticky';
		element.style['position'] = '-ms-sticky';
		element.style['position'] = 'sticky';
		return element.style['position'] === '-webkit-sticky' || element.style['position'] === '-moz-sticky' || element.style['position'] === '-o-sticky' || element.style['position'] === '-ms-sticky' || element.style['position'] === 'sticky'
	} else {
		return false;
	}
}

// tab吸顶
if (!hasSticky()) {
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > classOffset) {
			classification.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
		} else {
			classification.css({
				'position': 'static'
			});
		}
	});
}
//加载默认精选加样式
select0.addClass('active1');
var $old = $('.classficationInfo')
//点击分类，拉取不同的瀑布流数据
$('.classficationInfo').on( 'click' , function(){
	var thisS = $(this);
	var isActive = $(this).hasClass('active1');
	$('body')[0].scrollTop = classOffset;
	if(!isActive){
		$('.designerGoods').empty();
		water.destroy() //销毁瀑布流
		$old.removeClass('active1');
		thisS.addClass('active1');
		var classify = $(this).data('key');
		type = classify;
		tracking.cr( 'page_element', {
			'_action' : 'click'
			,'r' : '_page_code=excellectShop:_page_area=tab:_pos_name='+type
		} )
		water = initWaterFall(classify)//再次复制给water是为了每次点击分类之后能够将瀑布流销毁
		water.start();
	}
})
/*获取单品页链接*/
function getDoneUrl(ele,posName) {
	var twitter_id = parseInt(ele.data('tid')),
		// shopindex = ele.parent().data('shopindex')
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/wx/detail?tid=' + twitter_id;
	var shopindex = ele.parents('.shopWrap').data('shopindex');
	var posId = parseInt(ele.data('posid'));

	window.location.href = Url
}
//瀑布流单品
designerGoods.on( 'click' , '.goodsLink' , function(){
	getDoneUrl($(this),'goods');
});
//ppt单品
$('.goodsImgWrap').on('click' , function(){
	getDoneUrl($(this),'top_goods_goods');
})
/*获取店铺链接*/
function getShopUrl(ele,posName,pos) {
	var shop_id = parseInt(ele.data('shopid')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'shop',
			'param': {
				'shop_id': shop_id
			}
		}) : '/wx/shop/index/?shop_id=' + shop_id;
	var shopindex = ele.parents('.shopWrap').data('shopindex')
	window.location.href = Url
}
//进店逛逛
designerShop.on( 'click' , '.visitShop' , function(){
	getShopUrl($(this),'shop','-2');
} )

//商家头像
designerShop.on('click' , '.designPortrait' ,function(){
	getShopUrl($(this),'shop','-1');
})
//ppt轮播商家名称跳商家店铺
$('.shopName').on('click' , function(){
	getShopUrl($(this),'top_goods_shop','pos');
})
/*回顶部*/
var gotop = $('.gotop');
gotop.on("click", function(e) {
    document.body.scrollTop = 0;
});
scroll.yIn(30,function(){
    gotop.show();
},function(){
    gotop.hide();
});