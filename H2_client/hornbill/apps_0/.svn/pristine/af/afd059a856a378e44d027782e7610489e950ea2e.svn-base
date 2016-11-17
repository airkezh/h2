!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.passport = Passport
window.MLSPassport.content = {}

function Passport(opts){
	this.init(opts)
}

Passport.prototype.init = function(opts){
	opts = opts || {};
	this.opts = opts
	this.app_id = opts.app_id

	this.getBridge(opts)

	this.defaultCSS = this.opts.defaultCSS|0
	if(this.defaultCSS)
		this.bridge.loadCssFile("/css/passport.css")
}

Passport.prototype.getLogin = function(opts){
	var login = new Login($.extend({},{},opts), this)
	return login
}

Passport.prototype.getLogout = function(opts){
	var logout = new Logout($.extend({},{},opts), this)
	return logout
}

Passport.prototype.getRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'pic'},opts), this)
	return risk
}
Passport.prototype.getPicRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'pic'},opts), this)
	return risk
}
Passport.prototype.getSMSRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'sms'},opts), this)
	return risk
}
Passport.prototype.getReactiveRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'reactive'},opts), this)
	return risk
}

Passport.prototype.getMobile = function(opts){
	var mobile = new Mobile($.extend({},{},opts), this)
	return mobile
}


Passport.prototype.getMobileAndSMSRisk = function(opts){
	var mSelf = this
	return {
		mobile:mSelf.getMobile(opts)
		,risk:mSelf.getSMSRisk($.extend({},{append:true},opts))
	}
}

Passport.prototype.getMobileAndReactiveRisk = function(opts){
	var mSelf = this
	return {
		mobile:mSelf.getMobile(opts)
		,risk:mSelf.getReactiveRisk($.extend({},{append:true},opts))
	}
}

Passport.prototype.getBridge = function(opts){
	this.bridge = new Bridge($.extend({},{},opts), this)
	this.bridge.init(opts)
	return this.bridge
}
Passport.prototype.setName = function(tag){
	this.name = tag + (new Date()).valueOf()
	window.MLSPassport.content[this.name] = this
}

