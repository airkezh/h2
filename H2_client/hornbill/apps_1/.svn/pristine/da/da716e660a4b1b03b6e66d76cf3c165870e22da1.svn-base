fml.define('wap/app/activity/act91' , ['wap/jquery'] , function(require , exports){
	var award = function(){
		$('.submit').on('click',function(event){
			var data = {},
				_name = $('#name'),
				_tel = $('#tel'),
				_address = $('#address'),
				app_mac = $('.app_mac');
			data.real_name = _name.val();
 			data.mobile_phone = _tel.val();
 			data.address = _address.val();
 			data.app_mac = app_mac.html();

			event.preventDefault();
			if (!data.real_name)
				alert('请填写姓名')
			else if(!data.mobile_phone)
				alert('请填写手机号')
			else if(!data.address)
				alert('请填写货地址')
			//console.log(data)
			/*
			if (!data.real_name || data.real_name == '请填写姓名') {
 				_name.css('color','red');
 			};
 			if (!data.address || data.address == '请填写货地址') {
 				_address.css('color','red');
 			};
 			if ((!data.mobile_phone || data.mobile_phone == '请填写手机号')) {
 				_tel.css('color','red');
			}else*/ 
			if (data.real_name && data.address && data.mobile_phone) {
				$.get('/activity/act91/set/submit',data,function(msg){
					if(msg.data == 1){ 
						window.location.href = '/activity/act91/award/success';
					}else{
						window.location.href = '/activity/act91/award/fail';
					}
				},'json')
			}
		})
	}
	exports.award = award;
});
