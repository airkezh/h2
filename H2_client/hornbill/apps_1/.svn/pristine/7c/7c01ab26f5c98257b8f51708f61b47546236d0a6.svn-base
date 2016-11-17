/*common*/
var $ = require('wap/zepto');

var moneyMoreTop = $('.money-more').offset().top,
	moneyMoreRight = $('.money-more').offset().left;
var moveFlag = false,
	startFlag = false,
	upFlag = false;

var count = 0,
	countTime = 30;

$('body').height($(window).height())
		.on('touchmove',function (e){
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();	
});
// 倒计时
var countDown = function(countTime){
	var countDown = setInterval(function(){
		$('.time').html(countTime--);
		if(countTime < 0){
			clearInterval(countDown);
			startFlag = false;
			setTimeout(function(){
				alert(count);
			},10);
		}
	},1000);
};
//开始
$('.start').on('tap',function(){
	countDown(30);
	startFlag = true;
	$('.start').html('');
});
$('.money-more').on('touchstart',function(ev){
	if(!moveFlag && startFlag){
		var money = $('<div class="money"><img src="http://i.meilishuo.net/css//images/lark/money/money.png"></div>');
		$(money).appendTo($('.money-more')).css({
			'top' : moneyMoreTop,
			'right' : moneyMoreRight,
		});
		moveFlag = true;
		upFlag = false;
	}
    var startY = ev.touches[0].pageY;  
    $('.money-more').on('touchmove',function(ev){
		var endY = ev.changedTouches[0].pageY; 
		var dis = startY - endY; 
		console.log(dis);
		if(dis > 0){
			upFlag = true;
		}else{
			$(money).remove();
		}
	}); 
	$('.money-more').on('touchend',function(ev){
	   	var endX = ev.changedTouches[0].pageX,
			endY = ev.changedTouches[0].pageY;  
		if(moveFlag && upFlag){
			var moneyHeight = $('.money').height();
			$('.money').css({
				'top': -moneyHeight + 'px',
			});
			moveFlag = false;
			count ++;
			$('.count').html(count);
			setTimeout(function(){
				$(money).remove();
			},200);
	    }
	}); 
});

