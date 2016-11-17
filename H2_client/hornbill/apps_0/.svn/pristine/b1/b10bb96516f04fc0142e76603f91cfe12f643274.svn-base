function pay(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['xieyi/pay'];
			data.pageTitle = '美丽说 360桌面应用——酷夏搭配';
			data.headTag = 'summer';
			mSelf.render('xieyi/pay.html' , data);
		});
	}
}
exports.__create = controller.__create(pay , controlFns);
