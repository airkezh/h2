/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

var $fixed_nav = $('.fixed_nav')

/* tab加载和切换 */
var pullUp = $('.pullUp')
	, topContent = $('.tab_content')
	, win_h = $(window).height()

var scrollData = {
	'bs_circle' : {'url': '/aj/promote/groupring_list', 'data' : {'frame': 1, 'r': fml.vars.r, 'page_size': 10}, 'isEnd' : false}
}
var scrollType = 'bs_circle'
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

var circleInit = function(){
	stopScrollList = true
	scrollType = 'bs_circle'

	var $active = $('.nav .active')
		,active_num = $active.index()

	pullUp.attr('status', 'loading')

	var scrollNow = scrollData[scrollType]
	$.post(scrollNow.url, scrollNow.data, function(res){
		$('.content_page').addClass('circle_wrap').append(shareTmp('bs_circle', {'bs_circle' : res}))

		stopScrollList = false
		scrollNow.data.frame++
		scrollList()

		pullUp.attr('status', 'tap')
	}, 'json')
}

;(function(){
	circleInit()
})()
