/*common*/
var shareTmp = require('component/shareTmp'),
	$ = require('wap/zepto'),
	api = require('component/callApi');

api.read({'url':'/wx/express_info_new'},_data, function(data){
	var tmp = shareTmp('expressTmp', {'express' : data.express});
	$('.wrap').prepend(tmp);
});