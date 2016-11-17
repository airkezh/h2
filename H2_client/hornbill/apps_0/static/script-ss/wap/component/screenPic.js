/*common*/

/**
 * 只接受一组图片展示
 */

var $ = require('wap/zepto')
	, swipe = require('wap/component/swipe')

var config = {
	pic_index : 0
	, pic_data : []
	, attr_pic : 'pic'
}

var swipeCom = ''

var screenPic = {
	status : ''
	, _self_wrap : {}
	, _slide_num : {}
}

function shareTmp(pics){
	if(!pics) return false
	var html = '<div class="screen_pic_wrap" style="position: fixed;top: 0;left: 0;opacity: 0;z-index: -1;width: 100%;height: 100%;"><div class="screen_swipe" style="overflow: hidden;position: relative;background-color: rgba(0, 0, 0, 0.85);"><div class="screen_swipe_wrap" style="overflow:hidden;position:relative;">'
	pics.forEach(function(pic, index){
		html += '<div class="screen_pic" data-index="' + index + '" style="position: relative;float: left;background: no-repeat center;background-size: contain;background-image: url(' + pic + ');"><img src="' + pic + '" style="opacity: 0;width: 100%;height: 100%;-webkit-touch-callout: default;touch-callout: default;"/></div>'
	})
	if(pics.length != 1){
		html += '</div></div><div class="slide_num_wrap" style="position: absolute;bottom: .3rem;left: 0;width: 100%;text-align: center;"><div style="display: inline-block;">'
		pics.forEach(function(pic, index){
			html += '<span class="slide_num" style="width: .1rem;height: .1rem;background-color: transparent;border-radius: 50%;display: inline-block;margin: 0 .1rem;border: 2px solid #fff;"></span>'
		})
	}
	html += '</div></div></div>'

	return html
}

function addToBody(){
	var tpl = shareTmp(config.pic_data)

	$('body').append(tpl)
	screenPic._self_wrap = $('.screen_pic_wrap')
}

function screenShow(){
	slideNumShow(config.pic_index)
	swipeCom.slide(config.pic_index, 10)
	screenPic._self_wrap.css('z-index', '9999').animate({'opacity': '1'}, 200)
}

function slideNumShow(index){
	screenPic._slide_num.css('background-color', 'transparent').eq(index).css('background-color', '#fff')
}

function screenPicInit(){

	addToBody()

	$('.screen_pic').height($(window).height())
	$(window).on('resize', function(){
		$('.screen_pic').height($(window).height())
	})

	screenPic._slide_num = $('.slide_num_wrap .slide_num')
	slideNumShow(config.pic_index)

	swipeCom = new swipe($('.screen_swipe')[0], {
		startSlide : config.pic_index
		, speed : 400
		, continuous : false
		, disableTouch : false
		, disableScroll : true
		, stopPropagation : true
		, callback: function(index, elem){
			slideNumShow(index)
		}
	})
}

function start(){
	var triggerM = $(config.trigger)
	triggerM.each(function(i, pic){
		$(pic).data('screen_i', i)
	})
	if(!config.pic_data.length){
		triggerM.each(function(i, pic){
			config.pic_data.push($(pic).attr(config.attr_pic))
		})

		if(!config.pic_data.length) return false
	}

	triggerM.on('click', function(e){
		e.preventDefault()

		config.pic_index = $(this).data('screen_i')
		if(screenPic.status == 'hide'){
			screenShow()
			return false
		}

		screenPicInit()
		screenShow()

		screenPic._self_wrap.on('click', function(){
			screenPic._self_wrap.animate({'opacity': '0'}, 200)
			setTimeout(function(){
				screenPic._self_wrap.css('z-index', '-1')
			}, 200)
		})
		screenPic.status = 'hide'
	})
}

screenPic.init = function(opt){
	config = $.extend(config, opt)

	start()
}

exports.init = screenPic.init
