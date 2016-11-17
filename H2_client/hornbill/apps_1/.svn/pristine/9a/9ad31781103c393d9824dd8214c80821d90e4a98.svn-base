fml.define('wap/app/screen', ['wap/zepto', 'wap/component/windowScroll'] , function(require , exports){
	var scroll = require('wap/component/windowScroll');
	fml.vars.screen.body = $('body')
	fml.vars.screen.wrapper = $('#wrapper_main')
	fml.vars.screen.header = $('#header')
	fml.vars.screen.scroller = fml.vars.screen.wrapper.children('.scroller')

	exports.full = function(){

		window.scrollTo(0, 0)  

		if(Meilishuo.config.os.ios){
			var t = setTimeout(function() {  
				var scroll_height = $(window).height() - fml.vars.screen.header.height()
				fml.vars.screen.scroller.height(scroll_height)
			}, 1);
		}
	}

	exports.fullTop = function(){

		if(Meilishuo.config.os.ios){
			scroll.bind(function(pos,isDown){
				if(isDown){
					window.scrollTo(0, 0)	
				}
			}, 'fullScreen', fml.vars.screen.scroller[0])
		}
	}

});
