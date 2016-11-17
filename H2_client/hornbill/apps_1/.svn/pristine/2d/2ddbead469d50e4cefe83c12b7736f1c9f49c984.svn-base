/*common*/
var $ = require('wap/zepto');

var screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	ballWidth = $('.ball').width(),
	endWidth = $('.end').width();
var posLeft = 0,
	posTop = screenHeight - ballWidth,
	left = 0,
	top = 0,
	animateArr = [0,0];
var obstacles = $('.obstacles');

$('body').css('height',screenHeight).css('position','relative');
$('body').on('touchmove',function (e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});
$('.main').height(screenHeight);
$('.ball').height(ballWidth);
$('.end').height(endWidth);

if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
	alert('本设备不支持devicemotion事件');
}
function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity,
		x = acceleration.x,
		y = -acceleration.y;
	animateArr = [Math.floor(x),Math.floor(y)]
}
var ballMove = function(){
	posLeft += animateArr[0];
	posTop += animateArr[1];
	if(posLeft > screenWidth - ballWidth){
		posLeft = screenWidth - ballWidth;
	}else if(posLeft < 0){
		posLeft = 0;
	}
	if(posTop > screenHeight - ballWidth){
		posTop = screenHeight - ballWidth;
	}else if(posTop < 0){
		posTop = 0;
	}
	for(var i=0;i<obstacles.length;i++){
		if(posTop + ballWidth >= $(obstacles[i]).offset().top && posTop + ballWidth <= $(obstacles[i]).offset().top + $(obstacles[i]).height()
			&& posLeft >= $(obstacles[i]).offset().left - ballWidth && posLeft <= $(obstacles[i]).offset().left + $(obstacles[i]).width() ){
			posTop = $(obstacles[i]).offset().top - ballWidth;
		}
	}
	for(var i=0;i<obstacles.length;i++){
		if(posTop > $(obstacles[i]).offset().top && posTop <= $(obstacles[i]).offset().top + $(obstacles[i]).height()
			&& posLeft >= $(obstacles[i]).offset().left - ballWidth && posLeft <= $(obstacles[i]).offset().left + $(obstacles[i]).width() ){
			posTop = $(obstacles[i]).offset().top + $(obstacles[i]).height();
		}
	}
	if(posTop >= $('.end').offset().top && posTop < $('.end').offset().top + $('.end').width() - ballWidth - 4
		&& posLeft >= $('.end').offset().left && posLeft < $('.end').offset().left + $('.end').width() - ballWidth - 4 ){
		alert("OK");
		return false;
	}
	$('.ball').css({
		'left': posLeft,
		'top': posTop
	});
	setTimeout(function(){
		ballMove();
	},13);
}
ballMove();