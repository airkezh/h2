fml.define('app/closeWindow', [], function(require, exports){
	return function() {
		var browserName = navigator.appName;
		if (browserName == "Netscape") {
			window.open('', '_self', '');
			window.close();
		} else {
			if (browserName == "Microsoft Internet Explorer") {
			    window.opener = null;
			    window.open('', '_top');
				window.close();
			}
	    }
	}
});
