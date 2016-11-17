/*common*/

require('wap/app/dialog');

var active 	   = false,
	str        = 'active',
	$codeInput = $('.code'),
	$submitBtn = $('#submit'),
	$s1		   = $('.step1'),
	$s2		   = $('.step2'),
	url 	   = '/aj/activity/xm_coupon';

$codeInput.on('input', function (){

	/* 这里再做一次判断是避免安卓客户端跳转登录页失败 bug */

	if(Meilishuo.config.user_id === 0){
		window.location.href = 'meilishuo://login.meilishuo/';
	}
	var v = $(this).val(),
		c = $submitBtn.hasClass(str);
	if(v.length > 0){
		active = true;
		c || $submitBtn.addClass(str);
	}else{
		active = false;
		c && $submitBtn.removeClass(str);
	}
}).on('focus',function (){
	var self = $(this)
	var c = 'placeholder'
	if(self.hasClass(c)){
		self.removeClass(c)
		self.val('')
	}
}).on('blur', function (){
	var self = $(this)
	if(!self.val()){
		self.addClass('placeholder')
		self.val('输入兑换码')
	}
});

$submitBtn.on('click', function (){
	if(!active)return;
	var data = { 'code' : $codeInput.val() };
	$.get(url, data, submitCbk, 'json');
});

/* android app 会跳转失败（可做延迟跳转） */

myCheckLogin();

function submitCbk(res){
	if(res.ret === 0){
		var $threshold = $('.threshold'),
			$price     = $('.price'),
			$declare   = $s2.find('.declare'),
			$time      = $s2.find('.time'),
			data       = res.couponinfo;

		$threshold.text(data.coupon);
		$price.text(data.price);
		$declare.text(data.text);
		$time.text(data.time);

		// 通知客户端更新优惠券页面
		location.href = 'meilishuo://notification.meilishuo/?json_params=' + handleParams({name:'didGetCoupon'});
		
		$s1.hide();
		$s2.show();
	}else{
		alert(res.message);
	}
}

function alert(ct){
	var opts = {
		'dialogContent' : ct,
		'onLoad' : onLoadCbk,
		'onClose' : onCloseCbk
	};
	$.fn.dialog(opts);
	$(dialogContent).after($('.closeDialog'));
	$('.closeDialog').html('确 定');
}

function onCloseCbk(){
	$('html').css('overflow','auto');
	( $codeInput.val('') )[0].focus();
	active = false;
}

function onLoadCbk(){
	$('html').css('overflow','hidden');
	$(maskLayer).height('300%');
}

function myCheckLogin(){
	if(!window.MLS){
		window.MLS = {};
	}
	window.MLS.didLogin = function(){
		window.location.reload();
	};
	if(Meilishuo.config.user_id === 0){
		window.location.href = 'meilishuo://login.meilishuo/';
	}
}
function handleParams(param){
	return encodeURIComponent(JSON.stringify(param));
}