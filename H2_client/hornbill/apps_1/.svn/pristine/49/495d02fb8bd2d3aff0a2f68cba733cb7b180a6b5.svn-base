fml.define('wap/app/wx/testWX' , [] , function(){
	return function(onBridgeReady){
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
});
