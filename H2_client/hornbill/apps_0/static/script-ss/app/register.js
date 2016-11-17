fml.define('app/register' , ['jquery', 'component/validate' , 'component/focus', 'component/passFocus', 'component/urlHandle','component/dialog','component/shareTmp', 'app/checkcode'] , function(require , exports){
	var $ = require('jquery');	
	var input = require('component/focus');
	var password = require('component/passFocus');
	var urlHandle = require('component/urlHandle');
	var validate = require('component/validate');
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var checkcode = require('app/checkcode');
	var query = urlHandle.getParams(window.location.href.toString());
	return function(){
		//表单初始
		var inputItem = ['#mlsEmail' , '#mlsName' , '#vmPass' , '#vmConfirmPass' , '#checkcode'],
			passwordItem = [['#vmPass' , '#mlsPass'] , ['#vmConfirmPass' , '#mlsConfirmPass']];
		for(i in inputItem){ input.inputFocus(inputItem[i]); }
		for(i in passwordItem){ password.passwordFocus(passwordItem[i][1] , passwordItem[i][0]); }
		var infogender = function(){
			$('.genderBox').children('input, label').unbind('click', infogender);
			$('.genderBox .registerInfoMessage').css('display','inline');
			var tgender = setTimeout(function(){
				$('.genderBox .registerInfoMessage').fadeOut(100, function(){
					$('.genderBox').children('input, label').bind('click', infogender);
				});
			}, 4000);
		};
		$('.genderBox').children('input, label').bind('click', infogender);

		//验证码
		var changeCode = function(){
			checkcode(function(){
				$('.checkImage').unbind('click').parents('.checkImage').next('.good, .bad').attr('class','').next('.registerErrorMessage').hide();
				var t = setTimeout(function(){
					$('.checkImage').bind('click',function(){
						changeCode();
						$('#checkcode').val('').focus();
					});
				}, 600);
			});
		};
		$('#mlsPass').focus(function(){
			$('#vmConfirmPass').parent().show();
			$('#checkcode').parent().show();
			if($('.checkImage').find('img').attr('isblank') === 'true'){
				$('.checkImage').find('img').attr('isblank', 'false');
				changeCode();
				$('#checkcode').val('');
			}
		});
		$('#mlsEmail').focus(function(){
//			if(!$(this).siblings('.registerErrorMessage')[0]){
				var isQQmail = /qq\.com/i;
				if(!isQQmail.test($(this).val())){
					$(this).siblings('.registerInfoMessage').css('display','inline');
					$(this).siblings('.registerErrorMessage').hide();
					if($(this).siblings('strong').is('.good,.bad'))
						$(this).siblings('strong').hide();
				}
//			}
		}).blur(function(){
			$(this).siblings('.registerInfoMessage').hide();
			$(this).siblings('.registerErrorMessage').show();
			if($(this).siblings('strong').is('.good,.bad'))
				$(this).siblings('strong').css('display','inline');
		});

		//表单提交
		var submitRegister = function(){
			var url = '/user/reg/action';
			var data = {
				'nt': Meilishuo.config.nt,
				email : $('[name=email]').val(),
				nickname : $('[name=nickname]').val(),
				password: $('[name=password]').val(),
				confirmpassword: $('[name=confirm_password]').val(),
				gender:$('[name=gender]:checked').val(), 
				agreement: $('[name=agreement]')[0].checked,
				checkcode: $('[name=checkcode]').val()
			};
			if(query.invitecode != '')
				data.invitecode = query.invitecode;
			var callback = function(res){
				var url = '/'
				if (res.status && -21 == res.status)
					url = '/user/register'
				else
					url = {1: '/user/register/success' , 2 : '/guang/hot'}[res.url] || url
					
				urlHandle.redirect(url);
			};
			if(data.gender == '男'){
				var html = shareTmp('noBoyTpl');
				dialog.meiliDialog({dialogTitle : "美丽提示" , dialogWidth : 420 , dialogContent : html }); 
				return false;
			}
			if(data.agreement == false){
				return false;		
			}
			$.post(url , data , callback ,'json');
		};		
		//表单操作
		var formName = 'registerForm',
			validateRules = {
				'email' : { 'req=电子邮箱' : '你还没有填写电子邮箱哦。', 'email' : '电子邮箱格式有误，请重输！', 'canEmail=yahoo' : '由于雅虎邮箱即将下线，暂不支持yahoo邮箱注册，推荐使用QQ邮箱' },
				'nickname' : { 'req=昵称' : '你还没有填写昵称哦。', 'maxlen=20' : '支持中英文、数字、下划线，限长10个汉字。' },
				'password' : { 'minlen=6' : '输入密码需在6位到32位间。', 'maxlen=32' : '输入密码需在6位到32位间。' },
				'confirm_password' : { 'compare=password' : '两次密码输入不一致，请重新输入。', 'minlen=6' : '输入密码需在6位到32位间。' },
				'checkcode' : { 'req=验证码' : '你还没有填写验证码哦。', 'minlen=4' : '输入验证码需要4位。' },
				'agreement' : { 'selectradio' : '需要同意美丽说服务使用协议。' }
			},
			showStyle = {
				'showmsgbyline=registerErrorMessage' : '',
				'showmsgforsubmit=registerBtn' : submitRegister
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
					},
					'checkcode' : function(cbk){
						var url = '/user/reg/validate';
						var data = {
							rule : 'captcha',
							data : $('[name=checkcode]').val()
						};
						var callback = function(res){
							if(res == 6){ 
								$('.checkImage').click();
								cbk('验证码错误。');
							}
							else cbk('');
						};
						$.post(url , data , callback ,'json');
					}
				}
			};
		validate.validate(formName, validateRules, showStyle, opts);
	}
});
