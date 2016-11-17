function help() {
	return this;
}
var controlFns = {
	'index' : function(param) {
	},
	'return' : function(param){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['help'];
			data.pageTitle = '美丽无忧购消费者保障说明 - 美丽说';
			mSelf.render('help/return.html' , data);	
		});
	}, 
	'userhelp' : function(param){
		 var mSelf = this;
		 var php = {
		 	'gouwubangzhu': '/partner/partner_post?id=163',
		 	'xinshoushanglu': '/partner/partner_post?id=161'
		 };
		 this.setDefaultData(php);
		 this.bridgeMuch(php);
		 this.listenOver(function(data){
			 data._CSSLinks = ['help'];
			 data.pageTitle = '美丽无忧购用户帮助中心 - 美丽说';
			 mSelf.render('help/user_help.html' , data);  
		 });
	}
}
exports.__create = controller.__create(help, controlFns);
