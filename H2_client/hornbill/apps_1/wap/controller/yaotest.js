function yaotest(){
	return this;
}

var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'yaotest'
		this[args]()
	},
	yaotest : function(){
		var mSelf = this;
		var php = {
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = '摇一摇';
			data.headTag = 'yaotest';
			data._CSSLinks = ['yaotest'];
			mSelf.render('yaotest.html' , data);
		});
	}
}

exports.__create = controller.__create(yaotest , controlFns);
