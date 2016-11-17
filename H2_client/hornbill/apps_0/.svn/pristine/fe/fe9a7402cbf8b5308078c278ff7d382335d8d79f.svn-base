fml.define('wap/app/doota/cancel' , [] , function(){
	return function(){
		var btn = $(this)
		var data = {
			order_id : btn.attr('order_id')
		}
		var c = confirm('您确定要取消本订单吗？')
		if(c){
			$.post('/aj/doota/order_close', data, function(res){
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
