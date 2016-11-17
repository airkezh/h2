/*common*/
var $ = require('wap/zepto'),
	shareTmp = require('wap/component/shareTmp'),
	pin = require('wap/component/wapfall'),
	timedown = require('wap/app/doota/timedown'),
	scroll = require('wap/component/windowScroll'),
	touchSlide = require('wap/app/touchSlide'),
	menu = require('wap/page/tuan/tabSlide'),
	lazy = require('wap/component/lazzyLoad'),
	countdow = require('wap/app/countdown2'),
	tracking = require('wap/app/tracking'),
	Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
	,
	$pullUp = $('.pullUp'),
	$nav = $('.nav'),
	$imageSlide = $('#imageSlide'),
	$bannerBox = $('#bannerBox'),
	$gotop = $('.gotop');
window.MLS = {
	didLogin: function() {
		//成功登录之后，重新加载页面
		window.location.reload();
	}
};
/*拼接r参数（用于模版里）*/
function joinurl(protocol, param, isosapp, r, wapHref) {
	if (!protocol || !param) return false
	if (!isosapp) return wapHref || '###noapp'
	if (r) param.r = r
	var link = 'meilishuo'
	link += '://' + protocol + '.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(param))
	return link
};
var welfare = {
	init: function() {
		var totalNum = fml.vars.wlfTotalNum;
		/*初始化页面*/
		if (totalNum != "0") {
			this.lazyer = lazy.init({
				'xpath': ".bs_load_img"
			});
			this.lazyer.scroll();
			this.posterWall();
			this.topBtnHandle(30);
			/*图片加载完成后在吸顶*/
			var oImg = $bannerBox.find('img').last().get(0);
			if ($nav.length) {
				this.imgLoaded(oImg, this.navFixed);
			}
		}
		this.slide();
		this.eventInit();
	},
	posterWall: function() {
		var that = this;
		pin.init({
			containerId: '.goods_wall'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0
		};
		var pullUpAction = function() {
			posterWall.ajaxPoster(fml.vars.geturl);
		};
		Meilishuo.config.poster0 = '';
		posterWall.testPoster0(urlData, pullUpAction);
		posterWall.scrollPoster(true);
		fml.vars.toLogPoster = true;
		fml.eventProxy('logPoster', function(res) {
//			if (!res.list.length) {
//				$('.pullUp').hide();
//			} else {
//				$('.pullUp').show();
//			};
			/*我的福利跳转到详情页*/
			$('.myWlf_link').each(function(i, item) {
				var _this = $(this);
				var twitter_id = _this.attr("data_id");
				var detailUrl = joinurl('openURL', {
					'url': 'http://mapp.meilishuo.com/m_welfare/item/' + twitter_id
				}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/m_welfare/item/' + twitter_id);
				_this.attr("href", detailUrl);
			});
			$('.singleLink').each(function(i, item) {
				var _this = $(this);
				var data_pcUrl = _this.attr("data_pc_url");
				var data_url = _this.attr("data_url");
				if (data_url) {
					var detailUrl = joinurl('openURL', {
						'url': data_url
					}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, data_pcUrl);
					_this.attr("href", detailUrl);
				}
			});
			/*更改跳转链接结束*/
			that.lazyer.load();
		});
	},
	slide: function() { /*顶部banner轮番*/
		if (!$imageSlide) return;
		var slideHeight = Math.floor(200 * Cwidth / 640);

		$("#imageSlide,#imageSlide li").width(Cwidth).height(slideHeight + "px");

		if ($imageSlide.find('li').length > 1) {
			$imageSlide.touchSlide({
				autoTime: 5000
			});

			$('.num').find('b').text('');
		}
	},
	topBtnHandle: function(y) { /*页面下拉到一定位置，回顶部按钮显示*/
		scroll.yIn(y, function() {
				$gotop.show();
			},
			function() {
				$gotop.hide();
			})
	},
	imgLoaded: function(el, callback) {
		if (el) {
			if (el.complete) {
				callback();
			} else {
				el.onload = function() {
					callback();
				}
			}
		} else {
			callback();
		}
	},
	navFixed: function() {
		/*向下滑动导航固定*/
		scroll.yIn($nav.position().top + 10, function() {
			$nav.removeClass('scrollout').addClass('scrollin shadow');
		}, function() {
			$nav.removeClass('scrollin shadow').addClass('scrollout');
		});
	},
	eventInit: function() {
		var _this = this;
		$nav.find("li").on("click", function() {
			var index = $(this).index();
			/*tab切换埋点*/
			var adItem = Number(index) + 1;
			tracking.cr('welfare_index', {
				area: 'tab' + adItem,
				action: 'click'
			});
			/*埋点结束*/
			window.location.href = $(this).attr("data-url");
		});
		/*埋点－－start */
		$("#imageSlide .bannerLink").on("click", function(event) {
			var index = $("#imageSlide .bannerLink").index(this);
			var adItem = Number(index) + 1;
			var url = $(this).attr("data-url");
			tracking.cr('welfare_index', {
				area: 'banner' + adItem,
				action: 'click'
			});
			window.location.href = url;
			return false;
		});
		/*埋点－－end*/
		$gotop.on("click", function(e) {
			document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
		});
	}
};

if (fml.vars.isLogin == 0) {
	/*没有登录跳转到登录页面*/
	window.location.href = 'meilishuo://login.meilishuo';
	return;
} else {

	welfare.init();
}