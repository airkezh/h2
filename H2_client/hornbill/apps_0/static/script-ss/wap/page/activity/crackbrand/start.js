/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');
require('wap/component/shareTmp');

var tracking = require('wap/app/tracking');

var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var randomN = require('wap/component/lark/random');
var openApp = require('wap/app/openApp');
var $ = require('wap/zepto'),
	swipe = require('cooper/component/swipe');
if (Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id) {
	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
		didLogin: function() {
			/*美丽说app 登录后回调  成功登录后，返回刷新页面。*/
			window.location.reload();
		}
	}
var timer = setTimeout(function() {
	$(".start_brand").show();
}, 2000);
	/* 活动规则按钮 */
$('.first_rules').on('touchstart', function() {
	$('.first_popwin').show();
	$('.first-popwin-know').on('touchstart', function() {
		$('.first_popwin').hide();
	});
});
$(".start").on("tap", function() {
	$(".start_tips").animate({
		opacity: 1,
		display: "block"
	}, 2, 'ease-out');
	setTimeout(function() {
		$(".start_tips").animate({
			opacity: 0,
			display: "none"
		}, 2, 'ease-out');
	}, 4000)
});
var jindu = fml.vars.jindu;
var bai = [0, 40, 80, 120, 160, 200];
var blackTouMingDu = [0, .20, .60, .60, .60, .50];
var blackWidth = [30, 30, 30, 30, 15, 15];
var rotate = [0, 8, 10, 12, 14, 16, 18];
var height = [0, 104, 106, 108, 110, 112];
var times = jindu / 20; /*表示已经完成几步了*/
var flag = false; /*true表示可以撕，false不可以撕*/
var _flag = flag
window.onload = function() {
	var $content = $(".start_brand"),
		$coverBlack = $(".cover_black"),
		$coverLeft = $(".cover_left"),
		$cover = $(".cover"),
		music = $('audio')[0];
	new swipe.init({
		outer: $content
	});
	move_next(times);


	function move_next(status) {
		$coverBlack.css({
			width: blackWidth[status] + "%"
		});
		$coverBlack.css({
			background: "-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, " + blackTouMingDu[status] + ")), to(rgba(0,0,0,0)))"
		});
		$coverLeft.css({
			"-webkit-transform": "rotate(-" + rotate[status] + "deg)",
			"height": +height[status] + "%"
		})
		$cover.css({
			"width": bai[status] + "%"
		});
		$cover.on('webkitTransitionEnd', function() {
			if (times == 5) {
				$coverLeft.hide();
				return;
			}
		});
	}

	function back_before(num) {
		if (_flag) {
			_flag = false;
			times = ++num;
		} else {
			setTimeout(function() {
				$cover.css({
					"width": bai[times] + "%"
				});
			}, 200);
			num = times + 1;
		}
		move_next(num);
	}
}

/*分享文字内容*/
var jinducha = fml.vars.jinducha || 80;
var shareText = '鉴定你是赫赫还是大黑牛的时刻到了！鹿晗的名牌你能撕下么？',
	shareImg = 'http://d04.res.meilishuo.net/pic/_o/4b/d4/1ab730a9dd721e0a303b242a3175_200_200.cg.jpg',
	shareTitle = '还差' + jinducha + '%！100块就在眼前！壮士来帮我撕鹿晗名牌！',
	shareUrl = window.location.href;
if (Meilishuo.config.os.mlsApp) {
	var schemeJsonWx = {
			type: 'weixin',
			message_type: 'webpage',
			title: shareTitle,
			text: shareText,
			url: shareUrl + '&frm=friend',
			thumb_url: shareImg
		},
		schemeLinkWx = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));
	$('.start_btn').attr('href', schemeLinkWx);
	/*app埋点*/
	$('.start_btn').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=sponsor_assist:_pos_name=assist_share:plat=mlsapp'
		});
	});
}

if (fml.vars.isWx) {
	/* 设置微信二次分享*/
	var shareData = {
		'desc': shareText,
		'imgUrl': shareImg,
		'title': shareTitle,
		'url': shareUrl
	};

	/*初始化加载分享的资源。*/
	WXSign();
	shareData = {
		'desc': shareText,
		'imgUrl': shareImg,
		'title': shareTitle,
		'url': shareUrl
	};

	WXShare.bind(shareData)
		/* 分享按钮*/
	$('.start_btn').on('click', function() {
		$('.share-popwin').css('height', $('body').height() + 100);
		$('.share-popwin').show();
	});
	$('.share-popwin').on('click', function() {
		$(this).hide();
	});
	/*wx埋点*/
	$('.start_btn').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=sponsor_assist:_pos_name=assist_share:plat=weixin'
		});
	});
}

