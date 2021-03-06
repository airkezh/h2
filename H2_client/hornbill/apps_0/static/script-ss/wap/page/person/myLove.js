/*common*/

var $ = require('wap/zepto')
	, carts = require('wap/app/doota/shopping_carts')
	, WaterFall = require('wap/component/circleWaterfall')
	, optimiseFn = require('wap/component/waterfallOptimise')
	, lazy = require('wap/component/lazzyLoad')
	, shareTmp = require('wap/component/shareTmp')

var guessLike = $('.guessLike')

/*
 * 购物车
*/
carts.readShopsCount()

/*
 * 瀑布流
 *
*/

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

function init(){
	waterFallInstance = WaterFall.init({
		el: '.goods_wall',
		url: '/person/aj/myLove',
		data: {
	        offset: 0,
	        limit:  20,
	        user_id : fml.vars.userId,
	        twitter : 'like'
	    },
		dataFilter: function( data ) {
	        fml.vars.poster_r = data.r || '';
			return data.data.tInfo
	    },
		colNum: 2,
		colGap : 6,
		hasSideGap: true,
		optimiseFn : optimiseFn,
		onBeforeFetch : function(){
			$('.pullUp').attr('status','loading');
		},
		onFetchSuccess: function(data){
			lazy_pic.load();
			$('.pullUp').attr('status','tap');
			if(data.length == 0){
				$('.pullUp').attr('status','stop');
				this.lock();
			}
		}
	}).start()
}


if(fml.vars.posterData && fml.vars.posterData.length > 0)
	init()

/*
 * 猜你喜欢 
*/
var scrollTopY = [];

$(window).scroll(function(){
				
	var scrollTop = window.pageYOffset 

	scrollTopY.push(scrollTop)
	
	if( scrollTopY.length > 2 ){
		scrollTopY.shift();
	}

	if( scrollTopY[scrollTopY.length - 1] - scrollTopY[0] > 0 && scrollTop > 0){
		//向上
		guessLike.css({'transform':'translateX(0.95rem);'})
	}else{
		//向下
		guessLike.css({'transform':'translateX(0rem);'})
	}

})


