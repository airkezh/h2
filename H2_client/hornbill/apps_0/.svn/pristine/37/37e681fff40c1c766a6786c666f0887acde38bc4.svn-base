fml.use(['wap/app/doota/recv', 'wap/zepto/touch'], function() {
	var recv = this.recv;
	$('.recvOrder').on('tap', recv)
})
fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/wx/order_list',
		'processData': function(res) {
			return {
				'item': res.info,
				'totalNum': res.total_num
			}
		},
		'box': '.wrap',
		'tmpId': 'orderListTpl',
		'page': 0,
		'firstView' : 1,
		'cbk' : function(data){ 
			if(data.info.length == 0) 
				$('.more').hide();
		}
	});
})
fml.define('wap/page/wx/orderList' , [] , function(require){});
