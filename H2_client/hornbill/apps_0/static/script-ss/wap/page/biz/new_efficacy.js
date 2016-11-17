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
	colGap : '0 10',
	hasSideGap: true,  
	optimiseFn : optimiseFn,  
	onFetchSuccess: function(data){    //动画
		if(data.length == 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start( fml.vars.goods );

/* 链接跳转 */
$('.js_search_form').on('submit', function(e){
	event.preventDefault();
	var searchContent = $('.search_content input').val() ? $('.search_content input').val() : $('.search_content input').attr('placeholder');
	var schemeJsonWx = {
        	tag_word : searchContent , 
        	r : "1_m-biz_shareact_new_brand_main" ,
        	search_source : '1'
        }
    	,schemeLinkWx = "meilishuo://search_goods_result.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));
    window.location.href = schemeLinkWx;
})




















