function page(){
	return this;	
}
var controlFns = {
	'index' : function(id) {
		var php = {'pagebody': 'jungle::/page/body/' + id}
		this.bindDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data){
			data.jQueryConflict = true
			this.render('page/pc.html' , data)
		})


		
	}
}
exports.__create = controller.__create(page , controlFns);
