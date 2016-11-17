/*common*/
var uploadBtn = require('ui/uploadBtn')
	, alert = require('ui/alert')
	, info = require('app/im/info')

exports.bind = function($mainBox, sendMessage, socket){
	uploadBtn.bind($mainBox.find('.uploadImg') , {
		'behind' : '/imageupload/pic_upload'
		,'success' : function(data){
			if (typeof data.code != 'number') {

				if(socket.disconnected){
					info.info(userListObj[toid].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')

				}else{
					send($mainBox.find('.im_dialog'), sendMessage, data)

				}
			} else {
				new alert({content:data.msg, width:370});
			}
		}
		, 'width' : 88
		,'height':'auto'
		, plusData : {im:1}
	});
}
var send = function($dialog, sendMessage, data){
	var opts = {
		type : 'img'
		, content : data
		, dialogBox : $dialog
	}
	var $msg = sendMessage(opts)
}
exports.send = send
