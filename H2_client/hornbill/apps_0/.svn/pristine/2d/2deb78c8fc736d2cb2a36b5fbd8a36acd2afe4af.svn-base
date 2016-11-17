function welcome(){
	return this;
}
var controlFns = {
	'old' : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'essential' : '/navigate/navigation_cover_m'
			, 'homeBanner' : '/banner/home_banner_m'
			, 'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			,'hotsale' : '/dict/rand_book'
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
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Android6.2.1/Meilishuo_10008.apk?frm=wap_link_download'
			}
			data.refer = '/welcome';//refer;

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;

			data.frm = frm;
		//	base.var_dump(data.homeBanner, false , 5);
			if(channel == '30930' || channel == '30931') data.isIqiyiApp = true;
			data.pageTitle = '美丽说-专注时尚新款发布；独家冠名奔跑吧兄弟3';
			data.meta_description = '美丽说，专注时尚新款发布。海量新款每日上新，每周五新款大促火热进行中！旗下海淘品牌“HIGO”挑选全球时尚好货，满足你全方位的时尚购物体验！';
			data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data._CSSLinks = ['welcome'];
			data.headTag = 'welcome';
			mSelf.render('welcome.html' , data);
		});
	},
	'index': function() {
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'homeBanner' : '/banner/home_banner_m?__get_r=1'
			, 'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			, 'tuan' : '/groupon/groupon_recommend_list_wap?position=1&size=6',
			'seckill_time': 'groupon::/groupon/groupon_qiang_info?event_id=1065&type=0'
		};
		var channel = this.readData('channel',this.req.__get, '');
		var frm = this.readData('frm',this.req.__get, '');
		var mSelf = this;
		var refer = this.req.headers.referer;
		var param = channel;
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
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Android6.2.1/Meilishuo_10008.apk?frm=wap_link_download'
			}
			data.refer = '/welcome';//refer;

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;

			data.frm = frm;
			data.use_rem_screen = '640';

		//	base.var_dump(data.homeBanner, false , 5);
			if(channel == '30930' || channel == '30931') data.isIqiyiApp = true;
			data.pageTitle = '美丽说-专注时尚新款发布；独家冠名奔跑吧兄弟3';
			data.meta_description = '美丽说，专注时尚新款发布。海量新款每日上新，每周五新款大促火热进行中！旗下海淘品牌“HIGO”挑选全球时尚好货，满足你全方位的时尚购物体验！';
			data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data._CSSLinks = ['welcome_new'];
			data.headTag = 'welcome';
			mSelf.render('welcome_new.html' , data);
		});
	},
	'lightapp' : function(){
		var wapMod = base.loadModel('wap/tools.js')
		var php = {};
		var mSelf = this;
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
		var MLS_host = this.req.headers.host;
		// console.log("MLS_host:" + MLS_host);
		this.listenOver(function(data){
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}
			data.pageTitle = '美丽说 - 快时尚网购神器！';
			data.meta_description = '美丽说,购流行！中国最大的女性时尚购物商城，6000万女生的心水最爱，时尚达人必备的网购神器。全天24小时，每小时不间断商品更新。数千款流行服饰单品、鞋子、包包、配饰、美妆等你来挑选！';
			data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data._CSSLinks = ['welcome'];
			data.headTag = 'welcome';
			mSelf.render('welcome1.html' , data);
		});
	}
}
exports.__create = controller.__create(welcome , controlFns);
