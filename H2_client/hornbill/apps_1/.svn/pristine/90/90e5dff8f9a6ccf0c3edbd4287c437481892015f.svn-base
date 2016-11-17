fml.define('wap/page/shop/activity', ['component/shareTmp','wap/ui/alert'], function (require, exports) {
	var shareTmp = require('component/shareTmp'),
		Alert = require('wap/ui/alert');
	var alert = function (param){
		new Alert({
			'content': param,
			'onSure' : function(){
				//window.location.reload();
			}
		});
	}
    $('.coupons div').on('click',function(){
    	console.log($(this).attr('id'));
    	//跳至客户端登录
		if(Meilishuo.config.user_id == 0){
			window.location.href = 'meilishuo://login.meilishuo';
		}
		$.ajax({
			url:'/aj/shop/activity_coupon',
			data:{
				'code' : $(this).attr('id') + '',
				'type' : $(this).attr('dataType') + ''
			},
			dataType:'json',
			type:'post',
			success:function(res){
				if (!res.code){
					if(res.success == 1){
						alert('<h3>领取成功<h3><br/><p style="font-weight:normal;">请在 我--&gt;我的优惠券 查看</p>');
					}else{
						alert(res.tips);
					}
				}else{
					alert('领取失败');
				}
			},
			error: function(){
				alert('系统错误，领取失败');
			}
		});
		$(this).addClass('got');
	});
});