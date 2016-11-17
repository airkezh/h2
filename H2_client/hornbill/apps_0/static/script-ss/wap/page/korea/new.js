/*common*/
require('wap/zepto/fastclick');

var onscroll = require('wap/component/windowScroll'),
	touchSlide = require('wap/app/touchSlide'),
	poster = require('wap/app/posterPa'),
	posterWall = require('wap/app/posterWalls6'),
	// appShare = require('wap/app/appShare'),
	appIcon = require('wap/app/appIcon'),
	openApp = require('wap/app/openApp'),
	lazyLoad = require('wap/component/lazzyLoad'),
	openAppLink = require('wap/app/openAppLink');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	win = $(window),
	tab = $('#tab'),
	gotopObj = $('.top-box').find('a'),
	wrap = $('#wrap'),
	content = $('#content'),
	gotoShop = $('.gotoShop'),
	gotoKinds = $('.gotoKinds'),
	shopUlBox = $('#shopUlBox'),
	exchangeUl = shopUlBox.find('ul'),
	btnExchange = $('#btnExchange'),
	kindsUl = $('#kindsUl'),
	kindsLi = kindsUl.find('li'),
	limit = 6;
var requestAnimationFrame = win[0].requestAnimationFrame ||
	win[0].webkitRequestAnimationFrame ||
	win[0].mozRequestAnimationFrame ||
	oldStyleMove;
var tabOffset = 0;
requestAnimationFrame(function() {
	tabOffset = tab.offset().top;
})

if (weixinBrowser != -1) {
	openApp(location.href);
}

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
	// appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
	var appOpts = {
		'share': {
			'param': fml.vars.params,
			'channels': ['weixin', 'weixin_timeline']
		},
		'cart': true
	}
	appIcon(appOpts);
}

//一进页面加载数据
getWall(2, '/aj/korea/waterFall/indexWaterFall?limit=' + limit + '&sort=weight' + '&__get_r=1', 'posterWall', false);
// tab
tab.find('a').on('click', function() {
	$('body')[0].scrollTop = tabOffset;
	var self = $(this),
		sort = self.data('sort');
	if (self.hasClass('cur')) {
		return;
	}
	tab.find('a').removeClass('cur');
	self.addClass('cur');
	resetPostwall();
	getWall(2, '/aj/korea/waterFall/indexWaterFall?limit=' + limit + '&sort=' + sort + '&__get_r=1', 'posterWall', false);
})

//换一换
var exchangeUlLen = exchangeUl.length,
	exchangeIndex = 0,
	rotateIndex = 1;
btnExchange.on("click", function() {
	$(this).find('img').css({
		'transform': 'rotate(' + 180 * rotateIndex + 'deg)',
		'-webkit-transform': 'rotate(' + 180 * rotateIndex + 'deg)'
	});
	rotateIndex++;
	exchangeIndex < (exchangeUlLen - 1) ? exchangeIndex++ : (exchangeIndex = 0);
	// exchangeUl.hide().eq(exchangeIndex).show();
	exchangeUl.eq(exchangeIndex - 1).css({
		'transform': 'rotateY(90deg)',
		'-webkit-transform': 'rotateY(90deg)',
		'opacity': '0'
	});
	exchangeUl.eq(exchangeIndex).css({
		'transform': 'rotateY(0deg)',
		'-webkit-transform': 'rotateY(0deg)',
		'opacity': '1'
	})
});

// 判断是否支持overflow-scrolling:touch
function hasScrolling() {
	// CSS.supports('(-webkit-overflow-scrolling:touch) or (-moz-overflow-scrolling:touch) or (-o-overflow-scrolling:touch) or (-ms-overflow-scrolling:touch) or (overflow-scrolling:touch)')
	var element = document.createElement('div');
	element.style['webkitOverflowScrolling'] = 'touch';
	element.style['mozOverflowScrolling'] = 'touch';
	element.style['oOverflowScrolling'] = 'touch';
	element.style['msOverflowScrolling'] = 'touch';
	element.style['overflowScrolling'] = 'touch';
	return element.style['webkitOverflowScrolling'] === 'touch' || element.style['mozOverflowScrolling'] === 'touch' || element.style['oOverflowScrolling'] === 'touch' || element.style['msOverflowScrolling'] === 'touch' || element.style['overflowScrolling'] === 'touch'
}

//热门分类
if (hasScrolling()) {
	// 采用use_rem_screen时有小数情况
	var setWidth = window.getComputedStyle(kindsLi[0], null).width;
	var newLiWidth = parseInt(setWidth);
	if (parseInt(setWidth) != parseFloat(setWidth)) {
		newLiWidth = Math.ceil(parseFloat(setWidth));
		kindsLi.width(newLiWidth);
	}
	kindsUl.addClass('kinds-ul').find('ul').width(newLiWidth * kindsLi.length);
} else {
	kindsUl.touchSlide({
		isAuto: false,
		isSlideLi: true
	});
}

//重置瀑布流
function resetPostwall() {
	content.find('.pullUp').remove();
	content.append('<div class="pullUp" status="loading"></div>');
	content.find('.goods_wall').height('0px').html('');
}

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
		filterFun: function(res) {
			return res.data.goodsinfo;
		},
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};

/*获取单品页链接*/
function getDoneUrl(ele, tabTag, index) {
	var twitter_id = parseInt(ele.data('twitter_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr') + ':_page_code=korea_index:_page_area=waterfall:_ext_tabname=' + tabTag + ':_pos_id=' + index);
}
wrap.on('click', '.salelUrl', function() {
	var self = $(this),
		tabIndex = tab.find('.cur').index(),
		frameIndex = self.parent('.frame').data('index'),
		tabTag = 'fashion',
		index = 0;
	if (tabIndex == 0) {
		tabTag = 'fashion';
	} else if (tabIndex == 1) {
		tabTag = 'hot';
	} else if (tabIndex == 1) {
		tabTag = 'new';
	}
	index = frameIndex * limit + self.index() + 1;
	getDoneUrl($(this), tabTag, index);
});
//品牌推荐链接
gotoShop.on('click', function() {
	var shop_id = parseInt($(this).data('shop_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'shop',
			'param': {
				'shop_id': shop_id
			}
		}) : '/shop/shop/' + shop_id;
	window.location.href = window.__get_r(Url, shopUlBox.data('xr') + ':_page_code=korea_index:_page_area=brand:_ext_shop_id=' + shop_id);
});
//热门分类链接
gotoKinds.on('click', function() {
	var link = $(this).data('url');
	var cid = link.replace(/\/korea\/newList\//gi, '');
	var href = 'http://' + window.location.host + link;
	var Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
		'protocol': 'openURL',
		'param': {
			'url': href,
			'inApp': '1'
		}
	}) : href;
	link && (window.location.href = window.__get_r(Url, kindsUl.data('xr') + ':_page_code=korea_index:_page_area=classification:_ext_cid=' + cid));
});

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

// tab吸顶
if (!hasSticky()) {
	$(window).scroll(function() {
		var t = $(window).scrollTop();
		if (t > tabOffset) {
			tab.css({
				'position': 'fixed',
				'left': 0,
				"top": 0
			});
		} else {
			tab.css({
				'position': 'static'
			});
		}
	});
}
/*登陆成功后的回掉函数*/
window.MLS = {
	didLogin: function() {
		// 成功登录，跳转到下一步
		window.location.reload();
	}
};
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