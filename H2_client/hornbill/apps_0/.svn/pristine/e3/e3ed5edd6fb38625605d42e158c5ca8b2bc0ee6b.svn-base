function agree(){
	return this;	
}

var controlFns = {
	index : function(){
		this.agree();
	},
	agree : function(){
		var php ={};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.render('user/agree.html', data);
		});
	}
}

exports.__create = controller.__create(agree , controlFns);
