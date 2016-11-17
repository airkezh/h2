/*common*/
var $ = require('wap/zepto');
init();
function init(){
	for(var i = 0; i<5;i++){
		var container=$('<div class="container"></div>');
		container.appendTo($("body"));
		for (var j =0; j <5; j++) {		
			$('<div class="lights" my=0></div>').appendTo(container);
			};
	}
	$('<div class="clear">清空</div>').appendTo($("body"));

};

var lights=$(".lights");
var clear=$(".clear");
var image="http://i.meilishuo.net/css//images/yaoyaotest/aa.jpg";
/*======成功====*/
function success(){
	var win=0;
	for(var i=0;i<lights.length;i++){
		if(lights.eq(i).attr("my")==1){
			win++;
		}
	}
	if(win == 25){
		alert("恭喜你");
	}

}
clearAll();
start();
/*====开始点击======*/	
function start(){	
	for(var i=0;i<lights.length;i++){
		lights.eq(i).attr("data-value",i);
	}
	lights.on("touchend",function(){
		var value = $(this).attr("data-value"),
		 	now  = parseInt(value),
		  	up  = now-5,
		    down = now+5,
		    left  = now-1,
		    right = now+1,
	   		arr = [up,down,left,right,now],
	   		rows=5,
	   		prorow = parseInt(arr[2]/rows),
	  		nextrow = parseInt(arr[3]/rows),	
	   		row = parseInt(arr[4]/rows);
	   if( nextrow!= row){
	   		arr[3]=25;
	   }
	   if(prorow != row){
	   		arr[2]=25;

	   }	
	    for(var a = 0; a<arr.length; a++){
	    	check(arr[a]);
	   }	  
			
	});	

};
/*=====判断========*/
function check(vle){ 
	   var even= parseInt(lights.eq(vle).attr("my"));
	   judge(even,vle);
}
function judge(start,local){
	if(local<0||local>24){
		local=25;
	}
	if(start == 0){
	   	lights.eq(local).css({
	   		background : "url("+image+") 88% 50% / 200%",
	   		});
	   	    lights.eq(local).attr("my",1);
	   	}
	else{
	   	lights.eq(local).css({
	   		background : "url("+image+") 5% 50% / 200%",
	  	 	});
	   	    lights.eq(local).attr("my",0);

	   	}
	success();
	
};
/*=====清空===========*/
function clearAll(){
	clear.on("touchend",function(){
		lights.css({
   			background : "url("+image+") 5% 50% / 200%",
   		});
   	    lights.attr("my",0);
		
	});
}
