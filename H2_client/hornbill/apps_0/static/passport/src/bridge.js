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

