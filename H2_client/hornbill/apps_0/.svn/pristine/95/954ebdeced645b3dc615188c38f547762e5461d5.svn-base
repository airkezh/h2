function dacu(){
	return this;
}

var controlFns = {
	index: function(params){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		var self = this;
		this.listenOver(function(data){
			data._CSSLinks = ['dacu'];
			data.use_rem_screen = '640';
			self.render('dacu.html', data);
		});
	}
};

exports.__create = controller.__create(dacu, controlFns);
