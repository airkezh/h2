function msg() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		if(param == 'user') this.user();
		else if(param == 'syser') this.syser();
	},
	'syser' : function(user_id) {
		var select = this.readData('sl', this.req.__get, 'li');
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.msg = 1;
		var mSelf = this;
		var php = {
			'sysmsg_list' : '/msg/Sysmsg_list',
			'user_list' : '/person/user_info',
			'user_medal' : '/person/medal',
			'user_label' : '/person/label',
			'all_label' : '/person/all_label'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo('/user/login' ,true); 
			data.tab = 'smsg';
			data._CSSLinks = ['msg'];
			data.pageTitle = '系统消息 - 美丽说';
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.sysmsg_list.totalnum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 20;
			delete mSelf.req.__get.msg;
			mSelf.render('msg/syser.html' , data);	
		});
	},
	'user' : function(param) {
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.msg = 1;
		var mSelf = this;
		var php = {
			'premsg_list' : ' /msg/premsg_list',	
			'user_list' : '/person/user_info',
			'user_medal' : '/person/medal',
			'user_label' : '/person/label',
			'all_label' : '/person/all_label'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo('/user/login' ,true); 
			data.tab = 'pmsg';
			data.pageTitle = '我的私信 - 美丽说';
			data._CSSLinks = ['msg'];
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num =  data.premsg_list.totalnum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 20;
			delete mSelf.req.__get.msg;
			mSelf.render('msg/syser.html' , data);	
		});

	},
	'talk' : function(param) {
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.msg = 1;
		this.req.__get.id = param;
		var mSelf = this;
		var php = {
			'premsg_talk' : '/msg/premsg_talk/',	
			'user_list' : '/person/user_info',
			'user_medal' : '/person/medal',
			'user_label' : '/person/label',
			'all_label' : '/person/all_label'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo('/user/login' ,true); 
			data.tab = 'pmsg';
			data.pageTitle = '我的私信 - 美丽说';
			data._CSSLinks = ['msg'];
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num =  data.premsg_talk.totalnum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 20;
			delete mSelf.req.__get.msg;
			data.to_user_id = param;
			mSelf.render('msg/syser.html' , data);	
		});

	}
}
exports.__create = controller.__create(msg, controlFns);


