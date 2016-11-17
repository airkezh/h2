/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var lazy = require('wap/component/lazzyLoad'),
	onscroll = require('wap/component/windowScroll'),
	shareTmp = require('wap/component/shareTmp'),
	tracking = require('wap/app/tracking'),
	storage = require('component/iStorage'),
	openAppLink = require('wap/app/openAppLink'),
	animation = require('core/animation'),
	Danmu = require('wap/component/danmu/index'),
	api = require('component/callApi'),
	openApp = require('wap/app/openApp');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	Tween = animation.Tween,
	requestFrame = animation.requestFrame,
	$win = $(window),
	tabBox = $('#tab'),
	tab_target = tabBox.find('a'),
	tabContent = $('#tabContent'),
	emptyBox = $("#emptyBox"),
	prevContent = $("#prevContent"),
	nextContent = $("#nextContent"),
	prevTab = $('.prveTab'),
	nextTab = $('.nextTab'),
	topBox = $('.top-box'),
	shareBtn = $('#shareBtn'),
	gotopObj = topBox.find('a'),
	btnCoupons = $('.btnCoupons'),
	supportBox = tabBox.find('.personal'),
	pageBox = $('#pageBox'),
	isMoreData = false,
	isEmpty = false,
	limit = 10,
	wideLimit = 5,
	page = 0,
	isFirst = true,
	showLead = 0,
	danmu = {},
	danmuData = {},
	isBoundScrollStop = false,
	mark = 0,
	smallPageTotle = 0,
	posting = false,
	pageIndex = 1;
//每大页加载小页的数量
var pageNum = 10;
/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};


/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({
	'xpath': '.lazy_pic'
});
lazy_pic.scroll();

/*一进页面就获取数据*/
function getDataFun(obj, status) {
	getChoiceData(obj, {
		"page": page,
		"limit": limit,
		"status": status,
		"wideLimit": wideLimit
	});
}

if (fml.vars.showTab != 1) { //临时修改落地页tab 20150217
	tab_target.removeClass('cur').eq(1).addClass('cur');
	nextContent.show();
	tab_target.find(".hr").hide().eq(1).show();
	getDataFun(nextContent, 'done');
} else {
	tab_target.removeClass('cur').eq(0).addClass('cur');
	tab_target.find(".hr").hide().eq(0).show();
	getDataFun(prevContent, 'ing');
}
//解决新版APP挡住返回顶部和分享
if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
	var bottomOffset = parseInt(topBox.css('bottom'));
	topBox.css('bottom', bottomOffset + 50 + "px");
	$('.starBox .share_ico').css('padding-bottom', "50px");
}
// tab吸顶
var tabBoxOffset = tabBox.offset().top;
$(window).scroll(function() {
	var t = $(window).scrollTop();
	if (t > tabBoxOffset) {
		tabBox.css({
			'position': 'fixed',
			'left': 0,
			"top": 0
		});
	} else {
		tabBox.css({
			'position': 'static'
		});
	}
});
/* 选项卡 */
tab_target.on('click', function() {
	if ($(this).hasClass('cur')) {
		return;
	}
	tabBox.css({
		'position': 'static'
	});
	$(window).scrollTop(0);
	var index = $(this).index();
	$('.hr').hide().eq(index).show();
	tab_target.eq(0).find('.newGoods').hide();
	tab_target.removeClass('cur').eq(index).addClass('cur');
	tabContent.find(".contentArea").hide().eq(index).show().empty().append('<div class="tab-inner"></div>');
	// index ? supportBox.hide() : supportBox.show();
	index ? tracking.cr('desire_tab_click', {
		'area': 'list_done'
	}) : tracking.cr('desire_tab_click', {
		'area': 'list_ing'
	});
	page = 0;
	isEmpty = false;
	isMoreData = false;
	isFirst = true;
	index ? getDataFun(nextContent, "done") : getDataFun(prevContent, "ing");
	//分页重置
	pageIndex = 1;
	pageBox.empty();
	isFirstPage = true;
});

/*点赞弹窗*/
var dialogFn = function(id) {
	var tpl = shareTmp(id);
	$.fn.dialog({
		dialogContent: tpl,
		dialogTitle: ''
	});
	$('#maskLayer').css({
		'background': 'rgba(0 ,0 ,0 , 0)'
	})
	$('.dialog_box').on('click', function() {
		setTimeout(function() {
			$('.closeDialog').trigger('tap');
		}, 500)
	});
	$('.dialog_box').click()
	$('.dialog_box').click()
}

/*点赞*/
function support(ele) {
	var num = parseInt(ele.parent().find('.num').text()),
		eleParent = ele.parents('.detailUrl'),
		styleId = parseInt(eleParent.attr('styleId')),
		status = parseInt(eleParent.data('status')),
		red = supportBox.find('.love-num');
	if (ele.hasClass('zan_love')) {
		// if(status==1){
		// 	red.removeClass("show").addClass("hide");
		// }
		ele.removeClass('zan_love');
		num -= 1;
		ele.parent().find('.num').html(num);

		dialogFn('noLove');
		tracking.cr('desire_love', {
			'area': 'list_ing',
			'action': 'cancel_love'
		});

		$.get('/aj/zulilyOld/style_want', {
			'style_id': styleId,
			'action': 'del',
			'trace_id': fml.vars.trace_id
		}, function(res) {}, 'json');
	} else {
		// if(status==4){
		// 	red.removeClass("hide").addClass("show");
		// }
		ele.addClass('zan_love');
		num += 1;
		ele.parent().find('.num').html(num);

		tracking.cr('desire_love', {
			'area': 'list_ing',
			'action': 'love'
		});

		$.get('/aj/zulilyOld/style_want', {
			'style_id': styleId,
			'action': 'add',
			'trace_id': fml.vars.trace_id
		}, function(res) {}, 'json');
	}
};
prevContent.on('click', '.progress .zan_normal', function() {
	event.stopPropagation();
	event.preventDefault();
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	support($(this));
})
supportBox.click(function() {
	var inAppTabbarStr = "";
	if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
		inAppTabbarStr = "&&inAppTabbar=1";
	}
	var dot = $(this).find('.love-num');
	var loc = dot.attr('loc');
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	//埋点
	var stat_red_point = "";
	if (fml.vars.doneNum) {
		stat_red_point = '&stat_red_point=1';
	} else {
		stat_red_point = '&stat_red_point=0';
	}
	var personalURL = 'http://mapp.meilishuo.com/zulilyOld/personal/?frm=list_bottom_left_heart' + inAppTabbarStr + stat_red_point;
	var url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
		'protocol': 'openURL',
		'param': {
			"url": personalURL
		}
	}) : "/zulilyOld/personal/?frm=list_bottom_left_heart" + inAppTabbarStr + stat_red_point;
	window.location.href = url;
	// if(dot.hasClass("hide")){
	// 	window.location.href = "/zulilyOld/personal/?frm=list_bottom_right_heart"+inAppTabbarStr;
	// }else if(dot.hasClass("show")){
	// 	window.location.href = "/zulilyOld/personal/?frm=list_bottom_left_heart&&showTab=1"+inAppTabbarStr;
	// }else return;
});
/*通用Ajax函数*/
function ajaxFun(obj, method, dataType, data, url, callback, errCallback) {
	$.ajax({
		type: method,
		dataType: dataType,
		url: url,
		data: data,
		success: function(data) {
			callback(data);
		},
		error: function(error) {
			errCallback();
		}
	});
};

/*重新加载*/
function reload(obj, data, callback) {
	isFirst = true;
	obj.find('.pullUp').remove();
	obj.append("<div class='load_again'><p>Sorry,页面奋力加载失败了</p><input type='button' class='btn' value='重新加载'></div>");
	obj.find('.load_again').find('.btn').off('click').on('click', function() {
		obj.find('.load_again').remove();
		callback(obj, data);
	});
};

/*获取详情页链接*/
function getIngUrl(ele) {
	var style_id = parseInt(ele.attr('styleId')),
		twitter_id = ele.attr('twitter_id'),
		detailURL = 'http://mapp.meilishuo.com/zulilyOld/detail/?style_id=' + style_id + '&frm=list_ing&trace_id=' + fml.vars.trace_id,
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'openURL',
			'param': {
				"url": detailURL
			}
		}) : '/zulilyOld/detail/?style_id=' + style_id + '&frm=list_ing&trace_id=' + fml.vars.trace_id;
	// tracking.cr('desire_done_twitter_click', {
	// 	'area': 'list_ing',
	// 	'twitter_id': twitter_id,
	// 	'style_id': style_id
	// });
	window.location.href = Url;
};
/*获取单品页链接*/
function getDoneUrl(ele, isBtn) {
	var style_id = parseInt(ele.attr('styleId')),
		twitter_id = ele.attr('twitter_id'),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1,
					"trace_id": fml.vars.trace_id
				}
			}
		}) : '/share/item/' + twitter_id + '?trace_id=' + fml.vars.trace_id;
	if (isBtn) {
		tracking.cr('desire_buy_btn_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	} else {
		tracking.cr('desire_done_twitter_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	}
	window.location.href = Url;
}
tabContent.on('click', '.detailUrl', function() {
	getIngUrl($(this));
})
tabContent.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
tabContent.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})

/* 获取数据 */
function getChoiceData(obj, data) {
	if (isFirst) {
		obj.append("<div class='pullUp' status='loading'></div>");
		isFirst = false;
	}
	ajaxFun(obj, 'get', 'json', data, '/aj/zulilyOld/index_style_list', function(res) {
		// comingsoon
		if (res.error_code != 0) {
			nextContent.find('.pullUp').remove();
			if (nextContent.find('img').length == 0) {
				nextContent.append('<img src="http://i.meilishuo.net/css//images/wap/web/zulily/conming1.jpg">');
			}
			return;
		}
		if (res.data && (res.data.big.length || res.data.small.length)) {
			isMoreData = true;
			isEmpty = true;
			var isPrev = data.status == "ing" ? true : false;
			var tpl = shareTmp('choiceTpl', {
				'dataObj': res.data,
				'markShow': data.page,
				'isPrev': isPrev
			});
			// obj.find('.pullUp').remove();
			obj.find(".tab-inner").append(tpl);
			//lazyLoad
			lazy_pic.load();
			/** 弹幕相关逻辑 */
			if (!isPrev) {
				danmuPrepare();
			} else {
				danmu[mark] && danmu[mark].shutdown();
				danmuData = {};
				danmu = {};
			}
			//分页
			smallPageTotle = Math.ceil(parseInt(res.data.small_total_num) / limit / pageNum);
		} else {
			obj.find('.pullUp').remove();
			if (!isEmpty) {
				var emptyTpl = shareTmp('emptyTpl', {});
				obj.append(emptyTpl);
			} else {
				obj.append('<p class="past-box">没有更多了</p>');
				pageBox.show();
			}
		}
	}, function(error) {
		reload(obj, data, getChoiceData);
	});
};

/*滚动动态加载*/
$(window).scroll(function() {
	var isPrevTab = prevTab.hasClass('cur') ? true : false;
	var obj = isPrevTab ? prevContent : nextContent;
	var status = isPrevTab ? 'ing' : 'done';
	var o = obj.offset().top,
		bh = obj.height(),
		t = $(window).scrollTop(),
		h = $(window).height();
	var getData = function() {
		getChoiceData(obj, {
			"page": page,
			"limit": limit,
			"status": status,
			"wideLimit": wideLimit
		});
	};
	if (t + h >= o + bh - 800 && isMoreData) {
		page++;
		if (isPrevTab) {
			if (page < pageNum * pageIndex) {
				getData();
			} else {
				addPage();
			}
		} else {
			getData();
		}
		isMoreData = false;
	}
});
//分页函数
var isFirstPage = true;

function addPage() {
	prevContent.find('.pullUp').remove();
	pageBox.show();
	if (isFirstPage) {
		isFirstPage = false;
		//分页
		var pageTpl = shareTmp('pageTpl', {
			'totlePage': smallPageTotle
		});
		pageBox.append(pageTpl);
	}
};
// 分页按钮点击
function clickPage(obj, isPrev) {
	tabBox.css({
		'position': 'static'
	});
	$(window).scrollTop(0);
	if (obj.hasClass('disabled')) {
		return;
	} else {
		pageBox.hide();
		if (isPrev == 0) {
			pageIndex > 1 && pageIndex--;
		} else if (isPrev == 1) {
			pageIndex < smallPageTotle && pageIndex++;
		} else if (isPrev == 2) {
			pageIndex = $('#selSelect').val();
		}
		//获取数据
		prevContent.empty().append('<div class="tab-inner"></div>');
		page = (pageIndex - 1) * pageNum;
		isEmpty = false;
		isMoreData = false;
		isFirst = true;
		getDataFun(prevContent, "ing");
		$('#selSelect')[0].selectedIndex = pageIndex - 1;
		$('#curPage').html(pageIndex);
		var pagePre = $('#pagePre'),
			pageNext = $('#pageNext');
		if (pageIndex == 1) {
			pagePre.addClass('disabled');
		}
		if (pageIndex > 1) {
			pagePre.removeClass('disabled');
		}
		if (pageIndex < smallPageTotle) {
			pageNext.removeClass('disabled');
		}
		if (pageIndex == smallPageTotle) {
			pageNext.addClass('disabled');
		}
	}
}
pageBox.on('click', '#pagePre', function() {
	clickPage($('#pagePre'), 0);
});
pageBox.on('click', '#pageNext', function() {
	clickPage($('#pageNext'), 1);
});
pageBox.on('change', '#selSelect', function() {
	clickPage($('#selSelect'), 2);
});
/*gotop*/
gotopObj.on("click", function(e) {
	document.body.scrollTop = 0
});
onscroll.bind(gotop, 'gotop');

function gotop(pos, isDown) {
	if (pos < 30) {
		gotopObj.hide()
	} else {
		gotopObj.show()
	}
}

/*埋点*/
$('.login').on('click', function() {
	tracking.cr('desire_login_btn_click', {
		'area': 'list'
	})
})
$('.register').on('click', function() {
	tracking.cr('desire_reg_btn_click', {
		'area': 'list'
	})
})
shareBtn.on('click', function() {
	var isPrevTab = prevTab.hasClass('cur') ? true : false;
	if (isPrevTab) {
		tracking.cr('desire_share', {
			'area': 'list_ing'
		})
	} else {
		tracking.cr('desire_share', {
			'area': 'list_done'
		})
	}
});
/*优惠券领取部分*/
btnCoupons.on('click', function() {
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	var self = $(this);
	var tpl = "";
	var coupon_apply_code = $(this).attr('code');
	$.get('/aj/zulilyOld/coupon', {
		'coupon_apply_code': coupon_apply_code
	}, function(res) {
		if (res.error_code == 0) {
			var date = res.data.coupon_valid_time_range;

			function getDate(isStart) {
				var str = isStart ? date.start_time : date.expire_time;
				var dateStr = str.replace(/\d*-/, '');
				var formatDate = dateStr.substring(0, dateStr.lastIndexOf(':'));
				return formatDate;
			}
			var time = '有效期：' + getDate(true) + ' - ' + getDate(false);
			self.find('span').removeClass('yes').addClass('no').html('已经领取');
			self.removeClass('btnCoupons').off('click');
			tpl = shareTmp('coupon_alert', {
				'isSuccess': true,
				'use_time': time,
				'text': self.find('.title').text() + "<br>在desire卖场全场通用哦！"
			});
		} else {
			var tpl = shareTmp('coupon_alert', {
				'isSuccess': false,
				'text': res.message
			});
		}
		$('body').append(tpl);
		show_mask();
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
};
/** 弹幕相关代码start */
function addDanmu(i, data) {
	var index = 0;

	danmu[i] = Danmu({
		el: '.d' + i,
		bulletHeight: 30,
		bulletTmpl: '<div><i data-name="icon"></i><span data-name="content"></span></div>',
		bulletClass: "bullet",
		mode: 'auto',
		initChannel: {
			offset: 5,
			height: 30,
			size: 4
		},
		getMessage: function() {
			index < data.data.length - 1 ? index++ : index = 0;
			return data.data[index];
		},
		initBullet: function() {
			this.bullet.speed = -.05;

			var bullet = this.bullet,
				type = this.type;

			this.bullet.speed = -.15;
			/** hack code */
			var str = bullet.els.content.innerHTML,
				strArr = str.split('##'),
				type = strArr[0];

			if (type == 'me') {
				bullet.els.el.className = 'me';
				bullet.els.content.innerHTML = strArr[1];
				$(bullet.els.el).find('i').prepend("<img src='" + strArr[2] + "' alt=''>");
			} else if (type == 'common') {
				bullet.els.content.innerHTML = strArr[1];
				$(bullet.els.el).find('i').prepend("<img src='" + strArr[2] + "' alt=''>");
			}
		}
	});
}

function danmuPrepare() {
	if (!isBoundScrollStop) {
		isBoundScrollStop = true;
		$win.on('scrollStop', function() {
			var W = $win.width(),
				H = $win.height(),
				$hit = $(document.elementFromPoint(W / 2, H / 2)),
				i;

			if ($hit.is('#nextContent .lazy_pic')) {
				i = $hit.next('.danmu').data('index');
			} else if ($hit.is('#nextContent .danmu')) {
				i = $hit.data('index');
			} else {
				return;
			}
			danmuGoOn(i, danmuData[i], $hit);
		});
	}
}

function danmuGoOn(index, data, targetNode) {
	if (!danmu[index] || !data && !posting) {
		posting = true;
		var styleId = $(targetNode).parent().parent().attr('styleid');
		$.post('/aj/zulilyOld/hotSaleDanmu', {
			'style_id': styleId
		}, function(res) {
			if (res.error_code === 0 && res.data.data.length > 0) {
				data = res.data;
				danmuData[index] = data;
				danmu[mark] && danmu[mark].shutdown();
				addDanmu(index, data);
				mark = index;
			}
			posting = false;
		}, 'json');
	} else if (danmu[index] && index !== mark) {
		danmu[mark].shutdown();
		mark = index;
		danmu[index].restore();
	}
};
// 群圈
$('#qunquanBox').find('a').on('click', function() {
	var circle_id = $(this).data('id');
	if (Meilishuo.config.os.mlsApp) {
		var url = openAppLink.getAppLink({
			'protocol': 'circle',
			'param': {
				"circle_id": circle_id
			}
		});
		window.location.href = url;
	} else {
		openApp('meilishuo://circle.meilishuo?json_params=%7B%22circle_id%22%3A%22' + circle_id + '%22%7D');
	}
});