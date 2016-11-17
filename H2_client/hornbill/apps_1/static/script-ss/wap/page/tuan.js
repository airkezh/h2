/*common*/
var shareTmp = require('wap/component/shareTmp')
		, pin = require('wap/component/wapfall')
	, colFlag = $('.goods_wall').siblings('.colFlag').css('z-index')
	, timedown = require('wap/app/doota/timedown')
	, lazy = require('wap/component/lazzyLoad')
	, width=document.body.clientWidth;
var pullUp = $('.pullUp');

/* 扫点加载 */
var lazyer = lazy.init({'xpath' : '.bs_load_img'});
lazyer.scroll();

var initialize=function(){

	fml.vars.poster.totalColNum = colFlag || 2
	pin.init({
        containerId : '.goods_wall'       
    });
    var posterWall = require('wap/app/posterWalls2');
	var urlData = { 'frame' : 0 }
	var pullUpAction = function(){
		posterWall.ajaxPoster(fml.vars.geturl);
	}
	Meilishuo.config.poster0 = '';
	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster(true);
    fml.vars.toLogPoster = true

   // alert($('.goods_wall').width())
    fml.eventProxy('logPoster' , function(res){
    	if (!res.tInfo.length) {
    		$('.pullUp').hide();
    	}
		var $_this = this;
	    $('.time').each(
	    	function($_this){
	    		var _this = $(this);
	    		var leftsecond=_this.attr('time');
	    		d=parseInt(leftsecond/(3600*24));//计算出相差天数
                h=parseInt((leftsecond/3600)%24);//扣除相差天数，计算出相差小时数
                m=parseInt((leftsecond/60)%60);//扣除相差天数，小时数，计算出相差分钟数
               // s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
               _this.parents('span').html('剩余'+d+'天'+(h<10?'0'+h:h)+'小时'+(m<10?'0'+m:m)+'分');
	    	})
	    lazyer.load();
    })
	if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
}
setTimeout(function(){
	window.location.reload();
},900000);
initialize();
// gotop
var $gotop = $('.gotop'),
	onscroll = require('wap/component/windowScroll');
$gotop.on("click" , function(e){
	document.body.scrollTop = 0;
	resolvebug();
});
onscroll.bind(gotop,'gotop');

function gotop(pos,isDown){
	if(pos < 30){
		$gotop.hide();			
	} else {
		$gotop.show();
	}
}