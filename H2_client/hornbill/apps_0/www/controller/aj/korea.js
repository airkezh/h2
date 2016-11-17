function korea() {
    return this;
}
var controlFns = {
    index : function(params){
    	// this.debugSnake({'target':'qinzhewu.rdlab'});
		var php = {
			'waterFall' : '/Koreahall/Pc_Korea_list'
		}
		this.ajaxTo(php[params]);
	}
}

exports.__create = controller.__create(korea, controlFns);
