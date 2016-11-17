/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp'),
	storage = require('wap/component/storage'),
	Alert = require("wap/ui/alert");
//缓存变量
var desBox = $("#desBox"),
	imgBox = $("#imgBox"),
	btnAdd = imgBox.find(".btn-add"),
	submit = $("#submit");
// 全局变量
var publishData,
	remain = 0,
	max = 9;
//
var a = function(msg, callback) {
	return new Alert({
		content: msg,
		onSure: function() {
			callback && callback();
		}
	});
};
//让图片为正方形
function tailor() {
	var obj = imgBox.find(".list").find("img");
	obj.height(obj.width());
}
//获取从个人中心页上传的图片数据
function index() {
	storage.getSession('desirePublish', function(data) {
		publishData = JSON.parse(data) || {};
	});
	var tpl = shareTmp('imgBoxTpl', {
		'dataObj': (publishData.picObj && publishData.picObj.pictures) || {}
	});
	btnAdd.before(tpl);
	tailor();
}
index();

// 点击加图片时
btnAdd.on("click", function() {
	var len = imgBox.find("li").length;
	if (len >= max + 1) {
		a("亲，单次最多只能传9张图片哦！");
		return;
	}
	remain = max + 1 - len;
	var jsonParams = '{"action":"desire", "max":' + remain + ',"source":"photo"}';
	var publishXR = $(this).data('xr');
	window.location.href = window.__get_r('meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(jsonParams), publishXR);
	window.MLS = {
		onUploadComplete: function(json) {
			// 成功上传图片，回调
			var obj = JSON.parse(json);
			var newData = {};
			//定义渲染页面及更新Session的函数
			function updataSession(arr) {
				//解析
				var tpl = shareTmp('imgBoxTpl', {
					'dataObj': arr
				});
				btnAdd.before(tpl);
				tailor();
				// 更新Session
				storage.getSession('desirePublish', function(data) {
					newData = JSON.parse(data) || {};
				});
				newData.picObj.pictures = newData.picObj.pictures.concat(arr);
				storage.setSession("desirePublish", JSON.stringify(newData));
			}
			if (obj) {
				if (obj.pictures) {
					updataSession(obj.pictures);
				} else {
					var newDataArr = [];
					newDataArr.push(JSON.parse(json));
					updataSession(newDataArr);
				}
			} else {
				a('数据解析失败，请重试！');
			}
		}
	};
});
// 删除照片
imgBox.on("click", ".list", function() {
	var self = $(this);
	var id = self.data('id');
	var removeData = {};
	self.remove();
	// 更新Session
	storage.getSession('desirePublish', function(data) {
		removeData = JSON.parse(data) || {};
	});
	for (var i = 0; i < removeData.picObj.pictures.length; i++) {
		if (id == removeData.picObj.pictures[i].pic_id) {
			removeData.picObj.pictures.splice(i, 1);
		}
	}
	storage.setSession("desirePublish", JSON.stringify(removeData));
});
// 发表
submit.on("click", function() {
	var obj = imgBox.find(".list");
	var imgs = "";
	if (desBox.val().replace(/^\s*|\s*$/g, "") == "") {
		a("亲，描述不能为空哦！");
		return;
	} else if (!obj.length) {
		a("亲，必须要传一张主图哦！");
		return;
	}
	for (var i = 1; i < obj.length; i++) {
		imgs += obj.eq(i).find("img").data("src") + ",";
	}
	var data = {
		"main_img": obj.eq(0).find("img").data("src"),
		"imgs": imgs.substr(0, imgs.length - 1),
		"title": desBox.val()
	}
	loading();
	var inAppTabbarArg = "";
	if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
		inAppTabbarArg = "&&inAppTabbar=1";
	}
	$.ajax({
		type: 'POST',
		url: '/aj/zulily/style_user_create',
		data: data,
		dataType: 'json',
		success: function(result) {
			$("body").find('.loading').remove();
			if (result.error_code) {
				a(result.message);
			} else {
				window.location.href = window.__get_r('/zulily/personal2?showTab=1' + inAppTabbarArg, fml.vars.common_r);
			}
		},
		error: function(error) {
			$("body").find('.loading').remove();
			a('服务器忙，请重试！');
		}
	});
});
// loading
function loading() {
	$("body").append("<div class='loading'><div class='pullUp' status='loading'></div></div>");
}