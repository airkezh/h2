Bridge.prototype.cookie = (function(){
//for cookie
//args:opts---domain,path,duration,secure
//eg: setCookie('key','value',{path:'/', duration:'100'})
var Cookie = {
	cookieArr : {},
	options : {'domain':'.meilishuo.com', 'path':'/'},
	setCookie : function(key, value, opts) {
		opts = opts || {};
		var line = key + '=' + encodeURIComponent(value); 
		opts.domain || (opts.domain = this.options.domain);
		opts.path || (opts.path = this.options.path);
		line += '; domain=' + opts.domain;
		if (opts.path) {
			line += '; path=' + opts.path;
		}
		if (opts.duration) {
			var expires = new Date;
			expires.setTime(expires.getTime() + opts.duration * 1000);
			line += '; expires=' + expires.toGMTString();
		}
		if (opts.secure) {
			line += '; secure';
		}
		return document.cookie = line + ';';
	},
	getCookie : function(key) {
		this.cookieArr[key] = this.cookieArr[key] || (function(){
			var arr = window.document.cookie.match('(?:^|;)\\s*' + key.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
			return arr ? decodeURIComponent(arr[1]) : undefined;
		})();
		return this.cookieArr[key];
	},
	removeCookie : function(key) {
		return this.setCookie(key, '', {duration: -1});
	}
};

return {
	set : function(key, value, opts) {
		return Cookie.setCookie(key, value, opts);
	},
	get : function(key) {
		return Cookie.getCookie(key);
	},
	remove : function(key) {
		return Cookie.removeCookie(key);
	}
};
})();

