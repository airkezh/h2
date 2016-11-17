fml.define('page/huodong/kc_act', ['jquery'], function(){
	var likes = $('.likes');
	likes.click(function() {
		var _this = $(this),
			_b = _this.find('b'),
			data = {stid : _this.attr('s_uid')};
		$.post('/aw/twitter/like',data,function(msg){
			msg = $.parseJSON(msg);
			if (msg.data) {
				_b.html('&nbsp;已喜欢');
			}else{
				_b.html('<i class="lm_love2">&nbsp;</i>&nbsp;喜欢');
			}
		});
	});
});