function help(){
	return this;	
}
var controlFns = {
	'taobao' : function(){
		var data = {}
		this.render('com/taobao_error.html' ,data)
		},
	'feedback' : function(args){
		var php = {
		}
		, mSelf = this
		var wapMod = base.loadModel('wap/tools.js');

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){

			data.pageTitle = '意见反馈-美丽说';
			data._CSSLinks = ['biz/feedback'];
			mSelf.render('biz/feedback.html' , data);
		});
	}
}
exports.__create = controller.__create(help , controlFns);
