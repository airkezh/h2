/*common*/
var banner = require('app/focus_banner');

//轮播图
banner.bind({
	'unit': '.banner li',
	'btn': '.focus a',
	'transition': 'fade'
});
//posterWalls
fml.use(['jquery', 'app/posterWalls', 'component/shareTmp', 'component/urlHandle'], function() {
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame': query.frame || 0,
		'page': query.page || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts, '/aj/desire/getGoods');
});
fml.use('component/lazyLoad' , function(){
    this.load('.ad_pic span.h270' ,'asrc');
});
// like
// fml.use('app/like', function() {
// 	this.posterLike('.goods_wall', '.poster_likes');
// });
