function xuanguan (){
	return this;	
}
var controlFns = {
	'middle' : function (){
		var pType = this.readData('type', this.req.__get,'');
		var php = {	
			'pageInfo' : '/commerce/middlepage_banner_mob?type=' + pType,
			'poster0' : '/commerce/middlepage_poster_mob?limit=30&type=' + pType
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.poster0) return this.errorPage();
			data.pageTitle = data.pageInfo.pageTitle;
			data._CSSLinks = ['activity/middle'];
			this.render('activity/middle.html', data);	
		});
	}
};
exports.__create = controller.__create(xuanguan , controlFns);
