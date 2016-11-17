fml.define('wap/app/wx/goWXPay' , [] , function(require){
	return function(res, cbk){
		var data = res.form
			, order_id = res.order_id

		if(data == '') { //0元购是不需要支付
			window.location.href = '/'+ Meilishuo.config.controller +'/success/?order_id=' + order_id
			return;
		}

		WeixinJSBridge.invoke('getBrandWCPayRequest',data, function(res){
			var url = ''
			if(data.activity && data.activity == 'baoyang') {
				if(res.err_msg != "get_brand_wcpay_request:ok"){
					cbk();
					alert('支付失败，请再次支付')
					return;
				} else {
					url = '/wx/paySuccess?' + data.nurtureid +'&order_id=' + order_id
					window.location.href = url
					return;
				}
			}
			if(res.err_msg != "get_brand_wcpay_request:ok"){
				if(Meilishuo.config.controller == 'md') return;
				url = '/'+ Meilishuo.config.controller +'/fail/?order_id=' + order_id
			} else {
				url = '/'+ Meilishuo.config.controller +'/success/?order_id=' + order_id
			}

			window.location.href = url
		});
	}

});
