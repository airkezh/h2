/*common*/
var shareJs = require('wap/page/onSale/shareJs');

var btn = $('#btn'),
	shareImg = $('#shareImg'),
	dialog = $('#onsaleDialog');

//分享成功的回调
shareJs.shareWx(function() {
	fml.emit('Sense_shareNums', {
		'area': 'wechat',
		'action': 'share'
	});
	$.get('/aj/onSale/save', {
		'clothes_id': fml.vars.clothes_id,
		'from_id': fml.vars.from_id
	}, function(res) {
		switch (res.code) {
			case 0:
				window.location = "http://m.meilishuo.com/onSale/nums?from_id=" + fml.vars.from_id;
				break;
			case 1:
				window.location = "http://m.meilishuo.com/onSale/late?status=0&from_id=" + fml.vars.from_id;
				break;
			case 2:
				window.location = "http://m.meilishuo.com/onSale/phone?status=0&from_id=" + fml.vars.from_id;
				break;
		}
	}, 'json');
});
// 弹层
btn.on('click', function() {
	if (shareJs.weixinBrowser) {
		dialog.show();
		shareImg.show();
	}
});
dialog.on('click', function() {
	$(this).hide();
	shareImg.hide();
});