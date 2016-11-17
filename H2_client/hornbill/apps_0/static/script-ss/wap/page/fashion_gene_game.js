/*common*/
require('wap/lab/jquery.imgpreload');
var tracking = require('wap/app/tracking');
var openAppLink = require('wap/app/openAppLink');


var windowW = $(window).width() 
,windowH = $(window).height()
,scale = windowW * 2 / 750
,box =  {
	w: windowW ,
	h: windowH
}
,img_bg = document.getElementById("bg")
,img_bg0 = {
	w : 600 * scale,
	h : 770 * scale,
	x : 75 * scale,
	y : 50 * scale
}
,img_bg1 = {
	w : 590 * scale,
	h : 760 * scale,
	x : 80 * scale,
	y : 41 * scale,
	alpha : .8
}
,img_bg2 = {
	w : 580 * scale,
	h : 750 * scale,
	x : 85 * scale,
	y : 33 * scale,
	alpha : .6
}
,img_bg3 = {
	w : 566 * scale,
	h : 740 * scale,
	x : 92 * scale,
	y : 25 * scale,
	alpha : .4
}
,img_0 = {
	w : 582 * scale,
	h : 752 * scale,
	x : 84 * scale,
	y : 59 * scale,
	resetX : 84 * scale,
	resetY : 59 * scale
}
,img_1 = {
	w : 574 * scale,
	h : 742 * scale,
	x : 88 * scale,
	y : 50 * scale
}
,cvs = document.getElementById('cvs')
,ctx = cvs.getContext('2d')
,step = 0;
cvs.width = box.w * 2;
cvs.height = 420 * scale *2 ;
cvs.style.width = box.w + 'px';

function drawImg( img , opts ){
	opts.alpha && ( ctx.globalAlpha = opts.alpha );
	ctx.drawImage( img , opts.x , opts.y , opts.w , opts.h );
	ctx.globalAlpha = 1 ;
}
function drawAlpha( img ){
	ctx.globalAlpha = alpha;
	ctx.drawImage( img , img_0.x , img_0.y , img_0.w ,img_0.h);
	ctx.globalAlpha = 1;
}
function clearCanvas() {
	ctx.clearRect(0, 0, box.w * 2 , box.h * 2 );
}
function draw( n ){
	alpha = 1 ;
	CW = false ;
	clearCanvas();
	drawImg( img_bg , img_bg3 );
	drawImg( img_bg , img_bg2 );
	drawImg( img_bg , img_bg1 );
	drawImg( img_bg , img_bg0 );
	drawImg( imgData[n] , img_0 );
}

var alpha = 1 
,nextFlag = true
,resultFlag = 0
,isMlsApp = Meilishuo.config.os.mlsApp;
function move(){
	clearCanvas();
	drawImg( img_bg , img_bg3 );
	drawImg( img_bg , img_bg2 );
	drawImg( img_bg , img_bg1 );
	drawImg( img_bg , img_bg0 );
	
	alpha-=0.08;
	drawAlpha( imgData[a] );
	nextFlag = false ;
	if( alpha < 0 ){
		nextFlag = true ;
		a++;
		if( a >= imgArray.length - 1 ){ a = imgArray.length - 1 }
		draw( a );
		
	}else{
		setTimeout( move , 30 );
	}

}

var a = 0
,imgArray = []
,gameData = null
,imgData = [];
function getImg( url ){
	var img =  new Image();
	img.src = url;
	return img;
}
loadGame( fml.vars.game.data );

function loadGame( data ){
	a = 0 ;
	gameData = data ;
	imgArray = [];
	for (var i = 0, len = gameData.length ; i < len ; i++) {
		imgArray.push( gameData[i].image );
	}

	$.imgpreload( imgArray ,{
		all : function() {
			imgData = [];
			for (var i = 0, len = imgArray.length ; i < len ; i++) {
				imgData.push( getImg( imgArray[i] ) );
			}

			draw( 0 );
			
			$('.game-but0').on('click',function(){
				if( nextFlag ){
					if( a < imgArray.length ){
						saveResult( 0 );
						$('.answer-show').eq( a ).addClass( 'false' );
						move();
					}
					if( a >= imgArray.length - 1 ){
						setTimeout(function(){
							$( '.result' + resultFlag ).show().siblings().hide();
						}, 500);
					}
					tracking.cr('page_element',{action:'click',_location:fml.vars.r+':_page_area=gene_test:_like_flag=0:_pos_id='+a});
				}
			});
			$('.game-but1').on('click',function(){
				if( nextFlag ){
					resultFlag = 1;
					if( a < imgArray.length ){
						saveResult( 1 );
						$('.answer-show').eq( a ).addClass( 'true' );
						move();
					}
					if( a >= imgArray.length - 1 ){
						setTimeout(function(){
							$( '.result' + resultFlag ).show().siblings().hide();
						}, 500);
					}
					tracking.cr('page_element',{action:'click',_location:fml.vars.r+':_page_area=gene_test:_like_flag=1:_pos_id='+a});
				}
			});
		}
	});
}

function saveResult( select ){
	$.ajax({
		type:"get",
		url:"/fashion_gene/aj/save",
		data : {
			gene_id : gameData[a].gene_id ,
			twitter_id : gameData[a].twitter_id ,
			select : select
		},
		dataType:'json',
		success : function(res){
		}
	});
}

$('.again').click(function(){
	//reset
	a = 0 ;
	alpha = 1 ;
	nextFlag = true ;
	resultFlag = 0 ;
	//ajax
	getData();
	//dom reset
	$('.answer-show').removeClass('true false');
	$('#cvs').hide();
	$('.game').show().siblings().hide();
});

function getData(){
	$.ajax({
		type:"get",
		url:"/fashion_gene/aj/game",
		dataType:'json',
		success : function(res){
			loadGame( res.data );
			clearCanvas();
			$('#cvs').show();
		}
	});
}

//单宝跳转
var isMlsApp = Meilishuo.config.os.mlsApp ;
function openScheme(type, param){
	var paramStr = JSON.stringify(param)
	location.href = 'meilishuo://'+type+'.meilishuo/?json_params='+encodeURIComponent(paramStr)
}
$('.game-box').click(function(event){
	event.preventDefault();
	var twitter_id =  gameData[a].twitter_id,
		xr =  gameData[a].r,
		Url;

	if( Meilishuo.config.os.mlsApp ){
		Url = openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		})
	}else{
		Url = '/share/item/' + twitter_id;
	}
	window.location.href = window.__get_r(Url, xr);

});





//埋点
$('.again0').click(function(event){
	tracking.cr('page_element',{action:'click',_location: fml.vars.r+':_page_area=none_style:_pos_name=play_again'});
});
$('.again1').click(function(event){
	tracking.cr('page_element',{action:'click',_location: fml.vars.r+':_page_area=done_style:_pos_name=play_again'});
});
