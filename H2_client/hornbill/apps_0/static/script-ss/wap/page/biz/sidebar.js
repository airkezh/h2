/*common*/
var $ = require('wap/zepto')
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var $go_top = $('.js_go_top')
	, $open_sidebar = $('.js_open_sidebar')
	, $sidebar_data = $('.js_sidebar_data')
	, sidebar_shade = $('.sidebar_shade')
	, sidebar_btn = $('.sidebar_btn')
	, sidebar_data = $('.sidebar_data')
	, h = window.innerHeight
	, startTop = h * 0.07
	, moveTop = 0
	, endTop = h - sidebar_data.offset().height

if(endTop > startTop) endTop = startTop

$go_top.on('click', function(){
	$('html, body').scrollTo({
		endY : 0,
		updateRate: 5
	})
})
sidebar_shade.on('click', function(){
	sidebar_shade.hide()
	sidebar_btn.css('right', 0)
	sidebar_data.css('right', '-30%')
})
$open_sidebar.on('click', function(){
	if(document.body.scrollTop == 0){
		window.scrollTo(0,1);
	}
	sidebar_btn.css('right', '-20%')
	sidebar_data.css('top', startTop + 'px').css('right', 0)
	sidebar_shade.show()
	sidebar_shade.on('touchmove', function(event){
		event.preventDefault();
	})
})

sidebar_data.css('top', startTop + 'px')
$sidebar_data.on('touchstart', function(e){
	if (!event.touches.length) return
	var touch = event.touches[0]
	startY = touch.pageY
	moveTop = parseInt(sidebar_data.css('top'))
})

$sidebar_data.on('touchmove', function(e){
	if (!event.touches.length) return
	var touch = event.touches[0]
	var top = moveTop + touch.pageY - startY
	if(top > startTop) top = startTop
	if(top < endTop) top = endTop
	sidebar_data.css('top', top + 'px')
	e.preventDefault()
})