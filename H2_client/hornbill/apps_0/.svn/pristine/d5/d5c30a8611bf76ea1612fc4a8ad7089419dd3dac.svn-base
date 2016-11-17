fml.define('wap/page/activity/punch' , ['wap/zepto', 'wap/app/tracking'] , function(require , exports){
	var logTrack = require('wap/app/tracking');
	logTrack.cr('timeSign', {'frm': 'pageview'});
	$('.punch_goods_recommend a').on('click', function(){
		var goods_data = $(this).attr('data');
		logTrack.cr('timeSign', {'frm': goods_data});
	});

	var isPunch = Meilishuo.config.isPunch;
	if(!isPunch){
		var punch_num = Meilishuo.config.punch_num;
		var isLogin = Meilishuo.config.isLogin;
		var url = location.href;
		var openLogin = 'meilishuo://login.meilishuo/';
		if(url.indexOf('preSign=1') > 0){
			if(!isLogin){
				alert('请登录后签到');
				var isSign = false;
				$('.punch_login').on('click', function(){
					if(isSign){
						if(url.indexOf('preSign=1') < 0){
							url += '&preSign=1';
						}
						window.location.href = url;
					} else {
						$(this).html('签一下').addClass('preSign').removeClass('punch_login');
						isSign = true;
						setTimeout(function(){window.location.href = openLogin;}, 100);
					}
				});
			} else {
				var access_token = Meilishuo.config.access_token;
				$('.punch_login').html('签一下').addClass('preSign').removeClass('punch_login');
				var url = '/aj/activity/do_punch';
				var data = {'access_token' : access_token};
				var callback = function(res){
					if(res.data){
						$('.punch_msg').removeClass('preSign').html('已签过').attr('href', 'javascript:void(0)');
						var punch_num = Meilishuo.config.punch_num + 1;
						$('.user_msg span').last().html(punch_num);
						$('.punch_preS_wrap').css({'width' : (38+564*punch_num/7)/640 + '%'});
					} else {
						alert('打卡失败');
					}
				};
				$.get(url , data , callback ,'json');
			}
		} else {
			if(isLogin){
				$('.sign').on('click', function(){
					if($('.punch_msg').hasClass('sign')){
						var url = '/aj/activity/do_punch';
						var data = {'access_token' : Meilishuo.config.access_token};
						var callback = function(res){
							if(res.data){
								$('.punch_msg').removeClass('sign').html('已签过');
								var punch_num = Meilishuo.config.punch_num + 1;
								$('.user_msg span').last().html(punch_num);
								$('.punch_preS_wrap').css({'width' : (38+564*punch_num/7)/640 + '%'});
							} else {
								alert('打卡失败');
							}
						};
						$.get(url , data , callback ,'json');
					}
				});
			} else {
				var isSign = false;
				$('.punch_login').on('click', function(){
					if(isSign){
						url += '&preSign=1';
						window.location.href = url;
					} else {
						$(this).html('签一下').addClass('preSign').removeClass('punch_login');
						isSign = true;
						setTimeout(function(){window.location.href = openLogin;}, 100);
					}
				});
			}
		}
	}
});
