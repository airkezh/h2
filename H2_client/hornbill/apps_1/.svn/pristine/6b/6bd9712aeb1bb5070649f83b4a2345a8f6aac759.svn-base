fml.define('order_pc/common/close', ['jquery', 'ui/confirm', 'ui/alert'], function(require, exports) {
	var $ = require('jquery');
	var confirm = require('ui/confirm');
	var alert = require('ui/alert');
	var close = function() {
		$('.closeOrder').on('click', function() {
			var order_id = $(this).attr('order_id')
			var confirmPanel = new confirm({
				width: 380,
				content: '这么好的东东，您确定不要了么？',
				discover: true,
				confirmTxt: '不要了'
			});
			confirmPanel.onSure(function() {
				$.post('/aj/doota/order_close', {
					order_id: order_id
				}, function(res) {
					if (res.code == '0') {
						new alert({
							content: '取消订单成功！',
							width: 370,
							onClose: function() {
								window.location.reload();
							}
						});
					} else {
						new alert({
							content: res.msg,
							width: 370
						});
					}
				}, 'json')
			})
		})
	}
	return close
});
