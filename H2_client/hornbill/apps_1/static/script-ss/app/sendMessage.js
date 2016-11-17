fml.define('app/sendMessage' , ['jquery'], function(require , exports){
	var $ = require('jquery');
	var sendMessage = function(toNickName , toMsgCont , toTipBox , close , showCode){
		var username = $(toNickName).val();
		var usertext = $(toMsgCont).val();
		var tipBox = $(toTipBox);
		var checkCode = $('.checkCodeText').val();
		var errorMsg = '';
		var url = '/aj/msg/send_msg'; 
		var data = {'pmsg_sendto' : username , 'pmsg_text' : usertext  , 'checkcode' : checkCode };
		var callback = function(response){
			switch(response.message) {
				case 2:
					errorMsg='';
					alert('由于您目前处于禁言状态，按照社区的规则，您不能发送私信给任何人，如果想解除禁言状态，请向kefu@meilishuo.com发送邮件提交申请，感谢您的支持');
					break;
				case 3:
					errorMsg = '传送的数据不全';
					break;
				case 4:
					errorMsg = '用户昵称不存在';
					break;
				case 5:
					errorMsg='不允许发送站外链接!';
					break;
				case 6:
					errorMsg = '含有屏蔽词';
					break;
				case 7:
					errorMsg = '验证码错误';
					showCode();
					break;
				case 9:
					errorMsg = '只有相互关注才能发私信';
					break;
				default:
					errorMsg = '发送私信成功';
					window.setTimeout(function(){
						close();
					},2000);
			}
			tipBox.html(errorMsg).show();
		}
		tipBox.html('上传中...').show();
		$.post(url,data,callback , 'json');
	};
	exports.sendMessage = sendMessage;
});
