/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');
require('wap/component/shareTmp');
var $ = require('wap/zepto'),
	swipe = require('cooper/component/swipe');
var tracking = require('wap/app/tracking');

var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var randomN = require('wap/component/lark/random');
var openApp = require('wap/app/openApp');

if (Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id) {
	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
	didLogin: function() {
		window.location.reload();
	}
}
var timer = setTimeout(function() {
	$(".brand_lh").show();
}, 2000);
/* 活动规则按钮 */
$('.first_rules').on('touchstart', function() {
	$('.first_popwin').show();
	$('.first-popwin-know').on('touchstart', function() {
		$('.first_popwin').hide();
	});
});

/*撕名牌*/
var error_code = fml.vars.error_code;
var bai = [0, 40, 80, 120, 160, 200];
var blackTouMingDu = [0, .20, .60, .60, .60, .50];
var blackWidth = [30, 30, 30, 30, 15, 15];
var rotate = [0, 16, 20, 25, 30, 35, 40];
var height = [0, 104, 106, 110, 116, 122]
var times = 0;
var flag = true;
var _flag = flag;
var zhinum = 0;
window.onload = function() {
	var $content = $("#start_btn"),
		$coverBlack = $(".cover_black"),
		$coverLeft = $(".cover_left"),
		$cover = $(".cover"),
		music = $('audio')[0];
	new swipe.init({
		outer: $content
	});
	move_next(times);
	$content.on("touchstart", function() {
		$content.trigger("moveLeftEnd");
	});
	$content.on("moveLeftEnd", function() {
		if (Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id) {
			window.location.href = 'meilishuo://login.meilishuo/?json_params=';
			return;
		}
		if (times == 5) {
			return;
		};
		$.ajax({
			type: 'get',
			async: false,
			url: '/aj/single_aj/crackbrand/origin',
			success: function(res) {
				res = JSON.parse(res);
				var error_code = res.error_code;
				if (error_code == "400400") {
					window.location.href = 'meilishuo://login.meilishuo/?json_params=';
					return;
				} else if (error_code == "400407") {
					alert("鹿饭太多了,稍后重试哦～赶紧去前线买买买吧!");
					$("#hide_link").trigger("click");
				} else {
					var firstFrm = fml.vars.isWx ? 'isWx' : 'isMLS';
					$('#first_play').attr('href', '/activity/crackbrand/start/?ass_gid=' + res.data.originator.id + '&frm=' + firstFrm);
					back_before(times);
					music.play();
					$("#success_tips").css("display", "block");
					var timer = setTimeout(function() {
						$("#success_tips").css("display", "none");
						$("#first_play").trigger("click");
						/*window.location.href = '/activity/crackbrand/start/?ass_gid=' + fml.vars.ass_gid + "&frm="firstFrm;*/
					}, 2000);
				}
			}
		});
	});

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
if (Meilishuo.config.os.mlsApp) {
	/*app埋点*/
	$('#start_btn').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=game_running_assist:_pos_name=flow_luhan:plat=mlsapp'
		});
	});
}




/*微信分享*/
if (fml.vars.isWx=="true") {
	var shareText = '鉴定你是赫赫还是大黑牛的时刻到了！鹿晗的名牌你能撕下么？',
		shareImg = 'http://d04.res.meilishuo.net/pic/_o/4b/d4/1ab730a9dd721e0a303b242a3175_200_200.cg.jpg',
		shareTitle = '开撕吧名牌！100元优惠券人人有份！还不快来玩！',
		shareUrl = window.location.href;
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
	WXShare.bind(shareData);
	/*wx埋点*/
	$('#start_btn').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=game_running_assist:_pos_name=flow_luhan:plat=weixin'
		});
	});
}