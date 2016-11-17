function guang(){
	return this;	
}
var controlFns = {
	'index' : function(attrName){
		if(!attrName) attrName = this.readData('word',this.req.__get)  
		if (!attrName) 
			return this.redirectTo('/guang/hot' ,true);
		this.goods(attrName);
	},
	'goods' : function(attrName){
		// var word = this.readData('word',this.req.__get, 0);
		var word_name = this.readData('word_name',this.req.__get, attrName);
		this.req.__get.word_name = word_name;
		var page = this.readData('page',this.req.__get, 0)|0;
		var title = {
			'new' : '最新上架的宝贝',
			'popular' : '热销的宝贝',
			'hot' : '大家喜欢的宝贝'
		}
		var php = {
			// 'attr_keywords' : '/goods/attribute_keywords_recommend',
			'attr_title_keywords' : '/goods/attribute_title',
			//'totalNum' : '/goods/attribute_totalnum',
			'friendlink' : '/friendlink/bottom',
			// 'attr_hot_keywords' : '/goods/popular_keywords_new',
			'poster0' : '/goods/attribute_poster',
			'share_pic' : '/goods/Share_outside_mix',
			'adm29' : '/adm/ad_Show?slot_id=29',
			'catalog_nav' : '/navigate/navigate_words',
			// 'season' : '/customactivity/CustomActivity_seasonal_special_banner',
			'navigate' : '/navigate/navigate_hot',
			'guang_new_title' : '/customactivity/CustomActivity_common_tool_single?id=guang_new_title'
		};
		//if (attrName != 'new' && attrName != 'popular') {
			php['adm27'] = '/adm/ad_Show?slot_id=27';
		//} #8918 
		if(!title[attrName]){
			// php['attr_baike'] = '/goods/attribute_baike';
			//php['attr_shop'] = '/goods/attribute_shop';
			// php['attr_match'] = '/goods/attribute_match';
			// php['attr_brand'] = '/goods/attribute_brand';
//			php['p4p'] = '/pfp/pfp_hot?key_id='+attrName + '&tp=3'
		}else{
			php['cpt'] = '/commerce/ads_hot?word='+attrName
			if(attrName == 'hot'){
				php['p4p'] = '/pfp/pfp_hot?nid=' + 'hot'
			}
			/*
			*/
		}
		var mSelf = this;
		var magFavor = false;		//#2808
		if (isMagFavor(mSelf))  magFavor = true;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		//this.debugSnake({target : 'newlab' ,cache:'guili'});
		this.listenOver(function(data){
			if (data.poster0 && !data.poster0.totalNum && data.attr_title_keywords && !data.attr_title_keywords.word_id) return this.errorPage()
			//base.var_dump(data.poster0 , false , 5);
	//		console.log(data.cpt);
//			console.log(data.p4p);
			if (magFavor) data.isMagFavor = magFavor;
	//		if(!title[attrName] && data.attr_hot_keywords.indexOf(attrName) == -1) return mSelf.errorPage(); 
//			if(attrName == 'hot')
//				data.isShowGuangBanner = true;
			if(title[attrName]){
				data.pageTitle = '大家分享的宝贝 - '+ title[attrName] +' - 美丽说'	
				data.attrName = attrName;
				data.currentWord = title[attrName];
				data.isShow = false;
			}else{
				data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'单品，'+ word_name +'女装，'+ word_name +'服饰搭配购买 - 美丽说';
				data.attrName = attrName;
				data.currentWord = word_name;
				data.isShow = true;
			}
			data._CSSLinks = ['page_guang'];
			data.onlyShowGoTop = true;
			data.isCatalogTwo = true;
			//if ('popular' == attrName) data.headTag = 'hotsale'
			data.headTag = 'guang';
			// true 宽屏 
			data.fluid = true;
			//获取分页总数
			data.groupPg = {}; 
			//data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			delete mSelf.req.__get.word_name;
			delete mSelf.req.__get.word;
			mSelf.render('guang/goods.html' , data);
		});
	},

	'catalog' : function(catalogid){
		var cata_id = this.readData('cata_id', this.req.__get,2000000000000);
		this.req.__get.cata_id = cata_id;
		var nid = this.readData('nid', this.req.__get);
		var word = this.readData('wn',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.frame = 0;
		var mSelf = this;
		
		var php = {
			'catalog' : '/goods/Catalog_keywords',
			//'totalNum' : '/goods/catalog_totalnum',
			'catalog_nav' : '/navigate/navigate_words',
			'poster0' : '/goods/catalog_poster',
			'share_pic' : '/goods/Share_outside_mix',
		//	'ads' : '/commerce/ads_hot'
			'rec_poster' : '/navigate/Navigation_recommend'
			, 'season' : '/customactivity/CustomActivity_seasonal_special_banner'
			,'catTitle' : '/goods/catalog_info'
		};

		//for adm
		php['adm5'] = '/adm/ad_Show?slot_id=5&catalog_id=' + cata_id
		php['adm7'] = '/adm/ad_Show?slot_id=7&catalog_id=' + cata_id
		php['adm49'] = '/adm/ad_Show?slot_id=49&catalog_id=' + cata_id

		if(!word)
			php['p4p'] = '/pfp/pfp_hot?key_id='+cata_id + '&tp=1'
		else
			php['p4p'] = '/pfp/pfp_hot?key_id='+word + '&cata_id='+cata_id + '&tp=2'

		if(page == 0) php['cpt'] = '/commerce/ads_hot'

		if(!this.req.__get.page || this.req.__get.page == '0'){
			php.commerce = '/commerce/ads_mall';	
		}
		/*
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
		if(!catalogList[cata_id] || !catalogList[cata_id][1]) return this.redirectTo('/guang/catalog/dress?cata_id=2000000000000');
		*/
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var catalogList =  {}
			catalogList[cata_id] = []
			if (data.catTitle) {
				catalogList[cata_id] = [data.catTitle.title , data.catTitle.desc]
			}
			if(!catalogList[cata_id] || !catalogList[cata_id][1]) return this.redirectTo('/guang/catalog/dress?cata_id=2000000000000');
				

			delete mSelf.req.__get.frame;
			delete mSelf.req.__get.nohackdata;
			var word_name = data.catalog.currentWord;
			
			switch (catalogList[cata_id][0] ){
				case '家居':
					data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'精品图片，' + word_name + '价格，' + word_name + '品牌 - 美丽说';
					data.keywords = word_name + '，' + word_name + '图片，' + word_name + '价格，' + word_name + '品牌，创意' + word_name; 
					data.meta_description = word_name + '是家居生活的必需品，想要挑选时尚优质创意低价的' + word_name + '，来看美丽说百万时尚网友精心挑选出的当季最流行的'+ word_name +'单品、最佳创意设计、购买心得、购买链接';
					break
				case '美容':
					if(data.catalog)
						data.catalog.currentWord = word_name = '美妆'
					data.pageTitle = '【多图】'+ word_name +' -  美妆排行榜，美容用法推荐，化妆品价格品牌 - 美丽说';
					data.keywords = '美妆，美容，化妆品，美丽说';
					data.meta_description = '逛一逛美丽说千万时尚女白领精心挑选出的当季最流行的美妆单品，众多时尚达人分享最佳用法、购买心得、购买链接，逛美妆和千万MM一起修炼变美';
					break
				default:
					data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'单品，'+ word_name +'女装，'+ word_name +'服饰搭配购买 - 美丽说';
					data.keywords = word_name + ', ' + word_name + '价格, ' + word_name + '女装, ' + word_name + '单品推荐, ' + word_name + '搭配';
					data.meta_description = word_name + '是当前流行的服饰搭配元素，想要把' + word_name + '搭得美丽，来看美丽说百万时尚网友精心挑选出的当季最流行的' + word_name + '单品、最佳搭配、购买心得、购买链接';
			}
			data.onlyShowGoTop = true;
			data.headTag = catalogid;
			// true 宽屏 
			data.fluid = true;
			//true 二级导航
			if(catalogid == 'dress') data.secondNav = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.page_size = 220;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			//是否显示小尺寸 
			data._CSSLinks = ['catalog'];
			data.isShow = true;
			data.showSecNavHeader = true;


			if (nid){
				mSelf.render('guang/catalogTwo.html' , data);
			}else{
				mSelf.render('guang/catalog.html' , data);
			}
		});	
	},
	'attr' : function(name , isBrand){
		// console.log(name);
		var word = this.readData('word',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		if(!word && !name) return this.errorPage(); 
		this.req.__get.frame = 0;
	
		if (name){
			this.req.__get['word_id'] = name;
			this.req.__get[isBrand ? 'word_name':'word'] = name;
		}
		// this.req.__get.attr_id = name;
		var mSelf = this;
		var php = {
			'attr_match' : '/goods/attribute_match',
			'attr_keywords' : '/goods/attribute_keywords_recommend',
			//'attr_shop' : '/goods/attribute_shop',
			'attr_baike' : '/goods/attribute_baike',
			'attr_title_keywords' : '/goods/attribute_title',
			//'totalNum' : '/goods/attribute_totalnum',
			'attr_brand' : '/goods/attribute_brand',
			'attr_top' : '/goods/Attribute_top_ten',
			'attr_words' : '/welcome/attr_words',
			'season' : '/customactivity/CustomActivity_seasonal_special_banner',
			'catalog' : '/note/attr_navigation_words?attr_id='+ name,
			'navigate' : '/navigate/navigate_hot'
		};
		php.poster0 = '/goods/attribute_poster'

		if (name){
			php['p4p'] = '/pfp/pfp_hot?key_id='+name + '&tp=3'
		}
		if (!isBrand){
			php['attr_style'] = '/goods/attribute_best_style';
			php['attr_description'] = '/goods/attribute_description';
			//brand有引用，先hook下
			delete php['season'];
		}
		if (name && !isBrand && !isNaN(name)) {
			php['adm1'] = '/adm/ad_Show?slot_id=1&attr_id=' + name
			php['adm3'] = '/adm/ad_Show?slot_id=3&attr_id=' + name
		}
		
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isMagFavor = magFavor;
			delete mSelf.req.__get['word_name'];
			var word_name = data.attr_title_keywords.word_name;
			if(!word_name) return mSelf.errorPage();

			var attr_matchs = JSON.parse(JSON.stringify(data.attr_match));
			var k = attr_matchs.length-1>1 ? 2 : attr_matchs.length-1;
			var dcb = '';
			var i = 0;
			for(; i<k; i++){
				dcb += attr_matchs[i].word_name + '，';
			}
			dcb = dcb.slice(0, -1);
			var meta_description = '';
			if(data.attr_description){
				meta_description += data.attr_description.title + ': ' + data.attr_description.prefix + '，' + data.attr_description.content;
				meta_description += ' 另提供' + word_name + '的推荐搭配如' + dcb + '.';
			} else {
				meta_description += word_name + '推荐搭配如' + dcb + ';喜欢' + word_name + '的还喜欢:';
				var attr_keywords = JSON.parse(JSON.stringify(data.attr_keywords));
				k = attr_keywords.length-1>1 ? 2 : attr_keywords.length-1;
				dcb = '';
				i = 0;
				for(; i<k; i++){
					dcb += attr_keywords[i].word_name + '，';
				}
				dcb = dcb.slice(0, -1);
				meta_description += dcb + '等多种' + word_name + '信息';
			}
			data.meta_description = meta_description;
			data.pageTitle = word_name + '【多图】' + word_name +'搭配及购买 - 美丽说';
			data.keywords = word_name;
			if (isBrand){
				data['_canonical'] = '/guang/attr/' + data.attr_title_keywords.word_id;
			} else {
				data['_mobileAgent'] = '/guang/attr/?attr_id=' + data.attr_title_keywords.word_id;
			}

			//data.headTag = 'guang';
			// true 宽屏 
			data.fluid = true;
			// 获取分页总数
			data.groupPg = {}; 
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			data.word_name = name;
			data.tplName = 'attr';
			data.frm = '?frm=attr_regroup';
			data.isShow = true;
			data.showAttr = isBrand ? false : true;
			delete mSelf.req.__get.frame
			data._CSSLinks = ['page_guang'];
			mSelf.render('guang/attr.html' , data);
		});
	},
	'brand' : function(name){
		this.attr(name , true );	
	},
	'report' : function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'totalNum' : '/goods/dressing_match_totalnum'
		};
		php['adm5'] = '/adm/ad_Show?slot_id=57';
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '搭配秀-美丽说';
			data._CSSLinks = ['report'];
			data.headTag = 'report';
			// true 宽屏 
			data.fluid = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page; 
			mSelf.render('guang/report.html' , data);	
		});	
	}
};

/* for small size poster abtest */
function isSplitFlow(mSelf, data, word) {
	//var modApp = mSelf.loadModel('mls/application.js');
	var modApp = base.loadModel('mls/application.js');
	var refer = modApp.getRefer(mSelf.req), 
		browser = modApp.getBrowser(mSelf.req);
	var notLogin = (data.userInfo.user_id == 0),
		isNewUser = modApp.isNewUser(mSelf.req, mSelf.res, '120608'),
		notIE6 = !(browser.msie && browser.version == '6.0'),
		isWeiboOrQQ = (refer == 'weibo' || refer == 'gdt.qq'),
		isFlowPercent = modApp.isPercent(mSelf.req, mSelf.res, 2);	//  (1/2)
	return notLogin && notIE6 && isNewUser && isWeiboOrQQ && isFlowPercent && (word == '34942' || word == '34347');
}

/* #2808,2835 */
function isMagFavor(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	var isNew = modApp.isNewUser(mSelf.req, mSelf.res);
	var browser = modApp.getBrowser(mSelf.req);
	var notSafari = !(browser.safari || browser.chrome);
	return isNew && notSafari;
}
exports.__create = controller.__create(guang , controlFns);
