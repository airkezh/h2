function interconnect(){
	return this;	
}
var controlFns = {
	'index' : function(){
		this.bound();
	},
	'bound' : function() {
		var mSelf = this;
		var php = {};

		// this.debugSnake({'target':'shouyanli.rdlab'});

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '互联登陆';
			data._CSSLinks = ['interconnect/interconnect'];
			mSelf.render('interconnect.html', data);
		});
	}
};

exports.__create = controller.__create(interconnect , controlFns);
