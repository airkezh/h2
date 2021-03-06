function xuanguan_new (){
	return this;	
}
var controlFns = {
	'index' : function (){
		var activity_id = this.readData('activity_id',this.req.__get, 0);
		var asid = this.readData('asid',this.req.__get, 0);
		var mSelf = this;
		var locationUrl = "http://" + this.req.headers.host + this.req.url;
		var ua = this.req.headers['user-agent'];
		var weixinBrowser = ua.indexOf( 'MicroMessenger' ) > 0;
		// this.debugSnake({'target':'huazhulin.rdlab'});
		var php = {
			'banner' : '/commerce/middlepage_banner_mob?activity_id='+ activity_id
			, 'Shorturl' : '/url/Shorturl?url='+locationUrl
			, 'tabConfig' : '/customactivity/CustomActivity_common_tool_single?id=xuanguan&cid=13491'
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.banner || !data.tabConfig ) return mSelf.errorPage();
			var params = {
				'title' : {
					'weixin' : data.banner.share_words,
					'weixin_timeline' : data.banner.share_words,
					'default' : data.banner.share_words
				},
				'text' : {
					'weixin' : data.banner.pageTitle,
					'weixin_timeline' : data.banner.pageTitle,
					'weibo' : data.banner.pageTitle,
					'qzone' : data.banner.pageTitle,
					'default' : data.banner.pageTitle
				},
				'pic' : {
					'weixin' : data.banner.share_image,
					'weixin_timeline' : data.banner.share_image,
					'default' : data.banner.banner_image
				},
				'url' : data.Shorturl && data.Shorturl.url
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline', 'weixin', 'qzone', 'txweibo']);
			data.asid = asid;
			data.type = 'index';
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = data.banner && data.banner.pageTitle;
			data._CSSLinks = ['activity/xuanguan'];
			mSelf.render('activity/xuanguan.html', data);
		});
	},
	'cps' : function(){
		var asid = this.readData('asid',this.req.__get, 0);
		var mSelf = this;
		var locationUrl = "http://" + this.req.headers.host + this.req.url + '&isFromShare=true';
		var ua = this.req.headers['user-agent'];
		var weixinBrowser = ua.indexOf( 'MicroMessenger' ) > 0;
		var php = {
			'banner' : '/commerce/middlepage_banner_mob?activity_id='+ activity_id
			, 'Shorturl' : '/url/Shorturl?url='+locationUrl
			, 'tabConfig' : '/customactivity/CustomActivity_common_tool_single?id=xuanguan&cid=13491'
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		if(!data.banner) return mSelf.errorPage();	
		data.asid = asid;	
		var params = {
				'title' : {
					'weixin' : data.banner.share_words,
					'weixin_timeline' : data.banner.share_words,
					'default' : data.banner.share_words
				},
				'text' : {
					'weixin' : data.banner.pageTitle,
					'weixin_timeline' : data.banner.pageTitle,
					'weibo' : data.banner.pageTitle,
					'qzone' : data.banner.pageTitle,
					'default' : data.banner.pageTitle
				},
				'pic' : {
					'weixin' : data.banner.share_image,
					'weixin_timeline' : data.banner.share_image,
					'default' : data.banner.banner_image
				},
				'url' : data.Shorturl && data.Shorturl.url
			};
			data.share = wapMod.shareTo(this.req , params);
			data.type = 'cps';
			data.weixinBrowser = weixinBrowser;
			data.pageTitle = data.banner && data.banner.pageTitle;
			data._CSSLinks = ['activity/xuanguan'];
			mSelf.render('activity/xuanguan.html', data);
		});
	}
};
exports.__create = controller.__create(xuanguan_new , controlFns);
