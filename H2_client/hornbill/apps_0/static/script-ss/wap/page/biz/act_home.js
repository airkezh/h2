/*common*/
require('wap/zepto')
require('wap/zepto/scroll')
require('wap/zepto/fastclick')

var logTrack = require('wap/app/tracking')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

var $fixed_nav = $('.fixed_nav')

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img', 'loadStyle': 'img'})
lazy_pic.scroll()

// 定位导航
var navfixed = function(){
	var bannerWord = $(".tab_content")
		,isScroll = false
		,bannerOffset = bannerWord.offset().top
		,posterOffset = $('.tab_content').offset().top
		,startY = 0

	function isFade() {
		var pageScrollTop = document.body.scrollTop
		if(!isScroll && pageScrollTop > bannerOffset){
			isScroll = true
			$fixed_nav.show()
		}
		if(isScroll && pageScrollTop <= bannerOffset){
			$fixed_nav.hide()
			isScroll = false
		}
	}

	onscroll.unBind(isFade)
	onscroll.bind(isFade, 'document')

	$(document).on("touchstart", function(event){
		if (!event.touches.length) return
		var touch = event.touches[0]
		startY = touch.pageY
	})
	$(document).on("touchmove", function(){
		if (!event.touches.length) return
		var touch = event.touches[0]
		if(touch.pageY - startY > 0){
			$fixed_nav.hide()
			isScroll = false
		}
	})
}


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

/*bannar 显示和倒计时*/
function imageRun(className){
	$(className).each(function(){
		var ele = $(this)
			, parentEle = ele.parent()

		if(!parentEle.hasClass('show_img')){
			ele.bind('load', function(){
				parentEle.addClass('show_img').removeClass('js_show_img')
			})
			if(this.complete){
				ele.trigger('load')
			}
		}
	})
}

/* tab加载和切换 */
var pullUp = $('.pullUp')
	, topContent = $('.tab_content')
	, fragment = {}

for (var i = 0, k = 4; i < k; i++) {
	var DEFAULTDOM = $('<div class="content_page fragment_page_' + i + '"></div>')
	fragment['fragment' + i] = document.createDocumentFragment()
	fragment['fragment' + i].appendChild(DEFAULTDOM[0])
}
topContent.prepend(fragment['fragment0'])


var $nav_wrap = $('.nav_wrap')
	, $html = $('html,body')
	, $n_nav_div = $('.n_nav div')
	, $fixed_nav_div = $('.fixed_nav div')
	, win_h = $(window).height()

var navFocus = function(){
	$fixed_nav.hide()
	if(document.body.scrollTop > $nav_wrap.offset().top){
		$html.scrollTo({
			endY : $nav_wrap.offset().top,
			updateRate: 20
		})
	}
}

function tabPageSwitch(num, active_num, $active){
	navFocus()
	$active.removeClass('active')
	$n_nav_div.eq(num).addClass('active')
	$fixed_nav_div.eq(num).addClass('active')
	fragment['fragment'+active_num].appendChild(topContent.find('.content_page')[0])
	topContent.append(fragment['fragment'+num])
}

var scrollData = {
	'pktai' : {'url': '/aj/promote/pk_list', 'data' : {'frame': 1, 'r': fml.vars.r, 'pk_type': 'previous'}, 'isEnd' : false},
	'bs_circle' : {'url': '/aj/promote/groupring_list', 'data' : {'frame': 1, 'r': fml.vars.r, 'page_size': 10}, 'isEnd' : false}
}
var scrollType = 'pktai'
var stopScrollList = false

function addList(){
	var scrollNow = scrollData[scrollType]
	if(scrollNow.isEnd) return true

	stopScrollList = true
	pullUp.attr('status', 'loading')

	$.post(scrollNow.url, scrollNow.data, function(res){
		pullUp.attr('status', 'tap')
		var resData = {}
		resData[scrollType] = res
		$('.content_page').append(shareTmp(scrollType, resData))

		if(scrollType == 'pktai') imageRun('.js_show_img img')

		scrollNow.data.frame++
		stopScrollList = false

		if(res.length < 10) {
			$('.content_page').append('<p class="end">没有更多了~</p>')
			scrollNow.isEnd = true
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

var pkListInit = function(){
	logTrack.cr('mz_pindao_1223', {'frm': 'pktai'});
	var pk_online = fml.vars.pk_online
		, pk_online_l = pk_online.length

	$('.content_page').addClass('pk_wrap').append(shareTmp('pktai', {'pktai' : pk_online})).append('<div class="pk_previous_title"><span>往期回顾</span><i></i></div>')
	imageRun('.js_show_img img')
	delete fml.vars.pk_online

	$('.pk_nav').on('click', navChange)
	if(pk_online_l > 2){
		scrollList()
	} else {
		var scrollNow = scrollData[scrollType]
		$.post(scrollNow.url, scrollNow.data, function(res){

			$('.pk_wrap').append(shareTmp('pktai', {'pktai' : res}))
			imageRun('.js_show_img img')
			pullUp.attr('status', 'tap')
			scrollNow.data.frame++

			scrollList()
		}, 'json')
	}
}

var circleInit = function(){
	stopScrollList = true
	scrollType = 'bs_circle'

	var $active = $('.nav .active')
		,active_num = $active.index()

	tabPageSwitch(1, active_num, $active)

	pullUp.attr('status', 'loading')
	logTrack.cr('mz_pindao_1223', {'frm': $(this).data('cr')});

	var scrollNow = scrollData[scrollType]
	$.post(scrollNow.url, scrollNow.data, function(res){
		topContent.find('.content_page').addClass('circle_wrap').append(shareTmp('bs_circle', {'bs_circle' : res}))

		stopScrollList = false
		scrollNow.data.frame++
		scrollList()

		$('.circle_nav').off('click', circleInit).on('click', navChange)
		pullUp.attr('status', 'tap')
	}, 'json')
}

var bannarInit = function(){
	logTrack.cr('mz_pindao_1223', {'frm': 'pinpai'});
	pullUp.attr('status', 'loading')
	stopScrollList = true

	var $active = $('.nav .active')
		,active_num = $active.index()

	tabPageSwitch(2, active_num, $active)

	topContent.find('.content_page').addClass('bs_bannar').append(shareTmp('bs_bannar'))
	pullUp.attr('status', 'tap')
	imageRun('.js_show_img img')
	$('.bannar_nav').off('click', bannarInit).on('click', navChange)
}

var efficacyInit = function(){
	$('.sort').hide()
	stopScrollList = true

	var $active = $('.nav .active')
		,active_num = $active.index()

	tabPageSwitch(3, active_num, $active)

	pullUp.attr('status', 'loading')
	logTrack.cr('mz_pindao_1223', {'frm': $(this).data('cr')});

	$.post('/aj/cosmetic/cosmetic_wap_efficacy', {'nid':'4289', 'r': fml.vars.r}, function(res){
		topContent.find('.content_page').addClass('efficacy_wrap').append(shareTmp('efficacy', {'efficacy' : res}))

		$('.efficacy_nav').off('click', efficacyInit).on('click', navChange)
		pullUp.attr('status', 'tap')
	}, 'json')
}

var navChange = function(){
	var num = $(this).index()
		,$active = $('.nav .active')
		,active_num = $active.index()

	if(num == active_num) return

	tabPageSwitch(num, active_num, $active)
	logTrack.cr('mz_pindao_1223', {'frm': $(this).data('cr')})

	switch(num){
		case 0 :
			$('.sort').show()
			stopScrollList = false
			scrollType = 'pktai'
			break
		case 1 :
			$('.sort').show()
			stopScrollList = false
			scrollType = 'bs_circle'
			break
		case 2 :
			$('.sort').show()
			stopScrollList = true
			break
		case 3 :
			$('.sort').hide()
			stopScrollList = true
			break
		default :
			$('.sort').show()
			stopScrollList = true
	}
}

;(function(){

	navfixed()

	pkListInit()
	$('.circle_nav').on('click', circleInit)
	$('.bannar_nav').on('click', bannarInit)
	$('.efficacy_nav').on('click', efficacyInit)
})()
