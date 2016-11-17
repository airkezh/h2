function pickup(){
	return this;
}
var controlFns = {
	index : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '发现 - 美丽说';
			data._CSSLinks = ['pickup'];
			mSelf.render('pickup.html', data);
		});
	}
}
exports.__create = controller.__create(pickup , controlFns);
