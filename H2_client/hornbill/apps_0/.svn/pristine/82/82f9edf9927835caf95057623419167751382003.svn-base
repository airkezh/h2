function click(){
	return this;	
}
var controlFns = {
	'welfare' : function(args){
		// this.debugSnake({'target' : 'devlab1'});
		var activity_id = args || 0;
		var php = { 'redirect' : '/welfare/welfare_activity_click?activity_id=' + activity_id }
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			return this.redirectTo(data.redirect.url , false);
		});
	}


}
exports.__create = controller.__create(click , controlFns);
