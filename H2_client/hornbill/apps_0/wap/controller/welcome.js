function welcome(){
	return this;
}
var controlFns = {
	'old' : function(){
		// old welcome page
		return this.index();

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
			data.pageTitle = '美丽说首页 - 只做正确流行款; 独家冠名《奔跑吧兄弟3》';
			data.meta_description = '美丽说, 只做正确流行款. 独家冠名《奔跑吧兄弟》! 平台聚集强大的资深时尚买手团队, 每日推出正确新款, 传授最权威的穿衣经验, 全方位解读搭配技巧, 打造当季最前沿的正确流行款!';
			data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data._CSSLinks = ['welcome'];
			data.headTag = 'welcome';
			mSelf.render('welcome.html' , data);
		});
	},
	'_index' : function(){
		// old welcome page
		return this.index();

		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'homeBanner' : '/banner/home_banner_m?__get_r=1'
			, 'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			,'hotsale' : '/dict/rand_book?__get_r=1'
			, 'navigate' : '/navigate/navigation_cover_m_v2?__get_r=1'
			, 'tuan' : '/groupon/groupon_get_banners_mob?locationKey=home_zhekouzhuanqu_tuangoubanner&__get_r=1'
			, 'qingcang' : '/groupon/groupon_get_banners_mob?locationKey=home_qingcang&__get_r=1'
			, 'miaosha' : '/groupon/groupon_get_banners_mob?locationKey=home_miaosha&__get_r=1'
			, 'qiang8' : '/groupon/groupon_get_fixed_qiang8_banner_mob?__get_r=1'
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

		//	base.var_dump(data.homeBanner, false , 5);
			if(channel == '30930' || channel == '30931') data.isIqiyiApp = true;
			data.pageTitle = '美丽说首页 - 只做正确流行款; 独家冠名《奔跑吧兄弟3》';
			data.meta_description = '美丽说, 只做正确流行款. 独家冠名《奔跑吧兄弟》! 平台聚集强大的资深时尚买手团队, 每日推出正确新款, 传授最权威的穿衣经验, 全方位解读搭配技巧, 打造当季最前沿的正确流行款!';
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
	},
	'index': function() {
		var mSelf = this;
		var php = {
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu',
			'cate': '/navigate/navigate_left?more=picture',
			'run_man' : '/customactivity/CustomActivity_common_tool_singleNew?id=welcome_run_man&__get_r=1',
			'debut' : '/note/Note_welcome_debut_banner?__get_r=1',
			'fashion_focus' : '/note/Note_welcome_fashion_focus?__get_r=1',
			'business' : '/note/Note_welcome_category_banner?__get_r=1',
			'default_navigate' : '/navigate/navigate_public?more=picture'
		};
		// php['run_man_dis'] = '/navigate/navigate_discount?__get_r=1';
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			data.pageTitle = '美丽说首页 - 只做正确流行款; 独家冠名《奔跑吧兄弟3》';
			data.meta_description = '美丽说, 只做正确流行款. 独家冠名《奔跑吧兄弟》! 平台聚集强大的资深时尚买手团队, 每日推出正确新款, 传授最权威的穿衣经验, 全方位解读搭配技巧, 打造当季最前沿的正确流行款!';
			data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';

			data.use_rem_screen = '640_mate';
			data.page_tag = 'welcome';
			data.headTag = 'welcome';

			data._CSSLinks = ['welcome_tmp'];
			mSelf.render('welcome_tmp.html', data);
		});
	},
	'check_code':function(){
		this.redirectTo( '/user/check_code/', true )
	},
	risk_control: function(params){
    	var php = {
			'pic':  '/risk/captcha_picvalidate' //图片解除
			,'pic_dfz': '/risk/captcha_picvalidate_dfz' //图片解除 定福庄
			,'send_sms':'/risk/Captcha_sms' //发送短信
			,'sms':'/risk/Captcha_smsvalidate' //短信解除
			,'sms_dfz':'/risk/Captcha_smsvalidate_dfz' //短信解除 定福庄
			,'get_punish': '/risk/risk_common_get_punish'
			,'get_punish_dfz': '/risk/risk_common_get_punish_dfz'
		};
		this.ajaxTo(php[params]);
    }
}
exports.__create = controller.__create(welcome , controlFns);