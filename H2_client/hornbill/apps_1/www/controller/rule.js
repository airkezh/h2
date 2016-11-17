function rule(){
	return this;	
}

var controlFns = {
	index : function(){
		this.rule();
	},
	rule : function(){
		var php ={};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.render('user/rule.html', data);
		});
	}
}

exports.__create = controller.__create(rule , controlFns);
