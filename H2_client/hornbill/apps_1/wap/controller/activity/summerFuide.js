function summerFuide(){
	return this;
}

var controlFns = {
	'home' : function(){
		var wapMod = this.loadModel('tools.js');
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(weixinBrowser) connectWX(this, data);
			data._CSSLinks = ['activity/summerFuide'];
			data.pageTitle = '暑假约男神 霸占时尚圈';
			this.render('activity/summerFuide/home.html', data);
		});
	},
	'question' : function(){
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'qa' : '/customactivity/CustomActivity_common_tool_singleNew?id=common_answer&cid=9931'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['activity/summerFuide'];
			data.pageTitle = '时尚基因测试';
			this.render('activity/summerFuide/question.html', data);
		})
	},
	'mark' : function(){
		var wapMod = this.loadModel('tools.js');
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'coupon' : '/customactivity/CustomActivity_lottery?act=set&activity_id=51'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
		//console.log(JSON.stringify(data.coupon));
		data.list = [{
				'type' : 0
				, 'title' : '潮流百科-你的时尚基因'
				, 'desc' : '潮流百科'
			},{
				'type' : 1
				, 'title' : '万年童颜-你的时尚基因'
				, 'desc' : '万年童颜'
			},{
				'type' : 2
				, 'title' : '美味雷达-你的时尚基因'
				, 'desc' : '美味雷达'
			},{
				'type' : 3
				, 'title' : '品质生活家-你的时尚基因'
				, 'desc' : '品质生活家'
			}]
			function pageinfo(){ 
				return Math.floor(Math.random()*(data.list.length)); 
			}
			data.type = pageinfo();
			data.desc = data.list[data.type].desc;
			var params = {
				'title' : '暑假约男神 霸占时尚圈',
				'text' : '我是美丽说认证的资深'+data.list[data.type].desc+'！快来测试，和鹿晗一起开启你最时髦的热力summer吧！',
				'pic' : 'http://d01.res.meilishuo.net/pic/_o/ed/d4/eaa1c2ec43ec14714f2ff6d9fac7_100_100.cg.jpg',
				'url' : 'http://m.meilishuo.com/activity/summerFuide/home/'
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);
			data.weixinBrowser = weixinBrowser;
			data._CSSLinks = ['activity/answer/mark'];
			data.pageTitle = data.list[data.type].title;
			this.render('activity/summerFuide/mark.html', data);
		})
	}
};

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true) || true;
}

exports.__create = controller.__create(summerFuide, controlFns);