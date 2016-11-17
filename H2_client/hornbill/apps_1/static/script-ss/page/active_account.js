/*common*/
var $         = require('jquery'),
	checkcode = require('app/checkcode'),
	$err1     = $('.err1'),
	$err2     = $('.err2'),
	$err3     = $('.err3'),
	$phone    = $('.phone'),
	$code     = $('.code'),
	$msCode   = $('.ms_code'),
	$activeBtn= $('#active_now'),
	$status   = $('.status'),
	$s 		  = $('.status1'),
	flag      = true,
	str       = $activeBtn.val().slice(-2),
	bound     = fml.vars.isMobileBind,
	phoneVal,
	msCodeVal;

function isValid(){
	var validResult = true;
	phoneVal  = $.trim( $phone.val() );
	msCodeVal = $.trim( $msCode.val() );
	codeVal   = $.trim( $code.val() );
	if(!bound){
		if(!phoneVal){
			$err1.text('手机号码不能为空！');
			validResult =  false;
		}else if(!/^\d+$/.test(phoneVal)){
			$err1.text('请输入正确的手机号码！');
			validResult =  false;
		}else{
			$err1.text('');
		}	
	}
	if(!msCodeVal){
		$err2.text('请输入短信验证码！');
		validResult =  false;
	}else if( !/^\d{6}$/.test(msCodeVal) ){
		$err2.text('请输入正确的短信验证码！');
		validResult =  false;
	}else{
		$err2.text('');
	}
	if(!codeVal){
		$err3.text('请输入验证码！');
		validResult =  false;
	}else{
		$err3.text('');
	}
	return validResult;
}


function sendSms(){
	activeNow();return;
	if( isValid() ){
		var data = {
			rule : 'captcha',
			data : $.trim( $code.val() )
		};
		$.post('/aj/reg/validate', data, function (res){
			//$err3.text('');
			if(res === 0){
				if(flag){
					flag = false; 
					$activeBtn.val(str+ '中...');
					setTimeout(function (){
						activeNow();
					}, 3000); 

				}
			}else{
				$err3.text('验证码输入有误！');
			}
		}, 'json');
	}
}

function timeDown(times, cbk){
	setTimeout(function (){
		if(!times){
			return;
		}else{
			times--;
			cbk(times);
			timeDown(times, cbk);
		}
	},1000);
}

function sendCode(){
	var mobileNum = '';
	if(!bound){
		mobileNum = $.trim( $phone.val() );
		if( !mobileNum || !/^\d+$/.test(mobileNum) ){
			$err2.text('请输入正确的手机号码！');
			return;
		}		
	}
	$err1.text('');
	var time   = 60,
	    url    = '/aj/reg/reactive_send_sms',
	    $reGet = $('.re_get'),
	    data   = { 'mobile' : mobileNum };

	var callback = function (res){
		if(res.code === 0) {
			$('.err2').text('');
			timeDown(time ,function(times){
		   		if(!times){
		   			$reGet.val('获取短信验证码');
				}else {
					$reGet.val('重新发送 (' + times + '秒)');
				}
			});
		}else{
			if(!bound){  
				removeC($s, 'pass');
				addC($s, 'stop');
			}
			$('.err2').text(res.message);
		}
	};
	$.post(url , data, callback , 'json');
}

function activeNow(){
	var url  = '/aj/reg/reactive',
		data = {
			//mobile : $.trim( $phone.val() ) || '',
			captcha : $.trim( $msCode.val() )
		};
	data.mobile = $phone ? $.trim( $phone.val() ) : '';
	var callback = function (res){
		if(res.code === 0){
			$activeBtn.val(str + '成功');
			setTimeout(function (){
				window.location.href = document.referrer || '/welcome';
			}, 3000);
		}else{
			$activeBtn.val('立即' + str);
			$msCode.val('');
			$code.val('');
			$('.err3').text('呜呜~没有激活成功');
		}
		flag = true;
	};
	$.post(url, data ,callback, 'json');
	
}
function addBlurEvent(){
	$('.phone').on('blur', function (){
		phoneVal = $.trim( $phone.val() );
		if(!phoneVal){
			//remove or do nothing
		}else if( !/^\d+$/.test(phoneVal) ){
			removeC($s, 'pass');
			addC($s, 'stop');
		}else{
			removeC($s, 'stop');
			addC($s, 'pass');
		}
	});
	$('.ms_code').on('blur', function (){
		var $s2 = $('.status2');
		msCodeVal = $.trim( $msCode.val() );
		if(!msCodeVal){
			//remove or do nothing
		}else if( !/^\d{6}$/.test(msCodeVal) ){
			removeC($s2, 'pass');
			addC($s2, 'stop');
		}else{
			removeC($s2, 'stop');
			addC($s2, 'pass');
		}
	});
}

function addC(t,c){
	if(!t.hasClass(c)){ t.addClass(c); }
}

function removeC(t,c){
	if(t.hasClass(c)){ t.removeClass(c); }
}

function init(){
	/** 拉取验证码图片 */
	checkcode();
	/** 重新获取验证码 */
	$('.refresh,.checkImage img').click(function(){
		checkcode();
	});
	/** 激活 */
	$('#active_now').click(function(){
		sendSms();
	});
	/** 获取短信验证码 */
	$('.re_get').click(function(){
		sendCode();
	});
	/** 添加输入框绑定事件 */
	addBlurEvent();
}

init();
