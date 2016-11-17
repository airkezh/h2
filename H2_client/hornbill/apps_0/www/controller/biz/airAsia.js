function airAisa(){
	return this;
}

var controlFns = {
	girls : function(){
		var mSelf = this;
		var php = {
			'my_poster' : '/customactivity/CustomActivity_yahang_photo_user_info'
			,'rank' : '/customactivity/CustomActivity_yahang_photo_rank'
			,'pageData' : '/customactivity/CustomActivity_common_tool_single?id=airAisa&cid=441'
		};
		var page = this.readData('page',this.req.__get, 0)|0;

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(!data.pageData){
				data.pageData = {
					'logo' : 'http://i.meilishuo.net/css/images/biz/airAsia/airAsia_logo1.jpg',
					'link' : 'http://www.meilishuo.com/u/ETz9Yv?frm=yahang103'
				}
			}

			data.fluid = false;
			data.topbanner = false
			data.poster0 = data.rank.data || '';
			data.isLogin = data.userInfo.user_id != 0 ? true : false;

			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.rank.data.totalNum;
			data.groupPg.current_page = page;

			data._CSSLinks = ['huodong/airAsia'];
			data.pageTitle = '亚航女生月特辑－宠爱自己我买单';
			mSelf.render('biz/airAsia.html' , data);
		});
	},
	vote : function(){
		var mSelf = this;
		var php = {
			'my_poster' : '/customactivity/CustomActivity_yahang_photo_user_info'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.topbanner = false
			data.isLogin = data.userInfo.user_id == 0 ? true : false;

			data._CSSLinks = ['huodong/airAsia_vote'];
			data.pageTitle = '亚航女生月特辑－宠爱自己我买单';
			mSelf.render('biz/airAsia_vote.html' , data);
		});
	}
}
 exports.__create = controller.__create(airAisa, controlFns);
