var controlFns = {
	'index' : function(id){
		if(!id) return this.errorPage()
		var php = {
			'rapid':'jungle::/pine/data/?id='+id
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.rapid.code!==0) return this.errorPage()
			if(data.rapid.data.plat!='pc') return this.errorPage();
			data.pageTitle = data.rapid.data.pageTitle
			data._CSSLinks = ['rapid'];
			data.use_rem_screen = true
			this.render('rapid.html' , data);
		})
	}
}
exports.__create = controller.__create(new Function() , controlFns);
