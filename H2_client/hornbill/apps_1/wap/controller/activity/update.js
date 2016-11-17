function update(){
	return this;
}
var controlFns = {
	main : function(params){
		var php = {}
		, mSelf = this
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '升级客户端获千元福利';
			data.headTag = params;
			data._CSSLinks = ['activity/update'];
			mSelf.render('activity/update.html' , data);
		});
	}
}
exports.__create = controller.__create(update , controlFns);
