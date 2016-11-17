fml.define('app/letter' , ['jquery','app/checkcode', 'app/sendMessage', 'component/regString' ,'app/login','component/shareTmp','ui/dialog'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var login = require('app/login');
	var regString = require('component/regString');
	var send = require('app/sendMessage');
	var checkcode = require('app/checkcode');
	return function(obj){
		$(obj).live("click",function(){
			if(Meilishuo.config.user_id == 0){
				login.showLoginWin();
				return false;
			}
			var html = shareTmp("loginMessage");
			var close = new dialog({title : "发送私信" , width : 470 , content : html })
			$(".toNickName").val($(this).attr('name'));
			showCode();
			$('.codeimg').bind('click' , function(){
					showCode();
			});
			$(".sendsubmit").bind("click",function(){
				if($('.toMsgCont').val() == ''){
					var errorMsg = '内容不能为空';
					$('.tipBox').html(errorMsg).show();
					return false;	
				}
				if($('.checkCodeText').val() == '' && Meilishuo.config.user_id !=219){
					var errorMsg = '验证码不能为空';
					$('.tipBox').html(errorMsg).show();
					return false;	
				}
				if(!regString.WidthCheck($('.toMsgCont').val() , 200)){
					$('.tipBox').html('您输入的字数超过200字').show();
					return false;
				}
				send.sendMessage('.toNickName','.toMsgCont','.tipBox' , function(){close.drive.destroyModel()} , showCode);	
			});			
			function showCode(){
				checkcode(function(){
				});
			}
		});
	}
});
