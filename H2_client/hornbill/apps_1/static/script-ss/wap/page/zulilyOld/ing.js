/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var poster = require('wap/app/posterPa'),
	appShare = require('wap/app/appShare'),
	lazyLoad = require('m/component/lazyLoad'),
	tracking = require('wap/app/tracking'),
	shareTmp = require('wap/component/shareTmp'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	content = $('#content'),
	goods_wall = $('.goods_wall'),
	limit = 6,
	wideLimit = 5,
	page = 0,
	status = "ing";

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

poster.set({
	colNum: 2
});
var data = {
	url: '/aj/zulilyOld/index_style_list?&limit=' + limit + '&status=' + status + '&wideLimit=' + wideLimit,
	poster: poster,
	posterMargin: $('#content').offset().top,
	marginOffset: 0,
	lazyLoad: lazyLoad.init({
		xpath: '.lazy_pic'
	})
}
posterWall.scroll(data);



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
		styleId = parseInt(eleParent.attr('styleId'));
	if (ele.hasClass('zan_love')) {
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
goods_wall.on('click', '.progress .zan_normal', function() {
	event.stopPropagation();
	event.preventDefault();
	if (fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
		return;
	}
	support($(this));
})


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
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr'));
};
content.on('click', '.detailUrl', function() {
	getIngUrl($(this));
})