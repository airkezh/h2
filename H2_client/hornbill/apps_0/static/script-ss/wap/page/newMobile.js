/*common*/
var $ = require('jquery');
	$codeButton = $('.s_button'),
	$mobile = $('#mobile'),
	$nextStep = $('.next_step'),
	$code = $('#code'),
	$message = $(".ErrorMessage"),
	reback_timer = false;

// 发送验证码
$codeButton.on( 'click ', function(){
	var time = 60,
		_this = this,
		url = '/aj/sendcode/sCode2',
 		data = {
			'mobile': $.trim($mobile.val()),
			'smsType':'change_bind_mobile_captcha'
		}
	$message.html('').hide();
	var start = function() {
		timeDown(time, function(times) {
			if (!times) {
				reback_timer = false;
				$(_this).removeAttr("disabled");
				$(_this).val("发送验证码");
				$(_this).css({'background-color' : '#f97a9b'});
			} else {
				$(_this).attr("disabled", "disabled");
				$(_this).val("重新发送 (" + times + "秒)");
				$(_this).css({'background-color' : '#ff94b7'});
			}
		});
	}

	start();
 	var callback = function(r) {
		if( r.code == 0 ){
			$message.html('').hide();
		}else{
			reback_timer = true;
			$message.html(r.message).show();
		}
	}

	$.get(url, data, callback, 'json');
})

$nextStep.on( 'click', function(){
	var $button = $(this),
		url = '/aj/sendcode/changeBind',
		data = {
			'mobile': $.trim($mobile.val()),
			'captcha': $.trim($code.val()),
			'pre_captcha':'',
			'smsType': 'change_bind_mobile_captcha',
			'validate_only': 1
		},
		mobileRe = /^\d{11}$/,
		codeRe = /^[0-9]{6}$/
		$message.html('').hide();
		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}

		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}

		if (data.captcha == '') {
			$message.html("验证码为空").show();
			return;
		}
		
		if (!codeRe.test(data.captcha)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

	$message.html('');
	$button.val("正在跳转…");
	$button.attr("disabled", "disabled");
	var callback = function(r) {
		if(r.code==0){
			$message.html('').hide();
			window.location.href = '/user/apply/?change_mobile='+ $mobile.val();
		}else{
			updateStatus(r);	
		}
	}

	$.post(url, data, callback, 'json');

	var updateStatus = function(r) {
		setTimeout(function() {
			$button.removeAttr("disabled");
			$button.val("下一步");
			$message.html(r.message).show();
		}, 2000);
	}
});

var timeDown = function(times, cbk) {
	if (!times) {
		return;
	} else if(reback_timer){
		cbk(0);
		reback_timer = false;
	}else {
		times--;
		cbk(times);
		win_timer = setTimeout(function(){
			timeDown(times, cbk);
		},1000)
	}
};