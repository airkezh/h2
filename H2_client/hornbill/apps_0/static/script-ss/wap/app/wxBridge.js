fml.define('wap/app/wxBridge' , ['component/urlHandle'] , function(require , exports){
	var urlHandle = require('component/urlHandle')
		, isWXBrowser = false

	var init = function(){
		if (window.WeixinJSBridge) {
			onBridgeReady()
		} else {
			if (document.addEventListener) {
				document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
				document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
			}
		}
	}

	var onBridgeReady = function(){}

	var WXMall = {}

	WXMall.invoke = function(fn, data, cbk) {
		this[fn](fn, data, cbk);
	};

	WXMall.getAddress = function(fn, data, cbk) {
		var data = {
			"scope" : "jsapi_address", 
			"signType" : "sha1", 
			"appId" : fml.vars.wx.appid,
			"addrSign" : fml.vars.wx.addrsign, 
			"timeStamp" : fml.vars.wx.timestamp, 
			"nonceStr" : fml.vars.wx.noncestr
		};

		WeixinJSBridge.invoke('editAddress',data, function(res){
			//若 res 中所带的返回值不为空,则表示用户选择该返回值作为收货地址。
			//否则若返回空,则表示用户取消了这一次编辑收货地址。
			//alert(JSON.stringify(res)); 
			cbk(res);
		}); 
	}

	WXMall.getPay = function(fn, data, cbk) {
		alert("invoke getPay");
		cbk();
	}

	init()
	exports.WXMall = WXMall;
});


