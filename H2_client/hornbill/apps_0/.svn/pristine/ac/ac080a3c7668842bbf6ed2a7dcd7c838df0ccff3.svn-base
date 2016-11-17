fml.use(['wap/zepto','app/checkcode','wap/ui/alert'], function(){

	var uiAlert = this.alert;
	var checkcode = this.checkcode;

	function initCode(){
		checkcode();
		var isDelay;
		$('.checkImage').click(function(){
			if(isDelay) return;
			checkcode();
			isDelay = 1;
			setTimeout(function(){
				isDelay = 0;
			},500);
		});
	}

	function valid(){
		var valPhone;
		var $bindPhone = $('#bind_phone');
		if($bindPhone.length){
			valPhone = $.trim($bindPhone.val());
		}else{
			valPhone = $('.phone').attr('data-phone');
		}

		if(!valPhone){
			validCb(0,'请输入手机号');
			return;
		}

		var codeVal = $.trim($('#seccode').val());
		if(!codeVal){
			validCb(0,'请输入验证码');
			return;
		}

		if(codeVal.length != 4){
			validCb(0,'验证码输入有误，请重新输入');
			return;
		}

		validCb(1);

		var data = {
			rule : 'captcha',
			data : codeVal
		};
		$.post('/user/reg/validate' , data , function(res){
			if(res == 6){ 
				$('.checkImage').click();
				validCb(0,'验证码输入有误，请重新输入');
			}else if(res == 0){
				sendSms(valPhone,function(){
					location.href = '/user/active_sms?phone='+valPhone;
				});
			}
		});
	}

	function sendSms(valPhone,cb){
		validCb(1);
		var param = {
			'mobile' : valPhone
		}
		$.post('/aj/sendcode/sms' , param , function(data){
			if(data.code == 0){
				cb && cb();
			}else{
				validCb(0,data.message);
			}
		} ,'json');
	}
	
	function validCb(suc,msg){
		if(suc){
			$('.err-msg').html('');
			if(typeof msg == 'function'){
				msg();
			}
		}else{
			$('.err-msg').html(msg);
		}
	}

	function timeDown(times, cbk){
		setTimeout(function(){
			if(!times){
				return;
			}else {
				times--;
				cbk(times);
				timeDown(times, cbk);
			}
		},1000);
	}

	function closePage(){
		location.href = 'meilishuo://close.meilishuo';
	}

	function activeNow(valPhone){
		var smsVal = $.trim($('.sms-code').val());
		if(!smsVal){
			validCb(0,'短信验证码不能为空');
			return;
		}

		validCb(1);

		var param = {
			'mobile' : valPhone,
			'captcha' : smsVal
		}
		$.post('/aj/sendcode/sms_active' , param , function(data){
			if(data.code == 0){
				new uiAlert({
	                content : '激活成功',
	                onSure : function(){
	                	closePage();
	                }
	            });
			}else{
				validCb(0,data.message);
			}
		} ,'json');
	}


	function reSend(){
		var $resend = $('.resend');
		$resend.removeClass('active');
		var time = 59;
		timeDown(time ,function(times){
	   		if(!times){
	   			$resend.addClass('active')
	   				   .html('发送短信验证码');
			}else {
				$resend.html(times + 's后重新发送');
			}
		});
	}

	function initActive(){

		initCode();

		$('.send-sms').click(function(){
			valid();
			return false;
		});
	}

	function initActiveSms(){

		var valPhone = +(location.search.slice(1).split('=')[1]);

		reSend();

		$('.resend').click(function(){
			if($(this).hasClass('active')){
				reSend()
				sendSms(valPhone);
			}
		});

		$('.active-now').click(function(){
			activeNow(valPhone);
			return false;
		});
	}


	function init(){
		if(fml.vars.active){
			initActive();
		}else{
			initActiveSms();
		}
	}

	init();
});

fml.define('wap/page/active',[] ,function(){});
