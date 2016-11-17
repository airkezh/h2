/*common*/

require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	openAppLink = require('wap/app/openAppLink'),
	// appShare = require('wap/app/appShare'),
	appIcon = require('wap/app/appIcon'),
	openApp = require('wap/app/openApp'),
	lazyLoad = require('m/component/lazyLoad'),
	onscroll = require('wap/component/windowScroll'),
	posterWall = require('wap/app/posterWalls6');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	wrap = $('#wrap'),
	bigBox = $('#bigBox'),
	content = $('#content'),
	topBox = $('.top-box'),
	gotopObj = topBox.find('a'),
	limit = 6;

// openApp(location.href);

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

//一进页面加载数据
getWall(2, '/aj/zulily/Style_paonan_list?cid=' + fml.vars.cid + '&limit=' + limit, 'posterWall', true);

wrap.on('click', '#btnAll', function() {
	window.location.href = window.__get_r('http://mapp.meilishuo.com/zulily', $(this).data('xr'));
})

//拉取瀑布流
function getWall(colNum, url, tmp, showBtn) {
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		showBtnText: 'DESIRE卖场 查看更多',
		filterFun: function(res) {
			return res.data.list
		},
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: '.lazy_pic'
		})
	}
	posterWall.scroll(date);
};

/*获取higo链接*/
function getHigoUrl(ele, index) {
	var url = ele.data('url'),
		title = ele.data('title'),
		r = '_page_id=1110001:_page_area=top:_pos_id=' + index + ':_pos_name=' + title + ':_ext_event_id=' + fml.vars.cid;
	if (!url) {
		return;
	}
	if (Meilishuo.config.os.mlsApp) {
		if (!url.match(/meilishuo:\/\//g)) {
			url = openAppLink.getAppLink({
				'protocol': 'openURL',
				'param': {
					'url': url,
					'inApp': '1'
				}
			})
		}
	}
	window.location.href = window.__get_r(url, r);
}
bigBox.on('click', 'a', function() {
	var self = $(this);
	var index = self.parents('li').index();
	getHigoUrl(self, index);
})


/*获取单品页链接*/
function getDoneUrl(ele) {
	var twitter_id = parseInt(ele.data('twitter_id')),
		Url = '';
	if (Meilishuo.config.os.mlsApp) {
		Url = openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		});
	} else if (weixinBrowser != -1) {
		Url = '/wx/detail?tid=' + twitter_id;
	} else {
		Url = '/share/item/' + twitter_id;
	}
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr') + ':cid=' + fml.vars.cid);
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this));
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