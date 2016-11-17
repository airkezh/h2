fml.define('md/page/poster0' , ['md/app/waterfall','wap/component/shareTmp']  , function(require,exports){
	var shareTmp = require('wap/component/shareTmp')
   		, pin = require('md/app/waterfall')
		//, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')

	var pullUp = $('.pullUp')

	fml.vars.poster.totalColNum = 2
	pin.init({
        containerId : '.goods_wall'
    });
	fml.vars.poster.scale = pin.getAttr('scale')
	fml.vars.poster.colWidth = pin.getAttr('colWidth')

    if (Meilishuo.config.poster0.data && Meilishuo.config.poster0.data.length > 0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
});
