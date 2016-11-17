fml.define('wap/app/frame', ['wap/zepto', 'wap/zepto/touch'] , function(require , exports){
	var html = $('html')
		, body = $('body')
		, frame = $('#frame')
		, layout = $('#layout')

	var navLeft = function(){
		var btn = $('#btn-left')
			, nav = $('#nav-left')
		var show = function(){
			layout.attr('active', '0')
			nav.attr('active', '1')
			frame.attr('showNavLeft', '1')
		}
		var hide = function(){
			layout.attr('active', '1')
			frame.attr('showNavLeft', '0')
			var t = setTimeout(function(){
				nav.attr('active', '0')
			}, 200)
		}
		btn.on('tap', function(){
			layout.attr('active') === '1' ? show() : hide() 
		})
	};

	exports.navLeft = navLeft;
});
