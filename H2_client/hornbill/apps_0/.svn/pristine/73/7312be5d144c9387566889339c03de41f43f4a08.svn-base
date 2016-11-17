function attr(){
	return this;	
}

var controlFns = {
	index : function(args){
		if(args == 'direct'){
			this.direct();
		}
	},
	direct : function(){
		var php = {
			'attr_direct' : '/url/attr_direct'
		}
		this.debugSnake({'target':'pmlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.redirectTo(data['attr_direct'].rediret);
		});
	}
}

exports.__create = controller.__create(attr , controlFns);
