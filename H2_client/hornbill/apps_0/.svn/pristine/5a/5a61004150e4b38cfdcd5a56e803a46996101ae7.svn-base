/*common*/
var $ =require('wap/zepto'),
	scroll = require('wap/component/windowScroll'),
	shareTmp = require('wap/component/shareTmp'),
    $goTop = $('.gotop'),
    $wall = $('#wall'),
    $tips = $('.status_tips'),
    $scanHit = null,
    winHeight = $(window).height(),
    winWidth = $(window).width(),
    canPosterLoad = true,
    startFlag = 0,
    frame = 0,
    isFirst = true,
    yStep = 60,
    imgSrc = '',
	type = fml.vars.type;
require('wap/zepto/scroll');
require('m/component/scrollStop');

fml.vars.winWidth = $(window).width();

if(Meilishuo.config.poster0 && Meilishuo.config.poster0.length){
	window.setTimeout(function(){
		winWidth = $(window).width()
		winHeight = $(window).height()
		fml.vars.winWidth = winWidth
		$wall.append(shareTmp('tpl', Meilishuo.config.poster0));
		frame++;
		lazyLoad();
	},0)
}

if(!fml.vars.isSecondPage){ scroll.bind(scrollEvent, 'scroll'); }

$goTop.on('click', function (){
	$(this).hide();
	$.scrollTo({
	   endY: 0,
	   duration: 300
	});
});

/*滚动回调函数*/
function scrollEvent(pos, isDown){
	startFlag = $tips[0].getBoundingClientRect().top - 100;
	if(isDown){
		$goTop.hide();
		if(winHeight >= startFlag && canPosterLoad){
			$tips.data('status','loading');
			canPosterLoad = false;
			$.post('/aj/fashion/specials',{
				'frame': frame++,
				'type': type
			},function (res){
				if(res.activity_info.length > 0){
					$wall.append($(shareTmp('tpl' , res.activity_info)));
					canPosterLoad = true;
				}else{
					$tips.data('status','stop');
				}
			},'json');
		}
	}else if(pos > 100){
		$goTop.show();
	}else if(pos < 100){
		$goTop.hide();
	}
}

/*懒加载*/
function lazyLoad(){

	for(var y = yStep; y <= winHeight; y += yStep){
		$scanHit = $(document.elementFromPoint(200, y));
		imgSrc = $scanHit.data('src');
		if($scanHit.is('.lazy_bg') && imgSrc){
			$scanHit.css({
				'background-image' : 'url('+imgSrc+')',
				'background-size' : '100% auto'
			}).data('src', '');
		}
	}
	if(isFirst){
		isFirst = false;
		$(window).on('scrollStop', arguments.callee);
	}
}
