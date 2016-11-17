/*common*/
require('wap/zepto/fastclick');
var $ = require('wap/zepto')
	,shareTmp = require('wap/component/shareTmp')
	,pin = require('wap/component/wapfall')
	,timedown = require('wap/app/doota/timedown')
	,scroll = require('wap/component/windowScroll')
	,touchSlide = require('wap/app/touchSlide')
	,lazy = require('wap/component/lazzyLoad')
	,iscroll = require('wap/iscroll')
	,logTrack = require('wap/app/tracking')
	,appShare = require('wap/app/appShare')
    ,$pullUp = $('.pullUp')
	,$nav = $('.nav')
	,$nav_cont = $('.nav_cont')
	,$nav_wrap = $('.nav_wrap')
	,$imageSlide = $('#imageSlide')
	,$bannerBox = $('#bannerBox')
	,$gotop = $('.gotop');

var tuan = {
	init: function(){  //初始化页面
		this.lazyer = lazy.init({'xpath' : '.bs_load_img'});
		this.lazyer.scroll();
		this.posterWall(); 
		this.topBtnHandle(30);
		/*图片加载完成后再吸顶*/
		var oImg = $bannerBox.find('img').last().get(0);
		if($nav.length){
			this.imgLoaded(oImg,this.navFixed);
		}	
		$nav_wrap.height($nav_cont.height());
		this.eventInit();
	},
	posterWall: function(cata, sbase, sort){
		var search = '';
		var that = this;
		pin.init({
			containerId: '.posterWall'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0,
			'page_code' : 'tuan_channel'
		}
		if(cata){
			urlData.cata = cata;
		}
		if(sbase){
			urlData.sbase = sbase;
		}
		if(sort){
			urlData.sort = sort;
		}
		var pullUpAction = function() {
			posterWall.ajaxPoster(fml.vars.geturl);
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
		scroll.yIn($nav_wrap.position().top + 10,function(){
			$nav_cont.addClass('scrollin shadow');
		},
		function(){
			$nav_cont.removeClass('scrollin shadow');
		})
	},
	getData: function(cata, sbase, sort){
		$('.goods_wall').html('');
		tuan.posterWall(cata, sbase, sort);
		document.body.scrollTop = document.body.scrollTop +1;
		if ($nav.hasClass('scrollin')) {
			window.scrollTo(0, $nav_wrap.position().top + 11);
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
			that.lazyer.load();
		})
		$('.range li').on('click', function(){
			var $this = $(this);
			if( ($.inArray($this.index(), [3,4]) != -1) && $this.hasClass('active') ){
				$this.attr('sort', $this.attr('sort')==1 ? 0 : 1 );
				if($this.attr('sort') == 1){
					$this.find('i').removeClass('arrow_down').addClass('arrow_up');
				}else{
					$this.find('i').removeClass('arrow_up').addClass('arrow_down');
				}
			}else{
				$this.find('i').removeClass('arrow_down').addClass('arrow_up');
				$('.range li').eq(3).attr('sort', 1);
				$('.range li').eq(4).attr('sort', 1);
			}
			$this.addClass('active').siblings().removeClass('active');
			$this.siblings().find('i').removeClass('arrow_up').addClass('arrow_down');
			that.getData( $('.tab.active').data('cata'), $this.attr('sbase'), $this.attr('sort'));
		})
		$('.nav li').on('click', function(){
			var $this = $(this);
			if(!$this.hasClass('curr')){
				that.getData( $(this).data('cata'), $('.range li.active').attr('sbase'), $('.range li.active').attr('sort'));
				$(this).addClass('curr').siblings().removeClass('curr');
			}
		})
		//回顶部
		$gotop.on("click", function(e) {
			document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 :
			document.body.scrollTop = 0;
		});

	}
}
tuan.init();

/* 图片轮播hack */
if($('#imageSlide li').length != 0){
	var winWidth = $(document).width()
		,slideHeight = 340 * winWidth / 640

	$("#imageSlide, #imageSlide li").width(winWidth).height(slideHeight + "px")
	if($('#imageSlide li').length > 1){
		$("#imageSlide").touchSlide({
			autoTime:5000,
			speed:300
		})
	}
}

/* 客户端分享 */
if(fml.vars.appShare){
	appShare(fml.vars.params, ['weixin', 'weixin_timeline', 'qzone', 'qq']);
}