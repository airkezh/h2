function robotchat(){
	return this;
}
var controlFns = {
	robot : function(params){
		var php = {
			'search' : '/robot/search',
			'revise' : '/robot/revise',
			'order'  : 'doota::/order/list_info'
		}
		this.ajaxTo(php[params]);
	}
	
}
exports.__create = controller.__create(robotchat , controlFns);
