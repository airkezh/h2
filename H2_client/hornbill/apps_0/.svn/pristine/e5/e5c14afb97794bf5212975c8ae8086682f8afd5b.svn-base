fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/wx/coupon_list',
		'processData': function(res) {
			return {
				'item': res.coupons,
				'totalNum': res.totalNum
			}
		},
		'box': '.coupon_wrap',
		'tmpId': 'posterCoupon',
		'status' : fml.vars.status,
		'page': 0,
		'firstView' : 1,
		'cbk' : function(data){ 
			if(data.coupons.length == 0) 
				$('.more').hide();
		}
	});	
})

fml.define('wap/page/wx/coupon' , ['wap/app/openApp'] , function(require, exports){
	var openApp = require('wap/app/openApp');

	var locationHref = window.location.href
	if(locationHref.indexOf('wxgame') != -1){
		openApp('meilishuo://coupons.meilishuo')
	}
});