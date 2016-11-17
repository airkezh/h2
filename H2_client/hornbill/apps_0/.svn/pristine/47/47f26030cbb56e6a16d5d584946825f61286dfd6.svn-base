/*common*/
require('wap/zepto')
require('wap/zepto/touch')

var	shareTmp = require('wap/component/shareTmp'),
	callApi  = require('wap/component/callApi'),
	Lazy     = require('m/component/lazyLoad'),
	Alert    = require('wap/ui/alert')

var LazyLoad = Lazy.init({ xpath: '.goods_entrance' })
var shopId  = fml.vars.shopId

window.MLS.didLogin = function(){
	window.location.reload()
}

LazyLoad.scroll().load()

$('.att_btn').on('tap',function (){

	if(Meilishuo.config.user_id == 0){
		location.href = 'meilishuo://login.meilishuo'
		return
	}

	var $me       = $(this)
	var is_follow = $('.attention').hasClass('att')
	var data      = {
		shop_id : shopId,
		frm : 'shop_new_wap'
	}
	if(is_follow){
		$.get('/aj/shop/unfollow',data,function (res){
			$('.attention').removeClass('att')
			$me.html('<span class="icon_plus"><img src="'+Meilishuo.config.picture_url+'images/shop/new/icon_plus.png" /></span>关注')
		},'json')
	}else{
		$.get('/aj/shop/follow',data,function (res){
			$('.attention').addClass('att')
			$me.html('取消关注')
		},'json')
	}
})

//优惠券
$('.coupons div.get').on('tap',function (){
    myCheckLogin()
	var coupon_id = $(this).attr('id'),
		mySelf = $(this)
	callApi.write({'url':'/coupon/coupon_thoroughly_apply'},{'coupon_apply_code' : coupon_id},function(res){
		if (res.code) {
			if(res.code != -1){ alert(res.message) }
		}else{
			try{
				var start = res.data.coupon_valid_time_range.start_time.slice(5,10),
					end = res.data.coupon_valid_time_range.expire_time.slice(5,10)
				start = start.replace('-','.')
				end = end.replace('-','.')
				alert('<div class="my_alert"><h3>申领成功</h3><br/><p>有效期：<span class="validity">' + start + '~' + end + '</span><br/>在“我”的页面“优惠券”中查看</p></div>')
				mySelf.removeClass('get').addClass('got').find('img').attr('src','http://i.meilishuo.net/css/images/shop/new/c_got.png')
			}catch(e){
				console.log(e)
			}

		}
	})
})

function alert(content){
	return new Alert({ 'content': content })
}

function myCheckLogin(){

	if(!window.MLS){
		window.MLS = {}
	}

	if(Meilishuo.config.user_id == 0){
		window.location.href = 'meilishuo://login.meilishuo'
	}
}

