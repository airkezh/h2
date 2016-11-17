fml.define('app/deleteMsg' , ['jquery' , 'ui/confirm'] , function(require , exports){
	var $ = require('jquery');	
	var Confirm = require('ui/confirm');
	return function(){
		$('.deleteMsg').bind('click' , function(){
			var self = $(this);
			var closest = self.closest('li');
			var handle = new Confirm({
				transparent : true,
				content : '确认删除此私信?',
				width : 370
			});	
			
			handle.onSure(function(){
				var url = '/aj/msg/del_msg';
				var data = {
					message_id : closest.attr('msg_id'),
					user_id : closest.attr('user_id')
				};
				if(closest.attr('type') == "1") data['type'] = 1;
				var callback = function(){
					closest.remove();		
				}
				$.post(url , data , callback , 'json');
			});
		});	
	}
});
