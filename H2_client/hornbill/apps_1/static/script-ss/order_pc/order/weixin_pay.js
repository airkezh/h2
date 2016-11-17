fml.define('order_pc/order/weixin_pay' , ['jquery'] , function(require,exports){
	var $ = require('jquery')

	var order_id = $('#order_id').val()
	var tid = setInterval(function(){
		$.post('/aj/wx_pay/ispay',{order_id:order_id}, function(res, textStatus, xhr) {
			var status = res.status
			if(status==1){
				clearInterval(tid)
				if(order_id.length > 14){
					location.href = '/order'
				} else {
					location.href = '/order/detail/?order_id=' + order_id
				}
			}
		},'json');
	}, 2000)
})
