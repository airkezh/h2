fml.use(['m/app/doota/cancel', 'm/zepto/touch'], function() {
	var cancel = this.cancel;
	$('#cancel_order').on('tap', cancel);
})
fml.define('m/page/doota/orderDetail' , ['m/zepto', 'm/app/wx/testWX','m/component/callApi','m/component/shareTmp'] , function(require){
	var testWX = require('m/app/wx/testWX'),
		shareTmp = require('m/component/shareTmp'),
		callApi = require('m/component/callApi');

	callApi.read({'url':'/order/detail?order_id='+order_id},function(data){
		//错误跳转，临时方案，待优化
		try{
			data.info.order.order_id
		}catch(e){
			window.location.href = 'http://m.meilishuo.com/appWelcome';
		}
		var tmp = shareTmp('orderDetailTpl',{'order_info':data});
		$('.order_area').append(tmp);
	});

	testWX(function(){
		window.location.href = '/wx/orderDetail?order_id=' + $('#order_id').val()
	})
	
});
