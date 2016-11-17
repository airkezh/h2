/*common*/
require('wap/zepto');
var iio = require('wap/lab/iioEngine1.2.2');

//点击开始按钮，开始游戏。
$('#start').click(startFn);
//开始函数
function startFn(){
	scoreFn(0);
	$('.ioCanvas').remove();
	iio.start(Crocodile , 'cas');
}
//游戏成功的回调函数
function successFn(){
	alert('你成功的避开鳄鱼的坏牙！');
}
//游戏结束的回调函数
function overFn(){
	setTimeout(function(){
			alert('你碰到鳄鱼的坏牙了！');
	},100);
}
//积分函数
function scoreFn( n ){
	$('#score').html( n );
}
//背景图片的原始尺寸
var 	bgImg = {
	w : 650,
	h : 490
};
//牙齿图片的原始尺寸
var toothImg = {
	w : 20,
	h : 30
};
//图片在画布中的显示缩放比
var scale = $(window).width() /  bgImg.w;

//画布的尺寸
var gameBox = {
	w : $(window).width() ,
	h : bgImg.h * scale
};
//游戏中牙齿的尺寸
var gameTooth = {
	w : toothImg.w * scale,
	h : toothImg.h * scale
};

//牙齿在原图中的位置
var teethPos = [
		{w : 338,h : 352},{w : 366,h : 362},{w : 395,h : 371},{w : 423,h : 377},{w : 456,h : 383},{w : 489,h : 384},{w : 523,h : 377},{w : 548,h : 359},{w : 558,h : 325},{w : 542,h : 294},{w : 512,h : 274},{w : 483,h : 260}
	];


Crocodile = function(io){
	//设置canvas的尺寸。
	io.canvas.width = gameBox.w;
	io.canvas.height = gameBox.h;
	
	//创建牙齿
	var imgTooth ;
	var teeth = [];
	function initTeeth(){
		var imgTooth = new Image();
		imgTooth.onload = function(){
			for(var i= 0, len = teethPos.length ; i< len; i++){
				
				teeth[i] = io.addObj( new iio.Rect( teethPos[i].w * scale , teethPos[i].h * scale , gameTooth.w , gameTooth.h )
			      .addImage(imgTooth).enableKinematics()
				);
				teeth[i].badTooth = 0;
			}
			console.log(teeth);
			var random = iio.getRandomInt(0, teethPos.length );
			console.log(random);
			teeth[ random ].badTooth = 1;
		};
		imgTooth.src='http://d01.res.meilishuo.net/pic/_o/f3/60/4c36c38ef03f0ab9a422dda312ab_20_29.ch.png';
	}
	
	//创建鳄鱼
	var crocodileObj ;
	initCrocodile = function(){
	   	crocodileObj = io.addObj( new iio.Rect( gameBox.w/2 , gameBox.h/2 , gameBox.w , gameBox.h )
		      .addImage(img) );
		initTeeth();
	};
	var img = new Image();
	img.onload = initCrocodile;
	img.src='http://d05.res.meilishuo.net/pic/_o/67/38/0853f9fd9fa816222f4cf7f41979_651_490.ch.jpg';
	
	//创建咬住
	var biteObj;
	bite = function(){
		var biteImg = new Image();
		biteImg.onload = function(){
			io.rmvAll();
			biteObj = io.addObj( new iio.Rect( gameBox.w/2 , gameBox.h/2 , gameBox.w , gameBox.h )
				.addImage(biteImg) );
		};
		biteImg.src='http://d04.res.meilishuo.net/pic/_o/87/71/187f3585a1ce32566b3d028aa21a_651_490.ch.jpg';
	};
	
	//分数统计
	var count = 0;
	
	console.log('io.',io.canvas);
	//事件绑定
	io.canvas.onclick  = function(event){
		for( var i= 0, len = teeth.length ; i< len; i++ ){
			if ( teeth[i].contains(io.getEventPosition(event)) ){
				if( teeth[i].badTooth === 0 ){
					//碰到好牙
					teeth[i].setSize(0,0);
					io.canvas.draw(io.context);
					count++;
					scoreFn( count );
					if( count >= 11 ){
						successFn();
					}
					
				}else{
					//碰到坏牙
					bite();
					io.canvas.draw(io.context);
					overFn();
				}
			}
		}
	};

};

//canvas绑定Crocodile函数。
iio.start(Crocodile , 'cas');
