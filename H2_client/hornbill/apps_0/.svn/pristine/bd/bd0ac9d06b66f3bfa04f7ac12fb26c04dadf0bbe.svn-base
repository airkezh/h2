/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
require('wap/zepto/scroll');

var api = require('component/callApi');
var time = require('wap/app/doota/timedown');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var onscroll = require('wap/component/windowScroll');
var touchSlide = require('wap/app/touchSlide');
var openApp = require('wap/app/openApp');
if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
	openApp(window.location.href);
}
var winWidth = $(window).width();
var slideHeight = 342 * winWidth / 640;
$("#imageSlide,#imageSlide li").width(winWidth).height(slideHeight + "px");
$("#imageSlide").touchSlide({
	autoTime: 5000
});


/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({
	'xpath': '.lazy_pic'
});
lazy_pic.scroll();

function check_app() {
	if (!Meilishuo.config.os.mlsApp) {
		return window.location.href = fml.vars.out_url;
	}
}


/* ajax 加载list */
(function() {
	var url = '/aj/mua/getRemindMe',
		data = {
			'show_id': fml.vars.next_id,
			'show_type': fml.vars.show_type
		},
		ck = function(res) {
			if (res.data && res.data.switch) {
				$('.remind_btn').html('取消提醒').addClass('has_remind');
			}
		}
	$.get(url, data, ck, 'json');
})();


//通用Ajax函数
function ajaxFun(obj, method, dataType, isPrev, show_id, fun, data, url, callback) {
	obj.append("<div class='pullUp' status='loading'></div>");
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
}
var getBox9DataF = false,
	getListDataF = false,
	getNormalDataF = false;
//获取九宫格数据
function getBox9Data(obj, isPrev, show_id) {
	ajaxFun(obj, 'get', 'json', isPrev, show_id, getBox9Data, {
		'show_id': show_id,
		'show_type': fml.vars.show_type
	}, '/aj/mua/getRecGoods', function(res) {
		if (res.data.length) {
			var tpl = shareTmp('nine_box', {
				'goods': res.data,
				'isPrev': isPrev
			});
			obj.find('.pullUp').remove();
			obj.append(tpl);
			getBox9DataF = true;
			getDataCk();
			//lazyLoad
			lazy_pic.load();
		} else {
			reload(obj, isPrev, show_id, getBox9Data);
		}
	});
};
//获取列表数据
function getListData(obj, isPrev, show_id) {
	ajaxFun(obj, 'get', 'json', isPrev, show_id, getListData, {
		'show_id': show_id,
		'show_type': fml.vars.show_type
	}, '/aj/mua/getGoods', function(res) {
		if (res.data.length) {
			var tpl = shareTmp('goods_units', {
				'goods': res.data,
				'isPrev': isPrev
			});
			obj.find('.pullUp').remove();
			obj.append(tpl);
			getListDataF = true;
			getDataCk();
			//lazyLoad
			lazy_pic.load();
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
				obj.find('.pullUp').remove();
				return;
			}
			var tpl = shareTmp('normalBox', {
				'goods': res.data,
				'isPrev': isPrev
			});
			obj.find('.pullUp').remove();
			obj.append(tpl);
			getNormalDataF = true;
			getDataCk();
			//lazyLoad
			lazy_pic.load();
			//mua下期预告增加常青款
			$('.tab_next').on('click', function() {
				var nextNormal = $("#nextNormal");
				if (!nextNormal.find('.pro-title').length) {
					nextNormal.append(tpl);
					//lazyLoad
					lazy_pic.load();
				}
			})
		} else {
			reload(obj, isPrev, show_id, getNormalData);
		}
	});
};
//获取数据成功后的回调
function getDataCk() {
	if (getBox9DataF && getListDataF) {
		// 点击九格宫图片滚动到列表位置
		$('.nine_box').find('.goods').on('click', function() {
			var goods_id = $(this).attr('data');
			$('html,body').scrollTo({
				endY: $('.active_box').find('.go_' + goods_id).offset().top - 5,
				updateRate: 10
			});
		});
	}
	if (getListDataF && getNormalDataF) {
		$('.scroll-btn-box').show();
		//常青款锚链接
		scrollFun('.btn', $("#prevNormal").find('.pro-title'));
		scrollFun('.btn2', $("#prevList").find('.pro-title'));
		scrollFun('.btn3', $("#currList").find('.pro-title'));
		scrollFun('.btn4', $("#currNormal").find('.pro-title'));
	}
};

function scrollFun(btn, obj) {
	$('.scroll-btn-box').find(btn).off('click').on('click', function() {
		$('html,body').scrollTo({
			endY: obj.offset().top,
			updateRate: 10
		});
	});
};
//重新加载
function reload(obj, isPrev, show_id, callback) {
	obj.find('.pullUp').remove();
	obj.append("<div class='error_msg'><p>Sorry，页面奋力加载失败了</p><div class='js_reload error_reload'><span>重新加载</span></div></div>");
	obj.find('.error_reload').find('span').off('click').on('click', function() {
		obj.find('.error_msg').remove();
		callback(obj, isPrev, show_id);
	})
};
//倒计时
time.down($('.timeStamp_wrap'), $('.timeStamp_wrap').attr('time'), '0h-0i-0s-0e', ['<b>%v</b>时', '<b>%v</b>分', '<b>%v</b>秒', '<b>%v</b>'])
	.onTimeOver(function() { 
		// window.location.reload();
	})
	.correct()
	.onAction(function() {
		var t = arguments[2];
		// day=t.d&&t.d!=0? (t.d<10 ? "0"+t.d+"天" : t.d +"天"):"";
		hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
		min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
		sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
		ms = t.e;
		$('.timeStamp_wrap').text("限时抢购 剩余：" + hour + "时" + min + "分" + sec + "秒" + ms);
	}).setHeartHum(100);

var addPrev = function() {
	getPrevData();
	$('.nav_prev').off('click', addPrev);
}
if (fml.vars.curr_id) {
	getBox9Data($("#currBox9"), false, fml.vars.curr_id);
	getListData($("#currList"), false, fml.vars.curr_id);
	getNormalData($("#currNormal"), false, fml.vars.curr_id);
	$('.nav_prev').on('click', addPrev);
} else {
	getPrevData();
}

function getPrevData() {
		getBox9Data($("#prevBox9"), true, fml.vars.prev_id);
		getListData($("#prevList"), true, fml.vars.prev_id);
		getNormalData($("#prevNormal"), true, fml.vars.prev_id);
	}
	// var show_reload = function(show_id, isPrev, callback) {
	// 	if (isPrev) {
	// 		var parentNode = $('.past_box');
	// 	} else {
	// 		var parentNode = $('.current_box');
	// 	}
	// 	parentNode.find('.error_msg').show();
	// 	parentNode.find('.pullUp').hide()
	// 	parentNode.find('.js_reload').on('click', function() {
	// 		parentNode.find('.error_msg').hide();
	// 		parentNode.find('.pullUp').show()
	// 		callback(show_id, isPrev);
	// 	});
	// };


$('.nav_inner div').on('click', function() {
	$('.nav_active').removeClass('nav_active');
	$(this).addClass('nav_active');
	$('.active_box').removeClass('active_box');
	$('.' + $(this).attr('data')).addClass('active_box');
	lazy_pic.load();
});

function close_act() {
	$('.act_info').hide();
}
$('.main').on('click', '.act_info_btn', function() {
	$('.act_info').show();
	$('.act_info .close').off('click', close_act).on('click', close_act);
	$('.act_info').on('touchmove', function(e) {
		e.preventDefault();
		return false;
	});
});

$('.remind_btn').on('click', function() {
	check_app();
	var remind_text = $(this).html() != '取消提醒' ? '取消提醒' : '<span></span>提醒我';
	var self = this;
	$.post('/aj/mua/setRemindMe', {
		'show_id': fml.vars.next_id,
		'show_type': fml.vars.show_type
	}, function(res) {
		if (res.data) {
			if (res.data.switch) {
				var tpl = shareTmp('redmin_alert');
				$('body').append(tpl);
				show_mask();
				$(self).addClass('has_remind');
			} else {
				$(self).removeClass('has_remind');
			}
			$('.remind_btn').html(remind_text);
		}
	}, 'json');
});

if (!isNaN(fml.vars.act_time_diff) && fml.vars.act_time_diff > 0) {
	var offGoodsLink = function(e) {
		e.preventDefault();
		return false;
	}
	$('.current_box').on('click', '.goods_units a', offGoodsLink);
	setTimeout(function() {
		$('.current_box').off('click', '.goods_units a', offGoodsLink);
	}, fml.vars.act_time_diff);
}


$('.gotop').on('click', function() {
	$('html,body').scrollTo({
		endY: 0,
		updateRate: 5
	});
});
var $gotop_wrap = $('.gotop_wrap');

function gotop(pos, isDown) {
	var top = $('.active_box .goods_units').length ? $('.active_box .goods_units').offset().top : 10000;
	if (pos > top) {
		$gotop_wrap.show();
	} else {
		$gotop_wrap.hide();
	}
}
onscroll.bind(gotop, 'gotop_wrap');

/*优惠券领取部分*/
$('.coupons').on('click', function() {
	check_app();
	var coupon_type = $(this).attr('type');
	var coupon_apply_code = $(this).attr('code');
	api.write({
		'url': '/coupon/coupon_apply'
	}, {
		'coupon_apply_code': coupon_apply_code
	}, function(res) {
		if (res.code == -1 && res.message == '亲，你还没有登录哦～') {
			window.MLS = {
				didLogin: function() {
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
		} else {
			if (res.data && res.data.coupon_valid_time_range) {
				var now = new Date();

				var coupon_valid_time_range = res.data.coupon_valid_time_range;
				var curr_start = new Date(coupon_valid_time_range.start_time.replace('-', '/').replace('-', '/'));
				var curr_end = new Date(coupon_valid_time_range.expire_time.replace('-', '/').replace('-', '/'));

				var time = '有效期：' + (curr_start.getMonth() + 1) + '/' + curr_start.getDate() + ' 10:00';
				if (curr_end - curr_start > 24 * 3600 * 1000) {
					if (curr_end.getHours() == 0) {
						curr_end.setDate(curr_end.getDate() - 1);
					}
					time += ' - ' + (curr_end.getMonth() + 1) + '/' + curr_end.getDate() + ' 24:00';
				} else {
					time += ' - 24:00';
				}

				var tpl = shareTmp('coupon_alert', {
					'use_time': time,
					'type': coupon_type
				});
				$('body').append(tpl);
				show_mask();
			} else {
				/* 奇怪的需求没有hold住 */
				if (res.message == '已经到达申领次数限制') {
					res.message = '亲，您本场已领取过啦，一场只能领取一次哦';
				}
				var tpl = shareTmp('coupon_error', {
					'msg': res.message
				});
				$('body').append(tpl);
				show_mask();
			}
		}
	}, 'json');
});

var close_alert = function() {
	$('.mask').remove();
}

var show_mask = function() {
	$('.close_btn').off('click', close_alert).on('click', close_alert);
	$('.mask').on('touchmove', function(e) {
		e.preventDefault();
		return false;
	});
}