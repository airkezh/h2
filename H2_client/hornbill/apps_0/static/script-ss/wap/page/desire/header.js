/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var openAppLink = require('wap/app/openAppLink'),
	onscroll = require('wap/component/windowScroll'),
	api = require('component/callApi'),
	openApp = require('wap/app/openApp'),
	shareTmp = require('wap/component/shareTmp');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	topBox = $('.top-box'),
	tabBox = $('#tab'),
	gotopObj = topBox.find('a'),
	prveTab = $('#prev'),
	nextTab = $('#next'),
	btnCoupons = $('.btnCoupons');
if (weixinBrowser != -1) {
	openApp('http://mapp.meilishuo.com/desire?trace_id=' + fml.vars.trace_id);
}
/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};

//解决新版APP挡住返回顶部和分享
if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
	var bottomOffset = parseInt(topBox.css('bottom'));
	topBox.css('bottom', bottomOffset + 50 + "px");
	$('.starBox .share_ico').css('padding-bottom', "50px");
}
// tab吸顶
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
//
function redirectFun(obj, webUrl) {
	var url = "";
	var host = "http://mapp.meilishuo.com";
	if (obj.hasClass('cur')) {
		return;
	}
	var inAppTabbarStr = "";
	if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
		inAppTabbarStr = "&inAppTabbar=1";
	}
	url = webUrl + inAppTabbarStr;
	window.location.href = url;
};
// 当日上新
prveTab.click(function() {
	redirectFun($(this).find('a'), "/desire/?trace_id=" + fml.vars.trace_id);
});
// 往日热卖
nextTab.click(function() {
	redirectFun($(this).find('a'), "/desire/?showTab=1&trace_id=" + fml.vars.trace_id);
});
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
	$.get('/aj/desire/coupon', {
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
$('#qunquanBox').find('a').on('click', function() {
	var circle_id = $(this).data('id');
	if (Meilishuo.config.os.mlsApp) {
		var url = openAppLink.getAppLink({
			'protocol': 'circle',
			'param': {
				"circle_id": circle_id
			}
		});
		window.location.href = url;
	} else {
		openApp('meilishuo://circle.meilishuo?json_params=%7B%22circle_id%22%3A%22' + circle_id + '%22%7D');
	}
});