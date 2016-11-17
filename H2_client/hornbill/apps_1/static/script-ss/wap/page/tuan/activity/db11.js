fml.define('wap/page/tuan/activity/db11' , ['wap/zepto/touch1','wap/component/windowScroll','wap/zepto/scroll','wap/component/wapfall','wap/app/posterWalls2','wap/component/shareTmp','wap/app/doota/timedown']  , function(require,exports){
	var $ = require('wap/zepto')
	    ,shareTmp = require('wap/component/shareTmp')
   		, pin = require('wap/component/wapfall')
		, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')
		, timedown = require('wap/app/doota/timedown')
		, scroll = require('wap/component/windowScroll')
		, width= document.body.clientWidth > 640 ? 640 : document.body.clientWidth
	    ,pullUp = $('.pullUp')
	    ,nav = $('.nav')
	    ,$gotop = $('.gotop');
    /*吸顶*/
    if(window.location.hash=='#m_ca'){
	   setTimeout(function(){
	   	scrolltoNav();
		},1000)
    }

	var initialize=function(type){
		var tabindex= type ? type : fml.vars.defaulttab;
        var search= (fml.vars.geturl.indexOf('?')>= 0 ?'&':'?')+'tab='+tabindex;
		fml.vars.poster.totalColNum = colFlag || 2
		pin.init({
	        containerId : '.goods_wall'
	    });
	    var posterWall = require('wap/app/posterWalls2');
		var urlData = { 'frame' : 0 }
		var pullUpAction = function(){
			posterWall.ajaxPoster(fml.vars.geturl+search);
		}
		Meilishuo.config.poster0 = '';
		posterWall.testPoster0(urlData ,pullUpAction);
		posterWall.scrollPoster(true);
	    fml.vars.toLogPoster = true
	    fml.eventProxy('logPoster' , function(res){
	    	if (!res.tInfo.length) {
	    		$('.pullUp').hide();
	    	}else{$('.pullUp').show();};
			var $_this = this;
		    $('.time').each(
		    	function($_this){
		    		var _this = $(this);
		    		var leftsecond=_this.attr('time');
		    		d=parseInt(leftsecond/(3600*24));//计算出相差天数
	                h=parseInt((leftsecond/3600)%24);//扣除相差天数，计算出相差小时数
	                m=parseInt((leftsecond/60)%60);//扣除相差天数，小时数，计算出相差分钟数
	               // s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
	               _this.parent('span').html('剩余'+d+'天'+(h<10?'0'+h:h)+'小时'+(m<10?'0'+m:m)+'分');
		        })
	       })
		if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
			pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
			pullUp.attr('status', 'tap');
		}
    }	
	initialize();	
    function scrolltoNav(){
    	document.getElementById('nav_wap').scrollIntoView();
    }
    $('#m_ca a').on('click',function(){ 	 
    	 $(this).addClass('curr').siblings().removeClass('curr');
         $('.goods_wall').html('');
         initialize($(this).attr('cata'));
         if($('.nav').hasClass('scrollin')){
         	scrolltoNav();
         }
         
    })
    /*回顶部*/
	$gotop.on("click" , function(e){
		document.body.scrollTop = 0;
	});

	scroll.yIn(30,function(){
		$gotop.show();
	},
	function(){
		$gotop.hide();
	})
	scroll.yIn(nav.position().top + 10,function(){
		nav.removeClass('scrollout').addClass('scrollin');
	},
	function(){
		nav.removeClass('scrollin').addClass('scrollinscrollout');
	})	    
})
