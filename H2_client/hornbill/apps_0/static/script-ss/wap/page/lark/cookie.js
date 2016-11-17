/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick')

var screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	woodHeight = $('.wood').height(),
	downHeight = $('.down').height();
var num = 10,
	count = 1,
	sliderSpeed = 0,
	downSpeed = 0,
	mainTop = 0,
	woodTop = 0,
	downFlag = true,
	clickFlag = true;

$('.wood').css('top',screenHeight - downHeight - woodHeight*num);
$('body').css({
	'height':screenHeight,
	'position':'relative'
});
// $('body').on('touchmove',function (e){
// 	e = e || window.event;
// 	e.preventDefault();
// 	e.stopPropagation();	
// });
$('.main').css('height',$('body').height());

//木头左右移动
var slider = function(sliderSpeed){
	$('.wood'). css({'visibility' : 'visible'});
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
var down = function(downSpeed,callback){
	var posTop = $('.wood').offset().top;
	downTimmer = setInterval(function(){
		posTop+=downSpeed;
		$('.wood').css({
			'top': posTop
		});
		if(posTop >= screenHeight - $('.down').height()*0.1 - woodHeight - woodHeight*0.5*count){
			// if(count == 1){
				// $('.wood').css('top',screenHeight - $('.down').height() - woodHeight*count);
			// }else{
				$('.wood').css('top',screenHeight - $('.down').height()*0.1 - woodHeight - woodHeight*0.5*count);
			// }
			clearInterval(downTimmer);
			if(count == 1){
				var judgResult = inPlate() 
			}else{
				var judgResult = judg();
			}
			if(judgResult){
				if(count == 1){
					cutFirst();
				}else if(count > 1){
					cut();
				}else{
					$('.wood').removeClass('wood');
				}
				add();
			}else{
				callback(count);
			}
		}
	},5);
};
//添加木头
var add = function(){
	var pageFlag = false;
	clickFlag = true;
	// num++;
	count++;
	$('.number span').html(count-1);
	var woodImg = $('<img class="wood" src="http://i.meilishuo.net/css//images/lark/cookie/cookie-last.png" alt="">');
	$('.main').append(woodImg);
	if($('.wood').prev().offset().top <= 200){
		pageFlag = true;
	}
	if(pageFlag){
		pageUp();
		$('.wood').css({ 'top' : $('.wood').prev().offset().top - woodHeight*num - mainTop + 'px'});
	}else{
		$('.wood').css({ 'top' : $('.wood').prev().offset().top - woodHeight*num + 'px'});
	}
	$('.wood').css({
		'width': $('.wood').prev().width(),
		'height': woodHeight,
		'visibility': 'hidden'
	});
	// setTimeout(function(){
		slider(count);
	// },500);
};
//判断是否放在盘子中
var inPlate = function(){
	if($('.wood').offset().left + $('.wood').width() < $('.down').offset().left 
		|| $('.wood').offset().left > $('.down').offset().left + $('.down').width()){
		downFlag = false;
		alert(--count + "\n Game Over in");
		return count-1;
		// return false;
	}else{
		clickFlag = true;
		return true;
	}
};
//判断是否放在上一个木头上
var judg = function(){
	if($('.wood').offset().left + $('.wood').width() < $('.wood').prev().offset().left 
		|| $('.wood').offset().left > $('.wood').prev().offset().left + $('.wood').prev().width()){
		downFlag = false;
		alert(--count + "\n Game Over");
		// return count-1;
		return false;
	}else{
		// clickFlag = true;
		return true;
	}
};
//截断木头
var cutFirst = function(){
	if($('.wood').offset().left < $('.down').offset().left){
		$('.wood').css({
			'width': $('.wood').width() - ($('.down').offset().left - $('.wood').offset().left),
			'height': woodHeight,
			'left': $('.down').offset().left
		});
	}else if($('.wood').offset().left + $('.wood').width() > $('.down').offset().left + $('.down').width()){
		$('.wood').css({
			'width': $('.wood').width() - ( ($('.wood').offset().left + $('.wood').width()) - ($('.down').offset().left+$('.down').width()) ),
			'height': woodHeight,
		});
	}
	$('.wood').removeClass('wood');
};
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
	mainTop += woodHeight*0.5;
	$('.main').css({top: mainTop+'px'});
	// $('.wood').css({'top': - mainTop + 'px'});
};
//点击事件
$('body').on('tap',function(){
	$('.gestures').css('display','none');
	if(downFlag && clickFlag){
		clickFlag = false;
		clearInterval(sliderTimmer);
		down(2);
	}
});
slider(count);
exports.down = down;