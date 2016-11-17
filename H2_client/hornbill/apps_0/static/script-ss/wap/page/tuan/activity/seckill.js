/*common*/
var $ = require('wap/zepto')
	,touchSlide = require('wap/app/touchSlide')
	,lazy = require('wap/component/lazzyLoad')
	,scroll = require('wap/component/windowScroll')
	,shareTmp = require('wap/component/shareTmp')
	,$imageSlide = $('#imageSlide')
	,Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度;
	,nav = $('.nav')
	fragment = {};

function slide(){   //顶部banner轮番
	if(!$imageSlide) return;
	var slideHeight = Math.floor(240 * Cwidth/640);

	$("#imageSlide,#imageSlide li").width(Cwidth).height(slideHeight+"px");

	if($imageSlide.find('li').length>1){
		$imageSlide.touchSlide({autoTime:5000});

		$('.num').find('b').text('');
	}
}
	
function imgLoaded(imgdom,callback){
	if(imgdom){
		if (imgdom.complete) {
		   callback();
		} else {
		   imgdom.onload = function() {
		   		callback();
		   }
		}
	}else{
		callback();
	}
}

function navFixed()
{
    scroll.yIn(nav.position().top,function(){
        nav.removeClass('scrollout').addClass('scrollin shadow');
    },
    function(){
        nav.removeClass('scrollin shadow').addClass('scrollout');
    })
}

function eventInit(){
	$('.nav_tabs li').on('click', function() {
		$(this).addClass('curr').siblings().removeClass('curr');
		cata = $(this).data('cata');
		$('.container').html('');
		getlist(cata);
	})
}
function getlist(cata)
{
	if ($('.nav').hasClass('scrollin')) {
		document.getElementById('nav_wap').scrollIntoView();
	}
	if(fragment[cata]){
		$('.container').html(fragment[cata]);
		lazyer.load();
	}else{
		$('.pullUp').show();
		$.post('/aj/tuan/seckill',{event_id: fml.vars.event_id, type: 2, area: cata}, function(res){
			fragment[cata] = shareTmp('seckillBox', res.data);
			$('.container').html(fragment[cata]);
			$('.pullUp').hide();
			lazyer.load();

		},'json')
	}

}
function init(){
	if(!nav.length) return;
	slide();
	lazyer = lazy.init({'xpath' : '.bs_load_img'});
	lazyer.scroll();
	
	var banners = $('.imageSlide').find('img');
	if(banners.length){
		var oImg = banners.get(0);

		imgLoaded(oImg,navFixed);
	}
	eventInit();
	if($('.nav_tabs') && $('.nav_tabs').find('.curr').length){
		getlist($('.nav_tabs').find('.curr').data('cata'));
	}

}
init();