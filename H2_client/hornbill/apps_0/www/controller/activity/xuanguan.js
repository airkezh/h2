function xuanguan (){
	return this;	
}
var controlFns = {
	'middle' : function (){
		var php = {	
			'pageInfo' : '/commerce/middlepage_banner'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.pageInfo) return this.errorPage();
			data.pageTitle = data.pageInfo.pageTitle;
			data._CSSLinks = ['activity/middle'];
			this.render('activity/middle.html', data);	
			
		});
	}
};
exports.__create = controller.__create(xuanguan , controlFns);
