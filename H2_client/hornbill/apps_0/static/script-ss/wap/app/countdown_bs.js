fml.define('wap/app/countdown_bs' , ['wap/zepto', 'wap/app/doota/timedown'] , function(require , exports){
	window.timedown = require('timedown');
	timedown.down($('.timeStamp'), $('.timeStamp').attr('time'), '0d-0h-0i-0s-e',['%v天','%v:','%v:','%v.','%v']).onTimeOver(function(){
		location.reload();
	}).setHeartHum(100);
});
