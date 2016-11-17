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
		/*图片加载完成后在吸顶*/
		var oImg = $bannerBox.find('img').last().get(0);
		if ($nav.length) {
			this.imgLoaded(oImg, this.navFixed);
		}
		this.slide();
		this.eventInit();
	},
	posterWall: function() {
		var that = this;
		pin.init({
			containerId: '.reportList'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0
		};
		var pullUpAction = function() {
			posterWall.ajaxPoster('/aj/m_welfare/goodReport');
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
			$(".reprotImg").each(function(item, index) {
				var imgW = $(this).width();
				$(this).css("height", imgW);
			});
			/*跳转到报告页链接*/
			$('.reprotLink').each(function(i, item) {
				var _this = $(this);
				var twitter_id = _this.attr("data_id");
				var detailUrl = joinurl('openURL', {
					'url': 'http://mapp.meilishuo.com/m_welfare/reprotDetails/' + twitter_id
				}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/m_welfare/reprotDetails/' + twitter_id);
				_this.attr("href", detailUrl);
			});
			/*跳转到报告页链接end*/
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

var slideClass = {
	hasTouch: false,
	newClass: function(obj) {
		var obj = obj || {};
		if (this.hasTouch == false) {
			this.init.prototype = slideClass;
			this.hasTouch = true;
		}
		return new this.init(obj);
	},
	prevPage: function() {
		var _this = this;
		//_this.item > 0 ? _this.item = _this.item-- : 0;
		if (this.item != 0) {
			_this.item--;
		}
		_this.objAnimation(_this.item);
		_this.curItem(_this.item);
	},
	nextPage: function() {
		var _this = this;
		//_this.item < _this.mainLength ? _this.item = _this.item++ : _this.mainLength;
		if (this.item != _this.mainLength - 1) {
			_this.item++;
		}
		_this.objAnimation(_this.item);
		_this.curItem(_this.item);
	},
	objAnimation: function(setEq) {
		var _this = this;
		_this.slideBox.css("-webkit-transition", '.4s');
		_this.slideBox.css("-webkit-transform", 'translate3d(-' + setEq * Cwidth + 'px,0,0)');
	},
	curItem: function(setItem) {
		var _this = this;
		var currPage = setItem;
		var content = (currPage + 1) + ' / ' + _this.mainLength;
		if (_this.mainLength > 0) {
			_this.$bookmark.show();
		}
		_this.$bookmark.html(content)
	},
	bindTouch: function() {
		var _this = this;
		var startPage = {
				x: 0,
				y: 0
			},
			endPage = {
				x: 0,
				y: 0
			};
		_this.slide.on('touchstart', function(e) {
			e.preventDefault();
			/*渔村初始化坐标*/
			startPage.x = e.changedTouches[0].pageX;
			startPage.y = e.changedTouches[0].pageY;
		});
		_this.slide.on('touchmove', function(e) {
			e.preventDefault();
			var movePagex = e.changedTouches[0].pageX;
			var lateX = (movePagex - startPage.x) - _this.item * Cwidth;
			_this.slideBox.css("-webkit-transform", 'translate3d(' + lateX + 'px,0,0)');
			/*判断方向*/
			var movePagexNum = movePagex - startPage.x;
			if (movePagexNum != 0) {
				_this.slideBox.css("-webkit-transition", "0");
				_this.slideBox.css("-webkit-transform", 'translate3d(-' + _this.item * Cwidth + 'px' + ',0,0)');
			}
		});
		_this.slide.on('touchend', function(e) {
			endPage.x = e.changedTouches[0].pageX - startPage.x;
			endPage.y = e.changedTouches[0].pageY - startPage.y;
			if (Math.abs(endPage.x) > 50) {
				endPage.x > 0 ? _this.prevPage() : _this.nextPage();
			} else {
				_this.objAnimation(_this.item);
			}
		});
	},
	init: function(obj) {
		var _this = this;
		_this.item = 0;
		_this.slide = obj.slide;
		_this.slideBox = obj.slide.find("ul").eq(0);
		_this.mainLength = obj.slide.find('li').length;
		_this.slideItem = obj.slide.find('li');
		_this.$bookmark = obj.slide.find('.bookmark');
		_this.slideBox.css("width", Cwidth * _this.mainLength + "px");
		_this.slide.css("height", Cwidth + "px");
		_this.slideItem.css("width", Cwidth + "px");
		_this.bindTouch();
	}
};
