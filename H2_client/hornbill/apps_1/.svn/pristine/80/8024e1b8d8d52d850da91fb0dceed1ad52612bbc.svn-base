function shareact() {
	return this;
}
var controlFns = {
	'showlist': function(){
		var mSelf = this;
		var php = {
			'show' : '/promote/hot_items',
			'main' : '/promote/promote_act?type=main',
			'ready' : '/promote/promote_act?type=ready',
			'already' : '/promote/promote_act?type=already',
			'service' : '/share/service_guarantee?biz=1',
			'turn' : '/promote/marquee_get',
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '特卖频道页- 美丽说';
			// if (!(data.show && data.main && data.ready && data.already && data.turn)) {
			// 	return mSelf.errorPage();
			// };
			data._CSSLinks = ['doota/sharelist'];
			data.isSale = true;
			data.headTag = 'sale'
			mSelf.render('huodong/sharelist.html' , data);
		});
	},
	'list': function(){
		var mSelf = this;
		var php = {
			'main' : 'cosmetic::/promote/promote_act_v2?type=main',
			'ready' : 'cosmetic::/promote/promote_act_v2?type=ready',
			'already' : 'cosmetic::/promote/promote_act_v2?type=already',
			'top' : 'cosmetic::/promote/promote_top_banner',
			'service' : '/share/service_guarantee?biz=1',
			'num' : 'cosmetic::/promote/promote_channel_info'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '特卖频道页- 美丽说';
			// if (!(data.show && data.main && data.ready && data.already && data.turn)) {
			// 	return mSelf.errorPage();
			// };
			data._CSSLinks = ['doota/sharelist_new'];
			data.isSale = true;
			data.onlyShowGoTop = true;
			data.headTag = 'sale'
			mSelf.render('huodong/sharelist_new.html' , data);
		});
	},
	'activity': function(){
		var mSelf = this,
			page = this.readData('page',this.req.__get, 0);
		var php = {
			'ele' : '/promote/activity_item_list',
			'list' : '/promote/activity_detail',
			'service' : '/share/service_guarantee?biz=1&activity=1',
			'sales' : '/share/hot_sales'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			 if (!data.list ) {
			 	return mSelf.errorPage();
			 };
			data.pageTitle = data.list[0].show_name + '-美丽说';
			data.list = data.list[0];
			data._CSSLinks = ['doota/shareact'];
			data.od = mSelf.readData('od',mSelf.req.__get, 0);
			data.ac_id = mSelf.readData('ac_id',mSelf.req.__get, 0);
			data.time = data.list.end_time  - parseInt(new Date().getTime() / 1000);
			data.isSale = true;
			data.headTag = 'sale'
			//获取分页总数
			data.groupPg = {};
			data.groupPg.current_page = page;
			if (data.ele && data.ele.tn) {
				data.groupPg.total_num = 8 * data.ele.tn;
			};
			data.groupPg.page_size = 8;
			mSelf.render('huodong/shareact.html' , data);
		});
	},
	'beautySale': function(){
		var mSelf = this,
			page = this.readData('page',this.req.__get, 0);
		var php = {
			'ele' : 'cosmetic::/promote/activity_item_list_v3',
			'list' : 'cosmetic::/promote/activity_detail_v3',
			'service' : '/share/service_guarantee?biz=1&activity=1',
			'sales' : '/share/hot_sales',
			'ads' : 'cosmetic::/promote/activity_ads'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.list) {
				return mSelf.errorPage();
			};

			data.pageTitle = data.list[0].show_name + '-美丽说';
			data.list = data.list[0];
			data._CSSLinks = ['doota/shareact_bs'];
			data.od = mSelf.readData('od',mSelf.req.__get, 0);
			data.ac_id = mSelf.readData('ac_id',mSelf.req.__get, 0);

			data.time = data.list.time - parseInt(new Date().getTime() / 1000);;

			data.isSale = true;
			data.headTag = 'sale';
			mSelf.render('huodong/beautySale.html', data);
		});
	},
	'main': function(){
		var mSelf = this;
		var php = {
			'top' : 'cosmetic::/promote/promote_top_banner',
			'service' : '/share/service_guarantee?biz=1',
			'act_info' : '/cosmetic/Cosmetic_special',
			'bnr_ct' : 'cosmetic::/cosmetic/cosmetic_hot',
			'catalog' : '/goods/Catalog_keywords?nid=1095'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.groupPg = {};
			data.groupPg.total_num = data.act_info.total_num;
			data.groupPg.current_page = mSelf.readData('page',mSelf.req.__get, 0);;
			data.groupPg.page_size = 20;

			data.pageTitle = '美妆 - 美丽说';
			data._CSSLinks = ['doota/act_home'];
			mSelf.render('huodong/act_home.html' , data);
		});
	},
	'beautyBox' : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=pc_mz_box'
			,'shopping_show': '/cosmetic/cosmetic_shoppingshow_list'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData || !data.pageData.pageControl || !data.pageData.pageControl.title) return mSelf.errorPage();

			data.groupPg = {};
			data.groupPg.total_num = data.shopping_show.pages.totalNum;
			data.groupPg.current_page = mSelf.readData('page',mSelf.req.__get, 0);;
			data.groupPg.page_size = 10;

			data.reg_feedback = false;
			data.pageTitle = data.pageData.pageControl.title;
			data._CSSLinks = ['huodong/mz_beautyBox'];
			mSelf.render('huodong/mz_beautyBox.html' , data);
		});
	},
	'beautyBoxShow' : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=pc_mz_box_1',
			'top_rank' : '/cosmetic/cosmetic_shoppingshow_girl',
			'nor_rank' : '/cosmetic/cosmetic_shoppingshow_moreexpert'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData || !data.pageData.pageControl || !data.pageData.pageControl.title) return mSelf.errorPage();

			data.groupPg = {};
			data.groupPg.total_num = data.nor_rank.pages.totalNum;
			data.groupPg.current_page = mSelf.readData('page', mSelf.req.__get, 0);;
			data.groupPg.page_size = 20;

			data.reg_feedback = false;
			data.pageTitle = data.pageData.pageControl.title;
			data._CSSLinks = ['huodong/mz_beautyBoxShow'];
			mSelf.render('huodong/mz_beautyBoxShow.html' , data);
		});
	}
}
exports.__create = controller.__create(shareact, controlFns);
