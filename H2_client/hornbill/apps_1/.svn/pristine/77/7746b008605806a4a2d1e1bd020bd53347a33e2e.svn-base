fml.define('app/guestbook' , ['jquery','app/sendMessage','app/login','component/shareTmp','component/dialog'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var login = require('app/login');
	var send = require('app/sendMessage');
	return function(){
		$(".showSendPmsgBox").bind("click",function(){
			if(Meilishuo.config.user_id == 0){
				login.showLoginWin();
				return false;
			}
			var html = shareTmp("loginMessage");
			var close = dialog.meiliDialog({dialogTitle : "发送私信" , dialogWidth : 470 , dialogContent : html })
			$(".toNickName").val("美丽客服精灵");
			$(".sendsubmit").bind("click",function(){
				send.sendMessage('.toNickName','.toMsgCont','.tipBox' , close);	
			});			
		});
	}
});
