/*common*/

/*此模板将来改成支持任意Tab数量，支持banner多图轮播，瀑布流完成后是否支持显示按钮（文字，链接）,是否支持分享*/

require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	openAppLink = require('wap/app/openAppLink'),
	lazyLoad = require('m/component/lazyLoad'),
	// appShare = require('wap/app/appShare'),
	appIcon = require('wap/app/appIcon'),
	timedown = require("wap/app/doota/timedown"),
	onscroll = require('wap/component/windowScroll'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	win = $(window),
	countdown = $('#countdown'),
	tabNew = $('#tabNew'),
	content = $('#content'),
	prevTabNew = $('#prevTabNew'),
	nextTabNew = $('#nextTabNew'),
	specialTabNew = $('#specialTabNew'),
	topBox = $('.top-box'),
	gotopObj = topBox.find('a'),
	limit = 6;
var requestAnimationFrame = win[0].requestAnimationFrame ||
	win[0].webkitRequestAnimationFrame ||
	win[0].mozRequestAnimationFrame ||
	oldStyleMove;
var scrollHeight = 0,
	countdownHeight = 0;
requestAnimationFrame(function() {
	countdownHeight = countdown.height();
	scrollHeight = tabNew.offset().top - countdownHeight * 2;
	if (hasSticky()) {
		scrollHeight = tabNew.offset().top - countdownHeight;
	}
})
location.hash = location.hash ? location.hash : '#tab1';
//一进页面加载数据
loadFun(location.hash);
//webview前进后退的时候触发，默认锚点的时候，浏览器的前进和后退时页面是不变的
window.addEventListener('hashchange', function() {
	if ($('.pullUp').attr('status') != 'loading') {
		$('body')[0].scrollTop = scrollHeight;
		resetPostwall();
		loadFun(location.hash);
	}
}, false)

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

function loadFun(hash) {
	tabNew.find('div').removeClass('cur');
	var index;
	if (hash == '#tab1') {
		prevTabNew.addClass('cur');
		index = 0;
	} else if (hash == '#tab2') {
		nextTabNew.addClass('cur');
		index = 1;
	} else {
		specialTabNew.addClass('cur');
		index = 2;
	}
	getWall(2, '/aj/zulily/Style_push_page?cid=' + fml.vars.cid + '&page_type=list' + '&limit=' + limit + '&tab=' + index, 'posterWall', true, fml.vars.more_title);
}

//tab click
prevTabNew.on('click', function() {
	tabFun($(this), '#tab1');
})
nextTabNew.on('click', function() {
	tabFun($(this), '#tab2');
})
specialTabNew.on('click', function() {
	tabFun($(this), '#tab3');
})
wrap.on('click', '#btnAll', function() {
	window.location.href = window.__get_r(fml.vars.more_url, fml.vars.common_r_XR);
})

// tabFun
function tabFun(self, hash) {
	if (self.hasClass('cur')) {
		return;
	}
	if ($('.pullUp').attr('status') != 'loading') {
		location.hash = hash;
		$('body')[0].scrollTop = scrollHeight;
		resetPostwall();
		loadFun(hash);
	}
};

//重置瀑布流
function resetPostwall() {
	content.find('.pullUp').remove();
	content.find('#btnAll').remove();
	content.append('<div class="pullUp" status="loading"></div>');
	content.find('.goods_wall').height('0px').html('');
}

//拉取瀑布流
function getWall(colNum, url, tmp, showBtn, showBtnText) {
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		showBtnText: showBtnText,
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

// 判断是否支持position：sticky
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
};
// tab吸顶
if (!hasSticky()) {
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > 0) {
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
		if (t > scrollHeight) {
			tabNew.css({
				'position': 'fixed',
				'left': 0,
				"top": countdownHeight
			});
		} else {
			tabNew.css({
				'position': 'static'
			});
		}
	});
} else {
	tabNew.css('top', countdown.height());
}

/*获取单品页链接*/
function getDoneUrl(ele) {
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
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr') + ':cid=' + fml.vars.cid);
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this));
})

// 倒计时
var t_container = $('.q8_ltime'),
	_day = $('#day'),
	_hour = $('#hour'),
	_minu = $('#minu'),
	_sec = $('#sec');
timedown.down(t_container, t_container.attr('stime'), '0d-0h-0i-0s', ['<b>%v</b>', '<b>%v</b>', '<b>%v</b>', '<b>%v</b>']).onAction(function() {
	var t = arguments[2];
	day = t.d ? (t.d < 10 ? "0" + t.d : t.d) : "00";
	hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
	minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
	sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
	if (_day.html() != day) {
		_day.html(day);
	}
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
	// window.location.reload();
	$('#countdown').find('.ctl').html('活动结束').css({
		'font-size': '1.6rem',
		'color': '#f00',
		'line-height': '32px'
	});
}).correct();

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