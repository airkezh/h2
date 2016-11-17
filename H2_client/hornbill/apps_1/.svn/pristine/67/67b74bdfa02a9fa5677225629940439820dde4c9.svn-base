fml.define('wap/page/welfare/welfare_apply' , ['wap/zepto'] , function(require , exports){
	var activity_id = $('#wlf_userinfo').attr('activity_id');
	
	var tips = $('.userinfo_tips'),
	    user_name = $('#user_name'),
	    telephone = $('#telephone'),
	    address = $('#address');

	$('#btnsubmit').on('tap' , function(){
		if(!user_name.val()){
			tips.text("姓名不能为空。")
				.css('display','block');
		}else if (!telephone.val()){
			tips.text("电话不能为空。")
				.css('display','block');
		}else if(!address.val()){
			tips.text("收货地址不能为空。")
				.css('display','block');
		}else{
			tips.css('display','none');
		}
	});
});
