/*common*/
require('wap/zepto/fastclick');

var timedown = require("wap/app/doota/timedown"),
	lazyLoad = require('wap/component/lazzyLoad'),
	tracking = require('wap/app/tracking'),
	// poster = require('wap/app/posterPa'),
	// posterWall = require('wap/app/posterWalls6'),
	openAppLink = require('wap/app/openAppLink');

var time = $('.time'),
	wrap = $('#wrap'),
	linkBox = $('#linkBox'),
	content = $('#content'),
	newList = $('#newList'),
	hotSale = $('#hotSale'),
	catalogBox = $('#catalogBox'),
	limit = 6;

/* lazyLoad load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazyLoad.init({
	'xpath': '.lazy_pic_big,.lazy_pic'
});
lazy_pic.scroll();
lazy_pic.load();


// 倒计时
function timedownFun() {
	var t_container = $('.q8_ltime'),
		_hour = $('#hour'),
		_minu = $('#minu'),
		_sec = $('#sec');
	timedown.down(t_container, t_container.attr('stime'), '0h-0i-0s', ['<b>%v</b>', '<b>%v</b>', '<b>%v</b>']).onAction(function() {
		var t = arguments[2];
		hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
		minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
		sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
		if (_hour.html() != hour) {
			_hour.html(hour);
		}
		if (_minu.html() != minu) {
			_minu.html(minu);
		}
		if (_sec.html() != sec) {
			_sec.html(sec);
		}
	}).onTimeOver(function() {
		$.ajax({
			type: 'get',
			dataType: 'json',
			url: '/aj/zulily/Style_home_express',
			data: {
				'page_name': 'entrance'
			},
			success: function(data) {
				$('#timeBox').attr('stime', data && data.data.endtime);
				timedownFun();
			}
		})
	}).correct();
}
timedownFun();


//加载数据潮流热销的数据
// getWall(2, '/aj/zulily/Style_express_list?limit=' + limit + '&cid=13259', 'posterWall', true);
// var win = $(window),
// 	isFirst = true;
// win.on('scroll', function() {
// 	if (isFirst) {
// 		var t = win.scrollTop(),
// 			h = win.height(),
// 			o = hotSale.offset().top;
// 		if (t + h >= o) {
// 			getWall(2, '/aj/zulily/Style_express_list?limit=' + limit + '&cid=13259', 'posterWall', true);
// 			isFirst = false;
// 		}
// 	}
// })

//拉取瀑布流
// function getWall(colNum, url, tmp, showBtn) {
// 	// var lazy_pic = colNum == 1 ? '.lazy_pic_big' : '.lazy_pic';
// 	poster.set({
// 		colNum: colNum
// 	});
// 	var date = {
// 		url: url,
// 		poster: poster,
// 		tmp: tmp,
// 		showBtn: showBtn,
// 		showBtnText: '查看全部商品&gt;&gt;',
// 		filterFun: function(res) {
// 			return res.data
// 		},
// 		posterMargin: $('#content').offset().top,
// 		marginOffset: 1000,
// 		lazyLoad: lazyLoad.init({
// 			xpath: '.lazy_pic_big,.lazy_pic'
// 		})
// 	}
// 	posterWall.scroll(date);
// };

/*获取单品页链接*/
function getDoneUrl(ele, isBtn, parentsEle) {
	var style_id = parseInt(ele.data('styleId')),
		twitter_id = parseInt(ele.data('twitter_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
	if (isBtn) {
		tracking.cr('desire_buy_btn_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	} else {
		tracking.cr('desire_done_twitter_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	}
	window.location.href = window.__get_r(Url, ele.parents(parentsEle).data('xr'));
}
newList.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false, 'ul');
})
hotSale.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false, '.frame');
})


// wrap.on('click', '#btnAll', function() {
// 	window.location.href = window.__get_r('/zulily/allList/', $(this).data('xr'));
// })

/*打开链接*/
function redirectUrl(ele, href) {
	var xr = ele.data('xr');
	href = 'http://' + window.location.host + href;
	var Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
		'protocol': 'openURL',
		'param': {
			'url': href,
			'inApp': '1'
		}
	}) : href;
	window.location.href = window.__get_r(Url, xr);
}

function clickFun(ele) {
	redirectUrl(ele, ele.data('url'));
}
// 入口的链接
linkBox.on('click', 'a', function() {
	clickFun($(this));
});
// 查看全部新品
wrap.on('click', '.btn-newList', function() {
	clickFun($(this));
});
// 查看全部商品
wrap.on('click', '.btn-all', function() {
	clickFun($(this));
});
//首页最下面4块
catalogBox.on('click', 'a', function() {
	clickFun($(this));
});