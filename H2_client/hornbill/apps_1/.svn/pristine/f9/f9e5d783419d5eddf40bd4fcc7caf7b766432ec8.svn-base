/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var api = require('component/callApi'),
	shareTmp = require('wap/component/shareTmp');

var btnCoupons = $('.btnCoupons');

/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};

/*优惠券领取部分*/
btnCoupons.on('click', function() {
	if (fml.vars.isLogin == 0) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	var self = $(this);
	var tpl = "";
	var coupon_apply_code = $(this).data('code');
	$.get('/aj/zulily/coupon', {
		'coupon_apply_code': coupon_apply_code
	}, function(res) {
		if (res.error_code == 0) {
			var date = res.data.coupon_valid_time_range;

			function getDate(isStart) {
				var str = isStart ? date.start_time : date.expire_time;
				var dateStr = str.replace(/\d*-/, '');
				var formatDate = dateStr.substring(0, dateStr.lastIndexOf(':'));
				return formatDate;
			}
			var time = '有效期：' + getDate(true) + ' - ' + getDate(false);
			// var time = self.find('.date').text();
			self.find('span').removeClass('yes').addClass('no').html('已经领取');
			self.removeClass('btnCoupons').off('click');
			tpl = shareTmp('coupon_alert', {
				'isSuccess': true,
				'use_time': time,
				'text': self.find('.title').text() + "<br>在desire卖场全场通用哦！"
			});
		} else {
			var tpl = shareTmp('coupon_alert', {
				'isSuccess': false,
				'text': res.message
			});
		}
		$('body').append(tpl);
		show_mask();
	}, 'json');
});
var close_alert = function() {
	$('.mask').remove();
}
var show_mask = function() {
	$('.close_btn').off('click', close_alert).on('click', close_alert);
	$('.mask').on('touchmove', function(e) {
		e.preventDefault();
		return false;
	});
};