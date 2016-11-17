/*common*/
require('wap/zepto/fastclick')
require('wap/zepto')

var Alert        = require('wap/ui/alert')
var Dialog       = require('wap/ui/dialog')
var ShareTmp     = require('component/shareTmp')
var TimeDown     = require('wap/app/doota/timedown')

var $ruleP       = $('.rule_panel')
var _Dialog      = null
var clicked      = false
var seconds      = getRemainSeconds(fml.vars.ms, 10*3600)
var getCouponUrl = '/aj/sq/activity_get_coupon'
var HTML         = '<div class="get"><i class="get-text">立即<br>领取</i><span class="get-icon"></span></div>'

function couponAlert(msg){
	return new Alert({ content: msg })
}

function couponDialog(html){
	var _tpl = ShareTmp('get_coupon', { 
		tpl : html 
	})

	return new Dialog({content: _tpl})
}

function bindClick(){
	$('.get').on('click', function (){
		if(!clicked){
			clicked = true
			$.get(getCouponUrl, function(data){

				if(data.ret == 0){
					var htmlContent = '<h2 style="margin-bottom:.2rem;">抢到啦！</h2><p style="line-height: .4rem;">代金卷已经躺在个人账户里了，这个七夕会很幸福呦</p>'
					_Dialog         = couponDialog(htmlContent)

					// 优惠券提示框
					$('.closeBtn').on('click', function(){
						$(this).off('click')
						_Dialog.destory()
						location.reload()
					})
				}else{
					 couponAlert(data.msg)
				}

				clicked = false
			}, 'json')
		}
	})	
}

function getRemainSeconds(time, timeout){
	var D             = new Date(time)
	var h             = D.getHours() + 1
	var m             = D.getMinutes() + 1
	var s             = D.getSeconds() + 1
	var remainSeconds = timeout - h * 3600 - m * 60 - s 
	return remainSeconds
}

/** main */
// 10点开抢
if(seconds > 0){
	TimeDown.down('.clr', seconds).onTimeOver(function (){
		$('.content-right').empty().html(HTML)
		$('.coupon_info').removeClass('bg_common').addClass('bg_red')
		bindClick()
	})
}else{
	bindClick()
}

// 活动规则的展示控制
$('.rule').on('click', function(){
	$ruleP.show()
})

$('#hide_btn').on('click', function(){
	$ruleP.hide()
})