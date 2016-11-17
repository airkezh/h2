/*common*/
var $ = require('wap/zepto');

// 初始化屏幕数据
var height = $(window).height(),
	width = $(window).width();

var endFn = null ,
	scoreFn = null;

$('#jjlBox').css({
	width: width,
	height: height
});

var timeAll = 30 ;

// 游戏元素位置初始化



$('.basket').css({
	'bottom': '7%',
	'left': ( width - 84)/2
}).removeClass('none').css({
	visibility: 'hidden'
});


// 游戏开始
var score,
	randomInterval = [],
	runTime;

function gameStart(gTime,sFn,eFn) {
	timeAll = gTime;
	scoreFn = sFn;
	endFn = eFn;
	randomInterval = []
	restTime = timeAll
	score = 0
	dideAgain = 1
	//$('.score').html(score)
	scoreFn(score);
	timeer();
	RandomInit(0);
	randomInterval.push(setInterval(function(){var a = randomInterval.length; RandomInit(a)}, 500))
}

// 阻止屏幕竖向滑动
$(window).on('touchmove', function(event) {
	event.preventDefault()
})

// 初始化雪橇数据
var touchInitX = 0,
	touchInitY = 0,
	itemStartX = 0,
	positionX = $('.basket').offset().left,
	positionY = $('.basket').offset().top

// 雪橇移动 尺寸:75*81   // 雪橇移动 尺寸:84*84
// 初始化限制
var moveLeftMax = -14,
	moveRightMax = width - 84 +12 ;
 
$('.basket').on('touchstart', function(event) {
	var touchInfo = event.touches[0]
	itemStartX = parseInt($(this).css('left'))
	touchInitX = touchInfo.clientX
	touchInitY = touchInfo.clientY
}).on('touchmove', function(event) {
	event.preventDefault();
	var touchInfo = event.touches[0];
	var moveX = touchInfo.clientX - touchInitX + itemStartX
	if (moveX > moveLeftMax && moveX < moveRightMax) {
		positionX = moveX
		$(this).css('left', moveX)
	}
	return false
})

// 掉落初始化 尺寸:35*35
var giftInit = $('.gift_init')

function giftItemsInit(giftIndex, offsetLeft, delay) {
	var item = {
		dom: giftInit.eq(giftIndex).clone().css({
			'left': offsetLeft,
			'top': 0
		}).removeClass('gift_init'),
		index: giftIndex,
		offset: offsetLeft
	}
	return item
}

var dideAgain = 1

var movePositionY = positionY + 25 ;

function giftItemsMove(item, speed) {
	item.dom.appendTo('#jjlBox').animate({
		translate3d: '0,' + movePositionY + 'px,0'
	}, speed, 'linear', function() {
		var GoalLeft = positionX + 16,
			GoalRight = positionX + 70,
			thisLeft = $(this).offset().left
		if (thisLeft > GoalLeft && thisLeft < GoalRight) {
			if (item.index == 2 && dideAgain) {
				runTime = timeAll - restTime ;
				
				dideAgain = 0
				restTime = -1
				gameEnd(2)
				return
			} else if(item.index == 2 && !dideAgain){
				return
			} else {
				$(this).remove()
				if(dideAgain){
					score++
					scoreAlert(thisLeft+5)
					scoreFn(score);
					
				}
			}
		} else {
			$(this).animate({
				opacity: 0
			}, 80, function() {
				$(this).remove()
			})
		}
	})
}

var alertInit = $('.scoreAlert');
function scoreAlert(left){
	var a = alertInit.clone().css({
		'left': left+5
		,'top' : positionY-30
	}).appendTo('#jjlBox');
	a.animate({opacity : 0}, 1000, function(){
		a.remove()
	})
}

function gameEnd(id) {
	$('.gift').remove();
	
	for(var i = 0; i < randomInterval.length; i++){
		clearInterval(randomInterval[i])
	}
	clearInterval(timmering)
	clearInterval(kuInter)
	gameAlert(id);
	endFn(score,runTime);
}

function gameAlert(id) {
	var content = {
		'1': '时间到',
		'2': '小心在哭泣的花小美哦~'
	};
	console.log(content[id]);
}

// 倒计时
var restTime = timeAll ,
	timmering ;
var timeDowning = function() {
	if (restTime > -1){
		restTime--
	}
	if (restTime == 50){
		kuAdd()
	}
	var a = randomInterval.length
	if(restTime % 10 == 0){
		if(a >= 3){
			clearInterval(randomInterval[a-3])
		}
		randomInterval.push(setInterval(function(){RandomInit(a)}, 500))
	}
}
var timeer = function() {
	timeDowning()
	timmering = setInterval(function() {
		timeDowning()
		if (restTime <= 0) {
			runTime = timeAll;
			gameEnd(1);
		}
	}, 1000)
}

// 随机掉落物品位置
function RandomInit(a) {
	var speed = 3000 - a * 300
	var index = Math.floor(Math.random() * timeAll) % 6,
		offset = Math.floor(Math.random() * (width - 35) * 1000) % (width - 35)
	giftItemsMove(giftItemsInit(index, offset), speed)
}

var kuInter ;
function kuAdd(){
	kuInter = setInterval(function(){
		offset = Math.floor(Math.random() * (width - 35) * 1000) % (width - 35)
		giftItemsMove(giftItemsInit(2, offset), restTime*20 + 600)
	}, 500)
}
exports.gameStart = gameStart;

