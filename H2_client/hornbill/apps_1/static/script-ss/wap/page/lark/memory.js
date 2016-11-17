/*common*/
var $ = require('wap/zepto');
init();
function init(){
	var arr1 = [];
	var hrr = [1,1,2,2,3,3,4,4,5,5,6,6];
	var total = 12;
	for(var i=0; i<4; i++){
		var container = $('<div class="container"></div>');
		container.appendTo($('body'));
		for(var j=0; j<3; j++){
			var random=Math.floor(Math.random()*(total));
			total --;
			var num = hrr[random];
			hrr.splice(random, 1);
				$('<div class="con"><div class="popwin"></div><img class="pic" src="http://i.meilishuo.net/css//images/yaoyaotest/'+num+'q.jpg" name='+num+'></a></div>').appendTo(container);
			    arr1.push(num);	
		}
	}
	
}
var num = -1;
var arr = [],arr2 = [];
var score = 0,clearTime,end,time=1000;;
var con = $('.con'),pic = $(".pic"),popwin = $(".popwin"),endt = $(".time"),start=$(".start");

start.on("click",function(){
	endTime();
	start.unbind("click");
	common();

});
function common(){
	for(var i=0; i<con.length; i++){ 
		(function(i){
			con.eq(i).on('touchend' , function () {
				popwin.eq(i).css("display","none");
				num = pic.eq(i).attr('name');
				arr.push(num);    //放所有的name
				arr2.push(i);	//放所有的图片的索引
				
				if(arr.length == 2){
					if(arr[0] == arr[1]){
						for(var j=0; j<2; j++){
							popwin.eq(arr2[j]).css("display","none");
						}
						arr.length = 0;
						arr2.length = 0;
						score += 10;
						$(".score").html("分数:"+score+"分");
						check();
					}
				else{
						setTimeout(function(){
							for(var k=0;k<2;k++){
								popwin.eq(arr2[k]).css("display","block");
							}
							arr.length = 0;
							arr2.length = 0;
						},300);
					}
				}
			});
		})(i);	
	};

}

	
function endTime(){
	clearTime=setInterval(function(){
		time--;
		end=time/100;
		endt.html("还剩:"+end+"秒");
		if(time<=0){
			clearInterval(clearTime);	
			alert("时间到");
			start.unbind("click");
		}
	},30)
}

function check(){
	var n = 0;
	for(n; n < con.length; n++){
		if(popwin.eq(n).css("display")!="none"){	
			n = 0;
			return false;
		}
	}
	if(n == con.length){
		alert("恭喜你,一共得了"+score+"分,还剩"+end+"秒");
		clearInterval(clearTime);
		con.unbind("touchend");


	}
};	
			
