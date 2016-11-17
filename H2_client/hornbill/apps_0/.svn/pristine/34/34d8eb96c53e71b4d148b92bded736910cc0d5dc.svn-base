/*common*/
var $ = require('wap/zepto')
	, WaterFall = require('wap/component/circleWaterfall')
	, optimiseFn = require('wap/component/waterfallOptimise')
	, lazy = require('wap/component/lazzyLoad')

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

var urlData = {
	'offset': 0
	, 'frame': 1
	, 'trace': 0
	, 'limit': 10
	, 'nid': 212587
}
var waterFallInstance
var tabChange = function(){
	$('.nav .active').removeClass('active')
	$(this).addClass('active')
	waterFallInstance && waterFallInstance.destroy()
	$('.goods_wall').empty()

	urlData.nid = $(this).data('nid')

	if(urlData.nid){
		waterFallInstance = WaterFall.init({
			el: '.goods_wall',
			url: '/aj/getGoods/catalog',
			data: urlData,
			dataFilter : function(data){
				return data.data.tInfo
			},
			colNum: 2,
			colGap : 6,
			hasSideGap: true,
			optimiseFn : optimiseFn,
			onFetchSuccess: function(data){
				if(data.length == 0){
					$('.pullUp').hide()
					$('.more_rec').css('display', 'block')
					this.lock()
				}
			},
			onLayoutFinished : function(){
				lazy_pic.load()
			}
		}).start()
	} else {
		console.log('1111')
	}
}

$('.nav .item').on('click', tabChange)

$('.nav .item').eq(1).trigger('click')










