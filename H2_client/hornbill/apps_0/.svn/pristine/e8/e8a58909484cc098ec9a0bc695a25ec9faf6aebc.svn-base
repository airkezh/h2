Bridge.prototype.ajax = function(url,data,callback,targe){
	var mSelf = this
	var action = 'ajax|'+url+'|'+(new Date()).valueOf()

	var cbk = function(res){
		callback(res)
		mSelf.watch.call(targe, res)
	}

	$.ajax({
		url: mSelf.hosts.domain+'/passport/aw'+url+'?callback=?',
		data:data,
		success:cbk, 
		dataType: 'jsonp'
	})

	return this;
};

