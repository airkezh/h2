function lm(){
	return this;
}
var controlFns = {
	'index' : function() {
		var php ={
			'clothes' : '/alliance/section_shelf?section_id=1',
			'shoes' : '/alliance/section_shelf?section_id=2',
			'bags' : '/alliance/section_shelf?section_id=3',
			'access' : '/alliance/section_shelf?section_id=4',
			'jiaju' : '/alliance/section_shelf?section_id=5',
			'top_bnr' : '/alliance/Banner_ads?type=1',
			'rec_sku' : '/alliance/hot_goods',
			'bnr_right' : '/alliance/Banner_ads?type=2',
			'bnr_ct' : '/alliance/Banner_ads?type=3',
			'sec_nav' : '/alliance/recommend_words'

		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data.diffwelcome = true;
            data.pageTitle = '网盟外投 - 美丽说';
			data._CSSLinks = ['welcome_new'];
			mSelf.render('lm/welcome.html',data);
		});
	}
}
exports.__create = controller.__create(lm , controlFns);
