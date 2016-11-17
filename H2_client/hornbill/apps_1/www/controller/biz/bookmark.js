function bookmark(){
	return this;
}

var controlFns = {
	index : function(p){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/bookmark'];
			data.pageTitle = '清除浏览器缓存说明 - 美丽说';
			mSelf.render('activity/bookmark.html' , data);
		});
	}
}
 exports.__create = controller.__create(bookmark, controlFns);
