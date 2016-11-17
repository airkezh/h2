function qqwelfare(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'qq_userInfo' : '/qzone/user_info',
			'activityList' : '/qzone/activity_list',
			'judgeOpening' : '/qzone/Judge_opening',
			'carouselUserList' : '/qzone/carousel_user',
			'getIncoming' : '/qzone/get_incoming'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['app/qqwelfare'];
			data.pageTitle = '美丽说QQ空间站内应用';
			if(data.judgeOpening == true){
				data.headTag = 'qqwelfareHome';
				data.groupPg = {}; 
				data.groupPg.page_size = 5;
				data.groupPg.total_num = data.activityList.totalNum;	
				data.groupPg.current_page = page; 
				mSelf.render('app/qq/welfare.html' , data);
			}else{
				data.headTag = 'qqwelfareCommingsoon';
				mSelf.render('app/qq/commingsoon.html' , data);
			}
		});
	},
	'activity' : function(args){
		var php = {
			'qq_userInfo' : '/qzone/user_info',
			'activitySingle' : '/qzone/activity_single?activity_id=' + args
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['app/qqwelfare'];
			data.pageTitle = '美丽说QQ空间站内应用';
			data.headTag = 'qqwelfareActivity';
			mSelf.render('app/qq/activity.html' , data);
		});
	},
	'qq_userInfo' : function(){
		this.ajaxTo('/qzone/user_info');
	},
	'activityApply' : function(){
		this.ajaxTo('/qzone/activity_apply');	
	},
	'setUserValid' : function(){
		this.ajaxTo('/qzone/set_user_valid');	
	},
	'setUserIsfans' : function(){
		this.ajaxTo('/qzone/set_user_isfans');	
	}
}
exports.__create = controller.__create(qqwelfare , controlFns);
