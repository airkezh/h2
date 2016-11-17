/*common*/
var $ = require('wap/zepto');

var screenHeight = $(window).height(),
	screenWidth = $(window).width(),
	carWidth = $('.cars').width(),
	carHeight = $('.cars').height();
var aRoad = $('.road'),
	carRed = $('.car-red'),
	carBlue = $('.car-blue');
var count = 0,
	countTime = 30;
var timer;
var roadWidth = (screenWidth-3*4)/4;

aRoad.css({'height' : screenHeight , 'width' : roadWidth});

var carFirstPos = (roadWidth - carWidth)/2,
	carSecondPos = (roadWidth - carWidth)/2 + roadWidth;

carRed.css({'left' : carFirstPos});
carBlue.css({'right' : carFirstPos});

$('body').on('touchmove',function (e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});
//给车道绑定点击事件
for(var i=0;i<aRoad.length;i++){
	(function(num){
		aRoad.eq(num).on('touchstart' , function(){
			switch(num){
				case 0 : carRed.animate({'left' : carFirstPos}, 400);break;
				case 1 : carRed.animate({'left' : carSecondPos});break;
				case 2 : carBlue.animate({'right' : carSecondPos});break;
				default : carBlue.animate({'right' : carFirstPos});
			}
		});
	})(i);
}
//判断是否与障碍物碰撞
var alertFlag = true;
var judge = function(obstacleTop,obstacleLeft,num,obstacle){
	var carTop = $('.cars').offset().top;
	var carRedLeft = $('.car-red').offset().left;
	var carBlueLeft = $('.car-blue').offset().left;
	var compareTop = obstacleTop > carTop && obstacleTop <= carTop + carHeight,
		compareRedLeft = carRedLeft > obstacleLeft && carRedLeft < obstacleLeft + $('.obstacle').width(),
		compareBlueLeft = carBlueLeft > obstacleLeft && carBlueLeft < obstacleLeft + $('.obstacle').width();
	if( num == 1  &&  compareTop && compareRedLeft && alertFlag || num == 1 && compareTop && compareBlueLeft && alertFlag ){
		alertFlag = false;
		clearInterval(timer);
		clearInterval(countDownTime);
		alert("game over" + count);
		// console.log("1"+alertFlag)
	}else if(num == 2 && compareTop && compareRedLeft && alertFlag || num == 2 && compareTop && compareBlueLeft && alertFlag ){
		count++;
		$('.count').html(count);
		obstacle.remove();
	}else if(num == 2 && obstacleTop > carTop + carWidth && alertFlag ){
		alertFlag = false;
		clearInterval(timer);
		clearInterval(countDownTime);
		alert("game over" + count);
		// console.log("2"+alertFlag)
	}
};
//障碍物移动
var obstacleMove = function(obstacle,num){
	obstacle.css({'top' : screenHeight});
	setInterval(function(){
		judge(obstacle.offset().top,obstacle.offset().left,num,obstacle);
	},300);
	setTimeout(function(){ obstacle.remove(); },4000);
};
//生成障碍物
var creatObstacle = function(order){
	var num = parseInt(Math.random()*3);
	var url;
	if(order <= 1){
		switch(num){
			case 0 : url = "";break;
			case 2 : url = "http://i.meilishuo.net/css//images/lark/2cars/circle-red.png";break;
			default : url = "http://i.meilishuo.net/css//images/lark/2cars/square-red.png";
		}
	}else{
		switch(num){
			case 0 : url = "";break;
			case 2 : url = "http://i.meilishuo.net/css//images/lark/2cars/circle-blue.png";break;
			default : url = "http://i.meilishuo.net/css//images/lark/2cars/square-blue.png";
		}
	}
	
	var obstacle = $('<span class="obstacle"><img src=" '+ url + '"></span>');
	$('body').append(obstacle);
	setTimeout(function(){
		var obstacleWidth = obstacle.width();
		obstacle.css({
			'width' : roadWidth*0.4,
			'top' : -obstacleWidth + 'px',
			'left' : roadWidth*0.3 + roadWidth*order + 'px'
		});
		setTimeout(function(){ obstacleMove(obstacle,num); },50);
	},150);
};
// creatObstacle();
// 倒计时
var countDownTime;
var countDown = function(countTime){
	countDownTime = setInterval(function(){
		$('.time').html(countTime--);
		if(countTime < 0 && alertFlag){
			clearInterval(timer);
			clearInterval(countDownTime);
			setTimeout(function(){
				alertFlag = false;
				alert("Time Over" + count);
			},10);
		}
	},1000);
};
countDown(countTime);
//调用生成障碍物
var timer = setInterval(function(){
	var order = parseInt(Math.random()*2);
	creatObstacle(order);
	creatObstacle(order + 2);
},parseInt(Math.random()*10)+1500);