/*common*/
/**
 * @fileoverview 推送页页面功能
 * @author yunqian@meilishuo.com
 * @date 2014-12-01
 */
require('wap/zepto')
require('wap/zepto/fastclick')

/* 海报流 */
var posterWall = require('wap/app/posterWalls3')
	, lazy = require('wap/component/lazzyLoad')
	, pin = $('.goods_wall')

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img', 'loadStyle': 'img'})
lazy_pic.scroll()

posterWall.init({
	urlData : {
		'frame' : 0,
		'page_size':20,
		'type':'wap',
		'pid' : fml.vars.pid
	}
	, containerId : '.goods_wall'
	, url : '/aj/activity/carnival_list'
	, posterAppend : function(data){
		if(data.frame == 8){
			posterWall.end()
			$('.pullUp').hide()
		}
	}
})

/* 倒计时 */
var timedown = require('wap/app/doota/timedown')
timedown.down($('.timeStamp'), $('.timeStamp').attr('time'), '0d-0h-0i-0s-e', ['%v天', '%v时', '%v分', '%v秒', '%v']).onTimeOver(function(){
	location.reload()
}).setHeartHum(100).correct()