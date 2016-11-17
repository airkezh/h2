/*common*/
require('wap/zepto')

var WaterFall = require( 'circle/component/waterfall' )
var lazy      = require( 'm/component/lazyLoad' )

var lazyLoad  = lazy.init({ xpath : '.pic_load' })

var $title    = $('.title')
var pageId    = fml.vars.pageId
var section   = fml.vars.section
var key       = fml.vars.key
var DR        = fml.vars.DR
var url       = '/aj/sq/search'
var justOne   = true

/** main code */

// 调用瀑布流组件
lazyLoad.scroll()

WaterFall.init({
	el: '.goods_wall',
	colNum: 2,
	data: { 
		key_word: key,
		pageid: pageId,
		section: section,
		d_r: DR 
	},
	url: url,
	colGap : 0,
	onFetchSuccess: function (data){
		if(data.length < 10){
			$('.pullUp').attr('status','stop')
			this.lock()
		}
	},
	onFetchFinished: function (data){
		lazyLoad.load()
	},
	onFetchError: function (jqXHR, textStatus, errorThrown){
		// @hack 超时请求模拟滚动一次
		if(justOne){
			this.triggerScroll()
			justOne = false
		}else{
			if(textStatus === 'timeout'){
				alert('请求超时了,接口待优化');
			}
		}
	}

}).start()

// 调用 QQ api，支持 refer 页位置记录
$('body').on('click','.li_border a',function (e){
	var $t = $('title')
	var link =  'http://' + location.host + $(this).attr('href') + '&_wv=5123'
		
	$t.html('返回')
	mqq.ui.refreshTitle()
	mqq.ui.openUrl({
		url: link,
		target: 1,
		style: 0
	})

	setTimeout(function (){
		$t.html('美丽说')
	},0)

	e.preventDefault()
})

