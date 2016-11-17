function zhuanti(){
	return this;
}
var controlFns = {
	mianmo : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.fluid = true;
			data._CSSLinks = ['zhuanti/mianmo'];
			data.pageTitle = '面膜专题';
			mSelf.render('zhuanti/mianmo.html' , data);
		});
	},
	jiemaogao : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.fluid = true;
			data._CSSLinks = ['zhuanti/jiemaogao'];
			data.pageTitle = '睫毛膏专题';
			mSelf.render('zhuanti/jiemaogao.html' , data);
		});
	}
}
exports.__create = controller.__create(zhuanti, controlFns);
