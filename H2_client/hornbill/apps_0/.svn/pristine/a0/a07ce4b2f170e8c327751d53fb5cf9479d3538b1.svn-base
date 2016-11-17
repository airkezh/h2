/*common*/
require('wap/zepto/fastclick');
var shareWX = require('wx/share');
var tracking = require('wap/app/tracking');
var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger') != -1;

// 微信浏览器分享
var shareLink = fml.vars.share.link + "?from_id=" + fml.vars.useid;

//埋点
function triggerFun() {
	tracking.cr('10w_tshirt', {
		'area': 'wechat',
		'action': 'share'
	})
	// fml.emit('Sense_shareNums', {
	// 	'area': 'wechat',
	// 	'action': 'share'
	// });
}

function shareWx(callback) {
	if (weixinBrowser) {
		shareWX.bind({
			'title': fml.vars.share.title,
			'desc': fml.vars.share.des,
			'imgUrl': fml.vars.share.pic,
			'link': shareLink,
			'success': callback,
			'trigger': function() {
				triggerFun();
			}
		});
	}
}

// 规则
var btnRules = $('#btn-rules'),
	rulesBox = $('#rulesBox'),
	closeRules = $('#closeRules'),
	dialog = $('#onsaleDialog');

function rules() {
	btnRules.on('click', function() {
		rulesBox.show();
		dialog.show();
	})
	closeRules.on('click', function() {
		rulesBox.hide();
		dialog.hide();
	})
}


exports.shareWx = shareWx;
exports.rules = rules;
exports.weixinBrowser = weixinBrowser;