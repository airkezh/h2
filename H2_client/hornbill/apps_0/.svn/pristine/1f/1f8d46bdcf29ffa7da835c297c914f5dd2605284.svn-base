function cookie(){
	return this;
}
const ALLOWED_DOMAIN = [/^([\w\-]*\.+)*meilishuo.com/,/^([\w\-]*\.+)*meilizhizao.com/];
var url = require('url');

var controlFns = {
	'distribute' : function(cookie){
		var g = this.req.__get,
			c = g.c || '/welcome/';
			// c = c.toLowerCase();
		if(c.indexOf('http://') !== -1 || c.indexOf('https://') !== -1){
			var _c = url.parse(c);
			if(ALLOWED_DOMAIN.every(function(reg){return _c.hostname.match(reg) === null})){
				return this.redirectTo('/welcome/');
			};
		}
		this.render('cookie/distribute.html',{
			c : encodeURIComponent(c),
			is_delete: Number(!!this.req.__get.is_delete),
			pages : config.site.COOKIE_DISTRIBUTE_URLS
		});

	},
	'distribute_failed': function(){
		var pages = this.req.__get.pages;
		pages.forEach(function(p){
			console.warn('cookie distribute timeout, url:'+p);
		});
	}
};

exports.__create = controller.__create(cookie, controlFns);
