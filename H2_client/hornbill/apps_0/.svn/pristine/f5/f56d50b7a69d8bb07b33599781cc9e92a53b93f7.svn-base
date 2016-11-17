/*common*/
var $ = require('wap/zepto');

var screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	woodHeight = $('.wood').height(),
	downHeight = $('.down').height();
var num = 5,
	count = 1,
	sliderSpeed = 0,
	downSpeed = 0,
	mainTop = 0,
	downFlag = true,
	clickFlag = true;

$('.wood').css('top',screenHeight - downHeight - woodHeight*num);
$('body').css('height',screenHeight).css('position','relative');
$('body').on('touchmove',function (e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});
$('.main').css('height',$('body').height());

//木头左右移动
var slider = function(sliderSpeed){
	var sliderFlag = false;
	var posLeft = 0;
	sliderTimmer = setInterval(function(){
		if(parseInt($('.wood').css('left')) >= screenWidth - $('.wood').width()){
			sliderFlag = true;
		}else if(parseInt($('.wood').css('left')) <= 0){
			sliderFlag = false;
		}
		sliderFlag ? posLeft-=sliderSpeed : posLeft+=sliderSpeed;
		$('.wood').css({
			'left': posLeft
		});
	},20);
};
//木头下落
var down = function(downSpeed){
	var posTop = $('.wood').offset().top;
	downTimmer = setInterval(function(){
		posTop+=downSpeed;
		$('.wood').css({
			'top': posTop
		});
		if(posTop >= screenHeight - $('.down').height() - woodHeight*count){
			$('.wood').css('top',screenHeight - $('.down').height() - woodHeight*count);
			clearInterval(downTimmer);
			var judgResult = judg();
			if(judgResult){
				if(count > 1){
					cut();
				}else{
					$('.wood').removeClass('wood');
				}
				add();
			}
		}
	},5);
};
//添加木头
var add = function(){
	num++;
	count++;
	var woodImg = $('<img class="wood" src="http://i.meilishuo.net/css//images/lark/wood/wood.png" alt="">');
	$('.main').append(woodImg);
	$('.wood').css({
		'top': screenHeight - downHeight - woodHeight*num,
		'width': $('.wood').prev().width(),
		'height': woodHeight
	});
	if($('.wood').offset().top < woodHeight){
		pageUp();
	}
	slider(1);
};
//判断是否放在上一个木头上
var judg = function(){
	if($('.wood').offset().left + $('.wood').width() < $('.wood').prev().offset().left 
		|| $('.wood').offset().left > $('.wood').prev().offset().left + $('.wood').prev().width()){
		downFlag = false;
		alert(--count + "\n Game Over");
		return false;
	}else{
		clickFlag = true;
		return true;
	}
};
//截断木头
var cut = function(){
	if($('.wood').offset().left < $('.wood').prev().offset().left){
		$('.wood').css({
			'width': $('.wood').width() - ($('.wood').prev().offset().left - $('.wood').offset().left),
			'height': woodHeight,
			'left': $('.wood').prev().offset().left
		});
	}else if($('.wood').offset().left + $('.wood').width() > $('.wood').prev().offset().left + $('.wood').prev().width()){
		$('.wood').css({
			'width': $('.wood').width() - ( ($('.wood').offset().left + $('.wood').width()) - ($('.wood').prev().offset().left+$('.wood').prev().width()) ),
			'height': woodHeight,
		});
	}
	$('.wood').removeClass('wood');
};
//页面滚动
var pageUp = function(){
	mainTop += woodHeight;
	$('.main').animate({top: mainTop+'px'});
};
//按钮点击事件
$('.down').on('tap',function(){
	if(downFlag && clickFlag){
		clickFlag = false;
		clearInterval(sliderTimmer);
		down(2);
	}
});
slider(count);