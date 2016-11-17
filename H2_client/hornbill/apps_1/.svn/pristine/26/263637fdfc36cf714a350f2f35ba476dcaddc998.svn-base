fml.define('wap/app/register' , ['wap/zepto/touch', 'component/storage', 'component/validate','app/checkcode'] , function(require , exports){
	var validate = require('component/validate')
		, storage = require('component/storage')
		, checkcode = require('app/checkcode')
	   ,isMobValidate = false
	   ,$mobile = $('#mobile')
	   ,$nickname = $('#nickname')
	   ,$password = $('#password')
	   ,$code = $('#code')
	   ,$sendBtn = $('#get_code')
	   ,$regErrorMessage = $('.regErrorMessage')
	   ,type = 'register_with_mobile'
	   ,validateHandle
	   ,val

		/* 初始化 */
		var init = function(){
			/* 绑定发送验证码 */
			$sendBtn.on('tap', sendCode);
			/* 验证码 */
			initCode();
			/* 初始化校验 */
			validateHandle = validate.validate(formName, validateRules, showStyle, opts);	
		}

		var timeDown = function(times, cbk){
			window.setTimeout(function(){
				if(!times){
					return;
				}
				else {
					times--;
					cbk(times);
					timeDown(times, cbk);
				}
			},1000);
		}

		var sendCode = function(){
			if(!isMobValidate) return;
			$('.msg_error').html('');
			var time = 60
			   ,url = '/user/reg/send_sm_captcha'
			   ,data = {
					mobile : $mobile.val()
					,checkcode : $('#checkcode').val()
				};

			var start = function(){
				$sendBtn.attr('disabled','disabled');
				$code.focus();
				var callback = function(res){
					if(res.code == 0) {
						timeDown(time ,function(times){
					   		if(!times){
					   			$sendBtn.removeAttr('disabled');
					   			$sendBtn.val('获取短信验证码');
							}
							else {
								$sendBtn.val('重新发送 (' + times + '秒)');
							}
						});
					}
					else {
						changeCode();
						$codeMsg = $sendBtn.parent().find('.msg_error');
						if($codeMsg.length > 0) 
							$codeMsg.html('<span></span>' + res.message).show();
						else
							$('<div class="msg_error"><span></span>'+res.message+'</div>').insertAfter($sendBtn);	
						$sendBtn.removeAttr('disabled');
					}
				}
				$.post(url , data , callback ,'json');
			}
			start();
		}

		//验证码
		var initCode = function(){
			if($('.checkImage').find('img').attr('isblank') === 'true'){
				$('.checkImage').find('img').attr('isblank', 'false');
			}
			$('.checkImage').bind('tap',changeCode);
			showCode();
		};
		var changeCode = function(){
			showCode();
			$('#checkcode').val('').focus();
		};
		var showCode = function(){
			checkcode(function(){
				$('.checkImage').unbind('tap');
				var t = setTimeout(function(){
					$('.checkImage').bind('tap',changeCode);
				}, 600);
			});
		};

		var submitRegister = function(){
			var url = '/user/reg/submit?frm=reg_btn_mobile'
			   ,data = {
			   	   'nt': Meilishuo.config.nt
			   	   ,mobile : $mobile.val()
			   	   ,nickname : $nickname.val()
			   	   ,password: $password.val()
			   	   ,confirmpassword: $password.val()
			   	   ,captcha: $code.val()
			   	   ,agreement : $('[name=agreement]')[1].checked
			   	   ,type : type
			   	   ,gender : '女'
			   }
			   , logon_from = storage.getCookie('LOGON_FROM')
			   ,callback = function(r){
					if(r && r.code == 0 || r.url){
						if ( r.url && r.url.length > 2 ) {
							//r.url 返回为 url 的时候跳丫的
							var url = r.url
						}else {
							var url = logon_from || '/' 
						}
						alert('恭喜，注册成功！');
						/*
						if(r.redirect)
							url = '/user/register/' + r.redirect;
						else if(r.url)
							url = {1: '/user/register/success' , 2 : '/guang/hot'}[r.url] || url;
						else
							url = '/user/register/success';
						*/

						window.location.href = url;
					}
				 	else
				 		$regErrorMessage.html(r.message).show();
				};

			if(data.agreement == false){
				return false;		
			}

			if($(document).find('.msg_error').length > 0)
				return ;
			
			$.post(url , data , callback ,'json');
		}
		var formName = 'registerForm',
			validateRules = {
				'mobile' : { 'req=手机号' : '你还没有填写手机号哦。', 'mobile' : '手机号格式有误，请重新输入！' },
				'nickname' : { 'req=昵称' : '你还没有填写昵称哦。', 'maxlen=20' : '支持中英文、数字、下划线，限长10个汉字。' },
				'password' : { 'req=密码' : '你还没有填写密码哦。', 'minlen=6' : '输入密码需在6位到32位间。', 'maxlen=32' : '输入密码需在6位到32位间。' },
				'checkcode' : { 'minlen=4' : '请输入验证码' },
				'code' : { 'req=短信验证码' : '你还没有填写短信验证码哦。', 'minlen=6' : '输入验证码需要6位。' },
				'agreement' : { 'selectradio' : '需要同意美丽说服务使用协议。' }
			},
			showStyle = {
				'showmsgbyline=msg_error' : ''
			   ,'showmsgforsubmit=reg_mob_btn' : submitRegister
			},
			opts = {
				'success' : 'span=msg_ok',
				'error': '',
				'isExist' : {
					'mobile' : function(cbk){
						var url = '/user/reg/validate';
						var data = {
							rule : 'mobile',
							data : $mobile.val()
						};
						var callback = function(res){
							//res = 7;
							switch(res){
								case 0 : cbk('');
									isMobValidate = true;
								//	if(!$confirmPassword.parent().is(":hidden"))  
										$code.parent().show();//显示发送验证码
									break;
								case 7 : cbk('手机号已存在。');isMobValidate = false;
									break;
								case 8 : cbk('手机号格式错误。');isMobValidate = false;
									break;
								default : cbk('');
									break;
							}
							
						};
						$.post(url , data , callback ,'json');
					},
					'nickname' : function(cbk){
						var url = '/user/reg/validate';
						var data = {
							rule : 'nickname',
							data : $nickname.val()
						};
						var callback = function(res){
							if(res == 2) cbk('用户名已经存在。');
							else if(res == 4) cbk('支持中英文、数字、下划线，限长10个汉字。');
							else if(res == 5) cbk('用户名已经存在。');
							else cbk('');
						};
						$.post(url , data , callback ,'json');
					},
					'code': function(cbk){
						if($code.val().length != 6){
							cbk('验证码为6位数字。');
						}
						else {
							var $parent = $code.parent();
							if($parent.find('.msg_error').length > 0){
								$parent.find('.msg_error').remove();
							}
							$parent.find('span').addClass('msg_ok');
						}
					}
				}
			};
		
		exports.init = init;
});
