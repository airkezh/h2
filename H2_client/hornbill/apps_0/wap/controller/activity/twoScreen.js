function twoScreen(){
	return this;
}
var controlFns = {
	index : function(){
		//this.debugSnake({target : 'ziqiangdong.rdlab'});
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'gid' : '/doublescreen/Start_game'
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
			data.pageTitle = '测测我们的爱情关键词';
			data._CSSLinks = ['activity/twoScreen'];
			this.render('activity/twoScreen.html' , data);
		});
	},
	guest : function(){
		//this.debugSnake({target : 'ziqiangdong.rdlab'});
		var gid  = this.req.__get.gid;
		var php = { 
			'connect_weixin': '/connect/weixin?type=1',
			'love_infos' : '/doublescreen/Check_pair',
			'result_data' : '/doublescreen/Merge_user'

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.gid = gid;
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data.pageTitle = '测测我们的爱情关键词';
			data._CSSLinks = ['activity/twoScreen-guest'];
			this.render('activity/twoScreen-guest.html' , data);
		});
	}
};
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(twoScreen , controlFns);
