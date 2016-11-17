function edition(){
	return this;	
}
var controlFns = {
	'index' : function(cid){
		var cid = this.readData('cid',this.req.__get, '');
		this.req.__get.cid = cid
		var php = {
			'top' : '/edition/merchant_head',
			'catalogs' : '/edition/merchant_catalogs',
			'detail' : '/edition/merchant_desc',
			'poster0' : '/edition/merchant_poster',
			'botLogo' : '/edition/merchant_logo'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.detail);
			//if(!data.volume_head) return mSelf.errorPage();
			data.pageTitle = '春季精明换装 - 美丽说好店';
			data._CSSLinks = ['edition'];
			// true 宽屏 
			data.fluid = true;
			data.headTag = 'shop'
			
			mSelf.render('edition/edition.html' , data);	
		});	
	}
};
exports.__create = controller.__create(edition , controlFns);
