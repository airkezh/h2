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
	Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
	,
	$pullUp = $('.pullUp'),
	$nav = $('.nav'),
	$imageSlide = $('#imageSlide'),
	$bannerBox = $('#bannerBox'),
	$gotop = $('.gotop');

var welfare = {
	init: function() {
		/*初始化页面*/
//		this.lazyer = lazy.init({
//			'xpath': ".bs_load_img"
//		});
//		this.lazyer.scroll();
		this.posterWall();
		//this.q8CountDown();
		//this.slide();
		//		this.posterWall();
		//		this.topBtnHandle(30);
		/*图片加载完成后在吸顶*/
		//		var oImg=$bannerBox.find('img').last().get(0);
		//		if($nav.length){
		//			this.imgLoaded(oImg,this.navFixed);
		//		}
		this.eventInit();
	},
	posterWall: function() {
		$.post("/aj/m_welfare/wlf_list", {
			"actid": 59
		}, function(data) {
			console.log("1:" + data);
			$('.goods_wall').append(shareTmp('posterWall', data));
		}, "json");
	},
	topBtnHandle: function(y) { //页面下拉到一定位置，回顶部按钮显示
		scroll.yIn(y, function() {
				$gotop.show();
			},
			function() {
				$gotop.hide();
			})
	},
	eventInit: function() {
		var _this = this;
		console.log($nav);
		$nav.find("li").on("click", function() {
			var index = $(this).index();
			$(this).addClass("curr").siblings().removeClass("curr");
			$(".content").removeClass("show").eq(index).addClass("show");
		});
	}
};
welfare.init();