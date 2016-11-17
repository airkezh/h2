/*common*/
require('app/banner');
var scroll = require('component/windowScroll');
var banner = $('#banner');
//轮播图
if (banner.find('li').length > 1) {
	$("#banner").imageSlide({
		evt: 1,
		effect: 1
	});
}
//posterWalls
fml.use(['jquery', 'app/posterWalls', 'component/shareTmp', 'component/urlHandle'], function() {
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame': query.frame || 0,
		'page': query.page || 0,
		'sort': query.sort || 0,
		'cata': query.cata || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts, '/aj/korea/index/waterFall');
});
fml.use('component/lazyLoad', function() {
	this.load('.ad_pic span.h270', 'asrc');
});
// like
// fml.use('app/like', function() {
// 	this.posterLike('.goods_wall', '.poster_likes');
// });


//menu
var menuBox = $('#postwallTitle'),
	menuBoxHeight = menuBox.height(),
	goods_wall_box = $('.goods_wall_box'),
	// subNav = menuBox.find('.menu-inner'),
	// subHolder = $('#com-nav'),
	// wheader = subHolder.find('.inner'),
	navHeight = $('#nav').height(),
	y = menuBox.offset().top - navHeight;
scroll.yIn(y, function() {
	menuBox.addClass('menu-box-fixed');
	goods_wall_box.css('margin-top', menuBoxHeight + 'px');
	menuBox.addClass('shadow');
}, function() {
	menuBox.removeClass('menu-box-fixed');
	goods_wall_box.css('margin-top', '0');
	menuBox.removeClass('shadow');
})