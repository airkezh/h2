function infocus(){
	return this;
}
var controlFns = {
	main : function(){
		var type = this.readData('type', this.req.__get, 0) | 0;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var topic_id = 31;
		var php = {
			'daren' : '/customactivity/CustomActivity_common_tool_single?id=pic_link_multiple&cid=953',
			'darenList' : '/customactivity/CustomActivity_common_tool_single?id=pic_link_group&cid=949',
			'banner' : '/customactivity/CustomActivity_common_tool_single?id=pic_link_group&cid=993',
			'topic_list' : '/wapbiz/magicbox_topiclist?id='+topic_id
		};

		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.daren) return mSelf.errorPage();
			//讨论区
			data.beauty_id = topic_id;
			data.beautyTag = 'beautybox';
			//分页
			data.groupPg = {};
		    data.groupPg.total_num = data.topic_list.totalNum;
		    data.groupPg.current_page = page;
		    data.groupPg.page_size = 20;
			data.type = type;
			data._CSSLinks = ['huodong/infocus'];
			data.pageTitle = '【糖果M210，玩的就是多彩】';
			mSelf.render('biz/huodong/infocus.html', data);
		});
	}
}
exports.__create = controller.__create(infocus, controlFns);
