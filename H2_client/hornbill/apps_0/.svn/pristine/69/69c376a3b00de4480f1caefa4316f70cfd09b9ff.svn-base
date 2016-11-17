/*common*/
require('wap/jquery')
require('wap/zepto/fastclick')

var checkLogin = require('wap/app/checkLogin');
var callApi = require('wap/component/callApi');

/* 优惠券点击 */
var popwin = function(){
	$('.popwin').show();
	$('.popwin img').on('click',function(){
		$('.popwin').hide();
	});
}
var apply10 = true,
	apply30 = true,
	apply100 = true;
$('.coupon img').on('click',function(){
	if (!checkLogin()) return;
	var index = $(this).attr('class');
	var couponCode = $(this).data('code');
	callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:couponCode}, function(res){
		if(!res.code){
			if(index == "coupon10" && apply10){
				popwin();
				$('.coupon10').attr('src','http://d03.res.meilishuo.net/pic/_o/8f/03/6a8d6f8214a17574efb7f74080b3_181_106.ch.png');
				apply10 = false;
			}else if(index == "coupon30" && apply30){
				popwin();
				$('.coupon30').attr('src','http://d02.res.meilishuo.net/pic/_o/05/1d/e9507418369e3fd77d66f2b69c21_181_105.cf.png');
				apply30 = false;
			}else if(index == "coupon100" && apply100){
				popwin();
				$('.coupon100').attr('src','http://d03.res.meilishuo.net/pic/_o/c9/28/287696b909ac1faec8f527e116e3_180_105.ch.png');
				apply100 = false;
			}
		}
	});
	
});

/* 页面滑动 */
$('.join_vioce').on('click',function(){
     $('html,body').animate({scrollTop: $('.voice').offset().top},500);
})
$('.join_cd').on('click',function(){
     $('html,body').animate({scrollTop: $('.cd').offset().top},500);
})



