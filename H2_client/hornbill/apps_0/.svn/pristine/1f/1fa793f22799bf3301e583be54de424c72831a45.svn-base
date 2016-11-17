fml.define('page/huodong/mainpro' , ['app/doota/timedown','jquery','ui/alert'] , function(require, exports){
	var	$ = require('jquery');
	var timedown = require('app/doota/timedown');
	var $_this = this;
	// $(window).scroll(function () {
	$(window).scroll(function(event) {
		var scoll = $(document).scrollTop();
		if (scoll > 300) {
			$('.rignav').show();
		}else{
			$('.rignav').hide();
		}
	});
	$('.unit').on('mouseenter',function(){
		$(this).find('.cover').show()
	}).on('mouseleave',function(){
		$(this).find('.cover').hide();
	})
    $('.time').each(function($_this){
		var _this = $(this);
		_this.removeClass('time');
		timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
		.onTimeOver(function(){
			if (_this.parents('.act_box').find('.will_del,.now').length === 1) {
				_this.parents('.act_box').remove();
			};
			_this.parents('.will_del,.now').remove();
		});
	})
	// alert(scoll);
});
