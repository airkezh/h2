/*common*/
require('wap/zepto');
var Alert = require("wap/ui/alert");
var alert_con = function(msg) {
    return new Alert({
        content: msg       
    }); 
};

var btn = $('.btn');
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};
btn.on('click' , function(){
	if(Meilishuo.config.user_id == 0){
		if(Meilishuo.config.os.mlsApp){
			window.location.href = 'meilishuo://login.meilishuo';
		}else{
			window.location.href = 'http://m.meilishuo.com/user/login';
		}
	}else{
		//获取优惠券
		$.get('/aj/getCoupons/june_coupon_sao' , {} , function(res){
			alert_con(res.message);
		} , 'json');
	}
})