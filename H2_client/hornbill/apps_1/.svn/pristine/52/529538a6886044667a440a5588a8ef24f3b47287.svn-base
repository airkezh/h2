fml.define('wap/app/wx/goWXAddress' , [] , function(require){
	return function(cbk){
		var data = {
			"scope" : "jsapi_address"
			, "signType" : "sha1" 
			, "appId" : fml.vars.wx.appid
			, "addrSign" : fml.vars.wx.addrsign 
			, "timeStamp" : fml.vars.wx.timestamp 
			, "nonceStr" : fml.vars.wx.noncestr
		};
		// alert(JSON.stringify(data))

		WeixinJSBridge.invoke('editAddress',data, function(res){
			// alert(JSON.stringify(res))
			if(!res.userName) return;

			cbk(res)
		}); 
	}
});
