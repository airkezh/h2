fml.define('page/doota/shop_coupon',['jquery','ui/alert','app/checkLogin', 'component/windowScroll', 'component/callApi'],function(require){
	var $ = require('jquery');
	var Alert = require('ui/alert');
	var checkLogin = require('app/checkLogin');
	var scroll = require('component/windowScroll');
	var callApi = require('component/callApi');

	var alert = function(msg){
		return new Alert({
			content:msg,
			width: 430
		});
	}
	var msie = $.browser.msie
		, nags = $('#navbar')
		, nagMt = nags.offset()
	if (msie && $.browser.version == '6.0') {
		$('#shop_coupon_couplet').css({
			position:'absolute'
		});
		var resetCouponPos = function(){
			$('#shop_coupon_couplet').css({
				top : nagMt.top + 130 + 'px'
			});
		};
		// $(window).scroll(resetCouponPos);
		resetCouponPos();
	} 
	$('.get_shop_coupon').click(function(){
		if(!checkLogin({'param':{'btn':'shop_coupon'}})) return false;
		var id = this.id.split('_')[1];
		callApi.write({'url': '/coupon/coupon_apply'}, {coupon_apply_code: id}, function(data){
			if (data.code) {
				alert(data.message);
			}else{
				var startD = data.data.coupon_valid_time_range.start_time.substring(0, 10).replace(/\-/g,'.');
				var endD = data.data.coupon_valid_time_range.expire_time.substring(0, 10).replace(/\-/g,'.');
				alert('<div class="suc_tip"><div class="content"><span class="suc_icon"></span>领取成功</div>'+
				'<p class="period">有效期：<span>' + startD + '-' + endD  +'</span></p>'+
				'<p>在个人中心“我的优惠券”页面中查看</p></div>');
			}
		});
	});
})
