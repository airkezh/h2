fml.define('app/huodong/820coupon' , ['jquery','ui/alert','app/login','app/checkLogin'] , function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var Alert = require('ui/alert');
	var login = require('app/login');
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
	
	coupon();
	function coupon(){
		$('.get_coupon').click(function(){

			if(!check()) return false;
			var self = $(this);
			coupon_id = self.attr('data-code');
			type = self.attr('data-type');
			var _this=$(this);
			var left100 = _this.next("p").find("span").text();

			$.ajax({
				url:'/aj/coupon820/coupon_apply',
				data:{
					'type' : type,
					'code': coupon_id
				},
				type:'post',
				dataType:'json',
				success: function(data){
					
					if( data.islogin == 0 ){
						alert("请登录");
					}
					

					if(data.success == 1){
						var pClassName=_this.parent().hasClass("coupon1");
						if( pClassName ) {
							if(new Date().getDate() < 20){
								_this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/phonepriv/100again.jpg");
							}else {
								_this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/phonepriv/100active.jpg");
							};
							_this.next("p").find("span").text(left100-1);
						}else{
							if(new Date().getDate() < 20){
								_this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/phonepriv/otheragain.jpg");
							}else {
								_this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/phonepriv/otheractive.jpg");
							};
							_this.next("p").find("span").text(left100-1);
						}
					}else{
						alert(data.tips);
					}
				},
				error:function(){
					alert('系统繁忙，请稍后再试');
				}
			})
		});
	}
});
