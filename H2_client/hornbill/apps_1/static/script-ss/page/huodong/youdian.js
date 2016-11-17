fml.define('page/huodong/youdian' , ['jquery','ui/alert','app/checkLogin', 'component/callApi'] , function(require, exports){
	var	$ = require('jquery');
	var check = require('app/checkLogin');
	var Alert = require('ui/alert');
	var callApi = require('component/callApi');
	var alert = function(msg){
		return new Alert({
			width:380,
			content:msg
		});
	}
	$('.top').delegate('.follow','click',function(){
		var self = $(this);
		if(!check()) return false;
		$.ajax({
			url:'/aj/doota/shop_save',
			type:'get',
			data:{
				shop_id:self.attr('data-shop-id')
			},
			dataType:'json',
			success: function(data){
				if(data.code != 0){
					alert(data.msg);
				}else{
					self.removeClass('follow').addClass('followed').text('已关注');
				}
			},
			error: function(data){

				alert('服务器繁忙，请稍后再试');
			}
		})
	});
	$('.coupon').click(function(){
		if(!check()) return false;
		var coupon_id=$(this).attr('data-coupon-id');

		callApi.write({'url': '/coupon/coupon_apply'}, {coupon_apply_code: coupon_id}, function(data){
			if (data.code) {
				alert(data.message);
			}else{
				alert('领取成功');
			}
		});
	})
});
