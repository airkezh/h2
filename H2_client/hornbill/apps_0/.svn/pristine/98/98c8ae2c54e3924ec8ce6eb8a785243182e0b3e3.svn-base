fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/orderList/list',
		'processData': function(res) {
			return {
				'orderlistInfo': res.data
			}
		},
		'box': '.wrap',
		'tmpId': 'orderListTpl',
		'page': 1,
		'firstView' : 1
	});
})
fml.define('meidian/page/orderList' , [] , function(require){});