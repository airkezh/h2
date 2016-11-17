fml.define('app/countdown' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	function countdown(stamp){
		var t = stamp * 1000 - new Date();
		var d = Math.floor(t / (60 * 60 * 24 * 1000));
		t = t - d * (60 * 60 * 24 * 1000);
		var h = Math.floor(t / (60 * 60 * 1000));
		//var h = (d - Math.floor(d)) * 24;
		t = t - h * (60 * 60  * 1000);
		var m = Math.floor(t / (60 * 1000));
		t = t - m * (60 * 1000);
		var s = Math.floor(t / 1000);
		return {
			d : d,	
			h : h,	
			m : m,	
			s : s	
		}	
	}
	return function(){
		var time;
		var timer = setInterval(function(){
			$.each($('.timeStamp') , function(){
				time = countdown($(this).attr('end-date'));		
				$(this).find('#day').html(time.d);	
				$(this).find('#hour').html(time.h);	
				$(this).find('#minute').html(time.m);	
				$(this).find('#seconds').html(time.s = time.s <= 9 ? '0'+time.s : time.s);	
			});
			if(time && time.d == 0 && time.h == 0 && time.m == 0 && time.s == 00) clearInterval(timer)
		}, 1000);
	}
});
