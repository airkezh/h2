function guang(){
	return this;
}
var title = {
	'new' : '最新',
	'selected' : '流行',
	'hot' : '热门'
}
var controlFns = {
	'index' : function(attrName){
		if(!attrName)
			attrName = this.readData('word',this.req.__get, 'new')
		attrName = title[attrName] ? attrName : 'new'
		this.goods(attrName);
		// console.log(attrName) new
	},
	'goods' : function(attrName){
		var wapMod = base.loadModel('wap/tools.js')
		var tpl = this.readData('tpl', this.req.__get,'');
		this.req.__get.type = attrName;
		var channel = this.readData('channel',this.req.__get, '');
		var php = {
			'bread' : '/navigate/navigation_path_m?__get_r=1'
			,'banner' : '/customactivity/CustomActivity_general?id=13&__get_r=1'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			,'essential' : '/navigate/navigation_cover_m?__get_r=1'
		};
		var mSelf = this;
		var refer = this.req.headers.referer;
		var frm = this.readData('frm',this.req.__get, '');
		var param = channel || param
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			data.leadApp.foot_banner = false;

			data.frm = frm;
			data.ptype = attrName;
			// data.headTag = 'goods';
//			data.cache = true;

			if(title[attrName]){
				data.attrName = attrName;
				data.currentWord = title[attrName];
			}
			data.pageTitle = title[attrName] + '单品【多图】-'
							+ title[attrName]
							+ '单品新款女装，品牌服饰购买及搭配图片-美丽说';
			data.meta_description = title[attrName]+'单品是当前流行的服饰搭配元素，想要把'
									+title[attrName]+'单品元素搭得美丽，来美丽说购买让千万时尚MM心水的当季最流行的'
									+title[attrName]+'单品、看'
									+title[attrName]+'单品最佳搭配、购买评价、购物晒单';
			data.keywords = title[attrName]+'单品，'+title[attrName]+'单品新款,'+title[attrName]
							+'单品女装,'+title[attrName]+'单品搭配,'+'单品购买,'+title[attrName]+'单品淘宝,'
							+title[attrName]+'单品价格';
			data.show_carticon = true;

			data.use_rem_screen = '640_mate';
			data.page_tag = 'guang';

			data._CSSLinks = ['guang_new'];
			mSelf.render('guang_new.html' , data);
		});
	},

	'catalog' : function(catalogid){
		var wapMod = base.loadModel('wap/tools.js')
		var tpl = this.readData('tpl', this.req.__get,'');
		var nid = this.readData('nid',this.req.__get, 0);
		var php = {
			'route' : '/navigate/navigation_children_m?__get_r=1'
			, 'bread' : '/navigate/navigation_path_m?__get_r=1'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
		};
		var channel = this.readData('channel',this.req.__get, '');
		var frm = this.readData('frm',this.req.__get, '');
		var mSelf = this;
		var refer = this.req.headers.referer;
		var param = channel || param
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.show_carticon = true;

			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			data.leadApp.foot_banner = false;
			if (!data.bread.data) return mSelf.errorPage();
			//base.var_dump(data.catalog, false , 5);
			data.pid = nid;
			data.ptype = 'catalog';
			data.headTag = 'catalog';
			data.frm = frm;
			data.currentWord = data.bread.data[data.bread.data.length - 1].word_name;
			data.getAppLinkUrl = data.bread.data[data.bread.data.length - 1].url
			data.pageTitle = data.currentWord + '【多图】-'
							+ data.currentWord
							+ '新款女装，品牌服饰购买及搭配图片-美丽说';
			data.meta_description = data.currentWord+'是当前流行的服饰搭配元素，想要把'
									+data.currentWord+'元素搭得美丽，来美丽说购买让千万时尚MM心水的当季最流行的'
									+data.currentWord+'单品、看'
									+data.currentWord+'最佳搭配、购买评价、购物晒单';
		//	data.cache = true;
			data.keywords = data.currentWord+'，'+data.currentWord+'新款,'+data.currentWord
							+'女装,'+data.currentWord+'搭配,'+data.currentWord+'购买,'+data.currentWord+'淘宝,'
							+data.currentWord+'价格';

			data.use_rem_screen = true;
			data.page_tag = 'guang';

			data._CSSLinks = ['guang_new'];
			mSelf.render('guang_new.html' , data);

		});
	},

	'attr' : function(attrid){
		var wapMod = base.loadModel('wap/tools.js')
		var attr_id = attrid ? attrid : this.readData('attr_id')
		this.req.__get.attr_id = attr_id;
		var ntid = this.readData('ntid', this.req.__get,'');
		var php = {
			'route' : '/navigate/navigation_children_m?__get_r=1'
			, 'bread' : '/navigate/navigation_path_m?__get_r=1'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'

		};

		var mSelf = this;
		var channel = this.readData('channel',this.req.__get, '');
		var frm = this.readData('frm',this.req.__get, '');
		var refer = this.req.headers.referer;
		var param = channel || param
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.show_carticon = true;

			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			data.leadApp.foot_banner = false;

			if (!data.bread.data) return mSelf.errorPage();
			//base.var_dump(data.catalog, false , 5);
			data.pid = attr_id;
			data.ptype = 'attr';
			data.headTag = 'attr';
			data.frm = frm;
			data.currentWord = data.bread.data[data.bread.data.length - 1].word_name;
			data.getAppLinkUrl = data.bread.data[data.bread.data.length - 1].url
			data.pageTitle = data.currentWord + '【多图】- '
							+ data.currentWord
							+ ' 新款女装，品牌服饰购买及搭配图片-美丽说';
			data.meta_description = data.currentWord+'是当前流行的服饰搭配元素，想要把'
									+data.currentWord+'元素搭得美丽，来美丽说购买让千万时尚MM心水的当季最流行的'
									+data.currentWord+'单品、看'
									+data.currentWord+'最佳搭配、购买评价、购物晒单';
			data.keywords = data.currentWord+'，'+data.currentWord+'新款,'+data.currentWord
							+'女装,'+data.currentWord+'搭配,'+data.currentWord+'购买,'+data.currentWord+'淘宝,'
							+data.currentWord+'价格';
			data.cache = true;

			data.use_rem_screen = true;
			data.page_tag = 'guang';

			data._CSSLinks = ['guang_new'];
			mSelf.render('guang_new.html' , data);
		});
	},
	'catalog_new' : function(){
		var mSelf = this;
		var tag_word = mSelf.readData('tag_word', mSelf.req.__get, '');
		var php = {
			'attr_word' : '/navigate/navigate_right?type=text_pic-simplify'
			, 'poster0' : '/search/search_tag_poster?frame=0&section=hot'
			, 'down_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_download_set&$'
		};
		if(tag_word){
			php['attr_intro'] = '/search/search_tag_header?tag_word=' + encodeURIComponent(tag_word);
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.tag_word = tag_word;
			data.page_tag = 'guang';

			data.pageTitle = '【多图】' + tag_word + ' - 2015新款' + tag_word + '，' + tag_word + '搭配，价格，折扣，款式 - 美丽说.higo冠名跑男3';
			data.keywords = tag_word + '，新款' + tag_word + '，' + tag_word + '搭配，' + tag_word + '价格，' + tag_word + '折扣，' + tag_word + '款式';
			data.meta_description = tag_word + '是当前流行的服饰搭配元素，想要把' + tag_word + '搭得美丽，来看美丽说.higo百万时尚网友精心挑选出的当季最流行的' + tag_word + '单品、最佳搭配、购买心得、折扣信息。';

			data._CSSLinks = ['guang/new'];
			mSelf.render('guang/new.html', data);
		});
	}
};

exports.__create = controller.__create(guang , controlFns);
