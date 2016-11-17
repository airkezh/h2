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

