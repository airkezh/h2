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
//游戏代码
var $window = $(window),
	screenWidth = $window.width(),
	screenHeight = $window.height();
$('body').on('touchmove', function(e) {
	//e = e || window.event;
	//e.preventDefault();
	//e.stopPropagation();
	//$('html').css('height', screenHeight + 'px')
});

var gobl_count = 0;
//分数
function countFn(count) {
		gobl_count = count;
		$('#count_num').html(count);
	}
	//最高分
function highBijiao(count) {
		if (getCookie('GBF_score') > count) {
			var hights = getCookie('GBF_score');
		} else {
			var hights = count;
			setCookie('GBF_score', count)
		}
		return hights
	}
	//游戏结束
function endFn(count) {
	//alert('end:' + count)
	weixin_share();
	var bai = 0;
	switch (count) {
		case 1:
			bai = (Math.random() * 10 + 0).toFixed(1);
			break;
		case 2:
			bai = (Math.random() * 10 + 10).toFixed(1);
			break;
		case 3:
			bai = (Math.random() * 10 + 20).toFixed(1);
			break;
		case 4:
			bai = (Math.random() * 10 + 30).toFixed(1);
			break;
		case 5:
			bai = (Math.random() * 10 + 40).toFixed(1);
			break;
		case 6:
			bai = (Math.random() * 10 + 50).toFixed(1);
			break;
		case 7:
			bai = (Math.random() * 10 + 60).toFixed(1);
			break;
		case 8:
			bai = (Math.random() * 10 + 70).toFixed(1);
			break;
		case 9:
			bai = (Math.random() * 10 + 80).toFixed(1);
			break;
		case 10:
			bai = (Math.random() * 5 + 90).toFixed(1);
			break;
		default:
			bai = (Math.random() * 4.9 + 95).toFixed(1);

	}
	gameOver(count);
	if (count >= 8) {
		$.ajax({
			url: "/aj/guobinfen/chou",
			type: "post",
			dataType: "json",
			success: function(data) {
				if (data.error_code == 0) {
					var highest = highBijiao(count);
					var sco_data = {
						'count': count,
						'app': Meilishuo.config.os.mlsApp,
						'weixin': Meilishuo.config.os.weixinBrowser,
						'dabai': bai,
						'higs': highest,
						'weibo': false
					}
					winning = false;
					if (!Meilishuo.config.os.weixinBrowser && !Meilishuo.config.os.mlsApp) {
						sco_data.weibo = true;
					}
					alertNozhong(sco_data);

				} else if (data.error_code == 1) {

					winning = true;
					var highest = highBijiao(count);
					var coupon = data.data.award.awardname,
						expdate = data.data.award.coupon_valid_time_range.expire_time;


					var re = /\d+/g;
					var res = coupon.match(re);
					var tiaojian = coupon.substr(res[0].length + 1)
					var zjxx = {
						'yuan': res[0],
						'tj': tiaojian,
						'app': Meilishuo.config.os.mlsApp,
						'count': count,
						'dabai': bai,
						'higs': highest
					}
					winInfo = coupon;
					alertzhong(zjxx);
					pushWx(coupon, expdate);
					/*switch (parseInt(data.data.award.prize_level)) {
						case 3:
							zjxx.yuan = '100';
							zjxx.tj = '全场无门槛';
							winInfo = '100元现金券'
							alertzhong(zjxx);
							pushWx(coupon, expdate);
							break;
						case 4:
							zjxx.yuan = '30';
							zjxx.tj = '满169元立减';
							winInfo = '30元现金券'
							alertzhong(zjxx);
							pushWx(coupon, expdate);
							break;
						case 5:
							zjxx.yuan = '10';
							zjxx.tj = '满79元立减';
							winInfo = '10元现金券'
							alertzhong(zjxx);
							pushWx(coupon, expdate);
							break;
						case 6:
							zjxx.yuan = '5';
							zjxx.tj = '全场无门槛';
							winInfo = '5元现金券'
							alertzhong(zjxx);
							pushWx(coupon, expdate);
							break;
						case 7:
							zjxx.yuan = '1';
							zjxx.tj = '全场无门槛';
							winInfo = '1元现金券'
							alertzhong(zjxx);
							pushWx(coupon, expdate);
							break;
					}*/

				} else {
					a(data.message);
					window.location.reload();
				}
			}
		});
	} else {
		var highest = highBijiao(count);
		var sco_data = {
			'count': count,
			'app': Meilishuo.config.os.mlsApp,
			'weixin': Meilishuo.config.os.weixinBrowser,
			'dabai': bai,
			'higs': highest,
			'weibo': false
		}
		winning = false;
		if (!Meilishuo.config.os.weixinBrowser && !Meilishuo.config.os.mlsApp) {
			sco_data.weibo = true;
		}
		alertNozhong(sco_data);
	}

};
$("body").on("click", "#play_game", function() {
	tr.cr('fruit_play')

	$('.game_main').hide();
	$('.game_top').show();
	ddl.into({
		gameBox: { //游戏盒子的属性
			className: 'ddl_box',
			id: 'ddl_box',
			w: screenWidth,
			h: screenHeight
		},
		actor: {
			faller: { //下落的物体
				w: 200,
				h: 26,
				style: [
					'http://d05.res.meilishuo.net/pic/_o/67/1a/0dc67d1c9bd7bff5c61c12e5acc5_487_65.ch.png',
					'http://d03.res.meilishuo.net/pic/_o/82/39/a917985840f6d73c2cb984cc5c63_491_65.cg.png',
					'http://d02.res.meilishuo.net/pic/_o/67/1a/0dc67d1c9bd7bff5c61c12e5acc5_487_65.ch.png',
					'http://d02.res.meilishuo.net/pic/_o/82/39/a917985840f6d73c2cb984cc5c63_491_65.cg.png',
					'http://d01.res.meilishuo.net/pic/_o/99/af/9707f878f4304baca4df3e431dd6_492_65.cg.png'
				]
			},
			tray: { //接下落物体的盘子
				w: screenWidth,
				h: screenWidth * 130 / 640,
				style: 'http://d05.res.meilishuo.net/pic/_o/7c/80/e409cbf40061fcd6442db49b28e5_640_131.cf.png'
			}
		}
	});
	noTouch();
	var first = getCookie('GBF_first');
	if (!first) {
		var tpl = shareTmp('first_tip');
		$("body").append(tpl);
		setCookie('GBF_first', '1');
		$('body').on('click', 'div[rel=closeMask]', function() {
			$(this).remove();
			ddl.start(countFn, endFn);
		})
	} else {
		ddl.start(countFn, endFn);
	}

})



var a = function(msg) {
	return new Alert({
		content: msg
	});
};

//Alert
function alertGuize() {
	var tpl = shareTmp('guize');
	$("body").append(tpl);
}

function alertNozhong(data) {
	var tpl = shareTmp('nozhong', {
		'data': data
	});
	$("body").append(tpl);
}

function alertzhong(data) {
	var tpl = shareTmp('zhongjiang', {
		'data': data
	});
	$("body").append(tpl);
}

function alertJiangpin() {
	var tpl = shareTmp('jiangpin');
	$("body").append(tpl);
}

function alertPaihang(data) {
	var tpl = shareTmp('paihang', {
		'data': data
	});
	$("body").append(tpl);
}

function closeDialog() {
	$("div[rel=dialog_box]").remove();
	$(".shade").remove();
}

function closeDialog2() {
	$("div[rel=dialog_box2]").remove();
	$(".shade2,.guang").remove();
}

function alertShareapp() {
	var tpl = shareTmp('share_app');
	$("body").append(tpl);
}

function alertSharewx() {
	var tpl = shareTmp('share_wx');
	$("body").append(tpl);
}

function alertWeibo() {
	var tpl = shareTmp('weibo_open');
	$("body").append(tpl);
}

function alertOver() {
	var tpl = shareTmp('over_tip');
	$("body").append(tpl);
}

function gameOver(score) {
	$.ajax({
		url: '/aj/guobinfen/post',
		type: "post",
		data: {
			score: score,
			act_id: '1505',
			act_name: 'fruit_fight'
		},
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data))
		}
	});
}

function pushWx(coupon, expdate) {
	//c = winInfo;
	$.ajax({
		url: '/aj/guobinfen/tui',
		type: "post",
		data: {
			coupon: coupon,
			expdate: expdate
		},
		dataType: "json",
		success: function(data) {
			//alert(123)
		}
	});
}

function noTouch() {
		$('.ddl_box,.game_top').on('touchmove', function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
		});
	}
	//判断其他浏览器登录
function otherOpen() {
	if (!Meilishuo.config.os.weixinBrowser && !Meilishuo.config.os.mlsApp) {
		var tpl = shareTmp('weibo_open');
		$("body").append(tpl);
	}
}

function weixin_share(){
	if (Meilishuo.config.os.weixinBrowser) {
		var signWX = require('wx/sign'),
			shareWX = require('wx/share');
		signWX();
		if (gobl_count == 0) {
			fml.vars.shareData = {
				'desc': '游戏大神I need U！RP值高的还能中100元无门槛优惠券喔！',
				'imgUrl': 'http://d02.res.meilishuo.net/pic/_o/a6/e4/2376a5d6652981188ee5192d39de_100_100.cf.jpg',
				'title': '跟我一起玩水果堆堆乐吧~画风软萌还送优惠券！'
			};
		} else {
			fml.vars.shareData = {
				'desc': '不灰心，不丧气，分享给你再继续~水果堆堆乐放学憋走！！',
				'imgUrl': 'http://d02.res.meilishuo.net/pic/_o/a6/e4/2376a5d6652981188ee5192d39de_100_100.cf.jpg',
				'title': '堆到' + gobl_count + '层不甘心！要跟水果堆堆乐大战三百回合！'
			};
		}
		shareWX.bind(fml.vars.shareData);
	}
}

(function() {
	weixin_share();
	$('body').on('click', 'div[rel=closeMask]', function() {
		$(this).remove();
	})

	$("#gz_btn").on("click", function() {
		alertGuize();
	});
	$("#jp_btn").on("click", function() {
		alertJiangpin();
	});
	$("body").on("click", ".que_btn,.close_dialog", function() {
		closeDialog();
	});
	$("body").on("click", ".replay", function() {
		tr.cr('fruit_replay');
		ddl.restart();
		$('#count_num').html(0);
		setTimeout(noTouch, 50);
		closeDialog2();

	});
	$("body").on("click", "#ph_btn,.phsee", function() {
		tr.cr('fruit_rank')
		$.ajax({
			url: '/aj/guobinfen/list',
			type: "get",
			dataType: "json",
			success: function(data) {
				if (data.error_code == 0) {
					alertPaihang(data.data);
				} else {
					a(data.message);
				}

			}
		});
	});
	//点击分享按钮判断是微信还是app
	$("body").on("click", ".share_btn", function() {

		if (Meilishuo.config.os.weixinBrowser) {
			alertSharewx()
		} else if (Meilishuo.config.os.mlsApp) {
			alertShareapp()
		} else {
			alertWeibo();
		}
	});
	$('body').on('click', '#weiboOpen', function() {
		tr.cr('fruit_download');
		var url = window.location.href;
		openApp(url);
	})
	$('body').on('click', '#goapp', function() {
		tr.cr('fruit_cupponpush');
		var url = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game';
		openApp(url);
	})
	$('body').on('click', '#gohuic', function() {
		tr.cr('fruit_huichang');
		window.location.href = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game'; //主会场
	})
	$('body').on('click', '#gomai', function() {
		tr.cr('fruit_huichang');
		var url = 'http://m-promotion.meilishuo.com/promotion/common/custompage/?fid=221&mid=83&nid=0&frm=game' //主会场
		if (Meilishuo.config.os.weixinBrowser) {
			tr.cr('fruit_download');
			openApp(url);
		}
	})


	$("body").on("click", "#share_pyq", function() {
		if (winning) {
			tr.cr('fruit_share', {
				result: 'success'
			})
		} else {
			tr.cr('fruit_share', {
				result: 'fail'
			})
		}
		share(1)
	});
	$("body").on("click", "#share_wx", function() {
		share(0)
	});
}())
function replaceParamVal(paramName,replaceWith) {
    var oUrl = this.location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    return nUrl;
}
function share(type) {
	var pic = 'http://d02.res.meilishuo.net/pic/_o/a6/e4/2376a5d6652981188ee5192d39de_100_100.cf.jpg';
	var shareUrl = replaceParamVal('frm','fruit_from_share');
	if (winning) {
		var c = 'RP爆表超开心！把我的好运传给你~lucky传送==>biubiubiu';
		if (type) {
			//中奖朋友圈内容设定
			var t = '堆到' + gobl_count + '层，中了' + winInfo + '！快来玩水果堆堆乐~'
		} else {
			//中奖朋友内容设定
			var t = '我堆到' + gobl_count + '层，中了' + winInfo + '！你也快来玩~'
		}
		var params = {
			'title': t,
			'text': c,
			'pic': pic,
			'url': shareUrl
		};
		shareAct(params, type);
	} else {
		var c = '不灰心，不丧气，分享给你再继续~水果堆堆乐放学憋走！！';

		if (type) {
			//未中奖朋友圈内容设定
			var t = '堆到' + gobl_count + '层不甘心！我要跟水果堆堆乐大战三百回合！'
		} else {
			//未中奖朋友内容设定
			var t = '艾玛只堆' + gobl_count + '到层！ 快帮我一起玩水果堆堆乐~'
		}
		var params = {
			'title': t,
			'text': c,
			'pic': pic,
			'url': shareUrl
		};
		//console.log(params)
		shareAct(params, type);
	}

}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return unescape(c.substring(nameEQ.length, c.length));
		}
	}
	return false;
}

function setCookie(name, value, seconds) {
	seconds = seconds || 0;
	var expires = "";
	if (seconds != 0) {
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}



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

		$('body').append('<div class="mask_box"></div>')
		$('body').on('click', '.mask_box', function(e) {
			window.location.href = 'meilishuo://login.meilishuo/?json_params=';
			e.preventDefault();
			e.stopPropagation();
		})
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