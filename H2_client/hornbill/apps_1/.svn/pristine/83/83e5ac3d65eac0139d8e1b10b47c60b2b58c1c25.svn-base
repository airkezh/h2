function meilishuo_goods(){
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
			data.pageTitle = '拾宝器 - 美丽说';
			mSelf.render('meilishuo_goods.html' , data);	
		});
	}	
}
exports.__create = controller.__create(meilishuo_goods , controlFns);
