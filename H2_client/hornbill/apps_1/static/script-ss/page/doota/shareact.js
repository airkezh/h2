fml.use(['app/doota/timedown','jquery'] , function(){
    var $ = this.jquery,
    	$_this = this;
    this.timedown.down('#alt', $('#alt').attr('alt')).onTimeOver(function(){
    	window.location.reload();
    });
    window.timedown = this.timedown;
    $('.alt').each(
    	function($_this){
    		var _this = $(this);
    		timedown.down(this, _this.attr('alt')).onTimeOver(function(){
    			_this.parents('.s_countdown').html('活动已结束');
    		});
    	})
    $('.alt1').each(
    	function($_this){
    		var _this = $(this);
    		timedown.down(this, _this.attr('alt')).onTimeOver(function(){
    			var act = _this.parents('.act_box');
    			_this.parents('.saleCon').remove();
    			if(!_this.parents('.saleBox').find('.saleCon').length) act.remove();
    		});
    	})
});

fml.use('app/adPoster', function(){
		this.carousel('.act_banner',{'width':948,'height':338,'gap':6000,'type':2});
});

fml.define('page/doota/shareact' , ['jquery'] , function(){
	var _this = $('.hotlink'),
		_div = _this.find('div'),
		_len = _div.length,
		_fun = function(i){
			return function(){
				_div.eq(i).addClass('none')
				i != _len - 1 ?  _div.eq(i + 1).removeClass('none') && i++ : _div.eq(0).removeClass('none') && (i = 0);
				setTimeout(function(){
					_fun(i)();
				},5000);
			}
		};
		_fun(0)();
});
