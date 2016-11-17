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
	openApp = require('wap/app/openApp'),
	Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
	,
	$pullUp = $('.pullUp'),
	$applyBtn = $('#applyBtn'),
	$imageSlide = $('#imageSlide'),
	$bannerBox = $('#bannerBox'),
	$gotop = $('.gotop');
window.MLS = {
	'didLogin': function() {
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
		//		if (Meilishuo.config.os.mlsApp == false) {
		//			var locationUrl = window.location.href;
		//			openApp(locationUrl);
		//		}
		this.slide();
		this.qCountDown();
		this.eventInit();
	},
	qCountDown: function() { //倒计时
		var t_container = $('.time'),
			_day = $("#day"),
			_hour = $('#hour'),
			_minu = $('#minu'),
			_sec = $('#sec');
		timedown.down(t_container, t_container.attr('stime'), '0y-0d-0h-0i-0s')
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
			if (res.list.length) {
				$('.pullup').show();
			} else {
				$('.pullUp').hide();
			}
			that.lazyer.load();
		});
	},
	topBtnHandle: function(y) { //页面下拉到一定位置，回顶部按钮显示
		scroll.yIn(y, function() {
				$gotop.show();
			},
			function() {
				$gotop.hide();
			})
	},
	slide: function() { //顶部banner轮番
		if (!$imageSlide) return;
		var slideHeight = Math.floor(200 * Cwidth / 640);

		$("#imageSlide,#imageSlide li").width(Cwidth).height(Cwidth + "px");

		if ($imageSlide.find('li').length > 1) {
			$imageSlide.touchSlide({
				autoTime: 5000
			});

			$('.num').find('b').text('');
		}
	},
	eventInit: function() {
		var _this = this;
		var status = fml.vars.status;
		var user_status = fml.vars.user_status,
			avtivity_id = fml.vars.activity_id,
			shopId = fml.vars.shopId,
			hasReport = fml.vars.hasReport;
		if (Meilishuo.config.user_id && user_status != "undefined") {
			switch (user_status) {
				case "1":
					$applyBtn.html("已申请").addClass("gray");
					break;
				case "2":
					$applyBtn.html("即将公布").addClass("gray");
					break;
				case "3":
				case "4":
				default:
					//3.已通过 4.未通过
					if (hasReport == 0) {
						$applyBtn.html("报告正在收集中...").addClass("gray");
					} else {
						$applyBtn.html("查看报告").addClass("pink");
					}
					break;
				case "5":
					$applyBtn.html("点击兑换").addClass("pink");
					break;
				case "6":
					$applyBtn.html("已失效").addClass("gray");
					break;
				case "7":
					$applyBtn.html("已失效").addClass("gray");
					break;
			}
		} else {
			switch (status) {
				case "0":
					$applyBtn.html("即将开始").addClass("gray");
					break;
				case "1":
					$applyBtn.html("免费申请").addClass("pink");
					break;
				case "2":
					$applyBtn.html("即将公布").addClass("gray");
					break;
				case "3":
				default:
					//$applyBtn.html("已经结束").addClass("gray");
					if (hasReport == 0) {
						$applyBtn.html("报告正在收集中...").addClass("gray");
					} else {
						$applyBtn.html("查看报告").addClass("pink");
					}
					break;
			}
		}
		$applyBtn.on("click", function(event) {
			if (fml.vars.hasReport == 1) {
				window.location.href = '/m_welfare/reprotList/' + avtivity_id;
			} else {
				//alert(Meilishuo.config.os.mlsApp);
				//if (Meilishuo.config.os.mlsApp == true) {
				if (fml.vars.isLogin != "0" && status == '1' && user_status != '1') {
					window.location.href = '/m_welfare/apply/' + avtivity_id;
				} else if (fml.vars.isLogin == "0" && status == '1') {
					//没有登录跳转到登录页面
					window.location.href = 'meilishuo://login.meilishuo';
					return;
				}
				//				} else {
				//					var locationUrl = window.location.href;
				//					openApp(locationUrl);
				//				}
			}
			return false;
		});
		///m_welfare/apply/<%=this.wlf_header.activity_id%>
		var tips = "";
		/*埋点－－start 1:四个单宝页面*/
		$("#productList .link_box").on("click", function(event) {
			var index = $("#productList .link_box").index(this);
			var adItem = Number(index) + 1;
			tracking.cr('welfare_detail', {
				area: 'ad' + adItem,
				action: 'click'
			});
			/*传递r参数*/
			var twitter_id = $(this).attr("data-twitter");
			var detailUrl = joinurl('twitter_single', {
				'twitter_info': {
					'twitter_id': twitter_id,
					'is_doota': 1
				}
			}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/share/item/' + twitter_id);
			window.location.href = detailUrl;
			return false;
		});
		/*2:商品详情*/
		$(".btn_wlf_detail").on("click", function(event) {
			tracking.cr('welfare_detail', {
				area: 'twitter',
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
		$("#btnSpecial").on("click", function(event) {
			var url = $(this).attr("data-url");
			tracking.cr('welfare_detail', {
				area: 'subject',
				action: 'click'
			});
			window.location.href = url;
			return false;
		});
		/*埋点－－end*/
		/*新增店铺埋点跳转*/
		$("#shop_title").on("click", function() {
			tracking.cr('welfare_detail', {
				area: 'shop',
				action: 'click'
			});
			/*传递r参数*/
			var urlStr = window.location.href;
			if (urlStr.indexOf('?') > 0) {
				var shop_r = "2_mapp-m_welfare.2_mapp-m_welfare_item:rw_param_1=979:";
			} else {
				var shop_r = "navigation-home_top:_page_id=1200002:pos=4:area=sales:_page_area=sales:_pos_id=4:_pos_name=welfare.2_mapp-m_welfare";
			}
			var twitter_id = $(this).attr("data_id");
			var detailUrl = joinurl('shop', {
				'shop_id': twitter_id
			}, Meilishuo.config.os.mlsApp, shop_r, '/shop/' + twitter_id);
			window.location.href = detailUrl;
			return false;
		});
		/*店铺埋点end*/
	}
};
welfare.init();

/*wx share*/
var WXShare = require('wx/share'),
	WXSign = require('wx/sign');
var shareText = fml.vars.wx_cont,
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