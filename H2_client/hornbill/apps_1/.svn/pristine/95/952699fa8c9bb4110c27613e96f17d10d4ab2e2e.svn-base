function guobinfen(){
	return this;
}

var controlFns = {
	'main' : function(args){
		// this.debugSnake({'target':'devlab1'});
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
			if(weixinBrowser) connectWX(mSelf, data);
			data.isWx = weixinBrowser;
            data.pageTitle = '水果堆堆乐';
			data.headTag = 'guobinfen';
			data._CSSLinks = ['activity/guobinfen'];
			mSelf.render('activity/guobinfen/main.html' , data);
		});
	}
}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(guobinfen , controlFns);
