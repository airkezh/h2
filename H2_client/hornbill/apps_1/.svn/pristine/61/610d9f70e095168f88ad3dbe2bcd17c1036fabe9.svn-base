function paipaiguang(){
	return this;	
}
var controlFns = {
	'index' : function(attrName){
		if (!attrName) 
			return this.redirectTo('/paipaiguang/hot' ,true);
		this.goods(attrName);
	},
	'goods' : function(attrName){
		var word_name = this.readData('word_name',this.req.__get, attrName);
		this.req.__get.word_name = word_name;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'totalNum' : '/goods/paipai_totalnum',
			'attr_hot_keywords' : '/goods/popular_keywords_new',
			'ads_top_banner' : '/commerce/Ads_banner/guang/top',
			'poster0' : '/goods/paipai_poster'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	if(attrName !== 'hot' && data.attr_hot_keywords.indexOf(attrName) == -1) return mSelf.redirectTo('/paipaiguang' ,true);	

			if(attrName == 'hot'){
				data.pageTitle = '大家分享的宝贝 - '+ '逛宝贝' +' - 美丽说'	
				data.currentWord = '逛宝贝';
			}else{
				data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'单品，'+ word_name +'女装，'+ word_name +'服饰搭配购买 - 美丽说';
				data.currentWord = word_name;
			}
			data.attrName = attrName;
			data._CSSLinks = ['paipai/guang'];
			data.headTag = 'guang';
			// true 宽屏 
			data.fluid = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.page_size = 160;
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page; 
			mSelf.render('paipai/goods.html' , data);
		});
	},
	'getGoods' : function(){
		this.ajaxTo('/goods/paipai_poster');
	},
	'catalog' : function(catalogid){
		var cata_id = this.readData('cata_id', this.req.__get,2000000000000);
		this.req.__get.cata_id = cata_id;
		var word = this.readData('word',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.frame = 0;
		var php = {
//			'catalog' : '/goods/Catalog_keywords',
			'catalog' : '/goods/Paipai_sidebar',
			'totalNum' : '/goods/paipai_totalnum',
			'ads_top_banner' : '/commerce/Ads_banner/catalog/top/'+cata_id,
			'poster0' : '/goods/paipai_poster'
		};
		var mSelf = this;
		var catalogList = {
			'2000000000000' : ['衣服','【多图】衣服 - 衣服单品，衣服女装，衣服服饰搭配购买'],
			'6000000000000' : ['鞋子','【多图】鞋子 - 鞋子单品，鞋子女装，鞋子服饰搭配购买'],
			'5000000000000' : ['包包','【多图】包包 - 包包单品，包包女装，包包服饰搭配购买'],
			'7000000000000' : ['配饰','【多图】配饰 - 配饰单品，配饰女装，配饰服饰搭配购买'],
			'8000000000000' : ['美容','【多图】美容 - 美容单品，美容女装，美容服饰搭配购买'],
			'9000000000000' : ['家居','【多图】家居 - 家居单品，家居女装，家居服饰搭配购买'],
			'2001000000000' : ['上衣','【多图】上衣 - 上衣单品，上衣女装，上衣服饰搭配购买'],
			'2004000000000' : ['裙子','【多图】裙子 - 裙子单品，裙子女装，裙子服饰搭配购买'],
			'2006000000000' : ['裤子','【多图】裤子 - 裤子单品，裤子女装，裤子服饰搭配购买'],
			'2009000000000' : ['内衣','【多图】内衣 - 内衣单品，内衣女装，内衣服饰搭配购买']
		}
		if(!catalogList[cata_id] || !catalogList[cata_id][1]) return this.redirectTo('/paipaiguang/catalog/dress?cata_id=2000000000000');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var word_name = data.catalog.currentWord;
			data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'单品，'+ word_name +'女装，'+ word_name +'服饰搭配购买 - 美丽说';
			data.keywords = word_name + ', ' + word_name + '价格, ' + word_name + '女装, ' + word_name + '单品推荐, ' + word_name + '搭配';
			data.meta_description = word_name + '是当前流行的服饰搭配元素，想要把' + word_name + '搭得美丽，来看美丽说百万时尚网友精心挑选出的当季最流行的' + word_name + '单品、最佳搭配、购买心得、购买链接';
			
			if (catalogList[cata_id][0] == '家居') {
				data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'精品图片，' + word_name + '价格，' + word_name + '品牌 - 美丽说';
				data.keywords = word_name + '，' + word_name + '图片，' + word_name + '价格，' + word_name + '品牌，创意' + word_name; 
				data.meta_description = word_name + '是家居生活的必需品，想要挑选时尚优质创意低价的' + word_name + '，来看美丽说百万时尚网友精心挑选出的当季最流行的'+ word_name +'单品、最佳创意设计、购买心得、购买链接';
			} else if (catalogList[cata_id][0] == '美容') {
				data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'排行榜，'+ word_name +'用法推荐，'+ word_name +'价格品牌 - 美丽说';
				data.keywords = word_name +'，'+ word_name +'如何怎样，'+ word_name +'哪个好，'+ word_name +'价格，'+ word_name +'品牌';
				data.meta_description = word_name +'是当前流行的美容护肤保养品，想要把'+ word_name +'发挥最大功效，来看美丽说百万时尚网友精心挑选出的当季最流行的'+ word_name +'单品、最佳用法、购买心得、购买链接';
			}

			data.headTag = catalogid;
			// true 宽屏 
			data.fluid = true;
			//true 二级导航
			if(catalogid == 'dress') data.secondNav = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.page_size = 160;
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page; 
			//是否显示小尺寸 
			data._CSSLinks = ['paipai/catalog'];
			data.isShow = true;
			
		//	if(isFlowPercent){
				data.showSecNavCatalog = true;
		//	}else{
		//		data.showSecNavHeader = true;
		//	}

			mSelf.render('paipai/catalog.html' , data);
		});	
	}
};
exports.__create = controller.__create(paipaiguang , controlFns);
