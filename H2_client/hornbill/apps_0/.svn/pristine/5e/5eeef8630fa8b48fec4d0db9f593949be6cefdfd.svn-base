/*common*/
var zepto = require('wap/zepto'),
	touch = require('wap/zepto/touch'),
	Alert = require('wap/ui/alert');



var imgBase64 = require('wap/page/activity/designer-pt-img')
function randomN(Min,Max){
	return (Min + Math.round(Math.random() * (Max - Min)));
};
var ex = require("wap/app/lark/splitImg2");
var opt = {
    file : imgBase64[randomN(0,7)],//
    split : 3,//切分成4*4的图
    cbk : function(code,arr){
    	if (code == 0) {
    		$('#game_box').remove();
    		var liWidth = (windowWidth*0.7)/opt.split;
    		$('#game').append($('<div id="game_box" class="game_box" >'));

    		var gameBoxW = windowWidth * 0.71 ;
			$('#game_box').css({'width':gameBoxW,'height':gameBoxW});

			var  split = this.split;
	    	for(var i = 0; i < split*split; i++){
				$('#game_box').append($('<img style="width:'+liWidth+'px'+';float:left;margin-right:1px;margin-bottom:1px;">').attr({'src':arr[i],'num':i+1}))
			}
			setTimeout(function(){
				start();

			},4000);

			
			countDown();


    	}else{
    		alert('error');
    	}
    }
}

var gamePlaying = 0;

function startGame(){
	gamePlaying = 1 ;
	opt.file = imgBase64[randomN(0,7)];
	ex(opt);
};
	


function countDown(){
	$('.time_box').html(countTime);
	$("#countDown").show().html('Ready').animate({'font-size':'50px'},500)
	
	setTimeout(function(){
		$("#countDown").html('Go').css({'font-size':'60px'}).animate({'font-size':'50px'},500)
	},500)

	setTimeout(function(){
		$("#countDown").html('3')
	},1000)

	setTimeout(function(){
		$("#countDown").html('2')
	},2000)
	setTimeout(function(){
		$("#countDown").html('1')
	},3000)
	setTimeout(function(){
		$("#countDown").hide();
	},4000)
};

var countTime = 20;
var countTimeInt;

function start(){

	function countTimeFn(){
		countTime = 20 ;
		
		countTimeInt = setInterval(function() {
			
			$('.time_box').html(countTime);
			countTime--;
			
			if(countTime < 1){
				
				$('#dialogAlert0').show();
				$('#mypopbox').show();
				gamePlaying = 0;
				clearInterval(countTimeInt);
				
			}
		}, 1000)
	};
	countTimeFn();

	var split = opt.split;
	var aImg = $("#game_box img");
	aImg.sort(function(){return Math.random()>0.5?-1:1;})
	var liWidth = (windowWidth*0.7)/split;
	for(var i=0;i<aImg.length;i++){
		aImg.eq(i).css("width",liWidth); //aImg.eq(i).css();
	}
	var width = $(aImg[0]).width()+1;
	var height = $(aImg[0]).height()+1;
	for(var i=0;i<aImg.length;i++){
		var top = parseInt(i/split)*height;
		var left = parseInt(i%split)*width;
		aImg.eq(i).css({"position":"absolute","left":left,"top":top});
	}
	for(var i=0;i<aImg.length;i++){ 
		var zIndex = 0;
		var flag = 0;
		(function(i){
			aImg[i].addEventListener('touchstart' , function (e) {
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
				flag = 1;
				var _this = this;
				var e = e || event;
				var l = e.targetTouches[0].pageX - disX;
				var t = e.targetTouches[0].pageY - disY;
				if (l<0) {
					l = 0;
				} else if (l>document.documentElement.clientWidth - aImg[i].offsetWidth) {
					l = document.documentElement.clientWidth - aImg[i].offsetWidth;
				}
				if (t<0) {
					t = 0;
				}else if (t>document.documentElement.clientHeight - aImg[i].offsetHeight) {
					t = document.documentElement.clientHeight - aImg[i].offsetHeight;
				}
				aImg[i].style.left = l +'px';
				aImg[i].style.top = t +'px';

				// 调用碰撞检测
				iMinIndex = findNearest(_this);
				endX = aImg[iMinIndex].offsetLeft;
				endY = aImg[iMinIndex].offsetTop;
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
				var _this = this;
				if(flag ==1){
					aImg[iMinIndex].style.left = position.left + 'px';
					aImg[iMinIndex].style.top = position.top + 'px';
					_this.style.left = endX + 'px';
					_this.style.top = endY + 'px';
					
					success();
				}
			});
		})(i);
		
		//判断位置是否正确
		function success(){
			var aImg = $("#game_box img");
			for(var i=0;i<aImg.length;i++){
				var _l = parseInt(aImg[i].style.left)/width + 1 +  split * (parseInt(aImg[i].style.top)/height );
				if (aImg[i].getAttribute('num') != Math.round(_l)) {
					return false;
				};
			}
			
			
			if(countTime>0 ){
				
				var countPre = countTime*100 / 20 ;
				

				$('.js_countTime').html(20-countTime+'s');
				$('.js_countPre').html( countPre + '%' );    

				clearInterval(countTimeInt);
				
				$('#dialogAlert1').show();
				$('#mypopbox').show();
				gamePlaying = 0 ;
				lottery();
				
				return true;

			}else{
				
				$('#dialogAlert0').show();
				$('#mypopbox').show();
				gamePlaying = 0 ;
				clearInterval(countTimeInt);

				return false;
			}

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

	};

};

var options = {
	w : 300,  //拼图盒子的宽度
	h : 300,  //拼图盒子的高度
	imgBase64 : require('wap/page/activity/designer-pt-img') 
}

function into(opts){
	$.extend()
}

function start(){

}

exports.into = into;
exports.start = start;



