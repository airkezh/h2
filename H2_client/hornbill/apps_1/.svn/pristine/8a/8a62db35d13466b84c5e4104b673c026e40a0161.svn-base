/*common*/
var $ 			= require('wap/zepto')
	,WaterFall  = require( 'circle/component/biWaterfallPlugin' )
	,lazy       = require( 'm/component/lazyLoad' )
    ,optimiseFn = require('circle/component/waterfallOptimise')
    ,lazyLoad   = lazy.init({xpath:'.pic_load'})

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/wx_new/search?key_word=' + fml.vars.key,
	dataName: 'tInfo', //默认
	colNum: 2,
	colGap : '10 8',
	hasSideGap : true,
	onFetchSuccess: function(data){
		lazyLoad.scroll()
		if(data.length === 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	},
	onFetchFinished: function(data){
		lazyLoad.load()
	},
	optimiseFn: optimiseFn
}).start()
