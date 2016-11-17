function jianling(){
	return this;
}
var controlFns = {
	game : function(){
		var php = {}
		, mSelf = this

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = 'xxxxxxxxxxxx';
			data._CSSLinks = ['activity/jianling'];
			mSelf.render('activity/jianling.html' , data);
		});
	}
}
exports.__create = controller.__create(jianling , controlFns);
