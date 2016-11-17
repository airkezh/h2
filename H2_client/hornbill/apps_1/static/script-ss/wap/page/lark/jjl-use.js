/*common*/
var $ = require('wap/zepto');
var jjl = require('wap/page/lark/jjl');

function scoreFn(score){
	$('.score').html(score)
}

function endFn(score,time){
	clearInterval(countTimeInt);
	countTime = gameTime - 1;

	alert(score +" "+ time);

	$('.begin_btn').show();

};

var gameTime  = 30 ;
var countTime = gameTime-1 , countTimeInt ;

function countTimeFn(){
	countTimeInt = setInterval(function() {
		countTime--;
		var progressW = (1-countTime/gameTime)*100+"%";
		$('.jjl_time_con span').html(countTime);
		$('.jjl_progress i').width(progressW);

		if(countTime < 1){
			clearInterval(countTimeInt);
			countTime = gameTime - 1;
		}
	}, 1000)
}

$('.begin_btn').removeClass('none')
	.on('tap', function(){
		$(this).hide();
		$('.basket').css({visibility: 'visible'});
		$('.jjl_msgAlert').addClass('none');
		countTimeFn();
		jjl.gameStart(gameTime,scoreFn,endFn);
	})


var height = $(window).height();
if(height < 530){
	$('.jjl_msgAlert').css({
		width : '66%',
		left : '17%'
	})
}


