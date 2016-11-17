/*common*/
var $ = require('wap/zepto');

var screenWidth = $(window).width(),
	screenHeight = $(window).height();
var count = 0;
var timmer = 0;

$('body').height(screenHeight)
		.on('touchmove',function (e){
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();	
});

// 点击泡泡
var bubbleTap = function(bubble){
	var tapFlag = true;
	bubble.on('tap',function(){
		if(tapFlag){
			count ++;
			tapFlag = false;
		}
		$('.count').html(count);
		$(this).css({
			'background':'url(http://i.meilishuo.net/css//images/lark/bubble/bubble-end.png)',
			'background-size': 'contain',
		});
		setTimeout(function(){
			bubble.remove();
		},30);
	});
};
// 泡泡移动
var bubbleMove = function(bubble,bubbleLeft){
	bubbleTap(bubble);
	bubble.css({
		'bottom': screenHeight,
	})
	setTimeout(function(){
		bubble.remove();
	},2000);
};
// 创建泡泡
var creatBubble = function(){
	var bubble = $('<span class="bubble"></span>');
	$('body').append(bubble);
	var bubbleWidth = parseInt(Math.random()*screenWidth/4);
	if(bubbleWidth < 20){
		bubbleWidth = 20;
	}
	var bubbleLeft = parseInt(Math.random()*screenWidth);
	if(bubbleLeft < 0){
		bubbleLeft = 0;
	}else if(bubbleLeft > screenWidth - bubbleWidth){
		bubbleLeft = screenWidth - bubbleWidth;
	}
	bubble.css({
		'width' : bubbleWidth + 'px',
		'height' : bubbleWidth + 'px',
		'bottom' : '100' + 'px',
		'left' : bubbleLeft + 'px'
	});
	setTimeout(function(){
		bubbleMove(bubble,bubbleLeft);
	},10);
};
// 倒计时
var countDown = function(countTime){
	var countDown = setInterval(function(){
		$('.time').html(countTime--);
		if(countTime < 0){
			clearInterval(countDown);
			clearInterval(timmer);
			setTimeout(function(){
				alert("Time Over");
			},10);
		}
	},1000);
};
$('.start').on('tap',function(){
	timmer = setInterval(function(){
		creatBubble();
	},300);
	countDown(30);
});