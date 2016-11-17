fml.define('wap/page/sq/bind' , ['wap/zepto/fastclick', 'wap/app/forminput', 'component/urlHandle', 'wap/ui/alert'] , function(require){
	var forminput = require('wap/app/forminput')
		, urlHandle = require('component/urlHandle')
	    , input_ids = ['username', 'pwd']
	    // , checkcode = require('wap/app/checkcode')
	    , Alert = require('wap/ui/alert')

	if (fml.vars.e_msg) {
		var e_msg =  new Alert({
			content : fml.vars.e_msg
			, onSure : function(){
				urlHandle.redirect('/sq/bind');
			}
		});
	};
	var init = function(){
		forminput.init(input_ids);
		// checkcode.initCode({'is_store':false,'link_change':true});
		$('.bind_btn').bind('click', bindSubmit);
	}

	var bindSubmit = function(){
		var username = $('#username').val();
		var pwd = $('#pwd').val();
		// var code = $('#checkcode').val();
		$('.err_msg').text('');

		if(username == ''){
			$('.err_msg').text('用户名不能为空');
			return;
		}

		if(pwd == ''){
			$('.err_msg').text('密码不能为空');
			return;
		}

		// if(code == ''){
		// 	$('.err_msg').text('验证码不能为空');
		// 	return;
		// }
		
		var url = '/aj/sq/change_bind';
		var data = {
			'login_name' : username
			, 'password' : pwd
			// , 'checkcode': code
		};
		var callback = function(r){
			if(r.error_code) {
				$('.err_msg').text(r.message);
				// console.log(r.message);
				// checkcode.changeCode();
				return;
			} 
			else{
				var a =  new Alert({
					content : '绑定成功'
					, onSure : function(){
						urlHandle.redirect('/sq/user/');
					}
				});
			}	
		}
		$.post(url , data , callback ,'json');
	}

	init();
});