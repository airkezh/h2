/*common*/
require('wap/zepto')
require('wap/zepto/scroll')
require('wap/zepto/fastclick')

var logTrack = require('wap/app/tracking')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

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

var scrollData = {
	'pktai' : {'url': '/aj/promote/pk_list', 'data' : {'frame': 1, 'r': fml.vars.r, 'pk_type': 'previous'}, 'isEnd' : false}
}
var scrollType = 'pktai'
var stopScrollList = false
	, win_h = $(window).height()

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

	pullUp_top = pullUp[0].getBoundingClientRect().top
	if (pullUp_top - 100 <= win_h && stopScrollList === false){
		addList()
	}
	scrollList()
}


;(function(){
	pkListInit()
})()
