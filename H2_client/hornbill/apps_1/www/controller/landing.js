function landing(){
	return this;	
}
var controlFns = {
	'index' : function(){
		this.errorPage();
	},
	'attr' : function(name){
		var cpc = this.readData('bob',this.req.__get, '');
		if (cpc === '') {
			if (!isSplitFlow(this) || name != '34295') {
				this.redirectTo('/guang/attr/'+name, true);		
				return;	
			}
		}
		var word = this.readData('word',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		if(!word && !name) return this.errorPage(); 
		this.req.__get['word'] = name;

		var php = {
			'attr_baike' : '/goods/attribute_baike',
			'attr_title_keywords' : '/goods/attribute_title',
			'totalNum' : '/goods/attribute_totalnum',
			'attr_brand' : '/goods/attribute_brand',
			'attr_words' : '/welcome/attr_words'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
				delete mSelf.req.__get['name'];
				var word_name = data.attr_title_keywords.word_name;
				if(!word_name) return mSelf.errorPage();
				data._CSSLinks = ['page_guang'];
				data.meta_description = word_name + '是当前流行的服饰搭配元素，想要把' + word_name + '搭得美丽，来看美丽说百万时尚网友精心挑选出的当季最流行的' + word_name + '单品、最佳搭配、购买心得、购买链接';
				data.pageTitle = '【多图】'+ word_name +' - '+ word_name +'单品，'+ word_name +'女装，'+ word_name +'服饰搭配购买 - 美丽说';
				data.keywords = word_name + ', ' + word_name + '价格, ' + word_name + '女装, ' + word_name + '单品推荐, ' + word_name + '搭配';
				data.headTag = 'guang';
				// 页面改为全部在新窗口打开
			//	data.isSetTargetBlank = true;
				// true 宽屏 
				data.fluid = true;
				// 获取分页总数
				data.groupPg = {}; 
				data.groupPg.total_num = data.totalNum.totalNum;
				data.groupPg.current_page = page; 
				data.groupPg.page_size = 160;
				data.word_name = name;
				data.tplName = 'attr';
				mSelf.render('landing/attr.html' , data);
		});
	},
	'goods' : function(attrName){
		var word = this.readData('word',this.req.__get, 0);
		var word_name = this.readData('word_name',this.req.__get, attrName);
		this.req.__get.word_name = word_name; 
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.bob = 'landing';	//for landing total num
		var title = {
			'new' : '最新',
			'popular' : '7天最热',
			'hot' : '24小时最热',
			'衣服' : '衣服'
		}
		var php = {
			'attr_title_keywords' : '/goods/attribute_title',
			'totalNum' : '/goods/attribute_totalnum',
			'friendlink' : '/friendlink/bottom',
			'attr_hot_keywords' : '/goods/popular_landing_keywords_new',
			'attrs' : '/goods/cpc_landing_attr_nine'
		};
		if(!title[attrName]){
			php['attr_baike'] = '/goods/attribute_baike';
		}
		if (attrName === '衣服') {
			php['totalNum'] = '/goods/catalog_totalnum';
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
//			if(!title[attrName] && data.attr_hot_keywords.indexOf(attrName) == -1) return mSelf.errorPage(); 
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
			data.headTag = 'guang';
			// true 宽屏 
			data.fluid = true;
			//获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = 160;

			delete mSelf.req.__get.word_name;
			delete mSelf.req.__get.word;
			mSelf.render('landing/goods.html' , data);
		});
	}
};
/* #2678 for cpc abtest */
function isSplitFlow(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	return modApp.isPercent(mSelf.req, mSelf.res, 2);	// (1/2)
}

exports.__create = controller.__create(landing , controlFns);
