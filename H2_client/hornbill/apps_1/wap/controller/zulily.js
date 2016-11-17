function zulily() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]()
	},
	main: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var phpStr = '/style/Style_home_express?';
		var php = {
			'banner': phpStr + 'page_name=banner',
			'entrance': phpStr + 'page_name=entrance',
			'newList': '/style/style_new_list?flag=list&wideLimit=5&page=0',
			'catalog': phpStr + 'page_name=catalog',
			'express': '/style/Style_express_list?limit=20&cid=13259&page=0'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			var dataBanner = (data.banner && data.banner.data) || [];
			data.banner = dataBanner;
			data.pageTitle = 'Desire 潮流同款';
			data._CSSLinks = ['zulily/main'];
			this.render('zulily/main.html', data);
		});
	},
	newList: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'newHot': '/style/style_new_list?flag=banner',
			'banner': '/customactivity/CustomActivity_common_tool_single?id=desire-new-banner'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			var dataBanner = (data.banner && data.banner.data) || [];
			data.banner = dataBanner;
			data.pageTitle = 'Desire 潮流同款';
			data._CSSLinks = ['zulily/newList'];
			this.render('zulily/newList.html', data);
		});
	},
	allList: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'desireList': '/customactivity/CustomActivity_common_tool_single?id=desireList2',
			'banner': '/customactivity/CustomActivity_common_tool_single?id=desire-all-banner'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			var dataBanner = (data.banner && data.banner.data) || [];
			data.banner = dataBanner;
			data.pageTitle = 'Desire 潮流同款';
			data._CSSLinks = ['zulily/allList'];
			this.render('zulily/allList.html', data);
		});
	},
	specialList: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var php = {};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			data.pageTitle = 'Desire 潮流抢先';
			data._CSSLinks = ['zulily/specialList'];
			this.render('zulily/specialList.html', data);
		});
	},
	miaosha: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var phpStr = '/style/Style_home_express?';
		var php = {
			'banner': phpStr + 'page_name=specialOffer'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			data.pageTitle = 'Desire 限时特优';
			data._CSSLinks = ['zulily/miaosha'];
			this.render('zulily/miaosha.html', data);
		});
	},
	ing: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'banner': '/customactivity/CustomActivity_common_tool_singleNew?id=desireWapBanners'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			var dataBanner = (data.banner && data.banner.data) || [];
			data.banner = dataBanner;
			data.pageTitle = 'Desire 待我挑选';
			data._CSSLinks = ['zulily/ing'];
			this.render('zulily/ing.html', data);
		});
	},
	detail: function() {
		//this.debugSnake({'target':'devlab1'});
		var styleId = parseInt(this.req.__get.style_id);
		var desireTraceId = this.req.__get.trace_id || "";
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var refer = this.req.headers.referer + '';
		var specialRefer = refer.indexOf('activity/fwindow') > 0;
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'connect_weixin': '/connect/weixin?type=1' //拉用户信息
				,
			'danmu': '/style_remark/style_remark_list',
			'style': '/style/style_main',
			'picData': '/style/style_want_users?style_id=' + styleId
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			// if (!data.tab || !data.shop) {
			// 	return this.errorPage();
			// }
			//r参数
			setR(data, php);
			if (weixinBrowser) connectWX(this, data);
			var shareList = (data.style && data.style.data) || {};
			var trace_id = shareList.trace_id || 0;
			var params = {
				'title': {
					"weixin": "Desire全球潮人同款，一起定制潮流！",
					"weixin_timeline": shareList.title,
					"qzone": "Desire全球潮人同款，一起定制潮流！",
					"weibo": shareList.title,
					"default": shareList.title
				},
				'text': shareList.title,
				'pic': {
					"weixin": shareList.share_img,
					"weixin_timeline": shareList.share_img,
					"default": shareList.share_img
				},
				'url': 'http://mapp.meilishuo.com/zulily/detail/?style_id=' + styleId + '&trace_id=' + trace_id
			};
			data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			data.weixinBrowser = weixinBrowser;
			data.specialRefer = specialRefer;
			data.styleId = styleId;
			data.desireTraceId = desireTraceId;
			data._CSSLinks = ['zulily/detail'];
			data.pageTitle = 'Desire 潮流同款';
			this.render('zulily/detail_new.html', data);
		});
	},
	personal: function() {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			'getHeaderData': '/style/user_stats',
			'share_info': '/customactivity/CustomActivity_common_tool_single?id=zulily_index'
		};
		var host = this.req.headers.host;
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		var showTab = this.req.__get.showTab;
		var desireTraceId = this.req.__get.trace_id || "";
		var wapMod = this.loadModel('tools.js');
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			// if (!data.tab || !data.shop) {
			// 	return this.errorPage();
			// }
			//r参数
			setR(data, php);
			var shareList = (data.share_info && data.share_info.data.share_list) || {};
			var params = {
				"img_url": 'http://d06.res.meilishuo.net/img/_o/7a/ea/d25fee3f7f1c1d3106d9d14f811d_200_200.ch.jpg',
				"img_width": "640",
				"img_height": "640",
				"link": 'http://mapp.meilishuo.com/zulily',
				"desc": '潮衣高级定制！一起来定制潮流！',
				"title": '潮衣高级定制！一起来定制潮流！'
			};
			data.isNewest = wapMod.isNewest(this.req, '5.4.0');
			data.mlsHost = host;
			data.params = params;
			data.showTab = showTab;
			data.inAppTabbar = inAppTabbar;
			data.desireTraceId = desireTraceId;
			data._CSSLinks = ['zulily/personal'];
			data.pageTitle = 'Desire 潮流同款';
			this.render('zulily/personal.html', data);
		});
	},
	list: function(cid) {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			'banner': '/customactivity/CustomActivity_common_tool_single?id=desireListPage&cid=' + cid,
			'share_info': '/customactivity/CustomActivity_common_tool_single?id=zulily_index'
		};
		var wapMod = this.loadModel('tools.js');
		var cid = cid || parseInt(this.req.__get.cid);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			var shareList = (data.share_info && data.share_info.data.share_list) || {};
			var bannerData = (data.banner && data.banner.data) || [];
			var params = {
				'title': shareList.share_title,
				'text': shareList.share_text,
				'pic': shareList.weixin_pic,
				'url': "http://mapp.meilishuo.com/zulily/list/" + cid
			};
			//分享类型
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
				data.params = params;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			}
			data.banner = bannerData;
			data.cid = cid;
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/list'];
			this.render('zulily/list.html', data);
		})
	},
	coupon: function() {
		// this.debugSnake({'target':'maoanli.rdlab'});
		var php = {
			'coupon': '/style/style_coupons',
			'rules': '/customactivity/CustomActivity_common_tool_single?id=desireCoupon'
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/coupon'];
			this.render('zulily/coupon.html', data);
		})
	},
	newPush: function(cid) {
		// this.debugSnake({'target':'maoanli.rdlab'});
		var cid = cid || parseInt(this.req.__get.cid);
		var php = {
			'head': '/style/Style_push_page?cid=' + cid
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data.cid = cid;
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/newPush'];
			this.render('zulily/newPush.html', data);
		})
	},
	intro: function() {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			'share_info': '/customactivity/CustomActivity_common_tool_single?id=zulily_index'
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data._CSSLinks = ['zulily/index'];
			data.pageTitle = 'Desire 潮流同款';
			this.render('zulily/intro.html', data);
		});
	},
	introduce: function(cid) {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			'imgArray': '/customactivity/CustomActivity_common_tool_single?id=desireIntroduce&cid=' + cid
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/introduce'];
			this.render('zulily/introduce.html', data);
		})
	},
	publish: function() {
		//this.debugSnake({'target':'devlab1'});
		var php = {};
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		// var wapMod = this.loadModel('tools.js');
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			// data.isNewest = wapMod.isNewest(this.req, '5.4.0');
			data.inAppTabbar = inAppTabbar;
			data._CSSLinks = ['zulily/publish'];
			data.pageTitle = 'Desire 潮流同款';
			this.render('zulily/publish.html', data);
		});
	},
	push: function() {
		//this.debugSnake({'target':'devlab1'});
		var php = {};
		// var inAppTabbar=parseInt(this.req.__get.inAppTabbar);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			// data.inAppTabbar=inAppTabbar;
			data._CSSLinks = ['zulily/push'];
			data.pageTitle = 'Desire 潮流同款';
			this.render('zulily/push.html', data);
		});
	},
	qa: function(cid) {
		var mSelf = this;
		var php = {};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/qa'];
			data.cid = cid;
			mSelf.render('zulily/qa.html', data);
		})
	},
	answer: function(cid) {
		var mSelf = this;
		var php = {
			list: '/customactivity/CustomActivity_common_tool_single?id=higo_qa&cid=' + cid
		};
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			data.goods_title = "Desire 潮流同款";
			data.pageTitle = data.goods_title;
			data._CSSLinks = ['zulily/answer'];
			mSelf.render('zulily/answer.html', data);
		})
	},
	desire320: function(cid) {
		//this.debugSnake({'target':'devlab1'});
		var php = {
			// desire320Data:'/customactivity/CustomActivity_common_tool_singleNew?id=desire320&cid=' + cid,
			listData: '/style/style_list?cid=' + cid
		};
		var wapMod = this.loadModel('tools.js');
		var host = this.req.headers.host;
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		var cid = this.req.__get.cid || "";
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
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
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/desire320'];
			this.render('zulily/desire320.html', data);
		})
	},
	'desire-new': function(cid) {
		var php = {
			// 'desire320Data':'/customactivity/CustomActivity_common_tool_singleNew?id=desire320&cid=' + cid,
			'listData': '/style/style_list?cid=' + cid
		};
		var wapMod = this.loadModel('tools.js');
		var host = this.req.headers.host;
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
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
			data.pageTitle = "Desire 潮流同款";
			data._CSSLinks = ['zulily/desire-new'];
			this.render('zulily/desire-new.html', data);
		})
	}
};

var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.data.redirect)
		return mSelf.redirectTo(data.connect_weixin.data.redirect, true);
};

//微信互联和分享信息
function weixinShare(php) {
	php['connect_weixin'] = '/connect/weixin?type=1';
	php['share_info'] = '/customactivity/CustomActivity_common_tool_single?id=zulily_index';
}

function setWeixinShare(data, self, wapMod) {
	var weixinBrowser = data.os.weixinBrowser;
	if (weixinBrowser) {
		connectWX(self, data);
	};
	/*share*/
	var shareList = (data.share_info && data.share_info.data.share_list) || {};
	var params = {
		'title': shareList.share_title,
		'text': shareList.share_text,
		'pic': shareList.weixin_pic,
		'url': "http://mapp.meilishuo.com/zulily"
	};
	//分享类型
	if (wapMod.isNewest(self.req, '6.6.0')) {
		data.appShare = true;
		data.params = params;
	} else {
		data.appShare = false;
		data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
	}
}

//获取R参数
function getR(php) {
	for (var i in php) {
		if (php[i].indexOf('?') == -1) {
			php[i] = php[i] + '?__get_r=1';
		} else {
			php[i] = php[i] + '&__get_r=1';
		}
	}
	php.common_r = '/statistics/referer?__get_r=1';
}
// 开启并设置R
function setR(data, php) {
	data.XR = true;
	for (var i in php) {
		data[i + '_XR'] = (data[i] && data[i].r) || '';
	}
}

exports.__create = controller.__create(zulily, controlFns);