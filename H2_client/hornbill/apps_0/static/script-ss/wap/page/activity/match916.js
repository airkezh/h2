fml.define("wap/page/activity/match916", ["wap/zepto", "wap/ui/alert", "wap/zepto/touch", "wap/zepto/scroll", "wap/component/lazyLoad"], function(require, exports) {
	var lazyLoad = require("wap/component/lazyLoad"),
		Alert = require("wap/ui/alert");
	// 缓存变量
	var gotop = $("#gotop"),
		navA = $(".nav").find("a"),
		linkA = $(".pro-box").find("a");
	lazyLoad.load($(".bs_load_img"), "asrc");
	var a = function(msg, callback) {
		return new Alert({
			content: msg,
			onSure: function() {
				callback && callback();
			}
		});
	};
	window.MLS = {
		didLogin: function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	// gotop
	(function() {
		function isFade() {
			document.body.scrollTop > 50 ? gotop.show() : gotop.hide();
		}
		isFade();
		document.addEventListener("scroll", isFade, false);
		gotop.off("click").on("click", function() {
			$('html,body').scrollTo({
				endY: 0,
				updateRate: 5
			});
		});
	})();
	// 定位导航
	window.onload=function(){
		var nav = $(".nav");
		var isScroll = false,
			navOffset = nav.offset().top;
		var fixedNav = $("<div id='fixedNav'></div>");
		fixedNav.append(nav.clone(true));
		fixedNav.css({
			"position": "fixed",
			"top": "0px",
			"left": "0px",
			"z-index": "100",
			"width":"100%"
		});
		function isFade() {
			if (!isScroll && document.body.scrollTop > navOffset) {
				isScroll = true;
				$("body").append(fixedNav);
			}
			if (isScroll && document.body.scrollTop <= navOffset) {
				fixedNav.remove();
				isScroll = false;
			}
		}
		document.addEventListener("scroll", isFade, false);
	};
	// tab
	(function() {
		navA.removeClass("cur");
		switch (cur) {
			case 1:
				navA.eq(0).addClass("cur");
				navA.eq(3).addClass("cur");
				break;
			case 2:
				navA.eq(1).addClass("cur");
				navA.eq(4).addClass("cur");
				break;
			case 3:
				navA.eq(2).addClass("cur");
				navA.eq(5).addClass("cur");
				break;
		}
	})();
	//链接
	linkA.off("click").on("click", function(event) {
		// 没登录跳转到登录页
		if (!fml.vars.isLogin) {
			event.preventDefault();
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		// 不是最新版本
		if (!fml.vars.isNewest) {
			event.preventDefault();
			a("你的版本太旧了，先升级再查看吧！", function() {
				window.location.href = "http://m.com";
			});
			return;
		}
	})
});