/*common*/

require('wap/zepto')
require('wap/zepto/touch')
require('wap/page/sq/search_md')

var renderProcessor = require('wap/component/shareTmp')

var $window       = $(window)
var $tab          = $('.js-tab-list')
var $tabItem      = $('.js-tab-item')
var $ctn          = $('.js-content')
var $wrapper      = $('.js-wrapper')

var searchHeight  = $('.search').height()
var pageTitle     = $('title').text()
var SELECTED      = 'selected'

var step          = {pos:[0,0], y:[], size:[]}
var tabHeight     = $tab.height()
var windowWidth   = $window.width()
var windowHeight  = $window.height()
var wrapperHeight = windowHeight - .78 * 100 * windowWidth / 640 - 52
var dataCache     = {}
var preventCrazyFastClick = false
var stepY

/*=== 先干掉页面滚动。hack for：9.0以下系统的iphone的h5页可滚动 ===*/
$('body').on('touchmove', function (e){
	e.preventDefault()
})

$wrapper.height(wrapperHeight)
tabItemAnimate($('.' + SELECTED))
$tabItem.on('tap', function (){
	var $target = $(this)

	if( $target.hasClass(SELECTED) || preventCrazyFastClick ) return

	var categoryId = $target.data('id')
	var str = '/sq/category/?nid=' + categoryId

	preventCrazyFastClick = true

	$tabItem.removeClass(SELECTED)
	$target.addClass(SELECTED)

	/*=== tab置顶动画 ===*/
	tabItemAnimate($target)

	/*=== 右侧状态重置 ===*/
	$ctn.empty().css({
		'-webkit-transform': 'translateY(0px)',
		'transform': 'translateY(0px)'
	})
	step.pos[1] = 0

	if(dataCache['nid_' + categoryId]){
		$ctn.append(renderProcessor('js-content-tpl', dataCache['nid_' + categoryId]))
		history.replaceState(null, pageTitle, str)
		preventCrazyFastClick = false
	}else{
		/*=== 获取对应tab的content数据 ===*/
		var url = '/aj/sq/interfaces/category'
		var data = { nid : categoryId }
		$.get(url, data, function (res){
			if(res.error_code === 200){
				$ctn.append( renderProcessor('js-content-tpl', res) )

				/*=== 缓存数据到本地 ===*/
				dataCache['nid_' + categoryId] = res

				/*=== 点击返回，记住tab选中状态 ===*/
				history.replaceState(null, pageTitle, str)
			}

			preventCrazyFastClick = false
		}, 'json')
	}
})

touchMove($tab, 0)
touchMove($ctn, 1)

function touchMove($ele, index){
	var limitHeight = 0

	$ele.on('touchstart', function (e){
		var touch = e.touches[0]
		
		step.y[index] = touch.pageY
		limitHeight = $(this).height()

	}).on('touchmove', function (e){

		/*== 右侧内容不足一屏的情况干掉滑动 ==*/
		if(limitHeight < wrapperHeight){
			return stepY = 0
		}

		var touch = e.touches[0]

		step.size[index] = touch.pageY - step.y[index]
		stepY = step.pos[index] + step.size[index]

		if(stepY > 0){ stepY = 0 }

		if(limitHeight + stepY < wrapperHeight ){
			stepY = wrapperHeight - limitHeight
		}

		$ele.css({
			'-webkit-transform': 'translateY(' + stepY + 'px) translateZ(0)',
			'transform': 'translateY(' + stepY + 'px) translateZ(0)',
			'-webkit-transition-duration': 'initial',
			'transition-duration': 'initial'
		})

	}).on('touchend', function (e){
		step.pos[index] = stepY
	})
}

function tabItemAnimate($ele){
	if(tabHeight < wrapperHeight) return

	var h = $ele.height()
	var i = $ele.index()
	var y = -1 * h * i

	if(tabHeight + y < wrapperHeight){
		y = wrapperHeight - tabHeight
	}

	$tab.css({
		'-webkit-transform': 'translateY(' + y + 'px) translateZ(0)',
		'transform': 'translateY(' + y + 'px) translateZ(0)',
		'-webkit-transition-duration': '1000ms',
		'transition-duration': '1000ms'
	})
	step.pos[0] = y
}
