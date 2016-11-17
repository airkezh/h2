fml.use(['wap/app/doota/cancel', 'wap/zepto/touch'], function() {
	var cancel = this.cancel
	$('#cancel_order').on('tap', cancel)
})
fml.define('wap/page/doota/orderDetail' , ['wap/zepto', 'wap/app/wx/testWX'] , function(require){
	var testWX = require('wap/app/wx/testWX')

	testWX(function(){
		window.location.href = '/wx/orderDetail?order_id=' + $('#order_id').val()
	})
	
});
