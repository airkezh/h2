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
		this.eventInit();
	},
	posterWall: function(cata, sbase, sort){
		var search = '';
		var that = this;
		var offset = 0;
		pin.init({
			containerId: '.goods_wall'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0,
			'page_code' : 'tuan_channel',
			'limit': 30,
			'offset': 0
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
			urlData.offset = urlData.frame * urlData.limit;
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
		scroll.yIn($nav.position().top + 10,function(){
			$nav.addClass('scrollin shadow');
		},
		function(){
			$nav.removeClass('scrollin shadow');
		})
	},
	getData: function(cata, sbase, sort){
		$('.goods_wall').html('');
		tuan.posterWall(cata, sbase, sort);
		document.body.scrollTop = document.body.scrollTop +1;
		if ($nav.hasClass('scrollin')) {
			window.scrollTo(0, $nav_wrap.find('.nav_title').position().top + $nav_wrap.find('.nav_title').height() + 11);
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
					h = parseInt((leftsecond / 3600) % 24) + d * 24; //扣除相差天数，计算出相差小时数
					m = parseInt((leftsecond / 60) % 60); //扣除相差天数，小时数，计算出相差分钟数
					// s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
					_this.html('<i class="clock"></i>剩<span class="hour">' +  + (h < 10 ? '0' + h : h) + '</span>时<span class="min">' + (m < 10 ? '0' + m : m) + '</span>分');
					_this.removeClass('time');
				})
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
		$('.tab').on('click', function(){
			var $this = $(this);
			if(!$this.hasClass('active')){
				that.getData( $(this).data('cata'), $('.range li.active').attr('sbase'), $('.range li.active').attr('sort'));
				$(this).addClass('active').siblings().removeClass('active');
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

/* 流行推荐滚动 */
var nav_width = 2.31;
$('#goods_iscroll').css({
    'width': (nav_width * fml.vars.popRecommdlen) + 0.1 + 'rem'
});

if( $('#goods_wrap').length > 0){
	curGoodsScroll = new iScroll('goods_wrap', {
	    vScroll: false,
	    bounce: false,
	    hScrollbar: false,
	    vScrollbar: false,
	    onBeforeScrollStart: function(e){
	        if (this.absDistX > this.absDistY) {

	            e.preventDefault();
	        }
	        //alert(e.type);
	    },
	    //解决第一次无法滑动的问题
	    onTouchEnd: function(){
	        var self = this;
	        if (self.touchEndTimeId) {
	           clearTimeout(self.touchEndTimeId);
	        }
	        self.touchEndTimeId = setTimeout(function(){
	            self.absDistX = 0;
	            self.absDistY = 0;
	        }, 600);
	    }
	});
	curGoodsScroll.refresh();
};


// $('.pop_item').on('click',function(){
// 	alert( 'eee' );
// });
// 重置宽度
$('.tab_cont').width( $('.tab_cont li').length * $('.tab_cont li').width() + 10 );

//$('.tab_scroll').width($(window).width() - $('.tab_all').width() - $('.tab_more').width()-20);
if($('.tab_scroll').length > 0){
	navTabscroll = new iScroll($('.tab_scroll')[0], {	
		hScrollbar: false,
	    vScrollbar: false
	});
	navTabscroll.refresh();
}

$('.tab_more').click(function(){
	var $this = $(this);

	if( $this.hasClass('tab_more_show') ){
		$this.removeClass('tab_more_show');
		$('.tab_body').hide();
	}else{
		$this.addClass('tab_more_show');
		$('.tab_body').show();

	}

});

// 点击tab
$('.tab_head .tab').click(function(ev){
	var $this = $(this);
	$('.tab_head').find('.active').removeClass('active');
	$this.addClass('active');

	if($('.tab_more').hasClass('tab_more_show')){
		$('.tab_more').click();
	}
	logTrack.cr('tuan_channel', {'_action': 'click', 'r': $this.data('r')});

	ev.preventDefault();
	ev.stopPropagation();
});

// 点击展开的tab
$('.tab_body li').click(function(){
	var $this = $(this);
	var _li = $('.tab_scroll li').eq($this.index());
	//console.log(_li.index());
	$('.tab_head').find('.active').removeClass('active');
	_li.addClass('active');

	if($('.tab_more').hasClass('tab_more_show')){
		$('.tab_more').removeClass('tab_more_show');
		$('.tab_body').hide();
	}

	var x= 0;
	if( $this.index()>4){
		if( _li.parent().find('li').length - _li.index() < 5){
			x = -( _li.parent().find('li').length - 5 )*_li.width();
		}else{
			x = -_li.width() * $this.index();				
		}
	}else{
		x =0;
	}
	navTabscroll.scrollTo(x);

	tuan.getData( _li.data('cata'), $('.range li.active').attr('sbase'), $('.range li.active').attr('sort'));

	// $('.tab_cont')[0].style.webkitTransform='translate3d('+ x +'px,0,0)';
	// $('.tab_cont')[0].style.transform='translate3d('+ x +'px,0,0)';
});


/* 图片轮播hack */
if($('#imageSlide li').length != 0){
	var winWidth = $(document).width()
		,slideHeight = 240 * winWidth / 640

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