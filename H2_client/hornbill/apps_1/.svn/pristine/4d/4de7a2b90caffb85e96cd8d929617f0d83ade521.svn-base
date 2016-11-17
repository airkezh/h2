function summer_fashion(){
	return this;
}
var controlFns = {
	main : function(){
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=summer_fashion'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData){
				return mSelf.errorPage();
			}
			data.fluid = true;
			data.topbanner = false;
			data.logo_act = false;

			data._CSSLinks = ['huodong/summer_fashion'];
			data.pageTitle = data.pageData.pageControl.title;
			mSelf.render('biz/summer_fashion/act_base.html', data);
		});
	}
}
exports.__create = controller.__create(summer_fashion, controlFns);