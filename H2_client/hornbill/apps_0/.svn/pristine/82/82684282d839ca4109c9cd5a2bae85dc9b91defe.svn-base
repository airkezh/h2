function testGame(){
	return this;
}
var controlFns = {
	index : function(testId){
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'customActivity':'/CustomActivity/CustomActivity_test?cid='+testId
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.hide_gotop = true;
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data.testId = testId;
			data.pageTitle = '[美丽说]'+data.customActivity.data.title;
			data._CSSLinks = ['activity/testGame'];
			this.render('activity/testGame.html' , data);
		});
	},
	testGameResult : function(testId){
		var name = this.req.__get.name.trim();
		var wapMod = base.loadModel( 'wap/tools.js' );

		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'testResult' : '/CustomActivity/CustomActivity_test_answer?appendName='+name+'&cid='+testId+'&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			data.XR = true;
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.hide_gotop = true;
			data.isWx = weixinBrowser;
			data.islogin = 0;
			data.name = name;
			data.testId = testId;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data.pageTitle = '[美丽说]'+data.testResult.data.title;;
			data._CSSLinks = ['activity/testGameResult'];
			this.render('activity/testGameResult.html' , data);
		});
	}
};
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(testGame , controlFns);
