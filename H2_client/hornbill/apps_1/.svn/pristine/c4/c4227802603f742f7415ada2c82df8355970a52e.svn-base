function lmsearch(){
	return this;	
}
var controlFns = {
	'index' : function() {
		var php ={
			'search_poster':'/alliance/search_poster'

		};
		var mSelf = this;
		var page = this.readData('page',this.req.__get, 0)|0;
		var searchKey = this.readData('searchKey',this.req.__get, '').trim()

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
            data.pageTitle = '网盟外投 - 美丽说';
			data._CSSLinks = ['search'];
            // data.groupPg.current_page = page;
            data.searchKey = searchKey;
			mSelf.render('lm/search.html',data);
		});
	}
}
	
exports.__create = controller.__create(lmsearch , controlFns);
