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
		/*初始化页面*/
		this.lazyer = lazy.init({
			'xpath': ".bs_load_img"
		});
		this.lazyer.scroll();
		this.posterWall();
		this.topBtnHandle(30);
		//		/*图片加载完成后在吸顶*/
		//		var oImg = $bannerBox.find('img').last().get(0);
		//		if ($nav.length) {
		//			this.imgLoaded(oImg, this.navFixed);
		//		}
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
			//			if (!res.data.list.length) {
			//				$('.pullUp').hide();
			//			} else {
			//				$('.pullUp').show();
			//			};
			$(".time").each(function(i, item) {
				var _this = $(this);
				var t_container = $('.time'),
					_hour = _this.children(".hour"),
					_minu = _this.children('.minu'),
					_sec = _this.children('.sec'),
					_day = _this.children('.day');
				var sTime = _this.attr('stime');
				timedown.down(_this, sTime, '0y-0d-0h-0i-0s')
					.onAction(function() {
						var t = arguments[2];
						day = t.d ? (t.hd < 10 ? "0" + t.d : t.d) : "0";
						hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
						minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
						sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
						if (_day.html() != day) {
							_day.html(day);
						}
						if (_hour.html() != hour) {
							_hour.html(hour);
						}
						if (_minu.html() != minu) {
							_minu.html(minu);
						}
						if (_sec.html() != sec) {
							_sec.html(sec);
						}
					}).onTimeOver(function() {
						window.location.reload();
					});

			});
			/*添加微信入口参数埋点*/
			if (Meilishuo.config.os.weixinBrowser == true) {
				/*福利详情页跳转链接*/
				$('.link_box').each(function(i, item) {
					var _this = $(this);
					var twitter_id = _this.attr("data_id");
					var detailUrl = joinurl('openURL', {
						'url': 'http://mapp.meilishuo.com/m_welfare/item/' + twitter_id + "?frm=wechat&r=2_mapp-m_welfare"
					}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/m_welfare/item/' + twitter_id + "?frm=wechat&r=2_mapp-m_welfare");
					_this.attr("href", detailUrl);
				});
				/*立即购买跳转链接*/
				$('.nowApply').each(function(i, item) {
					var _this = $(this);
					var data_pcUrl = _this.attr("data_pc_url") + "?frm=wechat&r=2_mapp-m_welfare";
					var data_url = _this.attr("data_url") + "?frm=wechat&r=2_mapp-m_welfare";
					var detailUrl = joinurl('openURL', {
						'url': data_url
					}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, data_pcUrl);
					_this.attr("href", detailUrl);
				});
				/*跳转链接 end*/
			} else {
				/*福利详情页跳转链接*/
				$('.link_box').each(function(i, item) {
					var _this = $(this);
					var twitter_id = _this.attr("data_id");
					var detailUrl = joinurl('openURL', {
						'url': 'http://mapp.meilishuo.com/m_welfare/item/' + twitter_id
					}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/m_welfare/item/' + twitter_id);
					_this.attr("href", detailUrl);
				});
				/*立即购买跳转链接*/
				$('.nowApply').each(function(i, item) {
					var _this = $(this);
					var data_pcUrl = _this.attr("data_pc_url");
					var data_url = _this.attr("data_url");
					var detailUrl = joinurl('openURL', {
						'url': data_url
					}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, data_pcUrl);
					_this.attr("href", detailUrl);
				});
				/*跳转链接 end*/
			}
			that.lazyer.load();
		});
	},
	slide: function() { //顶部banner轮番
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
	topBtnHandle: function(y) { //页面下拉到一定位置，回顶部按钮显示
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
		//向下滑动导航固定
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
welfare.init();
/*wx share*/
var WXShare = require('wx/share'),
	WXSign = require('wx/sign');
var shareText = '0 元欢乐无限购尽在【美丽说福利社】',
	shareImg = 'http://i.meilishuo.net/css/images/m_welfare/wx_share_icon.jpg',
	shareTitle = "美丽说－福利社",
	shareUrl = window.location.href;
if (fml.vars.isWx=="true") {
	// 设置微信二次分享
	var shareData = {
		'desc': shareText,
		'imgUrl': shareImg,
		'title': shareTitle,
		'url': shareUrl
	};

	//初始化加载分享的资源。
	WXSign();
	shareData = {
		'desc': shareText,
		'imgUrl': shareImg,
		'title': shareTitle,
		'url': shareUrl
	};
	WXShare.bind(shareData)
}