fml.define('wap/app/kuaiyong' , ['wap/jquery'] , function(require , exports){
	var result = function(){
		$('.submit').on('click',function(){
			var data = {},
				_name = $('#name'),
				_nick = $('#nickname'),
				_qq = $('#qq'),
				_mac = $('.mac');
 			data.real_name = _name.val();
 			data.nick_name = _nick.val();
 			data.qq = _qq.val();
 			data.mac = _mac.html(); 
 			if (!data.real_name || data.real_name == '请填写姓名') {
 				_name.val('请填写姓名').css('color','red');
 				data.real_name = '';
 			};
 			if (!data.nick_name || data.nick_name == '请填写美丽说昵称') {
 				_nick.val('请填写美丽说昵称').css('color','red');
 				data.nick_name = '';
 			};
 			if (!data.qq || data.qq == '请填写qq号') {
 				_qq.val('请填写qq号').css('color','red');
 				data.qq = '';
 			};
 			if (data.real_name && data.real_name && data.real_name) {
 				$.get('/activity/kuaiyong/set/result',data,function(msg){
 					msg = JSON.parse(msg);
	 				if(msg.status == 1){ 
	 					window.location.href='/activity/kuaiyong/back/';
	 				}else{
	 					alert('信息已成功提交，按左侧返回。');
	 				}
	 			})
 			};
		})
		$('input').on('click', function(){
			$(this).css('color','').val('');
		})
	}
	var regist = function(){
		$('.goto').on('click',function(){
			var data = {};
 			data.mac = $('.mac').html();
 			data.token = $('.token').html();
 			$.get('/activity/kuaiyong/set/regist',data,function(msg){
 				msg = JSON.parse(msg);
 				if(msg.mac == 0 && msg.token == 1){
 					window.location.href='/activity/kuaiyong/result/?token=' + $('.token').html() + '&mac=' + $('.mac').html();
 				}else if(msg.token == 0){
 					$('.show').html('MM需要先注册才可以领奖哦').show();
 				}else if(msg.mac == 1){
 					$('.show').html('MM已经领取奖品了，不要贪心哦').show();
 				}
 			})
		})
	}
	exports.result = result;
	exports.regist = regist;
});
