fml.define('page/doota/shop_coupon',['jquery','ui/alert','app/checkLogin', 'component/windowScroll', 'component/callApi'],function(require){
	var $ = require('jquery');
	var Alert = require('ui/alert');
	var checkLogin = require('app/checkLogin');
	var scroll = require('component/windowScroll');
	var callApi = require('component/callApi');

	var alert = function(msg){
		return new Alert({
			content:msg,
			width:370
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
				alert('领取成功');
			}
		});
	});
})
