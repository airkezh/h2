/*common*/
require('wap/zepto');
var uploadImg = require('wap/component/lark/uploadImg-compatibleApp');


var appSuccess = function(res) {
		var obj = JSON.parse(res);
		var pic_url = obj['pictures'][0]['o_pic_url'];
		$('#img2').attr('src', pic_url);
		alert('upload ok');
	},
	webSuccess = function(res) {
		var data = res;
		console.log('webSuccess',data);
		var pic_url = data['o_pic_url'];
		$('#img2').attr('src', pic_url);
	},
	appBefore = function() {
		alert('appBefore');
	},
	webBefore = function(data) {
		$('#img1').attr('src',data);
	};

var opts = {
	fileInput : 'fileInput' , //input id
	fileButton : 'fileButton' ,  //Button id
	appSuccess : appSuccess,
	webSuccess : webSuccess,
	appBefore : appBefore,
	webBefore : webBefore
}

uploadImg(opts);

