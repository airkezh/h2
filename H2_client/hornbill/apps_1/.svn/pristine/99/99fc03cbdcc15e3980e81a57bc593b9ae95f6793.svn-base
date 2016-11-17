var controlFns = {
	user : function(params){
		var php = {
			'logon' : '/user/user_log_on'
		}
		this.ajaxTo(php[params])
	}
    ,goods : function(params) {
        var php = {
            'specification' : 'im::/im/open_goods'
        }
        this.ajaxTo(php[params])
    }
}
exports.__create = controller.__create(new Function(), controlFns);
