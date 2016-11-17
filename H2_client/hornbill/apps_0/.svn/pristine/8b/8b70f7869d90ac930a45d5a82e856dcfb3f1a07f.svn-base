fml.define('wap/page/act/bdapp' , ['wap/jquery'] , function(){
	var banner_id = $('.banner_id').val()

	$('.submit').on('click', function(){
		event.preventDefault();
		var data = {
			real_name : $('#name').val()
			, mobile_phone : $('#tel').val()
			, address : $('#address').val()
			, app_mac : $('.app_mac').val()
			, banner_id : banner_id
		}
		var testMobile = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(data.mobile_phone)

		if (!data.real_name)
			alert('请填写姓名')
		else if(!data.mobile_phone)
			alert('请填写手机号')
		else if(!testMobile)
			alert('手机号格式不正确')
		else if(!data.address)
			alert('请填写货地址')

		if (data.real_name && data.address && data.mobile_phone && testMobile) {
			$.get('/aj/act/bdapp',data,function(msg){
				if(msg.data == '1'){ 
					window.location.href = '/act/bdapp/success?banner_id=' + banner_id;
				}else{
					window.location.href = '/act/bdapp/fail?banner_id=' + banner_id;
				}
			},'json')
		}
	})
});
