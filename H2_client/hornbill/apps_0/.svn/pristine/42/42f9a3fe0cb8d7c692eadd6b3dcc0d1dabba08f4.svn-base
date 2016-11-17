fml.define('wap/app/navTop', ['wap/zepto'] , function(require , exports){
	var frame = $('#frame')
		, header = $('#header')
		, nav = $('#nav-top')
		, h_h = header.height()
		, n_h = nav.height()

	var normal = function(){
		frame.on('swipeUp', function(){
//			alert(111)	
		})
	}
	var iscroll = function(scroll){
		var main = $(scroll.wrapper)
		var show = function(){
			frame.off('swipeDown', show)
			frame.on('swipeUp', hide)
			header.attr('active','1');
			nav.attr('active','0')
			main.css({'top':h_h + n_h})
			var t = setTimeout(function(){
				scroll.refresh();
			}, 200);
		}
		var hide = function(){
			frame.on('swipeDown', show)
			frame.off('swipeUp', hide)
			header.attr('active', 0);
			nav.attr('active','1')
			main.css({'top':n_h})
			var t = setTimeout(function(){
				scroll.refresh();
			}, 200);
		}
		frame.on('swipeUp', hide)
		/*
		if(!acting){
			if(!showNavTop && scroll.y - scroll.startY > 0 && scroll.y > scroll.minScrollY)
				show();
			if(showNavTop && scroll.y - scroll.startY < 0)
				hide();
		}
		*/
	};
	exports.normal = normal;
	exports.iscroll = iscroll;

});
