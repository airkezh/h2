/*common*/
require('wap/zepto')
require('wap/zepto/scroll')
require('wap/zepto/fastclick')

var shareTmp = require('wap/component/shareTmp')
	,onscroll = require('wap/component/windowScroll')
	,lazy = require('wap/component/lazzyLoad')
	,WaterFall = require( 'wap/component/circleWaterfall' )
	,optimiseFn = require('wap/component/waterfallOptimise');

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.good_content', 'step_x' : 'auto'});
lazy_pic.scroll();

/* 瀑布流 */
var urlData = {
	'frame' : 1,
	'pid' : '41051',
	'type' : 'wap'
};
var waterFallInstance = WaterFall.init({
	el: '.good_content', 
	url: '/aj/activity/carnival_list', //接口地址
	data: urlData,                     //传给接口的数据
	dataFilter : function(data){       //提取数组，后端数据
        return data.tInfo;
    },
	colNum: 2, 
	colGap : 8,  
	optimiseFn : optimiseFn,  
	onFetchSuccess: function(data){    //动画
		if(data.length == 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start();