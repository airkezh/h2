/*common*/
require('jquery') //必须引用jquery，荣威的坑

var urlHandle = require("wap/component/urlHandle");

	var bindMobile = $('.bindMobile'),
	    $send_code = bindMobile.find('#send_code'),
		$send_bind = bindMobile.find('#send_bind'),
		$change_bind = bindMobile.find('#change_bind'),
		$mobile = bindMobile.find('#mobile'),
		$code = bindMobile.find('#code')
		$s_code = bindMobile.find('#s_code'),
		$s_code2 = bindMobile.find('#s_code2'),
		$send_next = bindMobile.find('#send_next'),
		$success = bindMobile.find('#success'), 
		$back = bindMobile.find('.back');

	var reback_timer = false
		, url_hash = location.hash

	$('#changeBtn').on('click', function(){
		window.location.href = '/user/bindMobile/change' + url_hash
	})


	/**
	 * 页面跳转
	 */
	var getUrl = function(param) {
		if(!Meilishuo.config.os.mlsApp){
			return '/user/bindMobile'
		} 
		if(location.hash == '#/setpassword') {
			return Meilishuo.config.zhifu_url + '/security#/setpassword/';
		} else {
			return "meilishuo://close.meilishuo";
		}
	}

	/**
	 * 绑定手机号页初始化
	 * @author zhengke
	 */
	var bindMobile = function() {
		$send_code.on('click', sendCode);  /*  绑定 发送验证码 */
		$send_bind.on('click', sendBind);  /*  绑定 绑定是否成功 */
		
		$s_code.on('click', sCode);   /*  换绑 验证原手机号 发送验证码 */
		$s_code2.on('click',sCode2);  /*  换绑 验证新手机号 发送验证码 */
		$send_next.on('click', sBind); /*  换绑 验证原手机号发送验证码是否正确 */

		$change_bind.on('click',changeBind);  /*  换绑 绑定新手机号是否成功 */

		$back.on('click', function() {
			storage.setCookie('tip_close', new Date().getTime(), {
				'duration': 3 * 86400
			});
		});
	};

	/**
	 * 倒计时
	 * @author zhengke
	 */
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

	/**
	 * 发送绑定
	 * @author liuxueqi
	 */
	
	
	var sBind = function() {
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/sendcode/sBind',
			data = {
				'captcha': $.trim($code.val()),
				'smsType':'change_bind_mobile_captcha',
				'frm': 'bindok'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/

		mark_code = data.captcha;
		if (data.captcha == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!codeRe.test(data.captcha)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("下一步...");
		/*  更换app title  */
		if (!urlHandle.getParams(window.location.search).isFromShare) {
			setTimeout(function(){
				var url = 'meilishuo://set_title.meilishuo?json_params='  + encodeURIComponent('{"title":"更换手机号"}');
	      		location.href = url;
			},1000)
	        
	    }
		$('#changeTips').html('更换后，下次登录可使用新手机号登录');


		var callback = function(r) {
			switch (r.code) {
				case 0:
					$message.html('').hide();
					$(".pro").next().removeClass("no-on").addClass('on');
					$("#protel").html("新手机号");
					$s_code.hide();
					$s_code2.show();

					if($mobile){
						$mobile.removeAttr("disabled");
						$mobile.val("");
						$code.val("");
					}
					$send_next.hide();
					$change_bind.show();
					reback_timer = true;
					break;
				case -1:
					updateStatus(r);
					break;
				default:
					$message.html(r.message).show();
					alert(r.message)
					break;
			}
		}
		$.post(url, data, callback, 'json');
		var updateStatus = function(r) {
			setTimeout(function() {
				$button.val("立即绑定");
				$message.html(r.message).show();
			}, 2000);
		}
	};


	/**
	 * 发送验证码
	 * @author liuxueqi
	 */

	 var sCode2 = function(){
	 	var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sendcode/sCode2',
	 	data = {

				'mobile': $.trim($mobile.val()),
				'smsType':'change_bind_mobile_captcha',
				'frm': 'post_bind'
			}

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
 			if(r.code==0){
				$message.html('').hide();
			}else{
				reback_timer = true;
				$message.html(r.message).show();
			}
		}

		$.get(url, data, callback, 'json');

	 }


	var sCode = function() {
		var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sendcode/sCode',
			mobileVal=$mobile.val(),
			data = {
				'smsType':'change_bind_mobile_captcha',
				'frm': 'post_bind'
			}

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
			if(r.code==0){
					$message.html('').hide();
				}else{
					reback_timer = true;
					$message.html(r.message).show();
				}
		}

		$.get(url, data, callback, 'json');

	};
	

	/*
		******换绑手机号   @liuxueqi
		*
	 */
	var changeBind = function(){
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/sendcode/changeBind',
			data = {
				'mobile': $.trim($mobile.val()),
				'captcha': $.trim($code.val()),
				'pre_captcha':mark_code,
				'smsType': 'change_bind_mobile_captcha'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (data.captcha == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}
		if (!codeRe.test(data.captcha)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("绑定中…");
		$button.attr("disabled", "disabled");
		var callback = function(r) {
				if(r.code==0){
				$message.html('').hide();
					$button.val("更换成功");
					$success.removeClass("no-on").addClass('on');

					var url = getUrl();
					location.href = url;

				}else{
					updateStatus(r);
					
				}

		}
		$.post(url, data, callback, 'json');


		var updateStatus = function(r) {
			setTimeout(function() {
				$button.removeAttr("disabled");
				$button.val("重新绑定");
				$message.html(r.message).show();
			}, 2000);
		}

	}


	/*=======================================*/

	/**
	 * 发送绑定请求
	 * @author zhengke
	 */
	var sendBind = function() {
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/sendcode/sendBind',
			data = {
				'mobile': $.trim($mobile.val()),
				'active_code': $.trim($code.val()),
				'frm': 'bindok'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (data.active_code == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}
		if (!codeRe.test(data.active_code)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("绑定中…");
		$button.attr("disabled", "disabled");

		var callback = function(r) {
			switch (r.code) {
				case 0:
					$message.html('').hide();
					$button.val("绑定成功");

					var url = getUrl();
					location.href = url;
					
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case -1:
					updateStatus(r);
					break;
				default:
					break;
			}
		}
		$.post(url, data, callback, 'json');

		var updateStatus = function(r) {
			setTimeout(function() {
				$button.removeAttr("disabled");
				$button.val("立即绑定");
				$message.html(r.message).show();
			}, 2000);
		}
	};
	/**
	 * 发送验证码
	 * @author zhengke
	 */
	var sendCode = function() {

		var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sendcode/sendCode',
			data = {
				'mobile': $.trim($mobile.val()),
				'frm': 'post_bind'
			},
			mobileRe = /^\d{11}$/

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}

		var start = function() {
			timeDown(time, function(times) {
				if (!times) {
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
			if(r.code==0){
				$message.html('').hide();
			}else{
				reback_timer = true;
				$message.html(r.message).show();
			}
		}

		$.post(url, data, callback, 'json');

	};
	
	exports.bindMobile = bindMobile;





