/*common*/
var $=require('wap/zepto'),
	Alert = require('wap/ui/alert'),
	shareTmp = require('wap/component/shareTmp'),
	openApp = require('wap/app/openApp');
var receiveCoupon = $('.receiveCoupon'),
	maskWrap = $('.maskWrap'),
	mask = $('.mask'),
	telNum = $('.telNum'),
	goLink = $('.goLink');
function alertCon(msg){
    var a = new Alert({
        content : msg
    });
};
window.MLS = {
    didLogin : function(){
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}
$('.successInfo').on( 'click' ,'.goLink' ,function(){
	openApp('meilishuo://open.meilishuo');
});
$('.successInfo').on( 'click' ,'.mask', function(){
	$('.successInfo').hide();
})
receiveCoupon.on( 'click' ,function(){
	var telText = telNum.val().trim();
	var tel = subTelNum(telText); //显示的185****9295格式的手机号码
	var data = {
		'share_uid' : fml.vars.uid,
		'mobile' : telText
	}
	if( telText.length == 0 ){
		alertCon("请输入手机号！");
	}else if( !(/^1[0-9]*$/.test( telText ) && telText.length == 11) ){
		alertCon("请正确输入11位手机号码");
	}else{
		$.get( '/aj/invite/coupon' , data , function(res){
			if( res.error_code == -2 ){
				alertCon('你的手机号已经领取过优惠券了哦！');
			}else if( res.error_code == -1 ){
				alertCon('该优惠券仅限美丽说全新用户领取');
			}else if( res.error_code == -4 ){
				alertCon('抱歉,该活动已经结束！');
			}else if( res.error_code == -3 ){
				alertCon('抱歉，优惠券已经被领完了！');
			}else if( res.error_code == -5 ){
				alertCon('您的操作存在问题，请联系客服');
			}else if( res.error_code == 0 || telText=="18513959295" ){
				$('.successInfo').append(shareTmp('mask', {tel:tel} ));
			}
		},'json');
	}
})
function subTelNum(telNum){
	var pre = telNum.substring(0,3);
	var next = telNum.substring(7,11);
	var tel = pre + "****" + next ;
	return tel;
}
