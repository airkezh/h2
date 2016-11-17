function wx(){
	return this;
}
var cookie = require(config.path.base + 'cookie.js')
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'mall'
		this[args]()
	},
	/* PC微信互联登陆 */
	'connectWeb' : function(){
		var php = {}
		this.bridgeMuch(php)
		this.listenOver(function(data){
			var connectUrl= data.MAIN_SITE_DOMAIN || 'http://www.meilishuo.com/'
			connectUrl += '/connect/connect/weixin'
			this.redirectTo(connectUrl , true)
			})
	},
	'mall' : function(args){
		var pageName = args
			,cate_id = this.req.__get.cate_id || 0

		// pageName = pageName || 'daily'

		if(pageName == 'tuan') return this.tuan();
		if( !pageName || pageName == 'daily') return this.daily();

		var php = {
			// 'discount' : '/weixin/weixin_mall_discount?page_name=' + pageName
		   'goods' : '/weixin/weixin_mall_normal_goods?page_name=' + pageName
		   , 'banner' : '/weixin/weixin_mall_banner?page_name=' + pageName
		   , 'nav_top' : '/weixin/Weixin_mall_pagetitle?page_name=' + pageName
		   // , 'can_hit' : '/weixin/Weixin_d38_has_an_egg'
		}

		var navTitle = {
			'daily': { 'title' : '美丽说','navNum':0}
			, 'tuan' : { 'title' : '美丽说','navNum':1}
			, 'cosmetic' : { 'title' : '美丽说','navNum':2}
		}
		var pageTitle = navTitle[pageName]['title']
			,pageNum = navTitle[pageName]['navNum'];

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
            connectWX(this, data);
			data.url = this.req.url.replace(/\?[\w\W]*/g,'');
			data.pageNum = pageNum
			/*二三级菜单数据*/
			data.navInfo = data.nav_top[pageNum]
			/*三级菜单cate_id*/
			data.nowCate =  cate_id || data.navInfo.defaultcate_id || '3101';
			/*二级菜单cate_id*/
			data.act = this.req.__get.act || data.nowCate

			data.share = true;
			data.pageName = pageName;
			data.pageTitle = pageTitle
			data._CSSLinks = ['wx_new/mall'];
			this.render('wx_new/mall.html' , data);
		});
	},
	/*  新版首页 2015-07-14需求 */
	'daily' : function(){
		// this.debugSnake({target : 'longchi.rdlab'});
		var wxGuide = this.req.__get.wx_guide || 0;
		var php = {
			'connect_weixin': '/connect/weixin'
			, 'banner' 		: '/weixin/weixin_mall_banner?page_name=daily'
			, 'discount_99' : '/weixin/Weixin_mall_sale_perform'
			, 'new_release' : '/weixin/weixin_mall_debut_banner'
			, 'running_man' : '/weixin/weixin_mall_running_area'
			, 'default_key' : '/weixin/search_default_words'
			, 'popular'		: '/weixin/weixin_mall_fashion_focus'
			, 'top_entry' 	: '/weixin/weixin_mall_top_entrance'
			, 'message'		: 'im::/im/open_msg_num?appkey=666666&appsecret=d9044d3f5caf36b874daca20b76a1b8a&uid=1024&source=wap'
			,'promotion' 	: '/weixin/weixin_mall_promote_1225?cid=16896'

		}
		var cookieHandler = cookie.getHandler(this.req ,this.res);
		var firstGoIn = cookieHandler.get('firstGoIn');
		cookieHandler.set('firstGoIn','1', new Date(Date.now() + 365*24*3600*100));

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//突出大促以及节庆氛围需求中有领券，所以会加上互联
			if( data.promotion && data.promotion.is_display == 1 ){
				connectWX(this, data)
			}
			data.isFirst = firstGoIn;
			data.wxGuide = wxGuide; //跑男活动层
			data.tabShow = 1;
			data.tabIndex = 1;
			data.share = true;
			data.use_rem_screen = true;
			data.pageTitle = '美丽说'
			data._CSSLinks = ['wx_new/daily'];
			this.render('wx_new/daily.html' , data);
		});
	},
	'quan' : function(){
		var php = {
			'banner' : '/weixin/weixin_mall_banner?page_name=daily'
			,'connect_weixin' : '/connect/weixin'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			// data.url = this.req.url.replace(/\?[\w\W]*/g,'');
			data.pageTitle = '美丽说'
			data.share = true;
			data._CSSLinks = ['wx_new/quan'];
			this.render('wx_new/quan.html' , data);
		});
	},
	'tuan' : function(){
		 // this.debugSnake({target : 'lab3'});
		var pageName = 'tuan'
			,cate_id = this.req.__get.cate_id || 2
		var php = {
		   	'banner' : '/weixin/weixin_mall_banner?page_name=' + pageName
		   	,'nav_top' : '/weixin/Weixin_mall_pagetitle?page_name=' + pageName
		   	,'q8_banner' : '/groupon/groupon_get_fixed_qiang8_banner_mob'
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			/*二三级菜单数据*/
			data.navInfo = data.nav_top[1]
			data.url = this.req.url.replace(/\?[\w\W]*/g,'');
			/*三级菜单cate_id*/
			data.nowCate =  cate_id || data.navInfo.defaultcate_id || '2';
			/*二级菜单cate_id*/
			data.act = this.req.__get.act || data.nowCate
			//data.share = true;
			data.pageName = pageName;
			data.pageTitle = '美丽说'
			data._CSSLinks = ['wx_new/tuan'];
			this.render('wx_new/tuan.html' , data);
		});

	},
	'tuan_buy':function(event_id){
		var event_id = event_id||this.req.__get.event_id || 1065;
		var php = {
			//'b_banner' : '/groupon/groupon_get_banners_mob?locationKey=mob_tuan_jingximiaosha_top_banner',
			'special_list':'/weixin/Weixin_tuan_page_info?event_id='+event_id+'&type=0',
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		};
		var locationUrl = this.req.headers.host + this.req.url
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.locationUrl = locationUrl
			data.pageTitle = '美丽说';
			//data.share = true;

			data._CSSLinks = ['wx_new/tuan_buy'];
			data.event_id=event_id;
			this.render('wx_new/tuan_buy.html' , data);
		});
	},
	/**
	 * 合并渲染模板 DQ
	 */
	'items' : function(args){
		 // this.debugSnake({target : 'devlab3'});
		var pageName = 'daily'
			,args = args || 'clothing'
			,cate_id = this.req.__get.cate_id || '';
		var php = {
			'nav_top':'/weixin/Weixin_mall_pagetitle'
		}
		var items = {
			'spring' : { 'title':'精品春装馆','img' : 'http://i.meilishuo.net/css/images/wap/web/wx_new/spring.jpg'}
			,'make' : { 'title':'美丽制造馆','img' : 'http://i.meilishuo.net/css/images/wap/web/wx_new/clear.jpg'}

			,'clothing' : { 'title':'花漾美衣','img' : 'http://d02.res.meilishuo.net/pic/_o/c9/07/67a26aafd80b16cff9c4e91ad2cf_640_340.cf.png'}
			,'panty' : { 'title':'舒适女裤','img' : 'http://d02.res.meilishuo.net/pic/_o/cb/3c/8bf1d5c8a6f8041ed1c746965568_640_340.cg.png'}
			,'dress' : { 'title':'飘逸美裙','img' : 'http://d01.res.meilishuo.net/pic/_o/bf/24/e2328f6354b9d34c7ff507493bd0_640_340.ch.png'}
			,'shoe' : { 'title':'轻盈女鞋','img' : 'http://d05.res.meilishuo.net/pic/_o/13/57/aac5c11fcfaecf3d6c2f1b752912_640_340.cg.png'}
			,'bag' : { 'title':'别致包包','img' : 'http://d05.res.meilishuo.net/pic/_o/de/62/acb085a0a0269ad76688022e997a_640_340.cf.png'}
			,'decoration' : { 'title':'琳琅小物','img' : 'http://d04.res.meilishuo.net/pic/_o/9f/87/9ca6027340c4b00f3bf176368d3d_640_341.ch.png'}
		}
		var this_item = items[args] || items['clothing'];

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.cate_id = cate_id || (this.nav_top[0] && this.nav_top[0].page_categories.wx_cloth);
			data.pageName = pageName;
			data.pageTitle = this_item.title;
			data.bg_img = this_item.img;
			data.item_name = args;
			data._CSSLinks = ['wx_new/mall'];
			this.render('wx_new/items.html' , data);
		});
	},

	/**
	 * 场馆-瀑布流落地页模板
	 */
	'ad_temp' : function(args){
		// var pageName = this.req.__get.page || 'ad_temp'
		// var cate_id = this.req.__get.cate_id || 0;s
		this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			// 'tempInfo' : '/customactivity/CustomActivity_common_tool_single?id=wx_act',
			// ,'navTop':'/weixin/Weixin_mall_pagetitle'
			'defaultInfo' : '/weixin/weixin_mall_special_page'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = true;
			data.tabShow = true;
			data.tabIndex = 1;
			data.cid = this.readData('cid',this.req.__get, '16793');
			// data.pageName = 'ad_temp';
			data.share = !!(data.defaultInfo.share && data.defaultInfo.share.img);
			data.pageTitle = data.defaultInfo.title || '美丽说购时尚';
			data._CSSLinks = ['wx_new/ad_temp'];
			this.render('wx_new/ad_temp.html' , data);

		});
	},

	/**
	 * 场馆-搜索模板
	 */
	'search' : function(args){
		// this.debugSnake({target : 'longchi.rdlab'});
		var key = this.req.__get.key || '';
		// this.req.__get.key_word = key;
		var recom = this.req.__get.recom || 0;

		var php = {
			'searchInfo' : '/weixin/search_tag_poster?key_word=' + encodeURIComponent(key)
			,'defaultKey' : '/weixin/search_default_words'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			/* 密令搜索需求 */
			var this_recommend = data.searchInfo.is_recommend;
			if(  this_recommend == 2 ){
				return this.redirectTo( data.searchInfo.activity_url , true );
			};
			data.is_recommend = this_recommend ? this_recommend : recom;
			data.key = key;
			data.tabType = this.req.__get.tab || 'base';
			data.use_rem_screen = true;
			data.pageTitle = '美丽说';
			data._CSSLinks = ['wx_new/search'];
			this.render('wx_new/search.html' , data);

		});
	},

	/* 意见反馈 没有上线 */
	// opinion : function(){
	// 	var php = {}
	// 	this.setMDefault(php);
	// 	this.bridgeMuch(php);
	// 	this.listenOver(function(data){
	// 		data.pageTitle = '个人意见反馈';
	// 		data._cssLinks = ['wx_new/opinion'];
	// 		this.render('wx_new/opinion.html',data)
	// 	});
	// },

	/* 购物车 */
	'cart' : function(){
		// this.debugSnake({target : 'longchi.rdlab'});
		var php  = {
			'connect_weixin' : '/connect/weixin'
			,'recom_goods' : '/weixin/weixin_mall_cart_recommend'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.tabShow = 1;
			data.tabIndex = 3;
			data.use_rem_screen = true;
			data.pageTitle = '购物车';
			data._CSSLinks = ['wx_new/cart'];
			this.render('wx_new/cart.html' , data);

		});
	},
	/* 公告页面 */
	'noticePage' : function(){
		var php = {
			'notice':'/customactivity/CustomActivity_common_tool_singleNew?id=wx_notice&cid=5593'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '公告';
			if(data.notice && data.notice.end_time){
				data.end_time = data.notice.end_time
			}else{
				var now = new Date()
				data.end_time = now.getFullYear() + '年' + ((now.getMonth()|0)+1) + '月' + ((now.getDate()|0)+1) + '日';
			}
			data._CSSLinks = ['wx_new/noticePage'];
			this.render('wx_new/noticePage.html' , data);
		});
	},
	/* 新分类 */
	'class' : function(){
		var php = {
			'info' : '/Weixin/tags_list'
			,'connect_weixin' : '/connect/weixin'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.info) this.errorPage();
			connectWX(this, data)
			data._CSSLinks = ['wx_new/class'];
			data.pageTitle = '美丽说';
			data.tabIndex = 2;
			data.tabShow = 1;
			data.share = true;
			this.render('wx_new/class.html' , data);
		});
	},
	'classify':function(args){
		var php = {
			'contents' : '/Weixin/Weixin_catalog'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['wx_new/classify'];
			data.pageTitle = '美丽说';
			data.share = true;
			data.headTag = '';
			mSelf.render('wx_new/classify.html' , data);
		});

	},
	'classify_m': function(catalog_id){
		if(!catalog_id) return this.redirectTo('/wx/classify/');
		var self = this,
			php = {
				'list': '/Weixin/Weixin_catalog_list?cid='+catalog_id
			};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.cid = catalog_id;
			if(!data.list || data.list.code != 0){
				return self.errorPage();
			}
			data._CSSLinks = ['wx_new/classify'];
			data.pageTitle = '美丽说';
			self.render('wx_new/classify_m.html',data);
		});
	},

	/* 兼容C店个人页 已下线 */
	'user_c' : function(args){
		//TODO yaoyao
		var _args = 'meilishuo://person.meilishuo?json_params=%7B%22user_id%22%3A%22' + args + '%22%7D';
		_args = encodeURIComponent(_args);
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
    	if(!weixinBrowser){
			return this.redirectTo('/goto/open/?url=' + _args + '&bg=%2Fdownload%2F');
		}

		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;
		/* 区分 群0(默认)，我的关注1 */
		var type = this.readData('type',this.req.__get, 0)|0;

		args = args || '';
		var php = {
			'userInfo_wx':'/connect/wxinfo'
			,'connect_weixin' : '/connect/weixin'
			,'order_status' : 'doota::/wx/Order_list_classify_statistic'
			,'list': '/Weixin/Weixin_circles?msg_id='+args
			,'uInfo' : '/Weixin/Weixin_profile_info?userid=' + args
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.wechatpay = 1;
			connectWX(this, data)
			if (args != data.userInfo.user_id) {
				return this.redirectTo('/wx/u_others/' + args);
			};
			if(!data.list || data.list.code != 0){
				return this.errorPage();
			}
			data.tabIndex = 4;
			data.tabShow = 1;

			/* 我的关注 */
			data.type = type;
			data.wx_user_id = args;

			data.groupPg = {};
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.pageTitle = '美丽说';
			//重构关注页面,暂用方案; 后面陆续重构“群”页面
			// if ( type == 1) {
				data.use_rem_screen = true;
				data._CSSLinks = ['wx_new/attention-rem'];
			// }else{
			// 	data._CSSLinks = ['wx_new/user_c'];
			// }

			this.render('wx_new/user_c.html', data);
		});
	},
	/* 关注的C店他人页 */
	'u_others' : function(args){
		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;
		/* 区分 群0(默认)，我的关注1 */
		var type = this.readData('type',this.req.__get, 0)|0;

		args = args || '';
		var php = {
			'userInfo_wx':'/connect/wxinfo'
			,'connect_weixin' : '/connect/weixin'
			,'uInfo' : '/Weixin/Weixin_profile_info?userid=' + args
			,'list': '/Weixin/Weixin_circles?user_id='+args
		}
		var self = this;

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.wechatpay = 1;
			if(!data.list || data.list.code != 0){
				return self.errorPage();
			}
			data.wx_user_id = args;
			data.type = type;
			data.groupPg = {};
			//data.groupPg.total_num = (args && args == 'coupon') ? data[args]['totalNum'] : 0;
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.pageTitle = '美丽说';
			data._CSSLinks = ['wx_new/user_c'];
			this.render('wx_new/u-others.html', data);
		});
	},
	"wd_error" :function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['wx_new/wd_error'];
			data.pageTitle = '美丽微店';
			data.headTag = '美丽微店';
			this.render('wx_new/wd_error.html' , data);
		});

	},

	/* 单宝页 */
	'detail' : function(tid){
		// this.debugSnake({target : 'maoanli.rdlab'});
		if(tid)
			this.req.__get.twitter_id = tid // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

		if(!this.req.__get.page_name)
			this.req.__get.page_name = 'circle' // 1784921633
		var php = {
				'goods' : '/weixin/weixin_mall_details'
				, 'goods_show_list':'/weixin/weixin_mall_goods_share_list' //晒单接口
				, 'goods_info' : '/weixin/weixin_mall_single'
				, 'daren_comment' : '/item/item_daren_comment'
				, 'goods_comments': '/goods/comment_list?wxmall=1&filter=1' // 取4/5星的评论,filter=1表示过滤掉无内容评论
				, 'connect_weixin' : '/connect/weixin'
			}

		if(tid == ''){
			this.mall();
			return;
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			var prop = data.goods_info.prop
			data.goods_info && data.goods_info.prop && (data.goods_info.prop = {
				'size': prop[1]
				,'color':  prop[0]
			});

			data.use_rem_screen = true;
			data.isDetail = true;
			data.share = true;
			data.pageTitle = data.goods_info.goods_title || '商品详情';
			data._CSSLinks = ['wx_new/detail-rem'];
			this.render('wx_new/detail.html' , data);
		});
	},
	'detailCircle' : function(tid){
		//this.debugSnake({target : 'ningli.rdlab'});
		if(tid)
			this.req.__get.twitter_id = tid // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

        var shopName = this.req.__get.shop_name
        var php        = {
			'goods' : '/weixin/weixin_mall_details'
			,'goods_info' : '/weixin/weixin_mall_single'
			,'connect_weixin' : '/connect/weixin'
			,'commend' : '/shop/wap_shop_hot_goods'
			,'goods_wd' : '/weixin/weixin_goods_detail'
			,'visit' : '/Weixin/Weixin_visit_collect'
			}

		if(tid == ''){
			this.mall();
			return;
		}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			return this.wd_error();
			if(!data.goods_info.dc_id)data.goods_info.dc_id = -1
			connectWX(this, data)
			if (!data.goods_info || data.goods_wd.error_code == 40001 || data.goods_wd.error_code == 40002) {
				return this.wd_error();
			};
			var prop = data.goods_info.prop
			data.goods_info && data.goods_info.prop && (data.goods_info.prop = {
				'size': prop[1]
				,'color':  prop[0]
			})
			data.share = true
			data.shopName = shopName
			data.pageTitle  = data.goods_info.goods_title || '商品详情'
			data._CSSLinks  = ['wx_new/detail_circle']
			this.render('wx_new/detail_circle.html' , data)
		});
	},
	/* 订单确认页 */
	'orderconfirm' : function(){
		//this.debugSnake({target : 'devlab3'});
		var goods_max = this.readData('max',this.req.__get,100)
			size = this.readData('size',this.req.__get,'')
	    	color = this.readData('color',this.req.__get,'')

		var php = {
			'connect_weixin' : '/connect/weixin',
			'userInfo_wx':'/connect/wxinfo'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.shop_id = this.req.__get.shop_id || '';
			data.dc_id = this.req.__get.dc_id || '';
			data.parms = this.req.__get
			data.goods_max = goods_max < 100 ? goods_max : 100;
			data.size = size;
			data.color = color;
			data.headTag = 'wx';
			data.pageTitle = '美丽说';
			data._CSSLinks = ['wx_new/order'];
			this.render('wx_new/confirm.html' , data);

		});
	},
	'wxcall' : function(args){
		var php  = {
			'wxcall' : '/connect/wxcall'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.wxcall && data.wxcall.jumpUrl) {
				return this.redirectTo(data.wxcall.jumpUrl, true);
			}
			else{
				return this.redirectTo('/wx/' + args ,true);
			}
		})
	},
	'orderDetail' : function(){
		// this.debugSnake({target : 'devlab3'});
		var order_id = this.readData('order_id',this.req.__get, 0);
		this.req.__get.is_weixin = 1

		var php  = {
			'connect_weixin' : '/connect/weixin'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.order_id = order_id;
			data.pageTitle = '美丽说精选';
			data.headTag = 'wx';
			data._CSSLinks = ['wx_new/order'];
			this.render('wx_new/orderDetail.html' , data);
		});
	},
	'success' : function(args){
		var order_id = this.readData('order_id',this.req.__get, 0);
		var php  = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.order_id = order_id;
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/order'];
			this.render('wx_new/success.html' , data);
		});
	},
	'fail' : function(){
		var order_id = this.readData('order_id',this.req.__get, 0)
			,msg = this.readData('msg',this.req.__get, '')

		var php = {}
			,titleText = msg ? msg : "下单失败"

		if(order_id){
			titleText = "支付未成功"
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.titleText = titleText
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/order'];
			this.render('wx_new/fail.html' , data);
		});
	},
	'expressInfo' : function(){
		var express_id = this.readData('express_id',this.req.__get, 0)
			,express_company = this.readData('express_company',this.req.__get, 0)
			,order_id = this.readData('order_id',this.req.__get, 0);
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.express_id = express_id;
			data.express_company = express_company;
			data.order_id = order_id;
			data.pageTitle = '物流信息';
			data._CSSLinks = ['wx_new/express'];
			this.render('wx_new/express.html' , data);
		});
	},
	'bind' : function(){
		// this.debugSnake({target : 'devlab3'});
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/account'];
			this.render('wx_new/bind.html' , data);
		});
	},
	// 'myaccount' : function(){
	// 	this.debugSnake({target : 'devlab3'});
	// 	var php = {
	// 		'connect_weixin' : '/connect/weixin?gotoUrl=myaccount&reg=1'
	// 		, 'wxinfo' : '/connect/wxinfo'
	// 	}
	// 	this.setMDefault(php);
	// 	this.bridgeMuch(php);
	// 	this.listenOver(function(data){
	// 		connectWX(this, data)
	// 		var page = "myaccount";
	// 		if(!data.wxinfo.user_id) page = "bind";
	// 		data.pageTitle = '美丽说精选';
	// 		data._CSSLinks = ['wx_new/account'];
	// 		this.render('wx_new/'+ page +'.html' , data);
	// 	});
	// },
	'scratch' : function(args){
		// this.debugSnake({target : 'devlab1'});
		var php = {
				'scratch' : '/weixin/weixin_scratch'
			};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/scratch'];
			this.render('wx_new/scratch.html' , data);
		});
	},
	wx_mua : function(){
		var php  = {
			'tab': '/Weixin/Weixin_mall_mua_GetTabs',
			'shop': '/weixin/Weixin_mall_mua_GetCoupons?shop_id=171023',
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=mua&cid=3281',
			'nav_top' : '/weixin/Weixin_mall_pagetitle?page_name=daily'
		};
		var wapMod = this.loadModel('tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageName = 'daily'

			if(Object.getOwnPropertyNames(data.tab.data).length < 2 || !data.tab.data.next) return this.errorPage();
			if(data.pageData.share){
				var shareData = data.pageData.share;
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : shareData.link
				};
				data.share = wapMod.shareTo(this.req, params);
			} else {
				data.share = false;
			}
			data._CSSLinks = ['wx_new/wx_mua'];
			data.pageTitle = 'MUA来啦--潮流最新款首发站';
			this.render('wx_new/wx_mua.html', data);
		});
	},

	'baoyang' : function(args){
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
			,'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		var urlParams = mSelf.req.url.split('&')
			, nurtureid = urlParams[0].split('?')[1]
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.nurtureid = nurtureid
			if(weixinBrowser) connectWX(mSelf, data);
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/main.html' , data);
		});
	},
	'rewards' : function(args){
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
			,'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		var urlParams = mSelf.req.url.split('&')
			, nurtureid = urlParams[0].split('?')[1];
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.nurtureid = nurtureid;
			connectWX(mSelf, data);
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/rewards.html' , data);
		});
	},
	'baoyangCoupon' : function(args){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		var urlParams = mSelf.req.url.split('&')
			, nurtureid = urlParams[0].split('=')[1];
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.nurtureid = nurtureid;
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/use.html' , data);
		});
	},
	'pay' : function(args){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		var urlParams = mSelf.req.url.split('&')
			, nurtureid = urlParams[0].split('=')[1];
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.nurtureid = nurtureid;
			data.pageTitle = data.pageData.title;
			data.headTag = 'baoyang';
			data._CSSLinks = ['activity/baoyang'];
			mSelf.render('activity/baoyang/pay.html' , data);
		});
	},
	'christmas' : function(args){
		var mSelf = this
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
			,'userWxInfo' : '/customactivity/CustomActivity_weixin_christmas_init'
			,'userInfo': '/customactivity/CustomActivity_wap_user_info'
		}
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			if(weixinBrowser){
				connectWX(mSelf, data);
			}else{
				data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			}
			data.weixinBrowser=weixinBrowser;
			data.pageTitle = '圣诞小游戏'
			data._CSSLinks = ['wx/christmas']
			mSelf.render('wx/christmas.html', data)
		})
	},
	'getGift' : function(){
		// this.debugSnake({target : 'devlab1'});
		var php = {
			'giftInfo' : '/customactivity/CustomActivity_weixin_christmas_share'
		}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.score=this.req.__get.score;
			data.pageTitle = '圣诞小游戏'
			data._CSSLinks = ['wx/getGift']
			this.render('wx/getGift.html', data)
		})
	},
	'pt' : function(args){
		var php = {
			'pt' : '/customactivity/CustomActivity_lottery?act=get&activity_id=23',
			'winner_list' : '/huodong/Christmas_puzzle_winners',
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// if(!data.pt.data.user){
			// 	this.redirectTo('meilishuo://login.meilishuo/?json_params=');
			// };
			var num = Math.round(Math.random()*19) + 1;
			num = (num == 3 || num == 14) ? (num + 1) : num;
			var pics = [];
			for(var i=1;i <= 9;i++){
		 		var aPic = "http://i.meilishuo.net/css//images/lark/pt_game/pt/"+num+"/images/"+i+".jpg";
		 		pics.push(aPic);
			}
			data.image = pics;
			if(weixinBrowser) connectWX(this, data);
			data.headTag = 'pt';
			data.pageTitle = '圣诞拼图乐'
			data._CSSLinks = ['activity/pt'];
			this.render('activity/pt.html' , data);
		});
	},
	'stove' : function(){
		var mSelf = this
		var uid = this.readData('uid',this.req.__get, 0)|0;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1',
			"core" : "/customactivity/CustomActivity_lottery?act=get&activity_id=21"
		}
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
	    	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id
			data.fromid = uid
			data.pageTitle = '圣诞火炉转盘'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/stove.html', data)
		})
	},
	'pagwatch' : function(tid){
		var mSelf = this
		var tid = tid||this.req.__get.tid
		var php = {
			'connect_weixin' : '/connect/weixin?type=1'
		}
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php)
		this.bridgeMuch(php)

		this.listenOver(function(data){
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
	    	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id
			data.tid = tid
			data.pageTitle = '精美奖品'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/pagwatch.html', data)
		})
	},
	'pagcoup5' : function(tid){
		var mSelf = this
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '5元优惠卷'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/pagcoup5.html', data)
		})
	},
	'pagcoup10' : function(tid){
		var mSelf = this
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '10元优惠卷'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/pagcoup10.html', data)
		})
	},
	'pagno' : function(tid){
		var mSelf = this
		var php = {
			'connect_weixin' : '/connect/weixin?type=1'
		}
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){

			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
	    	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};

			// 分享类型
		    if (wapMod.isNewest(mSelf.req, '6.6.0')) {
		        data.appShare = true;
		        //data.params = params;
		    } else {
		        data.appShare = false;
		       // data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
		    }

			data.user_id = data.userInfo.user_id;
			data.pageTitle = '没有奖品'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/pagno.html', data)
		})
	},
	'pagsucss' : function(tid){
		var mSelf = this
		var tid = tid||this.req.__get.tid
		var php = {
			"wxaddr":"/weixin/Weixin_christmas_get_addr"
		}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.user_id = data.userInfo.user_id;
			data.tid = tid
			data.pageTitle = '提交成功'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/pagsucss.html', data)
		})
	},
	'record' : function(tid){
		var mSelf = this
		var php = {
			"core" : "/customactivity/CustomActivity_lottery?act=get&activity_id=21"
		}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '记录中奖'
			data._CSSLinks = ['wx/stove']
			mSelf.render('wx/record.html', data)
		})
	},

	'christmas2014': function(args) {
        'use strict'

        var req = this.req,
			php = {
        		'connect_weixin' : '/connect/weixin?type=1', //拉用户信息
                danmu: '/customactivity/CustomActivity_barrage_drifting'
            }

        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver( function( data ) {
        	if(weixinBrowser && req.__get.connect ) connectWX(this, data);
            var danmu = data.danmu

            if ( !danmu || danmu.error_code != 0 ) {
                this.errorPage()
            }

            data.pageTitle = '圣诞bibibi'
            data._CSSLinks = [ 'activity/christmas2014' ]
            this.render( 'activity/christmas2014.html', data )
        })
    },
	'newYear2015': function(args) {
        'use strict'

        var req = this.req,
			php = {
        		'connect_weixin' : '/connect/weixin?type=1', //拉用户信息
                danmu: '/customactivity/CustomActivity_barrage_drifting'
            }

        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver( function( data ) {
        	if(weixinBrowser && req.__get.connect ) connectWX(this, data);
            var danmu = data.danmu

            if ( !danmu || danmu.error_code != 0 ) {
                this.errorPage()
            }

            data.pageTitle = '元旦bibibi'
            data._CSSLinks = [ 'activity/newYear2015' ]
            this.render( 'activity/newYear2015.html', data )
        })
    },
    'aquarius': function (){
        'use strict'
        var req = this.req,
            php = {
        	'connect_weixin' : '/connect/weixin?type=1', //拉用户信息
            'danmu' : '/customactivity/CustomActivity_barrage_drifting_sep'
        };
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data){
        	if(weixinBrowser && req.__get.connect ) connectWX(this, data);
            var danmu = data.danmu;

            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage();
            }

            data.pageTitle = '瓶男瓶女来灌水';
            data._CSSLinks = [ 'activity/aquarius' ];
            this.render( 'activity/aquarius.html', data );
        });
    },
    'divergent': function (){
    	var wapMod = base.loadModel('wap/tools.js')
        var req = this.req,
            php = {
        	'connect_weixin' : '/connect/weixin?type=1',
            'danmu' : '/customactivity/CustomActivity_barrage_drifting_otc?actid=622'
        	}
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver(function (data){
            var danmu = data.danmu
            var shareData = {
                'url'   : 'http://m.meilishuo.com/wx/divergent/',
                'pic'   : 'http://d04.res.meilishuo.net/pic/_o/2f/06/92133e19b95d96e270787302b866_200_200.cf.jpg',
                'text'  : '6月24/25日，限量版T恤和全国通兑影券限量抢！只要0.1元～6月19日上映的《分歧者2》等你来看！',
                'title' : '0.1元抢购《分歧者2》电影周边'
            }
			if(weixinBrowser && req.__get.connect ) connectWX(this, data)
            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage()
            }

            data.share = wapMod.shareTo(this.req, shareData)
            data.supportShare = wapMod.supportShare(this.req)
            data.pageTitle = '分歧者'
            data._CSSLinks = ['activity/divergent_danmu']
            this.render('activity/divergent_danmu.html', data)
        });
    },
    'scarletHeart': function(){
    	var wapMod = base.loadModel('wap/tools.js')
        var req = this.req,
            php = {
        	'connect_weixin' : '/connect/weixin?type=1',
            'danmu' : '/customactivity/CustomActivity_barrage_drifting_otc?actid=804'
        	}
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver(function (data){
            var danmu = data.danmu
            var shareData = {
                'url'   : 'http://m.meilishuo.com/wx/scarletHeart/',
                'pic'   : 'http://d01.res.meilishuo.net/pic/_o/aa/15/5ca21b55b2133fd97c9544fe48c5_128_179.ch.jpg',
                'text'  : '8月4日/9日/10日每晚21点 0.1元看陈意涵穿越新剧《新步步惊心》！只要0，1元全国通兑影券限量抢！',
                'title' : '0.1元疯抢《新步步惊心》电影票'
        }
			if(weixinBrowser && req.__get.connect ) connectWX(this, data)
            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage()
            }
            data.share = wapMod.shareTo(this.req, shareData)
            data.supportShare = wapMod.supportShare(this.req)
            data.pageTitle = '0.1元疯抢《新步步惊心》电影票'
            data._CSSLinks = ['activity/scarlet_heart']
            this.render('activity/scarlet_heart.html', data)
        });
    },
    'springcoming': function(){
    	//this.debugSnake({'target': 'devlab1'});
    	var req = this.req,
            php = {
        	'connect_weixin' : '/connect/weixin?type=1', //拉用户信息
            'danmu' : '/customactivity/CustomActivity_barrage_drifting_sep'
        };
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data){
        	if(weixinBrowser && req.__get.connect ) connectWX(this, data);
            var danmu = data.danmu;

            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage();
            }

            data.pageTitle = '一句话证明春天来了';
            data._CSSLinks = [ 'activity/springcoming' ];
            this.render( 'activity/springcoming.html', data );
        });
    },
    'newcomer': function() {
    	'use strict'
        var req = this.req,
        	php = {
        		'connect_weixin': '/connect/weixin?type=1', 					// 拉用户信息
	            'danmu': '/customactivity/CustomActivity_barrage_drifting',
	            'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'   // 获取wap用户信息 接口
	        },
			weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0;

        this.setDefaultData(php);
        this.bridgeMuch(php);

        this.listenOver(function(data) {
        	if (weixinBrowser && req.__get.connect ) {
        		connectWX(this, data);
        	}

            var danmu = data.danmu;

            if (!danmu || (danmu.error_code !== 0)) {
                this.errorPage();
            }

            data.serverDate = new Date();
            data.curUserRegTime = Date.parse(data.mobUserInfo.data.ctime) || data.serverDate.getTime();
            data.pageTitle = '欢迎新同学~~~';
            data._CSSLinks = ['activity/newcomer_danmu'];
            this.render('activity/newcomer_danmu.html', data);
        });
    },
    'barrageCommon' : function(){
    	var wapMod = base.loadModel('wap/tools.js')
        var req = this.req
        var cid = req.__get.cid
        var php = {
            'page_info' : '/customactivity/CustomActivity_common_tool_single?id=danmu_demo&cid='+ cid,
            'danmu': '/customactivity/CustomActivity_barrage_drifting',
        	'connect_weixin' : '/connect/weixin?type=1'
        	}
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver(function (data){
        	var danmu = data.danmu
            var pageInfo = data.page_info
            var shareData = {
                'url'   : pageInfo.share_data.url,
                'pic'   : pageInfo.share_data.pic,
                'text'  : pageInfo.share_data.text,
                'title' : pageInfo.share_data.title,
            }
			if(weixinBrowser && req.__get.connect ) connectWX(this, data)
            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage()
            }
            data.share = wapMod.shareTo(this.req, shareData)
            data.supportShare = wapMod.supportShare(this.req)
            data.pageTitle = pageInfo.page_title || '美丽说'
            data._CSSLinks = ['activity/barrageCommon']
            this.render('activity/barrageCommon.html', data)
        });
    },
	'surveyStart' : function(){
     	var req = this.req
		var mSelf = this
		var php = {
			// 'connect_weixin' : '/connect/weixin?gotoUrl=surveyStart&type=1' //拉用户信息
		}
		// var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.pageTitle = '时尚顾问搞定你的私人衣橱！'
			data._CSSLinks = ['wx/survey']
			mSelf.render('wx/surveyStart.html', data)
		})
	},
    'survey' : function(){
		var mSelf = this
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.pageTitle = '时尚顾问搞定你的私人衣橱！'
			data._CSSLinks = ['wx/survey']
			mSelf.render('wx/survey.html', data)
		})
	},
	'surveyEnd' : function(arr){
		var val = arr||this.req.__get.arr
		var mSelf = this
		var php = {}
		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.user_id = data.userInfo.user_id;
			arr1 = val.split(',',1)
			arr5 = val.split(',').pop()
			data.arr1 = arr1
			data.arr5 = arr5
			data.pageTitle = '时尚顾问搞定你的私人衣橱！'
			data._CSSLinks = ['wx/survey']
			mSelf.render('wx/surveyEnd.html', data)
		})
	},
	'chooseImage' : function(){
		var ifor = this.readData('ifor', this.req.__get , false );
		var param = this.readData('param', this.req.__get , false );
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1'
			,'userInfo': '/customactivity/CustomActivity_wap_user_info'
		//	,'weixin_sign' : '/weixin/Weixin_wap_share_sign?url=' + encodeURIComponent('http://'+this.req.headers.host + this.req.url)
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(weixinBrowser){
				connectWX(mSelf, data);
				return;
			}else{
				if(data.userInfo.user_id == 0){
					this.redirectTo('http://m.meilishuo.com/user/login/' , true)
				}
			}
			data.ifor = ifor;
			data.param = param;
			data.pageTitle = '上传头像，5秒实现梦想';
			data._CSSLinks = ['wx/chooseImage'];
			if(ifor){
				if(param){
					mSelf.render('wx/chooseImage/upImage.html' , data);
				}else{
					mSelf.render('wx/chooseImage/index.html' , data);
				}
			}else{
				mSelf.render('wx/chooseImage/lead.html', data);
			}
		})
	},
	'connectCircle': function(args) {
        var req = this.req,
			php = {
        		'connect_weixin' : '/connect/weixin'
        		,'userInfo': '/customactivity/CustomActivity_wap_user_info'
			},
			goback = req.__get.goback

		if ( Array.isArray( goback ) ) {
			goback = goback[ 0 ]
		}
        this.setMDefault(php)
        this.bridgeMuch(php)
        this.listenOver( function( data ) {
        	var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1

        	if ( weixinBrowser  ) {
        		connectWX( this, data )
        	}
        	data.goback = goback;
			this.render('wx/goback.html', data);
        })
    },
    'shake' :  function(args){
    	var php = {
			'connect_weixin' : '/connect/weixin?type=1',
			'shake_msg' : '/huodong/shake_recommend_good'
    	};
    	this.setMDefault(php);
    	this.bridgeMuch(php);
    	var mSelf = this;
    	this.listenOver(function(data){
    		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
    		data.pageTitle = '摇一摇，收礼物'
			data._CSSLinks = ['wx/shake']
			this.render('wx/shake.html', data)
    	})
    },
    'tranCircle' :  function() {
    	var cid = this.req.__get.cid || 7951
        var php   = {
        	'list' : '/circle_activity/template'
        };
        this.setMDefault( php );
        this.bridgeMuch( php );
        var mSelf = this;
        this.listenOver( function( data ) {
        	data.cid = cid;
        	data.list = data.list.data;
			var wapMod = this.loadModel('tools.js')
			if (!data.os.iphone ||  wapMod.isNewest(this.req , '6.2.0') ) data.shareImg = true
			////data.shareImg = false

            var weixinBrowser = this.req.headers[ 'user-agent' ].indexOf( 'MicroMessenger' ) > -1;
            data.isWx         = weixinBrowser;
            data.pageTitle    = data.list.title || '全球最大线上合法卖人市集'
            data._CSSLinks    = [ 'wx/circle', 'mainapp/index' ]
            this.render( 'wx/circle.html', data )
        } )
    },
    /**
     * 微圈的微信支付
     */
    circlePayment: function() {
        var php   = {
        	'connect_weixin' : '/connect/weixin',
			'payment_info': '/weixin/weixin_receivables_goods'
		}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
        	return this.wd_error();
        	var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(this, data);
			}
			if (!data.userInfo.user_id) {
				return this.redirectTo('/wx/circlePayment');
			};
        	data.goods_id = data.payment_info.goods_id || this.req.__get.goods_id || 0;
            data.isWx         = weixinBrowser;
            data.pageTitle    = '美丽微店'
            data._CSSLinks    = [ 'wx_new/circle_payment' ]
            this.render( 'wx_new/circle_payment.html', data )
        } )
    },
    /**
     * 微信支付成功
     */
    circlePaymentSuccess: function(id) {
        var php   = {
        	'info' : 'doota::/wx/detail_weixin?order_id=' + id
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            var weixinBrowser = this.req.headers[ 'user-agent' ].indexOf( 'MicroMessenger' ) > -1;
            data.isWx         = weixinBrowser;
            data.pageTitle    = '美丽微店'
            data._CSSLinks    = [ 'wx_new/circle_payment_success' ]
            this.render( 'wx_new/circle_payment_success.html', data )
        } )
    },
    qun: function(){
		var php = {
			'banner' : '/weixin/weixin_mall_banner?page_name=daily'
			,'connect_weixin' : '/connect/weixin'
		}
		if (this.req.__get.dr_id) {
			php.banners = '/weixin/tag_banner?tag_id=' + this.req.__get.dr_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data);
			data.tabShow = 1;
			data.tabIndex = 1;
			data.dr_id = this.req.__get.dr_id || false;
			data.share = true;
			if (data.dr_id) {
				data.share = false;
				data.tabShow = 0;
			};
			data.pageTitle = '美丽说'
			data._CSSLinks = ['wx_new/qun'];
			this.render('wx_new/qun.html' , data);
		});
    },

	/**
	 * 喵星人送红包(入口)
	 */
	'mew_lucky': function( param ) {
        if ( param == 'main' ) {
            return controlFns.mew_lucky_main.call( this )
        }

		var php = {
            'info': '/weixin/Weixin_lucky_info'
            ,'connect_weixin' : '/connect/weixin?type=1',
            'goods_list': 'promotion::/hotel/hotelGoods?type=mob&pid=1542&size=3'
        }

		this.setMDefault( php )
		this.bridgeMuch( php )
		this.listenOver( function( data ) {
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(this, data);
			}
            data.pageTitle = '喵星人送红包'
            data.bid = this.req.__get.bid
			data._CSSLinks = [ 'activity/mew_lucky/index' ]
			this.render( 'activity/mew_lucky/index.html', data )
		})
	},

	/**
	 * 喵星人送红包
	 */
	'mew_lucky_main': function() {
        var php = {
            'list': '/weixin/Weixin_lucky_batch'
            ,'connect_weixin' : '/connect/weixin?type=1'
        }

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
        	var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
            data.pageTitle = '喵星人送红包'
            data._CSSLinks = [ 'activity/mew_lucky/main' ]
            this.render( 'activity/mew_lucky/main.html', data )
        })
	},
	/**
	 * 搭配
	 */
	'dapei_detail': function() {
		var dressId = this.readData('dress_id', this.req.__get, 123455)
		var php     = {
        	'pageData'       : '/weixin/Weixin_mall_dress_tag_poster?rank=random&tag_id=173&dress_id=' + dressId,
        	'connect_weixin' : '/connect/weixin'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
        	connectWX(this, data)
			data.dressId   = dressId
			data.pageTitle = '搭配详情'
			data._CSSLinks = [ 'wx/dapei_detail' ]
            this.render( 'wx/dapei_detail.html', data )
        })
	},
	'dapei_buy': function() {
		var dressId = this.readData('dress_id', this.req.__get, 123455)
		var php     = {
        	'pageData'       : '/weixin/Weixin_mall_dress_stock?dress_id=' + dressId,
        	'connect_weixin' : '/connect/weixin'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
        	connectWX(this, data)
			data.dressId   = dressId
			data.pageTitle = '搭配购买'
			data._CSSLinks = [ 'wx/dapei_buy' ]
            this.render( 'wx/dapei_buy.html', data )
        })
	}
}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true) || true;
}

exports.__create = controller.__create(wx , controlFns);
