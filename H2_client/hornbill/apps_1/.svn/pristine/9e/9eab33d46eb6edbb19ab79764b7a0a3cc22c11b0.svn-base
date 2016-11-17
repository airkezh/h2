function daren() {
	return this;
}
var controlFns = {
	'index' : function(param) {
	//	var params = ['all', 'jiepai', 'cosmetic', 'fashion', 'editor'];
		if (!param) param = 'all';
		this.daren(param);
	},
	'daren' : function(param) {
		var mSelf = this;
		var tab = this.readData('tab',this.req.__get, 'all');  
		if (['all','prof','jiepai','cosmetic','fashion','editor'].indexOf(tab) == -1)
			return this.redirectTo('/daren/')
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'totalNum':'/famous/main_view_total?tab='+tab,
			'top_banner':'/commerce/Ads_banner/daren/top',
			'shareListV' : '/famous/share_list?type=pinkV',
			'shareListS' : '/famous/share_list?type=editor',
			'headerList' : '/famous/header_list'
		};
		php['adm5'] = '/adm/ad_Show?slot_id=59';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['daren'];
			data.pageTitle = '美丽达人 - 美丽说';
			data.tab_param = tab;
			data.daren = true;
			data.groupPg = {}; 
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			//console.log(data.shareListV);
			//true 二级导航
			data.brandSecondNav = true;
			data.onlyShowGoTop = true;
			mSelf.render('daren/daren.html' , data);	
		});
	}
} 
exports.__create = controller.__create(daren, controlFns);
