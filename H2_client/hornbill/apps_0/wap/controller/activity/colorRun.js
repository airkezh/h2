function colorRun(){
	return this;
}
var controlFns = {
	index : function(){

		var php = {
			'connect_weixin': '/connect/weixin?type=1'
		};
		
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data.pageTitle = '带着身体去旅行';
			data._CSSLinks = ['activity/colorRun'];
			this.render('activity/colorRun.html' , data);
		});
	}
};
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(colorRun , controlFns);
