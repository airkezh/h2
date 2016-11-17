/*common*/	
return function(sendMessage){
	window.MLS.onUploadComplete = function(res){ 
		var data = JSON.parse(res)
			, $dialogBox = userListObj[fml.vars.im.toid].mainBox.find('.im_dialog')
		if(data.code == 1){
			var opts = {
				type : 'img'
				, content : data
				, dialogBox : $dialogBox 
			}
		    var $msg = sendMessage(opts)
			$msg.appendTo($dialogBox)
			$msg[0].scrollIntoView()

		} else {
			alert(data.msg);
		}
	}
}
