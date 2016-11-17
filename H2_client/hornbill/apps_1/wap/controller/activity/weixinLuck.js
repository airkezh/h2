function weixinLuck() {
	return this;
}

var controlFns = {
	//测试使用
	'_index': function(){
		var php = {
			// 微信互联
			"connect_weixin" : "/connect/weixin"
		};
		var self = this;
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data) {
			connectWX(self, data);
		});
	},
	'index': function() {
		// this.debugSnake({'target':'devlab1'});
		var batchId = this.req.__get.bid || "";
		var Uid  = this.req.__get.uid || "";
		var php = {
			// 微信互联
			"connect_weixin" : "/connect/weixin?gotoUrl=weixinLuck",
			// 红包是否抢完
			"isEmptyData": "/redpackage/Grab_over_red_package?bid=" + batchId,
			// 红包是否已经过期
			"isPastData": "/redpackage/Red_package_expired?bid=" + batchId,
			// 之前是否已经抢过
			//"isGetData": "/redpackage/Check_is_grab?bid=" + batchId,
			// 获取红包ID以判断是否同一个红包
			"isSameData": "/redpackage/Red_package_status?bid=" + batchId
		}
		var self = this;
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data) {
			connectWX(self, data);
			data.batchId = batchId;
			data.Uid = Uid;
			data.pageTitle = "美丽说双十一红包";
			data._CSSLinks = ["activity/weixinLuck"];
			self.render("activity/weixinLuck.html", data);
		});
	},
	'wxRed' : function() {
		// this.debugSnake({target : 'devlab1'});
		var batchId = this.req.__get.bid || "";
		var Uid  = this.req.__get.uid || "";
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			(data.userInfo.user_id == 0) ? isLogin = 0 : isLogin = 1;
			data.batchId = batchId;
			// if (!data.userInfo || !data.userInfo.user_id){
			// 	mSelf.redirectTo('/user/login' ,false ,{"r": "/wxRed/"});		
			// 	return;	
			// }
			data.isLogin = isLogin;
			data.Uid = Uid;
			data._CSSLinks = ['activity/wxRed'];
			data.pageTitle = '发红包啦';
			mSelf.render('activity/wxRed.html' , data);
		});
	}
};

var connectWX = function(mSelf, data){
	 //var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx28b165b5a629bb11&redirect_uri=http%3A%2F%2Fm.meilishuo.com%2Fwx%2Fwxcall%2FwxRed&response_type=code&scope=snsapi_userinfo&state=mls#wechat_redirect"
	if(data.connect_weixin && data.connect_weixin.redirect)
	 	return mSelf.redirectTo(data.connect_weixin.redirect ,true);
	//return mSelf.redirectTo(url ,true);	
}

exports.__create = controller.__create(weixinLuck, controlFns);