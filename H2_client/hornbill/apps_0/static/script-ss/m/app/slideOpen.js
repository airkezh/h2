/*common*/	
require('m/zepto')
require('m/zepto/touch')

var tracking = require('wap/app/tracking')
	, storage = require('component/iStorage')
	, openClient = require('m/app/openClient')
	// , slide = $('#slideOpen')
	, slide = $('.daoliuBanner')
	, closeBtn = slide.find('.close')
	, slider = slide.find('.slider')
	, track = slide.find('.track')
	, x = 0
	, startX = 0
	, xx
	, track_width
	, screen_bp = $('.screen')
	, scrn_close = screen_bp.find('.scrn_close')
	, scrn_slider = screen_bp.find('.scrn_slider')
 	, leadApp = $('.leadApp')
 	, closeApp = leadApp.find('.closeApp')
 	, downloadApp = leadApp.find('.downloadApp')
 	, downloadBtn = leadApp.find('.downloadBtn')
 	, headApp = $('.headApp')
 	, openApp = $('#openApp')

 	//头部导流
 	tracking.cr('wap_zhiding_show');
 	headApp.on('tap',function(){
		openClient.open(headApp);
		tracking.cr('wap_zhiding_download');
		//axis统计代码
		_fxcmd.push(['trackEvent','event','download','label','0']);
	})

	//导流浮层
	if($(leadApp).length){
		setTimeout(function(){
			$('.wrapper').hide();
		},200)
		tracking.cr('wap_daoliu_show');
	}
	closeApp.on('touchstart touchend', function(event){
		event.preventDefault();
	}).on('tap',function(){
		$('.wrapper').show();
		$(this).parent('.leadApp').hide();
		storage.setCookie('wap_daoliu_hidden' , new Date().getTime() ,{'duration' : 7200});
		tracking.cr('wap_daoliu_skip');
	});

	timer = setInterval(function(){
		downloadBtn.toggleClass('downloadBtnH');
	},500);

	downloadApp.on('tap',function(){
		$(this).find('.default_btn').hide();
		$(this).find('.click_btn').show();
		setTimeout(function(){
			downloadApp.find('.default_btn').show();
			downloadApp.find('.click_btn').hide();

		},1500)

		openClient.open(downloadApp);
		tracking.cr('wap_daoliu_download');
	});

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
		slide.remove()
		return;
	}
	
	if(!storage.getCookie('banner_hidden')) slide.css('display','block !important');
	if(fml.vars.twitter_id) {
		tracking.cr('wap_share_show')
	} else {
		tracking.cr('wap_tongyong_show')
	}
}
var hideSlide = function(){
	closeBtn
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(event){
			event.preventDefault();
			slide.remove()
			sessionStorage.setItem('slideStatus',1);

		})	
}

exports.tapSlider = function(){
	if($(screen_bp).length) {
		if(storage.getCookie('screen_skip')) {
			screen_bp.hide();
			initSlider()
		} else {
			screen_bp.show();
			tracking.cr('wap_banping_show')
		}
		scrn_close.on('touchstart touchend', function(event){
			event.preventDefault();
		}).on('tap',function(){
			$(this).parent('.screen').hide();
			setTimeout(function(){
				initSlider()
			},0);
			storage.setCookie('screen_skip' , new Date().getTime() ,{'duration' : 7200});
			tracking.cr('wap_banping_skip');
		});
		scrn_slider.on('tap',function(){
			openClient.open(scrn_slider);
			tracking.cr('wap_banping_download')
		})
	} else {
		initSlider()
	}
	
	slider.on('tap', function(){
		// tracking.cr('m/slideOpen')
		openClient.open(slider);
		if(fml.vars.twitter_id) {
			tracking.cr('wap_share_download')
		} else {
			tracking.cr('wap_tongyong_download')
		}
		//axis统计代码
		_fxcmd.push(['trackEvent','event','download','label','0']);
	})	
	hideSlide()
}

exports.tapDefault = function(){
	//initSlider()
	//临时清空
	if(localStorage.getItem('slideStatus') == 1){
		localStorage.removeItem('slideStatus');
	}
	if(sessionStorage.getItem('slideStatus') == 1){
		slide.remove()
		return;
	}
	// initSlider()
	// slider.on('tap', function(){
	// 	openClient.opencd(slider)	
	// })	
	
	openApp.on('tap', function(){
		openClient.opencd(openApp)
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

