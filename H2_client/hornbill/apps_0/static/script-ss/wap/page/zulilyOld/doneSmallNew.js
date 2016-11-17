/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	appShare = require('wap/app/appShare'),
	lazyLoad = require('m/component/lazyLoad'),
	tracking = require('wap/app/tracking'),
	// shareTmp = require('wap/component/shareTmp'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	tabNew = $('#tabNew'),
	content = $('#content'),
	newBox = $('#newBox'),
	prevTabNew = $('#prevTabNew'),
	nextTabNew = $('#nextTabNew'),
	specialTabNew = $('#specialTabNew'),
	kinds = $('#kinds'),
	sortBox = $('#sortBox'),
	sortDefault = $('#sortDefault'),
	sortPrice = $('#sortPrice'),
	sortSale = $('#sortSale'),
	sortDate = $('#sortDate'),
	limit = 6,
	wideLimit = 5,
	page = 0,
	status = "done";

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

var tabHeight = $('#tab').height();
location.hash = location.hash ? location.hash : '#new';

//一进页面加载数据
loadFun();

function loadFun() {
	tabNew.find('div').removeClass('cur');
	if (location.hash == '#old') {
		nextTabNew.addClass('cur');
		newBox.hide();
		kinds.show();
		sortBox.show();
		sortBox.find('a').removeClass('cur').removeClass('sort-up').removeClass('sort-down');
		sortDefault.addClass('cur');
		content.removeClass('new-content');
		getWall(2, '/aj/zulilyOld/index_style_list?&limit=' + limit + '&status=' + status + '&tag=new', 'posterWall', false);
	} else if (location.hash == '#special') {
		specialTabNew.addClass('cur');
		newBox.hide();
		kinds.hide();
		sortBox.hide();
		content.addClass('new-content');
		getWall(1, '/aj/zulilyOld/style_special?wideLimit=' + wideLimit, 'specialPosterWall', false);
	} else {
		prevTabNew.addClass('cur');
		newBox.show();
		kinds.hide();
		sortBox.hide();
		content.addClass('new-content');
		getWall(1, '/aj/zulilyOld/style_new_list?flag=list&wideLimit=' + wideLimit, 'newPosterWall', true);
	}
}

//tab click
prevTabNew.on('click', function() {
	tabFun($(this), '#new');
})
nextTabNew.on('click', function() {
	tabFun($(this), '#old');
})
specialTabNew.on('click', function() {
	tabFun($(this), '#special');
})
wrap.on('click', '#btnAll', function() {
	tabFun($(this), '#old');
})

// tabFun
function tabFun(self, hash) {
	if (self.hasClass('cur')) {
		return;
	}
	if ($('.pullUp').attr('status') != 'loading') {
		location.hash = hash;
		$('body')[0].scrollTop = 0;
		resetPostwall();
		loadFun();
	}
};

//重置瀑布流
function resetPostwall() {
	content.find('.pullUp').remove();
	content.find('#btnAll').remove();
	content.append('<div class="pullUp" status="loading"></div>');
	content.find('.goods_wall').height('0px').html('');
}

// 排序
function sortFun(self, param) {
	resetPostwall();
	sortBox.find('a').removeClass('cur').not(self).removeClass('sort-up').removeClass('sort-down');
	self.addClass('cur');
	getWall(2, '/aj/zulilyOld/index_style_list?&limit=' + limit + '&status=' + status + '&tag=new' + '&sort=' + param, 'posterWall', false);
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
		marginOffset: 1000,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};

// 判断是否支持position：sticky
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
		if (t > 0) {
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
	var style_id = parseInt(ele.data('styleId')),
		twitter_id = parseInt(ele.data('twitter_id')),
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
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr'));
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
wrap.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})

// 打开专题链接
wrap.on('click', '.special-list', function() {
	var self = $(this);
	var url = self.data('url');
	var xr = self.parents('.frame').data('xr');
	window.location.href = window.__get_r(url, xr);
})