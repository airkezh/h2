/*common*/
var $ = require('jquery')
	, uiAlert = require('ui/alert')
	, Alert = function(msg){
		return new uiAlert({
			width:370,
			content:msg
		});
	}
$('.sub').on('click', function(event) {
	var mobile = $.trim($('[name=mobile]').val())
		, reason = $.trim($('[name=reason]').val())
	if(!validateEmail(mobile)){
		Alert('邮箱格式不正确');
		return;
	}
	if(!reason){
		Alert('请输入申诉理由');
		return;
	}
	var postData = {
		mobile : mobile,
		reason : reason
	}
	$.post('/aj/spam_complain/complain', postData , function(data, textStatus, xhr) {
		if(data.error_code){
			Alert(data.message);
			return;
		}
		window.location.reload()
	},'json').error(function() {
		Alert('系统错误，请重新试试');
	});;
});

function validateMobile(m){
	var re = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57])[0-9]{8}$/;
	return re.test(m)
}

function validateEmail(m){
//	var re = /\S+@\S+\.\S+/;
	var re = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return re.test(m);
}