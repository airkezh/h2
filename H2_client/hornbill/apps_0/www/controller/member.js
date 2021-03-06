function member(){
	return this;
}

var controlFns = {
	index: function(args){
		if (args == 'exchange') {
			this.exchange();
		} else if (args == 'list') {
			this.list();
		} else {
			this.exchange();
		}
	},

	main: function(){
		//this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this,
			page = this.readData('page', this.req.__get, 0) | 0,
			php = {
				//'poster0': '/style/Style_list_pc',
				'signData': 'vip::/sign/getInfo',                                                               // 获取签到用户信息 接口
                'percentData': 'vip::/vip/getPercent',                                                          // 获取签到用户超过％数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=pc_member_center&cid=13795'   // 获取会员中心后台配置数据 接口
			};

		self.setDefaultData(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			data.hideNav = true;
			data.hideSearch = true;
			data.hideBindTip = true;
			data.hideHeaderTop = true;
			data.serverDate = new Date();
			//获取分页总数
			/*data.groupPg = {};
			data.groupPg.page_size = data.poster0.page_size;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;*/
			data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
			data.pageTitle = data.pageData.page_title || '会员首页 － 美丽说';
			data._CSSLinks = ['member/main'];
			self.render('member/main.html', data);
		});
	},

	interests: function(){
		//this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this,
			php = {
				'userInfoData': 'vip::/vip/getInfo',                                                            // 获取签到用户数据 接口
                'percentData': 'vip::/vip/getPercent',                                                          // 获取签到用户超过％数据 接口
                'beautyExpireData': 'vip::/vip/getDepletionScore',											    // 获取用户美丽值过期数据 接口
                'beautyDetailData': 'vip::/vip/getPcBeautyDetail?page=1&page_size=20'							// 获取用户美丽值明细数据 接口
			};

		self.setDefaultData(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			var totalPage = 0;

			if (data.beautyDetailData && data.beautyDetailData.data) {
				totalPage = parseInt(data.beautyDetailData.data.count) || 0;
			}

			// 获取分页总数
			data.groupPg = {
				'total_num': totalPage,
				'current_page': 0,
				'page_size': 20
			};

			data.hideNav = true;
			data.hideSearch = true;
			data.hideBindTip = true;
			data.hideHeaderTop = true;
			data.serverDate = new Date();
			data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
			data.pageTitle = '会员特权 － 美丽说';
			data._CSSLinks = ['member/interests'];
			self.render('member/interests.html', data);
		});
	},

	beans_interests: function(){
		//this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this,
			php = {
				'signData': 'vip::/sign/getInfo',                                                               // 获取签到用户信息 接口
				'beansDetailData': 'doota::/coin/get_list_beans_pc?page=1&count=20'							    // 获取用户美美豆明细数据 接口
			};

		self.setDefaultData(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			var totalPage = 0;

			if (data.beansDetailData && data.beansDetailData.data) {
				totalPage = parseInt(data.beansDetailData.data.total) || 0;
			}

			// 获取分页总数
			data.groupPg = {
				'total_num': totalPage,
				'current_page': 0,
				'page_size': 20
			};

			data.hideNav = true;
			data.hideSearch = true;
			data.hideBindTip = true;
			data.hideHeaderTop = true;
			data.serverDate = new Date();
			data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
			data.pageTitle = '美美豆特权 － 美丽说';
			data._CSSLinks = ['member/beans_interests'];
			self.render('member/beans_interests.html', data);
		});
	},

	exchange: function(){
		var php = {
			//拉去活动产品及兑换状态
			'exchange_status' : '/customactivity/CustomActivity_user_point_goods_status?id=member_exchange&cid=303',
			//首次领取状态 
			'hasGet_status' : '/customactivity/CustomActivity_user_point_status',
			//会员基本信息
			'user_info' : '/customactivity/CustomActivity_user_point_info',
			//兑换操作
			'exchange_add' : '/customactivity/CustomActivity_user_point_exchange_add',
			// 换购活动接口(所有商品/配置信息)
			'act_info' : '/customactivity/CustomActivity_common_tool_single?id=member_exchange&cid=303&preview=true'
		};

		var frm = this.readData('frm',this.req.__get, ''); 
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		// if(!data.userInfo.user_id) return mSelf.redirectTo('/user/login' ,true);
			data.pageTitle = '会员中心 - 美丽说';
			data.headTag = 'member';
			data._CSSLinks = ['member/member'];
			mSelf.render('member/member.html' , data);
		});
	},

	list: function(){
		var php = {
			// 积分记录
			'point_list': '/customactivity/CustomActivity_user_point_list?page_size=10',
			//会员基本信息
			'user_info': '/customactivity/CustomActivity_user_point_info'
		};

		var page = this.readData('page',this.req.__get, 0)|0;
		var frm = this.readData('frm', this.req.__get, '');
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo('/member/member' ,true);
			data.groupPg = {};
			data.groupPg.total_num = data.point_list.pages.total_num;
			data.groupPg.page_size = data.point_list.page_size || 10;
			data.groupPg.current_page = page;	

			data.pageTitle = '会员积分记录 - 美丽说';
			data.headTag = 'member';
			data._CSSLinks = ['member/member'];
			mSelf.render('member/list.html' , data);
		});
	}
}
exports.__create = controller.__create(member , controlFns);
