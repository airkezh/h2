fml.define('wap/app/countdown' , ['wap/zepto'] , function(require , exports){
	function countdown(stamp){
		var t = stamp * 1000 - new Date();
		var d = Math.floor(t / (60 * 60 * 24 * 1000));
		t = t - d * (60 * 60 * 24 * 1000);
		var h = Math.floor(t / (60 * 60 * 1000));
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
		setInterval(function(){
			$('.timeStamp').each(function(){
				var time = countdown($(this).attr('end-date'));		
				$(this).find('#day').html(time.d);	
				$(this).find('#hour').html(time.h);	
				$(this).find('#minute').html(time.m);	
				$(this).find('#seconds').html(time.s = time.s<=9 && time.s>0 ? '0'+time.s : time.s);	
				if(time.d == 0){
					$(this).find('.0day').hide();
					if(time.h == 0){
						$(this).find('.0hour').hide();
						if(time.m == 0){
							$(this).find('.0minute').hide();	
						}
					}
				}
			});
		}, 1000);
	}
});
