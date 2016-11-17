/*common*/

var $ = require('wap/zepto')
	, carts = require('wap/app/doota/shopping_carts')
	, lazy = require('wap/component/lazzyLoad')
	, scrollStop = require('wap/component/scrollStop')
	, WaterFall = require('circle/component/waterfall')

/*
 * 购物车
*/
carts.readShopsCount()

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()
var scrollStopItems = scrollStop('.tags_scroll')

function init(){
	waterFallInstance = WaterFall.init({
		el: '.my_shop',
		url: '/person/aj/myShop',
		data: {
	        user_id : fml.vars.userId
	    },
		dataFilter : function(data){
			fml.vars.poster_r = data.r || '';
			return data.data
		},
		colNum: 1,
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
		},
		onLayoutFinished: function(){
			scrollStopItems.reBind()
		}
	}).start();
}

if(fml.vars.follow_list && fml.vars.follow_list.length >0) {
	init();
}
