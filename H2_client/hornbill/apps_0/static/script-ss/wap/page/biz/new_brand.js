/*common*/
require('wap/zepto')
require('wap/zepto/scroll')
require('wap/zepto/fastclick')

var logTrack = require('wap/app/tracking')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

var $fixed_nav = $('.fixed_nav')

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

var bannarInit = function(is_first){
	logTrack.cr('mz_pindao_1223', {'frm': 'pinpai'});
	pullUp.attr('status', 'loading')
	stopScrollList = true

	var $active = $('.nav .active')
		,active_num = $active.index()

	if(!is_first) tabPageSwitch(0, active_num, $active)

	topContent.find('.content_page').addClass('bs_bannar').append(shareTmp('bs_bannar'))
	pullUp.attr('status', 'tap')
	imageRun('.js_show_img img')
	$('.bannar_nav').off('click', bannarInit).on('click', navChange)
}

var efficacyInit = function(is_first){
	$('.sort').hide()
	stopScrollList = true

	var $active = $('.nav .active')
		,active_num = $active.index()

	if(!is_first) tabPageSwitch(1, active_num, $active)

	pullUp.attr('status', 'loading')
	logTrack.cr('mz_pindao_1223', {'frm': 'gongxiao'});

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
}

;(function(){

	navfixed()

	if(fml.vars.page_type == 'main'){
		topContent.prepend(fragment['fragment0'])
		bannarInit(true)
		$('.efficacy_nav').on('click', function(){
			efficacyInit()
		})
	} else{
		topContent.prepend(fragment['fragment1'])
		efficacyInit(true)
		$('.bannar_nav').on('click', function(){
			bannarInit()
		})
	}
	
})()
