function review() {
	return this;
}
var controlFns = {
	'index' : function(){
		this.main();
	},
	'main' : function()
	{
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'activity_feed' : '/activity/activity_feed?frame=' + page
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.groupPg = {}; 
            data.groupPg.total_num = data.activity_feed.total_num;
            data.groupPg.page_size = data.activity_feed.page_size;
            data.groupPg.current_page = page;		
			data._CSSLinks = ['activity/review'];
			data.pageTitle = "往期回顾";
			this.render('activity/review.html' , data);
		});
	},
	'newstyle' : function()
	{
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'Activity_oldTimey' : '/activity/Activity_oldTimey?limit=12'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.groupPg = {}; 
            data.groupPg.total_num = data.Activity_oldTimey.data.total_num;
            data.groupPg.page_size = 12;
            data.groupPg.current_page = page;		
			data._CSSLinks = ['activity/newstyle'];
			data.pageTitle = "每日热门新款，潮流速递，穿搭指南-美丽说";
			this.render('activity/newstyle.html' , data);
		});
	}
}
exports.__create = controller.__create(review, controlFns);