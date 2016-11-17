/*common*/
var $ = require('wap/zepto')
	,shareTmp = require('wap/component/shareTmp')
	,dataStore = {};

function bindEvent(){
	$('.coupon_tabs').find('a').on('click', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		getCouponList($(this).data('type'));
	})
}

function getCouponList(coupon_type){
	if(dataStore['type' + coupon_type]){
		$('.coupon_list').html(dataStore['type' + coupon_type]);
	}else{
		$.get('/aj/coupon/home_list?', {status: 'all', coupon_type: coupon_type},
			function(res){

				var data;
				if(res.length == 0){
					data = '<div class="empty">亲，您还未获得优惠券哦~</div>';
				}else{
					data = shareTmp('coupons' , res);
				}
				$('.coupon_list').html(data);
				dataStore['type' + coupon_type] = data;
		} , 'json');
	}

}

function init(){
	bindEvent();
	getCouponList($('.coupon_tabs').find('.active').data('type'));
}
init();
