fml.define('wap/page/summer_match' , ['wap/zepto', 'wap/component/shareTmp']  , function(require,exports){
	var shareTmp = require('wap/component/shareTmp')
	var pullUp = $('.pullUp')

	fml.vars.poster.totalColNum = 2;

    if (Meilishuo.config.poster0 && Meilishuo.config.poster0.length > 0){
		$('.waterfall').append(shareTmp('posterWall' ,{'poster': Meilishuo.config.poster0, 'fml':fml.vars.poster}))
		pullUp.attr('status', 'tap');
	}
	//设置scroll的高度
	window.scrollTo(0, 0)  

	if(Meilishuo.config.os.ios){
		var t = setTimeout(function() {  
			var scroll_height = $(window).height();
			$('.scroller').height(scroll_height);
		}, 1);
	}
});
