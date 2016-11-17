function groundnew(){
	return this;
}
var controlFns = {
	'ground' : function(args){
		var php = {'main' : '/customactivity/CustomActivity_common_tool_single?id=dress_new_wap'};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){

			data.pageTitle = '2014春夏服饰新品发布-美丽说';
			data._CSSLinks = ['biz/groundnew/ground'];

			var punchShare = {
				title: "春夏置新不海淘  秒速尝鲜购时髦",
				text: "春夏换季你还在X宝一页页海淘新货吗？赶快加入美丽说换季活动，微信支付立减10元，轻松尝鲜购时髦吧！",
				net_en: "m",
				wap_link: "/biz/groundnew/ground/",
				noclient_link: "http://www.meilishuo.com/u/EN9bJp",
				pc_link: "/biz/groundnew/ground/",
				pic: "http://d05.res.meilishuo.net/img/_o/4b/4a/6ffb6cc0be45351808af975b2e5a_640_340.c6.jpg",
				pic_weixin: "http://d04.res.meilishuo.net/img/_o/3b/fa/37e48ff45a42f2080af7859c87ec_200_200.c6.jpg"
			}
			var shareURL = 'http://'+punchShare.net_en+'.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(punchShare.wap_link)+'&bg='+encodeURIComponent(punchShare.noclient_link)+'&bg2='+encodeURIComponent(punchShare.pc_link)
			var params = {
				'title' : punchShare.title,
				'text' : punchShare.text,
				'pic' : {
					'default' : punchShare.pic
				},
				'url' : shareURL
			};
			if (punchShare.pic_weixin){
				params.pic.weixin = punchShare.pic_weixin
				params.pic.weixin_timeline = punchShare.pic_weixin
				}
			var shares = wapMod.shareTo(mSelf.req , params , ['weixin_timeline','weixin' ,'qzone','weibo','txweibo'],'weixin_timeline');
			data.share = shares;

			mSelf.render('biz/groundnew/ground.html' , data);
		});
	},
	'list' : function(args){
		var _t = this.req.__get.type;
		var wapMod = base.loadModel('wap/tools.js');
		(_t >= 0 || _t < 6) ? _t = parseInt(_t) : _t = 0;
		var _type = ['dress','skirt','pants','shoes','bag','other'][_t];
		var php = {
			'main' : '/customactivity/CustomActivity_common_tool_single?id=dress_new_wap',
			'list' : '/groupon/Groupon_poster_mob?frame=0'
		}
		, mSelf = this
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data.pageTitle = '2014春夏服饰新品发布-美丽说';
			data.type = _type;
			data.content = data.main['content_' + _type];
			data.hot = data.main['hot_keywords_' + _type];
			data._CSSLinks = ['biz/groundnew/ground'];

			var punchShare = {
				title: "春夏置新不海淘  秒速尝鲜购时髦",
				text: "春夏换季你还在X宝一页页海淘新货吗？赶快加入美丽说换季活动，微信支付立减10元，轻松尝鲜购时髦吧！",
				net_en: "m",
				wap_link: "/biz/groundnew/ground/",
				noclient_link: "http://www.meilishuo.com/u/EN9bJp",
				pc_link: "/biz/groundnew/ground/",
				pic: "http://d05.res.meilishuo.net/img/_o/4b/4a/6ffb6cc0be45351808af975b2e5a_640_340.c6.jpg",
				pic_weixin: "http://d04.res.meilishuo.net/img/_o/3b/fa/37e48ff45a42f2080af7859c87ec_200_200.c6.jpg"
			}
			var shareURL = 'http://'+punchShare.net_en+'.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(punchShare.wap_link)+'&bg='+encodeURIComponent(punchShare.noclient_link)+'&bg2='+encodeURIComponent(punchShare.pc_link)
			var params = {
				'title' : punchShare.title,
				'text' : punchShare.text,
				'pic' : {
					'default' : punchShare.pic
				},
				'url' : shareURL 
			};
			if (punchShare.pic_weixin){
				params.pic.weixin = punchShare.pic_weixin
				params.pic.weixin_timeline = punchShare.pic_weixin
				}
			var shares = wapMod.shareTo(mSelf.req , params , ['weixin','weixin_timeline','weibo', 'qzone','txweibo'],'weixin_timeline');
			data.share = shares;

			mSelf.render('biz/groundnew/list.html' , data);
		});
	}
}
exports.__create = controller.__create(groundnew , controlFns);
