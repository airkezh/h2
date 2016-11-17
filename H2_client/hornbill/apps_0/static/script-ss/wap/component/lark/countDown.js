/*common*/

/*
倒计时逻辑

参数：
wrap，必填，根据该参数可以将倒计时的显示输出在wrap元素内
times，必填，倒计时的时间总量，毫秒
interval，必填，时间间隔，毫秒
startText,选填 开始文字，数组，['Ready','Go']
endText,选填 开始文字，数组，['come on!','baby']

*/

//var $ = require('wap/zepto');

function countDown (wrap,times,interval,startText,endText){
	var t = times/interval ;
	var a = [];
	for(var i=0 ; i<t ; i++){
		times = times - interval;
		a.push(times/1000)
	}

	if( startText ){
		a = startText.concat(a)
	}

	if( endText ){
		a = a.concat(endText)
	}

	var len = t = a.length;

	wrap.text(startText[0]);

	var timer = setInterval(function(){
		if(t <= len && t > 0){
			wrap.text(a[len-t]);
			t--;
		}else{
			clearInterval(timer)
		}
	},interval);
};

return countDown;



