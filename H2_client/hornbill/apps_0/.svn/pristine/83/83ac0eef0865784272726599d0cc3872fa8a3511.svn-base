fml.define('app/vote' , ['jquery' , 'app/checkLogin'] , function(require , exports){
	var $ = require('jquery');	
	var check = require('app/checkLogin');
	return function(voteBtn , voteStyle , unvoteStyle , cbk){
		$(voteBtn + '.' + voteStyle).bind('click' , function(){
			if(!check()) return false;

			var btn = $(this),
				num = $(this).parent().parent().find('.dr_num');
			var url = '/wbapp/haibao/vote';	
			var data = {
				user_id : btn.attr('drid'),
				limit : '1',
				tab : btn.parents('.division').attr('division')
			};
			var callback = function(){
				btn.removeClass(voteStyle).addClass(unvoteStyle).html('已投票');
				num.text(num.text() - 0 + 1);
				btn.unbind('click');
				cbk();
			};
			$.get(url , data, callback);	
		});	
	}
});
