fml.define('wap/page/poster0' , ['wap/component/waterfall','wap/component/shareTmp']  , function(require,exports){
	var shareTmp = require('wap/component/shareTmp')
   		, pin = require('wap/component/waterfall')
		, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')

	var pullUp = $('.pullUp')

	fml.vars.poster.totalColNum = colFlag || 2
	pin.init({
        containerId : '.goods_wall'
        ,offset:{x:5,y:5}
    });
	fml.vars.poster.scale = pin.getAttr('scale')
	fml.vars.poster.colWidth = pin.getAttr('colWidth')

    if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
});

fml.use('wap/app/goAppWelcome' , function(){
	this.init();
});