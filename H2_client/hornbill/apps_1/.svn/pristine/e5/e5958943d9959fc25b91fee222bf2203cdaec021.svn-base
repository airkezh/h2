/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick');

var screenHeight = $(window).height(),
	screenWidth = $(document).width();
var ballWidth = $('.basketball').width();
var basketHeight = $('.basket').height(),
	basketWidth = $('.basket').width(),
	basketTop = $('.basket').offset().top,
	basketLeft = $('.basket').offset().left;
var posLeft = 0,
	posBottom = 0;
var speed = 1,
	left = 0,
	nowLeft = 0,
	timmer = 0,
	count = 0;
var ballLeftFlag = false,
	touchFlag = false,
	startFlag = true;	
$('body').css('height',screenHeight).css('position','relative');
$('body').on('touchmove',function (e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});
//球滑动
var ballSlider = function(speed,nowLeft){
	if(nowLeft){
		posLeft = nowLeft;
	}
	timmer = setInterval(function(){
		if(parseInt($('.basketball').css('left')) >= screenWidth - ballWidth){
			ballLeftFlag = true;
		}else if(parseInt($('.basketball').css('left')) <= 0){
			ballLeftFlag = false;
		}
		ballLeftFlag ? posLeft-=speed : posLeft+=speed;
		$('.basketball').css({
			'left': posLeft,
			'z-index': '3'
		});
	},6);
};
//球上滚
var ballUp = function(speed,left){
	var ballBottomFlag = false;
	var ballSliderFlag = false;
	var countFlag = true;
	var posLeft = parseInt($('.basketball').css('left'));
	var time = setInterval(function(){
		ballBottomFlag ? posBottom -= speed : posBottom += speed;
		ballSliderFlag ? posLeft += left : posLeft;
		if(parseInt($('.basketball').css('bottom')) >= screenHeight-$('.basketball-board').offset().top-ballWidth){
			ballBottomFlag = true;
			$('.basketball').css({
				'z-index': '-1'
			});
		}
		if(parseInt($('.basketball').css('bottom')) >= Math.ceil(screenHeight-$('.basket').offset().top) && parseInt($('.basketball').css('bottom')) <= Math.ceil(screenHeight-$('.basket').offset().top)+5 && ballBottomFlag){
			ballSliderFlag = true;
		}
		if(parseInt($('.basketball').css('left')) >= (screenWidth-ballWidth)/2-5 && parseInt($('.basketball').css('left')) <= (screenWidth-ballWidth)/2+5
			|| parseInt($('.basketball').css('left')) < basketLeft-ballWidth 
			|| parseInt($('.basketball').css('left')) > basketLeft+basketWidth
			){
			ballSliderFlag = false;
		}
		if(parseInt($('.basketball').css('left')) >= basketLeft-ballWidth/2 && parseInt($('.basketball').css('left')) <=basketLeft+basketWidth-ballWidth/2 
			&& parseInt($('.basketball').css('bottom')) < screenHeight-basketTop && parseInt($('.basketball').css('bottom')) > screenHeight-basketTop-basketHeight
			&& countFlag && ballBottomFlag){
			$('.count').html(++count);
			countFlag = false;
		}
		$('.basketball').css({
			'bottom': posBottom,
			'left':  posLeft 
		});

		if(parseInt($('.basketball').css('bottom')) < 0){
			$('.basketball').css({
				'bottom': 0
			});
			clearInterval(time);
			touchFlag = false;
			ballSlider(2,posLeft);
		}
	},0.5);
}
//判断
var judge = function(deviation){
	var ballLeft = parseInt($('.basketball').css('left'));
	if(parseInt(count%3)==0){
		++speed;
	}
	if(ballLeft >= basketLeft-ballWidth/2 && ballLeft < basketLeft || ballLeft > basketLeft+basketWidth-ballWidth/2 && ballLeft < basketLeft+basketWidth ){
		ballUp(speed,speed);
	}else if(ballLeft > basketLeft+basketWidth-ballWidth && ballLeft < basketLeft+basketWidth-ballWidth/2 || ballLeft > basketLeft-ballWidth && ballLeft < basketLeft-ballWidth/2){
		ballUp(speed,-speed);
	}else{
		ballUp(speed,0);
	}
};
//倒计时
var countDown = function(countTime){
	var countDown = setInterval(function(){
		$('.count-down').html(countTime--);
		if(countTime < 0){
			clearInterval(countDown);
			clearInterval(timmer);
			touchFlag = true;
			alert("Time Over");
		}
	},1000);
};
$('.btn-start').on('touchend',function(e){
	if(startFlag){
		startFlag = false;
		countDown(30);
		ballSlider(2);
		if(e && e.preventDefault) {  
			e.preventDefault();  
		} else {  
			window.event.returnValue = false;   
		}
	    return false;
	}
});
$('body').on('touchend',function(){
	// alert(123)
	if(!touchFlag && !startFlag){
		clearInterval(timmer);
		judge(20);
		touchFlag = true;
	}
});