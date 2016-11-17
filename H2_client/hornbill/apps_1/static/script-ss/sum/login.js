fml.define('sum/login' , ['jquery','component/storage','component/focus'] , function(require , exports){
	var $ = require('jquery');	
	var input = require('component/focus');
	var storage = require('component/storage');
	var showLoginWin = function(){
		if(Meilishuo.config.headTag == 'connect'){
			input.inputFocus('#mlsUser');	
			$('#vmPass').focus(function(){
				$(this).hide();	
				$('#mlsPass').show();
				$('#mlsPass').focus();
			});
			$('#mlsPass').blur(function(){
				if($(this).val() == ""){
					$('#vmPass').show();
					$(this).hide();
				}
			});
			checkLogin('.loginBtn','#mlsUser','#mlsPass');
		}else if(Meilishuo.config.headTag == 'success'){
			window.external.setuserinfo(Meilishuo.config.base64);
			closeWin();
		}else{
			closeWin();
		}
		window.external.setwindowsize(450,300);
	};
	var checkLogin = function(obj,user,pass){
		$(obj).bind("click",function(){
			var username = $(user).val();
			var password = $(pass).val();
			var url = '/app/360/log_on';	
			var data = {'username':username,'token':password};
			if(username && password){
			//	$(this).val('登录中...');
				var callback = function(r){
					switch(r.status){
						case -1 : 
							$(".loginErrorMessage").html("账号或密码验证错误，请重新输入").show();
							break;
						case -3 :
							$(".loginErrorMessage").html("账户还在审核中").show();
							break;
						default :
							window.external.setuserinfo(r.base64);
							break;
					}
				}
				$.post(url , data , callback ,'json');
			}else{
				$(".loginErrorMessage").html("账号或密码验证错误，请重新输入").show();
			}
		});		
	};
	var closeWin = function(){
		$('.closeBtn').bind('click',function(){
			window.external.CloseWindow();
			/*
			var browserName = navigator.appName;
			if (browserName=="Netscape"){
				window.open('','_self','');
				window.close();
			}else if (browserName == "Microsoft Internet Explorer"){
				window.close();
			} 
			*/
		});
	};
	exports.showLoginWin = showLoginWin;
});
