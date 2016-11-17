fml.define('wap/app/frame2', ['wap/component/windowResize', 'wap/zepto', 'wap/zepto/touch'] , function(require , exports){
	var resizer = require('wap/component/windowResize')
	var frame = $('#frame')
		, layout = $('#layout')

	var navLeft = function(mainScroll){
		var btn = $('#btn-left')
			, nav = $('#nav-left')
			, t
		var show = function(){
			mainScroll.disable()
			layout.attr('active', '0')
			nav.attr('active', '1')
			frame.attr('showNavLeft', '1')
			clearTimeout(t)
		}
		var hide = function(){
			mainScroll.enable()
			layout.attr('active', '1')
			frame.attr('showNavLeft', '0')
			t = setTimeout(function(){
				nav.attr('active', '0')
			}, 200);
		}
		btn.on('tap', function(){
			layout.attr('active') === '1' ? show() : hide() 
		})
		frame.on('swiperight', show)
		frame.on('swipeleft', hide)
	};

	var refreshScroll = function(scroll){
		resizer.bind(function(){
			scroll.refresh();
		});
	};

	exports.navLeft = navLeft;
	exports.refreshScroll = refreshScroll;
});
