fml.define('m/app/doota/cancel' , ['m/component/callApi'] , function(require , exports){
	var callApi = require('m/component/callApi')
	return function(){
		var btn = $(this)
		var data = {
			order_id : btn.attr('order_id')
		}
		var c = confirm('您确定要取消本订单吗？')
		if(c){
			callApi.write({'url':'/order/close'},data, function(res){
				if(res.code == 0){
					alert('订单取消成功！')
					window.location.reload();
				}else{
					alert(res.message)
				}
			})
		}

	}
	
});
