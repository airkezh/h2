fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/sq/interfaces/coupon_list?couponType=' + fml.vars.couponType,
		'processData': function(res) {
			return {
				'item': res.coupons,
				'totalNum': res.totalNum
			}
		},
		'box': '.coupon_wrap',
		'tmpId': 'posterCoupon',
		'page': 0,
		'firstView' : 1,
		'cbk' : function(data){ 
			var cLength = data.coupons.length
			if( cLength == 0 || data.limit > cLength) 
				$('.more').hide();
		}
	});	
})

fml.define('wap/page/sq/coupon' , [] , function(require){});