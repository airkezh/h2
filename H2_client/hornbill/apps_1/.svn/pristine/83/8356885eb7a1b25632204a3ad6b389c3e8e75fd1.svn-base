function wapExperiment(){
	return this;
}
var controlFns = {
	'psy' : function(){
		var php = {},
			mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '心里年龄测试-美丽说';
			data._CSSLinks = ['biz/wapExperiment'];
			mSelf.render('biz/wapExperiment.html' , data);
		});
	}
};

exports.__create = controller.__create(wapExperiment , controlFns);
