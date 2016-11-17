/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	// appShare = require('wap/app/appShare'),
	appIcon = require('wap/app/appIcon'),
	openApp = require('wap/app/openApp'),
	onscroll = require('wap/component/windowScroll'),
	lazyLoad = require('m/component/lazyLoad'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	win = $(window),
	wrap = $('#wrap'),
	gotopObj = $('.top-box').find('.gotop'),
	content = $('#content'),
	posterWall2 = $('.posterWall2'),
	searchBox = $('#searchBox'),
	searchBoxShow = $('#searchBoxShow'),
	keyword = fml.vars.keyword,
	flag = 'list',
	limit = 6;

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

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazyLoad.init({
	'xpath': '.lazy_pic'
});
lazy_pic.load();
lazy_pic.scroll();

//一进页面加载数据
if (fml.vars.num >= 6) {
	getWall(2, '/aj/desire/search/list?__get_r=1&limit=' + limit + '&flag=' + flag + '&key_word=' + keyword, 'posterWall', false);
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


// 判断时候支持position：sticky
function hasSticky() {
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

// search吸顶
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
		} else {
			searchBox.css({
				'position': 'static'
			});
			searchBoxShow.css({
				'position': 'static'
			});
		}
	});
}

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
		filterFun: function(res) {
			return res.data.search;
		},
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};


/*获取单品页链接*/
function getDoneUrl(ele, par) {
	var twitter_id = parseInt(ele.data('twitter_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
	window.location.href = window.__get_r(Url, ele.parents(par).data('xr'));
}
content.on('click', '.salelUrl', function() {
	getDoneUrl($(this), '.frame');
});
posterWall2.on('click', '.salelUrl', function() {
	getDoneUrl($(this), 'ul');
});