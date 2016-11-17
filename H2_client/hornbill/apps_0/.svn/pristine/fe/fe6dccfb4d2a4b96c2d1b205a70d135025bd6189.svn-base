function desire() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]()
	},
	main: function() {
		// this.debugSnake({'target':'devlab1'});
		this.redirectTo("/zulily");
		return;
		var wapMod = base.loadModel('wap/tools.js');
		var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res));
		var mlsApp = os.mlsApp;
		var showTab = this.req.__get.showTab;
		(showTab != 1) && (showTab = 0);
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'share_info': '/customactivity/CustomActivity_common_tool_single?id=zulily_index',
			'user_stats': '/style/User_stats',
			'coupon': '/style/style_coupons',
			'banner': '/customactivity/CustomActivity_common_tool_singleNew?id=desireWapBanners',
			'recommend': '/style/style_list?status=done&showTab=' + showTab,
		};
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		var desireTraceId = this.req.__get.trace_id || "";
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (weixinBrowser) {
				connectWX(this, data);
			};
			//自动转换banner链接
			var dataBanner = (data.banner && data.banner) || [];
			dataBanner.forEach(function(v, i) {
				if (mlsApp) {
					if (v.url.match(/meilishuo:\/\//g)) {
						return;
					} else {
						v.url = 'meilishuo://openURL.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({
							'url': v.url
						}));
					}
				} else {
					return;
				}
			});
			/*share*/
			var trace_id = (data.user_stats && data.user_stats.data.profile.trace_id) || 0;
			var shareList = (data.share_info && data.share_info.share_list) || {};
			var params = {
				'title': shareList.share_title,
				'text': shareList.share_text,
				'pic': {
					"weixin": shareList.weixin_pic,
					"weixin_timeline": shareList.weixin_pic,
					"default": shareList.qzone_pic
				},
				'url': "http://mapp.meilishuo.com/desire?trace_id=" + trace_id
			};
			data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			data.mlsApp = mlsApp;
			data.inAppTabbar = inAppTabbar;
			data.desireTraceId = desireTraceId;
			data.pageTitle = 'Desire 全球潮流追踪';
			if (showTab == 0) {
				data.isPrev = true;
				data._CSSLinks = ['desire/ingSmall'];
				this.render('desire/ingSmall.html', data);
			} else {
				data.isPrev = false;
				data._CSSLinks = ['desire/doneSmall'];
				this.render('desire/doneSmall.html', data);
			}
		});
	},
	'introduce': function(cid) {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			'imgArray': '/customactivity/CustomActivity_common_tool_single?id=desireIntroduce&cid=' + cid
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = "Desire 全球潮流追踪";
			data._CSSLinks = ['desire/introduce'];
			this.render('desire/introduce.html', data);
		})
	},
	'desire320': function(cid) {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			listData: '/style/style_list?cid=' + cid
		};
		var wapMod = this.loadModel('tools.js');
		var host = this.req.headers.host;
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		var cid = this.req.__get.cid || "";
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//十万件不需要分享
			if (cid != 8147) {
				var shareData = (data.listData && data.listData.data.share) || {};
				var params = {
					'title': shareData.title,
					'text': shareData.text,
					'pic': shareData.pic,
					'url': shareData.url
				};
				data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
				data.shareData = shareData;
			}
			data.mlsHost = host;
			data.cid = cid;
			data.inAppTabbar = inAppTabbar;
			data.pageTitle = "Desire 全球潮流追踪";
			data._CSSLinks = ['desire/desire320'];
			this.render('desire/desire320.html', data);
		})
	},
	'desire-new': function(cid) {
		var php = {
			listData: '/style/style_list?cid=' + cid
		};
		var wapMod = this.loadModel('tools.js');
		var host = this.req.headers.host;
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			var shareData = (data.listData && data.listData.data.share) || {};
			var params = {
				'title': shareData.title,
				'text': shareData.text,
				'pic': shareData.pic,
				'url': shareData.url
			};
			data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			data.shareData = shareData;
			data.mlsHost = host;
			data.inAppTabbar = inAppTabbar;
			data.pageTitle = "Desire 全球潮流追踪";
			data._CSSLinks = ['desire/desire-new'];
			this.render('desire/desire-new.html', data);
		})
	}
};

var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect, true);
}

exports.__create = controller.__create(desire, controlFns);