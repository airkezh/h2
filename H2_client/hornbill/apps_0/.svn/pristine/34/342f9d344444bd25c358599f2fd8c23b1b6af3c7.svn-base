/*common*/
require( 'wap/zepto' );
require('wap/zepto/scroll');
require('wap/zepto/fastclick');
require('wap/app/historyBack');

var WaterFall = require( 'circle/component/waterfall')
	, optimiseFn = require('circle/component/waterfallOptimise')
	, carts = require('wap/app/doota/shopping_carts')
	, lazy = require('wap/component/lazzyLoad')
	, Sticky = require('wap/component/sticky')
	, urlHandle = require('wap/component/urlHandle')

var urlParams = urlHandle.getParams(window.location.search)
	, category_id = urlParams.category_id
	, item_name = urlParams.item_name

if(item_name == '全部商品'){item_name = ''}

var filterParams = ['goods_ctime', 'goods_on_shelf', 'sale_num', 'price_lower', 'price_high']
	, $goodsWall = $('#goods_wall')
	, $order = $('.order', $('nav'))
	, $orderIcon = $('#price_order')
	, UP = 'price-up'
	, DOWN = 'price-down'
	, frameContent = {}
	, waterFall = {}
	, poster_data = {}
	, currentType = ''
	, navTop = 0

function posterParamsInit(){
	if(urlParams.category_id == ''){
		poster_data = {
			'url' : '/aj/wap/shop/Wap_shop_inner_goods_search'
			, 'data' : {
				'frame' : 0
				, 'shop_id' : fml.vars.shopId
				, '_orderby' : ''
				, 'limit' : 20
				, 'query' : item_name
			}
		}
	} else {
		poster_data = {
			'url' : '/aj/wap/shop/Wap_shop_category_goods'
			, 'data' : {
				'frame' : 0
				, 'shop_id' : fml.vars.shopId
				, '_orderby' : ''
				, 'limit' : 20
				, 'category_id' : category_id
			}
		}
	}
}

function frameInit(){
	for(var i = 0; i < filterParams.length; i++){
		var frameTmp = document.createDocumentFragment()
		frameTmp.appendChild($('<div class="poster_wrap"></div>')[0])
		frameContent[filterParams[i]] = frameTmp
	}
}

function defaultOrderInit(){
	currentType = filterParams[0]
}

function setNavTop(){
	navTop = $('.js_poster_nav').offset().top - $('.page_head').height()
}

function bindTab(){
	$order.on('click', function (){
		var $self = $(this)
			, index = $order.index($self)
			, oldType = currentType

		$order.removeClass('current')
		$self.addClass('current')

		if(index == 3){
			if($orderIcon.hasClass(UP)){
				$orderIcon.removeClass(UP)
				$orderIcon.addClass(DOWN)
				currentType = 'price_high'
			} else if($orderIcon.hasClass(DOWN)){
				$orderIcon.removeClass(DOWN)
				$orderIcon.addClass(UP)
				currentType = 'price_lower'
			} else {
				$orderIcon.addClass(UP)
				currentType = 'price_lower'
			}
		} else {
			$orderIcon.removeClass(UP).removeClass(DOWN)
			currentType = filterParams[index]
		}

		// 容器回到顶部
		$('body, html').scrollTop(navTop)

		if(currentType == oldType) return ''

		$('.pullUp').attr('status', 'loading')

		frameContent[oldType].appendChild($('.poster_wrap')[0])
		waterFall[oldType].lock()

		if(!waterFall[currentType]){
			createWaterFall(currentType)
		} else {
			$goodsWall.append(frameContent[currentType])
			waterFall[currentType].unlock()
			$('.pullUp').attr('status', 'stop')
		}
	})
}

function createWaterFall(){
	poster_data['data']._orderby = currentType
	$('#goods_wall').append(frameContent[currentType])

	var waterFallInstance = WaterFall.init({
		el: '.poster_wrap'
		, url: poster_data.url
		, tmpl: 'poster_tpl'
		, data: poster_data['data']
		, colNum : 2
		, colGap : 0
		, optimiseFn : optimiseFn
		, dataFilter : function(data){
			return data
		}
		, onFetchSuccess: function(data){
			lazy_pic.load()
			$('.pullUp').attr('status', 'stop')
			if(data.length == 0){
				$('.pullUp').attr('status', 'end')
				this.lock()
			}
		}
	}).start()

	waterFall[currentType] = waterFallInstance
}

// 图片延迟加载
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()
lazy_pic.load()

// 读取购物车数量
carts.readShopsCount()

setNavTop()

// 初始化瀑布流相关参数
posterParamsInit()
// 初始化dom碎片容器
frameInit()
// 初始化第一次加载tab
defaultOrderInit()

// 加载默认瀑布流
createWaterFall()
// 绑定tab点击事件
bindTab()

// 吸顶
Sticky.init('.page_head', {'infinity': true})
Sticky.init('.js_poster_nav', {'sticky_top': $('.page_head').height(), 'infinity': true})
