fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/sq/coupon_list',
		'processData': function(res) {
			return {
				'item': res.coupons,
				'totalNum': res.totalNum
			}
		},
		'box': '.coupon_wrap',
		'tmpId': 'posterCoupon',
		'status' : fml.vars.couponStatus,
		'page': 0,
		'firstView' : 1,
		'cbk' : function(data){ 
			if(data.coupons.length == 0) 
				$('.more').hide();
		}
	});	
})

fml.define('wap/page/sq/coupon' , [] , function(require){});