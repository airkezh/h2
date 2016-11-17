/*common*/
var $ = require('wap/zepto'),
	shareTmp = require('wap/component/shareTmp'),
	dialog = require('wap/app/dialog'),
	touch = require('wap/zepto/touch'),
	countDown = require('wap/component/lark/countDown'),
	openApp = require('wap/app/openApp'),
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$cj_area = $("#cj_area"),
	$activityRuleBtn = $("#activityRuleBtn");

window.MLS = {
	'didLogin': function() {
		//美丽说app 登录后回调  成功登录后，返回刷新页面。
		window.location.reload();
	},
	"onPickAddress": function(res) {
		var code = res.code;
		if (code == 0) {
			var data = (fml.vars.isAndroid ? res.info : $.parseJSON(res.info)) || {},
				addr_id = data.addr_id || '',
				phone = data.phone || '',
				address = data.address || '',
				nickname = data.nickname || '',
				address = address.substr(0, 18) + '...',
				nicknameLen = nickname.length || 0,
				nickname = (nicknameLen <= 4) ? nickname : nickname.substr(0, 4) + '...',
				recordId = $('#j_prize_btn').data('recoid') || 0;

			var addressStr = "商品将发往,<br/>" + address + "<br/>" + nickname + phone;
			$("#addr_id").attr("data_id", addr_id);
			$("#user_address").html(addressStr);
			$("#upt_address").css("display", "inline-block");
			$("#ok_address").css("display", "inline-block");
			$("#add_address").css("display", "none");
		}
	}
};
var oppo = {
	init: function() {

		this.eventInit();
	},
	drawDiv: function(imgUrl) {
		var _this = this;
		$("#cj_area").children().remove();
		var content = document.getElementById("cj_area"),
			row = 3,
			col = 3,
			areaW = content.offsetWidth / col,
			areaH = content.offsetHeight / row,
			a = [];
		for (var i = 0; i < row * col; i++) {
			var oDiv = document.createElement("div");
			oDiv.style.position = "absolute";
			oDiv.style.width = areaW + "px";
			oDiv.style.height = areaH + "px";
			oDiv.style.left = i % col * areaW + "px";
			oDiv.style.top = Math.floor(i / col) * areaH + "px";
			oDiv.style.background = "#19AD9F";
			content.appendChild(oDiv);
			a.push(oDiv);
		}
		$("#cj_area div").addClass("flipInY animated");

	},
	updateNum: function() {
		$.ajax({
			type: "post",
			url: "/aj/activity/oppo_udateNum",
			data: {
				'goods_id': '275343731'
			},
			dataType: 'json',
			success: function(res) {
				console.log("success");
			}
		});
	},
	choujiang: function() {
		var _this = this;
		$.ajax({
			type: "post",
			url: "/aj/activity/free_draw",
			data: {
				'act_code': 'brand_oppo'
			},
			dataType: 'json',
			success: function(res) {
				var code = res.error_code,
					jsonData = res.data;
				_this.updateNum();
				$cj_area.removeClass("drawing");
				switch (code) {
					case 0:
						if (res.data.id == 0) {
							//没有中奖
							_this.drawDiv("");
							$cj_area.css({
								"background": "url('http://i.meilishuo.net/css/images/wap/biz/oppo_mob/oppo_unlucky_mob.jpg')",
								"background-size": "100% 100%"
							});
							setTimeout(function() {
								_this.drawDiv("");
								$cj_area.css({
									"background": "url('http://i.meilishuo.net/css/images/wap/biz/oppo_mob/oppo_luhan_jgg.jpg')",
									"background-size": "100% 100%"
								});
							}, 3000);
						} else if (res.data.id != 0) {
							$('.steps').css("display", "none");
							$(".step2").css("display", 'block');
							var dialog = shareTmp("dialogTips");
							$("body").append(dialog);
							$("#record_id").attr("data_id", jsonData.record_id);
							var address = "填写收货地址，奖品君火速向你奔来！";
							if (res.data.extra && res.data.extra.id) {
								var extra = res.data.extra;
								var address = "商品将发往,<br/>" + extra.address + "<br/>" + extra.name + extra.phone;
								$("#upt_address").css("display", "inline-block");
								$("#ok_address").css("display", "inline-block");
								$("#addr_id").attr("data_id", extra.id);
							} else {
								$("#add_address").css("display", "inline-block");
							}
							$("#jpCon").html(res.data.name);
							$("#user_address").html(address);
							/*填写地址*/
							$("#add_address").on("click", function() {
								if (!fml.vars.isNewest && fml.vars.isAndroid) {
									var c = new confirm({
										content: '当前版本不支持编辑地址，请升级最新版本。',
										onSure: function() {
											window.location.href = '/download/latest/wap';
										},
										onCancel: function() {
											return;
										}
									});
								} else {
									window.location.href = 'meilishuo://pick_address.meilishuo';
								}
							});
							/*修改地址*/
							$("#upt_address").on("click", function() {
								if (!fml.vars.isNewest && fml.vars.isAndroid) {
									var c = new confirm({
										content: '当前版本不支持编辑地址，请升级最新版本。',
										onSure: function() {
											window.location.href = '/download/latest/wap';
										},
										onCancel: function() {
											return;
										}
									});
								} else {
									window.location.href = 'meilishuo://pick_address.meilishuo';
								}
							});
							/*提交中奖信息*/
							$("#ok_address").on("click", function() {
								var addr_id = $("#addr_id").attr("data_id") || 0;
								var record_id = $("#record_id").attr("data_id") || 0;
								$.ajax({
									type: "post",
									url: "/aj/activity/free_saveInfo",
									data: {
										'act_code': 'brand_oppo',
										'addr_id': addr_id,
										"record_id": record_id
									},
									dataType: 'json',
									success: function(res) {
										//alert(JSON.stringify(res));
										var code = res.error_code;
										if (code == 0) {
											$("#user_address").html("提交成功，奖品将在活动结束后7个工作日寄出");
											$(".address_btn").css("display", "none");
											setTimeout(function() {
												window.location.reload();
											}, 2000);
										} else {
											alert("提交错误，请重新提交");
										}
									},
									error: function() {
										alert("服务器开小差中...请稍后重试～");
									}
								});
							});
						}
						break;
					case 400211:
					case 400901:
					case 400902:
					case 400903:
					case 400904:
					case 400212:
					case 400403:
						var dialog = shareTmp("dialogTips");
						$("body").append(dialog);
						$('.steps').css("display", "none");
						$(".step1").css("display", 'block');
						$("#closeDialog").on("click", function() {
							$(".dialog_box").remove();
						});
						break;
					default:
						alert("服务器开小差中...请稍候再试");
						window.location.reload();
						break;
				}
			},
			error: function() {
				alert("服务器开小差中...请稍候再试");
				window.location.reload();
			}
		});


	},
	eventInit: function() {
		var _this = this;
		/*抽奖接口*/
		$cj_area.on("click", function() {
			if (fml.vars.isLogin == 0) {
				/*没有登录跳转到登录页面*/
				window.location.href = 'meilishuo://login.meilishuo';
				return;
			}
			if ($cj_area.hasClass("drawing")) {
				return;
			}
			$cj_area.addClass("drawing");
			$.ajax({
				type: "post",
				url: "/aj/activity/oppo_checkNum",
				data: {
					'goods_id': '275343731'
				},
				dataType: 'json',
				success: function(res) {
					if (res.error_code == 0) {
						var cjNum = res.data.number;
						if (cjNum > 0) {
							_this.choujiang();
						} else {
							var dialog = shareTmp("dialogTips");
							$("body").append(dialog);
							$('.steps').css("display", "none");
							$(".step1").css("display", 'block');
							$cj_area.removeClass("drawing");
							$("#closeDialog").on("click", function() {
								$(".dialog_box").remove();
							});
						}
					} else {
						alert("出错了，请稍后重试");
					}
				}
			});

		});
		/*活动规则*/
		$activityRuleBtn.on("click", function() {
			var dialog = shareTmp("activityRuleTips");
			$("body").append(dialog);
			$("#closeBtn").on("click", function() {
				$(".dialog_box").remove();
			});
		});

	}
};

oppo.init();