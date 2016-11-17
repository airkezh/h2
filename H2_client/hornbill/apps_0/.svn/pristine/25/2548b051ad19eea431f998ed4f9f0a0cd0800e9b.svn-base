/*common*/
var banner = require('app/focus_banner'),
	shareTmp = require('component/shareTmp'),
	check = require('app/checkLogin'),
	dialog = require('ui/dialog'),
	timedown = require('app/doota/timedown'),
	tracking = require('wap/app/tracking'),
	api = require('component/callApi');
//一进页面就获取数据
var isPrevLoad = false;
if (fml.vars.curr_id) {
	getBox9Data($("#currBox9"), false, fml.vars.curr_id);
	getListData($("#currList"), false, fml.vars.curr_id);
	getNormalData($("#currNormal"), false, fml.vars.curr_id);
	$('.prev-tab').click(function() {
		if (!isPrevLoad) {
			getPrevData();
			isPrevLoad = true;
		}
	});
} else if (fml.vars.prev_id) {
	getPrevData();
}

function getPrevData() {
	getBox9Data($("#prevBox9"), true, fml.vars.prev_id);
	getListData($("#prevList"), true, fml.vars.prev_id);
	getNormalData($("#prevNormal"), true, fml.vars.prev_id);
};
//通用Ajax函数
function ajaxFun(obj, method, dataType, isPrev, show_id, fun, data, url, callback) {
	obj.append("<div class='loading'></div>");
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
			reload(obj, isPrev, show_id, fun);
		}
	});
};
var getBox9DataF = false,
	getListDataF = false,
	getNormalDataF = false;
//获取九宫格数据
function getBox9Data(obj, isPrev, show_id) {
	ajaxFun(obj, 'get', 'json', isPrev, show_id, getBox9Data, {
		'show_id': show_id,
		'show_type': 1
	}, '/aj/mua/getRecGoods', function(res) {
		if (res.data.length) {
			var tpl = shareTmp('box9Tpl', {
				'data': res.data,
				'isPrev': isPrev
			});
			obj.find('.loading').remove().end().append(tpl);
			getBox9DataF = true;
			getDataCk();
			//lazyLoad
			lazyLoad('.bs_load_img', 'asrc');
		} else {
			reload(obj, isPrev, show_id, getBox9Data);
		}
	});
};
//获取列表数据
function getListData(obj, isPrev, show_id) {
	ajaxFun(obj, 'get', 'json', isPrev, show_id, getListData, {
		'show_id': show_id,
		'show_type': 1
	}, '/aj/mua/getGoods', function(res) {
		if (res.data.length) {
			var tpl = shareTmp('listTpl', {
				'data': res.data,
				'isPrev': isPrev
			});
			obj.find('.loading').remove().end().append(tpl);
			getListDataF = true;
			getDataCk();
			//lazyLoad
			lazyLoad('.bs_load_img', 'asrc');
		} else {
			reload(obj, isPrev, show_id, getListData);
		}
	});
};
//获取常青款数据
function getNormalData(obj, isPrev, show_id) {
	ajaxFun(obj, 'get', 'json', isPrev, show_id, getNormalData, {}, '/aj/mua/getHotGoods', function(res) {
		if (res.data.length >= 0) {
			//没有数据，直接返回，不显示常青款
			if (res.data.length == 0 || res.data == "") {
				$('.scroll-btn-box').hide();
				obj.find('.loading').remove();
				return;
			}
			var tpl = shareTmp('normalTpl', {
				'data': res.data,
				'isPrev': isPrev
			});
			obj.find('.loading').remove().end().append(tpl);
			getNormalDataF = true;
			getDataCk();
			//lazyLoad
			lazyLoad('.bs_load_img', 'asrc');
			//mua下期预告增加常青款
			$('.next-tab').on('click', function() {
					var nextNormal = $("#nextNormal");
					if (!nextNormal.find('.pro-title').length) {
						nextNormal.append(tpl);
						//lazyLoad
						lazyLoad('.bs_load_img', 'asrc');
					}
				})
				//常青款埋点
			crNormal($(".normalProTitle"));
		} else {
			reload(obj, isPrev, show_id, getNormalData);
		}
	});
};
//获取数据成功后的回调
function getDataCk() {
	var htmlBody = $('html,body'),
		contentBox = $("#contentBox");
	if (getBox9DataF && getListDataF) {
		// 点击九格宫图片滚动到列表位置
		contentBox.find('.goto-list').on('click', function() {
			var id = $(this).data('id');
			htmlBody.animate({
					"scrollTop": $('.cur-box').find('.go_' + id).offset().top - 40
				},
				100);
		});
	}
	if (getListDataF && getNormalDataF) {
		$('.scroll-btn-box').show();
		//常青款锚链接
		scrollFun('.btn', $("#prevList").find('.pro-title'));
		scrollFun('.btn2', $("#prevNormal").find('.pro-title'));
		scrollFun('.btn3', $("#currList").find('.pro-title'));
		scrollFun('.btn4', $("#currNormal").find('.pro-title'));
	}
};

function scrollFun(btn, obj) {
	$('.scroll-btn-box').find(btn).off('click').on('click', function() {
		$('html,body').animate({
				"scrollTop": obj.offset().top
			},
			100);
	});
};
//重新加载
function reload(obj, isPrev, show_id, callback) {
	obj.find('.loading').remove().end().append("<div class='load_again'><p>Sorry,页面奋力加载失败了</p><input type='button' class='btn' value='重新加载'></div>");
	obj.find('.load_again').find('.btn').off('click').on('click', function() {
		obj.find('.load_again').remove();
		callback(obj, isPrev, show_id);
	})
};
//倒计时
$('.time').each(function(index) {
	var self = $(this);
	timedown.down(self, self.attr('time'), '0h-0i-0s-0e', ['<b>%v</b>时', '<b>%v</b>分', '<b>%v</b>秒', '<b>%v</b>'])
		.onTimeOver(function() { 
			// window.location.reload();
		})
		.onAction(function() {
			var t = arguments[2];
			// day=t.d&&t.d!=0? (t.d<10 ? "0"+t.d+"天" : t.d +"天"):"";
			hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
			min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
			sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
			ms = t.e;
			self.html("<b>" + hour + "</b>时<b>" + min + "</b>分<b>" + sec + "</b>秒<b>0" + ms + "</b>");
		}).setHeartHum(100);
});
// 领取优惠券
$(".btn-coupons").on('click', function() {
	var self = $(this);
	var str = '',
		data = '';
	// 没登录
	if (!check()) {
		return;
	} else {
		if (self.text() == '已领' || self.text() == '已领光') {
			return;
		}
		var coupon_apply_code = self.data('code');
		api.write({
			'url': '/coupon/coupon_apply'
		}, {
			'coupon_apply_code': coupon_apply_code
		}, function(res) {
			if (res.code == 0) {
				//领取成功
				date = self.prev().find('.date').text();
				var threshold = self.data('threshold'),
					credit = self.data('credit');
				if (threshold == 0) {
					str = "即立减" + credit + "元";
				} else {
					str = "满" + threshold + "即可立减" + credit + "元";
				}
				self.html('已<br>领').parents('li').addClass('cpn_get');
			} else {
				//领取失败
			}
			var tplData = {
				'code': res.code,
				'date': date || '',
				'str': str || ''
			};
			var tpl = shareTmp('couponsPopup', tplData);
			var popUp = new dialog({
				width: 445,
				content: tpl,
				onChange: function() {
					$('#dialogTitle').hide();
				}
			});
			// 关闭弹层
			$('#dialogContent').find('.close_btn,.btn').click(function() {
				popUp.drive.destroyModel();
			});
		}, 'json');
	}
});
//延迟加载函数
function lazyLoad(obj, dataSrc) {
	$(obj).each(function() {
		var self = $(this);
		var cla = self.attr('class'),
			src = self.attr(dataSrc),
			h = $(window).height(),
			o, t;
		var scrollTimer = null;
		$(window).on('scroll', function() {
			if (!src) {
				return;
			}
			if (scrollTimer) {
				clearTimeout(scrollTimer)
			}
			scrollTimer = setTimeout(function() {
				o = self.offset().top;
				t = $(document).scrollTop();
				if (t + h > o) {
					var img = $("<img class='" + cla + "' src='" + src + "' />");
					self.before(img);
					self.remove();
				}
			}, 100);
		});
	});
};
//轮播图
banner.bind({
	'unit': '.mua-banner li',
	'btn': '.focus a',
	'transition': 'scrollH'
});
// 卖场须知
$("#btn-rules").click(function() {
	var popUp = new dialog({
		width: 710,
		content: $('#rulesPopup').html(),
		onChange: function() {
			$('#dialogTitle').hide();
		}
	});
	// 关闭弹层
	$('#dialogContent').find('.close_btn,.btn').click(function() {
		popUp.drive.destroyModel();
	});
});
//tab切换
$(".mua_nav span").click(function() {
	var index = $(this).index(),
		contentBox = $("#contentBox");
	$(".mua_nav span").removeClass("cur").eq(index).addClass("cur");
	contentBox.children('div').removeClass('cur-box').eq(index).addClass('cur-box');
	//埋点
	switch ($(this).data("class")) {
		case "prev-tab":
			tracking.cr('mua_pc_mall', {
				"bi_data": "act:tab|target:old"
			});
			break;
		case "curr-tab":
			tracking.cr('mua_pc_mall', {
				"bi_data": "act:tab|target:now"
			});
			break;
		case "next-tab":
			tracking.cr('mua_pc_mall', {
				"bi_data": "act:tab|target:future"
			});
			break;
	}
});
//滚动到底部的埋点
var crBottomF = false;

function crBottom() {
	var scrollTimer = null;
	$(window).on('scroll', function() {
		if (scrollTimer) {
			clearTimeout(scrollTimer)
		}
		scrollTimer = setTimeout(function() {
			var scrollTop = $(document).scrollTop(),
				documentHeight = $(document).height(),
				windowHeight = $(window).height();
			if (!crBottomF && (scrollTop + windowHeight >= documentHeight - 10)) {
				crBottomF = true;
				tracking.cr('mua_pc_mall', {
					"bi_data": "act:bottom"
				});
			}
		}, 100);
	});
}
crBottom();
//滚动到常青款的埋点
var crNormalF = false;

function crNormal(obj) {
	var scrollTimer = null;
	$(window).on('scroll', function() {
		if (scrollTimer) {
			clearTimeout(scrollTimer)
		}
		scrollTimer = setTimeout(function() {
			var t = obj.offset().top,
				h = $(window).height(),
				s = $(document).scrollTop();
			if (h + s > t && !crNormalF) {
				crNormalF = true;
				tracking.cr('mua_pc_mall', {
					"bi_data": "act:evergreen"
				});
			}
		}, 100);
	});
}