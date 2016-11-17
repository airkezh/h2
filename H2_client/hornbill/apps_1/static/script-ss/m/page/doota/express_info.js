/*common*/
var shareTmp = require('m/component/shareTmp'),
	callApi = require('m/component/callApi');

callApi.read({'url':'/order/express_info'},_data,function(data){
	var tmp = shareTmp('expressInfoTpl',{'express_info':data});
	$('.order_express').append(tmp);
});