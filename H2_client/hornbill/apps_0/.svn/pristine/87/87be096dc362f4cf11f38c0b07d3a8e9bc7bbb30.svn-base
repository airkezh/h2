fml.define('wap/page/sq/success' , [/*'wap/zepto/touch',*/ 'wap/app/tracking','wap/component/shareTmp', 'component/callApi'] , function(require){
	var tracking = require('wap/app/tracking')
	var shareTmp = require('wap/component/shareTmp')
	var api = require('component/callApi')
	// var urlString = 'http://open.show.qq.com/cgi-bin/sq_act_qualification_query?cmd=1&act_id=meilishuo';
	// urlString += ('&transaction_id=' + fml.vars.transaction_id.replace('r', ''));
	api.read({'url':'/order/detail'},{order_id:fml.vars.order_id}, function(data){
		var tmp = shareTmp('goodsInfoTmp', {'goods' : data.info.goods});
		$('#textAreaList').append(tmp);
	});

	// $.getJSON(urlString + '&callback=?', function(data){
	// 	if(data.code == 0 && data.data.retcode == 0 && fml.vars.fir_bind == 1){
	// 		$('.firstSelect').removeClass('firBind');
	// 		tracking.cr('sq/pay_result', {'status': '1'})
	// 	}else{
	// 		tracking.cr('sq/pay_result', {'status': '2'})
	// 	}
	// });
})
