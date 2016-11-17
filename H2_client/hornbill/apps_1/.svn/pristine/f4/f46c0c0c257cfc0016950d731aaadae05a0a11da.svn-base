/*common*/
require('wap/zepto/fastclick');
var Alert = require("wap/ui/alert");
var a = function(msg) {
	return new Alert({
		content: msg
	});
};

/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};
/*优惠券领取部分*/
$('.btn').on('click', function() {
	if (!fml.vars.isLogin) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	$.get('/aj/getCoupons/coupon', {}, function(res) {
		// if (res.code == 0) {
		// 	window.location.href = "meilishuo://coupons.meilishuo/";
		// } else {
		// 	a(res.message);
		// }
		window.location.href = "meilishuo://coupons.meilishuo/";
	}, 'json');
});