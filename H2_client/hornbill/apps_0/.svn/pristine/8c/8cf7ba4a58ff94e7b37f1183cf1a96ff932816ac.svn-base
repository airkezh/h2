fml.define('wap/app/doota/cancel' , [] , function(){
	return function(){
		var btn = $(this)
			, data = {}
			, url = ''
			, c = confirm('您确定要取消本订单吗？')

		if(btn.data('type') == 'total_order'){
			url = '/aj/doota/order/close_multi'
			data.total_id = btn.attr('order_id')
		} else {
			url = '/aj/doota/order/order_close'
			data.order_id = btn.attr('order_id')
		}

		if(c){
			$.post(url, data, function(res){
				if(res.code == 0){
					alert('订单取消成功！')
					window.location.reload();
				}else{
					alert(res.message)
				}
			}, 'json')
		}

	}
});
