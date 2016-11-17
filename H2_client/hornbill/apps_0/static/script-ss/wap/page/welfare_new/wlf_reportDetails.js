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
	Cheight = $(window).height(),
	$pullUp = $('.pullUp'),
	$gotop = $('.gotop'),
	$subArea = $("#subArea");

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
		this.lazyer = lazy.init({
			'xpath': ".bs_load_img"
		});
		this.lazyer.scroll();
		this.posterWall();
		this.topBtnHandle(30);
		this.topCommentHandle($("#reportH").height() + 100);
		this.eventInit();
	},
	topBtnHandle: function(y) { /*页面下拉到一定位置，回顶部按钮显示*/
		scroll.yIn(y, function() {
				$gotop.show();
			},
			function() {
				$gotop.hide();
			})
	},
	topCommentHandle: function(y) { /*页面下拉到一定位置，回顶部按钮显示*/
		scroll.yIn(y, function() {
				$subArea.removeClass('scrollout').addClass('scrollin shadow');
			},
			function() {
				//$gotop.hide();
				$subArea.removeClass('scrollin shadow').addClass('scrollout');
			})
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
			posterWall.ajaxPoster('/aj/m_welfare/wlf_comment_list?report_id=' + fml.vars.itemId);
		};
		Meilishuo.config.poster0 = '';
		posterWall.testPoster0(urlData, pullUpAction);
		posterWall.scrollPoster(true);
		fml.vars.toLogPoster = true;
		fml.eventProxy('logPoster', function(res) {
			if (!res.data.list.length) {
				$pullUp.hide();
				$(".loadMore").hide();
			} else {
				$pullUp.show();
				$(".loadMore").show();
			};
			var oldTotalNum=$("#commentNum").find("b.totalNum");
			if(Number(oldTotalNum.html())!=res.data.totalNum){
				oldTotalNum.html(res.data.totalNum);
			}
			that.lazyer.load();
		});
	},
	eventInit: function() {
		var _this = this;
		/*2:商品详情*/
		$("#btnWantBuy").on("click", function(event) {
			tracking.cr('welfare_try', {
				area: 'want_buy',
				action: 'click'
			});
			/*传递r参数*/
			var twitter_id = $(this).attr("data_id");
			var detailUrl = joinurl('twitter_single', {
				'twitter_info': {
					'twitter_id': twitter_id,
					'is_doota': 1
				}
			}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/share/item/' + twitter_id);
			window.location.href = detailUrl;
			return false;
		});
		/*喜欢*/
		$("#likeBtn").on("click", function() {
			if (fml.vars.isLogin == "0") {
				//没有登录跳转到登录页面
				window.location.href = 'meilishuo://login.meilishuo';
				return;
			}
			var $like_num = $("#likeNum").find("b.like_num");
			if ($(this).hasClass("unlikeStyle")) {
				/*like*/
				$.get("/aj/m_welfare/wlf_report_like", {
					"item_id": fml.vars.itemId
				}, function(res) {
					if (typeof res == "string")
						res = JSON.parse(res);
					if (res.error_code == 0) {
						$("#likeBtn").removeClass("unlikeStyle");
						$("#likeBtn").addClass("likeStyle");
						$like_num.html(parseInt($like_num.html()) + 1);
					}
				});
			} else if ($(this).hasClass("likeStyle")) {
				$.get("/aj/m_welfare/wlf_report_unlike", {
					"item_id": fml.vars.itemId
				}, function(res) {
					if (typeof res == "string")
						res = JSON.parse(res);
					if (res.error_code == 0) {
						$("#likeBtn").removeClass("likeStyle");
						$("#likeBtn").addClass("unlikeStyle");
						$like_num.html(parseInt($like_num.html()) - 1);
					}
				});
			}
		});
		/*喜欢end*/
		/*文本域变化事件*/
//		var _tContent = document.getElementById("tContent");
//		_tContent.onkeydown = function() {
//			if (this.value.length > 0) {
//				document.getElementById("subComment").style.color = "#666666";
//			} else {
//				document.getElementById("subComment").style.color = "#CCCCCC";
//			}
//		};
		/*发表评论*/
		$("#subComment").on("click", function() {
			if (fml.vars.isLogin == "0") {
				//没有登录跳转到登录页面
				window.location.href = 'meilishuo://login.meilishuo';
				return;
			}
			if ($("#subComment").hasClass("subing")) {
				return;
			}
			$("#subComment").addClass("subing");
			$("#subComment").html("正在发表");
			var tContent = $("#tContent").val();
			if (tContent.length > 0) {
				$.get("/aj/m_welfare/wlf_add_comment", {
					"report_id": fml.vars.itemId,
					"tContent": tContent
				}, function(r) {
					if (fml.vars.reportNum == 0) {
						window.location.reload();
					} else {
						_this.posterWall();
					}
					$("#subComment").html("发表");
					$("#tContent").val("");
					$("#subComment").removeClass("subing");
				});
			}
		});
		/*发表评论－end*/
		/*分享*/
		$("#wlf_shareBtn").on("click", function() {
			$(".dialog_box").css("display","block");
			$(".dialog_box").on("click",function(){
				$(".dialog_box").css("display","none");
			});
			$(".share_con").on("click",function(e){
				e.stopPropagation();
			});
		});
		/*分享 end*/
		$gotop.on("click", function(e) {
			document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
		});
	}
};
welfare.init();


/**
 * banner移动端轮播图类
 * @class Slide-class
 * @static
 * @requires
 * @author shunxin Yang
 */
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
		for (var i = 0; i < _this.aniItem.length; i++) {
			_this.aniItem[i].className = '';
		}
		_this.aniItem[setItem].className = 'cur';
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
			if (Math.abs(endPage.x) >= 50) {
				endPage.x > 0 ? _this.prevPage() : _this.nextPage();
			} else {
				_this.objAnimation(_this.item);
				if ($("#slide").hasClass("bigImg")) {
					$("#slide").removeClass("bigImg").addClass("overHide");
					$("#slide").css("height", Cwidth + "px");
					_this.slideItem.css("height", Cwidth + "px");
				} else {
					$("#slide").addClass("bigImg").removeClass("overHide");
					$("#slide").css("height", Cheight + "px");
					_this.slideItem.css("height", Cheight + "px");
				}
			}
		});
	},
	init: function(obj) {
		var _this = this;
		_this.item = 0;
		_this.slide = obj.slide;
		_this.slideBox = obj.slide.find(".slide-box").eq(0);
		_this.mainLength = obj.slide.find('.smain').length;
		_this.slideItem = obj.slide.find('.smain');
		_this.$bookmark = obj.slide.find('.scur');
		_this.aniItem = obj.slide.find('#scur').find("i");
		_this.slideBox.css({
			"width": Cwidth * _this.mainLength + "px",
			"height": Cwidth + "px"
		});
		_this.slide.css("height", Cwidth + "px");
		_this.slideItem.css({
			"width": Cwidth + "px",
			"height": Cwidth + "px"
		});
		_this.bindTouch();
	}
};
var slideObj = {
	slide: $("#slide")
}
slideClass.newClass(slideObj);




/*wx share*/
var WXShare = require('wx/share'),
	WXSign = require('wx/sign');
var shareText = "",
	shareImg = fml.vars.wx_pic,
	shareTitle = fml.vars.wx_title,
	shareUrl = window.location.href;
if (fml.vars.isWx == "true") {
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