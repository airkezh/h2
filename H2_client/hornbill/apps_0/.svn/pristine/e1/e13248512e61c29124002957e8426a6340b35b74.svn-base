/*common*/	
require('wap/zepto/fastclick')
require('wap/app/dialog');

var shareTmp = require('wap/component/shareTmp');

var getCoupon = $('.yybBtn')
	, dialogTip = $('.tip')
	
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

var dialogInfo = function (ele){
	var tpl = shareTmp(ele);
    $.fn.dialog({dialogContent : tpl , dialogTitle : '', dialogWidth: '4.76rem'});
	$('.dialog_main').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
}

var coupon = function () {
	
	var data = {
			'user_id': fml.vars.userId
			, 'device_id' : device_id
		}

	$.get('/activity/huawei/coupon/yingyongbao', data, function(res){
		if(res.code == 0) {
			dialogInfo('couponStation') 
		} else if(res.code == -6) {
			dialogInfo('couponStation')
			$('.title').html('领取失败!')
			$('.tips').html('您的设备已下载注册过美丽说')
		} else if(res.code == -7){
			dialogInfo('couponStation')
			$('.title').html('领取失败!')
			$('.tips').html('抱歉，优惠券已被抢光，将在3个工作日内补发到您的账户。')
		} else if(res.code == -8) {
			dialogInfo('couponStation')
			$('.title').html('已经领过了~')
		} else {
			dialogInfo('couponStation')
			$('.title').html('领取失败!')
			$('.tips').html('请重试~')
		}
	},'json');
}

getCoupon.on('click', function(){
	gainCoupon()
})

dialogTip.on('click', function() {
	dialogInfo('dialogTip')
})
