function dongfeng() {
	return this;
}
var controlFns = {
	main: function() {
		var type = this.readData('type', this.req.__get, 'p0');
		var page = this.readData('page', this.req.__get, 0) | 0;
		var Tshow = this.readData('Tshow', this.req.__get, 'new');
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'jl_like': '/customactivity/CustomActivity_twitter_infos?twitter_ids=3030705121,3030705671,3030705965,3030706241'
		};

		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//if(!data.daren) return mSelf.errorPage();

			data.apparel_alert = false;
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
			data._CSSLinks = ['page_guang', 'huodong/dongfeng'];
			data.pageTitle = '东风日产';
			mSelf.render('biz/brand/dongfeng.html', data);
		});
	},
	'dongfeng_2': function() {
		var type = this.readData('type', this.req.__get, 'p0');
		var page = this.readData('page', this.req.__get, 0) | 0;
		var Tshow = this.readData('Tshow', this.req.__get, 'new');
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'jl_like': '/customactivity/CustomActivity_twitter_infos?twitter_ids=3030705121,3030705671,3030705965,3030706241',
			'voteList':'/huodong/Dongfeng_Ballot2?act=getVote'
		};

		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//if(!data.daren) return mSelf.errorPage();

			data.apparel_alert = false;
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
			data._CSSLinks = ['page_guang', 'huodong/dongfeng_2'];
			data.pageTitle = '激情体验季 东风日产';
			mSelf.render('biz/brand/dongfeng_2.html', data);
		});
	},
	'dongfeng_3': function() {
		var type = this.readData('type', this.req.__get, 'p0');
		var page = this.readData('page', this.req.__get, 0) | 0;
		var Tshow = this.readData('Tshow', this.req.__get, 'new');
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'jl_like': '/customactivity/CustomActivity_twitter_infos?twitter_ids=3030705121,3030705671,3030705965,3030706241',
			'voteList':'/huodong/Dongfeng_Ballot3?act=getVote'
		};

		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//if(!data.daren) return mSelf.errorPage();

			data.apparel_alert = false;
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
			data._CSSLinks = ['page_guang', 'huodong/dongfeng_3'];
			data.pageTitle = '激情体验季 东风日产';
			mSelf.render('biz/brand/dongfeng_3.html', data);
		});
	}
}
exports.__create = controller.__create(dongfeng, controlFns);