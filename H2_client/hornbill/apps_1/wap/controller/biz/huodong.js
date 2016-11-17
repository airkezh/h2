function huodong(){
	return this;
}

var controlFns = {
	sfuide : function(params){
		var pageShareURL = encodeURIComponent('/biz/huodong/sfuide/'+params);
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');

		var php = {
			'pageData' : '/activity/activity_fuide?id='+params
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			/* 增加mob端屏幕适配 */
			data.newPage = params > 203 ? true : false;
			/*share*/
			if(data.pageData.img_url){
				var share_params = {
					'title' : data.pageData.title,
					'text' : data.pageData.intro,
					'pic' : data.pageData.img_url,
					'url' : shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , share_params);
			} else {
				data.share = false
			}

			data.pageTitle = data.pageData.title || '美丽说';
			data._CSSLinks = ['biz/sfuide'];
			mSelf.render('biz/sfuide.html', data);
		});
	},
	candycrush : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说';
			data._CSSLinks = ['biz/candycrush'];
			mSelf.render('activity/candycrush.html', data);
		});
	},
	crest3 : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '佳洁士';
			data._CSSLinks = ['biz/crest3'];
			mSelf.render('activity/crest3.html', data);
		});
	},	

	nissan : function(){
		var pageShareURL = encodeURIComponent('/biz/huodong/nissan/');
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			'nissan_lottery':'/customactivity/customActivity_nissan_coupon_lottery?from=app&action=status',
			'nissan_like':'/customactivity/CustomActivity_nissan_style_like?action=status'
		};
		var mSelf = this;
		this.setMDefault(php);
		//this.debugSnake({target : 'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data){
			/*share*/
			var params = {
					'title' : '[玛驰派福利啦] 为时尚美色态度投喜欢，赢美丽说现金券',
					'text' : '[玛驰派福利啦] 为时尚美色态度投喜欢，赢美丽说现金券',
					'pic' : {
						"weixin" : 'http://i.meilishuo.net/css/images/wap/activity/nissan/wxshare.jpg',
						"weixin_timeline" : 'http://i.meilishuo.net/css/images/wap/activity/nissan/wxshare.jpg',
						"default" : 'http://i.meilishuo.net/css/images/wap/activity/nissan/qtshare.jpg'
					},
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);

			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data.pageTitle = '玛驰四轮包包 秀出你刚刚好的美';
			data._CSSLinks = ['biz/nissan'];
			mSelf.render('activity/nissan.html', data);
		});
	},	

	loreal : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '欧莱雅';
			data._CSSLinks = ['biz/loreal'];
			mSelf.render('activity/loreal.html', data);
		});
	},
	shopJoin : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '潮流好店招商';
			data._CSSLinks = ['biz/shopJoin'];
			mSelf.render('activity/shopJoin.html', data);
		});
	},
	shopJoin1 : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '潮流好店招商';
			data._CSSLinks = ['biz/shopJoin'];
			mSelf.render('activity/shopJoin1.html', data);
		});
	},
	yunifang : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '带上面膜看世界';
			data._CSSLinks = ['biz/yunifang_m'];
			mSelf.render('activity/yunifang_m.html', data);
		});
	},
	yunifang2 : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '我的御用面膜  御泥坊 ';
			data._CSSLinks = ['biz/yunifang_m2'];
			mSelf.render('activity/yunifang_m2.html', data);
		});
	},

 	nuan2 : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '潮搭学院';
			data._CSSLinks = ['biz/nuan_m2'];
			mSelf.render('activity/nuan_m2.html', data);
		});
	},
 	nuan3 : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '潮搭学院';
			data._CSSLinks = ['biz/nuan_m3'];
			mSelf.render('activity/nuan_m3.html', data);
		});
	},

	nuan : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '潮搭学院';
			data._CSSLinks = ['biz/nuan_m'];
			mSelf.render('activity/nuan_m.html', data);
		});
	},
	free : function(){
		var mSelf=this,
			platform = false,
			wapMod = base.loadModel('wap/tools.js'),
			ua = mSelf.req.headers['user-agent'];
		if (/(Android)/i.test(ua)) {
            platform = true;
        }
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isAndroid = platform;
			data.isNewest = wapMod.isNewest(mSelf.req, '6.6.1');
			data.pageTitle = 'Q萌泰迪 飞你莫属';
			data._CSSLinks = ['biz/free_m'];
			mSelf.render('activity/free_m/free_m.html', data);
		});
	}
};

exports.__create = controller.__create(huodong , controlFns);
