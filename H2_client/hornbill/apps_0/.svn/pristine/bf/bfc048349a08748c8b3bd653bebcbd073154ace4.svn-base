fml.define('page/huodong/sale_timedown' , ['jquery' , 'app/doota/timedown'] , function(require, exports){
	var timedown = require('app/doota/timedown');
	$('.time').each(function(){
		var _this = $(this);
		_this.removeClass('time');
		timedown.down(this, _this.attr('remain') ,'0d-0h-0i',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分'])
		.onTimeOver(function(){
			window.location.reload();	
		});
	});

});
