/*common*/
var zepto = require('wap/zepto'),
	touch = require('wap/zepto/touch'),
	Alert = require('wap/ui/alert');

$("input").css({"margin-top":$(".banner img").css("height")});
 
var ex = require("wap/app/lark/splitImg");
var opt = {
    "file" : "abc",//上传文件控件
    "split" : 4,//切分成5*5的图
    "cbk" : function(code,arr){
    	if (code == 0) {
    		$('#test').remove();
    		var liWidth = ($(window).width()-(opt.split+1))/opt.split;
    		$('body').append($('<div id="test" style="width:100%;">'))
	    	for(var i = 0; i < 16; i++){
				$('#test').append($('<img style="width:'+liWidth+'px'+';float:left;margin-right:1px;margin-bottom:1px;">').attr({'src':arr[i],'num':i+1}))
			}
			setTimeout(function(){
				start();
			},2000);
    	}else{
    		alert('error');
    	}
    }
}
ex(opt);

function start(){
	var split = opt.split;
	var aImg = $("#test img");
	aImg.sort(function(){return Math.random()>0.5?-1:1;})
	var liWidth = ($(window).width()-(split+1))/split;
	for(var i=0;i<aImg.length;i++){
		aImg.eq(i).css("width",liWidth); //aImg.eq(i).css();
	}
	var width = $(aImg[0]).width()+1;
	var height = $(aImg[0]).height()+1;
	for(var i=0;i<aImg.length;i++){
		var top = parseInt(i/split + 1)*height;
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
			var aImg = $("#test img");
			for(var i=0;i<aImg.length;i++){
				var _l = parseInt(aImg[i].style.left)/width + 1 + 4 * (parseInt(aImg[i].style.top)/height - 1);
				if (aImg[i].getAttribute('num') != Math.round(_l)) {
					return false;
				};
			}
			// alert('时间到了')
			if (!window.alertItem) {
				window.alertItem = new Alert({
		    		content : 'OK，太棒了！'
		    	});
			};
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