/*common*/	
require('jquery')
var shareTmp = require('component/shareTmp')
	, storage = require('component/storage')
	, validate = require('component/validate')
	, checkcode = require('app/im/checkcode')
	, savepass = require('app/im/savepass')
	, urlHandle = require('component/urlHandle')
	, client = require('app/im/client')

var urlParam = urlHandle.getParams(location.href)

var changeCode = checkcode.changeCode
	, initCode = checkcode.initCode
	, to_url = urlParam.morf==='simple'?'/www/simple/': (urlParam.morf=== 'buyer_platform' ? '/www/buyer_platform_im/':'/www/')
	, imUrl = fml.vars.im.toid ? (to_url+'?toid='+fml.vars.im.toid) : to_url
var checkLogin = function(user,pass,checkcode){
	var url = '/www/aw/logon'; 
	var data = {
		'login_name' : $(user).val(),
		'password' : $(pass).val()
		,'nt': Meilishuo.config.nt
	};
	data.checkcode = checkcode ? $(checkcode).val() : '';
	data.save_state = 1 

	if(fml.vars.im.imClient){
		if($('#savepassword')[0].checked | 0){
			savepass.password({
				'login_name' : data.login_name	
				, 'password' : data.password
			})
			
		}else{
			savepass.remove({
				'login_name' : data.login_name	
			})
		}
	}

	var callback = function(r){
		if(r.status == 1){
			if(fml.vars.im.imPCClient){
				window.external.GetCookie()	
				
			}else{
				window.location.href = imUrl
			}

		}else if(r.status == -21){
			window.location.reload();
		}else{
			var msg = '';
			if(r.status == 6)
				msg = "请正确输入验证码"
			else if(r.status == -1)
				msg = "账号或密码验证错误，请重新输入"
			else if(r.status == -3)
				msg = "账户还在审核中"
			else if(r.status == -4)
				msg = "账号被删除"
			else if(r.status == -11)
				msg = "密码输入错误10次，回忆一下，30分钟后再来试试"
			else if(r.status == -12)
				msg = "密码错误，您还可尝试" + r.remain + "次"
			else if(r.status == -13)
				msg = "休息一下~一会儿继续"
			else
				if(r.message)
					msg = r.message

			changeCode();
			$(".loginErrorMessage").html(msg).show();
		}
	}
	$.post(url , data , callback ,'json');
};
//表单操作
var formValidate = function(cbk){
	var formName = 'loginForm',
		validateRules = {
			'mlsUser' : { 'req=注册时使用的邮箱/昵称' : '请输入您的用户名或注册邮箱' }
			, 'password' : { 'minlen=1' : '请输入密码' }
			, 'checkcode' : { 'minlen=4' : '请输入验证码' }
		},
		showStyle = {
			'showmsgbyone=loginBtn.loginErrorMessage' : cbk
		},
		opts = {};
	validate.validate(formName, validateRules, showStyle, opts);
};
var showLogin = function(){
	$.get('/www/aw/userInfo', {}, function(res){
		if(res.user_id == 0){
			$('.loginForm').fadeIn()
		}else{
			$('.loginUser').html(shareTmp('user_item', res))
				.fadeIn()
		}
	}, 'json')

	storage.setCookie('LOGON_FROM' ,  document.referrer);
	if(fml.vars.im.imClient){
		savepass.init('#mlsUser','#mlsPass');
		client.setLink()
	}else{
		savepass.clean()	
	}
	//验证码
	initCode();
	//表单操作
	formValidate(function(){
		checkLogin('#mlsUser','#mlsPass','#checkcode');
	});
	$('.login')
		.on('click', '#reLoginBtn', function(){
			$(this).text('登录中...')
			if(fml.vars.im.imPCClient){
				window.external.GetCookie()	
				
			}else{
				window.location.href = imUrl
			}
		})
		.on('click', '#changeBtn', function(){
			$('.loginUser').fadeOut(function(){
				$('.loginForm').fadeIn()
			})
		})
};
showLogin();
