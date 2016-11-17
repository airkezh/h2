function shareact(){
	return this;
}
var controlFns = {
	new_home : function(){
		var mSelf = this;
		var php = {
			'bs_bannar' : 'cosmetic::/Cosmetic/Cosmetic_wap_banner'
			, 'bs_rec' : 'cosmetic::/cosmetic/cosmetic_recommend'
			, 'guide' : 'cosmetic::/cosmetic/cosmetic_guide'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.bs_bannar) return mSelf.errorPage();

			data.curr_host = mSelf.req.headers.host;
			data.params_r = mSelf.readData('r', this.res.__get, '');

			data.pageTitle = '美妆';
			data.use_rem_screen = '640_mate';
			data._CSSLinks = ["biz/beauty_sale/new_home"];
			mSelf.render("biz/beauty_sale/new_home.html", data);
		});
	},
	new_pk : function(){
		var mSelf = this;
		var php = {
			'pk_online' : 'cosmetic::/promote/pk_list?page_size=30'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.params_r = mSelf.readData('r', this.res.__get, '');
			data.pageTitle = '美妆PK台';
			data._CSSLinks = ["biz/beauty_sale/new_pk"];
			mSelf.render("biz/beauty_sale/new_pk.html", data);
		});
	},
	new_circle : function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.params_r = mSelf.readData('r', this.res.__get, '');
			data.pageTitle = '全球败';
			data._CSSLinks = ["biz/beauty_sale/new_circle"];
			mSelf.render("biz/beauty_sale/new_circle.html", data);
		});
	},
	new_brand : function(params){
		var mSelf = this;
		var php = {
			'bs_bannar' : 'cosmetic::/Cosmetic/Cosmetic_wap_banner',
			'brand_rec' : 'cosmetic::/promote/brand_module_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '品牌街';
			data._CSSLinks = ["biz/beauty_sale/new_brand"];
			mSelf.render("biz/beauty_sale/new_brand.html", data);
		});
	},
	new_efficacy : function(params){
		var mSelf = this;
		var php = {
			'efficacy' : 'cosmetic::/cosmetic/cosmetic_wap_efficacy?nid=4289',
			'goods' : '/customactivity/CustomActivity_wap_spring_carnival_list?offset=0&frame=1&trace=0&limit=10&pid=41051&type=wap'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '功效区';
			data.use_rem_screen = 640;
			console.log(data.goods)
			data._CSSLinks = ["biz/beauty_sale/new_efficacy"];
			mSelf.render("biz/beauty_sale/new_efficacy.html", data);
		});
	},
	main : function(){
		return this.new_home();


		var mSelf = this;
		var php = {
			'bs_bannar' : 'cosmetic::/Cosmetic/Cosmetic_wap_banner',
			'brand_rec' : 'cosmetic::/promote/brand_module_get',
			'pk_online' : 'cosmetic::/promote/pk_list?page_size=30'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.bs_bannar) return mSelf.errorPage();

			data.r = mSelf.readData('r', this.res.__get, '');

			data.pageTitle = '美妆'
			data._CSSLinks = ["biz/beauty_sale/act_home"];
			mSelf.render("biz/beauty_sale/act_home.html", data);
		});
	},
	list : function(){
		var mSelf = this;
		var php = {
			'list' : 'cosmetic::/Wapactivity/Promote_act?frame=0'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.list) return mSelf.errorPage();
			data._CSSLinks = ['biz/beauty_sale/list'];
			mSelf.render("biz/beauty_sale/list.html", data);
		});
	},
	brandList : function(){
		var mSelf = this;
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.pageTitle = mSelf.readData('brand_name', this.res.__get, '美妆品牌街');
			data._CSSLinks = ['biz/beauty_sale/brand_list'];
			mSelf.render("biz/beauty_sale/brand_list.html", data);
		});
	},
	beautySale : function(){
		var mSelf = this;
		var wapMod = this.loadModel('tools.js');
		var ac_id = this.readData('ac_id', this.res.__get, 0);
		var php = {
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			'top_banner' : 'cosmetic::/Wapactivity/Activity_bannerV3',
			'summer_goods' : 'cosmetic::/Wapactivity/Activity_goodsV3',
			'act_ads' : 'cosmetic::/Wapactivity/Activity_ads',
			'shareApi' : 'cosmetic::/Wapactivity/activity_words'
		};

		//wap页面导流策略
		php.channel_info = '/customactivity/CustomActivity_common_tool_single?id=wap_channel';
		php.leadApp = '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu';
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get';
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.summer_goods || !data.top_banner){
				return mSelf.errorPage();
			}

			//wap页面导流策略
			var channel = mSelf.readData('channel', mSelf.req.__get, '');
			if (data.os.iphone || data.os.ipad){
				data.appUrl = 'http://itunes.apple.com/cn/app/meilishuo/id431023686';
			} else {
				if (!channel || (data.apks && !data.apks[channel])) channel = 'web';
				if (data.apks && data.apks[channel] && data.apks[channel].src){
					data.appUrl = data.apks[channel].src;
				} else {
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk';
				}
			}
			data.showZhiDing = wapMod.showZhiDing(mSelf.req, mSelf.res, data.channel_info.channel, channel);
			data.locationUrl = mSelf.req.headers.host + mSelf.req.url;
			data.mlsApp = data.os.mlsApp;

			//share
			var shares = false;
			if (data.shareApi) {
				var params = {
					'title' : {
						'weixin' : data.shareApi.weixin_title,
						'weixin_timeline' : data.shareApi.weixin_title,
						'default' : data.shareApi.weixin_title
					},
					'text' : {
						'weixin' : data.shareApi.weixin_words,
						'weixin_timeline' : data.shareApi.weixin_words,
						'default' : data.shareApi.weibo_words
					},
					'pic' : {
						'weixin' : data.shareApi.weixin_picture,
						'weixin_timeline' : data.shareApi.weixin_picture,
						'default' : data.shareApi.weibo_picture
					},
					'url' : 'http://m.meilishuo.com/biz/shareact/beautySale/?ac_id='+ ac_id
				};
				var shares = wapMod.shareTo(mSelf.req, params);
			}
			data.share = shares;

			data.ac_id = ac_id;

			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;

			data.pageTitle = data.top_banner.show_name;

			data._CSSLinks = ["biz/beauty_sale/act_basic"];
			mSelf.render("biz/beauty_sale/act_basic.html", data);
		});
	},
	girls : function(){
		var mSelf = this;
		var wapMod = this.loadModel('tools.js')
		var cid = this.readData('cid',this.req.__get, '');
		var ac_id = this.readData('ac_id', this.res.__get, 0);
		var php = {
			'summer_goods' : 'cosmetic::/Wapactivity/Activity_goodsV3',
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_mz_girls&cid='+cid,
			'shop_coupon' : '/shop/shop_coupon_apply',
			'act_ads' : 'cosmetic::/Wapactivity/Activity_ads',
			'coupon' : '/customactivity/XiaomiActivity_coupon_status',
			'shareApi' : '/Wapactivity/activity_words'
		};

		//wap页面导流策略
		delete this.req.__get.cid;
		php.channel_info = '/customactivity/CustomActivity_common_tool_single?id=wap_channel';
		php.leadApp = '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu&cid=2331';
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.summer_goods || !data.pageData){
				return this.errorPage();
			}

			//wap页面导流策略
			var channel = mSelf.readData('channel', mSelf.req.__get, '');
			if (data.os.iphone || data.os.ipad){
				data.appUrl = 'http://itunes.apple.com/cn/app/meilishuo/id431023686';
			} else {
				if (!channel || (data.apks && !data.apks[channel])) channel = 'web';
				if (data.apks && data.apks[channel] && data.apks[channel].src){
					data.appUrl = data.apks[channel].src;
				} else {
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk';
				}
			}
			data.showZhiDing = wapMod.showZhiDing(mSelf.req, mSelf.res, data.channel_info.channel, channel);
			data.locationUrl = mSelf.req.headers.host + mSelf.req.url;
			data.mlsApp = data.os.mlsApp;

			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent(this.req.url) + '&bg='+ encodeURIComponent(this.req.url) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/');
			if(data.shareApi){
				var shareData = data.shareApi;
				var params = {
					'title' : shareData.weixin_title,
					'text' : shareData.weixin_words,
					'pic' : {
						"weixin" : shareData.weixin_picture,
						"weixin_timeline" : shareData.weixin_picture,
						"default" : shareData.weibo_picture
					},
					'url' : shareURL
				};
				data.share = wapMod.shareTo(this.req, params);
			}
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			data.cid = cid;
			data.ac_id = ac_id;

			data._CSSLinks = ["biz/beauty_sale/girls"];
			mSelf.render("biz/beauty_sale/girls.html", data);
		});
	},
	beautyBox : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_mz_box',
			'mobUserInfo' : '/customactivity/CustomActivity_wap_user_info',
		};
		var wapMod = this.loadModel('tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/biz/shareact/beautyBox/') + '&bg='+ encodeURIComponent('/biz/shareact/beautyBox/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/shareact/beautyBox/');
			var shareData = data.pageData.share;
			if(shareData && shareData.title){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}

			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;

			data._CSSLinks = ["biz/beauty_sale/mz_beautyBox"];
			mSelf.render("biz/beauty_sale/mz_beautyBox.html", data);
		});
	},
	beautyBoxShow : function(){
		var wapMod = this.loadModel('tools.js');
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_mz_box_1',
			'top_rank' : '/cosmetic/cosmetic_shoppingshow_girl',
			'nor_rank' : '/cosmetic/cosmetic_shoppingshow_moreexpert'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/biz/shareact/beautyBoxShow/') + '&bg='+ encodeURIComponent('/biz/shareact/beautyBoxShow/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/shareact/beautyBoxShow/');
			var shareData = data.pageData.share;
			if(shareData && shareData.title){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}

			data._CSSLinks = ["biz/beauty_sale/mz_beautyBoxShow"];
			mSelf.render("biz/beauty_sale/mz_beautyBoxShow.html", data);
		});
	},
	pushWelfare : function(){
		var mSelf = this;
		var php = {
			'pageData' : 'cosmetic::/promote/Benefit_activity_goods_list'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData) return mSelf.errorPage();
			data._CSSLinks = ["biz/beauty_sale/pushWelfare"];
			mSelf.render("biz/beauty_sale/pushWelfare.html", data);
		});
	},
	groupShopping : function(group_id){
		var mSelf = this;
		var php = {
			'pageData' : 'cosmetic::/promote/Group_detail?group_id=' + group_id,
			'connect_weixin' : '/connect/weixin?type=1',
			'userInfo': '/customactivity/CustomActivity_wap_user_info',
			'weixin_sign' : '/promote/Weixin_sign?url=' + encodeURIComponent('http://m.meilishuo.com' + this.req.url)
		};

		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0

		var wapMod = this.loadModel('tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(weixinBrowser){
				connectWX(mSelf, data);
			}else{
				data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			}

			if(!data.pageData) return mSelf.errorPage();

			var shareData = data.pageData.info;
			var shareURL = 'http://'+this.req.headers.host+'/biz/shareact/groupShopping/'+group_id
			var params = {
				'title' : shareData.page_title,
				'text' : shareData.weixin_title,
				'pic' : {
					"weixin" : shareData.weixin_picture,
					"weixin_timeline" : shareData.weixin_picture,
					"default" : shareData.weixin_picture
				},
				'url' : shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params, ['weixin_timeline','weixin']);

			data.group_id = group_id;
			data.pageTitle = data.pageData.info.page_title || '拼购活动 - 美丽说';

			data._CSSLinks = ["biz/beauty_sale/groupShopping"];
			mSelf.render("biz/beauty_sale/groupShopping.html", data);
		});
	},
	pkbang : function(){
		var mSelf = this;
		var php = {
			'pageData' : 'cosmetic::/promote/pk_detail',
			'commentData' : 'cosmetic::/promote/pk_comment_get',
			'userInfo_wap': '/customactivity/CustomActivity_wap_user_info'
		};

		// this.debugSnake({'target':'devlab3'})
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(!data.pageData) return mSelf.errorPage();

			data.pageTitle = '美妆PK台 - 美丽说';
			data._CSSLinks = ["biz/beauty_sale/pkbang"];
			mSelf.render("biz/beauty_sale/pkbang.html", data);
		});
	},
	pkbang_new : function(){
		var mSelf = this;
		var php = {
			'pageData' : 'cosmetic::/promote/Pk_info',
			'userInfo_wap': '/customactivity/CustomActivity_wap_user_info'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(!data.pageData) return mSelf.errorPage();

			data.pageTitle = data.pageData.pkInfo.title;
			data._CSSLinks = ["biz/beauty_sale/pkbang_new"];
			mSelf.render("biz/beauty_sale/pkbang_new.html", data);
		});
	},
	description : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mzws_description'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(!data.pageData) return mSelf.errorPage();

			data.pageTitle = data.pageData.title;
			data._CSSLinks = ["biz/beauty_sale/description"];
			mSelf.render("biz/beauty_sale/description.html", data);
		});
	},
	miao_push : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=miao_act_push'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(!data.pageData) return mSelf.errorPage();

			data.pageTitle = data.pageData.header.title || '美喵push中转页';
			data._CSSLinks = ["biz/beauty_sale/miao_push"];
			mSelf.render("biz/beauty_sale/miao_push.html", data);
		});
	}
};

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);
}
exports.__create = controller.__create(shareact , controlFns); 
