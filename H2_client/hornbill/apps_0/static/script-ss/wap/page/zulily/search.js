/*common*/
require('wap/zepto/fastclick');
var appShare = require('wap/app/appShare'),
	onscroll = require('wap/component/windowScroll'),
	openAppLink = require('wap/app/openAppLink'),
	openApp = require('wap/app/openApp');

//缓存变量
var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	gotopObj = $('.top-box').find('.gotop');

if (weixinBrowser != -1) {
	openApp('http://mapp.meilishuo.com/zulily');
}
// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

/*gotop*/
gotopObj.on("click", function(e) {
	document.body.scrollTop = 0
});
onscroll.bind(gotop, 'gotop');

function gotop(pos, isDown) {
	if (pos < 30) {
		// btnPersonal.css('bottom', '20px');
		gotopObj.hide()
	} else {
		// btnPersonal.css('bottom', '70px');
		gotopObj.show()
	}
};