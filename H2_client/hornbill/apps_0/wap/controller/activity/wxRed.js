function wxRed() {
	return this;
}
var controlFns = {
	index : function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//data._CSSLinks = ['activity/wxRed'];
			//data.pageTitle = '搭配详情页';
			mSelf.render('activity/wxRed.html' , data);
		});
	}		
}
exports.__create = controller.__create(wxRed, controlFns);
