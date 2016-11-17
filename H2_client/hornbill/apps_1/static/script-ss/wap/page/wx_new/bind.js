fml.define('wap/page/wx_new/bind' , ['wap/zepto/touch', 'wap/app/forminput', 'wap/app/checkcode', 'component/urlHandle', 'wap/ui/alert'] , function(require){
	var forminput = require('wap/app/forminput')
		, urlHandle = require('component/urlHandle')
	    , input_ids = ['username', 'pwd']
	    , checkcode = require('wap/app/checkcode')
	    , Alert = require('wap/ui/alert')

	var init = function(){
		forminput.init(input_ids);
		checkcode.initCode({'is_store':false,'link_change':true});

		$('.bind_btn').bind('tap', bindSubmit);
	}

	var bindSubmit = function(){
		var username = $('#username').val();
		var pwd = $('#pwd').val();
		var code = $('#checkcode').val();
		$('.err_msg').text('');

		if(username == ''){
			$('.err_msg').text('用户名不能为空');
			return;
		}

		if(pwd == ''){
			$('.err_msg').text('密码不能为空');
			return;
		}

		if(code == ''){
			$('.err_msg').text('验证码不能为空');
			return;
		}
		
		var url = '/aj/wx_new/change_bind';
		var data = {
			'login_name' : username
			, 'password' : pwd
			, 'checkcode': code
		};
		var callback = function(r){
			//alert(JSON.stringify(r))
			if(r.err_code) {
				$('.err_msg').text(r.msg);
				checkcode.changeCode();
				return;
			} 
			else {
				var a =  new Alert({
					content : '绑定成功'
					, onClose : function(){
						urlHandle.redirect('/wx/user/');
					}
				});
			}	
		}
		$.post(url , data , callback ,'json');
	}

	init();
});