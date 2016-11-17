fml.define('app/register_new' , ['jquery','component/validate', 'component/placeholder', 'component/urlHandle', 'app/checkcode', 'app/login'] , function(require , exports){
	var $ = require('jquery');
	var urlHandle = require('component/urlHandle');
	var validate = require('component/validate');
	var checkcode = require('app/checkcode');
	var login = require('app/login');

	var $mobile = $('#mobile');
	var $nickname = $('#nickname');
	var $pwd = $('#password');
	var $confpwd = $('#conf_password');
	var $code = $('#code');

	var $pwSafe = $('.pw_safe');
	var $confpass = $('.confpass');
	var $verifcode = $('.verifcode');
	var $sendBtn = $('#get_code');
	var $regErrorMessage = $('.regErrorMessage');

	var $moreLogin = $('.more_way_wrap h4');

	var regtype = 'register_with_mobile';

	//验证相关
	var isMobValidate;

	function validateHandle(){
		var formName = 'registerForm';

		var submitRegister = function(){
			var isPosting = false;

			var url = '/user/reg/submit?frm=reg_btn_mobile'
			   ,data = {
			   	   'nt': Meilishuo.config.nt
			   	   ,mobile : $mobile.val()
			   	   ,nickname : $nickname.val()
			   	   ,password: $pwd.val()
			   	   ,confirmpassword: $confpwd.val()
			   	   ,captcha: $code.val()
			   	   ,agreement : $('#agreement')[0].checked
			   	   ,type : regtype
			   	   ,gender : '女'
			   	   ,redirect : urlHandle.getParams(location.href).redirect
			   }
			   ,callback = function(r){
					var url = '/';
					if(r && r.code == 0 || r.url){
						if(r.redirect){
							if(/^http/.test(r.redirect)){
								url = r.redirect;
							}else{
								url = '/user/register/' + r.redirect;
							}
						}else if(r.url) {
							if (r.url.length > 2){//hack r.url字段 长度大于2认为是要跳的 url
								url = r.url
							}
							url = {1: '/user/register/success' , 2 : '/guang/hot'}[r.url] || url;
						}else{
							url = '/user/register/success';
						}
						//used in page/register.js
						$( document.body ).trigger( 'register.ok' )
						urlHandle.redirect(url);
					}else{
						isPosting = false;
				 		$regErrorMessage.html(r.message).show();
				 	}
				};

			if(!data.agreement){
				return;		
			}

			if($('#'+formName).find('.msg_error').length){
				return;
			}

			!isPosting && $.post(url , data , callback ,'json');
			isPosting = true;
		}
	
		var validateRules = {
			'mobile' : { 'req=手机号' : '你还没有填写手机号哦。', 'mobile' : '手机号格式有误，请重新输入！' },
			'nickname' : { 'req=昵称' : '你还没有填写昵称哦。', 'maxlen=20' : '支持中英文、数字、下划线，限长10个汉字。' },
			'password' : { 'req=密码' : '你还没有填写密码哦。', 'minlen=6' : '输入密码需在6位到32位间。', 'maxlen=32' : '输入密码需在6位到32位间。','compare=conf_password' : '两次密码输入不一致，请重新输入。' },
			'conf_password' : { 'req=确认密码' : '你还没有填写确认密码哦。', 'compare=password' : '两次密码输入不一致，请重新输入。' },
			'code' : { 'req=短信验证码' : '你还没有填写短信验证码哦。', 'minlen=6' : '输入验证码需要6位。' },
			'agreement' : { 'selectradio' : '需要同意美丽说服务使用协议。' }
		}

		var showStyle = {
			'showmsgbyline=msg_error' : '',
		    'showmsgforsubmit=reg_btn_wrap' : submitRegister
		}

		var opts = {
			'success' : 'span=msg_ok',
			'error': 'span=msg_err',
			'isExist' : {
				'mobile' : function(cbk){
					var url = '/user/reg/validate';
					var data = {
						rule : 'mobile',
						data : $mobile.val()
					};
					var callback = function(res){
						switch(res){
							case 0 : cbk('');
								isMobValidate = true;
								if(!$confpass.is(":hidden"))  
									$verifcode.show();//显示发送验证码
								break;
							case 7 : cbk('手机号已存在。忘记密码 <a href="/user/findPwd?frm=reg_num_exist">点此找回</a>');
								isMobValidate = false;
								break;
							case 8 : cbk('手机号格式错误。');
								isMobValidate = false;
								break;
							case 9 : cbk('您的IP存在异常行为,请联系客服电话:4000800577,感谢支持!');
								isMobValidate = false;
								break;
							default : cbk('');
								break;
						}
					};
					$.post(url , data , callback ,'json');
				},
				'email' : function(cbk){
					var url = '/user/reg/validate';
					var data = {
						rule : 'email',
						data : $email.val()
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
				'password' : function(cbk){
					if($.trim($pwd.val()) == ''){
						cbk('密码不能都为空格。');
					}else{
						cbk('');
					}
				},
				'conf_password': function(cbk){
					if($pwd.val() === $confpwd.val()){
						cbk('');
					}else{
						cbk('两次密码输入不一致，请重新输入。');
					}
				},
				'code': function(cbk){
					if($code.val().length != 6){
						cbk('验证码为6位数字。');
					}else {
						cbk('');
					}
				}
			}
		}
		return validate.validate(formName, validateRules, showStyle, opts);
	}

	function checkPwd(val){
		if(!val) return;

		var l = val.length
		   ,s = 0;

		/* 显示隐藏密码强度 */
		if(l < 6 || l > 32) {
			$pwSafe.hide();
			return;
		}

		$pwSafe.show();

		/* 计算密码强度 */
		if(l > 8) s += 2; else s += 1; /*位数*/
		if(val.match(/[a-z]/)) s += 1; /*小写字母*/
		if(val.match(/[A-Z]/)) s += 1; /*大写字母*/
		if(val.match(/[0-9]/)) s += 1; /*数字*/
		if(val.match(/[!,@#$%^&*?_~]/)) s +=1; /*特殊字符*/
		
		if(s >= 2 && s < 4){
			$('.strength_l').addClass('pw_strength_color');
			$('.strength_m').removeClass('pw_strength_color');
		}else if(s >= 4 && s < 6){
			$('.strength_m').addClass('pw_strength_color');
			$('.strength_h').removeClass('pw_strength_color');
		}else if(s == 6){
			$('.strength_h').addClass('pw_strength_color');
		}
	}

	function timeDown(times, cbk){
		setTimeout(function(){
			if(!times){
				return;
			}else {
				times--;
				cbk(times);
				timeDown(times, cbk);
			}
		},1000);
	}

	function sendCode(){
		if(!isMobValidate) return;
		if(sendCode.isPending) return;
	
		var start = function(res, checkcode){
			if(res != 0){
				if(!$('#checkCodeForm .code_state').length){
					$('#checkCodeForm').append('<span style="color:#ff6699;position:relative;top:-20px;left:12px;" class="code_state">验证码错误。</span>')
				}
				return;
			}

			var time = 60,
			    url = '/user/reg/send_sm_captcha',
			    data = {
					mobile : $mobile.val()
				};

			sendCode.isPending = true;//锁住

			$code[0].focus();

			data.checkcode = checkcode;
			var callback = function(res){
				if(res.code == 0) {
					timeDown(time ,function(times){
				   		if(!times){
				   			sendCode.isPending = false; //释放
				   			$sendBtn.val('获取短信验证码');
						}else {
							$sendBtn.val('重新发送 (' + times + '秒)');
						}
					});
				}else{
					sendCode.isPending = false; //释放
					$( document.body ).trigger( 'getTextCode.ok' )
				}
			}
			$.post(url , data , callback ,'json');
		}
		
		login.showCheckCode(start);
	}


	function init(){

		//初始化校验
		validateHandle();

		var pconf = {
			placeholderCSS : {
				'line-height' : '34px'
			}
		}
		$('#registerForm input[placeholder]').placeholder(pconf);

		$pwd.focus(function(){
			$confpass.show();
		}).on('input propertychange',function(){
			checkPwd($(this).val());
		});

		$confpwd.focus(function(){
			if(isMobValidate){
				$verifcode.show();
			}
		});

		$sendBtn.click(function(){
			sendCode();
		});

		$moreLogin.click(function(){
			$(this).next('.more_way').toggle();
		});

	}
		
	exports.init = init;
});
