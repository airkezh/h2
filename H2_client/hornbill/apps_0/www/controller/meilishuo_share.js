function meilishuo_share(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php)
		//php.userInfo = '/user/headinfo';
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.lang = {window:{login:''}};
			data.pageTitle = '分享到美丽说——陪你美丽每一天';
			mSelf.render('meilishuo_share.html' , data);	
		});
	}	
}
exports.__create = controller.__create(meilishuo_share , controlFns);
