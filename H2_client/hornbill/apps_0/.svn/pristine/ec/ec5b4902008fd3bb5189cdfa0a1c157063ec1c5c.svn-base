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
	$('.first-btn').attr('href', 'meilishuo://login.meilishuo/?json_params=');
	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
		didLogin: function() {
			window.location.reload();
		}
	}
	/* 活动规则按钮 */
$('.first_rules').on('touchstart', function() {
	$('.first_popwin').show();
	$('.first-popwin-know').on('touchstart', function() {
		$('.first_popwin').hide();
	});
});
/* 助攻按钮 */
var zhuFlag = 0;
/*判断是否可以撕下*/
var siFlag = 0;
var jindu = fml.vars.jindu || 0;
var bai = [0, 40, 80, 120, 160, 200];
var blackTouMingDu = [0, .20, .60, .60, .60, .50];
var blackWidth = [30, 30, 30, 30, 15, 15];
var rotate = [0, 8, 10, 12, 14, 16, 18];
var height = [0, 104, 106, 108, 110, 112];
var times = Number(jindu) / 20;
var flag = true,
	zhuliNum = 0;
var _flag = flag;
var timer = setTimeout(function() {
	$(".start_brand").show();
}, 2000);
window.onload = function() {
		var $content = $("#simingpai"),
			$coverBlack = $(".cover_black"),
			$coverLeft = $(".cover_left"),
			$cover = $(".cover"),
			music = $('audio')[0];
		if (times == 4) {
			/*$("#audio_lh").attr("src", "http://i.meilishuo.net/css//images/wap/activity/crackbrand/lh_out.mp4");*/
		}
		new swipe.init({
			outer: $content
		});
		move_next(times);
		$content.on("moveRightEnd", function() {
			$content.trigger("tap");
		});
		$content.on("moveLeftEnd", function() {
			$content.trigger("tap");
		});
		$content.on("tap", function() {
			if (Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id) {
				window.location.href = 'meilishuo://login.meilishuo/?json_params=';
				return;
			}
			if (times == 5) {
				return;
			};
			if (zhuliNum) {
				return;
			}
			zhuliNum++;
			/*调用助力接口－start*/
			$.ajax({
				type: 'get',
				async: false,
				url: '/aj/single_aj/crackbrand/friend',
				data: {
					ass_gid: fml.vars.ass_gid
				},
				success: function(data) {
					res = JSON.parse(data);
					if (res && res.error_code == 0) {
						$(".friend_before").css("display", "none");
						$(".friend_after").css("display", "block");
						$(".friend_before_tips").css("display", "none");
						$(".firend_after_tips").css("display", "block");
						var jinduW = res.data.originator.fin_dist / res.data.originator.total_dist * 100;
						var jinducha = res.data.originator.total_dist - res.data.originator.fin_dist;
						$(".fb_tips").animate({
							opacity: 0.9,
							display: "block"
						}, 2, 'ease-out');
						if (fml.vars.jinducha == jinducha) {
							flag = false;
							/*证明没有撕掉*/
							var os_tips = "就差一点！鹿晗才不像祖蓝那么容易就被撕了呢";
						} else {
							flag = true;
							var os_tips = "成功撕下20%名牌!你和baby一样都是善良的小天使~"
							$("#success_tips").css("display", "block");
							var timer = setTimeout(function() {
								$("#success_tips").css("display", "none");
								if (jinducha == 0) {
									$("#award_link").attr("href", '/activity/crackbrand/awardFriend/?ass_gid=' + fml.vars.ass_gid + frm);
									$('#award_link').trigger('click');
								}
							}, 2000);
						}
						if (fml.vars.have_origed == 0) {
							$(".woyewan").css("display", "block");
						} else {
							$(".btn_jinzhan").css("display", "block");
						}

						$("#no_friend").css("display", "none");
						var friendMsg = "";
						for (var i = 0; i < res.data.assistant.length; i++) {
							var newMsg = res.data.assistant[i];
							friendMsg += '<div class="friends-msg">' + '<img class="friend-img" src="' + newMsg.user_pic + '">' + '<span class="friend-name">' + newMsg.nick_name + '</span>' + '<span class="friend-desc">&nbsp;&nbsp;&nbsp;' + newMsg.ass_desc + '</span></div>'
						}
						$(".os_tips").html(os_tips);
						$('.friends-list').html(friendMsg);

					} else {
						alert("鹿饭太多了,稍后重试哦～赶紧去前线买买买吧!");
						$("#hide_link").trigger("click");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("鹿饭太多了,稍后重试哦～赶紧去前线买买买吧!");
					$("#hide_link").trigger("click");
				}
			});
			/*助力接口－end*/
			_flag = flag;
			back_before(times);
			music.play();
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
	/*埋点*/
$('.brand_wrap').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=friend_assist:_pos_name=assist_amigo'
	});
});
$('.woyewan').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=friend_assist:_pos_name=play_too'
	});
});
$('.btn_jinzhan').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=friend_assist:_pos_name=myfare'
	});
});
/*微信分享*/
if (fml.vars.isWx) {
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
	WXShare.bind(shareData)
}