(function(window, undefined){

	if (window.WeixinJSBridge) {
		//alert(window.WeixinJSBridge)
		onBridgeReady();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
			document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
		}
	}

	function onBridgeReady(){
		initShareBtn()
	}

	function initShareBtn(){
		if(fml.vars.share == 0) 
			WeixinJSBridge.invoke("hideOptionMenu")
		else
			WeixinJSBridge.invoke("showOptionMenu")
	}

})(this);