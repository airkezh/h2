function cpc() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		if (!param) param = 'ydtmiji';
		this.cpc(param);
	},
	'cpc' : function(param) {
		var mSelf = this;
		var titleWord = {'ydtmiji':'易点通宝贝审核通关秘籍','ydt_qa':'易点通FAQ'}
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (param != 'ydtmiji' && param != 'ydt_qa') {
				mSelf.res.writeHead(404, {'Content-Type' : 'text/plain'});
			    mSelf.res.end('页面不存在');
				return;
			}
			data.param = param;
			data._CSSLinks = ['cpc'];
			data.pageTitle = titleWord[param] + ' - 美丽说';
			mSelf.render('cpc/'+param+'.html' , data);	
		});
	}
} 
exports.__create = controller.__create(cpc, controlFns);
