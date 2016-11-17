fml.define('wap/app/fallWall0' , ['wap/zepto', 'wap/component/lazyLoad', 'wap/component/shareTmp']  , function(require,exports){
	var shareTmp = require('wap/component/shareTmp')
		, posLoad = require('wap/component/lazyLoad')
		, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')

	var pullUp = $('.pullUp')
	var pin = $('.goods_wall')

	if (Meilishuo.config.fallWall0 && Meilishuo.config.fallWall0.tInfo.length > 0){
		if(fml.vars.is_lazyload_poster){
			var posDom = $(shareTmp('posterWall' , Meilishuo.config.fallWall0));
			posLoad.load(posDom.find('.bs_load_img'), 'asrc');
			pin.append(posDom);
		} else {
			pin.append(shareTmp('posterWall' , Meilishuo.config.fallWall0));
		}
		setTimeout(function(){fml.emit('posterFinsh')}, 0);//注册海报加载完成事件
		pullUp.attr('status', 'tap');
		delete Meilishuo.config.fallWall0;
	}
});
