function welfare() {
	return this;
}
var controlFns = {
	'index': function() {
		var page = this.readData('page', this.req.__get, 0) | 0;
		var php = {
			'welfare_sidebar': '/welfare/welfare_sidebar',
			'welfare_tailer': '/welfare/welfare_tailer',
			'welfare_list': '/welfare/welfare_list',
			'adm': '/adm/ad_Show?slot_id=23',
			'wf_girl': '/person/user_info?user_id=34143831'
		}
		if(page === 0) php['welfare_top'] = '/welfare/Welfare_top_list';
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if(!data.welfare_list.list) return mSelf.errorPage();
			//hack 优惠券漂浮
			data.reg_feedback = false;
			data.onlyShowGoTop = true;
			data.pageTitle = '福利社 - 美丽说';
			data.keywords = '免费,试用,试穿,福利社,美丽说'
			//			base.var_dump(data.welfare_list , false , 5)
			//data.headTag = 'welfare';
			data.canteen = true;
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.welfare_list.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 10;
			data._CSSLinks = ['welfare'];
			//true 二级导航
			data.brandSecondNav = true;
			mSelf.render('welfare/welfare.html', data);
		});
	},
	'activity': function(actid) {
		var page = this.readData('page', this.req.__get, 0) | 0;
		if(!actid || actid == 0) return this.errorPage();
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + actid,
			'wl_sider': '/welfare/Welfare_new_list?activity_id=' + actid,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + actid,
			'wf_girl': '/person/user_info?user_id=34143831',
			'wl_main': '/welfare/welfare_activity_list?activity_id=' + actid,
			'wf_form': '/welfare/Welfare_activity_apply_form?activity_id=' + actid
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if(!data.wl_info) return mSelf.errorPage();
			//hack 优惠券漂浮
			data.reg_feedback = false;
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host;
			//	data.pageTitle = '福利社-' + data.wl_header.title;
			data.pageTitle = data.wl_header.title + '试用装,免费,试用-美丽说';
			data.keywords = '免费,试用,试穿,福利社,美丽说'
			//data.headTag = 'welfare';
			data.canteen = true;
			data.groupPg = {};
			data.groupPg.total_num = data.wl_main.totalnum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			data._CSSLinks = ['welfare'];
			//true 二级导航
			data.brandSecondNav = true;
			data.onlyShowGoTop = true;
			mSelf.render('welfare/welfare_con.html', data);
		});
	}
};
exports.__create = controller.__create(welfare, controlFns);
