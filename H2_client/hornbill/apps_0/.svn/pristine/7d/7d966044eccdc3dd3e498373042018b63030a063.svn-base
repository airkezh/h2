fml.use(['wap/app/doota/recv', 'wap/zepto/fastclick'], function() {
	var recv = this.recv;
	$('.recvOrder').on('click', recv);
});

/*fml.use(['wap/app/fallAdd'], function() {
	this.fallAdd({
		//'url': '/aj/sq/order_list',
		'url': '/order/list_info',
		'processData': function(res) {
			return {
				'item': res.info,
				'totalNum': res.total_num
			}
		},
		'box': '.wrap',
		'tmpId': 'orderListTpl',
		'page': 0,
		'firstView': 1,
		'cbk': function(data){
			if(data.info.length == 0) 
				$('.more').hide();
		}
	});
});*/

fml.define('wap/page/sq/orderList', ['wap/app/fallAdd', 'wap/component/shareTmp', 'component/callApi'], function(require){
	var api = require('component/callApi'),
		fallAdd = require('wap/app/fallAdd'),
		shareTmp = require('wap/component/shareTmp');
	api.read({'url': '/qq/list_info?status='+fml.vars.orderStatus}, {}, function(data) {
		var tmp = shareTmp('orderInitTpl', {'order_list' : data});
		$('.wrap').append(tmp);
		fallAdd({
			//'url': '/aj/sq/order_list',
			'url': '/qq/list_info',
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
	})
	var pay_button_times = 0;
	$('.wrap').on('click', '.pay_btn', function(){
		if(pay_button_times){
			return
		}
		pay_button_times = true
		var data = {
			order_id : $(this).parents('.goods').data('oid')
			, total_price : $(this).data('price')
		}
		api.write({'url' : '/order/mob_qq_fetch'}, data, function(res){
			if(res.code == '0'){
				var appInfoSplit = res.info.appInfo
				var itemsOne = appInfoSplit.split('|')
				var itemTwo = itemsOne[0].split('#')
				itemTwo[1] = '2745697727'
				itemsOne[0] = itemTwo.join('#')
				appInfoSplit = itemsOne.join('|')
				qw.pay.tenpay({
					tokenId: res.info.tokenId
					, appInfo: appInfoSplit
					, pubAcc: 3046055438
					, pubAccHint: '您已关注QQ购物服务号，查订单、查优惠尽在QQ购物服务号。'
				}, function (data) {
					var urlPlus = ''
					if(data.data.bank_type != null && data.data.bank_type != undefined && data.data.bank_type != ''){
						urlPlus = '&bank_type=' + data.data.bank_type;
					}
					if(data.resultCode == 0){
						window.location.href = '/sq/success/?order_id=' + res.info.order_id + '&transaction_id=r' + data.data.transaction_id + urlPlus
					}else{
						// tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'payFailed'})
						// tracking.cr('sq/pay_result', {'status': '3'})
						window.location.href = '/sq/fail/?order_id=' + res.info.order_id
					}
				})
			}
			else{
				// tracking.cr('sq/pay_result', {'status': '4'})
				window.location.href = '/sq/fail/?msg=' + (res.msg || '下单失败')
			}

		}, 'json');
	})
});







