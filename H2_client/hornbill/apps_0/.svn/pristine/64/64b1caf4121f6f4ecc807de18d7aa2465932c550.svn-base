function bge(){
	return this;
}
var controlFns = {
	game : function(params){
		var php = {}
		, mSelf = this

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '《小时代》逼格测试';
			data.headTag = params;
			data._CSSLinks = ['activity/bge'];
			mSelf.render('activity/bge/game.html' , data);
		});
	}
}
exports.__create = controller.__create(bge , controlFns);
