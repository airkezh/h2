fml.define('app/googleAds', [], function(require, exports){
	googletag = typeof googletag == 'undefined' ? {} : googletag;
	googletag.cmd = googletag.cmd || [];
	(function() {
		var gads = document.createElement('script');
		gads.async = true;
		gads.type = 'text/javascript';
		var useSSL = 'https:' == document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);
	})();

	function customized(url, width, height, obj) {
		googletag.cmd.push(function() {
			googletag.defineSlot(url, [width, height], obj).addService(googletag.pubads());
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
		});
		googletag.cmd.push(function() { googletag.display(obj); });
	}
	exports.customized = customized;
});