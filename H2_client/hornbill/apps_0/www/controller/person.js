function person(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var mSelf = this;
		var php  = {}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var url = '/welcome'
			if (data.userInfo && data.userInfo.user_id)
				url = '/person/u/' + data.userInfo.user_id
			mSelf.redirectTo(url)
		})
	},
	'u' : function(user_id){
		this.req.__get.user_id = user_id;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'user_list' : '/person/user_info',
			'user_medal' : '/person/medal',
			'user_label' : '/person/label',
			'all_label' : '/person/all_label',
			'club_total' : '/club/user_article_num',
			'second_menu' : '/person/second_menu',
			'person_shop' : '/shop/shop_following_list?user_id=' + user_id
		};
		var type = this.req.__get.type;
		if (type == 'topic')
			php['board_list'] = '/club/user_article_list';
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.user_list) return mSelf.errorPage();
			if(data.user_list.isBan) return this.audit();
			//又一个黑名单
			if(data.user_list.isBlack){
				return this.complain();
			}
			if(data.user_list.redirectUrl) return mSelf.redirectTo( data.user_list.redirectUrl);
			data._CSSLinks = ['personal'];
			data.pageTitle = data.user_list.nickname + '的美丽说 - 美丽说，发现、收藏、分享我的美丽点滴，让改变发生';
			var totalNum = 0;
			if(!type || type == 'book'){
				totalNum = data.second_menu.editorNum + data.second_menu.shareNum;	
			} else if(type == 'share'){
				totalNum = data.second_menu.shareNum;	
			} else if(type == 'editor'){
				totalNum = data.second_menu.editorNum;	
			} else if(type == 'like'){
				data.headTag = 'person_like';
				totalNum = data.second_menu.likeNum;	
			} else if(type == 'follow'){
				totalNum = data.second_menu.followNum;	
			} else if(type == 'topic'){
				totalNum = data.board_list.pages.totalNum;
				data._CSSLinks.push('club');
			}else if(type == 'shop'){
				totalNum = data.person_shop.totalNum;
			}
			// true 宽屏 
			data.fluid = true;
			data.onlyShowGoTop = true;
			data.groupPg = {}; 
			data.groupPg.total_num = totalNum;
			data.groupPg.current_page = page;
			data.uid = user_id;
			data.newFocusShop = true;
			if (type == 'topic')
				data.groupPg.page_size = 20;
			//data.groupPg.page_size = 120; 
			data.magazineNum = data.second_menu.editorNum;
			delete mSelf.req.__get.user_id;
			var tpl = 'person/person.html';
			if (type == 'shop') {
				data.personShop = true;
			}else if ('topic' == type){
				tpl = 'club/person_topic.html';
				}
			mSelf.render(tpl, data);	
		});
	},
	'complain' : function(){
		var php  = {}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['person_complain'];
			data.pageTitle = '用户申诉 - 美丽说';
			this.render('person/complain.html', data);
		});
	},
	'audit' : function(){
		var php  = {}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['person_complain'];
			data.pageTitle = '用户审核 - 美丽说';
			this.render('person/audit.html', data);
		});
	}
};
exports.__create = controller.__create(person , controlFns);
