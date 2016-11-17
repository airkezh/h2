
function club(){
	return this;
}
var controlFns = {
	'index' : function(param){
		if (param == 'new') {
			this.new();
			return;
		} else if (param == 'newTopic'){
			return this.newTopic();
		} else if (param == 'newShoppingTopic'){
			return this.newShoppingTopic();
		} else if (param){
			return this.errorPage();
		} else {
			// 只留下晒单相关帖子
			return this.main();
		}
		var page = this.readData('page',this.req.__get, 0)|0;
		var board_id = this.readData('bid', this.req.__get, 0)|0;
		var sort = this.readData('sort', this.req.__get, 'reply');
		this.req.__get.board_id = board_id;
		var php = {
			'user_rec' : '/club/article_user_recommend',
			'board_list' : '/club/board_list',
			'board_info' : '/club/board_info',
			'club_guide' : '/club/close_tips?status=2'
		};
		//轮播广告 by yaoyao
		php['adm63'] = '/adm/ad_Show?slot_id=63'
		if (sort == 'reply')
			php['board_list'] = '/club/board_newreply_list';
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.board_list, false, 5);
		//	base.var_dump(data.user_rec, false, 5)
			var desps = {
				'0' : '时尚女性购物论坛消费分享社区，集合百万MM购物心得分享，时尚穿搭、潮流大片、时尚问答帮你解决时尚困扰，更有超高人气美丽说达人，分享每日生活的点滴心情，与你一起变美变漂亮',
				'101' : '购物，晒单上美丽说，和百万MM一起分享自己的自己的购物经历,晒出自己的埋单历程。',
				'102' : '时尚look，了解最新时尚视点，让你时尚购物走在最前沿。',
				'103' : '时尚穿衣搭配，街拍时尚服饰潮流，轻松抓住时尚MM搭配潮流',
				'104' : '购物、衣服搭配、时尚潮流咨询，咨询集中地'
			}
			var titles = {
				'0' : '爱美丽Club'
			}
			var _board_info = data.board_info || '';
			for (var i = 0, k = _board_info.length; i < k; i++) {
				titles['' + _board_info[i].board_id] = _board_info[i].board_title;
			}
			var keywords = {
				'0' : '爱美丽Club',
				'101' : '购物、晒单',
				'102' : '时尚',
				'103' : '衣服搭配',
				'104' : '购物资讯、时尚咨询'
			}
			if (!titles[board_id]) board_id = 0
			data.meta_description = desps[board_id];
			data.pageTitle = titles[board_id] + '-美丽说';
			data.keywords = keywords[board_id];

			data.headTag = 'club';
			data._CSSLinks = ['club'];
			data.board_id = board_id;
			data.sort = sort;
			data.groupPg = {}; 
			data.groupPg.total_num = data.board_list.pages.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('club/club.html', data);
		});
	},
	'main' : function(param){
		var page = this.readData('page',this.req.__get, 0)|0;
		var board_id = this.readData('bid', this.req.__get, 0)|0;
		var sort = this.readData('sort', this.req.__get, 'reply');
		this.req.__get.board_id = board_id;
		var php = {
			'user_rec' : '/club/article_user_recommend',
			'board_list' : '/club/shoppingshow_list',
			'club_guide' : '/club/close_tips?status=2'
		};
		//轮播广告 by yaoyao
		php['adm63'] = '/adm/ad_Show?slot_id=63'
		if (sort == 'reply')
			php['board_list'] = '/club/shoppingshow_list?selected=1';
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var desps = {
				'0' : '时尚女性购物论坛消费分享社区，集合百万MM购物心得分享，时尚穿搭、潮流大片、时尚问答帮你解决时尚困扰，更有超高人气美丽说达人，分享每日生活的点滴心情，与你一起变美变漂亮',
				'101' : '购物，晒单上美丽说，和百万MM一起分享自己的自己的购物经历,晒出自己的埋单历程。',
				'102' : '时尚look，了解最新时尚视点，让你时尚购物走在最前沿。',
				'103' : '时尚穿衣搭配，街拍时尚服饰潮流，轻松抓住时尚MM搭配潮流',
				'104' : '购物、衣服搭配、时尚潮流咨询，咨询集中地'
			}
			var titles = {
				'0' : '爱美丽Club'
			}
			var _board_info = data.board_info || '';
			for (var i = 0, k = _board_info.length; i < k; i++) {
				titles['' + _board_info[i].board_id] = _board_info[i].board_title;
			}
			var keywords = {
				'0' : '爱美丽Club',
				'101' : '购物、晒单',
				'102' : '时尚',
				'103' : '衣服搭配',
				'104' : '购物资讯、时尚咨询'
			}
			if (!titles[board_id]) board_id = 0
			data.meta_description = desps[board_id];
			data.pageTitle = titles[board_id] + '-美丽说';
			data.keywords = keywords[board_id];

			data.headTag = 'club';
			data._CSSLinks = ['club'];
			data.board_id = board_id;
			data.notShowNav = false;
			data.onlyShowGoTop = true;
			data.sort = sort;
			data.groupPg = {}; 
			data.groupPg.total_num = data.board_list.pages.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('club/club.html', data);
		});
	},
	'newTopic' : function() {
		var php = {
			'board_info' : '/club/board_info'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['club/new'];
			data.pageTitle = '发帖-美丽说';
			data.keywords = '';
			data.headTag = 'club';
			data.notShowNav = true;
			mSelf.render('club/newPublishor.html', data);
		})
	},
	'newShoppingTopic' : function() {
		var php = {
			'shopping' : '/club/goods_show_data'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['club/shopPublishor'];
			data.pageTitle = '晒单-美丽说';
			data.headTag = 'club';
			data.notShowNav = true;
			mSelf.render('club/shopPublishor.html', data);
		})
	},
	'new' : function() {
		var php = {
			'board_info' : '/club/board_info'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['club'];
			data.pageTitle = '发帖-美丽说';
			data.keywords = '';
			data.headTag = 'club';
			data.notShowNav = true;
			mSelf.render('club/publishor.html', data);
		})
	},
	'single' : function(aid) {
		this.req.__get.aid = aid;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'board_info' : '/club/board_info',
			'newTopics' : '/club/article_new',
			'reply_list' : '/club/article_reply_list',
			'hot_recommend' : '/club/article_hot_recommend',
			'detail' : '/club/article_detail'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.detail, false, 5);
			if (!data.detail){
				return mSelf.errorPage();
			}
			data._CSSLinks = ['club'];
			data.pageTitle = data.detail.article_title + '-美丽说';
			data.keywords = data.detail.uinfo.nickname;
			data.meta_description = data.detail.article_title + ',' + data.detail.uinfo.nickname + '在美丽说通过' + data.detail.board_name + '发布:' + data.detail.article_htmlcontent.substr(0, 60);
			data.headTag = 'club';
			data.page = page;
			data.board_id = data.detail.board_id;
			data.groupPg = {}; 
			data.groupPg.total_num = (data.reply_list.pages && data.reply_list.pages.totalNum) || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			if (this.req.__get.fromBiz){
				data.notShowNav = true
				data.notShowCrumb = true
			}
			mSelf.render('club/single.html', data);
		})
	},
	'recommend' : function(user_id) {
		var page = this.readData('page',this.req.__get, 0)|0;
		var userid = user_id || this.readData('user_id',this.req.__get, 0);
		if (!userid) return this.errorPage();
		this.req.__get.user_id = userid;

		var php = {
			'user_list' : '/person/user_block',
			'user_label' : '/person/label',
			'user_medal' : '/person/medal',
			'all_label' : '/person/all_label',
			'recommend' : '/club/user_reply_list'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo || data.userInfo.user_id != userid || !data.clubTest || !data.clubTest.canAccess){
				return mSelf.redirectTo('/person/u/'+userid);
			}
			delete mSelf.req.__get.user_id;
			data._CSSLinks = ['club/recommend'];
			data.pageTitle = '回复我的-美丽说';
			data.keywords = '美丽说社区';
			data.headTag = 'club';
			data.notShowNav = true;

			data.page = page;
			data.groupPg = {}; 
			data.groupPg.total_num = (data.recommend.pages && data.recommend.pages.totalNum) || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('club/recommend.html', data);
		});
	},
	'liked' : function(user_id){
		var page = this.readData('page',this.req.__get, 0)|0;
		var userid = user_id || this.readData('user_id',this.req.__get, 0);
		if (!userid) return this.errorPage();
		this.req.__get.user_id = userid;

		var php = {
			'user_list' : '/person/user_block',
			'user_label' : '/person/label',
			'user_medal' : '/person/medal',
			'all_label' : '/person/all_label',
			'liked_list' : '/club/user_like_list'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo || data.userInfo.user_id != userid || !data.clubTest || !data.clubTest.canAccess){
				return mSelf.redirectTo('/person/u/'+userid);
			}
			delete mSelf.req.__get.user_id;

			data._CSSLinks = ['club/liked'];
			data.pageTitle = '被喜欢的晒单-美丽说';
			data.pageType = 'liked_club';
			data.notShowNav = true;

			data.page = page;
			data.groupPg = {};
			data.groupPg.total_num = (data.liked_list.pages && data.liked_list.pages.totalNum) || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('club/liked.html', data);
		});
	}
}

exports.__create = controller.__create(club, controlFns);
