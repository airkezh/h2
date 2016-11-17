function baoyang(){
	return this;
}

var controlFns = {
	'main' : function(args){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/main.html' , data);
		});
	},
	'rewards' : function(args){
		this.debugSnake({target : 'devlab1'})
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
			,'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			connectWX(mSelf, data);
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/rewards.html' , data);
		});
	},
	'coupon' : function(args){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/use.html' , data);
		});
	},
	'pay' : function(args){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/pay.html' , data);
		});
	},
	'success' : function(args){
		var mSelf = this;
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/rewards.html' , data);
		});
	},
	'fail' : function(args){
		var mSelf = this;
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/pay.html' , data);
		});
	}
}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(baoyang , controlFns);
