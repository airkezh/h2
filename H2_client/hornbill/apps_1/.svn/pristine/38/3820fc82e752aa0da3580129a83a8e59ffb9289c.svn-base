function brand(){
	return this;	
}
var controlFns = {
	'index' : function(bdid){
		if (bdid) {
			return this.brandDetail(bdid);
		}
		this.req.__get.bdid = bdid;
		var php = {
			'brand_ad' : '/brand/brand_index_ad',
			'looks' : '/brand/brand_index_twitter',
			'topbrand' : '/brand/brand_recommend_list',
			'events' : '/brand/brand_activity_list?source=index',
			'handpick' : '/brand/Brand_index_handpick',
			'brandGroup' : '/brand/Brand_index_group'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//if(!data.volume_head) return mSelf.errorPage();
			//base.var_dump(data.looks, false, 5);
			data.events = data.events.data.list;
			data.pageTitle = '时尚品牌库_2013最新时尚品牌资讯,品牌大全,品牌口碑 - 美丽说';
			data._CSSLinks = ['brand'];
			// true 宽屏 
			data.fluid = true;
			data.headTag = 'brand'
			//true 二级导航
			data.brandSecondNav = true;
			mSelf.render('brand/brand.html' , data);	
		});	
	},
	brandDetail : function(bdid){
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'bar_info' : '/brand/brand_main?domain=' +bdid,
			'tlist' : '/brand/brand_twitter_list?domain=' +bdid,
			'banner' : '/brand/Brand_main_ext?domain=' +bdid,
			'brand_logo' : '/brand/Brand_relation_brand?domain=' +bdid
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.bar_info, false, 5);
			data.pageTitle = '【多图】'+ data.bar_info.brand_name_en + data.bar_info.brand_name + '品牌|搭配|单品|LOOKBOOK|官网|品牌故事 - 美丽说';
			data._CSSLinks = ['brand'];
			// true 宽屏 
			data.fluid = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.tlist.totalNum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 12;

			data.headTag = 'brand'
			mSelf.render('brand/brand_con.html' , data);	
		});	
	},
	brand_actList : function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'events' : '/brand/brand_activity_list'	
		};
		var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			// true 宽屏
			data.fluid = true;
			data._CSSLinks = ['brand'];
			data.pageTitle = "全部品牌活动-品牌";
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.events.data.totalNum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 12;

			data.events = data.events.data.list;
			mSelf.render('brand/brand_actList.html' , data);
		});
	}

};
exports.__create = controller.__create(brand , controlFns);
