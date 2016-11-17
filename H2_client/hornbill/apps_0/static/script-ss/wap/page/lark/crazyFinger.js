/*common*/
var $=require('wap/zepto');
var i=1, state=0,con=$("#con"),time=1000,best=$("#best"),ten=$("#time"),again=$("#again"),tet=$(".tet"),sum=0,clearTime;
	var max=0;
	again.click(function(){
		time = 1000;i=1;
		again.hide();
		ten.show();
		start();
		ten.html("10:00秒");
		console.log(sum);
	});
function timer(){
		time--;
		var end=time/100;
		ten.html(end+"秒");
		if(time<=0){
			clearInterval(clearTime);
			state=0;
			con.unbind("touchend");
			again.show();
			ten.hide();	
			if(max<sum){
				max=sum;
				best.html("最好的成绩是："+max+"次");
			}
		}
};
	start();	
function start(){
		con.on('touchend',function(){
		if(!state){      //true;
			state=1;
			clearTime=setInterval(timer,10);
			}
		});
		con.on('touchend',function(){
			if(state){
				sum=i++;
				tet.html(sum+"次");
			}	
		});
}

