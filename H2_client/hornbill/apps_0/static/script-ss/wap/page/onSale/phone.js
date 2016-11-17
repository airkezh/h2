/*common*/
var shareJs = require('wap/page/onSale/shareJs');
//
var phoneInput = $('#phoneInput'),
	codeInput = $('#codeInput'),
	popup = $('#popup'),
	btn = $('#btn'),
	getCode = $('#getCode'),
	countdown = $('#countdown');

//定时消失popup
function hidePopup() {
	setTimeout(function() {
		popup.hide();
	}, 2000);
};
//验证手机号码
function vatPhoneFun() {
	var isPhone = /^1[3|4|5|7|8][0-9]\d{8}$/.test(phoneInput.val());
	if (phoneInput.val() == '') {
		popup.html('手机号码不能为空！').show();
		hidePopup();
		return false;
	}
	if (!isPhone) {
		popup.html('手机号码不正确！').show();
		hidePopup();
		return false;
	}
	return true;
};
//验证验证码
function vatCodeFun() {
	if (codeInput.val() == '') {
		popup.html('验证码不能为空！').show();
		hidePopup();
		return false;
	}
	return true;
}
phoneInput.on('blur', function() {
	vatPhoneFun();
});
codeInput.on('blur', function() {
	vatCodeFun();
});
//更改手机号时,避免之前显示倒计时而无法重新点击获取验证码
phoneInput.on('input', function() {
	clearInterval(tt);
	getCode.show();
	countdown.hide().html('59s重新获取');
});
// 获取验证码
var tt = null;
getCode.on('click', function() {
	if (vatPhoneFun()) {
		$.get('/aj/onSale/getCode', {
			'mobile': phoneInput.val()
		}, function(res) {
			if (res.code == 0) {
				getCode.hide();
				countdown.show();
				var sec = 59;
				tt = setInterval(function() {
					sec--;
					countdown.html(sec + 's重新获取');
					if (sec == 0) {
						getCode.show();
						countdown.hide().html('59s重新获取');
						clearInterval(tt);
					}
				}, 1000)
			} else {
				popup.html(res.message).show();
				hidePopup();
			}
		}, 'json');
	}
});
// 领取
btn.on('click', function() {
	if (vatCodeFun()) {
		$.get('/aj/onSale/getCoupon', {
			'mobile': phoneInput.val(),
			'captcha': codeInput.val()
		}, function(res) {
			switch (res.code) {
				case 1:
					window.location = 'http://m.meilishuo.com/onSale/app?from_id=' + fml.vars.from_id;
					break;
				case 3:
					window.location = 'http://m.meilishuo.com/onSale/nums?remain=0&from_id=' + fml.vars.from_id;
					break;
				case 4:
					window.location = 'http://m.meilishuo.com/onSale/late?status=0&from_id=' + fml.vars.from_id;
					break;
				case -9:
				case -10:
					window.location = 'http://m.meilishuo.com/onSale/late?status=1&from_id=' + fml.vars.from_id;
					break;
				default:
					popup.html(res.message).show();
					hidePopup();
			}
		}, 'json');
	}
})

//分享
shareJs.shareWx();
//规则
shareJs.rules();