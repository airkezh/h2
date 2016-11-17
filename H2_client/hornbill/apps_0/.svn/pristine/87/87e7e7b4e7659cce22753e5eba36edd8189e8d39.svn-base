fml.define('app/attention' , ['jquery','app/checkLogin'] , function(require , exports){
	var $ = require('jquery')
	//auto nav
	var fans = $('.shop_follow'),
		checkLogin = require('app/checkLogin');
	fans.on('click','.no_att',function(event) {
		if (!checkLogin()) return
		//var _this = $('.no_att');
		var _this = $(this);
		$.get('/aj/doota/shop_save?shop_id=' + fml.vars.shop_id, function(){
			var _num = _this.html('已关注').removeClass('no_att').addClass('att').parents('.shop_follow').find('.j_fans');
			if(_num) _num.html(parseInt(_num.html()) + 1 + '粉丝');
		});
	}).on('mouseover','.att',function() {
		$(this).html('取消关注');
	}).on('mouseout','.att',function() {
		$(this).html('已关注');
	}).on('click','.att',function(event) {
		if (!checkLogin()) return
		var _this = $(this);
		$.get('/aj/doota/shop_cancel?shop_id=' + fml.vars.shop_id, function(){
			var _num = _this.html('<span>+</span>关注本店').removeClass('att').addClass('no_att').parents('.shop_follow').find('.j_fans');
			if(_num) _num.html(parseInt(_num.html()) - 1 + '粉丝')
		});
	});
});
