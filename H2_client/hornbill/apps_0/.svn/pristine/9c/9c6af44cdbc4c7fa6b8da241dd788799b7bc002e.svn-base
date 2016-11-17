fml.define('wap/app/screen_iscroll', ['wap/zepto'] , function(require , exports){
	var orient = $('#orient')
		, screen_h = document.documentElement.clientWidth / screen.width * screen.height
		, frame = $('#frame')
		, wrapper = $('#wrapper_main')

	fml.vars.screen_h = screen_h;

	exports.full = function(){
		if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {  
			$('body').height(screen_h)
		}  
		setTimeout(function() {  
			window.scrollTo(0, 1)  
			frame.height($(window).height())
		}, 0);  
	}

	var orientationChange = function(){
		switch(window.orientation) {
		　　case 0: 
				orient.hide();
				break;
			case 90:
			case -90:
			case 180:
				orient.show();
				break;
			default:
				orient.show();
				break;
		}
	}
	exports.orientation = function(){
		orientationChange()
		window.onorientationchange = orientationChange
	}

});
