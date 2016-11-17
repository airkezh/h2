fml.define('component/callApi' , ['wap/app/tracking'] , function(require , exports){

	var tracking = require('wap/app/tracking');

	var head = document.head  || document.getElementsByTagName('head')[0] || document.documentElement;
	var timeout = 30000;
	var index = 0;

	var toString = Object.prototype.toString;

	var isObject = function(obj){
		return toString.call(obj) === '[object Object]';
	}

	var isArray = Array.isArray || function(obj){
		return toString.call(obj) === '[object Array]';
	}

	function genId(){
		return (+new Date).toString(36) + '_' + ++index;
	}

	function loadJS(src,cbk){
	    var script = document.createElement('script')
	    script.type = 'text/javascript'
	    script.src =  src;
	    script.async = true;
		script.onerror = script.onload = script.onreadystatechange = function() {
	        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
	            cbk && cbk();
	            script.onerror = script.onload = script.onreadystatechange = null;
	            head.removeChild(script);
	        }
	    };
	    head.insertBefore(script, head.firstChild);
	}

	function getURL(opt ,cbk , isPost){
		var host = opt.host || Meilishuo.config.apiHost[opt.backend || 'default'];
		var url = opt.url;
		var cbkName = genId();
		url += url.indexOf('?') > -1 ? '&' : '?'
		url += '__callback=' + encodeURIComponent(cbkName)
		if (isPost) url += '&backname=data&backuri=' + encodeURIComponent(location.protocol + '//'+ location.host + opt.proxyPath  )
		url = host + url;

		window[cbkName] = function(backData,err){
			if(err && err.reason == 'timeout'){
				tracking.cr('timeout',{'api':url});
			}else{
				clearTimeout(tId);
				if(!opt.dataType || opt.dataType == 'json'){
					if(typeof backData == 'string'){
						backData = (new Function("return " + backData))();
					}
				}
				cbk(backData);
				window[cbkName] = null;
			}
		}

		var tId = setTimeout(function(){
			window[cbkName](null, {status:'error', reason:'timeout'});
		}, opt.timeout || timeout);

		return url
	}

	function serializeData(data,key,ret){
		if(arguments.length > 1){
			if(isArray(data)){
				for (var i = 0,len = data.length ; i < len; i++) {
					serializeData(data[i] , key + '['+i+']' , ret);
				};
			}else if(isObject(data)){
				for (var i in data) {
					serializeData(data[i] , key + '['+i+']' , ret);
				};
			}else{
				ret.push( key + '=' + encodeURIComponent(data) )
			}
			return ret;
		}
		var sRet = [];
		if (data) {
			for (var k in data) {
				serializeData(data[k],k,sRet);
			}
		}
		return sRet.join('&') || '';
	}


	exports.read = function(opt ,data , cbk){
		if(typeof data == 'function'){
			cbk = data;
			data = null;
		}

		var src = getURL( opt ,cbk)

		data = serializeData(data)
		if (data) data = '&' + data

		loadJS(src + data, opt.oncomplete);
	}

	exports.write = function(opt , data , cbk){
		if(typeof data == 'function'){
			cbk = data;
			data = null;
		}

		// Meilishuo.config.proxyPath = '/aw/proxy/'
		opt.proxyPath = opt.proxyPath || Meilishuo.config.proxyPath
		if (!opt.proxyPath) return exports.read(opt ,data , cbk)

		var cbkId = genId();
		var form = document.createElement('form')
		form.style.display = 'none'
		form.setAttribute('action' ,  getURL( opt , cbk , true) )
		form.setAttribute('method' , 'post')
		form.setAttribute('target' , cbkId)
		if (data){
			for (var k in data){
				var input = document.createElement('input')
				input.name = k
				input.value = data[k]
				form.appendChild(input)
			}
		}
		var ifrm;
		try {
			ifrm = document.createElement('<iframe name="' + cbkId + '">');
		} catch(e) {
			ifrm = document.createElement('iframe');
		}

		ifrm.style.display = 'none'
		ifrm.id   = cbkId;
		ifrm.name = cbkId;
		document.body.appendChild(form)
		document.body.appendChild(ifrm)


		form.submit()
	}
});
