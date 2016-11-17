function singleDog(){
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
			data.pageTitle = '拯救单身狗';
			data._CSSLinks = ['activity/singleDog'];
			this.render('activity/singleDog.html' , data);
		});
	}
};
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(singleDog , controlFns);
