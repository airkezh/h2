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
	},
	'goods' : function(attrName){
		var wapMod = base.loadModel('wap/tools.js')
		var tpl = this.readData('tpl', this.req.__get,'');
		this.req.__get.type = attrName;
		var channel = this.readData('channel',this.req.__get, ''); 
		var poster0 = {
			'new' : '/poster/latest_poster_m'
			, 'hot' : '/poster/popular_poster_m'
			, 'selected' : '/poster/selected_poster_m'
		}
		var php = {
			'bread' : '/navigate/navigation_path_m'
			,'banner' : '/customactivity/CustomActivity_general?id=13'
			,'poster0' : poster0[attrName]
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
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

			data.frm = frm;
			data.ptype = attrName;
			data.headTag = 'goods';
//			data.cache = true;

			if(title[attrName]){
				data.attrName = attrName;
				data.currentWord = title[attrName];
			}

			data._CSSLinks = ['guang'];
			mSelf.render('guang.html' , data);

		});
	},

	'catalog' : function(catalogid){
		var wapMod = base.loadModel('wap/tools.js')
		var tpl = this.readData('tpl', this.req.__get,'');
		var nid = this.readData('nid',this.req.__get, 0);
		var php = {
			'route' : '/navigate/navigation_children_m'
			, 'bread' : '/navigate/navigation_path_m'
			, 'poster0' : '/poster/navigation_poster_m'
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

			if (!data.bread) return mSelf.errorPage();
			//base.var_dump(data.catalog, false , 5);
			data.pid = nid;
			data.ptype = 'catalog';
			data.headTag = 'catalog';
			data.frm = frm;
			data.currentWord = data.bread[data.bread.length - 1].word_name;
			data.getAppLinkUrl = data.bread[data.bread.length - 1].url

		//	data.cache = true;

			data._CSSLinks = ['guang'];
			mSelf.render('guang.html' , data);

		});	
	},

	'attr' : function(attrid){
		var wapMod = base.loadModel('wap/tools.js')
		var attr_id = attrid ? attrid : this.readData('attr_id')
		this.req.__get.attr_id = attr_id; 
		var ntid = this.readData('ntid', this.req.__get,'');

		var php = {
			'route' : '/navigate/navigation_children_m'
			, 'bread' : '/navigate/navigation_path_m'
			, 'poster0' : '/poster/attribute_poster_m'
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
				
			if (!data.bread) return mSelf.errorPage();
			//base.var_dump(data.catalog, false , 5);
			data.pid = attr_id;
			data.ptype = 'attr';
			data.headTag = 'attr';
			data.frm = frm;
			data.currentWord = data.bread[data.bread.length - 1].word_name;
			data.getAppLinkUrl = data.bread[data.bread.length - 1].url

//			data.cache = true;

			data._CSSLinks = ['guang'];
			mSelf.render('guang.html' , data);
		});	
	}
};

exports.__create = controller.__create(guang , controlFns);
