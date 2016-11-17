function ggl(){
		return this;
}


var controlFns = {
	index : function(){
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (weixinBrowser) {
				connectWX(this, data);
			};
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data.pageTitle = '515夏日狂欢，10亿现金券来袭！';
			data._CSSLinks = ['activity/ggl'];
			this.render('activity/ggl.html' , data);
		});
	}
};
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(ggl , controlFns);
