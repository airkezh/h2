!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.logout = Logout

function Logout(opts, passport){
	var mSelf = this
	opts = opts || {};
	this.opts = opts
	this.passport = passport || new Passport(opts)

	this.passport.setName.call(this, 'logout')

	this.opts.watch && this.addWatch(this.opts.watch)

	this.dom = {}
	this.dom.outer = $(this.opts.outer || '#logoutBox')

	this.dom.outer.on('click', function(){mSelf.doLogout()})
}

Logout.prototype.doLogout = function (){
	var mSelf = this
	var passport = this.passport
	var data = {
		'app_id' : passport.app_id
	};

	passport.bridge.ajax('/logout', data , function(res){
	}, this);
}

Logout.prototype.addWatch = function(watch){
	this.passport.bridge.addWatch.call(this, watch)
}

