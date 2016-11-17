function zulilyOld() {
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
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'share_info': '/customactivity/CustomActivity_common_tool_single?id=zulily_index',
			'user_stats': '/style/User_stats',
			'coupon': '/style/style_coupons'
		};
		var showTab = this.req.__get.showTab || '';
		if (showTab != 1) {
			php['newHot'] = '/style/style_new_list?flag=banner';
			php['desireList'] = '/customactivity/CustomActivity_common_tool_single?id=desireList';
		} else {
			php['banner'] = '/customactivity/CustomActivity_common_tool_singleNew?id=desireWapBanners';
		}
		var inAppTabbar = parseInt(this.req.__get.inAppTabbar);
		var desireTraceId = this.req.__get.trace_id || "";
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			if (weixinBrowser) {
				connectWX(this, data);
			};
			//自动转换banner链接
			var dataBanner = (data.banner && data.banner.data) || [];
			transformUrl(dataBanner, data.os.mlsApp, data.banner_XR);
			/*share*/
			var trace_id = (data.user_stats && data.user_stats.data.profile.trace_id) || 0;
			var shareList = (data.share_info && data.share_info.data.share_list) || {};
			var params = {
				'title': shareList.share_title,
				'text': shareList.share_text,
				'pic': shareList.weixin_pic,
				'url': "http://mapp.meilishuo.com/zulilyOld?trace_id=" + trace_id
			};
			//分享类型
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
				data.params = params;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			}
			data.banner = dataBanner;
			data.mlsApp = data.os.mlsApp;
			data.inAppTabbar = inAppTabbar;
			data.desireTraceId = desireTraceId;
			 data.pageTitle = 'Desire 潮流同款';
			if (showTab != 1) {
				data.isPrev = false;
				data._CSSLinks = ['zulilyOld/doneSmallNew'];
				this.render('zulilyOld/doneSmallNew.html', data);
			} else {
				data.isPrev = true;
				data._CSSLinks = ['zulilyOld/ing'];
				this.render('zulilyOld/ing.html', data);
			}
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
				'url': 'http://mapp.meilishuo.com/zulilyOld/detail/?style_id=' + styleId + '&trace_id=' + trace_id
			};
			data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			data.weixinBrowser = weixinBrowser;
			data.specialRefer = specialRefer;
			data.styleId = styleId;
			data.desireTraceId = desireTraceId;
			data._CSSLinks = ['zulilyOld/detail'];
			 data.pageTitle = 'Desire 潮流同款';
			this.render('zulilyOld/detail_new.html', data);
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
				"link": 'http://mapp.meilishuo.com/zulilyOld',
				"desc": '潮衣高级定制！一起来定制潮流！',
				"title": '潮衣高级定制！一起来定制潮流！'
			};
			data.isNewest = wapMod.isNewest(this.req, '5.4.0');
			data.mlsHost = host;
			data.params = params;
			data.showTab = showTab;
			data.inAppTabbar = inAppTabbar;
			data.desireTraceId = desireTraceId;
			data._CSSLinks = ['zulilyOld/personal'];
			 data.pageTitle = 'Desire 潮流同款';
			this.render('zulilyOld/personal.html', data);
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
			bannerData.forEach(function(v, i) {
				v.xr = data.banner_XR;
			});
			var params = {
				'title': shareList.share_title,
				'text': shareList.share_text,
				'pic': shareList.weixin_pic,
				'url': "http://mapp.meilishuo.com/zulilyOld/list/" + cid
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
			data._CSSLinks = ['zulilyOld/list'];
			this.render('zulilyOld/list.html', data);
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
			data._CSSLinks = ['zulilyOld/coupon'];
			this.render('zulilyOld/coupon.html', data);
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
			data._CSSLinks = ['zulilyOld/newPush'];
			this.render('zulilyOld/newPush.html', data);
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
			data._CSSLinks = ['zulilyOld/index'];
			 data.pageTitle = 'Desire 潮流同款';
			this.render('zulilyOld/intro.html', data);
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
			data._CSSLinks = ['zulilyOld/introduce'];
			this.render('zulilyOld/introduce.html', data);
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
			data._CSSLinks = ['zulilyOld/publish'];
			 data.pageTitle = 'Desire 潮流同款';
			this.render('zulilyOld/publish.html', data);
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
			data._CSSLinks = ['zulilyOld/push'];
			 data.pageTitle = 'Desire 潮流同款';
			this.render('zulilyOld/push.html', data);
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
			data._CSSLinks = ['zulilyOld/qa'];
			data.cid = cid;
			mSelf.render('zulilyOld/qa.html', data);
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
			data._CSSLinks = ['zulilyOld/answer'];
			mSelf.render('zulilyOld/answer.html', data);
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
			data._CSSLinks = ['zulilyOld/desire320'];
			this.render('zulilyOld/desire320.html', data);
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
			data._CSSLinks = ['zulilyOld/desire-new'];
			this.render('zulilyOld/desire-new.html', data);
		})
	}
};

var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.data.redirect)
		return mSelf.redirectTo(data.connect_weixin.data.redirect, true);
}

var transformUrl = function(arr, isApp, dataXR) {
	arr.forEach(function(v, i) {
		if (!v.url) {
			return;
		}
		if (isApp) {
			if (v.url.match(/meilishuo:\/\//g)) {
				var scheme = v.url.split('?json_params=');
				try {
					var params = scheme[1] ? JSON.parse(decodeURIComponent(scheme[1])) : {};
					params.r = dataXR;
					params = encodeURIComponent(JSON.stringify(params));
				} catch (err) {
					alert(err);
				}
				v.url = scheme[0] + '?json_params=' + params;
			} else {
				v.url = 'meilishuo://openURL.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({
					'url': v.url,
					'r': dataXR
				}));
			}
		} else {
			return;
		}
	});
};
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

exports.__create = controller.__create(zulilyOld, controlFns);