/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var poster = require('wap/app/posterPa'),
	appShare = require('wap/app/appShare'),
	// lazyLoad = require('m/component/lazyLoad'),
	tracking = require('wap/app/tracking'),
	shareTmp = require('wap/component/shareTmp'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	wrap = $('#wrap'),
	tabNew = $('#tabNew'),
	content = $('#content'),
	recommend = $('#recommend'),
	prevSpecial=$('#prevSpecial'),
	nextSpecial=$('#nextSpecial'),
	goods_wall = $('.goods_wall'),
	prevTabNew = $('#prevTabNew'),
	nextTabNew = $('#nextTabNew'),
	limit = 5,
	wideLimit = 5,
	page = 0,
	status = "done";

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

var tabHeight = $('#tab').height();
var tabBoxOffset = 0;
//android和iOS的区别,ios支持sticky，Android不支持
if (!hasSticky()) {
	tabBoxOffset = tabNew.offset().top - tabHeight * 2;
} else {
	tabBoxOffset = tabNew.offset().top - tabHeight;
}
var hasRecommend = false;
var marginOffset = 1000;
//一进页面加载数据
loadFun();

function loadFun() {
	if (location.hash == '#old') {
		prevTabNew.find('a').removeClass('cur');
		nextTabNew.find('a').addClass('cur');
		prevSpecial.hide();
		nextSpecial.show();
		getRecommend(recommend, 1);
		getWall('');
	} else {
		prevTabNew.find('a').addClass('cur');
		nextTabNew.find('a').removeClass('cur');
		nextSpecial.hide();
		prevSpecial.show();
		getRecommend(recommend, 0);
		getWall('&tag=new');
	}
}

//tab click
prevTabNew.click(function() {
	location.hash = '#new';
	tabFun($(this));
});
nextTabNew.click(function() {
	location.hash = '#old';
	tabFun($(this));
});

// tabFun
function tabFun(self) {
	if (self.find('a').hasClass('cur')) {
		return;
	}
	$('body')[0].scrollTop = tabBoxOffset;
	content.find('.pullUp').remove();
	content.append('<div class="pullUp" status="loading"></div>');
	content.find('.goods_wall').html('');
	recommend.removeClass('recommend').html('');
	loadFun();
};

//拉取瀑布流
function getWall(tag) {
	// if (!hasRecommend) {
	// 	marginOffset = 0;
	// }
	poster.set({
		colNum: 2
	});
	var date = {
		url: '/aj/zulily/index_style_list?&limit=' + limit + '&status=' + status + '&wideLimit=' + wideLimit + tag,
		poster: poster,
		posterMargin: $('#content').offset().top,
		marginOffset: marginOffset
	}
	posterWall.scroll(date);
};
// 拉取推荐大图
function getRecommend(obj, showTab) {
	obj.append("<div class='pullUp' status='loading'></div>");
	$.ajax({
		type: 'get',
		dataType: 'json',
		url: '/aj/zulily/recommend',
		data: {
			'status': 'done',
			'recommend': showTab
		},
		success: function(res) {
			if (res.data.small.length) {
				hasRecommend = true;
				var tpl = shareTmp('recommendTpl', {
					'recommend': res.data.small
				});
				obj.addClass('recommend').append(tpl);
			}
			obj.find('.pullUp').remove();
		},
		error: function(error) {
			reload(obj, getRecommend, showTab);
		}
	});
};

//重新加载
function reload(obj, callback, showTab) {
	obj.find('.pullUp').remove();
	obj.append("<div class='error_msg'><p>Sorry，页面奋力加载失败了</p><div class='js_reload error_reload'><span>重新加载</span></div></div>");
	obj.find('.error_reload').find('span').off('click').on('click', function() {
		obj.find('.error_msg').remove();
		callback(obj, showTab);
	})
};

// 判断时候支持position：sticky
function hasSticky() {
	var element = document.createElement('div');
	if ('position' in element.style) {
		element.style['position'] = '-webkit-sticky';
		element.style['position'] = '-moz-sticky';
		element.style['position'] = '-o-sticky';
		element.style['position'] = '-ms-sticky';
		element.style['position'] = 'sticky';
		return element.style['position'] === '-webkit-sticky' || element.style['position'] === '-moz-sticky' || element.style['position'] === '-o-sticky' || element.style['position'] === '-ms-sticky' || element.style['position'] === 'sticky'
	} else {
		return false;
	}
};
// tab吸顶
if (!hasSticky()) {
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > tabBoxOffset) {
			tabNew.css({
				'position': 'fixed',
				'left': 0,
				"top": tabHeight,
				"border-bottom": "1px solid #d3d3d3"
			});
		} else {
			tabNew.css({
				'position': 'static',
				"border-bottom": "none"
			});
		}
	});
}

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
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
wrap.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})
