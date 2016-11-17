fml.define("wap/page/activity/crest", ["wap/zepto", "wap/ui/alert", "wap/zepto/touch", "wap/zepto/scroll", "wap/component/lazyLoad"], function(require, exports) {
	var lazyLoad = require("wap/component/lazyLoad");
	lazyLoad.load($(".bs_load_img"), "asrc");
	var Alert = require('wap/ui/alert');
	var a = function(msg) {
		return new Alert({
			content: msg
		});
	};
	// 缓存变量
	var luckNumObj = $("#luckNum").find("b"),
		btnLuck = $("#btnLuck"),
		btnRules = $("#btnRules"),
		rulesBox = $("#rulesBox"),
		popup = $("#popup"),
		popup2 = $("#popup2"),
		cover = $("#cover"),
		gotop = $("#gotop"),
		luckName = $("#luckName"),
		luckPhone = $("#luckPhone"),
		luckAddress = $("#luckAddress"),
		luckPostcode = $("#luckPostcode");
	// gotop
	(function() {
		function isFade() {
			document.body.scrollTop > 100 ? gotop.show() : gotop.hide();
		}
		isFade();
		document.onscroll = isFade;
		gotop.off("click").on("click", function() {
			$('html,body').scrollTo({
				endY: 0,
				updateRate: 5
			});
		});
	})()
	// 显示抽奖活动规则
	btnRules.off("tap").on("tap", function() {
		function ani(obj, h, callback) {
			obj.animate({
				height: h
			}, 200, "linear", callback);
		}
		if (rulesBox.hasClass("rules-show")) {
			ani(rulesBox, "0px", function() {
				rulesBox.hide().removeClass("rules-show");
			});
		} else {
			rulesBox.show();
			ani(rulesBox, "320px", function() {
				rulesBox.addClass("rules-show");
			});
		}
	})
	// 关闭弹窗
	popup.find(".btn").off("tap").on("tap", function() {
		if ($(this).attr("href") == "javascript:;") {
			cover.hide();
			popup.hide();
		}
	})
	// 弹出层函数
	function popupFun(data) {
		popup.find(".title").text(data.title);
		popup.find(".icon").attr("src", data.src);
		popup.find(".btn").text(data.btn);
		cover.show();
		popup.show();
	}
	//避免登录成功返回后要刷新页面才能点击抽奖
	window.MLS = {
		didLogin: function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	// 点击抽奖按钮
	btnLuck.off("tap").on("tap", function() {
		event.preventDefault();
		//没下载客户端（考虑微信浏览器打开分享的链接时，跳转到APP）
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
			var data = {
				title: "我勒个去~扭蛋机睡着了！快下载美丽说客户端叫醒它！",
				src: "http://i.meilishuo.net/css/images/wap/crest/icon-s.png",
				btn: "下载客户端",
				href: "http://m.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(location.href),
				des: "立即下载客户端，每天3次抽奖机会，缤纷好礼等你来拿！"
			}
			popup.find(".des").text(data.des);
			popup.find(".btn").attr("href", data.href);
			popupFun(data);
		}
		// 没登录跳转到登录页
		if (!fml.vars.isLogin) {
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		// 获取弹出层的信息及减去抽奖次数
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/aj/crest/getLuckInfo",
			timeout: 5000,
			success: function(data) {
				if (data.code == 0) {
					luckNumObj.text(data.data.left_count);
					if (data.data.prize_code == "code") {
						cover.show();
						popup2.show();
					} else {
						if (data.data.left_count == 0) {
							popupFun({
								"title": "今天的抽奖机会用完啦！明天再来拼一拼！",
								"btn": "明日再来",
								"src": "http://i.meilishuo.net/css/images/wap/crest/icon-c.png"
							});
						} else {
							popupFun({
								"title": "再来一次！加油么么哒！",
								"btn": "再来一次",
								"src": "http://i.meilishuo.net/css/images/wap/crest/icon-s.png"
							});
						}
					}
				} else {
					a("请求失败，请重新试下！");
				}
			},
			error: function(error) {
				a("系统繁忙，请重新试下！");
			}
		});
	})
	// 提交地址
	popup2.find(".btn").off("tap").on("tap", function() {
		// 没登录跳转到登录页
		if (!fml.vars.isLogin) {
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		if (luckName.val() == "" || luckPhone.val() == "" || luckAddress.val() == "" || luckPostcode.val() == "") {
			a("信息填写不完整！");
			return;
		}
		var data = {
			"actName": "成就臻品白富美 美白神器0元起",
			"real_name": luckName.val(),
			"address": luckAddress.val(),
			"mobile_phone": luckPhone.val(),
			"qq": luckPostcode.val()
		}
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/aj/crest/postUserInfo",
			data: data,
			timeout: 5000,
			success: function(data) {
				if (data.code == 0) {
					popup2.hide();
					cover.hide();
					popupFun({
						"title": "提交成功，炫白美齿神器收入囊中！恭喜你成功晋级臻品白富美！",
						"btn": "关闭",
						"src": "http://i.meilishuo.net/css/images/wap/crest/icon-s.png"
					});
				} else {
					a("提交信息错误，请重新试下！");
				}
			},
			error: function(error) {
				a("提交失败，请重新试下！");
			}
		});
	})
});