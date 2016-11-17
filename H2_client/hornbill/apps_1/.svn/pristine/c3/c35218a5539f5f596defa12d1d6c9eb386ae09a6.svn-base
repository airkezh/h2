fml.define('wap/app/activity/marioaward' , ['wap/jquery'] , function(require , exports){
	var award = function(){
		$('.submit').on('click',function(){
			var data = {},
				_marionick = $('#marionick'),
				_name = $('#name'),
				_tel = $('#tel'),
				_address = $('#address'),
				app_mac = $('.app_mac');
 			data.wx_nickname = _marionick.val();
			data.real_name = _name.val();
 			data.mobile_phone = _tel.val();
 			data.address = _address.val();
 			data.app_mac = app_mac.html();
			if (!data.wx_nickname || data.wx_nickname == '请填写微信昵称') {
 				_marionick.val('请填写微信昵称').css('color','red');
 				data.wx_nickname = '';
 			};
			if (!data.real_name || data.real_name == '请填写姓名') {
 				_name.val('请填写姓名').css('color','red');
 				data.real_name = '';
 			};
 			if (!data.address || data.address == '请填写货地址') {
 				_address.val('请填写收货地址').css('color','red');
 				data.address = '';
 			};
 			if ((!data.mobile_phone || data.mobile_phone == '请填写手机号')) {
 				_tel.val('填写手机号').css('color','red');
 				data.tel = '';
			}else if (data.real_name && data.address) {
				$(this).off('click')
				$.get('/activity/marioaward/set/submit',data,function(msg){
					if(msg.data == 1){ 
						window.location.href = '/activity/marioaward/award/success';
					}else{
						window.location.href = '/activity/marioaward/award/fail';
					}
				},'json')
			}
		})
		$('input').on('click', function(){
			$(this).css('color','').val('');
		})
	}
	exports.award = award;
});
