fml.define('wap/app/slideOpen40' , ['wap/jquery', 'wap/jquery.mobile', 'wap/app/openClient40'] , function(require , exports){
	var openClient = require('wap/app/openClient40').open;
	var slide = $('#slideOpen')
		, closeBtn = slide.find('.close')
		, slider = slide.find('.slider')
		, track = slide.find('.track')
		, x = 0
		, startX = 0
		, xx
		, track_width

	var touchStart = function(event){
		event.preventDefault();
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		startX = touch.pageX - x;
		slider.attr('status', 'move')
	};

	var touchMove = function(event){
		event.preventDefault();
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		x = touch.pageX - startX
		xx = x / track_width * 100;
		
		xx <= 0 ? xx = 0 : (xx >= 100 ? xx = 100 : '')

		slider.css({'margin-left' : xx + '%'})
	}

	var touchEnd = function(event){
		if(xx >= 90){
			openClient(slider)	
		}else{
			slider.attr('status', 'drop')
			x = 0
			startX = 0
			xx = 0
			slider.css({'margin-left' : xx + '%'})
		}
	}

	var moveSlider = function() {
		var slideStatus = localStorage.getItem('slideStatus');
		if(slideStatus == 1){
			slide.remove()
			return;
		}
		
		slide.show()
		track_width = track.width()
		slider.on("touchstart", touchStart);
		slider.on("touchmove", touchMove);
		slider.on("touchend", touchEnd);
		hideSlide()
	}
	var hideSlide = function(){
		closeBtn
			.on('touchstart', function(event){
				event.preventDefault();
			})
			.on('tap', function(event){
				event.preventDefault();
				slide.remove()
				localStorage.setItem('slideStatus',1);

			})	
	}

	exports.moveSlider = moveSlider;
});
