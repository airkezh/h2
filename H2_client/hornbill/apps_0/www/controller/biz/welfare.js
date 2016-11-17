function welfare(){
	return this;
}

var controlFns = {
	 'shuaipu' : function(){
		if (this.req.__get.aid) return this.redirectTo('/biz/welfare/page/?aid='+this.req.__get.aid)
        this.page(245, true) 
        },	
	daily : function(p){
		var mSelf = this;
		var php = {
			'pic' : '/customactivity/CustomActivity_wap_topic'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '手机福利社 免费试用活动 - 美丽说';
			mSelf.render('activity/dailytpl.html' , data);
		});
	},
	page : function(aid,sptest){
		var mSelf = this;
		var php = {
			'info' : '/customactivity/CustomActivity_welfare_topic?aid=' +aid
			,'old' : '/customactivity/CustomActivity_welfare_list'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//console.log(data.info);
			//base.var_dump(data.old, false, 5);
			if(!data.info || data.info.code=='40001') return mSelf.errorPage();
			if (sptest) {
				//#6032 gangdan test
				data.info.top_banner = data.PICTURE_URL +'images/activity/welfare/sptest.jpg' 
				data.info.products_introduction = data.info.products_introduction.replace('http://img-tx.meilishuo.net/img/_o/0f/ad/47650890e7a9b51d1d6a3ee27f15_600_177.c1.jpg' , data.PICTURE_URL +'images/activity/welfare/sptestb.jpg')
				}
			data.info.products_preview_img = data.info.products_preview_img || data.PICTURE_URL +'images/activity/welfare/m_bnr.jpg' 
			data._CSSLinks = ['huodong/welfare'];
			data.pageTitle = '手机福利社 免费试用活动 - 美丽说';
			mSelf.render('activity/welfare.html' , data);
		});
	}
}
 exports.__create = controller.__create(welfare, controlFns);
