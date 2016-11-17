fml.define('wap/app/wx/goWXShare' , [] , function(require){
	return function(opts){ 
		var WJ = WeixinJSBridge;
		// 发送给好友
		WJ.on('menu:share:appmessage', function() {
			WJ.invoke('sendAppMessage', opts, function(res) {
				// _report('sendAppMessage', res.err_msg);
			});
		});
		// 发送到朋友圈
		WJ.on('menu:share:timeline', function() {
			WJ.invoke('shareTimeline', opts, function(res) {
				// _report('shareTimeline', res.err_msg);
			});
		});

		// 发送到微博
		WJ.on('menu:share:weibo', function() {
			WJ.invoke('shareWeibo', opts, function(res) {
				// _report('shareWeibo', res.err_msg);
			});
		});
	}
});
