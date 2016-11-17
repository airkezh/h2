fml.define('component/wxstorage',[], function(require ,exports){
	var Cookie = {
		getCookie : function(key) {
			return (function(){
				var arr = window.document.cookie.match('(?:^|;)\\s*' + key.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
				return arr ? decodeURIComponent(arr[1]) : undefined;
			})();
		},
		setCookie : function(key, value, opts) {
			var line = key + '=' + encodeURIComponent(value); 
			return document.cookie = line;
		},
	};

	return {
		getCookie : function(key) {
			return Cookie.getCookie(key);
		},
		setCookie : function(key, value, opts) {
			return Cookie.setCookie(key, value, opts);
		}
	};
})