function change_bind(){
	return this;
}

var controlFns = {
	apply: function( params ) {
		// this.debugSnake({'target':'xiaolongrong.rdlab'})
		var php = {
			'monthList': '/user/Change_bind_time_picker'
			,'addrList': '/user/Addr_select'
			,'saveAudit': '/user/Save_audit_info'
		}

		this.ajaxTo( php[ params ] )
	}
}

exports.__create = controller.__create(change_bind, controlFns);