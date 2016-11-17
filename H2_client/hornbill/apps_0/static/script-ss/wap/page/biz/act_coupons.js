/*common*/
var $    	   = require('jquery'),
	Alert      = require('wap/ui/alert'),
	checkLogin = require('wap/app/checkLogin');

var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){}
	});
};

$('.coupon_btn').click(function (){
	if(Meilishuo.config.user_id == 0){ 
		var href = '/user/login'
		if(Meilishuo.config.os.mlsApp){
			href = 'meilishuo://login.meilishuo/'
		}
		location.href = href
	}

	$.get('/aj/coupon/coupon_get',{'coupon_apply_code' : $(this).attr('id')},function (res){
		if(res.code === 0){
			alert('领取成功');
		}else{
			alert(res.message || '领取失败');
		}
	},'json');
});

MLS.didLogin = function (){
	location.reload()
}