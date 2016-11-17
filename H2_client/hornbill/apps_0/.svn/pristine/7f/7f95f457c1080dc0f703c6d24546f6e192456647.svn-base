function nuannuan(){
	return this;
}
var controlFns = {
	main : function(){
		var type = this.readData('type', this.req.__get, 'p0');
		var page = this.readData('page', this.req.__get, 0) | 0;
		var Tshow = this.readData('Tshow', this.req.__get, 'new');
		var php = {
			'poster0' : '/customactivity/CustomActivity_haibao_wall',
			'jl_like' : '/customactivity/CustomActivity_twitter_infos?twitter_ids=3030705121,3030705671,3030705965,3030706241'
		};

		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//if(!data.daren) return mSelf.errorPage();

			data.apparel_alert =false;
			data.haibaoBox = 'jianling_fixheight';
			data.poster0 = data.poster0.data || '';
			//海报窄屏
			data.notFluidPoster = 1;
			//分页
			data.groupPg = {};
		    data.groupPg.total_num = data.poster0.totalNum;
		    data.groupPg.current_page = page;

			data.type = type;
			data.Tshow = Tshow;
			data._CSSLinks = ['page_guang' , 'huodong/nuannuan'];
			data.pageTitle = '奇迹暖暖';
			mSelf.render('biz/brand/nuannuan.html', data);
		});
	}
}
exports.__create = controller.__create(nuannuan, controlFns);
