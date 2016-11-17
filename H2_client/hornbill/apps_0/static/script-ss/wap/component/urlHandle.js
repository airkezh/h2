fml.define('wap/component/urlHandle' , [] , function(require , exports){
	function getParams(url){
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

	function http_build_query (formdata, numeric_prefix, arg_separator) {
	  // http://kevin.vanzonneveld.net
	  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
	  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
	  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
	  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
	  var value, key, tmp = [];

	  var _http_build_query_helper = function (key, val, arg_separator) {
		var k, tmp = [];
		if (val === true) {
		  val = "1";
		} else if (val === false) {
		  val = "0";
		}
		if (val != null) {
		  if(typeof val === "object") {
			for (k in val) {
			  if (val[k] != null) {
				tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
			  }
			}
			return tmp.join(arg_separator);
		  } else if (typeof val !== "function") {
			return encodeURIComponent(key) + "=" + encodeURIComponent(val);
		  } else {
			throw new Error('There was an error processing for http_build_query().');
		  }
		} else {
		  return '';
		}
	  };

	  if (!arg_separator) {
		arg_separator = "&";
	  }
	  for (key in formdata) {
		value = formdata[key];
		if (numeric_prefix && !isNaN(key)) {
		  key = String(numeric_prefix) + key;
		}
		var query=_http_build_query_helper(key, value, arg_separator);
		if(query !== '') {
		  tmp.push(query);
		}
	  }

	  return tmp.join(arg_separator);
	}

	/**
	 * 合并参数，不影响源
	 * @id parseParam
	 * @alias parseParam
	 * @param {Object} oSource 需要被赋值参数的对象
	 * @param {Object} oParams 传入的参数对象
	 * @param {Boolean} isown 是否仅复制自身成员，不复制prototype，默认为false，会复制prototype
	 * @author kehuang@meilishuo.com
	 * @example
	 * var cfg = {
	 * 	name: '123',
	 *  value: 'aaa'
	 * };
	 * cfg2 = parseParam(cfg, {name: '456'});
	 * //cfg2 == {name:'456',value:'aaa'}
	 * //cfg == {name:'123',value:'aaa'}
	 */
	function parseParam(oSource, oParams, isown){
		var key, obj = {};
		oParams = oParams || {};
		for (key in oSource) {
			obj[key] = oSource[key];
			if (oParams[key] != null) {
				if (isown) {// 仅复制自己
					if (oSource.hasOwnProperty[key]) {
						obj[key] = oParams[key];
					}
				}
				else {
					obj[key] = oParams[key];
				}
			}
		}
		return obj;
	}

	/**
	 * get querykey's value
	 * @id queryString
	 * @alias queryString
	 * @param {String} sKey
	 * @param {Object} oOpts
	 * @return {String} str
	 * @author kehuang@meilishuo.com
	 * @example
	 * queryString('frm',{'source':'http://mapp.meilishuo.com/member/turntable/?frm=member_turntable-wappage'}) === 'member_turntable-wappage';
	 */
	function queryString(sKey, oOpts){
		var opts = parseParam({
			source: window.location.href.toString(),
			split: '&'
		}, oOpts);
		var rs = new RegExp("(^|)" + sKey + "=([^\\" + opts.split + "]*)(\\" + opts.split + "|$)", "gi").exec(opts.source), tmp;
		if (tmp = rs) {
			return tmp[2];
		}
		return null;
	}

	exports.http_build_query = http_build_query;
	exports.getParams = getParams;
	exports.queryString = queryString;
});
