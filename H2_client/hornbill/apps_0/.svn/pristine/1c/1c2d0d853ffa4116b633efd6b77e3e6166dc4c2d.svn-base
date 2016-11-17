function tuan() {
	return this;
}
var controlFns = {
	'index' : function(){
		var php = {
		'top' : 'groupon::/groupon/Groupon_top_banner',
		'tuan' : 'groupon::/groupon/Groupon_poster',
		'rec_week' : 'groupon::/groupon/groupon_recommend_list?position=1&size=6',
		'rec_last' : 'groupon::/groupon/groupon_recommend_list?position=2&size=6'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'tuan';
			data.secondNavHold = true;
			data.sbase = mSelf.readData('sbase',mSelf.req.__get, 0);
			data.cata = mSelf.readData('cata',mSelf.req.__get, 0);
			data.sort = mSelf.readData('sort',mSelf.req.__get, 0);
			data.onlyShowGoTop = true;
			data._CSSLinks = ['tuan'];
			data.pageTitle = '团购 - 美丽说';
			mSelf.render('tuan/tuan.html' , data);
		});
	}
}
exports.__create = controller.__create(tuan, controlFns);
