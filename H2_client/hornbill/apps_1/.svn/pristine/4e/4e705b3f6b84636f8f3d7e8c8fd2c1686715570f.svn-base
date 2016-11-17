/*common*/
var shareTmp = require('component/shareTmp'),
	api = require('component/callApi');

api.read({'url':'/order/express_info_new'},_data, function(data){
	var tmp = shareTmp('expressTmp', {'express' : data.express});
	// console.log(data.express);
	$('.wrap').prepend(tmp);
});