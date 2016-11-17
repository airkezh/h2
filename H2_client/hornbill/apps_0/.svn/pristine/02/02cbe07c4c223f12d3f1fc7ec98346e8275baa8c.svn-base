/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
var upload = require('wap/client/component/clientUse');
var btn = $("#btn"),
	box = $("#box");

function uploadCallback(data, btn, num) {
	// alert(JSON.stringify(data))
	// box.append("<img src='" + data.H_pic_url + "' >")
	if (box.find('img').length < num) {
		box.append("<img src='" + data.o_pic_url + "' >");
		upload.callClient.bindUpload(btn, function(data, btn) {
			uploadCallback(data, btn, num)
		});
	}
	// box.append("<img src='" + data.pic_url + "' >")
}
upload.callClient.bindUpload(btn, function(data, btn) {
	uploadCallback(data, btn, 6)
});