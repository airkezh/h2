/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	onscroll = require('wap/component/windowScroll'),
	appShare = require('wap/app/appShare'),
	lazyLoad = require('m/component/lazyLoad'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	topBox = $('.top-box'),
	content = $('#content'),
	gotopObj = topBox.find('a'),
	sortBox = $('#sortBox'),
	sortDefault = $('#sortDefault'),
	sortPrice = $('#sortPrice'),
	sortSale = $('#sortSale'),
	sortDate = $('#sortDate'),
	limit = 6,
	page = 0,
	status = "done";

var scrollHeight = sortBox.offset().top;

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}


//一进页面加载数据
getWall(2, '/aj/zulily/index_style_list?&status=' + status + '&limit=' + limit + '&cat=' + fml.vars.cid, 'posterWall', false);

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
}

// 排序吸顶
if (!hasSticky()) {
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > scrollHeight) {
			sortBox.css({
				'position': 'fixed',
				'left': 0,
				'top': 0
			});
		} else {
			sortBox.css({
				'position': 'static'
			});
		}
	});
}

//重置瀑布流
function resetPostwall() {
	content.find('.pullUp').remove();
	content.find('#btnAll').remove();
	content.append('<div class="pullUp" status="loading"></div>');
	content.find('.goods_wall').height('0px').html('');
}

// 排序
function sortFun(self, param) {
	$('body')[0].scrollTop = scrollHeight;
	resetPostwall();
	sortBox.find('a').removeClass('cur').not(self).removeClass('sort-up').removeClass('sort-down');
	self.addClass('cur');
	getWall(2, '/aj/zulily/index_style_list?&status=' + status + '&limit=' + limit + '&cat=' + fml.vars.cid + '&sort=' + param, 'posterWall', false);
}
//
function clickSortFun(self, paramUp, paramDown) {
	if ($('.pullUp').attr('status') != 'loading') {
		if (self.hasClass('sort-up')) {
			self.removeClass('sort-up').addClass('sort-down');
			sortFun(self, paramUp);
		} else {
			self.removeClass('sort-down').addClass('sort-up');
			sortFun(self, paramDown);
		}
	}
}
//
function noSortFun(self, param) {
	if (self.hasClass('cur')) {
		return;
	}
	if ($('.pullUp').attr('status') != 'loading') {
		sortFun(self, param);
	}
}
//默认排序
sortDefault.on('click', function() {
	var self = $(this);
	noSortFun(self, 'default');
});
//价格排序
sortPrice.on('click', function() {
	clickSortFun($(this), 'priceup', 'pricedown');
});
//销量排序
// sortSale.on('click', function() {
// 	clickSortFun($(this), 'sellup', 'selldown');
// });
sortSale.on('click', function() {
	var self = $(this);
	noSortFun(self, 'sellup');
});
//上新时间排序
// sortDate.on('click', function() {
// 	clickSortFun($(this), 'newup', 'newdown');
// })
sortDate.on('click', function() {
	var self = $(this);
	noSortFun(self, 'newup');
})

//拉取瀑布流
function getWall(colNum, url, tmp, showBtn) {
	var lazy_pic = colNum == 1 ? '.lazy_pic_big' : '.lazy_pic';
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};

/*获取单品页链接*/
function getDoneUrl(ele, isBtn) {
	var style_id = parseInt(ele.data('styleId')),
		twitter_id = parseInt(ele.data('twitter_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id + '?trace_id=' + fml.vars.trace_id;
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr'));
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})

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
};