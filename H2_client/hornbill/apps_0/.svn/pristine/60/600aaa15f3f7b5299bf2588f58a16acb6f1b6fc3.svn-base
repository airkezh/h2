/*common*/
/*
fml.use('wap/app/screen' , function(){
	this.full()
	this.fullTop()
});
*/
fml.use('wap/app/frame6' , function(){
	this.openClosedFn();
	this.searchFn();
	this.routeFn();
});
fml.use('wap/app/search' , function(){
	this.check();
});
/*
fml.use('wap/app/slideOpen' , function(){
//	this.moveSlider();
	this.tapSlider();
	this.tapDefault();
	// setTimeout(function(){$('.daoliuBanner').find('.slider').trigger('tap');},1000)
	$('#openApp').trigger('tap');
});*/

var $ = require('wap/zepto'),
	WaterFall = require( 'circle/component/waterfall' ),
	optimiseFn = require('circle/component/waterfallOptimise'),
	lazy = require('wap/component/lazzyLoad');

var urlData = { 'frame' : 0 }, idObj, id;


var lazy_pic = lazy.init({'xpath' : '.bs_load_img'});
lazy_pic.scroll();

if(Meilishuo.config.controller != 'goods'){
		idObj = {
			'catalog' : 'nid'
			, 'attr' : 'attr_id'
			, 'search' : 'keyword'
			, 'group' : 'group_id'
		}
		id = idObj[fml.vars.poster.ptype]
		urlData[id] = fml.vars.poster.pid
}
var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/getGoods/' + fml.vars.poster.ptype,
	data: urlData,
	dataFilter : function(data){
            fml.vars.poster_r = data.r || '';
            return data.data.tInfo
    },
	colNum: 2,
	colGap : 0,
	optimiseFn : optimiseFn,
	onFetchSuccess: function(data){
		lazy_pic.load();
		if(data.length == 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start();
