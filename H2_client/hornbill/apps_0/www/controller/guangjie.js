function guangjie() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		var mSelf = this;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'channel_attr' : '/qzone/channel_attr'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['app/shopping'];
			data.pageTitle = '逛街频道';
			data.headTag = 'index';
			mSelf.render('app/shopping/shopping.html' , data);	
		});
	}
}
exports.__create = controller.__create(guangjie, controlFns);
