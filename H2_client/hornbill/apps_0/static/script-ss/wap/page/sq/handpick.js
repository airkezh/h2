/*common*/

require('wap/zepto')

/* 引入收索框模块 */
require('wap/page/sq/search_md')

var timedown = require('wap/app/doota/timedown');
var tracking  = require('wap/app/tracking')
var WaterFall = require('circle/component/waterfall')
var lazy      = require('m/component/lazyLoad')

var $html        = $('html')
var htmlFontSize = parseFloat( $html.css('font-size') ) || 0
var lazyLoad     = lazy.init({ xpath: '.g-entrance' })
var counter      = 0 

var waterFallInstance = WaterFall.init({
	el: '#js-goods-shelf',
	url: '/aj/sq/interfaces/jx_goods',
	tmpl: 'goods_tpl',
	data: { page_name: 'clothes' },
	dataName: 'tInfo',
	colNum: 2,
	colGap : 0,
	onFetchSuccess: function(data){
		if(data.length === 0){
			$('.js-pull-up').data('status','stop')
			this.lock()
		}else if(counter++ < 1){
			$('#js-time-prompt').show()
		}
	},
	onFetchFinished: function(data){
		lazyLoad.load()
	}
})

var colInfo = waterFallInstance.getColsInfo()

lazyLoad.scroll()
colInfo[ 0 ].max = 1.2 * htmlFontSize
waterFallInstance.setColsInfo(colInfo).start()
wxCountDown()

// 返回定位 
$('body').on('click','.g-entrance',function (e){
	e.preventDefault()
	
	var $t = $('title')
	var title = $t.html()
	var link =  'http://' + location.host + $(this).attr('href') + '&_wv=5123'
		
	$t.html('返回')
	mqq.ui.refreshTitle()
	mqq.ui.openUrl({
		url: link,
		target: 1,
		style: 0
	})

	setTimeout(function (){
		$t.html(title)
		mqq.ui.refreshTitle()
	},0)
})

// 埋点 
$('a[href="/sq/cart/"]').on('click', function (){
	actionStatistics('goCart', 'userCenterPop')
})

function wxCountDown(){  
	var t_container = $('.js-time')
	var _hour       = $('#js-hour', t_container)
	var _minu       = $('#js-minute', t_container)
	var _sec        = $('#js-second', t_container)

	timedown.down(t_container, t_container.data('time'), '0h-0i-0s', ['<b>%v</b>', '<b>%v</b>', '<b>%v</b>'])
		.onAction(function() {
			var t = arguments[2];
			hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
			minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
			sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
			if (_hour.html() != hour) {
				_hour.html(hour);
			}
			if (_minu.html() != minu) {
				_minu.html(minu);
			}
			if (_sec.html() != sec) {
				_sec.html(sec);
			}
		});
}

function actionStatistics(action, value){
	tracking.cr('sq/statistics_action', {'action': action, 'value' : value})
}