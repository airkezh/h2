/*common*/
var $ = require('wap/zepto')
var Alert       = require('wap/ui/alert')
var $coupon     = $('.coupon-wrap');
var $currCoupon = null
var couponFlag  = true;

/* 优惠券事件 */
$coupon.on('click','.get', function (){
	// 防止多次点击
	if(!couponFlag) return
	couponFlag = false;

	$currCoupon = $(this)
	var url = '/aj/wx/shop/shop_coupon'
	var data = {
		applyCode : $currCoupon.attr('data-id')
	}
	$.get(url, data, couponAjaxCbk, 'json')
})

/* 优惠劵的回调函数 */
function couponAjaxCbk(data){
	if(data.ret === 0){
		$currCoupon.removeClass('get').addClass('got')
		$currCoupon.find('.status').html('已领取')
		myAlert('<h3>领取成功</h3><br><p>可在个人中心“我的优惠券”页面查看</p>')
	}else{
		myAlert(data.msg)
	}
	couponFlag = true;
}

function myAlert(ct, cbk){
	return new Alert({ 
		content: ct,
		onSure : cbk
	})
}