/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	appShare = require('wap/app/appShare'),
	lazyLoad = require('m/component/lazyLoad'),
	tracking = require('wap/app/tracking'),
	timedown = require("wap/app/doota/timedown"),
	openAppLink = require('wap/app/openAppLink'),
	onscroll = require('wap/component/windowScroll'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	limit = 5,
	time = $('.time'),
	countdown = $('#countdown'),
	gotopObj = $('.top-box').find('a');

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

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

// 倒计时吸顶
if (!hasSticky()) {
	var countdownOffset = countdown.offset().top;
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t >= countdownOffset) {
			countdown.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
		} else {
			countdown.css({
				'position': 'static'
			});
		}
	});
}

// 倒计时
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
	window.location.reload();
}).correct();

//一进页面加载数据
getWall(1, '/aj/zulily/Style_special_offer_list?limit=' + limit, 'posterWall', true);

wrap.on('click', '#btnAll', function() {
	window.location.href = window.__get_r('/zulily/allList/', $(this).data('xr'));
})

//拉取瀑布流
function getWall(colNum, url, tmp, showBtn) {
	// var lazy_pic = colNum == 1 ? '.lazy_pic_big' : '.lazy_pic';
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		showBtnText: '查看全部商品&gt;&gt;',
		filterFun: function(res) {
			return res.data
		},
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: '.lazy_pic'
		})
	}
	posterWall.scroll(date);
};


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

/*获取单品页链接*/
function getDoneUrl(ele, isBtn) {
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
	if (isBtn) {
		tracking.cr('desire_buy_btn_click', {
			'area': 'list_done',
			'twitter_id': twitter_id
		});
	} else {
		tracking.cr('desire_done_twitter_click', {
			'area': 'list_done',
			'twitter_id': twitter_id
		});
	}
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr'));
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})