function clearance(){
	return this;
}
var controlFns = {
	'index' : function(){
		// this.debugSnake({'target':'devlab1'});
		this.redirectTo("/clearance/channel/");
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		var pageShareURL = encodeURIComponent('/clearance');
		var welUrl = encodeURIComponent('http://www.meilishuo.com/welcome/')
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+ welUrl;
		
		var php = {
			'banner' : '/clearance/topic'//?code=mob_discount&id=7271'
			,'shop_list' : '/clearance/detail'//'/clearance/shop?frame=1'
			,'toast' : '/clearance/toast'
			,'share_info' : '/customactivity/CustomActivity_common_tool_single?id=fuider_wap_special&cid=7053'
			// ,"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// console.log(data.userInfo.user_id);
			data.userInfo.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			var shareList = data.share_info.share || {};
			var params = {
				'title' : shareList.title,
				'text' : shareList.text,
				'pic' : {
					"weixin" : shareList.src,
					"weixin_timeline" : shareList.src,
					"default" : shareList.src
				},
				'url' : shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);

			data._CSSLinks = ['clearance/clearance'];	
			data.pageTitle = '清仓';
			
			this.render('activity/clearance.html', data);
		});

	},
	'channel' : function(){
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/clearance/channel/')+'&bg='+encodeURIComponent('/clearance/channel/')+'&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		var ua = this.req.headers['user-agent'];
		var platform = false;
        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }
		var php = {
			'banner' : 'groupon::/qingcang/Qingcang_Top_Banner'
			, 'initshopList' : 'groupon::/qingcang/Qingcang_Shop_List?tab=1'
			, 'toast' : 'groupon::/qingcang/Qingcang_Buy_Tips'
			, 'foreShopList' : 'groupon::/qingcang/Qingcang_Shop_List?tab=4'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if (!data.initshopList) return mSelf.errorPage();
			var params = {
				'title' : '美丽说--服饰清仓活动抢购中…'
				, 'text' : '美丽说--服饰清仓活动抢购中…'
				, 'pic' : data.banner && data.banner.data && data.banner.data.banner && data.banner.data.banner.length && data.banner.data.banner[0]
				, 'url' : shareURL
			};
			data.isIphone = platform;
			data.share = wapMod.shareTo(mSelf.req, params);
			data.use_rem_screen = true;
			data._CSSLinks = ['clearance/channel'];
			data.pageTitle = '清仓频道';
			this.render('activity/clearance/channel.html', data)
		})
	},
	'shop' : function(id){
		var mSelf = this;
		var id = id || 1089;
		var shopTab = this.req.__get.shop_tab || 1;
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/clearance/shop/')+'&bg='+encodeURIComponent('/clearance/shop/')+'&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		var php = {
			'shopinfo' : 'groupon::/qingcang/Qingcang_Shop_Info?id='+id+'&shop_tab='+ shopTab 
			, 'tabs' : 'groupon::/qingcang/Qingcang_goods_tab'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data.userInfo.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			if (!data.shopinfo) return mSelf.errorPage();
			data.id = id;
			data.use_rem_screen = true;
			data._CSSLinks = ['clearance/shop'];
			data.pageTitle = data.shopinfo && data.shopinfo.data && data.shopinfo.data.data.name;
			this.render('activity/clearance/shop.html', data)
		})
	},
	'market' : function(event_id){
		var mSelf = this;
		var event_id = event_id||this.req.__get.event_id;
		var tab = this.readData('tab',this.req.__get, 0);
		var ua = this.req.headers['user-agent'];
		var platform = false;
        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }
        var php = {
        	'topbanner' : 'groupon::/qingcang/Qingcang_Activity_Top_Banner?event_id='+event_id
        };
        this.bindDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function (data){
        	if(!data.topbanner) return mSelf.errorPage();
        	data.isIphone = platform;
        	data.tab = tab;
        	data.event_id = event_id;
        	data.use_rem_screen = true;
        	data._CSSLinks = ['clearance/market'];
        	data.pageTitle = data.topbanner && data.topbanner.data.title;
        	this.render('activity/clearance/market.html', data)
        })

	},
	'shopList' : function(){
		this.ajaxTo('groupon::/qingcang/Qingcang_Shop_List')
	},
	'goodsList' : function(){
		this.ajaxTo('groupon::/qingcang/Qingcang_Shop_Info')
	},
	'activityShopList' : function(){
		this.ajaxTo('groupon::/qingcang/Qingcang_Activity_Shop_List')
	}
}
exports.__create = controller.__create(clearance , controlFns);
