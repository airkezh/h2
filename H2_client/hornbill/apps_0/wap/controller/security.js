function security(){
	return this;
}

var controlFns = {
	'index':function(){
		var php = {}, self = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['security'];
			data.pageTitle = '美丽保障';
			this.render('security.html',data)
		});
	}
}

exports.__create = controller.__create(security, controlFns);