/*common*/
var $ = require('wap/zepto')
	,shareTmp = require('wap/component/shareTmp')
	,pin = require('wap/component/wapfall')
	,timedown = require('wap/app/doota/timedown')
	,scroll = require('wap/component/windowScroll')
	,touchSlide = require('wap/app/touchSlide')
	//,menu = require('wap/page/tuan/tabSlide')
	,lazy = require('wap/component/lazzyLoad')
	,Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
    ,$pullUp = $('.pullUp')
	,$nav = $('.nav')
	,$imageSlide = $('#imageSlide')
	,$bannerBox = $('#bannerBox')
	,$gotop = $('.gotop');

var tuan = {
	init: function(){  //初始化页面
		this.lazyer = lazy.init({'xpath' : '.bs_load_img'});
		this.lazyer.scroll();
		this.q8CountDown();
		this.slide();
		this.posterWall(); 
		this.topBtnHandle(30);
		/*图片加载完成后再吸顶*/
		var oImg = $bannerBox.find('img').last().get(0);
		if($nav.length){
			this.imgLoaded(oImg,this.navFixed);
		}	
		this.eventInit();
		// var tabslide = new tabSlide({
		// 	element: $nav,
		// 	container: $('.nav_wap'),
		// 	duration: 600,
		// 	targetX: 40,
		// 	callback: this.getData
		// });
		// tabslide.init();
	},
	q8CountDown: function(){  //抢8入口倒计时
		var t_container = $('.q8_ltime'),
		_hour = $('#hour'),
		_minu = $('#minu'),
		_sec = $('#sec');
		timedown.down(t_container, t_container.attr('stime'), '0h-0i-0s', ['<b>%v</b>', '<b>%v</b>', '<b>%v</b>'])
			.onAction(function() {
				var t = arguments[2];
				hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
				minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
				sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
				if (_hour.html() != hour) {
					_hour.html(hour);
				}
				if (_minu.html() != minu) {
					_minu.html(minu);
				}
				if (_sec.html() != sec) {
					_sec.html(sec);
				}
			});
	},
	slide: function(){   //顶部banner轮番
		if(!$imageSlide) return;
		var slideHeight = Math.floor(200 * Cwidth/640);

		$("#imageSlide,#imageSlide li").width(Cwidth).height(slideHeight+"px");

		if($imageSlide.find('li').length>1){
			$imageSlide.touchSlide({autoTime:5000});

			$('.num').find('b').text('');
		}
	},
	posterWall: function(type){   //瀑布流 type 区分今日团购还是明日团购
		var search = '';
		var that = this;
		if (type) {
			search = (fml.vars.geturl.indexOf('?') >= 0 ? '&' : '?') + 'cata=' + type;
		}
		pin.init({
			containerId: '.goods_wall'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0
		}
		var pullUpAction = function() {
			posterWall.ajaxPoster(fml.vars.geturl + search);
		}
		Meilishuo.config.poster0 = '';
		posterWall.testPoster0(urlData, pullUpAction);
		posterWall.scrollPoster(true);

	},
	topBtnHandle: function(y){  //页面下拉到一定位置，回顶部按钮显示
		scroll.yIn(y,function(){
			$gotop.show();
		},
		function(){
			$gotop.hide();
		})
	},
	imgLoaded: function(el,callback){
		if(el){
			if (el.complete) {
			   callback();
			} else {
			   el.onload = function() {
			   		callback();
			   }
			}
		}
		else{
			callback();
		}
	},
	navFixed: function(){
		scroll.yIn($nav.position().top + 10,function(){
			$nav.removeClass('scrollout').addClass('scrollin shadow');
		},
		function(){
			$nav.removeClass('scrollin shadow').addClass('scrollout');
		})
	},
	getData: function(me){
		$(me).addClass('curr').siblings().removeClass('curr');
		$('.goods_wall').html('');
		if($(me).data('cata') == 10){
			fml.vars.istomorrow = true;
			$('.tmw_tip').show();
			$('.content_tip').hide();
		}else{
			fml.vars.istomorrow = false;
			$('.tmw_tip').hide();
			$('.content_tip').show();
		}
		tuan.posterWall($(me).data('cata'));
		document.body.scrollTop = document.body.scrollTop +1;
		if ($nav.hasClass('scrollin')) {
			document.getElementById('tip-box').scrollIntoView();
		}
	},
	eventInit: function(){
		var that = this;
		fml.eventProxy('logPoster', function(res) {
			if (!res.data.tInfo.length) {
				$('.pullUp').hide();
			} else {
				$('.pullUp').show();
			};
			$('.time').each(
				function() {
					var _this = $(this);
					var leftsecond = _this.attr('time');
					d = parseInt(leftsecond / (3600 * 24)); //计算出相差天数
					h = parseInt((leftsecond / 3600) % 24); //扣除相差天数，计算出相差小时数
					m = parseInt((leftsecond / 60) % 60); //扣除相差天数，小时数，计算出相差分钟数
					// s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
					_this.html('剩余' + d + '天' + (h < 10 ? '0' + h : h) + '小时' + (m < 10 ? '0' + m : m) + '分');
					_this.removeClass('time');
				})
			that.lazyer.load();
		})
		$nav.find('li').on('click', function(){
			that.getData($(this));
		})
		//回顶部
		$gotop.on("click", function(e) {
			document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 :
			document.body.scrollTop = 0;
		});

	}
}
tuan.init();

