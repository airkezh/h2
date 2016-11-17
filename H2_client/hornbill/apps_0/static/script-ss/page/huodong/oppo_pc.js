/*common*/
var dialog = require('ui/dialog'),
	shareTmp = require('component/shareTmp'),
	$ = require('jquery'),
	focus = require('app/focus_banner'),
	alertui = require('ui/alert'),
	checkLogin = require('app/checkLogin'),
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$cj_area = $("#cj_area"),
	addr_id = 0,
	record_id = 0,
	pics = ["http://i.meilishuo.net/css/images/wap/biz/oppo_mob/oppo_unlucky_mob.jpg", "http://i.meilishuo.net/css/images/wap/biz/oppo_mob/oppo_luhan_jgg.jpg"];


var oppo = {
	init: function() {
		this.eventInit();
	},
	updateNum: function() {
		$.ajax({
			type: "post",
			url: "/aj/huodong/oppo_udateNum",
			data: {
				'goods_id': '275343731'
			},
			dataType: 'json',
			success: function(res) {
				console.log("success");
			}
		});
	},
	drawDiv: function(imgUrl) {
		var _this = this;
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
	eventInit: function() {
		var _this = this;
		$cj_area.on("click", function() {
			if (!checkLogin()) return false;
			if ($cj_area.hasClass("drawing")) {
				return;
			}
			$("#unlucky_box").css("display", "none");
			$("#lucky_box").css("display", "none");
			$cj_area.addClass("drawing");
			$.ajax({
				type: "post",
				url: "/aj/huodong/oppo_checkNum",
				data: {
					'goods_id': '275343731'
				},
				dataType: 'json',
				success: function(res) {
					if (res.error_code == 0) {
						var cjNum = res.data.number || 0;
						if (cjNum > 0) {
							$.ajax({
								type: "post",
								url: "/aj/huodong/oppo_draw",
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
												_this.drawDiv(pics[0]);
												_this.drawDiv(pics[0]);
												$cj_area.css({
													"background": "url('" + pics[0] + "')",
													"background-size": "100% 100%"
												});
												setTimeout(function() {
													_this.drawDiv(pics[1]);
													$cj_area.css({
														"background": "url('" + pics[1] + "')",
														"background-size": "100% 100%"
													});
													$("#lucky_box").css("display", "none");
												}, 3000);
											} else if (res.data.id != 0) {
												$("#cj_area").css("display", "none");
												$("#lucky_box").css("display", "block");
												$("#cj_jp").html(res.data.name);
												record_id = res.data.id;
												if (res.data.extra && res.data.extra.id) {
													var extra = res.data.extra;
													addr_id = extra.id;
													$("#user_name").html(extra.name);
													$("#user_phone").html(extra.phone);
													$("#user_address").html(extra.address);
												}
												/*提交中奖信息*/
												$("#ok_address").on("click", function() {
													if (addr_id == 0) {
														alert("不好意思，您没有默认地址，请填写默认地址后在抽奖");
													}
													$.ajax({
														type: "post",
														url: "/aj/huodong/oppo_saveInfo",
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
																alert("提交成功，奖品将在活动结束后7个工作日寄出");
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
											_this.drawDiv(pics[0]);
											$cj_area.css({
												"background": "url('" + pics[0] + "')",
												"background-size": "100% 100%"
											});
											setTimeout(function() {
												_this.drawDiv(pics[1]);
												$cj_area.css({
													"background": "url('" + pics[1] + "')",
													"background-size": "100% 100%"
												});
												$("#lucky_box").css("display", "none");
											}, 3000);
											break;
										default:
											alert("服务器开小差中...请稍候再试");
											//window.location.reload();
											break;
									}
								},
								error: function() {
									alert("服务器开小差中...请稍候再试");
									//window.location.reload();
								}
							});

						} else {
							$cj_area.removeClass("drawing");
							var dialog = shareTmp("dialogTips");
							$("body").append(dialog);
							$("#now_buy").on("click", function() {
								$(".dialog_box").remove();
								window.open("http://www.meilishuo.com/share/item/3833814221")
							});
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
		$("#rule_link").on("click", function() {
			var dialog = shareTmp("dialogRule");
			$("body").append(dialog);
			$("#closeRule").on("click", function() {
				$(".dialog_box").remove();
			});
		});
	}
};

oppo.init();