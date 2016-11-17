function distance(){
	return this;
}

var controlFns = {
	'first' : function(){
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'range' : '/friendassist/friendAssist_origin?ass_orig=1'
		}
		this.bindDefault(php);
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

			data.data = data ;
			data.pageTitle = '千里爱恋一线牵';
			data._CSSLinks = ["activity/distance/distance"];
			this.render('activity/distance/index.html' , data);
		})
	},
	'start' : function(){
		var ass_gid  =  this.req.__get.ass_gid;

		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'welcome': '/friendassist/friendAssist_welcome?ass_gid=' + ass_gid
		}
		this.bindDefault(php);
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


			data.data = data ;
			data.ass_gid = ass_gid;
			data.pageTitle = '千里爱恋一线牵';
			data._CSSLinks = ["activity/distance/start"];
			this.render('activity/distance/start.html' , data);
		})
	},
	'friendBefore' : function(){
		var ass_gid  =  this.req.__get.ass_gid;
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'welcome': '/friendassist/friendAssist_welcome?ass_gid=' + ass_gid
		}
		this.bindDefault(php);
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

			data.data = data ;
			data.ass_gid = ass_gid;
			data.pageTitle = '千里爱恋一线牵';
			data._CSSLinks = ["activity/distance/start"];
			this.render('activity/distance/friendBefore.html' , data);
		})
	},
	'award' : function(){
		var ass_gid  =  this.req.__get.ass_gid;
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'welcome': '/friendassist/friendAssist_welcome?ass_gid=' + ass_gid
		}
		this.bindDefault(php);
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

			data.data = data ;
			data.ass_gid = ass_gid;
			data.pageTitle = '千里爱恋一线牵';
			data._CSSLinks = ["activity/distance/award"];
			this.render('activity/distance/award.html' , data);
		})
	},
	'awardFriend' : function(){
		var ass_gid  =  this.req.__get.ass_gid;
		var php = {
			'connect_weixin': '/connect/weixin?type=1'
			,'welcome': '/friendassist/friendAssist_welcome?ass_gid=' + ass_gid
		}
		this.bindDefault(php);
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

			data.data = data ;
			data.ass_gid = ass_gid;
			data.pageTitle = '千里爱恋一线牵';
			data._CSSLinks = ["activity/distance/award"];
			this.render('activity/distance/awardFriend.html' , data);
		})
	}
}

/*微信互联*/
var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(distance , controlFns);
