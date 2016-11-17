function m_welfare() {
	return this;
};

var controlFns = {
	'index': function() {
		var mSelf = this;
		var php = {
			'wlf_list': '/welfaremob/welfare_list',
			//'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner'

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			//console.log(data.userInfo);
			data._CSSLinks = ['m_welfare/m_welfare'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/m_welfare/wlf_list';
			//现在的时间
			mSelf.render('m_welfare/index.html', data);
		});
	},
	'mywlf': function() {
		var mSelf = this;
		var php = {
			'wlf_list': '/welfaremob/welfare_list',
			'my_wlf': '/welfaremob/welfare_my_apply',
			'b_banner': '/welfaremob/welfare_activity_banner'

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['m_welfare/m_welfare'];
			data.pageTitle = "福利社";
			data.geturl = '/aj/m_welfare/wlf_my_wlf';
			//现在的时间
			mSelf.render('m_welfare/mywlfList.html', data);
		});
	},
	'indexReport': function() {
		//精彩试用页面
		var mSelf = this;
		var php = {
			'goodReport': '/welfaremob/Welfare_report_recommend',
			'b_banner': '/welfaremob/welfare_activity_banner'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['m_welfare/m_welfare'];
			data.pageTitle = "福利社";
			mSelf.render('m_welfare/wlfReportList.html', data);
		});
	},
	'item': function(item_id) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!item_id || item_id == 0) return this.errorPage();
		var php = {
			'wlf_info': '/welfaremob/welfare_activity_head?activity_id=' + item_id,
			'wlf_lucky_avatar': '/welfaremob/Welfare_activity_lucky_avatar?activity_id=' + item_id
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
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
			'apply_info': '/welfaremob/welfare_activity_apply_info?activity_id=' + item_id
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//			data.nick_name = data.apply_info.info.realname;
			//			data.phone = data.apply_info.info.mobile;
			//			data.street = data.apply_info.info.shipping_address;
			data.address = {
				"nickname": data.apply_info.info.realname,
				"phone": data.apply_info.info.mobile,
				"street": data.apply_info.info.shipping_address
			};
			data.active_id = item_id;
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.pageTitle = "详情";
			mSelf.render('m_welfare/wlf_apply.html', data);
		});
	},
	'regular': function(item_id) {
		var mSelf = this;
		var php = {
			'wlf_lucky_avatar': 'http://wchm.fedevot.meilishuo.com/m_welfare?activity_id＝' + item_id
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
			'wlf_lucky_avatar': '/welfaremob/Welfare_activity_lucky_avatar?activity_id=' + item_id + "&pageSize=35"
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
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
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
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
			'report': '/welfaremob/Welfare_report_show?report_id=' + report_id
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = "修改报告";
			data.report_id=report_id;
			data.content=data.report.info.trial_content.replace(/<br \/>|<br\/>/g, "");
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
			'report': '/welfaremob/Welfare_report_show?report_id=' + report_id,
			'commentList':'/welfaremob/Welfare_report_comment_list?report_id='+report_id
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
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
			data.itemId=report_id;
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
			'reportList': '/welfaremob/Welfare_report_list?activity_id=' + activity_id
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = "福利社";
			data._CSSLinks = ['m_welfare/m_welfare_list'];
			data.activity_id = activity_id;
			mSelf.render('m_welfare/wlf_singleReportList.html', data);
		});
	}

};

exports.__create = controller.__create(m_welfare, controlFns);