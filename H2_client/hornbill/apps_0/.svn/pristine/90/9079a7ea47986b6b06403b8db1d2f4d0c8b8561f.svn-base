fml.define('md/page/success' , ['wap/zepto/touch','component/wxstorage'], function(require,exports){
	var storage = require('component/wxstorage')
	$('.scs_btn_wrap')
		.on('tap', function(){
			if(storage.getCookie('mls_in_app') == 1){
				location.href = "/md/md_chan";
			}else if(window.WeixinJSBridge){
				WeixinJSBridge.invoke("closeWindow");
			}
		});
});
