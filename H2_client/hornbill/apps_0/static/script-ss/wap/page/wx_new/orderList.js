// fml.use(['wap/app/doota/recv', 'wap/zepto/fastclick'], function() {
// 	var recv = this.recv;
// 	$('.recvOrder').on('click', recv);
// });

fml.define('wap/page/wx_new/orderList', ['wap/app/fallAdd', 'wap/component/shareTmp', 'component/callApi'], function(require){
	var api = require('component/callApi'),
		fallAdd = require('wap/app/fallAdd'),
		shareTmp = require('wap/component/shareTmp');

	api.read({'url': '/wx/list_info'}, {'status' : fml.vars.orderStatus || 0}, function(data) {
		var tmp = shareTmp('orderInitTpl', {'order_list' : data});
		$('.wrap-list').append(tmp);

		fallAdd({
			//'url': '/aj/sq/order_list',
			'url': '/wx/list_info?status=' + (fml.vars.orderStatus || 0),
			'processData': function(res) {
				return {
					'item': res.info,
					'totalNum': res.total_num
				}
			},
			'api_read' : 1,
			'box': '.wrap',
			'tmpId': 'orderListTpl',
			'page': 0,
			'api_read': true,
			'firstView': 1,
			'cbk': function(data){
				if (data.info.length == 0) {
					$('.more').hide();
				}
			}
		});
	});
});
