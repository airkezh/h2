function wx_new(){
	return this;
}
var cookie = require(config.path.base + 'cookie.js')
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'mall'
		this[args]()
	},
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
		//this.debugSnake({target : 'devlab3'});
		var pageName = args || 'daily'
		if(pageName == "daily"){
			return this.wx_mua();
		}
		
		var php = {
			'discount' : '/weixin/weixin_mall_discount?page_name=' + pageName
		   , 'goods' : '/weixin/weixin_mall_normal_goods?page_name=' + pageName
		   , 'banner' : '/weixin/weixin_mall_banner?page_name=' + pageName
		   , 'nav_top' : '/weixin/Weixin_mall_pagetitle?page_name=' + pageName
		}
		// var pageTitle = title[pageName]
		
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.url = this.req.url.replace(/\?[\w\W]*/g,'');
			data.act = this.req.__get.cate_id || 1;
			data.share = true;
			data.pageName = pageName;
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/mall'];
			this.render('wx_new/mall.html' , data);
		});
	},

	'user' : function(args){
		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;
		args = args || 'order_list';
		var php = {
			'userInfo_sq':'/weixin/Weixin_user_info'
			,'connect_weixin' : '/connect/weixin?gotoUrl=user'
		}
			,css_link = ['wx_new/order'];
		if('coupon' == args){
			php['coupon'] = '/coupon/home_list?status=all';
			css_link.push('wx_new/coupon');
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.args_type = args;
			data.groupPg = {};
			data.groupPg.total_num = (args != 'order_list') ? data[args]['totalNum'] : 0;
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.pageTitle = '个人中心';
			data._CSSLinks = css_link;
			this.render('wx_new/user.html', data);
		});
	},

	//over
	'detail' : function(tid){
		//this.debugSnake({target : 'devlab3'});
		if(tid)
			this.req.__get.twitter_id = tid // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

		var php = {
				'goods' : '/weixin/weixin_mall_details'
				, 'goods_info' : '/weixin/weixin_mall_single'
				, 'daren_comment' : '/item/item_daren_comment'
				, 'goods_comments': '/goods/comment_list?wxmall=1' // 取4/5星的评论
				, 'goods_koubei': '/goods/koubei_list'
			}

		if(tid == ''){
			this.mall();
			return;
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var prop = data.goods_info.prop
			data.goods_info && data.goods_info.prop && (data.goods_info.prop = {
				'size': prop[1]
				,'color':  prop[0]
			})
			data.share = true;
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/detail'];
			this.render('wx_new/detail.html' , data);
		});
	},
	'orderconfirm' : function(){
		//this.debugSnake({target : 'devlab3'});
		var goods_max = this.readData('max',this.req.__get,100)
			size = this.readData('size',this.req.__get,'')
	    	color = this.readData('color',this.req.__get,'')
		
		var php = {
			'connect_weixin' : '/connect/weixin?gotoUrl=orderconfirm',
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.parms = this.req.__get
			data.goods_max = goods_max < 100 ? goods_max : 100;
			data.size = size;
			data.color = color;
			data.headTag = 'wx_new';
			data.pageTitle = '美丽说精选';
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
			// console.log(data.wxcall.jumpUrl);
			if(data.wxcall && data.wxcall.jumpUrl) {
				return this.redirectTo(data.wxcall.jumpUrl, true);
			}
			if(args == 'weixinLuck')
				return this.redirectTo('/activity/weixinLuck/index/' ,true);
			else
				return this.redirectTo('/wx_new/' + args ,true);
		})
	},
	'orderDetail' : function(){
		// this.debugSnake({target : 'devlab3'});
		var order_id = this.readData('order_id',this.req.__get, 0);
		this.req.__get.is_weixin = 1

		var php  = {
			'connect_weixin' : '/connect/weixin?gotoUrl=orderList'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			data.order_id = order_id;
			data.pageTitle = '美丽说精选';
			data.headTag = 'wx_new';
			data._CSSLinks = ['wx_new/order'];
			this.render('wx_new/orderDetail.html' , data);
		});
	},
	// 'orderList' : function(){
	// 	// this.debugSnake({target : 'devlab3'});
	// 	var page = this.readData('page',this.req.__get, 0)|0;
	// 	var status = this.readData('status',this.req.__get, 0)|0;
	// 	var mSelf = this;
	// 	var php = {
	// 		'connect_weixin' : '/connect/weixin?gotoUrl=orderList'
	// 		, 'order_list' : 'doota::/order/list_info'
	// 	}
	// 	this.setMDefault(php);
	// 	this.bridgeMuch(php);
	// 	this.listenOver(function(data){
	// 		connectWX(mSelf, data)
	// 		data.groupPg = {}; 
	// 		data.groupPg.total_num = data.order_list.total_num;
	// 		data.groupPg.page_size = 20 
	// 		data.groupPg.current_page = page;
	// 		data.pageTitle = '美丽说精选';
	// 		data._CSSLinks = ['wx_new/order'];
	// 		mSelf.render('wx_new/orderList.html' , data);
			
	// 	});
	// },
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
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
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
	'myaccount' : function(){
		this.debugSnake({target : 'devlab3'});
		var php = {
			'connect_weixin' : '/connect/weixin?gotoUrl=myaccount&reg=1'
			, 'wxinfo' : '/connect/wxinfo'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data)
			var page = "myaccount";
			if(!data.wxinfo.user_id) page = "bind";
			data.pageTitle = '美丽说精选';
			data._CSSLinks = ['wx_new/account'];
			this.render('wx_new/'+ page +'.html' , data);
		});
	},
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
		// console.log(this.req.headers.referer)
		this.listenOver(function(data){
			// console.log(data.tab)
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
			data.pageTitle = 'mua' + ' - 美丽说';
			this.render('wx_new/wx_mua.html', data);
		});
	},
	'baoyang' : function(args){
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
			,'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=mob_baoyang'
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
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
			, nurtureid = urlParams[0].split('=')[1];
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
	'pt' : function(args){
		var php = {
			'pt' : '/customactivity/CustomActivity_lottery?act=get&activity_id=19',
			'winner_list' : '/huodong/Christmas_puzzle_winners'
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			var num = Math.round(Math.random()*19) + 1;
			var pics = [];
			for(var i=1;i <= 9;i++){
		 		var aPic = "http://i.meilishuo.net/css//images/lark/pt_game/pt/"+num+"/images/"+i+".jpg";
		 		pics.push(aPic);
			}
			data.image = pics;
			if(weixinBrowser) connectWX(this, data);
			data.headTag = 'pt';
			data._CSSLinks = ['activity/pt'];
			this.render('activity/pt.html' , data);
		});
	}
}


var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(wx_new , controlFns);
