fml.define('order_pc/common/recv' , ['jquery', 'ui/confirm', 'ui/alert'] , function(require , exports){
	var $ = require('jquery');	
	var confirm = require('ui/confirm');
	var alert = require('ui/alert');
	var recv = function(){
		$('.recvOrder').on('click', function(){	
			var order_id = $(this).attr('order_id')
			var confirmPanel = new confirm({
				width : 380,
				content : '为了保证您的消费体验，请在收到商品后再确认收货。',
				discover : true
			});	
			confirmPanel.onSure(function(){
				$.post('/aj/doota/order_recv', {order_id : order_id}, function(res){
					if(res.code == '0'){
						var a = new alert({
							content: '确认收货成功！', 
							width: 370
						});		
						a.onSure(function(){
							window.location.reload();
						});
					}else{
						new alert({
							content: res.msg, 
							width: 370
						});		
					}
				}, 'json')
			})
		})
	}
	return recv 
});
