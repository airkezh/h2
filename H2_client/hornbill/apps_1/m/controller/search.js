function search(){
	return this;	
}
var controlFns = {
	'index' : function(keyword){
		var keyword = keyword? keyword: this.readData('keyword')
		this.req.__get.keyword = keyword;
		var php = {
			'route' : '/navigate/navigation_children_m'
			, 'bread' : '/navigate/navigation_path_m'
			, 'poster0' : '/poster/search_poster_m'
		};

		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	data.cache = true;
			data.pid = keyword;
			data.ptype = 'search';
			data.headTag = 'search';
			data.headTitle = keyword;

			data._CSSLinks = ['guang'];
			mSelf.render('guang.html' , data);
		});	
	}
};

exports.__create = controller.__create(search , controlFns);
