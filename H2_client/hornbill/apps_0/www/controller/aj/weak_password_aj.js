function weak_password_aj() {
    return this;
}

var controlFns = {
    weakPassword : function(params){
    	var php = {
			'remove' : '/user/Remove_weak_password_mark'
		}
		this.ajaxTo(php[params]);
    }
}
exports.__create = controller.__create(weak_password_aj, controlFns);
