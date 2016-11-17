/*common*/

var $ = require('wap/zepto')
	, WaterFall = require('wap/component/circleWaterfall')
	, optimiseFn = require('wap/component/waterfallOptimise')
	, lazy = require('wap/component/lazzyLoad')
	, shareTmp = require('wap/component/shareTmp')
	, Swipe = require('wap/component/swipe')
	, onscroll = require('wap/component/windowScroll')

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

var urlData = {
	'frame' : 0
	, 'tid' : fml.vars.tid
}

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/item/item_share_goods',
	data: urlData,
	dataFilter : function(data){
		fml.vars.poster_r = data.r || '';
		return data.goods.tInfo
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
	}
}).start()

/**
 * 推荐单品加载
 */
if(fml.vars.attr_rec_name){
	$.post('/aj/getGoods/recommend_wap', {'word_name':fml.vars.attr_rec_name}, function(res){
		var cur_num = $('.slide_num .cur')
			, all_num = $('.slide_num .all')
			, tpl = shareTmp('attr_goods', res)

		all_num.html(Math.ceil(res.data.tInfo.length/3))
		$('.swipe-wrap').append(tpl)
		lazy_pic.load()

		var slide = new Swipe($('#slider')[0], {
			speed: 200,
			auto: 3000,
			callback: function() {
				cur_num.html(slide.getPos() + 1)
			},
			transitionEnd : function(){
				lazy_pic.load()
			}
		})
	}, 'json')
}
