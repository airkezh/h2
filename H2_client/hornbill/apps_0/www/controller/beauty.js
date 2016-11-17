function beauty(){
	return this;	
}
var controlFns = {
	'index' : function(){
		this.new();
	},
	'new' : function() {
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var mSelf = this;
		var php = {
			'top' : 'cosmetic::/promote/promote_top_banner',
			'service' : '/share/service_guarantee?biz=1',
			'act_info' : '/cosmetic/Cosmetic_special',
			'bnr_ct' : 'cosmetic::/cosmetic/cosmetic_hot',
			// 'catalog' : '/goods/Catalog_keywords?nid=210109',
			'catalog' : '/navigate/Navigate_cosmetic',
			'goods' : 'cosmetic::/cosmetic/Cosmetic_pc_floor',
			'poster0' : '/goods/catalog_poster?cata_id=8000000000000'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// for 轻专题
			data.act_info = false;
			// data.groupPg = {};
			// data.groupPg.total_num = data.act_info.total_num;
			// data.groupPg.current_page = mSelf.readData('page',mSelf.req.__get, 0);
			// data.groupPg.page_size = 20;

			// for 瀑布流
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = mSelf.readData('page',mSelf.req.__get, 0);
			data.isShow = true;

			data.onlyShowGoTop = true;
			data.headTag = 'beauty';
			data.pageTitle = '美妆 - 美丽说';
			// data._CSSLinks = ['beauty/new_beauty'];
			// mSelf.render('beauty/new_beauty.html', data);
			data._CSSLinks = ['beauty/change_beauty'];
			mSelf.render('beauty/change_beauty.html', data);
		});
	},
	'main' : function() {
		var words_id = this.readData('word', this.req.__get, 0);
		var mSelf = this;
		var php = {
			'leftList' : '/cosmetic/goods_left_list',
			'headSec' : '/commerce/Ads_banner/beauty/topcentral',
			'brandList' : '/cosmetic/goods_top_list?style=brand',
			'commonList' : '/cosmetic/goods_top_list?style=common',
			'goodsMain'  : '/cosmetic/goods_welcome_view?words_id=' + words_id ,
			'beauty_banner' : '/cosmetic/Index_banner'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	console.log(data.beauty_banner)
			data.headTag = 'b_beauty';
			data.words_id = words_id;
			data._CSSLinks = ['beauty'];
			data.pageTitle = '口碑美妆 - 美丽说';
			data.keywords = '口碑,美妆,功效,护肤,彩妆,品牌,产品介绍,使用心得,美丽说';
			data.meta_description = '美丽说美妆品牌大全。百万女性一起点评最新最热美妆明星产品；分享眼霜、面膜、彩妆使用心得；学习护肤、化妆知识。这里有最新上市的免费美妆试用等你来拿！';
			mSelf.render('beauty/beauty.html', data);	
		});
	},
	'catalog' : function(cata_id) {
		var page = this.readData('page', this.req.__get, 0);
		var mSelf = this;
		var php = {
			'leftList' : '/cosmetic/goods_left_list',
			'cataMain'  : '/cosmetic/goods_main_view?style=catalog&words_id=' + cata_id
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.cataMain.gInfo) return mSelf.errorPage();
			data.headTag = 'b_beauty';
			data.currentWord = data.cataMain.refer || '';
			data.words_id = cata_id;
			data.type = 'catalog';
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.cataMain.totalNum;
			data.groupPg.page_size = 10;
			data.groupPg.current_page = page; 
			data._CSSLinks = ['beauty'];
			data.pageTitle = '口碑美妆 - '+ data.currentWord + ' - 美丽说';
			data.keywords = '口碑,美妆,'+ data.currentWord + ',化妆品,产品介绍,使用心得,美丽说';
			data.meta_description = data.currentWord + '美妆品牌大全，百万女性一起点评最新最热'+ data.currentWord + '美妆明星产品，众多时尚达人分享'+ data.currentWord + '单品使用心得和护肤化妆知识。这里有最新上市的免费美妆试用等你来拿！';
			mSelf.render('beauty/catalog.html', data);	
		});
	},
	'single' : function(goods_id) {
		var page = this.readData('page', this.req.__get, 0);
		var mSelf = this;
		var php = {
			'singleStar' : '/cosmetic/goods_single_view?goods_id=' + goods_id,
			'comments' : '/cosmetic/goods_comments?goods_id=' + goods_id,
			'goodsMain' : '/cosmetic/goods_recommend?goods_id='  + goods_id
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'b_beauty';
			data.star = data.singleStar.gInfo;
			if (!data.star || data.star.length==0) return mSelf.errorPage();
			data.words_id = goods_id;
			data.type = 'single';
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.comments.totalNum;
			data.groupPg.page_size = 5;
			data.groupPg.current_page = page; 
			data.currentWord = goods_id;
			data._CSSLinks = ['beauty'];
			data.pageTitle = data.star.goods_name + ' - 美丽说';
			data.keywords =  (data.star.func_name||'') + ',功效,产品介绍,使用心得,美丽说';
			data.meta_description =  data.star.introduction;
			mSelf.render('beauty/single.html', data);	
		});
	},
	'brand' : function(words_id) {
		var page = this.readData('page', this.req.__get, 0);
		var mSelf = this;
		var php = {
			'goodsMain'  : '/cosmetic/goods_main_view?style=brand&words_id=' + words_id,
			'brandStar' : '/cosmetic/goods_star_view?words_id=' + words_id
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.star = data.brandStar.star;
			if (!data.star || data.star.length == 0) return mSelf.errorPage();
			data.headTag = 'b_beauty';
			data.words_id = words_id;
			data.type = 'brand';
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.goodsMain.totalNum;
			data.groupPg.page_size = 32;
			data.groupPg.current_page = page; 
			data._CSSLinks = ['beauty'];
			data.pageTitle = '口碑美妆 - 美丽说';
			mSelf.render('beauty/brand.html', data);	
		});
	}
};

exports.__create = controller.__create(beauty , controlFns);
