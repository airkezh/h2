/*common*/
/**
 * @fileoverview mob海报加载
 * @author yunqian@meilishuo.com
 * @date 2014-12-26
 */

require('wap/zepto')

var shareTmp = require('wap/component/shareTmp')
	, scroll = require('wap/component/windowScroll')
	, pin = require('wap/component/waterfall')
	, query = require('component/urlHandle')

query = query.getParams(window.location.href.toString())

var pullUp = $('.pullUp')
	, win = $(window)
	, win_h = win.height()
	, win_w = win.width()
	, isPosterLoad = false
	, pullUp_top
	, urlData
	, pullUpAction
	, posterAppend = function(){}
	, posterSettings = {}
	, postUrl = ''


/**
 * @function 发送ajax请求
 */
var ajaxPoster = function(url){
	// console.log('ajax f', urlData)
	isPosterLoad = false
	pullUp.attr('status', 'loading')

	$.extend(true, urlData, query)
	$.post(url, urlData, function(res){
		if(res.tInfo.length == 0){
			pullUp.attr('status', 'stop')
			end()
			return
		}
		loadPoster(res)
	}, 'json')
}

/**
 * @function ajax返回渲染海报
 */
var loadPoster = function(data){
	pullUp.attr('status', 'tap')
	pin.append(shareTmp('posterWall', {'posterSettings': posterSettings, 'data': data}))

	posterAppend(urlData)

	urlData.frame++
	isPosterLoad = true
}


/**
 * @function 滚动侦听，是否加载海报
 */
var scrollPoster = function(){
	function scrollPoster(pos, isDown){
		// console.log(pos)
		if(isDown){
			pullUp_top = pullUp[0].getBoundingClientRect().top
			if(pullUp_top - 100 <= win_h && isPosterLoad)
				pullUpAction()
		}
	}
	scroll.bind(scrollPoster, 'scrollPoster')
}

/**
 * @function 结束瀑布流加载
 * @author yunqian@meilishuo.com
 * @date 2014-12-26
 */
var end = function(){
	scroll.unBind('scrollPoster')
}
/**
 * @function 结束瀑布流加载
 * @author yunqian@meilishuo.com
 * @date 2015-04-02
 */
var restart = function(){
	isPosterLoad = true
}
/**
 * @function 结束瀑布流加载
 * @author yunqian@meilishuo.com
 * @date 2015-04-02
 */
var stop = function(){
	isPosterLoad = false
}

/**
 * @function 加载服务器过来的poster0
 */
var testPoster0 = function(){
	var poster0 = Meilishuo.config.poster0
	if (poster0 && poster0.tInfo.length > 0){
		loadPoster(poster0.tInfo)
		delete Meilishuo.config.poster0
	}else{
		pullUpAction()
	}
}

/**
 * @function 下拉加载时执行的方法
 * @author yunqian@meilishuo.com
 * @date 2014-12-29
 */
function pullUpAction(urlData){
	ajaxPoster(postUrl)
}



/**
 * @function 瀑布流初始化
 * @author yunqian@meilishuo.com
 * @date 2014-12-26
 */
var init = function(opt){
	opt = opt || {}

	pin.init({
		containerId : opt.containerId,
		containerWidth : opt.containerWidth || document.body.clientWidth,
		totalColNum : opt.totalColNum || 2
	})

	postUrl = opt.url
	urlData = opt.urlData
	posterAppend = opt.posterAppend || posterAppend
	posterSettings.scale = pin.getAttr('scale')
	posterSettings.colWidth = pin.getAttr('colWidth')

	testPoster0()
	scrollPoster()
}

exports.init = init
exports.end = end
exports.ajaxPoster = ajaxPoster
exports.testPoster0 = testPoster0
exports.scrollPoster = scrollPoster
exports.restart = restart
exports.stop = stop


