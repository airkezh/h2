fml.define('wap/app/navTop2', ['wap/zepto', 'wap/zepto/touch'] , function(require , exports){
	var frame = $('#sectionWall')
		, header = $('#header')
		, navTop = $('#navTop')
		, n_h = navTop.height()

	var normal = function(){
		header.attr('status','normal')
		navTop.attr('status','normal')
		navTop.attr('style','')	
	}
	var action = function(){
		header.attr('status','scroll')
		navTop.attr('status','scroll')
		var t = setTimeout(function(){
			navTop.css({'position':'fixed'})	
		}, 200)
	}

	var bind = function(){
		frame[0].addEventListener("touchstart", function(){
			var pos = $(window).scrollTop()
			if(pos == 0)
				if(header.attr('status') == 'normal')
					action()
				else
					normal()

		}, false)
	}
	exports.bind = bind;

});
