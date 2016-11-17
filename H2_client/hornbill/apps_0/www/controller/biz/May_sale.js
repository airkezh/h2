function May_sale() {
	return this;
}
var controlFns = {
	love_wall: function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var mSelf = this;
		var php = {
			'poster0':'/customactivity/CustomActivity_lovers_confessions_rank_pc',
			'share_info':'/customactivity/CustomActivity_lovers_confessions_user_info'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/love_wall'];
			data.pageTitle = '爱的告白 -- 美丽说';
			data.groupPg = {}; 
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.page_size = 160;
			//data.groupPg.page_size = 20; 
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/love_wall.html' , data);
		});
	}
}
exports.__create = controller.__create(May_sale, controlFns);
