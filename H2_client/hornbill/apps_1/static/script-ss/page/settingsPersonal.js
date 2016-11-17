fml.define('page/settingsPersonal' , ['jquery', 'component/validate', 'component/ajax', 'component/focus'] , function(require , exports){
	var $ = require('jquery');
	var validate = require('component/validate');
	var ajax = require('component/ajax');
	var input = require('component/focus');

	var formCheck = function(){
		//表单初始
		var inputItem = ['#mlsEmail' , '#mlsName' , '#vmPass'];
		for(i in inputItem){ input.inputFocus(inputItem[i]); }
		$('#mlsEmail').focus(function(){
			var isQQmail = /qq\.com/i;
			if(!isQQmail.test($(this).val())){
				$(this).siblings('.registerInfoMessage').css('display','inline');
				$(this).siblings('.registerErrorMessage').hide();
				if($(this).siblings('strong').is('.good,.bad'))
					$(this).siblings('strong').hide();
			}
		}).blur(function(){
			$(this).siblings('.registerInfoMessage').hide();
			$(this).siblings('.registerErrorMessage').show();
			if($(this).siblings('strong').is('.good,.bad'))
				$(this).siblings('strong').css('display','inline');
		});

		var nextStep = function() {
			var url = '/settings/set/findconnectuser';
			var data = {
				'nickname' : $('#mlsName').val(),
				'email' : $('#mlsEmail').val(),
				'new_password' : $('#mlsPass').val()
			}
			var callback = function(res) {
				if(res == 1){
					window.location.href = '/settings/emailSend';
				} else if(res == 2){
					alert('该邮箱处于封禁状态');
				} else {
					alert('修改失败');
				}
			};
			$.post(url , data , callback ,'json');
		};
		//表单操作
		var formName = 'setNewInfo',
			validateRules = {
				'nickname' : { 'req=昵称' : '你还没有填写昵称哦。', 'maxlen=20' : '支持中英文、数字、下划线，限长10个汉字。' },
				'password' : { 'minlen=6' : '输入密码需在6位到32位间。', 'maxlen=32' : '输入密码需在6位到32位间。' },
				'email' : { 'req=电子邮箱' : '你还没有填写电子邮箱哦。', 'email' : '电子邮箱格式有误，请重输！', 'canEmail=yahoo' : '暂不支持yahoo邮箱，推荐使用QQ邮箱' }
			},
			showStyle = {
				'showmsgbyline=registerErrorMessage' : '',
				'showmsgforsubmit=nextBtn' : nextStep
			},
			opts = {
				'success' : 'strong=good',
				'error' : 'strong=bad',
				'isExist' : {
					'email' : function(cbk){
						var url = '/user/reg/validate';
						var data = {
							rule : 'email',
							data : $('[name=email]').val()
						};
						var callback = function(res){
							if(res == 1) cbk('邮箱已经存在。');
							else if(res == 3) cbk('邮箱格式错误。');
							else cbk('');
						};
						$.post(url , data , callback ,'json');
					},
					'nickname' : function(cbk){
						var url = '/user/reg/validate';
						var data = {
							rule : 'nickname',
							data : $('[name=nickname]').val()
						};
						var callback = function(res){
							if(res == 2) cbk('用户名已经存在。');
							else if(res == 4) cbk('支持中英文、数字、下划线，限长10个汉字。');
							else if(res == 5) cbk('用户名已经存在。');
							else cbk('');
						};
						$.post(url , data , callback ,'json');
					}
				}
			};
		validate.validate(formName, validateRules, showStyle, opts);
	}
	formCheck();
});