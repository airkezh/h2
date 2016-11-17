fml.define('wap/app/slideOpen1' , ['wap/app/tracking', 'wap/zepto', 'wap/app/openClient2'] , function(require , exports){
	var openClient = require('wap/app/openClient2');
	var tracking = require('wap/app/tracking')
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
	//	window.scrollTo(0, ($(window).scrollTop() - 1))

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
			tracking.cr('m/slideOpen')
			openClient.open(slider)	
			var t = setTimeout(back,600)
		}else{
			back()
		}
	}
	var back = function(){
		slider.attr('status', 'drop')
		x = 0
		startX = 0
		xx = 0
		slider.css({'margin-left' : xx + '%'})
	}

	var initSlider = function() {
		//临时清空
		if(localStorage.getItem('slideStatus') == 1){
			localStorage.removeItem('slideStatus');
		}
		if(sessionStorage.getItem('slideStatus') == 1){
			alert('initSlider remove')
			slide.remove()
			return;
		}
		setTimeout(function(){
			slide.show()
		}, 500);
	}
	var hideSlide = function(){
		alert('hideSlide')
		closeBtn
			.on('touchstart touchend', function(event){
				event.preventDefault();
			})
			.on('tap', function(event){
				alert('tap remove')
				event.preventDefault();
				slide.remove()
				sessionStorage.setItem('slideStatus',1);

			})	
	}

	exports.tapSlider = function(){
		initSlider()
		slider.on('tap', function(){
			tracking.cr('m/slideOpen')
			openClient.open(slider)	
		})	
		//hideSlide()
	}

	exports.tapDefault = function(){
		initSlider()
		slider.on('tap', function(){
			openClient.opencd(slider)	
		})	
		hideSlide()
	}
	exports.moveSlider = function() {
		initSlider()

		track_width = track.width()
		slider.on("touchstart", touchStart);
		slider.on("touchmove", touchMove);
		slider.on("touchend", touchEnd);
		hideSlide()
	}
});
