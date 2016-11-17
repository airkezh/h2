fml.define('app/letters' , ['jquery','app/sendMessage','component/regString' ,'app/login','component/shareTmp','ui/dialog'] , (require , exports) ->
	$ = require('jquery');
	shareTmp = require('component/shareTmp');
	dialog = require('ui/dialog');
	login = require('app/login');
	regString = require('component/regString');
	send = require('app/sendMessage');
	() ->
		$("#sendPrivateLetter").live () -> 
			if Meilishuo.config.user_id == 0 
				login.showLoginWin();
				return false;
			showCode();
			html = shareTmp("loginMessage");
			close = new dialog({title : "发送私信" , width : 470 , content : html });
			$(".toNickName").val $(this).attr 'name';
			$('.codeimg').bind('click' , () -> 
				showCode();
			);
			$(".sendsubmit").bind('click' , () ->
				if $('.toMsgCont').val() == ''
					errorMsg = '内容不能为空';
					$('.tipBox').html errorMsg.show();
					return false;
				if $('.checkCodeText').val() == ''
					errorMsg = '验证码不能为空';
					$('.tipBox').html errorMsg.show();
					reutrn false;
				if !regString.WidthCheck($('.toMsgCont').val() , 200)
					$('.tipBox').html('您输入的字数超过200字').show();
					reutrn false;
				send.sendMessage('.toNickName','.toMsgCont','.tipBox' , () -> close.drive.destroyModel());
			);
			showCode = () ->
				url = '/server/ajax_changeCheckCode';
				data = {};
				callback = (response) ->
					$('.codeimg').html response;
				$.post(url , data , callback);
);
