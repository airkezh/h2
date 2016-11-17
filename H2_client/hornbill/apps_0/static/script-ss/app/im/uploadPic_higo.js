/*common*/
var uploadBtn = require('ui/uploadBtn')
	, alert = require('ui/alert')
	, info = require('app/im/info')

var co = (function(cookie){
	//cookie.setDomain(".meilishuo.com");
	var arr = cookie.split(";");
	var cookies = {};
	for(var i = 0; i < arr.length; i++){
		var key = arr[i].split("=")[0].replace(/(^\s*)|(\s*$)/g, "");
		var value = arr[i].split("=")[1].replace(/(^\s*)|(\s*$)/g, "");
		cookies[key] = value;
	}
	return cookies;
})(document.cookie);

exports.bind = function($mainBox, sendMessage, socket){
	uploadBtn.bind($mainBox.find('.uploadImg') , {
		//'behind' : '/imageupload/pic_upload'
		//'behind' : 'http://v.higo.meilishuo.com/image/upload'
		'behind' : '/higo/imageupload?token='+co.im_id
		,'success' : function(data){
			console.log('uploadPic success data=',data);
			if (data.code == 0) {

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
	console.log('uploadPic send data=',data);
	var opts = {
		type : 'higo_img'
		, content : data.data
		, dialogBox : $dialog
	}

	var $msg = sendMessage(opts)
}
exports.send = send
