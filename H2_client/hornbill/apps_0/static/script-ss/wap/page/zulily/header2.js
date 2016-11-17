/*common*/
require('wap/zepto/fastclick');

var onscroll = require('wap/component/windowScroll'),
	// appShare = require('wap/app/appShare'),
	appIcon = require('wap/app/appIcon'),
	openApp = require('wap/app/openApp'),
	openAppLink = require('wap/app/openAppLink');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	tab = $('#tab'),
	win = $(window),
	searchBox = $('#searchBox'),
	searchBoxShow = $('#searchBoxShow'),
	gotopObj = $('.top-box').find('a');
var requestAnimationFrame = win[0].requestAnimationFrame ||
	win[0].webkitRequestAnimationFrame ||
	win[0].mozRequestAnimationFrame ||
	oldStyleMove;
var tabOffset = tab.offset().top;
requestAnimationFrame(function() {
	tabOffset = tab.offset().top;
})

var openAppCon = location.search.match(/openApp=\d+/gi);
if (!!openAppCon && weixinBrowser != -1) {
	openApp('http://mapp.meilishuo.com/zulily');
}

// 客户端类型的分享（客户端右上角）
// if (fml.vars.appShare) {
// 	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
// }
if (fml.vars.appShare) {
	var appOpts = {
		'share': {
			'param': fml.vars.params,
			'channels': ['weixin', 'weixin_timeline']
		},
		'cart': true
	}
	appIcon(appOpts);
}

tab.find('a').on('click', function() {
	var self = $(this);
	if (self.hasClass('cur')) {
		return;
	}
	if (self.hasClass('login') && fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	window.location.href = window.__get_r(self.data('url'), self.data('xr'));
})

/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};

// 判断时候支持position：sticky
function hasSticky() {
	// CSS.supports('(position:-webkit-sticky) or (position:-moz-sticky) or (position:-o-sticky) or (position:-ms-sticky) or (position:sticky)');
	var element = document.createElement('div');
	if ('position' in element.style) {
		element.style['position'] = '-webkit-sticky';
		element.style['position'] = '-moz-sticky';
		element.style['position'] = '-o-sticky';
		element.style['position'] = '-ms-sticky';
		element.style['position'] = 'sticky';
		return element.style['position'] === '-webkit-sticky' || element.style['position'] === '-moz-sticky' || element.style['position'] === '-o-sticky' || element.style['position'] === '-ms-sticky' || element.style['position'] === 'sticky'
	} else {
		return false;
	}
}

// tab吸顶
if (!hasSticky()) {
	win.scroll(function() {
		var t = $(window).scrollTop();
		if (t > 0) {
			searchBox.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
			searchBoxShow.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
			tab.css({
				'position': 'fixed',
				'left': 0,
				"top": tabOffset + 'px'
			});
		} else {
			searchBox.css({
				'position': 'static'
			});
			searchBoxShow.css({
				'position': 'static'
			});
			tab.css({
				'position': 'static'
			});
		}
	});
}
/*gotop*/
gotopObj.on("click", function(e) {
	document.body.scrollTop = 0
});
onscroll.bind(gotop, 'gotop');

function gotop(pos, isDown) {
	if (pos < 30) {
		gotopObj.hide()
	} else {
		gotopObj.show()
	}
};