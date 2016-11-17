function clearance(){
	return this;
}
var controlFns = {
	index: function(){
		this.market()
	},
	market : function(params){
		var mSelf = this;
		params = params || '1197';
		var php = {
			'pageData' : 'jungle::/moas/api/' + params
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData) return mSelf.errorPage();
			data.use_rem_screen = true;

			data.pageTitle = data.pageData.pageTitle || '清仓活动';
			data._CSSLinks = ['biz/clearance/market'];
			mSelf.render('biz/clearance/market.html', data);
		});
	}
}
exports.__create = controller.__create(clearance , controlFns);