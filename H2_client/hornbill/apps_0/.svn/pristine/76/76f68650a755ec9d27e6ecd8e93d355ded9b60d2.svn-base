function music(){
	return this;
}
var controlFns = {
	'index' : function(args){
		args = (args in controlFns) ? args  : 'main'
		this[args]()
		
	},
	'main' : function(){
		var mlsHost = this.req.headers.host;
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.mlsHost = mlsHost;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/index"];
			this.render('activity/music/index.html' , data);
		})
	},
	'music' : function(){
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		var  weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.listenOver(function(data){
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/music"];
			this.render('activity/music/music.html' , data);
		})
	},
	'question' : function(){
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.pageTitle = '草莓音乐节-问答';
			data._CSSLinks = ["activity/music/question"];
			this.render('activity/music/question.html' , data);
		})
	},
	'msg' : function(){
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.pageTitle = '草莓音乐节-城市';
			data._CSSLinks = ["activity/music/msg"];
			this.render('activity/music/msg.html' , data);
		})
	},
	'city' : function(){
		var wapMod = this.loadModel('tools.js');
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'music':'/huodong/Strawberry_music'
		}
		var  weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			if (weixinBrowser) {
				connectWX(this, data);
			}
			var params = {
				'title' : '上海草莓音乐节门票免费送！速来',
				'text' : '美丽说带你嗨翻天，草莓音乐节门票免费送啦，小伙伴快来领→',
				'pic' : 'http://d04.res.meilishuo.net/img/_o/70/60/e8d1171dc8adaa5f26447c2b8bf7_200_200.ch.jpg',
				'url' : 'http://mapp.meilishuo.com/activity/music/music/'
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = '草莓音乐节-城市';
			data._CSSLinks = ["activity/music/city"];
			this.render('activity/music/city.html' , data);
		})
	},
	'ticket' : function(){
		var wapMod = this.loadModel('tools.js');
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var mlsHost = this.req.headers.host;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//share
			var params = {
				'title' : '美丽说夏日狂欢 西安草莓音乐节门票免费送',
				'text' : '美丽说夏日狂欢带你high，草莓音乐节免费门票抢到手软',
				'pic' : 'http://d03.res.meilishuo.net/pic/_o/54/48/76d8b27ce4d3527836de993994f8_200_200.cg.jpg',
				'url' : 'http://' + mlsHost + '/activity/music/ticket/'
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);
			data.mlsHost = mlsHost;
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/ticket"];
			this.render('activity/music/ticket.html' , data);
		})
	},
	'game' : function(){
		var mlsHost = this.req.headers.host;
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.mlsHost = mlsHost;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/game"];
			this.render('activity/music/game.html' , data);
		})
	},
	'userInfo' : function(){
		var wapMod = this.loadModel('tools.js');
		var mlsHost = this.req.headers.host;
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.mlsHost = mlsHost;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/userInfo"];
			this.render('activity/music/userInfo.html' , data);
		})
	},
	'success' : function(){
		var wapMod = this.loadModel('tools.js');
		var mlsHost = this.req.headers.host;
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			//share
			var params = {
				'title' : '在这个看脸的星球我偏要拼实力！草莓音乐节门票是我的！',
				'text' : '玩游戏，拼眼力，免费门票拿到手软！成都草莓音乐节向你招手～',
				'pic' : 'http://d03.res.meilishuo.net/pic/_o/21/d8/16ebcdef8001f56c3eef157ef384_200_200.cg.jpg',
				'url' : 'http://' + mlsHost + '/activity/music/main/'
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);
			data.mlsHost = mlsHost;
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = '草莓音乐节';
			data._CSSLinks = ["activity/music/success"];
			this.render('activity/music/success.html' , data);
		})
	}

}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(music , controlFns);