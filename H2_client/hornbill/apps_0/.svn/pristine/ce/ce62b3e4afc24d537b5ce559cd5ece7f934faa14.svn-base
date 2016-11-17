function category(){
	return this;
}

var controlFns = {
	'index' : function(){
		var mSelf = this
			, php = {
				'navigation' : '/navigate/Navigation_home_top?from=navigation&pic_type=high'
				, 'default_navigate' : '/navigate/navigate_public?more=picture'
			};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.navigation) return mSelf.errorPage();

			data.use_rem_screen = '640_mate';
			data.page_tag = 'category';

			data._CSSLinks = ['category/main'];
			data.pageTitle = '分类';

			mSelf.render('category/main.html', data);
		});
	}
}

exports.__create = controller.__create(category, controlFns);
