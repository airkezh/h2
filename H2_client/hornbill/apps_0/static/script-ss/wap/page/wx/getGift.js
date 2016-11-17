/*common*/
require("wap/zepto/fastclick");
var $ = require("wap/zepto");
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var a = function(msg) {
	return new Alert({
		content: msg
	});
};
// 打开APP
$("#js-open").on("click", function() {
	if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
		openApp("meilishuo://open.meilishuo/", "http://m.meilishuo.com/download/latest/?channel=30902");
	}
});
// 保存手机号
$("#js-phone").on("click", function() {
	var obj = $("#js-input"),
		isPhone = /^1[3|4|5|8|7|6][0-9]\d{8}$/.test(obj.val());
	if (obj.val() == "") {
		a("手机不能为空！");
		return;
	} else if (!isPhone) {
		a("手机号码不正确！");
		return;
	}
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/aj/getGift/savePhone",
		data: {
			"score": fml.vars.score,
			"award_id": fml.vars.award_id,
			"mobile": obj.val()
		},
		timeout: 5000,
		success: function(data) {
			$("#js-msg").html(data.message);
		},
		error: function(error) {
			a("系统繁忙，请重新试下！");
		}
	});
});
// 分享到朋友圈
if (window.WeixinJSBridge) {
	onBridgeReady();
} else {
	if (document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
		document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
	}
}

function onBridgeReady() {
	var appId = 'wx28b165b5a629bb11';
	var s = fml.vars.giftType ? "礼物" : "红包";
	var title = '我居然中了美丽说的圣诞' + s + '！今年还没收到礼物？你也赶紧试试！';
	var obj = {
		"appid": appId,
		"img_url": 'http://i.meilishuo.net/css/images/wap/wx/20141225/logo_new.png',
		"img_width": "640",
		"img_height": "640",
		"link": window.location.origin + '/wx/christmas',
		"desc": '小伙伴们快来试试你的手气，玩游戏就能拿圣诞惊喜！',
		"title": title
	};
	// 朋友圈
	window.WeixinJSBridge.on('menu:share:timeline', function(argv) {
		shareTimeline();
	});
	// 朋友
	window.WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		shareFriend();
	});

	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline', obj, function(res) {
			// if (res.err_msg == 'share_timeline:ok') {
			// 	window.location.href = '/wx/getGift?share=1&score=' + score
			// }
		});
	}

	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage', obj, function(res) {
			// if (res.err_msg == 'share_timeline:ok') {
			// 	window.location.href = '/wx/getGift?share=1&score=' + score
			// }
		});
	}
}
