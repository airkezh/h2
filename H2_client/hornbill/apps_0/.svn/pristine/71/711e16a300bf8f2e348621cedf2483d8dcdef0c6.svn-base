/*common*/
var $ = require('wap/zepto'),
	shareTmp = require('wap/component/shareTmp'),
	pin = require('wap/component/wapfall'),
	timedown = require('wap/app/doota/timedown'),
	scroll = require('wap/component/windowScroll'),
	touchSlide = require('wap/app/touchSlide'),
	menu = require('wap/page/tuan/tabSlide'),
	lazy = require('wap/component/lazzyLoad'),
	countdow = require('wap/app/countdown2'),
	Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
	,
	$pullUp = $('.pullUp'),
	$check = $('.select'),
	$imageSlide = $('#imageSlide'),
	$bannerBox = $('#bannerBox'),
	$gotop = $('.gotop'),
	$applyBtn = $('#applyBtn'),
	$addrArea = $("#addrArea"),
	$edit_address = $("#edit_address");

//window.MLS = {
//	'onPickAddress': function(res) {
//		if (res) {
//			var info = res.info;
//			var address = {
//				'nickname': info['nickname'],
//				'phone': info['phone'],
//				'street': info['address']
//			};
//			$("#addrArea").html(shareTmp('addressTmp', address));
//		}
//	}
//};
//$("#addrArea").on("click", function() {
//location.href = 'meilishuo://pick_address.meilishuo'
//});

var welfare = {
	init: function() {
		this.eventInit();
	},
	eventInit: function() {
		var _this = this;
		var activID = fml.vars.activity_id;
		var shopId = fml.vars.shopId;
		if (shopId) {
			$.get('/aj/m_welfare/wlf_shop_info', {
				"shop_id": shopId
			}, function(res) {
				if (res) {
					res = JSON.parse(res);
					$("#shopNick").html(res.shop_nick);
					if (res.isFollowing == "0") {
						//未关注isFollowing
						$("#btnAttention").addClass("yellow").html("马上关注");
					} else if (res.isFollowing == "1") {
						$("#btnAttention").addClass("white").html("已关注");
					}
				}
			});
		}
		$addrArea.html(shareTmp('addressTmp', fml.vars.address_str));
		$check.on("click", function() {
			var flag = $(this).attr("class");

			if ($(this).hasClass("check")) {
				$(this).removeClass("check").addClass("nocheck");
			} else if ($(this).hasClass("nocheck")) {
				$(this).removeClass("nocheck").addClass("check");
			}
		});
		//点击地址进行提示
		//		$("#addrArea").on("click", function() {
		//			//location.href = 'meilishuo://pick_address.meilishuo'
		//			var real_name = $("#applyName").html();
		//			var telephone = $("#applyPhone").html();
		//			var address = $("#applyAddr").html();
		//			if (real_name == "" || telephone == "" || address == "") {
		//				var dData = {
		//					"title": "温馨提示",
		//					"con": "请到用户中心填写或修改默认地址～～"
		//				}
		//				var dialog = shareTmp("dialogTips", dData);
		//				$("body").append(dialog);
		//				$(".btnKnow").on("click", function() {
		//					$(".dialog_box").remove();
		//				});
		//			}
		//		});
		$applyBtn.on("click", function() {
			var real_name = $("#applyName").html();
			var telephone = $("#applyPhone").html();
			var address = $("#applyAddr").html();
			var remarks = $("#txt_remarks").val();
			//alert(remarks);
			if (real_name == "" || telephone == "" || address == "") {
				var dData = {
					"title": "温馨提示",
					"con": "您现在还没有地址，<br/>请添加编辑添加地址"
				}
				var dialog = shareTmp("dialogTips", dData);
				$("body").append(dialog);
				$(".btnKnow").on("click", function() {
					$(".dialog_box").remove();
				});
				//$("#btnKnow").attr("href", "meilishuo://pick_address.meilishuo");
			} else {
				/*添加喜欢数 wch add 15.7.22*/
				if (fml.vars.productId != 0) {
					var data = {
						stid: fml.vars.productId
					};
					$.post('/aw/twitter/like', data, function(res) {});
				}
				/*添加喜欢数 wch add 15.7.22 end*/
				$.post('/aj/m_welfare/wlf_apply', {
					"activity_id": activID,
					"real_name": real_name,
					"telephone": telephone,
					"address": address,
					"note": remarks
				}, function(res) {
					if (res.code == "200") {
						var dData = {
							"title": "申请已经提交",
							"con": "请耐心等待审核"
						}

						var dialog = shareTmp("dialogTips", dData);
						$("body").append(dialog);
						$("#btnKnow").attr("href", "/m_welfare");
					} else if (res.code == "400") {
						var dData = {
							"title": "申请失败",
							"con": "请联系花小美反馈问题哦～～"
						}
						var dialog = shareTmp("dialogTips", dData);
						$("body").append(dialog);
						$("#btnKnow").attr("href", "/m_welfare");
					}
				}, 'json');
				$("#btnKnow").on("click", function() {
					$(".dialog_box").remove();
				});
			}
			/*关注花小美*/
			if ($check.length == 2) {
				$.post('/aj/m_welfare/attention_follow', {
					"fuid": "34143831"
				}, function(res) {
					if (res.status == 1) {}
				}, 'json');
			}
			/*关注花小美end*/
		});
		$("#btnAttention").on("click", function(event) {
			if ($("#btnAttention").hasClass("yellow")) {
				$.get("/aj/m_welfare/wlf_attention_shop", {
					"shop_id": shopId
				}, function(res) {
					if (res.code == "0") {
						$("#btnAttention").removeClass("yellow").addClass("white").html("已关注");
					} else {
						$("#btnAttention").removeClass("yellow").addClass("white").html("关注失败");
					}
				}, 'json');
			}

			return false;
		});

		/*编辑地址*/
		$("#edit_address").on("click", function() {
			var nickName = $("#applyName").html(),
				applyPhone = $("#applyPhone").html(),
				applyAddr = $("#applyAddr").html();
			var addresObj = {
				"nickname": nickName,
				"phone": applyPhone,
				"street": applyAddr
			}
			var dialog = shareTmp("edit_add_wrap", addresObj);
			$("body").append(dialog);
			$("#submitAdr").on("click", function() {
				$(".addressErrorMessage").html("");
				var addressUserStr = $("#addressUser").val();
				var validatePhoneOrMobileStr = $("#validatePhoneOrMobile").val();
				var addressStreetStr = $("#addressStreet").val();
				var reg = new RegExp('^1[3|4|5|8][0-9]\\d{4,8}$');
				var tips = "";
				if (!addressUserStr.length) {
					tips = "您还没填写收货人姓名哦。";
					$(".addressErrorMessage").html(tips);
					return;
				}
				if (!validatePhoneOrMobileStr.length) {
					tips = "您还没有填写联系电话哦。";
					$(".addressErrorMessage").html(tips);
					return;
				}
				if (reg.test(validatePhoneOrMobileStr) == false||validatePhoneOrMobileStr.length!=11) {
					tips = "联系电话格式不正确。";
					$(".addressErrorMessage").html(tips);
					return;
				}
				if (!addressStreetStr.length) {
					tips = "您还没有填写详细地址哦。"
					$(".addressErrorMessage").html(tips);
					return;
				}
				tips = "填写成功！";
				$("#applyName").html(addressUserStr);
				$("#applyPhone").html(validatePhoneOrMobileStr);
				$("#applyAddr").html(addressStreetStr);
				$(".addressErrorMessage").html(tips);
				$(".dialog_box").remove();

			});
		});

		/*编辑地址－end*/

	}

};
welfare.init();