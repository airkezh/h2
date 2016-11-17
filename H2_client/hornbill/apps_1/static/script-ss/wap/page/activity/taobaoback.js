fml.define('wap/page/activity/taobaoback' , ['wap/zepto', 'wap/app/dialog'] , function(require , exports){
	var validateA = [0,0,0];

	var cbk = function (content, num) {
		if(num != undefined && num >= 0){
			if(content == ''){
				$('.msgshow').eq(num).hide();
				validateA[num] = 1;
			} else {
				$('.msgshow').eq(num).html(content).show();
			}
		}
	};
	var validateEmail = function(){
		var emailVal = $('#mlsEmail').val();
		if(emailVal == ''){
			return cbk('邮箱不能为空', 0);
		}
		var url = '/activity/taobaoback/reg/validate';
		var data = {
			rule : 'email',
			data : emailVal
		};
		var callback = function(res){
			if(res == 1) cbk('邮箱已经存在。', 0);
			else if(res == 3) cbk('邮箱格式错误。', 0);
			else cbk('', 0);
		};
		$.post(url , data , callback ,'json');
	};
	var validateName = function(){
		var nameVal = $('#mlsName').val();
		if(nameVal == ''){ return cbk('昵称不能为空', 1); }
		var url = '/activity/taobaoback/reg/validate';
		var data = {
			rule : 'nickname',
			data : nameVal
		};
		var callback = function(res){
			if(res == 2) cbk('用户名已经存在。', 1);
			else if(res == 4) cbk('昵称不能为空,支持中英文、数字、下划线，限长10个汉字。', 1);
			else if(res == 5) cbk('用户名已经存在。', 1);
			else cbk('', 1);
		};
		$.post(url , data , callback ,'json');
	};
	var validatePass = function(){
		var passVal = $('#mlsPass').val().length;
		if(passVal<6){
			cbk('密码不能少于6位', 2);
		}else if(passVal > 32){
			cbk('密码不能多于32位', 2);
		}else{
			cbk('', 2);
		}
	};
	$('#mlsEmail').blur(function(){
		validateEmail();
	});
	$('#mlsName').blur(function(){
		validateName();
	});
	$('#mlsPass').blur(function(){
		validatePass();
	});

	var nextStep = function() {
		validateEmail();
		validateName();
		validatePass();
		if(validateA[0] != 1){
			$('#mlsEmail').val('').focus();
		} else if(validateA[1] != 1){
			$('#mlsName').val('').focus();
		} else if(validateA[2] != 1){
			$('#mlsPass').val('').focus();
		} else { 
			var url = '/activity/taobaoback/set/findUserBack?access_token=' + Meilishuo.config.access_token;
			var data = {
				'nickname' : $('#mlsName').val(),
				'email' : $('#mlsEmail').val(),
				'new_password' : $('#mlsPass').val()
			}
			var callback = function(res) {
				if(res == 1){
					$('.submit').val('更新资料成功');
					setTimeout(function(){window.location.href = 'meilishuo://close.meilishuo/';}, 1000);
				} else {
					alert('更新失败');
				}
			};
			$.post(url , data , callback ,'json');
		}
	};
	$('.submit').on('touchstart' , function(){
		nextStep();
	});
});
