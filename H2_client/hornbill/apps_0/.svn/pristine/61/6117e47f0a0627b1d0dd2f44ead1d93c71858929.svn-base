/*common*/
var $ = require('jquery');
var shareTmp = require('component/shareTmp');
var $btn = $('.freezeWrap .btn')
	,$changePwd = $('.changePwd')
	,$newPwd = $('.newPwd')
	,$pw_safe = $('.pw_safe')
	,$strength_l = $('.strength_l')
	,$strength_m = $('strength_m')
	,$strength_h = $('.strength_h')
	,$freezeWrap = $('.freezeWrap')
	,$chooseWays = $('.chooseWays')
	,$third = $('.third')
	,$four = $('.four')
	,$sucessWrap = $('.sucessWrap')
	,$new_password = $('#new_password')
	,$confirm_password = $('#confirm_password')
	,$vertification = $('.vertification')
	,$passWordWrap = $('.passWordWrap')
	,$timeBox = $('.time_box')
	,$error = $('.error')
	,$selfFreeze = $('.selfFreeze')
var validate_code;
var tag =1;
var data = {
	login_name : fml.vars.nickname
   ,type  :'moblie'
};
function timeDown(times, cbk){
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
function reSendSms(){
	var url = '/aj/user/mobileandemail_validation';
	var data = {
		login_name : fml.vars.nickname
	   ,type  :'moblie'
	};
	var callback = function(res){
		if(res && res.code == 0){
			cbk();
		} else {
			$error.html(res.message).show();
		}
	};
	$.post(url , data , callback ,'json');
}
function cbk(){
	$timeBox.unbind('click').html('<b>59</b>秒后可重新发送');
	var $time = $timeBox.find('b');
	timeDown($time.text() ,function(times){
   		if(!times){
   			$timeBox.html('<span class="restart">重新发送</span>').bind('click', function(e) {
   				reSendSms(cbk);
   			});
   			tag = 1;
   			$btn.css('background-color', '#FF6A9B');
		}
		else {
			$time.text(times);
		}
	});
}
function requestValidation(){
	$.post('/aj/user/mobileandemail_validation',data,function(res){
		if(res.code==0){
			cbk();
		}
	},'json')
}
if(tag == 1){
	$btn.on( 'click' , function(){
		requestValidation();
		tag = 0;
		$btn.css('background-color', '#F2F0F0');
	});
}

$selfFreeze.on('click','.restart',function(){
	requestValidation();
	tag = 0;
	$btn.css('background-color', '#F2F0F0');
})
$chooseWays.on( 'click' , function(){
	var url = '/aj/freeze_aj/index/captcha'
	var data = {
		'captcha' : $vertification.val().trim()
	}
	$.post(url,data,function(res){
		if(res.code==0){
			validate_code = res.validate_code;
			$freezeWrap.hide();
			$passWordWrap.append(shareTmp('changePwd',{}));
			$third.addClass('current');
		}else{
			$error.html(res.message);
		}
	},'json')
})
$passWordWrap.on('click','.change' , function(){
	var newPwd = $('#new_password').val().trim()
		,confirmPwd = $('#confirm_password').val().trim()
	var data = {
		'new_password' : newPwd
		,'confirm_password' : confirmPwd
		,'validate_code' : validate_code
		,'unfreeze' : 1
	},
	url = "/aj/freeze_aj/index/userReset";
	if(newPwd == confirmPwd && newPwd.length != 0 && confirmPwd.length !=0 ){
		$.post( url , data , function(res){
			if(res.code==0){
				$('.sucWrap').append(shareTmp('sucessWrap',{}));
				$passWordWrap.empty();
				$four.addClass('current');
			}
		},'json')
	}else{
		$('.warn').html('请正确输入密码')
	}
})
//下面的正则表达式建议各位收藏哦，项目上有可能会用得着
function checkPwd(val) {
	if (!val) return;
	var l = val.length,
		s = 0;
	/* 显示隐藏密码强度 */
	if (l < 6 || l > 32) {
		$pw_safe.hide();
		return;
	}
	$pw_safe.show();
	/* 计算密码强度 */
	if (l > 8) s += 2;
	else s += 1; /*位数*/
	if (val.match(/[a-z]/)) s += 1; /*小写字母*/
	if (val.match(/[A-Z]/)) s += 1; /*大写字母*/
	if (val.match(/[0-9]/)) s += 1; /*数字*/
	if (val.match(/[!,@#$%^&*?_~]/)) s += 1; /*特殊字符*/
	if (s >= 2 && s < 4) {
		$('.strength_l').addClass('pw_strength_color');
		$('.strength_m').removeClass('pw_strength_color');
	} else if (s >= 4 && s < 6) {
		$('.strength_m').addClass('pw_strength_color');
		$('.strength_h').removeClass('pw_strength_color');
	} else if (s == 6) {
		$('.strength_h').addClass('pw_strength_color');
	}
}
$newPwd.on('input propertychange', function() {
	checkPwd($(this).val());
})

