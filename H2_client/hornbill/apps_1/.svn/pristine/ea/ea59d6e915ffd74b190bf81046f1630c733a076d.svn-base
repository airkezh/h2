function uninstall(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var toid = this.req.__get.access_token || 0
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid;
			data.pageTitle = 'APP卸载反馈-美丽说' 
			data._CSSLinks = ['uninstall'];
			this.render('uninstall.html' , data);
		})
	},
	'req_other' : function(toid){
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid;
			data.pageTitle = '意见反馈-美丽说' 
			data._CSSLinks = ['uninstall'];
			this.render('req_other.html' , data);
		})
	},
	'req_ths' : function(){
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '意见反馈-美丽说' 
			data._CSSLinks = ['uninstall'];
			this.render('req_ths.html' , data);
		})
	}

};

exports.__create = controller.__create(uninstall , controlFns);
