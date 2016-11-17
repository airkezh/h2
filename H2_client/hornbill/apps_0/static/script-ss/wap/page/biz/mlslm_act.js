/*common*/
var pin = require('wap/component/waterfall'),
	addPosters = require('wap/app/posterWalls4'),
	urlHandle = require('wap/component/urlHandle'),
	scroll = require('wap/component/windowScroll'),
	shareTmp = require('wap/component/shareTmp'),
	lazyLoad = require('wap/component/lazzyLoad');
require('wap/zepto');
require('wap/zepto/scroll');

var pullUp = $('.pullUp'),
	$goTop = $('.gotop');
fml.vars.poster.totalColNum = 2;
pin.init({
    'containerId' : '.goods_wall',
    'containerwidth' : $(document).width(),
    'offset' : {x : 5 ,y : 2}
});
fml.vars.poster.scale = pin.getAttr('scale');
fml.vars.poster.colWidth = pin.getAttr('colWidth');

if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
	pin.append(shareTmp('posterWall' , Meilishuo.config.poster0));
	lazyLoad.init({
		'xpath' : '.bs_load_img',
		'attrName' : 'data-src',
		'loadStyle' : 'img'
	}).load().scroll();
	pullUp.attr('status', 'tap');
}
//分帧加载
var query = urlHandle.getParams(window.location.href.toString());
var urlData = {
	'frame' : 0,
  	'limit': 30
};
var opts = $.extend({}, urlData, query);
var url = '/aj/mlslm/poster';
var pullUpAction = function(){
	addPosters.ajaxPoster(url);
};
addPosters.testPoster0(opts, pullUpAction);
addPosters.scrollPoster(true);
//回到顶部
$goTop.on('click', function (){
	$.scrollTo({
   	 	endY: 0,
  	 	duration: 300
	});
});
function goTop (pos, isDown){
	if(!isDown && pos > 100){
		$goTop.show();
	}else{
		$goTop.hide();
	}
}
scroll.bind(goTop,'gotop');
