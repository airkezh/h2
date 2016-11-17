/*common*/
var $ = require('wap/zepto');

var screenWidth = $(window).width(),
screenHeight = $(window).height(),
mainWidth = parseInt($(window).width() * 0.9);
var arr = [2,4,8,16,32,64,128,256,512,1024];

//样式
$('body').css('height',screenHeight).css('position','relative');
$('body').on('touchmove',function (e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});
$('.main').width(mainWidth).height(mainWidth);
$('.patch').css({
	'width' : (mainWidth-50)/4,
	'height' : (mainWidth-50)/4,
	'margin-top' : '10px',
	'margin-left' : '10px'
});

//数组去重
Array.prototype.unique = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}
//初始添加数据
var addNum = function(){
	var patch = $('.patch');
	var numArr = [];
	for(var i=0;i<3;i++){
		var num = parseInt(Math.random()*16);
		numArr.push(num);
	}
	for(var j=0;j<999;){
		var numArr = numArr.unique();
		if(numArr.length < 3){
			var num = parseInt(Math.random()*16);
			numArr.push(num);
			j++;
		}else{
			for(var i=0;i<3;i++){
				var arrNum = parseInt(Math.random()*2);
				$(patch[numArr[i]]).html(arr[arrNum]);
			}
			return false;
		}
	}
}
//添加数据
var addANum = function(){
	var patch = $('.patch');
	var arrNum = parseInt(Math.random()*2);
	if(!empty()){
		for(;;){
			var num = parseInt(Math.random()*16);
			if(!($(patch[num]).html())){
				$(patch[num]).html(arr[arrNum]);
				return false;
			} 
		}
	}
};
//初始化
var patchArr = new Array();
var init = function(){
	for(var i=0;i<4;i++){
		patchArr[i] = new Array();
		for(var j=0;j<4;j++){
			patchArr[i][j] = $('<div class="patch"></div>');
			$('.main').append(patchArr[i][j]);
			$('.patch').css({
				'width' : (mainWidth-50)/4,
				'height' : (mainWidth-50)/4,
				'margin-top' : '10px',
				'margin-left' : '10px'
			});
		}
	}
	addNum();
};
//重新整理新数组
addNumFlag = false;
var reNewArray = function(sliderUpArr){
	for(var m=0;m<sliderUpArr.length;m++){
		if(sliderUpArr[m] == sliderUpArr[m+1]){
			sliderUpArr[m] = sliderUpArr[m]*2;
			m++;
			sliderUpArr[m] = 0;
			addNumFlag = true;
		}
	}
	for(var l=0;l<sliderUpArr.length;l++){
		if(sliderUpArr[l]==0){
			for(var n=l;n<sliderUpArr.length-1;n++){
				sliderUpArr[n] = sliderUpArr[n+1];
			}
			sliderUpArr.length--;
		}
	}
	return sliderUpArr;
};

//是否有可合并项
var mergeLeft = function(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if($(patchArr[i][j]).html()==$(patchArr[i][j+1]).html() && $(patchArr[i][j]).html()!=''){
				return false;
			}
		}
	}
	return true;
};
var mergeUp = function(){
	for(var j=0;j<4;j++){
		for(var i=0;i<3;i++){
			if($(patchArr[i][j]).html()==$(patchArr[i+1][j]).html() && $(patchArr[i][j]).html()!=''){
				return false;
			}
		}
	}
	return true;
};
//判断游戏是否结束
var gameOver = function(){
	console.log('e'+empty());
	console.log('mUp'+mergeUp());
	console.log('mL'+mergeLeft());

	if(empty() && mergeUp() && mergeLeft()){
		alert("Game Over!");
	}
};
//是否有空元素
var empty = function(){
	var patch = $('.patch');
	for(var i=0;i<patch.length;i++){
		if($(patch[i]).html() == ""){
			return false;
		}
	}
	return true;
};
//数组去零
var reAddArr = function(ifAddArr){
	for(var i=3;i>=0;i--){
		if(ifAddArr[i] == 0){
			ifAddArr.length--;
		}
	}
	return ifAddArr.length;
};
var reAddArrLast = function(ifAddArr){
	for(var i=3;i>=0;i--){
		if(ifAddArr[i] == 0){
			ifAddArr.length--;
		}else{
			return ifAddArr.length;
		}
	}
	return ifAddArr.length;
};
//是否有空元素
var haveEmptyUp = function(){
	for(var j=0;j<4;j++){
		var ifAddArr = [];
		for(var i=0;i<4;i++){
			if($(patchArr[i][j]).html()){
				ifAddArr.push(parseInt($(patchArr[i][j]).html()));
			}else{
				ifAddArr.push(0);
			}
		}
		if(reAddArrLast(ifAddArr)!=reAddArr(ifAddArr)){ //一列中有空元素
			return true;
		}
	}
	return false;
};
var haveEmptyDown = function(){
	for(var j=0;j<4;j++){
		var ifAddArr = [];
		for(var i=3;i>=0;i--){
			if($(patchArr[i][j]).html()){
				ifAddArr.push(parseInt($(patchArr[i][j]).html()));
			}else{
				ifAddArr.push(0);
			}
		}
		if(reAddArrLast(ifAddArr)!=reAddArr(ifAddArr)){ //一列中有空元素
			return true;
		}
	}
	return false;
};
var haveEmptyLeft = function(){
	for(var i=0;i<4;i++){
		var ifAddArr = [];
		for(var j=0;j<4;j++){
			if($(patchArr[i][j]).html()){
				ifAddArr.push(parseInt($(patchArr[i][j]).html()));
			}else{
				ifAddArr.push(0);
			}
		}
		if(reAddArrLast(ifAddArr)!=reAddArr(ifAddArr)){ //一列中有空元素
			return true;
		}
	}
	return false;
};
var haveEmptyRight = function(){
	for(var i=0;i<4;i++){
		var ifAddArr = [];
		for(var j=3;j>=0;j--){
			if($(patchArr[i][j]).html()){
				ifAddArr.push(parseInt($(patchArr[i][j]).html()));
			}else{
				ifAddArr.push(0);
			}
		}
		if(reAddArrLast(ifAddArr)!=reAddArr(ifAddArr)){ //一列中有空元素
			return true;
		}
	}
	return false;
};
//向上滑动
var firstFlag = true;
var sliderFlag = 0;
var newSliderFlag = 0;
var sliderUp = function(){
	sliderFlag = 1;
	var sliderUpArr = [];
	for(var j=0;j<4;){
		sliderUpArr.length = 0;
		//取一列数据添加到新数组中
		for(var i=0;i<4;i++){
			if($(patchArr[i][j]).html()){
				sliderUpArr.push(parseInt($(patchArr[i][j]).html()));
			}
		}
		//整理新数组中的数据
		sliderUpArr = reNewArray(sliderUpArr);
		//清空一列的数据
		for(var k=0;k<4;k++){
			$(patchArr[k][j]).html('');
		}
		//重新添加数据
		if(sliderUpArr.length){
			for(var n=0;n<sliderUpArr.length;n++){
				$(patchArr[n][j]).html(sliderUpArr[n]);
			}
			j++;
		}else{
			j++;
		}
	}
	gameOver();
	//第一次执行滑动操作、有空元素、有可相加元素时生成新元素
	if(firstFlag){
		addANum();
		firstFlag = false;
	}else if(newSliderFlag != sliderFlag){
		addANum();
		newSliderFlag = 1;
	}else if(haveEmptyUp()){
		addANum();
	}else if(!mergeUp()){
		addANum();
	}else{
		return false;
	}
};
//向下滑动
var sliderDown = function(){
	sliderFlag = 2;
	var sliderUpArr = [];
	for(var j=0;j<4;){
		sliderUpArr.length = 0;
		//取一列数据添加到新数组中
		for(var i=3;i>=0;i--){
			if($(patchArr[i][j]).html()){
				sliderUpArr.push(parseInt($(patchArr[i][j]).html()));
			}
		}
		//整理新数组中的数据
		sliderUpArr = reNewArray(sliderUpArr);
		//清空一列的数据
		for(var k=0;k<4;k++){
			$(patchArr[k][j]).html('');
		}
		//添加数据
		if(sliderUpArr.length){
			for(var n=3,p=0;p<sliderUpArr.length;n--,p++){
				$(patchArr[n][j]).html(sliderUpArr[p]);
			}
			j++;
		}else{
			j++;
		}
	}
	gameOver();
	if(firstFlag){
		addANum();
		firstFlag = false;
	}else if(newSliderFlag != sliderFlag){
		addANum();
		newSliderFlag = 2;
	}else if(haveEmptyDown()){
		addANum();
	}else if(!mergeUp()){
		addANum();
	}else{
		return false;
	}
};
//向左滑动
var sliderLeft = function(){
	sliderFlag = 3;
	var sliderUpArr = [];
	for(var i=0;i<4;){
		sliderUpArr.length = 0;
		//取一列数据添加到新数组中
		for(var j=0;j<4;j++){
			if($(patchArr[i][j]).html()){
				sliderUpArr.push(parseInt($(patchArr[i][j]).html()));
			}
		}
		//整理新数组中的数据
		sliderUpArr = reNewArray(sliderUpArr);
		//清空一列的数据
		for(var k=0;k<4;k++){
			$(patchArr[i][k]).html('');
		}
		//添加数据
		if(sliderUpArr.length){
			for(var n=0;n<sliderUpArr.length;n++){
				$(patchArr[i][n]).html(sliderUpArr[n]);
			}
			i++;
		}else{
			i++;
		}
	}
	gameOver();
	if(firstFlag){
		addANum();
		firstFlag = false;
	}else if(newSliderFlag != sliderFlag){
		addANum();
		newSliderFlag = 3;
	}else if(haveEmptyLeft()){
		addANum();
	}else if(!mergeLeft()){
		addANum();
	}else{
		return false;
	}
};
//向右滑动
var sliderRight = function(){
	sliderFlag = 4;
	var sliderUpArr = [];
	for(var i=0;i<4;){
		sliderUpArr.length = 0;
		//取一列数据添加到新数组中
		for(var j=3;j>=0;j--){
			if($(patchArr[i][j]).html()){
				sliderUpArr.push(parseInt($(patchArr[i][j]).html()));
			}
		}
		//整理新数组中的数据
		sliderUpArr = reNewArray(sliderUpArr);
		//清空一列的数据
		for(var k=0;k<4;k++){
			$(patchArr[i][k]).html('');
		}
		//添加数据
		if(sliderUpArr.length){
			for(var n=3,p=0;p<sliderUpArr.length;n--,p++){
				$(patchArr[i][n]).html(sliderUpArr[p]);
			}
			i++;
		}else{
			i++;
		}
	}
	gameOver();
	if(firstFlag){
		addANum();
		firstFlag = false;
	}else if(newSliderFlag != sliderFlag){
		addANum();
		newSliderFlag = 4;
	}else if(haveEmptyRight()){
		addANum();
	}else if(!mergeLeft()){
		addANum();
	}else{
	}
};
/**滑动判断**/
//返回角度
var GetSlideAngle = function(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
var GetSlideDirection = function(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }
    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }
    return result;
}
//滑动处理
var startX, startY;
document.addEventListener('touchstart', function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;   
}, false);
document.addEventListener('touchend', function (ev) {
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
        case 0:// 没滑动
            break;
        case 1:// 向上
            slider = 1;
            sliderUp();
            break;
        case 2:// 向下
            slider = 2;
            sliderDown();
            break;
        case 3:// 向左
            slider = 3;
            sliderLeft();
            break;
        case 4:// 向右
            slider = 4;
            sliderRight();
            break;
        default:            
    }   
}, false);
init();			