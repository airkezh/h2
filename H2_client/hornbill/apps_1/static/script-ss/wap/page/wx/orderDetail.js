fml.use(['wap/app/doota/recv', 'wap/zepto/touch'], function() {
	var recv = this.recv
	$('.recvOrder').on('tap', recv)
})
fml.use(['wap/app/doota/cancel', 'wap/zepto/touch'], function() {
	var cancel = this.cancel
	$('#cancel_order').on('tap', cancel)
})
fml.use(['wap/ui/alert', 'wap/zepto/touch'], function() {
	var Alert = this.alert
	$('.no_weixin_goods').on('tap', function(){
		var a =  new Alert({
			content : '此商品不是微信商城商品，若需查询详情，请到www.meilishuo.com或者美丽说客户端查询。'
		})
	})
})
fml.use(['wap/app/wx/goWXPay', 'wap/zepto/touch'], function() {
	var goWXPay = this.goWXPay
	$('#pay_now').on('tap', function(){
		var btn = $(this)
		var data = {
			order_id : btn.attr('order_id')
			, total_price : btn.attr('total_price')
		}
		$.post('/aj/wx/wxpay', data, function(res){
			// alert(JSON.stringify(data))
			// alert(JSON.stringify(res))

			if(res.code == '0')
				goWXPay(res)
				
			else
				window.location.href = '/wx/fail/?&msg=' + encodeURIComponent(res.msg) + '&tid=' + data.twitter_id
			
		}, 'json');

	});
});

fml.define('wap/page/wx/orderDetail' , [] , function(require){});
