/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	appShare = require('wap/app/appShare'),
	lazyLoad = require('m/component/lazyLoad'),
	onscroll = require('wap/component/windowScroll'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	wideLimit = 5,
	gotopObj = $('.top-box').find('a');

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

//一进页面加载数据
getWall(1, '/aj/zulily/style_special?wideLimit=' + wideLimit, 'specialPosterWall', false);


//拉取瀑布流
function getWall(colNum, url, tmp, showBtn) {
	var lazy_pic = colNum == 1 ? '.lazy_pic_big' : '.lazy_pic';
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};

// 打开专题链接
// wrap.on('click', '.special-list', function() {
// 	var self = $(this);
// 	var url = self.data('url');
// 	var xr = self.parents('.frame').data('xr');
// 	window.location.href = window.__get_r(url, xr);
// })

function getSpecialUrl(ele, href) {
	var xr = ele.parents('.frame').data('xr');
	var Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
		'protocol': 'openURL',
		'param': {
			'url': href,
			'inApp': '1'
		}
	}) : href;
	window.location.href = window.__get_r(Url, xr);
}
wrap.on('click', '.special-list', function() {
	var self = $(this);
	getSpecialUrl(self, self.data('url'));
})

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