/*common*/

/**
 * @fileoverview 优惠券模块
 * @author yunqian@meilishuo.com
 * @date 2015-09-08
 */

require('wap/zepto')

var alertFn = require("wap/ui/alert")
	, checkLogin = require('wap/app/checkLogin')
	, noticeUi = require("wap/ui/notice")
	, callApi = require('wap/component/callApi')

$('#dialog').text($('#dialog').html().replace('确认', '知道了'))
var alertMsgFn = function(msg, callback) {
	return new alertFn({
		content: msg,
		onSure: function() {
			callback && callback()
		}
	});
}

function notice(msg, noticeClass, duration) {
	return new noticeUi({
		content : msg,
		dialogClass : noticeClass,
		duration : duration
	})
}

/* 显示优惠券 */
$('.coupon_bannar').on('click', function(){
	$('.black_mask, .fix_coupon_wrap .title, .fix_coupon_wrap .get_all').on('touchmove', stopMove)
	$('.fix_coupon').off('touchmove').css('visibility', 'visible').removeClass('slide_bottom_out').addClass('slide_bottom_in')
})
$('.fix_coupon .close, .black_mask').on('click', function(){
	$('.fix_coupon').removeClass('slide_bottom_in').addClass('slide_bottom_out')
	$('.black_mask, .fix_coupon_wrap .title, .fix_coupon_wrap .get_all').off('touchmove', stopMove)
	setTimeout(function(){
		$('.fix_coupon').css('visibility', 'hidden')
	}, 500)
})
var stopMove = function(e){
	e.preventDefault();
	return false
}

var get_btnFn = function(){
	if(!get_init()) return false
	var $this = $(this)
	callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:$this.attr('data-code')}, function(res){
		//【领取】返回之后给出弹窗
		if(!res.code){
			var succMsg = '<p class="title">申领成功</p>'
			var time_range = res.data.coupon_valid_time_range
			var start = time_range.start_time.slice(5, 10).replace('-', '.')
			var expire = time_range.expire_time.slice(5, 10).replace('-', '.')
			succMsg += '有效期：'+ start + '-' + expire +'，在“我的优惠券”的页面中查看'
			$this.html('已领取').addClass('has_get').removeClass('can_get').off('click')
			alertMsgFn(succMsg)
		} else {
			notice('优惠券领取失败')
		}
		//恢复click事件
		$('.can_get').on('click', get_btnFn)
	})
	$('.can_get').off('click', get_btnFn)
}

/* 根据是否登录，是否在客户端来判断领取优惠券 */
var get_init = function (){
	if (!checkLogin()) return
	return true
}

$('.can_get').on('click', get_btnFn)
$('.coupons').on('click', '.has_get', function(){
	notice('您已经领取过')
})
$('.coupons').on('click', '.has_over', function(){
	notice('优惠券已抢光')
})



