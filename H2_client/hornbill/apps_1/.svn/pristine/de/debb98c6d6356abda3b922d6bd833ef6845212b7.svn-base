fml.define('page/huodong/beauty_sale' , ['jquery', 'app/doota/timedown'] , function(require, exports){
	var $ = require('jquery');
	window.timedown = require('app/doota/timedown');

	$('.poster_tab a').hover(function(){
		$('.tab_choosed').attr('style', $(this).attr('data_style'));
	}, function(){$('.tab_choosed').attr('style', '');});

	$('.timeStamp_wrap').each(function(){
		var self = this;
		timedown.down(self, $(self).attr('time'), '0d-0h-0i-0s',['%v','%v: ','%v: ','%v']).onAction(function(t){
			if(t.d != undefined) $(self).find('.day').html(t.d<10 ? '0'+t.d : t.d);
			if(t.h != undefined) $(self).find('.hour').html(t.h<10 ? '0'+t.h : t.h);
			if(t.i != undefined) $(self).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
			$(self).find('.min').html(t.s<10 ? '0'+t.s : t.s);
		}).onTimeOver(function(){
			$(self).html('正在抢购中');
		});
	});
	$('.tab_prev').on('click', function(){
		var prev_num = +$(this).attr('data');
		if(prev_num == 2) $(this).hide();
		if(prev_num < 2) $('.tab_next').show();
		$('.seckill_inner').css('margin-left', '-' + (2-prev_num)*926 + 'px');
		$(this).attr('data', 1+prev_num);
		$('.tab_next').attr('data', 3-prev_num);
	});
	$('.tab_next').on('click', function(){
		var next_num = +$(this).attr('data');
		if(next_num == 2) $(this).hide();
		if(next_num > 0) $('.tab_prev').show();
		$('.seckill_inner').css('margin-left', '-' + next_num*926 + 'px');
		$(this).attr('data', 1+next_num);
		$('.tab_prev').attr('data', 3-next_num);
	});
});

fml.use(['jquery', 'component/windowScroll'], function(){
	var $ = this.jquery;
	var onscroll = this.windowScroll;

	function gotop(pos){
		if(pos < $('.poster').offset().top - 30){
			$('.poster .fx_hidden').hide();
			$('.poster .bs_tab_wrap').removeClass('fx_tab');
		} else {
			$('.poster .bs_tab_wrap').addClass('fx_tab');
			$('.poster .fx_hidden').show();
		}
	}
	onscroll.bind(gotop, 'gotop_wrap');
});

