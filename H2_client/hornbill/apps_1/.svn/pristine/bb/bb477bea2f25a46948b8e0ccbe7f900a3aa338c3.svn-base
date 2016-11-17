fml.define('app/findPwd',['jquery', 'component/focus', 'component/urlHandle', 'app/checkcode'],function(require , exports){
    var $ = require('jquery')
       ,input = require('component/focus')
       ,checkcode = require('app/checkcode')
       ,urlHandle = require('component/urlHandle')
       ,$loginName = $('#login_name')
       ,$checkCode = $('#check_code')
       ,$submitBtn = $('#submit_btn')
       ,$bieBtn = $('#bie_btn')
       ,$bie = $('.bie')
       ,$errorMessage = $('.errorMessage')


    /* 找回密码功能入口 */
	var init = function(){

		var inputItem = ['#login_name']
		for(i in inputItem){ input.inputFocus(inputItem[i]); }
			$submitBtn.bind('click', findPassSubmit);
			$bieBtn.bind('click', findPass);	
		changeCode();
	}

	/* 手机号找回功能入口 */
	var sendSms = function(){
		$submitBtn.bind('click', sendSmsSubmit);
		
		var $timeBox = $('.msgcode .time_box')
		var cbk = function(){
			$timeBox.unbind('click').html('<b>59</b>秒后可重新发送');
			var $time = $timeBox.find('b');
			timeDown($time.text() ,function(times){
		   		if(!times){
		   			$timeBox.html('重新发送').bind('click', function(e) {
		   				reSendSms(cbk);
		   			});
				}
				else {
					$time.text(times);
				}
			});
		}
		cbk();
	}

	var reSendSms = function(cbk){
		var url = '/aj/user/mobileandemail_validation';
		var data = {
			login_name : $('#login_name').val()
		   ,type  :'moblie'
		};
		var callback = function(res){
			if(res && res.code == 0){
				cbk();
			} else {
				$errorMessage.html(res.message).show();
				//urlHandle.redirect('/user/findPwd');
			}
		};
		$.post(url , data , callback ,'json');
	}
	
	var resetPwd = function(){
		$submitBtn.bind('click', resetPwdSubmit);
		$('#new_password').on('input propertychange',function(){
			checkPwd($(this).val());
		})
	}

	var resetPwdSubmit = function(){
		var newPassword = $.trim($('#new_password').val())
		   ,confirm_password = $.trim($('#confirm_password').val())

		if(newPassword == ''){
			$errorMessage.html('请输入新密码').show();
			return;
		}

		if(newPassword.length < 6){
			$errorMessage.html('新密码不能小于6位').show();
			return;
		}

		if(confirm_password == ''){
			$errorMessage.html('请确认密码').show();
			return;
		}

		if(newPassword != confirm_password){
			$errorMessage.html('两次密码输入不一致').show();
			return;
		}

		var url = '/user/find_pass/reset';
		var data = {
			validate_code: $('#validate_code').val()
		   ,new_password: $('#new_password').val()
		   ,confirm_password: $('#confirm_password').val()
		};
		var callback = function(res){
			var url = '/user/findPwd/success';
			if(res && res.code == 0){
				urlHandle.redirect(url);
			} else {
				$errorMessage.html(res.message).show();
			}
		};
		$.post(url , data , callback ,'json');
	}

	var sendSmsSubmit = function(){
		if($('#captcha').val() == ''){
			$errorMessage.html('验证码为空').show();
			return;
		}

		var url = '/user/find_pass/validate_sm_captcha';
		var data = {
			captcha  : $('#captcha').val()
		};
		var callback = function(res){
			var url = '/user/findPwd/reset?vc=' + res.validate_code;
			if(res && res.code == 0){
				urlHandle.redirect(url);
			} else {
				$errorMessage.html(res.message).show();
			}
		};
		$.post(url , data , callback ,'json');
	}

	var findPass = function(){                      
		var url = '/aj/user/mobileandemail_validation';
		var param = $bie.find('input:checked');
		var data = {
			login_name : param.val()
		   ,type  :param.data("type")
		};
		var callback = function(res){
			var url = '/user/findPwd/send';
			if(res && res.code == 0){
				if(res.email)
					url += '_email'
				else
					url += '_sms?nicheng=' + res.nickname
				urlHandle.redirect(url);
			} else {
				if(res.code != 0)
				$errorMessage.html(res.message).show();
			}
		};
		$.post(url , data , callback ,'json');
	}

	var findPassSubmit = function(){
		if($.trim($loginName.val()) == '' || $loginName.val() == '邮箱或手机号'){
			$errorMessage.html('请输入手机号或邮箱或昵称').show();
			return;
		}

		if($checkCode.val() == ''){
			$errorMessage.html('请输入验证码').show();
			return;
		}

		var url = '/user/find_pass/trigger_validation';
		var data = {
			login_name : $loginName.val()
		   ,checkcode  : $checkCode.val()
		};
		var callback = function(res){
			var url = '/user/findPwd/send';
			if(res && res.code == 0){
				if(res.email)
					url += '_email?email=' + res.email + '&email_host=' + res.email_host;
				else
					url += '_sms?mobile=' + res.mobile + '&nicheng=' + res.nickname;

				urlHandle.redirect(url);
			} else if(res.code == 6){
				var url = '/user/findPwd/check';
				if(res.userinfo.mobile && res.userinfo.email){
					url += '?mobile=' + res.userinfo.mobile + '&email=' + res.userinfo.email + '&nicheng=' + res.nicheng;
				}
				else if(res.userinfo.mobile){
					url += '?mobile=' + res.userinfo.mobile + '&nicheng=' + res.nicheng;
				}else if(res.userinfo.email){
					url += '?email=' + res.userinfo.email + '&nicheng=' + res.nicheng;

				}				
				urlHandle.redirect(url);

			} else if(res.code == 10){
				$errorMessage.html(res.message).show();

			}else {
				if(res.code == 7) changeCode();
				$errorMessage.html(res.message).show();
			}
		};

		$.post(url , data , callback ,'json');
	}

	var changeCode = function(){
		checkcode(function(){
			$('.checkImage').parent().show();
			$('.checkImage').unbind('click');
			var t = setTimeout(function(){
				$('.checkImage').bind('click',function(){
					changeCode();
					$checkCode.val('').focus();
				});
			}, 600);
		});
	};

	var checkPwd = function(val){
		var $pwSafe = $('.pw_safe');
		if(!val) return;
		var l = val.length
		   ,s = 0
		
		/* 显示隐藏密码强度 */
		if(l < 6) { /*小于六位不显示密码强度*/
			$pwSafe.css('visibility','hidden');
			return;
		} else {
			$pwSafe.css('visibility','visible');
		}
		
		/* 计算密码强度 */
		if(l > 8) s += 2; else s += 1; /*位数*/
		if(val.match(/[a-z]/)) s += 1; /*小写字母*/
		if(val.match(/[A-Z]/)) s += 1; /*大写字母*/
		if(val.match(/[0-9]/)) s += 1; /*数字*/
		if(val.match(/[!,@#$%^&*?_~]/)) s +=1; /*特殊字符*/
		
		if(s >= 2 && s < 4){
			$('.strength_l').addClass('pw_strength_color');
			$('.strength_m').removeClass('pw_strength_color');
		}
		else if(s >= 4 && s < 6){
			$('.strength_m').addClass('pw_strength_color');
			$('.strength_h').removeClass('pw_strength_color');
		}
		else if(s == 6){
			$('.strength_h').addClass('pw_strength_color');
		}

	}

	var timeDown = function(times, cbk){
		window.setTimeout(function(){
			if(!times){
				return;
			}
			else {
				times--;
				cbk(times);
				timeDown(times, cbk);
			}
		},1000);
	}

	exports.init = init;
	exports.sendSms = sendSms;
	exports.resetPwd = resetPwd;
})