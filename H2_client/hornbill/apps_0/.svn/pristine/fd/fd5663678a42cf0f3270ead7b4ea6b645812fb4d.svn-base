fml.define('m/page/doota/orderList' , ['m/zepto','m/component/callApi','m/component/shareTmp'] , function(require,exports){
	var shareTmp = require('m/component/shareTmp')
		,callApi = require('m/component/callApi');
	callApi.read({'url':'/order/list_info?status='+fml.vars._status},{},function(data){
		$('.order_area').html(shareTmp("orderList" , data));
	})
	var form = $('#orderListForm')
		, selectStatus = $('#orderStatus');
	
	selectStatus.on('change', function(){
		form.submit();
	})
	
});
