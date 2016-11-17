fml.define("wap/page/activity/weixinLuck", ["wap/zepto", 'wap/app/openApp','wap/zepto/fastclick', "wap/app/doota/timedown", "wap/zepto/touch", "wap/zepto/scroll", "wap/component/shareTmp", "wap/ui/alert",'component/wxstorage','wap/app/dialog'], function(require, exports) {
	var shareTmp = require("wap/component/shareTmp");
	var timedown = require("wap/app/doota/timedown");
	var openApp = require('wap/app/openApp');
	var Alert = require("wap/ui/alert");
	var storage = require('component/wxstorage')
	var a = function(msg, callback) {
		return new Alert({
			content: msg,
			onSure: function() {
				callback && callback();
			}
		});
	};
	var wrap = $("#wrap");
	var isAuto = false;
	//一进页面渲染不同的模块
	(function() {
		// 已经过期
		if (isPastData.code == 0) {
			renderFun(["pastHeaderTpl", "pastContentTpl", "luckListContentTpl"], isPastData);
			return;
		}
		// 已经抢光
		if (isEmptyData.code == 0) {
			renderFun(["emptyHeaderTpl", "emptyContentTpl", "luckListContentTpl"], isEmptyData);
			return;
		}
		// 之前抢过
		renderFun(["getHeaderTpl", "getContentTpl", "luckListContentTpl"], isSameData);
		//if (isGetData.code == 1) {
			// 是同一个红包
			if (isSameData.code == 1) {
				renderFun(["getHeaderTpl", "getContentTpl", "luckListContentTpl"], isSameData);
			} else {
				isAuto = true;
				getLuckPhp({
					"bid": batchId,
					"mobile": isSameData.mobile
				});
			}
			//return;
		//}
		// 之前没抢过
		//renderFun(["defaultHeaderTpl", "defaultContentTpl"], isGetData);
	})();
	//获取验证码接口
	function verificationCodePhp(postData) {
		ajaxFun("GET", "json", postData, "/aj/weixinLuck/verificationCodePhp", function(data) {
			a(data.message);
		})
	}
	//抢红包的接口
	function getLuckPhp(postData) {
		ajaxFun("GET", "json", postData, "/aj/weixinLuck/getLuckPhp", function(data) {
			if (data.code == 1 || data.code == 2) {
				renderFun(["getHeaderTpl", "getContentTpl", "luckListContentTpl"], data);
			} else {
				a("请求失败，请重新试下！");
			}
		})
	}
	//自动跳转的函数
	function autoR(autoRData) {
		isModifyRender = true;
		var newData = "";
		ajaxFun("GET", "json", autoRData, "/aj/weixinLuck/getLuckPhp", function(data) {
			if (data.code == 1 || data.code == 2) {
				newData = data;
			} else {
				a("请求失败，请重新试下！");
			}
		});
		setTimeout(function() {
			renderFun(["getHeaderTpl", "getContentTpl", "luckListContentTpl"], newData);
			$("body").css("background", "#ffefdf");
		}, 1000)
	}
	var isModifyRender = false;
	//判断是否是美丽说账户的接口
	function isMeilishuoUserPhp(status, postData) {
		if (status == 0) {
			ajaxFun("GET", "json", postData, "/aj/weixinLuck/isMeilishuoUserPhp", function(data) {
				//是美丽说账户直接抽奖
				if (data.code == 2) {
					getLuckPhp({
						"bid": batchId,
						"mobile": data.mobile
					});
				} else if (data.code == 3) {
					var vval = $("#defaultContent").find(".phone-input").val();
					renderFun(["defaultHeaderTpl", "defaultContent2Tpl"], data);
					$("#defaultContent2").find(".phone-input").val(vval);
				} else {
					a("请求失败，请重新试下！");
				}
			})
		} else if (status == 1) {
			ajaxFun("GET", "json", postData, "/aj/weixinLuck/isMeilishuoUserPhp", function(data) {
				//是美丽说账户直接修改手机号码
				if (data.code == 2) {
					modifyRender("modifyContent3Tpl");
					//成功后跳转
					autoR(postData);
				} else if (data.code == 3) {
					var vval = $("#modifyContent").find(".phone-input").val();
					modifyRender("modifyContent2Tpl");
					$("#modifyContent2").find(".phone-input").val(vval);
				} else {
					a("请求失败，请重新试下！");
				}
			})
		}
	}
	// 注册账号的接口
	function registerUserPhp(status, postData, subPostData) {
		var vatInput = $("input.vat-input");
		if (vatInput.val() == "") {
			a("验证码不能为空！");
			return;
		}
		if (vatInput.val().length < 6) {
			a("验证码长度应为6位！");
			return;
		}
		if (status == 0) {
			ajaxFun("POST", "json", postData, "/aj/weixinLuck/registerUserPhp", function(data) {
				if (data.code == 0) {
					//创建账户成功后自动抽奖
					getLuckPhp(subPostData);
				} else {
					a(data.message);
				}
			})
		} else if (status == 1) {
			ajaxFun("POST", "json", postData, "/aj/weixinLuck/registerUserPhp", function(data) {
				//修改号码成功后
				if (data.code == 0) {
					modifyRender("modifyContent3Tpl");
					//成功后跳转
					autoR(subPostData);
				} else {
					a(data.message);
				}
			})
		}
	}
	//通用Ajax函数
	function ajaxFun(method, dataType, data, url, callback) {
		var vatInput = $("input.vat-input"),
			normalinput = $("input").not(vatInput),
			inputPhone = $("input.phone-input"),
			mtinput = $("input.mtinput");
		if (!isModifyRender) {
			for (var i = 0, len = normalinput.size(); i < len; i++) {
				if (normalinput.eq(i).val() == "") {
					a("输入框不能为空！");
					return;
				}
			}
		}
		var isPhone = /^1[3|4|5|8][0-9]\d{8}$/.test(inputPhone.val());
		if ((!isAuto) && (!isModifyRender) && (!isPhone)) {
			a("手机号码不正确！");
			return;
		}
		if (mtinput.size() > 0 && (mtinput.val().length < 6 || mtinput.val().length > 32)) {
			a("密码长度须为6到32位！");
			return;
		}
		$.ajax({
			type: method,
			dataType: dataType,
			url: url,
			data: data,
			timeout: 5000,
			success: function(data) {
				callback(data);
			},
			error: function(error) {
				a("系统繁忙，请重新试下！");
			}
		});
	}
	// 获取验证码函数
	function getCaptcha(obj) {
		obj.each(function() {
			$(this).off("tap").on("tap", function() {
				var self = $(this);
				verificationCodePhp({
					"mobile": self.parent().prev().prev().val()
				});
			})
		});
	}
	// 定义渲染模块函数
	function renderFun(obj, data) {
		var tplHeader = "",
			tplContent = "",
			tplList = "";
		tplHeader = shareTmp(obj[0], data.headerData);
		tplContent = shareTmp(obj[1], data.contentData);
		if (data.listData) {
			tplList = shareTmp(obj[2], data.listData);
		}
		//插入不同的模块
		wrap.empty().append(tplHeader).append(tplContent).append(tplList);
		//缓存变量
		var defaultHeader = $("#defaultHeader"),
			getHeader = $("#getHeader"),
			emptyHeader = $("#emptyHeader"),
			defaultContent = $("#defaultContent"),
			defaultContent2 = $("#defaultContent2"),
			getContent = $("#getContent"),
			emptyContent = $("#emptyContent"),
			luckListContent = $("#luckListContent"),
			btnModify = $("#btnModify"),
			getCode = $(".get-code"),
			time = $(".time"),
			nickname = $(".nickname"),
			giveone=$(".giveone");
		// 点击修改手机号按钮渲染修改手机号页面
		btnModify.off("tap").on("tap", function() {
			modifyRender("modifyContentTpl");
		});
		// 获取验证码
		getCaptcha(getCode);
		//点击"马上去抢"按钮判断是否美丽说账户
		defaultContent.find(".btn").off("tap").on("tap", function() {
			var self = $(this);
			isMeilishuoUserPhp(0, {
				"mobile": self.parent().prev().val(),
				"bid": batchId
			});
		});
		// 创建账户并存钱
		defaultContent2.find(".btn").off("tap").on("tap", function() {
			var self = $(this),
				obj = self.parent().prev();
			var mobile = obj.prev().prev().val();
			var password = obj.prev().val();
			var captcha = obj.find("input").val();
			registerUserPhp(0, {
				"type": "register_with_mobile",
				"mobile": mobile,
				"captcha": captcha,
				"password": password
			}, {
				"bid": batchId,
				"mobile": mobile
			});
		});
		//点击立即使用红包跳转到APP,并直接打开优惠券列表页
		giveone.find(".btn").off("tap").on("tap", function() {
			//没下载客户端（考虑微信浏览器打开分享的链接时，跳转到APP）
			if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
				//a("请安装美丽说客户端，用微信帐号登录查看", function() {
					openApp("meilishuo://open.meilishuo/");
					// location.href = "http://m.meilishuo.com/goto/open/?url=" + encodeURIComponent("meilishuo://coupons.meilishuo");
				//});
			}
		});
		giveone.find(".btn1").off("tap").on("tap", function() {
			a('活动已经结束');
			//window.location.href = '/activity/weixinLuck/wxRed/?bid='+batchId 
		});
		// 倒计时
		if (parseInt(time.attr('data-time')) > 0) {
			$(".time-box").show();
			time.each(function() {
				var self = $(this);
				timedown.down(this, time.attr('data-time'), 'd-0h-0i-0s', ['<b>%v</b>天', '<b>%v</b>小时', '<b>%v</b>分', '<b>%v</b>秒']).onTimeOver(function() {
					isModifyRender = true;
					ajaxFun("GET", "json", {
						"bid": batchId
					}, "/aj/weixinLuck/isPastPhp", function(data) {
						//跳转到过期页面
						if (data.code == 0) {
							renderFun(["pastHeaderTpl", "pastContentTpl", "luckListContentTpl"], data);
						}
					})
				}).onAction(function() {
					var t = arguments[2];
					day = t.d && t.d != 0 ? (t.d < 10 ? "0" + t.d + "天" : t.d + "天") : "";
					hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
					min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
					sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
					self.text(day + hour + "时" + min + "分" + sec + "秒")
				}).setHeartHum(1000);
			});
		}
		// 截取字符串
		(function() {
			nickname.each(function() {
				var str = $(this).text();
				if (str.length > 14) {
					var newStr = str.substring(0, 14) + "...：";
					$(this).text(newStr);
				}
			})
		})();
	}
	//修改手机页面里面的render
	function modifyRender(obj) {
		var phoneObj = $("#getContent").find(".red").text() || $("#modifyContent").find("input").eq(0).val() || $("#modifyContent2").find("input").eq(0).val();
		wrap.empty().append(shareTmp("modifyBoxTpl"));
		var modifyBox = $("#modifyBox");
		var data = {
			"phone": phoneObj
		};
		$("body").css("background", "#fa5b55");
		//插入模块
		modifyBox.children().eq(0).after(shareTmp(obj, data));
		//缓存变量
		var modifyContent = $("#modifyContent"),
			modifyContent2 = $("#modifyContent2"),
			getCode = $(".get-code");
		//修改手机号页面点击"确定"按钮判断是否美丽说账户
		modifyContent.find(".btn").off("tap").on("tap", function() {
			var self = $(this);
			isMeilishuoUserPhp(1, {
				"mobile": self.parent().prev().val(),
				"bid": batchId
			});
		});
		// 获取验证码
		getCaptcha(getCode);
		//修改手机号页面点击"生成账号"按钮创建美丽说账户
		modifyContent2.find(".btn").off("tap").on("tap", function() {
			var self = $(this),
				obj = self.parent().prev();
			var mobile = obj.prev().prev().val();
			var password = obj.prev().val();
			var captcha = obj.find("input").val();
			registerUserPhp(1, {
				"type": "register_with_mobile",
				"mobile": mobile,
				"captcha": captcha,
				"password": password
			}, {
				"bid": batchId,
				"mobile": mobile
			});
		});
	}
});



