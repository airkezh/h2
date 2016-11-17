function shareTrains(){
	return this;	
}
var controlFns = {
	'goods' : function(args){
		var tid = this.readData('tid' , this.req.__get , '');
		var php = {
			'single' : '/item/item_single_tbalert_m?tid=' + tid,
			'itemImages' : '/item/item_images?tid=' + tid
		}, mSelf = this;

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			if(!data.single) return mSelf.errorPage();
			data.pageTitle = '宝贝详情 - 美丽说';
			data._CSSLinks = ['activity/shareTrains'];
			mSelf.render('activity/shareTrains.html' , data);
		});
	}
};
exports.__create = controller.__create(shareTrains , controlFns);
