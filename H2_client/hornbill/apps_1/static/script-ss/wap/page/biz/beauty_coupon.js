/*common*/
/**
 * @fileoverview 优惠券模块
 * @author yunqian@meilishuo.com
 * @date 2014-11-28
 */

require('wap/zepto')
require('wap/zepto/fastclick')

var alertFn = require("wap/ui/alert")
$('#dialog').text($('#dialog').html().replace('确认', '知道了'))
var alertMsgFn = function(msg, callback) {
	return new alertFn({
		content: msg,
		onSure: function() {
			callback && callback();
		}
	});
}

/* 显示优惠券 */
$('.coupon_bannar').on('click', function(){
	$('body').on('touchmove', stopMove)
	$('.fix_coupon').off('touchmove').css('visibility', 'visible').removeClass('slide_bottom_out').addClass('slide_bottom_in')
})
$('.fix_coupon .close, .black_mask').on('click', function(){
	$('.fix_coupon').removeClass('slide_bottom_in').addClass('slide_bottom_out')
	setTimeout(function(){
		$('body').off('touchmove', stopMove)
		$('.fix_coupon').css('visibility', 'hidden')
	}, 500)
})
var stopMove = function(e){
	e.preventDefault();
	return false
}

/* 领取优惠券 */
var callApi = require('wap/component/callApi')
var get_btnFn = function(){
	if(!get_init()) return false
	var $this = $(this)
	callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:$this.data('code')}, function(res){
		//【领取】返回之后给出弹窗
		if(!res.code){
			var succMsg = '<p class="title">申领成功</p>'
			var time_range = res.data.coupon_valid_time_range
			var start = time_range.start_time.slice(5, 10).replace('-', '.')
			var expire = time_range.expire_time.slice(5, 10).replace('-', '.')
			succMsg += '有效期：'+ start + '-' + expire +'，在“我”的页面“优惠券”中查看'
			$this.html('已领取').addClass('has_get').removeClass('can_get').off('click')
			alertMsgFn(succMsg)
		} else {
			alertMsgFn(res.message)
		}
		//恢复click事件
		$('.can_get').on('click', get_btnFn)
	})
	$('.can_get').off('click', get_btnFn)
}
var get_all_btnFn = function(){
	if(!get_init()) return false
	var coupon_apply_codes = []
	var data = {}
	$('.can_get').each(function(index){
		data['coupon_apply_codes['+index+']'] = $(this).data('code')
		coupon_apply_codes.push($(this).data('code'))
	})
	callApi.write({'url':'/coupon/coupon_batch_thoroughly_apply'}, data, function(res){
		var coupon_succ_num = 0
		coupon_apply_codes.map(function(code){
			if(res.data && res.data[code].code == 0){
				coupon_succ_num += 1
				$('.can_get[data-code = "'+code+'"]').html('已领取').addClass('has_get').removeClass('can_get').off('click')
			}
		})
		var succMsg = '<p class="title">'+ coupon_succ_num +'张优惠券申领成功</p>'
		succMsg += '有效期在“我”的页面“优惠券”中查看'
		alertMsgFn(succMsg)
		//恢复click事件
		$('.get_all_btn').on('click', get_all_btnFn)
	})
	$('.get_all_btn').off('click', get_all_btnFn)
}

/* 根据是否登录，是否在客户端来判断领取优惠券 */
var get_init = function (){
	/*登录*/
	// alert(Meilishuo.config.user_id)
	if(fml.vars.isLogin == 0){
		window.MLS = {
			didLogin : function() {
				// 成功登录，跳转到下一步
				window.location.reload()
			}
		};
		window.location.href = 'meilishuo://login.meilishuo/'
		return false
	}
	return true
}

$('.can_get').on('click', get_btnFn)
$('.get_all_btn').on('click', get_all_btnFn)
