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
	,tag = false;
var classficationInfo = $('.classficationInfo'),
	designerShop = $('.designerShop'),
	designerGoods = $('.designerGoods'),
	spotWrap = $('.spotWrap'),
	designPortrait = $('.designPortrait'),
	select0 = $('.select0'),
	classification = $('.classification'),
	banner= $('.banner'),
	loading = $('.loading'),
	more = $('.more'),
	gotop = $('.gotop');
var lazyLoad = lazy.init({xpath:'.goods , .designPortrait'});
var type = 'selected';//点击的时候获取关键字，带到链接地址
//banner跳转
function getBannerUrl(ele) {
	var url = ele.data('url').trim();
	var index = url.indexOf('meilishuo://');
	var openlink;
	if( index < 0 ){
		var params = JSON.stringify({
					url:url
					,inApp:1
				});
		var href='meilishuo://openURL.meilishuo/?json_params=' + encodeURIComponent( params )
		openlink = Meilishuo.config.os.mlsApp ? href: url ;
	}else{
		openlink = url;
	}
	tracking.cr( 'page_element', {
		'_action' : 'click'
		,'r' : ele.data('xr')
	} )
	if(url){
		window.location.href =openlink;
	}
}
banner.on('click' , function(){
	getBannerUrl($(this));
})
window.mySwipe = Swipe(document.getElementById('slider'), {
	startSlide : 0,
	speed : 400,
	auto : 3000,
	continuous : true,
	disableTouch : false,
	disableScroll : false,
	stopPropagation : false,
	callback : function(index, elem){
		changeSpot(index,elem);
	},
	transitionEnd: function(index, elem) {
		if ( touchiSlide || isManualSlide ) {
			isManualSlide = false;
			touchiSlide = false;
			mySwipe.begin();//点击圆点，或者滑动之后，让ppt重新动起来
		}
	}
});
//改变圆点的样式
function changeSpot(index,elem){
	var str = '.'+'spot'+index
	var ind  = $(str);
	ind.addClass('on').siblings().removeClass('on');
}

// 轮播显示的圆点点
var scrollLen = mySwipe.getNumSlides()
var	spotWrapLen = 30*scrollLen;
for(var i = 0 ; i<scrollLen ;i++ ){
	spotWrap.append('<span class="spot'+' '+'spot'+i+'" data-id="'+i+'"></span>');
}
$('.spot0').addClass('on').siblings().removeClass('on'); //页面加载进来，第一个加类on
spotWrap.css( 'width' , spotWrapLen+'px');
spotWrap.css( 'margin' , '0 auto');

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
		url: '/activity/excellentShop/aj/class_list',
		//dataName: 'tInfo', //默认
		colNum: 1,
		colGap : '0 0',
		hasSideGap : true,
		data : {
			'key' : key,
			'frame' : 0
			,'limit' : 10
			,'__get_r' :1
		},
		dataFilter:function( data ) {
			fml.vars.r = data.r;
			return data.data
		},
		onFetchSuccess: function(data,index){
			lazyLoad.scroll();
			waterFallInstance._config.data.offset += 10
		},
		onFetchFinished: function(data){
			lazyLoad.load()
			loading.attr('status','stop');
			loading.hide();
			if(!tag){
				designerGoods.data('xr' , fml.vars.r);
				tag = true;
			}
			if(JSON.parse(data.response).data.length==0){
				more.attr('status','stop')
			}
		},
		optimiseFn: optimiseFn
	});
	return waterFallInstance;
}
var water = initWaterFall('selected');
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
//点击分类，拉取不同的瀑布流数据
$('.classficationInfo').on( 'click' , function(){
	var thisS = $(this);
	var isActive = $(this).hasClass('active1');
	$('body')[0].scrollTop = classOffset;
	if(!isActive){
		designerGoods.empty();
		loading.show();
		loading.attr('status','loading');
		more.attr('status','tap');
		water.destroy() //销毁瀑布流
		classficationInfo.removeClass('active1');
		thisS.addClass('active1');
		var classify = $(this).data('key');
		type = classify;
		tracking.cr( 'page_element', {
			'_action' : 'click'
			,'r' : '_page_code=activity-excellentShop_index:_page_area='+type+':_pos_name=tab'
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
		}) : '/share/item/' + twitter_id;
	var shopindex = ele.parents('.shopWrap').data('shopindex');
	var posId = parseInt(ele.data('posid'));
	if(posName=='goods'){
		var param = ':_page_area='+type+':_pos_id='+posId+':_pos_name='+twitter_id+':_ext_num='+shopindex;
	}else{
		var param = ':_page_area=top_goods'+':_pos_id='+posId+':_pos_name='+twitter_id;
	}
	window.location.href = window.__get_r(Url, designerGoods.data('xr')+ param);
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
		}) : '/shop/shop/' + shop_id;
	var shopindex = ele.parents('.shopWrap').data('shopindex')
	if(posName == 'shop'){
		var param = ':_page_area='+type+':_pos_id='+pos+':_pos_name='+shop_id+':_ext_num='+shopindex;
	}else{
		var posId = parseInt(ele.data('posid'));
		var param = ':_page_area=top_goods'+':_pos_id=-'+posId+':_pos_name='+shop_id;
	}
	window.location.href = window.__get_r(Url , designerGoods.data('xr')+param) ;
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
gotop.on("click", function(e) {
    document.body.scrollTop = 0;
});
scroll.yIn(30,function(){
    gotop.show();
},function(){
    gotop.hide();
});