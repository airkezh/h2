/*common*/
var $ = require('wap/zepto');

var screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	centerX = screenWidth/2,
	centerY = screenHeight/2;
var deviation = 0,
	popFlag = false;
$('body').css('height',screenHeight).css('position','relative');
// $('#board').css('height',screenHeight).css('position','relative');
//圆的样式
var circular = function(bigRadius,smallRadius){
	$('.big-circular').css({
		'width' : bigRadius*2,
		'height' : bigRadius*2,
		'border-radius' : bigRadius,
		'top' : screenHeight/2 - bigRadius,
		'left' : screenWidth/2 - bigRadius
	});
	$('.small-circular').css({
		'width' : smallRadius*2,
		'height' : smallRadius*2,
		'border-radius' : smallRadius,
		'top' : screenHeight/2 - smallRadius,
		'left' : screenWidth/2 - smallRadius
	});
	move(bigRadius,smallRadius);
};
//一次取线段判断是否相交
var getPoint = function(){
	var cX = arrX[arrX.length-2],
		cY = arrY[arrY.length-2],
		dX = arrX[arrX.length-1],
		dY = arrY[arrY.length-1];
	for(var i=0;i<arrX.length-4;i++){
		var aX = arrX[i],
			aY = arrY[i],
			bX = arrX[i+1],
			bY = arrY[i+1];
			var posBlag = cross(aX,aY,bX,bY,cX,cY,dX,dY);
			if(posBlag){
				return true;
			}
	}
	return false;
};
//相交 ab第一条线段，cd第二条线段
var cross = function(aX,aY,bX,bY,cX,cY,dX,dY){
	if ( Math.max(aX, bX) < Math.min(cX, dX) ) {  
        return false;  
    }  
    if ( Math.max(aY, bY) < Math.min(cY, dY) ) {  
        return false;  
    }  
    if ( Math.max(cX, dX) < Math.min(aX, bX) ) {  
        return false;  
    }  
    if ( Math.max(cY, dY) < Math.min(aY, bY) ) {  
        return false;  
    }  
    if ( mult(cX,cY,bX,bY,aX,aY)*mult(bX,bY,dX,dY,aX,aY)<0 ) {  
        return false;  
    }  
    if ( mult(aX,aY,dX,dY,cX,cY)*mult(dX,dY,bX,bY,cX,cY)<0 ) {  
        return false;  
    }  
    return true; 
};
var mult = function(aX,aY,bX,bY,cX,cY){  
    return (aX-cX)*(bY-cY)-(bX-cX)*(aY-cY);  
} 
//canvas样式
var oCanvas = document.getElementById('board');
$('#board').attr({
	'width' : screenWidth,
	'height' : screenHeight
});
var cxt=oCanvas.getContext("2d");
 	cxt.lineWidth=5;
	cxt.strokeStyle="red";
var flag = false;
//移动
var disX = 0, disY = 0, mouseX = 0, mouseY = 0;
var arrX = [], arrY = [];
var move = function(bigRadius,smallRadius){
	$('#board').on('touchstart' , function (e) {
		e = e || window.event;
		disX = e.targetTouches[0].pageX - this.offsetLeft;
		disY = e.targetTouches[0].pageY - this.offsetTop;
		flag = true;
		cxt.moveTo(disX,disY);
		arrX.push(disX);
		arrY.push(disY);
	});
	$('#board').on('touchmove' , function (e) {
		e = e || window.event;
		e.preventDefault();
		e.stopPropagation();
		mouseX = e.targetTouches[0].pageX - this.offsetLeft;
		mouseY = e.targetTouches[0].pageY - this.offsetTop;
		arrX.push(mouseX);
		arrY.push(mouseY);
		//判断是否相交
		var result = getPoint();
		// console.log(result);
		if(result){
			popFlag = true;
		}
		//计算偏差
		if(!popFlag){
			distance = Math.sqrt((mouseX-centerX)*(mouseX-centerX) + (mouseY-centerY)*(mouseY-centerY));
			if(distance < smallRadius){
				deviation += smallRadius - distance;
			}else if(distance > bigRadius){
				deviation += distance - bigRadius;
			}
		}
		// console.log(deviation);
		if(flag){
			cxt.lineTo(mouseX,mouseY);
			cxt.stroke();
		}
	});
	$('#board').on('touchend' , function (e) {
		if(popFlag){
			alert(deviation);
		}else{
			alert("不是一个封闭图像");
		}
		flag = false;
	});
}

circular(100,90);