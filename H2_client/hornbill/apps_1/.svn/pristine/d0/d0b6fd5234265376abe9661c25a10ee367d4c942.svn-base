/*common*/
require('wap/app/hackWeixin')
	var timedown = require('app/doota/timedown')
	    , remain = parseInt($('.time').attr('remain'))

	if(!remain) return
	
	timedown.down('.time>span', remain, '0d-0h-0i-0s', 
		['<b>%v</b>天','<b>%v</b>小时','<b>%v</b>分','<b>%v</b>秒'])
	.onTimeOver(function(){
		if(fml.vars.is_start)
			$('.time>span').html('已结束');
		else
			window.location.reload();
	})
