/*common*/
require('wap/jquery');
var iio = require('wap/lab/iioEngine1.2.2');

$('.click').on( 'touchmove' , function(){
	e.preventDefault();
    e.stopPropagation();
} );

$('.click').click( function(){
	$(this).hide();
} );

var game = {
	boxW : $(window).width() ,
	boxH : $(window).height() ,
	cellW : $(window).width()/4 ,
	cellH : $(window).height()/4
};

/**
 * [speedvar description]
 * @type {Number}
 */
var bg , runer , speed = 0, count=0 , clickFlag = 0 , preClickFlag = 0 ;

/**
 * [acceleration 运动加速度]
 * @type {Number}
 */
var acceleration = 2;

/**
 * [time 游戏时间]
 * @type {Number}
 */
var time = 0 ;
var gameTime = 10*1000;

function countTime( t ){
	console.log( t );
	var showTime = (gameTime - t) / 1000 ;
	var  $_time = $('#time') ;
	$_time.html( showTime.toFixed(2) );
}




ImageDemo = function(io){
	
	//添加背景对象
	function init1(){
		
	    bg = io.addObj(new iio.Rect( game.boxW/2 , -game.boxH , game.boxW , game.boxH*4 )
	      .addImage(img1)
	      .enableKinematics()
	      .setVel(0,0));
	      
	      init2();
	}
  	
  	//创建添加人物
	function init2(){
		runer = io.addObj(new iio.Rect( game.boxW/2 , game.boxH/2 , 60 , 100 )
			.addImage( img2[0] )
	    );
	}
	//创建添加人物
	function init3(){
		runer = io.addObj(new iio.Rect( game.boxW/2 , game.boxH/2 , 60 , 100 )
			.addImage( img2[1] )
	    );
	}
	
	var img2 = [];
	img2[0] = new Image();
	img2[0].src = 'http://d03.res.meilishuo.net/pic/_o/63/4d/d3131dc1d06c2aa294bcf186e750_115_184.cg.png'; 
	img2[1] = new Image();
	img2[1].src = 'http://d01.res.meilishuo.net/pic/_o/a7/ff/3d1f4906b268dd61ef5740b0b5c0_115_184.cg.png';
  	
  	var img1 = new Image();
  	img1.onload = init1;
  	img1.src = 'http://d04.res.meilishuo.net/pic/_o/fb/2b/4c034c0893f9296c1b8dc8401e1d_750_4820.ch.jpg';
  	
  	//动画
  	io.setFramerate(50, function(){
  		count++;
  		
		//脚步切换
  		if( count%((acceleration*10-speed)*10) > 0 && count%((acceleration*10-speed)*10) < (acceleration*10-speed)*10/2){
  			init2();
  		}else{
  			init3();
  		}
  		
  		//减速加速
  		if( count%20 === 0 ){
  			if( clickFlag > preClickFlag ){
	  			preClickFlag = clickFlag ;
	  			speed+= acceleration ;
	  			if( speed > acceleration*10){
	  				speed = acceleration*10 ;
	  			}
	  			if(bg) bg.vel.y = speed;
	  		}else{
				speed-=acceleration;
				if(speed <= 0) speed = 0 ;
				
				if(bg) bg.vel.y = speed ;
				
			}
 		}
  		
  		//开始计时
  		if( clickFlag > 0 ){
  			time+=20 ;
  			if( time >= gameTime ){
  				io.pauseFramerate();
  			}
  			countTime( time );
  		}

		if( bg && bg.pos.y > 1200){
			alert('到达终点');
			io.pauseFramerate();
  		}
  		
 	});
 
	io.canvas.addEventListener('touchstart', function(e){
			clickFlag++ ;
			e.preventDefault();
			e.stopPropagation();
  	});

};

iio.start(ImageDemo);

