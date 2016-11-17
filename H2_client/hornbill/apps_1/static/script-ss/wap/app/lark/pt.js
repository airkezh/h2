/*common*/
var zepto = require('wap/zepto'),
	touch = require('wap/zepto/touch'),
	Alert = require('wap/ui/alert');

// $(".popup").css({"width":$(window).width()+'px',"height":$(window).height()+'px',"line-height":$(window).height()+'px'});
// setTimeout(function(){
// 	$(".popup").css("display","block");
// 	var time = 3;
// 	var timer = setInterval(function(){
// 		$(".popup h1").html(time--);
// 		if(time<0){
// 			$(".popup h1").html("ready go");
// 			setTimeout(function(){
// 				clearInterval(timer);
// 				$(".popup").css("display","none");
// 				countdown();
// 			},1000);
// 		}
// 	},1000);
// },1000);
// function countdown(){
// 	var nowDate = new Date().getTime();
// 	var lastDate = (new Date()).getTime() +3000;
// 	var data = setInterval(function(){
// 		nowDate = new Date().getTime();
// 		$(".countdown span").html(lastDate-nowDate);
// 		if(lastDate-nowDate<0){
// 			$(".countdown span").html("0");
// 			clearInterval(data);
// 		}
// 	},100);
	
	// console.log(nowDate+','+lastDate);
	// console.log();
	
// }
// countdown();

fml.vars.double = 0;
function start(split,aImg,imgWidth,cbk){
	console.log('width'+imgWidth);
	aImg.sort(function(){return Math.random()>0.5?-1:1;})
	for(var i=0;i<aImg.length;i++){
		aImg.eq(i).css("width",imgWidth);
	}
	var width = aImg.eq(0).width();
	var height = aImg.eq(0).height();
	for(var i=0;i<aImg.length;i++){
		var top = parseInt(i/split)*height;
		var left = parseInt(i%split)*width;
		aImg.eq(i).css({"position":"absolute","left":left,"top":top});
	}
	for(var i=0;i<aImg.length;i++){ 
		var zIndex = 7;
		var flag = 0;
		(function(i){
			aImg[i].addEventListener('touchstart' , function (e) {
				var _this = $(this).attr('src').match(/(\d)+\.jpg$/)[1];
				if (fml.vars.double == 0) {
					fml.vars.double = _this;
				};
				if (fml.vars.double != _this) {
					return false;
				}else{
					fml.vars.double = _this;
				}
				var _this = this;
				iMinIndex = 0;
				flag = 0;
				var e = e || event;
				position = {left:aImg[i].offsetLeft,top:aImg[i].offsetTop};
				disX = e.targetTouches[0].pageX - aImg[i].offsetLeft;
				disY = e.targetTouches[0].pageY - aImg[i].offsetTop;
				_this.style.zIndex = ++zIndex;
				
			});
			aImg[i].addEventListener('touchmove' , function (e) {
				var _this = $(this).attr('src').match(/(\d)+\.jpg$/)[1];
				if (fml.vars.double != _this) {
					return false;
				}else{
					fml.vars.double = _this;
				}
				flag = 1;
				var _this = this;
				var e = e || event;
				eLeft = e.targetTouches[0].pageX;
				eTop = e.targetTouches[0].pageY;
				var eImgLeft = eLeft - disX;
				var eImgTop = eTop - disY;
				// 判断是否拖出屏幕外
				var testTop = $(".pt-board").get(0).getBoundingClientRect().top,
					testLeft = $(".pt-board").get(0).getBoundingClientRect().left;
					// console.log(-testTop);
				if(eImgTop < -testTop) {
					eImgTop = -testTop;
				}else if( (eImgTop+imgWidth) > $(window).height()-testTop) {
					eImgTop = $(window).height()-testTop-imgWidth;
				}
				if(eImgLeft < -testLeft) {
					eImgLeft = -testLeft;
				}else if( (eImgLeft+imgWidth) > $(window).width()-testLeft) {
					eImgLeft = $(window).width()-testLeft-imgWidth;
				}
				_this.style.left = eImgLeft +'px';
				_this.style.top = eImgTop +'px';
				// 调用碰撞检测
				iMinIndex = findNearest(_this);
				endX = aImg[iMinIndex].offsetLeft;
				endY = aImg[iMinIndex].offsetTop;
				$(".pt-board div").remove();
				if(testTest(eLeft,eTop)){
					var testZIndex = zIndex-1;
					$('.pt-board').append($('<div id="popwin" style="width:'+imgWidth+'px'+';height:'+imgWidth+'px;position:absolute;opacity: 0.4;background-color: black;z-index: '+ testZIndex +';top:'+endY+'px;left:'+endX+'px;">'));
				}
				if(e && e.preventDefault) {  
					//阻止默认浏览器动作(W3C)  
					e.preventDefault();  
				} else {  
					//IE中阻止函数器默认动作的方式   
					window.event.returnValue = false;   
				}
		        return false;
			});
			aImg[i].addEventListener('touchend' , function () {
				var _this = $(this).attr('src').match(/(\d)+\.jpg$/)[1];
				if (fml.vars.double == _this) {
					fml.vars.double = 0;
				}else{
					return false;
				}
				var _this = this; 
				if(flag ==1){
					if(testTest(eLeft,eTop)){
						aImg[iMinIndex].style.left = position.left + 'px';
						aImg[iMinIndex].style.top = position.top + 'px';
						_this.style.left = endX + 'px';
						_this.style.top = endY + 'px';
					}else{
						_this.style.left = position.left + 'px';
						_this.style.top = position.top + 'px';
					}
					$(".pt-board div").remove();
					setTimeout(function(){success(aImg,split,imgWidth,cbk);},100);
					
				}
			});
		})(i);
		
		//判断位置是否正确
		function success(aImg,split,imgWidth,cbg){
			// console.log(Math.round(parseInt(aImg[8].style.top)/imgWidth*split + parseInt(aImg[8].style.left)/Math.ceil(imgWidth)) +1);
			for(var i=0;i<aImg.length;i++){
				var imgNum = Math.round(parseInt(aImg[i].style.top)/imgWidth*split + parseInt(aImg[i].style.left)/Math.ceil(imgWidth)) +1;
				var imgUrl = aImg[i].getAttribute('src');
				var reg=/(\d)\.jpg/g;
				var num = reg.exec(imgUrl);
				if (num[1] != imgNum) {
					return false;
				};
			}
			cbg();
		};

		//碰撞检测
		function findNearest(_this){
			var iMinDistance = 10000;
			var iIndex = 0;
			for(var j=0;j<aImg.length;j++){
				if(aImg[j]!=_this&&testDistance(_this,aImg[j])){
					var distance=getDistance(_this,aImg[j]);  
                    if(distance<iMinDistance){  
                        iMinDistance=distance;  
                        iIndex=j;  
                    }  
				}
			}
			return iIndex;
		};

		//是否符合碰撞条件
		function testDistance(obj1,obj2){
			var left1=obj1.offsetLeft,
				leftwidth1=left1+obj1.offsetWidth,  
                top1=obj1.offsetTop,
                topheight1=top1+obj1.offsetHeight;  
                left2=obj2.offsetLeft,
                leftwidth2=left2+obj2.offsetWidth,  
                top2=obj2.offsetTop,
                topheight2=top2+obj2.offsetHeight;  
                      
                if(leftwidth1<left2||topheight1<top2||left1>leftwidth2||top1>topheight2){  
                    return false;  
                }else{  
                    return true;  
                }
		};

		//计算距离
		function getDistance(obj1,obj2){
			var x=obj1.offsetLeft-obj2.offsetLeft,  
                y=obj1.offsetTop-obj2.offsetTop;  

            return Math.sqrt(x*x+y*y);
		};

		//检测是否在test内
		function testTest(eLeft,eTop){
			var testTop = $(".pt-board").get(0).getBoundingClientRect().top,
				testBottom = testTop + $(".pt-board").get(0).getBoundingClientRect().height,
				testLeft = $(".pt-board").get(0).getBoundingClientRect().left,
				testRight = testLeft + $(".pt-board").get(0).getBoundingClientRect().width;

			if(eTop<testTop||eTop>testBottom||eLeft<testLeft||eLeft>testRight){
				return false;
			}else{
				return true;
			}
		}

	};

};

exports.start = start;