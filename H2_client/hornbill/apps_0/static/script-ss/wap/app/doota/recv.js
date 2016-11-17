fml.define('wap/app/doota/recv', ['component/callApi'], function(require, exports){
	var api = require('component/callApi');

	var recv = function(){
		var btn = $(this),
			data = {
				order_id : btn.attr('order_id'),
				mid : $('.goods_wrap').attr('mid')
			},
			c = confirm('为了保证您的消费体验，请在收到商品后再确认收货。');

		if (c) {
			api.read({'url': '/order/recv_confirm'}, data, function(res){
			//$.post('/aj/doota/order_recv', data, function(res){
				if (res.code == '0') {
					alert('确认收货成功！')
					window.location.reload();
				} else {
					alert(res.info.msg)
				}
			//}, 'json');
			});
		}
	}

	return recv;
});
