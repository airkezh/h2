function christmas(){
	return this;
}
var cookie = require(config.path.base + 'cookie.js')
var controlFns = {
	'stove' : function(){
		var mSelf = this
		var uid = this.readData('uid',this.req.__get, 0)|0;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1',
			"core" : "/customactivity/CustomActivity_lottery?act=get&activity_id=21"
		}
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php)
		this.bridgeMuch(php)
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

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id
			data.fromid = uid
			data.pageTitle = 'High翻圣诞捉红包'
			data._CSSLinks = ['activity/stove']
			mSelf.render('activity/stove.html', data)
		})
	},
	'pagwatch' : function(tid){
		var mSelf = this
		var tid = tid||this.req.__get.tid
		var php = {
			'connect_weixin' : '/connect/weixin?type=1'
		}
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php)
		this.bridgeMuch(php)

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

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id
			data.tid = tid
			data.pageTitle = 'High翻圣诞捉红包'
			data._CSSLinks = ['activity/stove']
			mSelf.render('activity/pagwatch.html', data)
		})
	},
	'pagno' : function(tid){
		var mSelf = this
		var php = {
			'connect_weixin' : '/connect/weixin?type=1'
		}
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php)
		this.bridgeMuch(php)
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

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id;
			data.pageTitle = 'High翻圣诞捉红包'
			data._CSSLinks = ['activity/stove']
			mSelf.render('activity/pagno.html', data)
		})
	}
};

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(christmas , controlFns);
