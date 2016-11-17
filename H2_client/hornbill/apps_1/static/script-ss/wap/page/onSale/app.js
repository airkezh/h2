/*common*/
var shareJs = require('wap/page/onSale/shareJs'),
	openApp = require('wap/app/openApp');
//
var btn = $('#btn');
//分享
shareJs.shareWx();
//规则
// shareJs.rules();
//app
btn.on('click', function() {
	//埋点
	fml.emit('Sense_downNums', {
		'area': 'to_app',
		'action': 'click'
	});
	//openApp
	openApp('meilishuo://open.meilishuo');
})