/*common*/
var $                         = require('wap/zepto')
var waterFall                 = require( 'circle/component/waterfall' );
var biWaterFallPlugin         = require('circle/component/biWaterfallPlugin')
var optimiseFn                = require('circle/component/waterfallOptimise')
var waterFallReflowPlugin     = require( 'circle/component/waterfallReflowPlugin' );
var waterfallDataUniquePlugin = require( 'circle/component/waterfallDataUniquePlugin' );
var Lazy                      = require('m/component/lazyLoad')
var UrlHandle                 = require('wap/component/urlHandle')
var Alert                     = require('wap/ui/alert')
var lazyLoad                  = Lazy.init({ xpath: '.pic_load' })

var href                      = location.href;
var urlParams                 = UrlHandle.getParams( href );
var shopId                    = urlParams.shop_id;

/**
 * goods_ctime : 默认( data-id : 0 )
 * goods_on_shelf : 最新( data-id : 1 )
 * sale_num : 热销( data-id : 2 )
 * ['price_high','price_lower'] 价格( data-id : 3 )
 * price_high - 降序； lower - 升序
 */
var walterfallInstance = {
	'base' :  'goods_ctime',
	'new' :  'goods_on_shelf',
	'hot' :  'sale_num',
	'price-h' : 'price_high',
	'price-l' : 'price_lower'
};
var sortBy      =   urlParams['tab'] || 'base';

var GOODS_SHELF = '.goods-wall';  //瀑布流渲染父级：.goods-wall
var $gShelf     = $(GOODS_SHELF);

/* 瀑布流tab */
var $sortItem   = $('.s_item');
var $price      = $sortItem.eq(3)  // 这里的3是表示价格 sort item 
var $pullUp		= $('.pullUp');
var flag        = true;
var Wf          = null;
var cashe       = {};

var gNav = $('#goods-nav');
var navTop = 0;
var scrollH = 0;
var setH = 0;
/** main */

/* 关注 */
var followFlag = true;
$('.follow-wrap').on('click','.can-focus', function(event) {

	if(!followFlag) return;
	followFlag = false;

	var _this = $(this);
	var focusAjaxCbk = function(data){
		if(data.code === 0){
			_this.removeClass('can-focus').html('已关注');
		}
		myAlert(data.msg);
		followFlag = true;
	}
	$.post('/aj/wx/shop/shop_follow', { shop_id: shopId }, focusAjaxCbk,'json');
});



/* 预先绑定懒加载事件 */
lazyLoad.scroll()
/* 初始时手动出发一次瀑布流 */
switchWaterfall( sortBy ) //goods_ctime

/* 瀑布流tab */
$sortItem.on('click', function (){
	var _this = $(this)
	var type = _this.data('type')
	var isActive = _this.hasClass('active')

	// 避免点击过快创建多个瀑布流对象
	if(!flag) return
	flag = false
	
	switch (type){
		case 'price':
		case 'price-h':
			type = 'price-l'
			_this.data('type','price-l')
			break;

		case 'price-l' : 
			type = 'price-h'
			_this.data('type','price-h')
			break;

		default:
			if(isActive) return
			$price.data('type', 'price') //恢复price
	}

	$sortItem.removeClass('active')
	_this.addClass('active')
	scrollH = window.scrollY;
	if(!navTop){
		/* 这里的10是试出来 用于美观平衡值 */
		navTop = parseInt( gNav.offset().top ) + 15 ;
	}
	setH = scrollH < navTop ? scrollH : navTop


	biWaterFallPlugin.reset(); //重置url参数

	/* 更新tab值 */
	urlParams['tab'] = type;
	history.pushState( null,  '' , '?' + UrlHandle.http_build_query( urlParams ) ); 

	switchWaterfall( type )
	window.scrollTo(0,setH);
	
})

$( window ).on('wx-sign-over', function(event) {
	Wf.updateParam( 'isAutoUpdateURL' , true);
});

// function gScrollTo( setH ){
// 	window.scrollTo(0,setH)
// }

/* 加载瀑布流 */
function switchWaterfall(type,scrollH){

	if(Wf){
		Wf.destroy()
		Wf = null
	}

	resetLayout()  //重置

	Wf = waterFall.init({
		el: GOODS_SHELF,
		// tmpl: 'posterWall',
		url: '/aj/wx/shop/shop_waterfall',
		data: { shop_id: shopId, _orderby: walterfallInstance[type], limit: 10 },
		uniquekey: 'twitter_id,n_pic_file',
		plugins: [ biWaterFallPlugin, waterFallReflowPlugin , waterfallDataUniquePlugin],
		isAutoUpdateURL : false, //专为微信分享url定制（有分享设置）
		dataName: 'gInfo',
		keywords: ['shop_id',{ 'keyword' : 'tab', 'default' : 'base' }], //tab的默认值是base
		colNum: 2,
		tabType : type, //没有实际意义，是为了wfDataFilter里面能取到type值
		colGap : "10 8",
		hasSideGap : true,
		dataFilter: wfDataFilter,
		onFetchSuccess: wfOnFetchSuccess,
		onFetchFinished: wfOnFetchFinished,
		optimiseFn: optimiseFn
	})

	Wf.start()
}



function wfDataFilter(data){
	var wfConfig = this._config
	var gd       = wfConfig.dataName
	var type 	= wfConfig.tabType;

	//缓存第一帧的数据
	if(data.frame == 0){
		cashe[type] = data
	}
	return data[gd]
}

function wfOnFetchSuccess(data){
	if(data.length === 0){
		$pullUp.attr('status','stop')
		this.destroy()
		Wf = null
	}
}

function wfOnFetchFinished(data, textStatus){

	if(textStatus == 'timeout'){
		myAlert('抱歉~网络不给力，数据拉不出 o(╯□╰)o')
	}
	lazyLoad.load()
	flag = true
}

function resetLayout(){
	$pullUp.attr('status','loading')
	$gShelf.empty().height( setH )
}

function myAlert(ct, cbk){
	return new Alert({ 
		content: ct,
		onSure : cbk
	})
}