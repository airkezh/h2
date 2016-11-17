function startling(){
	return this;	
}
var controlFns = {
	'index' : function(seaid){
		var php = {}
		delete this.req.__get.header
		, mSelf = this
		//, u = mSelf.req.headers['user-agent']
		
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data._CSSLinks = ['activity/startling'];
			mSelf.render('activity/startling.html' , data);
		});
	}
};

exports.__create = controller.__create(startling , controlFns);
