/*common*/
var shareJs = require('wap/page/onSale/shareJs');

var btn = $('#btn'),
	dialog = $('#onsaleDialog'),
	shareImg = $('#shareImg');

//分享
shareJs.shareWx();
//规则
shareJs.rules();
// 弹层
btn.on('click', function() {
	if (shareJs.weixinBrowser) {
		dialog.show();
		shareImg.show();
	}
});
dialog.on('click', function() {
	if ($('#rulesBox').css('display')!='block') {
		$(this).hide();
	}
	shareImg.hide();
});