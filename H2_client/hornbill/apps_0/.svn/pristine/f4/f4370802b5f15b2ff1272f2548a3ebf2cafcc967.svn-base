function research(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var php = {}, mSelf = this;

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
				data.pageTitle = '用户调研 - 美丽说';
				data._CSSLinks = ['activity/research'];
				mSelf.render('activity/research/index.html' , data);
		});
	},
	'success' : function(){
		var php = {}, mSelf = this;

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
				data.pageTitle = '用户调研 - 美丽说';
				data._CSSLinks = ['activity/success'];
				mSelf.render('activity/research/success.html' , data);
		});
	}
};
exports.__create = controller.__create(research , controlFns);
