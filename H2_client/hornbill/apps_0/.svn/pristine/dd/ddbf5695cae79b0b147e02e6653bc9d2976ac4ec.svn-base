function qixi(){
	return this;	
}
var controlFns = {
	'huodong' : function(args){
		var php = {}, mSelf = this;

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
				data.pageTitle = '七夕活动 - 美丽说';
				data._CSSLinks = ['activity/qixi'];
				mSelf.render('activity/qixi.html' , data);
		});
	}
};
exports.__create = controller.__create(qixi , controlFns);
