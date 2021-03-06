/*common*/
var $ = require('wap/zepto'),
	shareTmp = require('wap/component/shareTmp'),
	upload = require('wap/page/circle/upload'),
	$form = $(".imgList"),
	$star = $("#rScore .star"),
	$btnAdd = $("#btnAddReport"),
	pics = [],
	pic_id = [];
picItemW = $("#btnAddImg").width();

var welfare = {
	init: function() {
		this.score();
		this.upLoadImg();
		this.eventInit();
	},
	score: function() {
		$star.children("b").bind({
			"mouseover": function() {
				var index = $(this).index();
				$(this).siblings().removeClass("open").addClass("shut");
				var item = $(this);
				while (item) {
					item.removeClass("shut").addClass("open");
					if (item.length <= 0) {
						break;
					}
					item = item.prev();
				};
			}
		});
	},
	upLoadImg: function() {
		upload.bindUpload($("#btnAddImg"), function(resJson) {
			if (typeof resJson == "string")
				data = JSON.parse(data);
			if (resJson.code == "1") {
				pics.push(resJson.o_pic_url);
				pic_id.push(resJson.pic_id);
				var imgUrl = resJson.pic_url;
				var imgStr = '<li class="img_item show_pics"><img src="' + imgUrl + '" alt="pic" title="pic"  /><span class="deleteImg"></span></li>';
				$(imgStr).insertBefore("#btnAddImg");
				$(".imgList").children(".img_item").css({
					"margin-right": "4%",
					"height": picItemW
				});
				$(".imgList").children(".img_item:nth-child(4n)").css("margin-right", "0");
				/*删除上传的图片*/
				$(".show_pics").on("click", function(e) {
					var index = $('.show_pics').index(this);
					$('.dialog_box').remove();
					var dialog = shareTmp("dialogTips");
					$("body").append(dialog);
					$("#btnOk").on("click", function() {
						$(".show_pics").eq(index).remove();
						pics.splice(index, 1);
						pic_id.splice(index, 1);
						$('.dialog_box').remove();
					});
					$('#btnCancle').on("click", function() {
						$('.dialog_box').remove();
					});
				});
			}
		});
	},
	eventInit: function() {
		var _this = this;
		var activId = fml.vars.activity_id;
		var timer = null,
			tips = "";
		$btnAdd.on("click", function() {
			if ($(this).hasClass("gray")) {
				return;
			}
			$(".smallTips").remove();
			var title = $("#txtTitle").val(),
				content = $("#txtCon").val(),
				appearanceNo = parseFloat($("#appearance").children(".open").length),
				effectNo = $("#effect").children(".open").length,
				recommentdNo = $("#recommentd").children(".open").length;
			if (title && title.length <= 20 && content && pics.length && appearanceNo && effectNo && recommentdNo) {
				$btnAdd.html("正在提交");
				$btnAdd.removeClass("pink").addClass("gray");
				var dialog = shareTmp("dTips", {
					"tip": "正在提交，请稍等"
				});
				$("body").append(dialog);
				$.post('/aj/m_welfare/wlf_add_report', {
					"activity_id": activId,
					"title": title,
					"content": content,
					"pics": pics,
					"appearance": appearanceNo,
					"effect": effectNo,
					"recommend": recommentdNo,
					'pids': pic_id
				}, function(res) {
					if (typeof res == "string")
						res = JSON.parse(res);
					if (res.code == '200') {
						$(".smallTips").remove();
						tips = "提交成功";
						var dialog = shareTmp("dTips", {
							"tip": tips
						});
						$("body").append(dialog);
						timer = setTimeout(function() {
							$(".smallTips").remove();
							window.location.href = '/m_welfare/mywlf/';
						}, 1500);
						return;
					} else if (res.code == '40004') {
						$(".smallTips").remove();
						tips = "您的报告已经提交！";
						var dialog = shareTmp("dTips", {
							"tip": tips
						});
						$("body").append(dialog);
						timer = setTimeout(function() {
							$(".smallTips").remove();
						}, 2500);
					} else {
						tips = res.msg;
						var dialog = shareTmp("dTips", {
							"tip": tips
						});
						$("body").append(dialog);
						timer = setTimeout(function() {
							$(".smallTips").remove();
						}, 2500);
					}
				});
			} else {
				if (title == "") {
					tips = "标题不能为空";
				} else if (title.length > 20) {
					tips = "标题不能超过20个字";
				} else if (title != "" && content == "") {
					tips = "报告内容不能为空"
				} else if (title != "" && content != "" && pics.length == 0) {
					tips = "请上传图片";
				} else if (appearanceNo == 0 || effectNo == 0 || recommentdNo == 0) {
					tips = "请为该试用商品评分";
				}
				var dialog = shareTmp("dTips", {
					"tip": tips
				});
				$("body").append(dialog);
				timer = setTimeout(function() {
					$(".smallTips").remove();
				}, 2500);
			}
		});

	}
};
welfare.init();