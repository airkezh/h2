/*common*/

require('wap/zepto')
require('wap/zepto/fastclick')

var Alert     = require('wap/ui/alert')
var tracking  = require('wap/app/tracking')
var WaterFall = require('circle/component/waterfall')
var lazy      = require('m/component/lazyLoad')

var $html                 = $('html')
var goodsDataOfFirstFrame = fml.vars.goodsDataOfFirstFrame
var htmlFontSize          = parseFloat( $html.css('font-size') ) || 0
var lazyLoad              = lazy.init({ xpath: '.pic_load' })

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/sq/jx_goods',
	data: { page_name: 'clothes' },
	dataName: 'tInfo',
	colNum: 2,
	colGap : 0,
	onFetchSuccess: function(data){
		if(data.length === 0){
			$('.pullUp').attr('status','stop')
			this.lock()
		}
	},
	onFetchFinished: function(data){
		lazyLoad.load()
	}
})

var colInfo = waterFallInstance.getColsInfo()

lazyLoad.scroll()
colInfo[ 0 ].max = 1.2 * htmlFontSize
waterFallInstance.setColsInfo(colInfo).start(goodsDataOfFirstFrame)

/* 埋点 */
$('a[href="/sq/user/order_list"]').on('click', function (){
	actionStatistics('goUserCenter', 'userCenterPop')
})
$('a[href="/sq/cart/"]').on('click', function (){
	actionStatistics('goCart', 'userCenterPop')
})

/* 返回定位 */
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

function actionStatistics(action, value){
	tracking.cr('sq/statistics_action', {'action': action, 'value' : value})
}

