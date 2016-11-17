/*common*/
require('wap/zepto')
require('wap/app/historyBack')

var WaterFall = require( 'circle/component/waterfall')
	, optimiseFn = require('circle/component/waterfallOptimise')
	, lazy = require('wap/component/lazzyLoad')
	, Sticky = require('wap/component/sticky')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share')

var filterParams = ''
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


var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()
lazy_pic.load()

// 微信浏览器分享
signWX()
if(Meilishuo.config.os.weixinBrowser){
	shareWX.bind(fml.vars.wxshareData)
}


$('.js_customer_service').on('click', function(){
	if(Meilishuo.config.user_id == 0){
		window.location.href = '/user/login'
	} else {
		window.location.href = $(this).attr('data-href')
	}
})

$('.js_shop_cate').on('click', function(){
	if($(this).data('cate_show')){
		$('.cate_wrap').hide()
		$(this).data('cate_show', false)
	} else {
		$('.cate_wrap').show()
		$(this).data('cate_show', true)
	}
})

$('.js_follow_btn').on('click', function(){
	if(Meilishuo.config.user_id == 0){
		window.location.href = '/user/login'
	}

	var $mSelf = $(this)
	var following = $mSelf.attr('data-follow')

	if(following == '0'){
		$.post('/aj/wap/shop/Shop_follow', {shop_id: fml.vars.shopId}, function(res){
			alert('关注成功')
			$mSelf.html('<i></i>已关注')
			$mSelf.attr('data-follow', '1')
		}, 'json')
	} else {
		$.post('/aj/wap/shop/Shop_unfollow', {shop_id: fml.vars.shopId}, function(res){
			alert('已取消关注')
			$mSelf.attr('data-follow', '0')
			$mSelf.html('<i></i>添加关注')
		}, 'json')
	}
})

function posterParamsInit(){
	filterParams = ['goods_ctime', 'goods_on_shelf', 'sale_num', 'price_lower', 'price_high']
	poster_data = {
		'url' : '/aj/wap/shop/Wap_shop_inner_goods_search'
		, 'data' : {
			'frame' : 0
			, 'shop_id' : fml.vars.shopId
			, '_orderby' : ''
			, 'limit' : 20
			, 'query' : ''
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

		frameContent[oldType].appendChild($('.poster_wrap')[0])
		waterFall[oldType].lock()

		if(!waterFall[currentType]){
			createWaterFall(currentType)
		} else {
			$goodsWall.append(frameContent[currentType])
			waterFall[currentType].unlock()
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
			if(data.length == 0){
				$('.pullUp').attr('status', 'stop')
				this.lock()
			}
		}
	}).start()

	waterFall[currentType] = waterFallInstance
}

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

Sticky.init('.js_poster_nav', {'sticky_top': $('.page_head').height(), 'infinity': true})
