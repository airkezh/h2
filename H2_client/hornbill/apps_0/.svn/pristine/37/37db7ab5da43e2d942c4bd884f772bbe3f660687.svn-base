function nphone(){
	return this;
}

var controlFns = {
	'index' : function (){
		this.nphone();
	},
	'nphone' : function (){
		var php ={};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			//data._CSSLinks = ['korea/nphone'];
			mSelf.render('nphone.html',data);
		});
	}
};

exports.__create = controller.__create(nphone, controlFns);