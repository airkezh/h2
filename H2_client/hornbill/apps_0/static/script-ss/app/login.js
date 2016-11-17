fml.define('app/login' , [
	'jquery','component/placeholder','component/storage', 'component/urlHandle', 'component/validate','component/shareTmp',
	'ui/dialog','app/closeFrame','app/checkcode','app/tracking',
	'component/iStorage'] , function(require , exports){

	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var urlHandle = require('component/urlHandle');
	var storage = require('component/storage');
	var validate = require('component/validate');
	var logTrack = require('app/tracking');
	var checkcode = require('app/checkcode');
	var closeIframe = require('app/closeFrame');
	var iStorage = require('component/iStorage');
	var formFrameExist = false;

	//hack for order
	//by 11
	var clearCartsNumCache = function () {
        iStorage.removeCookie('numInCart')
        return this;
    }

	var validateIns;
	var loginDialog;

	var authCodeIns = {
		show : function(){
			$(".authcode").show();
		},
		isShow : function(){
			return !$(".authcode").is(":hidden");
		}
	};

	function checkLoginPass(user,pass,code,state){
		var url = '/aw/user/logon';
		var data = {
			'login_name' : $(user).val(),
			'password' : $(pass).val(),
			'save_state' : $(state)[0].checked ? 1 : 0,
			'checkcode': $(code).val(),
			'redirect' : urlHandle.getParams(location.href).redirect,
			'nt': Meilishuo.config.nt
		};

		var callback = function(r){


			//达到输入错误上线，显示验证码
			if(r.need_captcha == 1){
				authCodeIns.show();
				addCodeValidate();
			}

			var orgUrl =  Meilishuo.config._or || r.redirect;
			var showErrMsg = function(msg,notChange){
				$('.loginErrorMessage').html(msg).show();
				if(!notChange && authCodeIns.isShow()){
					checkcode();
				}
			};

			// Object {status: 1, redirect: "http://xq.fedevot.meilishuo.com/user/findPwd/success", mobile: "14745178730", mobile_is_actived: 1}
			switch(r.status){
				case 1 :
					clearCartsNumCache();
					/*TODO
					need to set Meilishuo.config.user_id
					and refresh headsec
					*/
					Meilishuo.config.user_id = true;
					if(fml.emit('login_success',null , true)){
						loginDialog && loginDialog.destory();
						return;
					}
					if(orgUrl){
						var domain = urlHandle.getUrl(orgUrl).hostDomain,
							reg = new RegExp(domain+'/user/.+');
						// 从user controller过来的直接回主页
						if(orgUrl.match(reg)){
							orgUrl = '/welcome';
						}

						var k = 'MEILISHUO_MM';
						var v = storage.getCookie('MEILISHUO_MM');

						if(Meilishuo.config.controller === 'login'){
							return urlHandle.redirect(Meilishuo.config.main_site_domain+'/cookie/distribute/?c=' + encodeURIComponent(orgUrl) + '&k=' + encodeURIComponent(k) + '&v=' + encodeURIComponent(v) );
	 					}else{
	 						if( formFrameExist ){
								return location.href = '/welcome/reload/';
							}
	 						return window.location.reload();
	 					}

	 				}
					break;
				case 6 :
					showErrMsg('请正确输入验证码');
					break;
				case -1 :
					showErrMsg('账号或密码错误，请重新输入');
					break;
				case -3 :
					showErrMsg('账户还在审核中');
					break;
				case -4 :
					showErrMsg('账号被删除',1);
					setTimeout(function(){
						urlHandle.redirect(r.redirect);
					},5000);
					break;
				case -21:
					window.location.reload();
					break;
				case -11 :
					showErrMsg('密码输入错误10次，回忆一下，30分钟后再来试试');
					break;
				case -12 :
					showErrMsg('账号或密码错误，您还可尝试' + r.remain + '次');
					break;
				case -13 :
					showErrMsg('休息一下~一会儿继续');
					break;
				case -50 :
					var link = '/user/freeze?nickname='+encodeURI(data.login_name)
					showErrMsg('账号冻结，<a href="'+link+'"'+(formFrameExist?' target="_top"':'')+'>申请解冻</a>');
					break;
				case -22 :
					showErrMsg('登录异常，请稍后重试或联系客服【231】');
					break;
				default :
					break;
			}
		};
		$.post(url , data , callback ,'json');
	}

	//表单操作
	function formValidate(cbk){
		var formName = 'loginForm',
			validateRules = {
				'mlsUser' : { 'req=注册时使用的邮箱/昵称' : '请输入您的用户名或注册邮箱' },
				'password' : { 'req=密码' : '请输入密码', 'minlen=6' : '输入密码需在6位到32位间', 'maxlen=32' : '输入密码需在6位到32位间' }
			},
			showStyle = {
				'showmsgbyline=msg_error' : '',
		    	'showmsgforsubmit=login_btn_wrap' : cbk
			},
			opts = {
				'success' : 'span=msg_ok',
				'error': 'span=msg_err',
				'isExist' : {
					'mlsUser' : function(cbk){
						if($.trim($('#mlsUser').val()) == ''){
							cbk('账号不能为空。');
						}else{
							cbk('');
						}
					},
					'password' : function(cbk){
						if($.trim($('#password').val()) == ''){
							cbk('密码不能为空。');
						}else{
							cbk('');
						}
					}
				}
			};

		validateIns = validate.validate(formName, validateRules, showStyle, opts);
	}

	function runCode(){
		//更新验证码
		checkcode();
		var isDelay;
		$('.checkImage').click(function(){
			if(isDelay) return;

			checkcode();

			isDelay = 1;
			setTimeout(function(){
				isDelay = 0;
			},500);
		});
	}

	function addCodeValidate(){
		if(authCodeIns.isShow() && validateIns){
			validateIns.addValid({
				'checkcode' : {'req=验证码':'请输入验证码', 'minlen=4':'验证码为4位字符'}
			});

			runCode();
		}
	}

	function commLogin(){
		var pconf = {
			placeholderCSS : {
				'line-height' : '34px'
			}
		}
		$('#loginForm input[placeholder]').placeholder(pconf);

		//表单操作
		formValidate(function(){
			checkLoginPass('#mlsUser','#password','#checkcode','#savestate');
		});

		//内部判断是否需要增加验证码验证
		addCodeValidate();
	}

	function pullCaptcha(cb){
		$.post('/aw/user/captcha',function(data){
			cb && cb(data);
		},'json');
	}

	var showLogin = function(){

		storage.setCookie('LOGON_FROM' ,  document.referrer);

		$('.more_way_wrap h4').click(function(){
			$(this).next('.more_way').toggle();
		});

		commLogin();
	};

	var showLoginForm = function(){

		formFrameExist = true;
		//先判断是否需要验证码
		pullCaptcha(function(data){
			if(data.need_captcha == 1){
				authCodeIns.show();
			}

			commLogin();
		});
		//先单独绑定发log
		$('.login_btn_wrap').click(function(){
			logTrack.cr('login_window_others-btnlogin');
		});
	}

	var showLoginWin = function(opt){
		if(Meilishuo.config.is_iPad){
			/* for iPad */
			window.MLS = {
				didLogin : function() {
					window.location.reload();
				}
			};
			return window.location.href = 'meilishuohd://login.meilishuo/';
		}
		var opts = opt || {};
		//判断来源
		var logcr = '';
		var session = opts.refer_type || storage.getCookie('MEILISHUO_REFER');
		if(session == 'weibo'){
			logcr = 'sina';
			var tpl = shareTmp("loginSina");
		}else if(session == 'gdt.qq'){
			logcr = 'qq';
			var tpl = shareTmp("loginQQ");
		}else if(session == 'renren'){
			logcr = 'renren';
			var tpl = shareTmp("loginRenren");
		}else if(session == 'others'){
			logcr = 'others';
			var tpl = shareTmp("loginTpl");
		}else{
			logcr = 'others';
			var tpl = shareTmp("loginTpl");
		}

		//关闭发统计
		var _close = opts.onClose;
		opts.onClose = function(){
			logTrack.cr('login_window_others-close');
			_close && typeof _close == 'function' && _close();
		}

		var html = tpl;
		loginDialog = new dialog({title : "登录" , width : opts.width || 620 , content : html , onStart : function(){ } , onClose : opts.onClose });

		opts.fn && opts.fn(loginDialog)

		if(opts.param && typeof opts.param == 'object'){
			logTrack.cr('login_window_'+logcr,opts.param);
		}else{
			logTrack.cr('login_window_'+logcr);
		}

		if(session !== 'weibo' && session !== 'gdt.qq' && session !== 'renren'){
			if( $('.login_wrap .login_form_wrap').length == 0 ){
				//先判断是否需要验证码
				pullCaptcha(function(data){
					if(data.need_captcha == 1){
						authCodeIns.show();
					}

					commLogin();
				});
				//先单独绑定发log
				$('.login_btn_wrap').click(function(){
					logTrack.cr('login_window_others-btnlogin');
				});
			}

			$('.more_tip').click(function(){
				$(this).next('.more_way').toggle();
				logTrack.cr('login_window_others-more');
			});

			$('.douban,.baidu').hover(function(){
				$(this).children('.msg').show();
			},function(){
				$(this).children('.msg').hide();
			});
		}
	};

	var showGoodsLoginWin = function(refer_type){
		showLoginWin({
			'onClose' : closeIframe
			,'refer_type':refer_type
		});
	};

	var showCheckCode = function(cbk){
		var html = shareTmp("checkCodeTpl");
		loginDialog = new dialog({title : "获取短信验证码" , width : 430 , content : html });

		runCode();

		$('.submitCode').click(function() {
			validateCode(cbk);
			return false;
		});
	};

	var validateCode = function(cbk){
		var url = '/user/reg/validate';
		var code = $.trim($('#checkcode').val());
		if(!code){
			cbk();
			return;
		}
		var data = {
			rule : 'captcha',
			data : code
		};
		var callback = function(res){
			var isPass;
			if(res == 6){
				cbk(res,null);
				//console.log('验证码错误。');
			}else if(res == 0){
				isPass = true;
				cbk(res,data.data);
				//console.log('正确。');
			}
			if(isPass){
				$('#closeDialog').trigger('click');
			}
		};
		$.post(url , data , callback ,'json');
	};

	exports.showLogin = showLogin;
	exports.showLoginWin = showLoginWin;
	exports.showGoodsLoginWin = showGoodsLoginWin;
	exports.showCheckCode = showCheckCode;
	exports.showLoginForm = showLoginForm;
});


