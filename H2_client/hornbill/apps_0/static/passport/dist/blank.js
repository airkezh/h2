;(function(){'use strict';
// Source: _transTpl/bridge.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.bridge = Bridge

function Bridge(opts){
	this.bridge_domain = 'meilishuo.com'
}

Bridge.prototype.send = function(params){
	var mSelf = this
	var url = window.location.href
	params = this.getParams(params || url)

	var action = params.action ||''
		, action_type = action.split('|')[0]

	switch(action_type){
		case 'ajax' :
			var cbk = window.top.MLSPassport.callbacks[params.action]
			cbk && cbk(params.res)

			break;

		case 'cookie' :
			mSelf.setCookie(params.cookie)
			
			break;

		default:
			break;
	}

	return this;
}

Bridge.prototype.setDomain = function(){
	document.domain = this.bridge_domain
	return this;
}

Bridge.prototype.setCookie = function(cookie){
	this.cookie.set(cookie.key, cookie.value, {
		domain:cookie.domain
		,duration:cookie.expire
	})
}


// Source: _transTpl/cookie.js
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


// Source: _transTpl/params.js
Bridge.prototype.getParams = function(url){
	if(url == '') return '';
	var options = {};
	var name,value,i;
	var paramsStart = url.indexOf('?')+1;
	var paramsEnd = url.indexOf('#')==-1?url.length:url.indexOf('#');
	var str = url.slice(paramsStart, paramsEnd);
	//var str = url.substr(params + 1);
	var arrtmp = str.split('&');
	for(var i=0 , len = arrtmp.length;i < len;i++){
		var paramCount = arrtmp[i].indexOf('=');
		if(paramCount > 0){
			name = arrtmp[i].substring(0 , paramCount);
			value = arrtmp[i].substr(paramCount + 1);
			try{
			if (value.indexOf('+') > -1) value= value.replace(/\+/g,' ')
			options[name] = decodeURIComponent(value);
			}catch(exp){}
		}
	}
	delete options['frm'];
	return options;
}

})();