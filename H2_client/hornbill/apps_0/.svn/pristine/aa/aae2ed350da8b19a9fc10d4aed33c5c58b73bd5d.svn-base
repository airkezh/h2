/*common*/
require('wap/zepto/fastclick');
require('wap/zepto');
var tr = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp'),
	Alert = require('wap/ui/alert'),
	shareTo = require('wap/app/shareTo'),
	openApp = require('wap/app/openApp'),
	win = window;
var callApi = require('wap/component/callApi');
var winning = false;
var winInfo = '';
var wood2 = require('wap/page/lark/wood2'),
	ddl = wood2.ddl;

var status=1
	, offon = true;

function weixin_share(){
	if (Meilishuo.config.os.weixinBrowser) {
		var signWX = require('wx/sign'),
			shareWX = require('wx/share');
		signWX();
			fml.vars.shareData = {
				'desc': '来美丽说消费满420元100%得鹿爷高清广告花絮！更有机会中鹿爷签名小粉箱！还不快来买买买！',
				'imgUrl': 'http://d03.res.meilishuo.net/pic/_o/f2/20/9fc97c3b7cda2ece08ea00b578f7_100_100.cf.jpg',
				'title': '【鹿粉福利】来美丽说有机会获鹿爷签名小粉箱！'
			};

		shareWX.bind(fml.vars.shareData);
	}
}





(function() {
	weixin_share();
	//点击分享按钮判断是微信还是app
	$("body").on("click", ".share_btn", function() {

		if (Meilishuo.config.os.weixinBrowser) {
			alertSharewx()
		} else if (Meilishuo.config.os.mlsApp) {
			alertShareapp()
		}
	});

	$('body').on('click', '#gomai', function() {
		var url = 'http://m-promotion.meilishuo.com/promotion/sale_1505/mv/?frm=luhanbag' //主会场
		if (Meilishuo.config.os.weixinBrowser) {
			openApp(url);
		}
	})
	$("body").on("click", "#share_pyq", function() {
		var status=0;
		share(1);
	});
	$("body").on("click", "#share_wx", function() {
		var status=1;
		share(0);
	});

}())



// 	$('body').on('click', '#weiboOpen', function() {
// 		tr.cr('fruit_download');
// 		var url = window.location.href;
// 		openApp(url);
// 	})
// 	$('body').on('click', '#goapp', function() {
// 		tr.cr('fruit_cupponpush');
// 		var url = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game';
// 		openApp(url);
// 	})
// 	$('body').on('click', '#gohuic', function() {
// 		tr.cr('fruit_huichang');
// 		window.location.href = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game'; //主会场
// 	})
// 	$('body').on('click', '#gomai', function() {
// 		tr.cr('fruit_huichang');
// 		var url = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game' //主会场
// 		if (Meilishuo.config.os.weixinBrowser) {
// 			tr.cr('fruit_download');
// 			openApp(url);
// 		}
// 	})



// }())



function alertShareapp() {
	var tpl = shareTmp('share_app');
	$("body").append(tpl);
}

function alertSharewx() {
	var tpl = shareTmp('share_wx');
	$("body").append(tpl);
}

//点击分享按钮判断是微信还是app
$("body").on("tap", ".share_btn", function() {
	tr.cr('luhan_share');
	if (Meilishuo.config.os.weixinBrowser) {
		alertSharewx();
	} else if(Meilishuo.config.os.mlsApp) {
		alertShareapp();
	}
});





function replaceParamVal(paramName,replaceWith) {
    var oUrl = this.location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    return nUrl;
}
function share(type) {
	var pic = 'http://d03.res.meilishuo.net/pic/_o/f2/20/9fc97c3b7cda2ece08ea00b578f7_100_100.cf.jpg';
	var shareUrl = window.location.href;

	if(status==0){
		var c = '【鹿粉福利】来美丽说有机会获鹿爷签名小粉箱！';
		var t='鹿粉Attention！鹿爷签名小粉箱要不要！';
		var params = {
			'title': t,
			'text': c,
			'pic': pic,
			'url': shareUrl
		};
		shareAct(params, type);
	}

	else{
		var c = '来美丽说消费满420元100%得鹿爷高清广告花絮！更有机会中鹿爷签名小粉箱！还不快来买买买！';
		var t='鹿粉Attention！鹿爷签名小粉箱要不要！';
		var params = {
			'title': t,
			'text': c,
			'pic': pic,
			'url': shareUrl
		};
		shareAct(params, type);
	}

	}



// function share(type) {
// 	var pic = 'http://d02.res.meilishuo.net/pic/_o/a6/e4/2376a5d6652981188ee5192d39de_100_100.cf.jpg';
// 	var shareUrl = replaceParamVal('frm','fruit_from_share');
// 	if (winning) {
// 		var c = 'RP爆表超开心！把我的好运传给你~lucky传送==>biubiubiu';
// 		var c = '来美丽说有机会获鹿爷签名小粉箱！';
// 		var t='鹿晗';
// 		var params = {
// 			'title': t,
// 			'text': c,
// 			'pic': pic,
// 			'url': shareUrl
// 		};
// 		shareAct(params, type);
// 	} else {
// 		var c = '不灰心，不丧气，分享给你再继续~水果堆堆乐放学憋走！！';

// 		if (type) {
// 			//未中奖朋友圈内容设定
// 			var t = '堆到' + gobl_count + '层不甘心！我要跟水果堆堆乐大战三百回合！'
// 		} else {
// 			//未中奖朋友内容设定
// 			var t = '艾玛只堆' + gobl_count + '到层！ 快帮我一起玩水果堆堆乐~'
// 		}
// 		var params = {
// 			'title': t,
// 			'text': c,
// 			'pic': pic,
// 			'url': shareUrl
// 		};
// 		//console.log(params)
// 		shareAct(params, type);
// 	}

// }

// function getCookie(name) {
// 	var nameEQ = name + "=";
// 	var ca = document.cookie.split(';');
// 	for (var i = 0; i < ca.length; i++) {
// 		var c = ca[i];
// 		while (c.charAt(0) == ' ') {
// 			c = c.substring(1, c.length);
// 		}
// 		if (c.indexOf(nameEQ) == 0) {
// 			return unescape(c.substring(nameEQ.length, c.length));
// 		}
// 	}
// 	return false;
// }

// function setCookie(name, value, seconds) {
// 	seconds = seconds || 0;
// 	var expires = "";
// 	if (seconds != 0) {
// 		var date = new Date();
// 		date.setTime(date.getTime() + (seconds * 1000));
// 		expires = "; expires=" + date.toGMTString();
// 	}
// 	document.cookie = name + "=" + escape(value) + expires + "; path=/";
// }

// function getQueryString(name) {
// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
// 	var r = window.location.search.substr(1).match(reg);
// 	if (r != null) return unescape(r[2]);
// 	return null;
// }



/**
 * 登录态区分逻辑处理
 * 顺道把微信签名和分享的写这里了
 * by yaoyao
 */

/**
 * shareAct 分享相关逻辑
 * @return {Void}
 */
var shareAct = function(opt, type) {
	if (Meilishuo.config.os.mlsApp) {
		opt = opt || {
			'text': '描述',
			'title': '分享文案',
			'pic': '分享图片url',
			'url': '分享链接地址，不写就是本身'
		}
		if (type) {
			shareTo.shareToPengYouQuan(opt);
		} else {
			shareTo.shareToPengYou(opt);
		}
	} else if (fml.vars.isWx) {
		//签名开始
		var signWX = require('wx/sign'),
			shareWX = require('wx/share');
		signWX();
		fml.vars.shareData = opt || {
			'desc': '描述',
			'imgUrl': '分享图片url',
			'title': '分享文案'
		};
		shareWX.bind(fml.vars.shareData);
		//签名结束

		//TODO 
		//微信分享浮层弹出，以及相关引导逻辑
	}
}


/**
 * loginMls 美丽说登陆逻辑
 * @return {Void}
 */
var loginMls = function() {
	window.MLS = {
		didLogin: function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	if (!Meilishuo.config.user_id && Meilishuo.config.os.mlsApp) {

		window.location.href = 'meilishuo://login.meilishuo/?json_params=';

		// $('body').append('<div class="mask_box"></div>')
		// $('body').on('click', '.mask_box', function(e) {
		// 	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// })
	};
}


/**
 * init 入口函数
 * @return {Void}
 */
var init = function() {
	loginMls();
}

init();

$("body").on('tap','.gbgz',function(){
	$('.bglh').remove();
})


$("body").on('tap','.close_dialog',function(){
	$('div[rel=closeMask]').remove();
})

$("body").on('tap','.wx_tip',function(){
	$('div[rel=closeMask]').remove();
})
function isEmail(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}

$('#submit').on('click',function(){
	var email=$('#email').val();

	if(!email || $('#submit').html() == '修改') {
		$('#email').focus()
	}
	if(email && isEmail(email)==false){
		alert("请输入正确邮箱!");
	}
})


	$('#submit').on('click', function(){

		var email=$('#email').val();
		if(isEmail(email)==true && offon){
		    var url1='/aj/activity/lh515';
		    var data={
		    	'email': email,
		    	'activity':'spokesman_luhan_515'
			};
		    $.post(url1, data,function(res){
		        if(res.error_code==0){
		        	alert('提交成功！');
		        	window.location.reload();
		        }
		    }, 'json');  

		}
		offon = true;

	});



$('.rule').on('tap',function(){
	tpl=shareTmp('gz');
	$('body').append(tpl);
})

$.post("/aj/activity/lhuser",{"activity": "spokesman_luhan_515"}, function(res) {
    if (res.error_code == 0) {
    	var uemail=res.data.email;
    	if(uemail){
        	$('#email').val(uemail);
        	$('#submit').html('修改');
        	offon = false;
    	}
    }
}, "json");

