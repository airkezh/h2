fml.define('page/huodong/loreal' , ['jquery', 'app/doota/timedown'] , function(require, exports){
	timedown = require('app/doota/timedown');
	var $_this = this;
    $('.time').each(
    	function($_this){
    		var _this = $(this);
    		_this.removeClass('time');
    		timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s-e',['<b>%v</b>天','<b>%v</b>小时','<b>%v</b>分','<b>%v</b>秒','<b>%v</b>'])
    		.setHeartHum(100)
		.onTimeOver(function(){
			if($('#started').length){
				$('.countdown').text('活动已结束');
				$('.loreal_link a').remove();
			}else{
				location.reload();
			}
    		});
    	})
});
