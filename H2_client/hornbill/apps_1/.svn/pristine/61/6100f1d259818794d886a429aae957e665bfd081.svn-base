/*common*/
var $ = require('wap/zepto');
var openApp = require('wap/app/openApp');
var ShareTo = require( 'wap/app/shareTo' );
var isWeixin=(window.navigator.userAgent.indexOf("MicroMessenger") != -1) ? true : false;

if (window.WeixinJSBridge) {
	onBridgeReady();
} else {
	if (document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
		document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
	}
}
if(!isWeixin){
	// 如果不是在客户端APP里面打开页面才执行
	if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
	    openApp("meilishuo://open.meilishuo/", "http://m.meilishuo.com/download/latest/?channel=30902");
	    return;
	}
	// 没登录跳转到登录页
	if (!fml.vars.isLogin) {
		window.location.href = "meilishuo://login.meilishuo/";
		window.MLS = {
			didLogin: function() {
				// 成功登录，跳转到下一步
				window.location.reload();
			}
		};
		// return;
	}
	onBridgeReady();
}

function onBridgeReady() {
	if(isWeixin){
		// 分享到朋友圈
		window.WeixinJSBridge.on('menu:share:timeline', function(argv) {
			shareTimeline()
		})

		window.WeixinJSBridge.on('menu:share:appmessage', function(argv) {
			shareAppMsg()
		})
	}

	var appId = 'wx28b165b5a629bb11'

	var title = '游戏太刺激不能不分享给你们玩！还能赢圣诞大奖呢！'

	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline', {
			"appid": appId,
			"img_url": 'http://i.meilishuo.net/css/images/wap/wx/20141225/logo_new.png',
			"img_width": "200",
			"img_height": "200",
			"link": window.location.origin + '/wx/christmas',
			"desc": '小伙伴们快来试试你的手气，玩游戏就能拿圣诞惊喜！',
			"title": title
		}, function(res) {
			if(res.err_msg == 'share_timeline:ok'){
				window.location.href = '/wx/getGift?share=1&score='+ score
			}
		});
	}

	function shareAppMsg() {
		WeixinJSBridge.invoke('sendAppMessage', {
			"appid": appId,
			"img_url": 'http://i.meilishuo.net/css/images/wap/wx/20141225/logo_new.png',
			"img_width": "200",
			"img_height": "200",
			"link": window.location.origin + '/wx/christmas',
			"desc": '小伙伴们快来试试你的手气，玩游戏就能拿圣诞惊喜！',
			"title": title
		}, function(res) {
			if(res.err_msg == 'send_app_msg:ok' || res.err_msg == 'send_app_msg:confirm'){
				window.location.href = '/wx/getGift?share=1&score='+ score
			}
		});
	}

	// 初始化屏幕数据
	var height = $(window).height(),
		width = $(window).width(),
		headimgHeight = $('.gift_source').height() + 30

	var timeAll = 100

	$('.role').on('tap', function(){
		$('.role_content').toggleClass('none')
	})

	$('.role_content').on('tap', function(){
		$(this).toggleClass('none')
	})

	// 游戏元素位置初始化
	$('.score_board').css('top', $('.gift_source').height()).removeClass('none')
	$('.basket').css({
		'bottom': $('.footer').height(),
		'left': width / 2 - 38
	}).removeClass('none')
	$('.begin_btn').css('top', height / 2 - 20).removeClass('none')

	// 游戏开始
	var score
		,randomInterval = []

	function gameStart() {
		randomInterval = []
		restTime = timeAll
		score = 0
		dideAgain = 1
		$('.score').html(score)
		timeer()
		RandomInit(0)
		randomInterval.push(setInterval(function(){var a = randomInterval.length; RandomInit(a)}, 500))
	}

	$('.begin_btn').on('tap', function() {
		$(this).hide()
		gameStart()
	})

	// 阻止屏幕竖向滑动
	$(window).on('touchmove', function(event) {
		event.preventDefault()
	})

	// 引入模块
	var Alert = require('wap/ui/alert'),
		tracking = require('wap/app/tracking')

	// 初始化雪橇数据
	var touchInitX = 0,
		touchInitY = 0,
		itemStartX = 0,
		positionX = $('.basket').offset().left,
		positionY = $('.basket').offset().top

	// 雪橇移动 尺寸:75*81
	// 初始化限制
	var moveLeftMax = -10,
		moveRightMax = width - 65

	$('.basket').on('touchstart', function(event) {
		var touchInfo = event.touches[0]
		itemStartX = parseInt($(this).css('left'))
		touchInitX = touchInfo.clientX
		touchInitY = touchInfo.clientY
	}).on('touchmove', function(event) {
		event.preventDefault()
		var touchInfo = event.touches[0]
		var moveX = touchInfo.clientX - touchInitX + itemStartX
		if (moveX > moveLeftMax && moveX < moveRightMax) {
			positionX = moveX
			$(this).css('left', moveX)
		}
		return false
	})

	// 掉落初始化 尺寸:35*35
	var giftInit = $('.gift_init')

	function giftItemsInit(giftIndex, offsetLeft, delay) {
		var item = {
			dom: giftInit.eq(giftIndex).clone().css({
				'left': offsetLeft,
				'top': 0
			}).removeClass('gift_init'),
			index: giftIndex,
			offset: offsetLeft
		}
		return item
	}

	var dideAgain = 1

	function giftItemsMove(item, speed) {
		item.dom.appendTo('body').animate({
			translate3d: '0,' + positionY + 'px,0'
		}, speed, 'linear', function() {
			var GoalLeft = positionX - 10,
				GoalRight = positionX + 50,
				thisLeft = $(this).offset().left
			if (thisLeft > GoalLeft && thisLeft < GoalRight) {
				if (item.index == 2 && dideAgain) {
					title = '我居然用了'+ (timeAll - restTime) +'秒获得了' + score + '分，你敢不敢超过我？！'
					dideAgain = 0
					restTime = -1
					gameEnd(2)
					return
				} else if(item.index == 2 && !dideAgain){
					return
				} else {
					$(this).remove()
					if(dideAgain){
						score++
						scoreAlert(thisLeft+5)
						$('.score').html(score)
					}
				}
			} else {
				$(this).animate({
					opacity: 0
				}, 80, function() {
					$(this).remove()
				})
			}
		})
	}

	var alertInit = $('.scoreAlert')
	function scoreAlert(left){
		var a = alertInit.clone().css({
			'left': left+5
			,'top' : positionY-30
		}).appendTo('body')
		a.animate({opacity : 0}, 1000, function(){
			a.remove()
		})
	}

	// $('.share_alert').on('tap', function() {
	// 	$(this).hide()
	// 	$('.begin_btn').show()
	// })
	var shareAlert=$('.share_alert');
	shareAlert.find(".btn-again").on('tap', function(event) {
		event.stopPropagation();
		shareAlert.hide()
		$('.begin_btn').show()
	})

	$('#js-share').on('tap', function() {
		ShareTo.shareToPengYou( {
            title: title,
            pic:   "http://i.meilishuo.net/css/images/wap/wx/20141225/logo_new.png",
            url:   window.location.origin + '/wx/christmas'
        } )
	})

	// 再玩一次
	$('.scoreLittle').on('tap', function() {
		$(this).hide()
		$('.begin_btn').show()
	})

	function gameEnd(id) {
		$('.gift').remove()
		tracking.cr('wx_christmas_game', {'score': score});
		for(var i = 0; i < randomInterval.length; i++){
			clearInterval(randomInterval[i])
		}
		clearInterval(timmering)
		clearInterval(kuInter)
		gameAlert(id)
	}

	function gameAlert(id) {
		var content = {
			'1': '时间到',
			'2': '小心在哭泣的花小美哦~'
		}
		var a = new Alert({
			content: content[id],
			onSure: function() {
				if (score <= 25) {
					$('.scoreLittle').show()
				} else {
					$('.share_alert').show()
				}
			}
		})
	}

	// 倒计时
	var restTime = timeAll
	var timmering
	var timeDowning = function() {
		if (restTime > -1){
			restTime--
		}
		if (restTime == 50){
			kuAdd()
		}
		var a = randomInterval.length
		if(restTime % 10 == 0){
			if(a >= 3){
				clearInterval(randomInterval[a-3])
			}
			randomInterval.push(setInterval(function(){RandomInit(a)}, 500))
		}
	}
	var timeer = function() {
		timeDowning()
		timmering = setInterval(function() {
			timeDowning()
			if (restTime <= 0) {
				gameEnd(1)
				title = '我居然用了'+timeAll+'秒获得了' + score + '分，你敢不敢超过我？！'
			}
		}, 1000)
	}

	// 随机掉落物品位置
	function RandomInit(a) {
		var speed = 3000 - a * 300
		var index = Math.floor(Math.random() * timeAll) % 6,
			offset = Math.floor(Math.random() * (width - 35) * 1000) % (width - 35)
		giftItemsMove(giftItemsInit(index, offset), speed)
	}

	var kuInter

	function kuAdd(){
		kuInter = setInterval(function(){
			offset = Math.floor(Math.random() * (width - 35) * 1000) % (width - 35)
			giftItemsMove(giftItemsInit(2, offset), restTime*20 + 600)
		}, 500)
	}

}
