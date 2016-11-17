fml.use(['app/audio'] , function(){
	this.audio();
});

fml.define('wap/page/groundnew' , ['wap/component/waterfall','wap/app/posterWalls','wap/component/shareTmp'] , function(require, exports){
	var shareTmp = require('wap/component/shareTmp')
   		, pin = require('wap/component/waterfall')
		, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')
	var pullUp = $('.pullUp')

	fml.vars.poster.totalColNum = colFlag || 2
	pin.init({
        containerId : '.goods_wall',
        containerWidth : parseInt($(window).width()*.96875)
    });
    var posterWall = require('wap/app/posterWalls');
	var urlData = { 'frame' : 0 }

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/groundWap/?type=' + fml.vars.type);
	}
	Meilishuo.config.poster0 = '';
	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster(true);
    fml.vars.toLogPoster = true
    fml.eventProxy('logPoster' , function(res){
    	if (!res.tInfo.length) {
    		$('.pullUp').hide();
    	};
    })
	fml.vars.poster.scale = pin.getAttr('scale')
	fml.vars.poster.colWidth = pin.getAttr('colWidth')
	if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
});