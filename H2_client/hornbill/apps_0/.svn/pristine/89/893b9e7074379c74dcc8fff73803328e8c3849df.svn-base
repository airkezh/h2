fml.define('wap/app/header' , ['wap/jquery', 'wap/jquery.mobile'] ,function(require , exports){
	var showAside = function(mainScroll, asideScroll){
		var main = $(mainScroll.wrapper).parent()
			, aside = $(asideScroll.wrapper).parent()
			, t
		var show = function(){
			main.attr('ismove', '1')
			mainScroll.disable()
			aside.show();
			asideScroll.enable()
			clearTimeout(t)	
		}
		var hide = function(){
			main.attr('ismove', '0')
			mainScroll.enable()
			t = setTimeout(function(){
				aside.hide();
				asideScroll.disable()
			}, 400);
		}
		$('.btn_aside').on('tap', function(){
			main.attr('ismove') === '0' ? show() : hide()
		})
		main.on('swipeleft', function(){
			show();
		})
		main.on('swiperight', function(){
			hide();
		})
	};

	exports.showAside = showAside;
});
