function download(){
	return this;
}
var controlFns = {
	mdown : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.render('activity/download.html' , data);
		});
	}
}
exports.__create = controller.__create(download , controlFns);
