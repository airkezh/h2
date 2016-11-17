/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick');

var groundH = $('#ground').height();

var ballWidth = $('#football').width();
	ballCoreX = $('#football').offset().left,
	ballCoreY = $('#football').offset().top;

var doorHeight = $('#door').height(),
	doorWidth = $('#door').width(),
	doorTop = $('#door').offset().top,
	doorLeft = $('#door').offset().left;

var goalkeeperLeft = $('#goalkeeper').offset().left
	,goalkeeperTop = $('#goalkeeper').offset().top;

var score = 0;//记录得分数
var timer;

//初始化球的位置
function ballInit(){
	$('#football').css({
		'left': ballCoreX,
		'top': ballCoreY
	}) 
}

//初始化守门员的位置
function goalkeeperInit(){
	$('#goalkeeper').css({'left': '50%', 'top': '20%', 'margin-left': '-10%'});
}

function catchGoal(){
	$('#goalkeeper,#football').css({'left': goalkeeperLeft, 'top': goalkeeperTop});
}

//判断是否进球
function goal(left, top){
	clearTimeout(timer);
	var rLeft = direction(left,top).left
		,rTop = direction(left,top).top
	if(left > doorLeft && left < doorLeft + doorWidth && top > doorTop && top < doorTop + doorHeight){
		if(rTop != top && rLeft != left){
			score++;
			$('#football').css({
				'left': left
				,'top': top
				,'transition': 'all .3s ease-in'
			});
			$('#goalkeeper').css({
				'left': rLeft,
				'top': rTop
				,'transition': 'all .3s ease-in'
			});
			timer = setTimeout(function(){
				catchGoal();
				alert('💗 不错哦');
		    	ballInit();
		    	goalkeeperInit();
			},1000);

			// $('body').trigger('touchend');
		}else{
			$('#football, #goalkeeper').css({
				'left': left
				,'top': top
				,'transition': 'all .5s ease-in'
			})
			timer = setTimeout(function(){
				catchGoal();
		    	alert('😄被挡住了');
		    	ballInit();
		    	goalkeeperInit();
		    },1000);

		    // $('body').trigger('touchend');
		}
		
    }else{
    	$('#football').css({
			'left': left
			,'top': top
			,'transition': 'all .3s ease-in'
		})
		$('#goalkeeper').css({
			'left': left,
			'top': direction(left,top).top
			// ,'transition': 'all .5s ease-in-out'
		});
		timer = setTimeout(function(){
			catchGoal();
	    	alert('再加油吧');
	    	ballInit();
	    	goalkeeperInit();
	    },1000);

	    
    }
}

//守门员防守方向
function direction(left,top){
	var random = 0.5 - Math.random();
	if(random > 0){ return {'top': top, 'left': left} }
	else return {
		'left': -random * left,
		'top': -random * top
	};
}

$('body').on('touchend',function(e){
	delay(e);
});
var delay = function(e){
	setTimeout(function(){
		$('body').on('touchend',function(e){
			delay(e);
		});
	},1000)
	$('body').off('touchend')
	// $('#football').removeClass('animation');
	var pos = e.changedTouches[0]
    	,eX = pos.pageX
    	,eY = pos.pageY
    	,left
    	,top
    if(eY < (groundH*0.8)){
		var left = eX - ballWidth/2;
		var top = eY - ballWidth/2;
    	goal(left, top);
    }else{
    	alert('使劲儿踢');
    }
}

