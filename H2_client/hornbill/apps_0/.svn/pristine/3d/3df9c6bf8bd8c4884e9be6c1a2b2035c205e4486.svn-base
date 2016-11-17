/*common*/
var $ = require('jquery');
var checkLogin = require( 'app/checkLogin' );
var callApi = require( 'component/callApi' );

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
	if ( !checkLogin() ) return;
	var index = $(this).attr('class');
	var couponCode = $(this).data('code');
	callApi.write({url: '/coupon/coupon_apply'}, {coupon_apply_code:couponCode}, function(res){
		if(!res.code){
			if(index == "coupon10" && apply10){
				popwin();
				$('.coupon10').attr('src','http://d03.res.meilishuo.net/pic/_o/8b/0f/235f055c70ae05bf208eb26f89f8_266_156.cg.png');
				apply10 = false;
			}else if(index == "coupon30" && apply30){
				popwin();
				$('.coupon30').attr('src','http://d05.res.meilishuo.net/pic/_o/00/91/bf93746ce2c4d5e6300f7383a8bc_266_155.cg.png');
				apply30 = false;
			}else if(index == "coupon100" && apply100){
				popwin();
				$('.coupon100').attr('src','http://d02.res.meilishuo.net/pic/_o/9c/14/75054bc60ccc06a9f2ddce48f8cb_265_155.cg.png');
				apply100 = false;
			}
		}
	});	
});
/* 页面滑动 */
$('.join_voice').on('click',function(){
	console.log(123);
     $('html,body').animate({scrollTop: $('.voice').offset().top - $('.wheader').height()},500);
})
$('.join_cd').on('click',function(){
     $('html,body').animate({scrollTop: $('.cd').offset().top - $('.wheader').height()},500);
})