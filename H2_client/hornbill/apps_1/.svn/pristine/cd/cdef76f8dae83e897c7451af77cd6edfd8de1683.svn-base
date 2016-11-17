fml.use(['wap/zepto/touch', 'wap/component/windowScroll', 'wap/zepto/scroll'],function(require){
	var onscroll = this.windowScroll,
		$k_top_btn = $('.k_top_btn');

	$('.btn_today').on('tap', function(){
		var self = this;
		setTimeout(function(){
			$(self).parents('.seckill_inner').css('margin-left', '0');
		}, 400);
	});
	$('.btn_tomorrow').on('tap', function(){
		if($('.expect_msg').length){
			$('.expect_msg').show();
			setTimeout(function(){
				$('.expect_msg').hide();
				return false;
			}, 1400);
			return false;
		}
		var self = this;
		setTimeout(function(){
			$(self).parents('.seckill_inner').css('margin-left', '-100%');
		}, 400);
	});
	$('.expect_msg').on('touchmove', function(e){
		e.preventDefault();
		return false
	});

	$('html,body').on('touchstart', function(){
		$k_top_btn.hide();
	});
	function btn_show(pos,isDown){
		if(pos < 20){
			$k_top_btn.show().removeClass('k_pulse').addClass('k_fader');
		} else {
			$k_top_btn.hide();
		}
	}
	onscroll.bind(btn_show);
	$k_top_btn.on('touchstart', function(){
		$('html,body').scrollTo({
			endY : $('.more_act').offset().top-30,
			updateRate: 10
		});
		return false;
	}).on("webkitAnimationEnd", function(){
		var self = this;
		setTimeout(function(){
			$(self).removeClass('k_fader').addClass('k_pulse');
		}, 600);
	});

	var time = $('.today .first_goods').attr('time');
	time = time.replace('-', '/').replace('-', '/');
	var mistiming = (new Date(Date.parse(time))- new Date());
	if(!isNaN(mistiming) && mistiming > 0 && mistiming < 600000){
		setTimeout(function(){
			$('.today .remind_btn').removeClass('wait_btn').html('正在抢购');
		}, mistiming);
	}
});
fml.define('wap/page/biz/seckill', [], function(require, exports){});