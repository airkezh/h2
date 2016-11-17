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
/*分享文字内容*/
var pageId = fml.vars.pageId;
if (pageId == "award") {
	/*中奖页的分享*/
	if (fml.vars.award_name == "undefined") {
		var discount_quan = "";
	} else {
		var discount_quan = fml.vars.award_name;
	}
	var shareText ='鉴定你是赫赫还是大黑牛的时刻到了！鹿晗的名牌你能撕下么？' ,
		shareImg = 'http://d04.res.meilishuo.net/pic/_o/4b/d4/1ab730a9dd721e0a303b242a3175_200_200.cg.jpg',
		shareTitle = '我得到' + fml.vars.award_name + '优惠券啦！成功撕下鹿晗名牌！大家快来玩！',
		shareUrl = window.location.href;
	if (fml.vars.extra.length == 0) {
		shareTitle = '成功撕下鹿晗名牌！据说全球只有1%的人才能做到！';
	}
} else {
	var shareText = '鉴定你是赫赫还是大黑牛的时刻到了！鹿晗的名牌你能撕下么？',
		shareImg = 'http://d04.res.meilishuo.net/pic/_o/4b/d4/1ab730a9dd721e0a303b242a3175_200_200.cg.jpg',
		shareTitle = '开撕吧名牌！100元优惠券人人有份！还不快来玩！',
		shareUrl = window.location.href;
}
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
	$('#btn_find_friend').attr('href', schemeLinkWx);
	if (fml.vars.extra.length == 0) {
		/*app未获取优惠券埋点*/
		$('#btn_find_friend').on('touchstart', function() {
			tracking.cr('friend_assists', {
				action: 'click',
				r: '_page_code=sponsor_end:_pos_name=app_share:status=fail:plat=mlsapp'
			});
		});

	} else {
		$('#btn_find_friend').on('touchstart', function() {
			tracking.cr('friend_assists', {
				action: 'click',
				r: '_page_code=sponsor_end:_pos_name=app_share:status=success:plat=mlsapp'
			});
		});
	}



}
if (fml.vars.isWx) {
	/*设置微信二次分享*/
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
		/*分享按钮*/
	$('#btn_find_friend').on('click', function() {
		$('.share-popwin').css('height', $('body').height() + 100);
		$('.share-popwin').show();
	});
	$('.share-popwin').on('click', function() {
		$(this).hide();
	});
	if (fml.vars.extra.length == 0) {
		/*wx未获取优惠券埋点*/
		$('#btn_find_friend').on('touchstart', function() {
			tracking.cr('friend_assists', {
				action: 'click',
				r: '_page_code=sponsor_end:_pos_name=app_share:status=fail:plat=weixin'
			});
		});
	} else {
		$('#btn_find_friend').on('touchstart', function() {
			tracking.cr('friend_assists', {
				action: 'click',
				r: '_page_code=sponsor_end:_pos_name=app_share:status=success:plat=weixin'
			});
		});
	}
}
/*埋点*/


/*去逛逛成功与不成功埋点－这是发起者的埋点*/
if (fml.vars.extra.length == 0) {
	$('.btn_own_guang').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=sponsor_end:_pos_name=app_promotin:status=fail'
		});
	});
} else {
	$('.btn_own_guang').on('touchstart', function() {
		tracking.cr('friend_assists', {
			action: 'click',
			r: '_page_code=sponsor_end:_pos_name=app_promotin:status=success'
		});
	});
}
/*好友助力页面点击去逛逛埋点*/
$('.btn_other_guang').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=assists_end:_pos_name=end_11promotion'
	});
});
/*我也要玩埋点*/
$('#award_friend_play').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=assists_end:_pos_name=play_too'
	});
});
$('#asard_friend_myfare').on('touchstart', function() {
	tracking.cr('friend_assists', {
		action: 'click',
		r: '_page_code=assists_end:_pos_name=myfare'
	});
});