fml.define('wap/page/sq/sync_addr', [], function(require){
	function $setCookie(name, value, expires, path, domain, secure) {
	    //写入COOKIES
	    var exp = new Date()
	    	, expires = arguments[2] || null
	    	, path = arguments[3] || "/"
	    	, domain = arguments[4] || null
	    	, secure = arguments[5] || false;
	    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
	    document.cookie = name + '=' + escape(value) + ( expires ? ';   expires=' + exp.toGMTString() : '') + ( path ? ';   path=' + path : '') + ( domain ? '; domain=' + domain : '') + ( secure ? '; secure' : '');
	}

	$setCookie('mqaddr', '0', 999999, "/", "meilishuo.com");

	var onmessage = function(e){
		if (e.origin == 'http://youxi.vip.qq.com'){
			$setCookie('mqaddr', '1', 999999, "/", "meilishuo.com");
			qw.ui.popBack();
		}
	};

	if (typeof window.addEventListener != 'undefined') {
		window.addEventListener('message', onmessage, false);
	} else if (typeof window.attachEvent != 'undefined') {
		window.attachEvent('onmessage', onmessage);
	}
})