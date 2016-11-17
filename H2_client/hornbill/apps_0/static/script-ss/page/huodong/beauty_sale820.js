fml.define('page/huodong/beauty_sale820' , ['jquery', 'app/doota/timedown'] , function(require, exports){
	var $ = require('jquery');
	window.timedown = require('app/doota/timedown');

	$('.poster_tab a').hover(function(){
		$('.tab_choosed').attr('style', $(this).attr('data_style'));
	}, function(){$('.tab_choosed').attr('style', '');});

	$('.timeStamp_wrap').each(function(){
		var self = this;
		timedown.down(self, $(self).attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
			if(t.h != undefined) $(self).find('.hour').html(t.h<10 ? '0'+t.h : t.h);
			if(t.i != undefined) $(self).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
			$(self).find('.min').html(t.s<10 ? '0'+t.s : t.s);
		}).onTimeOver(function(){
			$(self).html('正在抢购中');
		});
	});

});

