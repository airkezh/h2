/*common*/
require('wap/zepto/fastclick');
var	scroll = require('wap/component/windowScroll')
	,check = require('circle/app/checkLogin')
	,WaterFall = require( 'circle/component/waterfall' )
	,optimiseFn = require('circle/component/waterfallOptimise')
	,lazy = require( 'm/component/lazyLoad' )
	,openAppLink = require('wap/app/openAppLink')
var lazyLoad = lazy.init({xpath:'.goodsImg div'});
var $gotop = $('.gotop')
	,$wortWay = $('.wortWay')
	,$like = $('.like')
	,$more = $('.more')
	,$loading = $('.loading')
	,$goodsWrap = $('.goodsWrap')
	,$sort = $('.sort')
	,$searchWrap = $('.searchWrap')
	,$sortBox = $('.sortBox')
// 吸顶
var hei = 0;
var classOffset = $sortBox.offset().top;
	var searchOffset = $searchWrap.offset().top;
	hei = $searchWrap.height()
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
			$sortBox.css({
				'position': 'fixed',
				'left': 0,
				"top": hei
			});
		} else {
			$sortBox.css({
				'position': 'static'
			});
		}
		if( t>searchOffset ){
			$searchWrap.css({
				'position' : 'fixed'
				,'left' : 0
				,'top' : 0
			})
		}else{
			$searchWrap.css({
				'position' : 'static'
			})
		}
	});
}
//-------------瀑布流--------------
//分类瀑布流
function initWaterFall(key,sort){
	var waterFallInstance = WaterFall.init({
		el: '.goods_wall',
		url: '/hiGoods/aj/searchGoods',
		colNum: 2,
		colGap : '0 16',
		hasSideGap : true,
		data : {
			'key_word' : key
			,'flag' : 'list'
			,'sort' : sort
			,'limit' : 10
			,'__get_r' :1
		},
		dataFilter:function( data ) {
			return data.data.search
		},
		onFetchSuccess: function(data,index){
			$more.hide();
			lazyLoad.scroll();
			lazyLoad.load();
			waterFallInstance._config.data.offset += 10
		},
		onFetchFinished: function(data){
			lazyLoad.load();
			$more.show();
			$loading.attr('status','stop');
			$loading.hide();
			if(JSON.parse(data.response).data.search.length==0){
				$more.attr('status','stop')
			}
		},
		optimiseFn: optimiseFn
	});
	return waterFallInstance;
}
var water = initWaterFall(fml.vars.keyword,'weight');
water.start();
function loadWater(obj){
	$goodsWrap.empty();
	$loading.show();
	$loading.attr('status','loading');
	$more.attr('status','tap');
	water.destroy() //销毁瀑布流
	$sort.removeClass('active');
	obj.addClass('active');
	var classify = obj.data('key');
	type = classify;
	water = initWaterFall( fml.vars.keyword , classify );//再次复制给water是为了每次点击分类之后能够将瀑布流销毁
	water.start();
}
$('.sort').on( 'click' , function(){
	var thisS = $(this);
	var isActive = $(this).hasClass('active');
	var isPrice = thisS.hasClass('sortPrice');
	$('body')[0].scrollTop = searchOffset;
	if( !isPrice ){
		if(!isActive){
			loadWater($(this));
		}else{
			return;
		}
	}else{
		if( $(this).data('key') == 'price_desc' ){
			$(this).attr('data-key', 'price_asc')
			$(this).find('i').css({
				'background-image' : "url('http://d04.res.meilishuo.net/pic/_o/26/37/e79294e30b2f312a8d6ead70d32a_16_28.cj.png')"
			})
		}else{
			$(this).attr('data-key', 'price_desc')
			$(this).find('i').css({
				'background-image' : "url('http://d04.res.meilishuo.net/pic/_o/d7/97/dea222453639e04e457cd778fd2f_16_28.cj.png')"
			})
		}
		loadWater($(this));
	}
})
//喜欢 操作
$('.goodsWrap').one( 'click' , '.like' , likeFn );
function likeFn(){
	var data = {
		'stid' : $(this).data('tid')
	};
	var tag = $(this);
	var index = $(this).parent().parent().index()
	var tid = $(this).data('tid')
	var like = $(this).data('islike');
	var likeNum = $(this).children()
	var num = parseInt($(this).html())
	if(!check()){ //没登陆跳登录页
		return;
	}else{
		$.post('/hiGoods/aj/like',data,function(res){
			console.log(res);
			if( !tag.hasClass('redHeart') ){
				//变黄心
				tag.addClass('redHeart');
				tag.css('background-image' , 'url("http://d02.res.meilishuo.net/pic/_o/ad/c4/d1ffc7b8a94e77c24cd4decf9e84_30_25.cj.png")')
				tag.html(num+1)
			}else{
				//变灰心
				tag.removeClass('redHeart')
				tag.css('background-image' , 'url("http://d04.res.meilishuo.net/pic/_o/ea/be/5c5e3f238b0b23cfeab125c5de8e_30_25.cj.png")')
				tag.html(num-1)
			}
			$('.goodsWrap').one( 'click' , '.like' , likeFn );
		},'json')
	}
}
/*获取单品页链接*/
function getDoneUrl(ele) {
	var twitter_id = parseInt(ele.data('tid')),
		Url;
		if( Meilishuo.config.os.mlsApp ){
			Url = openAppLink.getAppLink({
				'protocol': 'twitter_single',
				'param': {
					"twitter_info": {
						"twitter_id": twitter_id,
						"is_doota": 1
					}
				}
			}) 
		}else if(Meilishuo.config.os.weixinBrowser){
			Url = '/wx/detail?tid='+twitter_id
		}else{
			Url = '/share/item/' + twitter_id;
		}
	window.location.href = Url
}
/*获取店铺链接*/
function getShopUrl(ele,param) {
	var shop_id = parseInt(ele.data('shop')),
		Url;
        if(Meilishuo.config.os.mlsApp){
            Url =  openAppLink.getAppLink({
                'protocol': 'shop',
                'param': {
                    'shop_id': shop_id
                }
            })
        }else if(Meilishuo.config.os.weixinBrowser){
            Url = '/wx/shop/index/?shop_id='+shop_id
        }else{
            Url ='/shop/shop/' + shop_id
        }
	window.location.href = window.__get_r(Url , param) ;
}
$('.goodsWrap').on( 'click' , '.goodsImg' , function(){
	getDoneUrl( $(this) );
})
/*回顶部*/
$gotop.on("click", function(e) {
    document.body.scrollTop = 0;
});
scroll.yIn(30,function(){
    $gotop.show();
},function(){
    $gotop.hide();
});