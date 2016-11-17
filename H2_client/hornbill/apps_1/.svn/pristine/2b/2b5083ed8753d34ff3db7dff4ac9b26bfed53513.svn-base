/*common*/
var $ = require('jquery');
$('.friend-btn').click(function(event) {
	$.get('/aj/sq/get_coupon', {'coupon_id' : fml.vars.coupon_id} ,function(data) {
		data = JSON.parse(data);
		if (data && data.ret == 0) {
			var _wrap = $('.wrap');
			_wrap.find('.friend-title').html('<p>恭喜您成功领取“10元优惠券”</p>');
			_wrap.find('.friend-link').show();
			_wrap.find('.friend-btn').hide();
			_wrap.find('.friend-link').show();
		}else{
			alert(data.msg);
		}
	});
});