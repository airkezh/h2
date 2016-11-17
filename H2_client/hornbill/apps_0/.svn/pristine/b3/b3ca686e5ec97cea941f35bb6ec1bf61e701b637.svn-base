/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var openAppLink = require('wap/app/openAppLink'),
	onscroll = require('wap/component/windowScroll'),
	api = require('component/callApi'),
	openApp = require('wap/app/openApp'),
	shareTmp = require('wap/component/shareTmp');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	tabBox = $('#tab'),
	tabNew = $('#tabNew'),
	topBox = $('.top-box'),
	qunquanBox = $('#qunquanBox'),
	gotopObj = topBox.find('a'),
	btnCoupons = $('.btnCoupons'),
	prveTab = $('.prveTab'),
	nextTab = $('.nextTab'),
	prevTabNew = $('#prevTabNew'),
	nextTabNew = $('#nextTabNew'),
	personal = tabBox.find('.personal'),
	love_num = tabBox.find('#love_num');
if (weixinBrowser != -1) {
	openApp('http://mapp.meilishuo.com/zulilyOld?trace_id=' + fml.vars.trace_id);
}
/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
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


//解决新版APP挡住返回顶部和分享
if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
	var bottomOffset = parseInt(topBox.css('bottom'));
	topBox.css('bottom', bottomOffset + 50 + "px");
	$('.starBox .share_ico').css('padding-bottom', "50px");
}
// tab吸顶
if (!hasSticky()) {
	var tabBoxOffset = tabBox.offset().top;
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > tabBoxOffset) {
			tabBox.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
		} else {
			tabBox.css({
				'position': 'static'
			});
		}
	});
}

function redirectFun(obj, webUrl, isAppurl) {
	var url = "";
	var host = "http://mapp.meilishuo.com";
	if (obj.hasClass('cur')) {
		return;
	}
	var inAppTabbarStr = "";
	if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
		inAppTabbarStr = "&&inAppTabbar=1";
	}
	if (isAppurl && Meilishuo.config.os.mlsApp) {
		url = openAppLink.getAppLink({
			'protocol': 'openURL',
			'param': {
				"url": host + webUrl + inAppTabbarStr
			}
		})
	} else {
		url = webUrl + inAppTabbarStr;
	}
	window.location.href = window.__get_r(url, fml.vars.common_r);
};
// 个人中心页
personal.click(function() {
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	//埋点
	var stat_red_point = "";
	if (fml.vars.doneNum) {
		stat_red_point = '&stat_red_point=1';
	} else {
		stat_red_point = '&stat_red_point=0';
	}

	love_num.hide();
	redirectFun($(this), "/zulilyOld/personal/?frm=list_bottom_left_heart" + stat_red_point, true);
});
// 待我挑选
prveTab.click(function() {
	redirectFun($(this), "/zulilyOld/?showTab=1&trace_id=" + fml.vars.trace_id, false);
});
// 火热开售
nextTab.click(function() {
	redirectFun($(this), "/zulilyOld/?showTab=0&trace_id=" + fml.vars.trace_id, false);
});
// 当日上新
// prevTabNew.click(function() {
// 	redirectFun($(this).find('a'), "/zulilyOld/?showNewTab=0&isScroll=1&trace_id=" + fml.vars.trace_id, false);
// });
// // 往日热卖
// nextTabNew.click(function() {
// 	redirectFun($(this).find('a'), "/zulilyOld/?showNewTab=1&isScroll=1&trace_id=" + fml.vars.trace_id, false);
// });
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
/*优惠券领取部分*/
btnCoupons.on('click', function() {
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	var self = $(this);
	var tpl = "";
	var coupon_apply_code = $(this).attr('code');
	$.get('/aj/zulilyOld/coupon', {
		'coupon_apply_code': coupon_apply_code
	}, function(res) {
		if (res.error_code == 0) {
			var date = res.data.coupon_valid_time_range;

			function getDate(isStart) {
				var str = isStart ? date.start_time : date.expire_time;
				var dateStr = str.replace(/\d*-/, '');
				var formatDate = dateStr.substring(0, dateStr.lastIndexOf(':'));
				return formatDate;
			}
			var time = '有效期：' + getDate(true) + ' - ' + getDate(false);
			self.find('span').removeClass('yes').addClass('no').html('已经领取');
			self.removeClass('btnCoupons').off('click');
			tpl = shareTmp('coupon_alert', {
				'isSuccess': true,
				'use_time': time,
				'text': self.find('.title').text() + "<br>在desire卖场全场通用哦！"
			});
		} else {
			var tpl = shareTmp('coupon_alert', {
				'isSuccess': false,
				'text': res.message
			});
		}
		$('body').append(tpl);
		show_mask();
	}, 'json');
});
var close_alert = function() {
	$('.mask').remove();
}
var show_mask = function() {
	$('.close_btn').off('click', close_alert).on('click', close_alert);
	$('.mask').on('touchmove', function(e) {
		e.preventDefault();
		return false;
	});
};
// 群圈
qunquanBox.find('a').on('click', function() {
	var circle_id = $(this).data('id');
	if (Meilishuo.config.os.mlsApp) {
		var url = openAppLink.getAppLink({
			'protocol': 'circle',
			'param': {
				"circle_id": circle_id
			}
		});
		window.location.href = window.__get_r(url, qunquanBox.data('xr'));;
	} else {
		var params = {
			"circle_id": circle_id,
			"r": qunquanBox.data('xr')
		};
		openApp('meilishuo://circle.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(params)));
	}
});