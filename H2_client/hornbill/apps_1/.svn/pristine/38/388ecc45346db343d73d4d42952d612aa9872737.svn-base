fml.use(['wap/app/countdown2'] , function(){
    this.countdown2();
});

fml.define('wap/page/carnival_list', ['wap/zepto/touch', 'wap/component/windowScroll', 'wap/zepto/scroll', 'wap/component/waterfall', 'wap/app/posterWalls1', 'wap/component/shareTmp', 'wap/app/doota/timedown'], function(require, exports) {
	var shareTmp = require('wap/component/shareTmp'),
		pin = require('wap/component/waterfall'),
		colFlag = $('.goods_wall').siblings('.colFlag').css('z-index'),
		timedown = require('wap/app/doota/timedown')
	var pullUp = $('.pullUp')

	fml.vars.poster.totalColNum = colFlag || 2
	pin.init({
		containerId: '.goods_wall',
		containerWidth: document.body.clientWidth
	});
	var posterWall = require('wap/app/posterWalls1');
	var urlData = {
		'frame': 1,
		'pid': fml.vars.pid,
		'type': 'mob'
	}

	var pullUpAction = function() {
		posterWall.ajaxPoster('/aj/activity/carnival_list');
	}
	Meilishuo.config.poster0 = '';
	posterWall.testPoster0(urlData, pullUpAction);
	posterWall.scrollPoster(true);
	fml.vars.toLogPoster = true
	fml.eventProxy('logPoster', function(res) {
		if (!res.tInfo.length) {
			$('.pullUp').hide();
		};
		var $_this = this;
		$('.time').each(
			function($_this) {
				var _this = $(this);
				_this.removeClass('time');
				timedown.down(this, _this.attr('time'), '0d-0h-0i-0s', ['<span>%v</span>天', '<span>%v</span>小时', '<span>%v</span>分', '<span>%v</span>秒']).onTimeOver(function() {
					_this.parents('span').html('团购已结束');
				});
			})
	})
	fml.vars.poster.scale = pin.getAttr('scale')
	fml.vars.poster.colWidth = pin.getAttr('colWidth')
	if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0) {
		pin.append(shareTmp('posterWall', Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
	setTimeout(function() {
		window.location.reload();
	}, 900000);

	// gotop
	var $gotop = $('.gotop'),
		onscroll = require('wap/component/windowScroll');
	$gotop.on("click", function() {
		$.scrollTo({
			endY: 0,
			duration: 300
		});
	});

	function gotop(pos, isDown) {
		if (pos < 30) {
			$gotop.hide();
		} else {
			$gotop.show();
		}
	}
	onscroll.bind(gotop, 'gotop');

	// 定位导航
	(function() {
		var bannerWord = $("#bannerWord");
		var isScroll = false,
			bannerOffset = bannerWord.offset().top;
		var fixedNav = $("<div id='fixedNav'></div>");
		fixedNav.append(bannerWord.clone(true));
		fixedNav.css({
			"position": "fixed",
			"top": "0px",
			"left": "0px",
			"z-index": "100",
			"width":"100%"
		});
		function isFade() {
			if (!isScroll && document.body.scrollTop > bannerOffset) {
				isScroll = true;
				$("body").append(fixedNav);
			}
			if (isScroll && document.body.scrollTop <= bannerOffset+200) {
				fixedNav.remove();
				isScroll = false;
			}
		}
		onscroll.unBind(isFade);
		onscroll.bind(isFade, 'document');
		// document.addEventListener("touchstart",function(){},false);
		// document.addEventListener("touchmove",function(){
		// 	isFade();
		// },false)
		// document.addEventListener("touchend",function(){},false)
	})()


});