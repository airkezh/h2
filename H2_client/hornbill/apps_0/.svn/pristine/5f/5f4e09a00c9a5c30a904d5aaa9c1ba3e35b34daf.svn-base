function m_welfare() {
	return this;
};

var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index_new': function() {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_list': '/welfaremob/welfare_list',
			//'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'connect_sq': '/connect/shouq?type=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//console.log(data.userInfo);
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			data.test = Meilishuo.config.os.mobileQQ;

			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/m_welfare/wlf_list';
			//现在的时间
			mSelf.render('m_welfare/index.html', data);
		});
	},
	'index': function() {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_list': '/welfaremob/welfare_list',
			'wlf_new': '/welfaremob/Welfare_top',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'act_list': '/welfaremob/Welfare_activity_list',
			'connect_sq': '/connect/shouq?type=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare', 'm_welfare/m_welfare_new'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/single_aj/m_welfare/wlf_activity_list';
			mSelf.render('m_welfare/index_new.html', data);
		});
	},
	'mywlf': function() {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_list': '/welfaremob/welfare_list',
			'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'user_info': '/user/headinfo',
			'wlf_apply': '/welfaremob/Welfare_apply_list?type=wait',
			'connect_sq': '/connect/shouq?type=1'

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare', 'm_welfare/m_welfare_new'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/single_aj/m_welfare/wlf_apply_wait';
			mSelf.render('m_welfare/my_wlf_apply.html', data);
		});
	},
	'mywlf_unpast': function() {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_list': '/welfaremob/welfare_list',
			'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'user_info': '/user/headinfo',
			'wlf_apply': '/welfaremob/Welfare_apply_list?type=fail',
			'connect_sq': '/connect/shouq?type=1'

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare', 'm_welfare/m_welfare_new'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/single_aj/m_welfare/wlf_apply_fail';
			mSelf.render('m_welfare/my_wlf_unpast.html', data);
		});
	},
	'mywlf_past': function() {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_list': '/welfaremob/welfare_list',
			'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'user_info': '/user/headinfo',
			'wlf_apply': '/welfaremob/Welfare_apply_list?type=pass',
			'connect_sq': '/connect/shouq?type=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare', 'm_welfare/m_welfare_new'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/single_aj/m_welfare/wlf_apply_pass';
			mSelf.render('m_welfare/my_wlf_past.html', data);
		});
	},
	'indexReport': function() {
		//精彩试用页面
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'goodReport': '/welfaremob/Welfare_report_recommend',
			'b_banner': '/welfaremob/welfare_activity_banner',
			'connect_sq': '/connect/shouq?type=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data._CSSLinks = ['m_welfare/m_welfare', 'm_welfare/m_welfare_new'];
			data.pageTitle = "福利社";
			mSelf.render('m_welfare/wlfReportList_new.html', data);
		});
	},
	'item': function(item_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!item_id || item_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_info': '/welfaremob/welfare_activity_head?activity_id=' + item_id,
			'wlf_lucky_avatar': '/welfaremob/Welfare_activity_lucky_avatar?activity_id=' + item_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			if (!data.wlf_info) return mSelf.errorPage();
			var t = data.wlf_info.info.weixin_content;
			var p = data.wlf_info.info.weixin_pic;
			var sp = data.wlf_info.info.weixin_pic;
			var c = data.wlf_info.info.weixin_content;
			var locationUrl = this.req.url;
			var params = {
				'title': {
					'weixin': t,
					'weixin_timeline': t,
					'default': t
				},
				'text': {
					'weixin': c,
					'weixin_timeline': c,
					'default': c
				},
				'pic': {
					'weixin': sp,
					'weixin_timeline': sp,
					'default': p
				},
				'url': locationUrl
					// 'url' : shareURL
			};

			//, ['weixin_timeline', 'weixin']
			data.share = wapMod.shareTo(this.req, params);
			data.wlf_header = data.wlf_info.info;
			data.wlf_lucky = data.wlf_lucky_avatar;
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.pageTitle = "福利社";
			/*请求参数*/
			//data.cata=this.readData("cata",this.req.__get,0);
			mSelf.render('m_welfare/m_welfare_item.html', data);
		})
	},
	'apply': function(item_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!item_id || item_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'apply_info': '/welfaremob/welfare_activity_apply_info?activity_id=' + item_id,
			'wlf_info': '/welfaremob/welfare_activity_head?activity_id=' + item_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data.address = {
				"nickname": data.apply_info.info.realname,
				"phone": data.apply_info.info.mobile,
				"street": data.apply_info.info.shipping_address
			};
			data.active_id = item_id;
			data._CSSLinks = ['m_welfare/m_welfare_list', 'm_welfare/m_welfare_new'];
			data.pageTitle = "详情";
			mSelf.render('m_welfare/wlf_apply.html', data);
		});
	},
	'regular': function(item_id) {
		var mSelf = this;
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_lucky_avatar': 'http://wchm.fedevot.meilishuo.com/m_welfare?activity_id＝' + item_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.pageTitle = "福利社";
			/*请求参数*/
			//data.cata=this.readData("cata",this.req.__get,0);
			mSelf.render('m_welfare/wlf_regular.html', data);
		})
	},
	'lucky': function(item_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!item_id || item_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_lucky_avatar': '/welfaremob/Welfare_activity_lucky_avatar?activity_id=' + item_id + "&pageSize=35",
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			if (!data.wlf_lucky_avatar) return mSelf.errorPage();
			data.wlf_lucky = data.wlf_lucky_avatar.list;
			data.activity_id = item_id;
			//data.geturl = '/aj/m_welfare/wlf_lucky?activity_id=' + item_id;
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.pageTitle = "福利社";
			/*请求参数*/
			//data.cata=this.readData("cata",this.req.__get,0);
			mSelf.render('m_welfare/wlf_lucky.html', data);
		});
	},
	'subReport': function(activity_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!activity_id || activity_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data.pageTitle = "编写报告";
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.active_id = activity_id;
			mSelf.render('m_welfare/wlf_subReport.html', data);
		});
	},
	'updateReport': function(report_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!report_id || report_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'report': '/welfaremob/Welfare_report_info?report_id=' + report_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data.pageTitle = "修改报告";
			data.report_id = report_id;
			data.content = data.report.info.trial_content.replace(/<br \/>|<br\/>/g, "");
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			//data.active_id = activity_id;
			mSelf.render('m_welfare/wlf_updateReport.html', data);
		});
	},
	'reprotDetails': function(report_id) {
		//报告详情页
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!report_id || report_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'report': '/welfaremob/Welfare_report_show?report_id=' + report_id,
			'commentList': '/welfaremob/Welfare_report_comment_list?report_id=' + report_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			/*share start*/
			var t = data.report.info.trial_title;
			var p = data.report.info.trial_pics[0];
			var sp = data.report.info.trial_pics[0];
			var c = data.report.info.trial_title;
			var locationUrl = this.req.url;
			var params = {
				'title': {
					'weixin': t,
					'weixin_timeline': t,
					'default': t
				},
				'text': {
					'weixin': c,
					'weixin_timeline': c,
					'default': c
				},
				'pic': {
					'weixin': sp,
					'weixin_timeline': sp,
					'default': p
				},
				'url': locationUrl
					// 'url' : shareURL
			};
			data.share = wapMod.shareTo(this.req, params);
			/*share end*/
			data.itemId = report_id;
			data.pageTitle = "试用报告";
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			mSelf.render('m_welfare/wlf_reportDetail.html', data);
		});
	},
	'reprotList': function(activity_id) {
		//welfareReprotList.html
		//报告聚合页
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!activity_id || activity_id == 0) return this.errorPage();
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'reportList': '/welfaremob/Welfare_report_list?activity_id=' + activity_id,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			/*sq connect*/
			var os = wapMod.uaos(this.req);
			var qqBrowser = os.mobileQQ;
			if (qqBrowser) {
				wapMod.connectSQ(this, data)
			}
			/**sq end*/
			data.pageTitle = "福利社";
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.activity_id = activity_id;
			mSelf.render('m_welfare/wlf_singleReportList.html', data);
		});
	},
	'applyEnd': function(item_id) {
		//申请完成页面
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!item_id || item_id == 0) return this.errorPage();
		var shopId = this.readData('shop_id', this.req.__get, '');
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'wlf_info': '/welfaremob/welfare_activity_head?activity_id=' + item_id,
			'wlf_coupon': '/welfaremob/Welfare_shop_coupon?shop_id=' + shopId,
			'connect_sq': '/connect/shouq?type=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*wx connect*/
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			if (weixinBrowser) {
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			/*wx end*/
			data.wlf_header = data.wlf_info.info;
			data.shopId = shopId;
			data.pageTitle = "完成申请";
			data._CSSLinks = ['m_welfare/m_welfare_list', 'm_welfare/m_welfare_new'];
			mSelf.render('m_welfare/wlf_apply_end.html', data);
		});
	}

};
/*微信互联*/
var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect, true);
}
exports.__create = controller.__create(m_welfare, controlFns);