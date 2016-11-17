/*common*/
require('wap/zepto')
require('wap/zepto/scroll')
require('wap/zepto/fastclick')

var logTrack = require('wap/app/tracking')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
var lazy = require('wap/component/lazzyLoad')

// 锚点
if(Meilishuo.config.os.mlsApp){
	setTimeout(function(){
		if(fml.vars.anchor == 'index'){
			window.scrollTo(0,$('.goods').offset().top);
		}
	},30);
}
/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img', 'step_x' : 'auto'})
lazy_pic.scroll()

/* 图片轮播hack */
var touchSlide = require('wap/app/touchSlide')
if($('#imageSlide li').length != 0){
	var winWidth = $(document).width()
		,slideHeight = 240 * winWidth / 640

	$("#imageSlide, #imageSlide li").width(winWidth).height(slideHeight + "px")
	if($('#imageSlide li').length > 1){
		$("#imageSlide").touchSlide({
			autoTime:5000,
			speed:300
		})
	}
}

var pullUp = $('.pullUp')
var stopScrollList = false
	, win_h = $(window).height()
	, frame = 0

function addList(){
	stopScrollList = true
	pullUp.attr('status', 'loading')

	$.get('/aj/cosmetic/cosmetic_recommend', {frame: frame, r: fml.vars.params_r}, function(res){
		pullUp.attr('status', 'tap')
		$('.feed').append(shareTmp('res_goods', {'goods' : res}))

		frame++
		stopScrollList = false

		if(!res.length) {
			$('.feed').append('<p class="end">没有更多了~</p>')
			onscroll.unBind('scrollList')
			pullUp.remove()
		}
	}, 'json')
}

var scrollList = function () {
	function scrollList(pos, isDown) {
	if (isDown) {
		pullUp_top = pullUp[0].getBoundingClientRect().top
		if (pullUp_top - 100 <= win_h && stopScrollList === false)
			addList()
		}
	}
	onscroll.bind(scrollList, 'scrollList')
}

var listInit = function(){
	$('.feed').append(shareTmp('res_goods', {'goods' : fml.vars.waterfall0}))
	pullUp.attr('status', 'tap')
	delete fml.vars.waterfall0

	lazy_pic.load()

	frame++
	scrollList()
}

$('.feed').on('click', '.js_app_link', function(){
	var openLink = $(this).data('href')
	if(!Meilishuo.config.os.mlsApp){
		openLink = '/goto/open/?appUrl=' + encodeURIComponent(openLink)
	}
	window.location.href = openLink
})

;(function(){
	listInit()

	// 回顶部
	var $gotop = $('.gotop')
	$gotop.on("click", function() {
		$.scrollTo({
			endY: 0,
			duration: 1000
		})
	})

	function gotop(pos, isDown) {
		if (pos < 440) {
			$gotop.hide()
		} else {
			$gotop.show()
		}
	}
	onscroll.bind(gotop, 'gotop')

	$('.guide_wrap, .brand_nav').on('click', function(){
		$('.guide_wrap').remove()
	})
	$('.guide_wrap').on('touchmove', function(){
		return false;
	})
})()