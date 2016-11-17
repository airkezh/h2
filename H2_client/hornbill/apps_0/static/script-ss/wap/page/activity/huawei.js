/*common*/	
require('wap/zepto/fastclick')
require('wap/app/dialog');

var shareTmp = require('wap/component/shareTmp');

var getCoupon = $('.getCoupon');

/*登陆成功后的回掉函数*/
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var params = location.search.substr(1).split('&')
	, device_id = ''

for(i = 0; i < params.length; i++) {
	var param = params[i]
		, index = param.indexOf('=')
		, key = param.substr(0, index)
		, val = param.substr(index + 1)

	if(key == 'device_id')
		device_id = val
}

var gainCoupon = function () {
	if(fml.vars.userId == 0) {
		window.location.href = "meilishuo://login.meilishuo/";
	    return;
	} else {
		coupon()
	}
}

var couponResule = function (ele){
	var tpl = shareTmp(ele);
    $.fn.dialog({dialogContent : tpl , dialogTitle : '', dialogWidth: '4.76rem'});
	$('.resulePic').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
}

var coupon = function () {
	var data = {
		'user_id': fml.vars.userId
		, 'device_id' : device_id
	}

	$.get('/activity/huawei/coupon/coupon', data, function(res){
		if(res.code == 0) {
			couponResule('couponSuccess')
		} else if(res.code == -6) {
			couponResule('havedCoupon')
		} else if(res.code == 10) {
			couponResule('couponPast')
		} else {
			couponResule('couponFail')
		}
	},'json');
}

getCoupon.on('click', function(){
	gainCoupon()
})
