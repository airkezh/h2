fml.define('page/doota/shareact_new' , ['jquery', 'app/topBanner2000','app/doota/timedown'] , function(require, exports){
	var turn = require('app/topBanner2000');
	timedown = require('app/doota/timedown');
	var $_this = this;
    $('.time').each(
    	function($_this){
    		var _this = $(this);
    		_this.removeClass('time');
    		timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>小时','<b>%v</b>分','<b>%v</b>秒'])
    		.setHeartHum(100)
			.onTimeOver(function(){
    			if (_this.parents('.act_box').find('.will_del,.now').length === 1) {
    				_this.parents('.act_box').remove();
    			};
				_this.parents('.will_del,.now').remove();
    		});
    	})
});