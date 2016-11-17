function sq(){ return this; }

var wapMod = base.loadModel('wap/tools.js')
var controlFns = {
	index : function (args){
		args = (args in controlFns) ? args : 'tuan'

		/*==== 商场首页控制 ====*/
		var Now       = new Date()
		var startTime = new Date('2015/08/18 00:00:00')
		var endTime   = new Date('2015/08/21 00:00:00')
		var actShow   = (startTime <= Now && endTime > Now)
		
		if (actShow) {
			return this.activity('818')
		}

		this[args]()
	},

	tuan : function (){
		var eventId = this.readData('event_id', this.req.__get, 1065)
		var cateId  = this.readData('cate_id', this.req.__get, '')
		var php     = {
			'banner' : '/shouq/ShouQ_mall_banner?page_name=daily',
			'type_top' : '/shouq/ShouQ_mall_category?page_name=daily',
			'cart' : 'doota::/cart/number',
			'tuanInfo' : '/shouq/ShouQ_mall_tuan?', // @require: cata
			'tuan_enter' : '/shouq/ShouQ_mall_spike?type=0&countdown=1&event_id=' + eventId, 
			'tuan_enter_img':'/shouq/ShouQ_mall_spike?type=0&banner=1&event_id=' + eventId,
			'tuan_back_img' :'/shouq/Groupon_get_banners_mob?locationKey=mob_tuan_fixed_qiang8',
		    'searchDefaultKeyWord' : '/shouq/ShouQ_mall_DefaultSearchWord'
		}

		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function (data){
			data.searchNav = 1
			data.bottomNav = 1
			data.tabIndex  = 2
			data.cate_id   = cateId || (data.type_top[0] && data.type_top[0].id)
			data.cartNum   = (data.cart && data.cart.code == 0 && data.cart.info.count > 0) ? data.cart.info.count : 0
			data.mask_show = false
			data.pageName  = 'daily'
			data.pageTitle = "团购"
			data._CSSLinks = ['sq/tuan']

			this.render('sq/tuan.html', data)
		})
	},

	tuan_buy: function(event_id){
		//this.debugSnake({ target : 'maoanli.rdlab'});
		var event_id = event_id||this.req.__get.event_id || 1065;
		var php = {
			'special_list':'/shouq/ShouQ_mall_spike?event_id='+event_id+'&type=0',
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		}; 
		var locationUrl = this.req.headers.host + this.req.url
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.locationUrl = locationUrl
			data.pageTitle = '团购－秒杀专场';
			//data.share = true;

			data._CSSLinks = ['sq/tuan_buy'];
			data.event_id=event_id;
			this.render('sq/tuan_buy.html' , data);
		});
	},

	handpick : function (){
		var interfaces = {
			'goodsDataOfFirstFrame' : '/shouq/ShouQ_mall_choice_list?page_name=clothes&frame=0&limit=10',
			'pageData' : '/shouq/ShouQ_wellChosen',
			'cart' : 'doota::/cart/number',
			'searchDefaultKeyWord' : '/shouq/ShouQ_mall_DefaultSearchWord'
		}

		this.setMDefault(interfaces)
		this.bridgeMuch(interfaces)
		this.listenOver(function (data){

			data.searchNav = 1
			data.bottomNav = 1
			data.tabIndex  = 1
			data.share     = true
			data.useRemToFitWindowSize = true
			data.cartNum   = (data.cart && data.cart.code == 0 && data.cart.info.count > 0) ? data.cart.info.count : 0
			data.pageTitle = "精选"
			data._CSSLinks = ['sq/handpick']

			this.render('sq/handpick.html', data)
		})
	},

	detail : function(tid){
		// this.debugSnake({target : 'devlab3'});
		if(tid)
			this.req.__get.twitter_id = tid // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

		if (!this.req.__get.page_name) {
			this.req.__get.page_name = 'daily';
		};

		var php = {
				'goods' : '/shouq/ShouQ_mall_details'
				, 'goods_info' : '/shouq/ShouQ_mall_single'
				, 'daren_comment' : '/item/item_daren_comment'
				, 'goods_comments': '/goods/comment_list' // 取4/5星的评论
				, 'goods_koubei': '/goods/koubei_list'
				, 'connect_sq' : '/connect/shouq'
			}

		if(tid == ''){
			this.mall();
			return;
		}

		//优惠劵入口banner显示判断
		var now_time = new Date()
			,banner_start = new Date('2014/09/15 00:00:00')
		    ,banner_end = new Date('2014/09/19 00:00:00')

		var banner_show = (banner_start <= now_time && now_time < banner_end);

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			var prop = data.goods_info.prop;
			data.goods_info && data.goods_info.prop && (data.goods_info.prop = {
							'size': prop[1]
							,'color':  prop[0]
						})
			data.share = true;
			data.banner_show = banner_show;
			data.pageTitle = '商品详情';
			data._CSSLinks = ['sq/detail'];
			this.render('sq/detail.html' , data);
		});
	},

	shop : function (){
		var interfaces = {}

		this.setMDefault(interfaces)
		this.bridgeMuch(interfaces)
		this.listenOver(function (data){
			data.useRemToFitWindowSize = true
			data.pageTitle = "精选"
			data._CSSLinks = ['sq/shop']

			this.render('sq/shop.html', data)
		})
	},

	user : function(args){
		//this.debugSnake({target : 'devlab3'});
		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;

		var orderStatus = this.req.__get.orderStatus || 0;
		
		var couponStatus = this.req.__get.status || 'available';
		if (!(couponStatus == 'available' || couponStatus == 'unavailable')) {
			couponStatus = 'available';
		};

		args = args || 'order_list';
		var php = {
			'userInfo_sq':'/shouq/ShouQ_user_info'
			,'hasCoupon' : '/shouq/Icon_tip'
			, 'connect_sq' : '/connect/shouq'
		}
			,css_link = ['sq/order'];
		if('coupon' == args){
			php['coupon'] = '/shouq/ShouQ_mall_coupon?status=' + couponStatus;
			css_link.push('sq/coupon');
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.orderStatus = orderStatus;
			data.couponStatus = couponStatus;
			data.bottomNav = 1;
			data.tabIndex = 4;
			data.args_type = args;
			data.groupPg = {};
			data.groupPg.total_num = (args != 'order_list') ? data[args]['totalNum'] : 0;
			data.groupPg.page_size = 20;
			// console.log("优惠劵长度："+data[args]);
			data.groupPg.current_page = page;
			data.pageTitle = '个人订单';
			if (data.coupon) {
				data.pageTitle = '优惠券';
			};
			data._CSSLinks = css_link;
			this.render('sq/user.html', data);
		});
	},

	'userCen' : function(){
		var php = {
			'userInfo_sq' : '/shouq/ShouQ_user_info',
			'coupon_num'  : '/shouq/ShouQ_mall_coupon?status=available&numonly=1',
			'order_info'  : 'doota::/qq/Order_list_classify_statistic',
			'message'     : 'im::/im/open_msg_num?appkey=666666&appsecret=d9044d3f5caf36b874daca20b76a1b8a&uid=1024&source=wap',
			'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.bottomNav = 1;
			data.tabIndex = 4;
			data.pageTitle = '个人';
			data._CSSLinks = ['sq/userCen']
			this.render('sq/userCen.html', data);
		});
	},

	'orderconfirm' : function(){
		var goods_max = this.readData('max',this.req.__get,10)
			size = this.readData('size',this.req.__get,'')
	    	color = this.readData('color',this.req.__get,'')

		var php = {
			// 'order' : 'doota::/order/init_qq',
			// ,'addr_info' : 'doota::/address/addr_list'
			'userInfo_sq':'/shouq/ShouQ_user_info',
			'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.parms = this.req.__get
			data.goods_max = goods_max < 10 ? goods_max : 10;
			data.size = size;
			data.color = color;
			data.headTag = 'sq';
			data.pageTitle = '订单确认';
			data._CSSLinks = ['sq/order'];
			this.render('sq/confirm.html' , data);

		});
	},
	'orderDetail' : function(){
		// this.debugSnake({target : 'devlab1'});
		var order_id = this.readData('order_id',this.req.__get, 0);
		this.req.__get.is_sq = 1

		var php  = {
			// 'order_info' : 'doota::/order/detail_weixin'
			'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			// try{
			// 	data.order_id = data.order_info.info.order.order_id
			// }catch(e){
			// 	return this.errorPage();
			// }
			data.order_id = order_id;
			data.pageTitle = '订单详情';
			data.headTag = 'sq';
			data._CSSLinks = ['sq/orderD'];
			this.render('sq/orderDetail.html' , data);
		});
	},
	'expressInfo' : function(){
		// this.debugSnake({target : 'devlab2'});
		var express_id = this.readData('express_id',this.req.__get, 0);
		var express_company = this.readData('express_company',this.req.__get, 0);
		var order_id = this.readData('order_id',this.req.__get, 0);
		var php = {
			// 'express' : 'doota::/order/express_info_new'
			'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.express_id = express_id;
			data.express_company = express_company;
			data.order_id = order_id;
			data.pageTitle = '物流信息';
			data._CSSLinks = ['sq/express'];
			this.render('sq/express.html' , data);
		});
	},
	'bind' : function(){
		// this.debugSnake({target : 'devlab3'});
		var e_msg = this.readData('e_msg',this.req.__get,'')
		,php = {'connect_sq' : '/connect/shouq'}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			if(e_msg != ''){delete this.req.__get.e_msg}
			data.e_msg = e_msg;
			data.pageTitle = '美丽说';
			data._CSSLinks = ['sq/account'];
			this.render('sq/bind.html' , data);
		});
	},
	'myaccount' : function(){
		// this.debugSnake({target : 'devlab3'});
		var php = {
			'userInfo_sq' : '/shouq/ShouQ_user_info'
			, 'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			var page = "myaccount";
			if(!data.userInfo_sq.user_id) page = "bind";
			data.pageTitle = '我的账户';
			data._CSSLinks = ['sq/account'];
			this.render('sq/'+ page +'.html' , data);
		});
	},
	'success' : function(){
		// this.debugSnake({target : 'devlab3'});
		var order_id = this.readData('order_id',this.req.__get, 0);
		var transaction_id = this.readData('transaction_id',this.req.__get, 0);
		var bank_type = this.readData('bank_type', this.req.__get, '');
		var php  = {'connect_sq' : '/connect/shouq'}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.bank_type = bank_type;
			data.transaction_id = transaction_id;
			data.order_id = order_id;
			data.pageTitle = '美丽说';
			data._CSSLinks = ['sq/order'];
			this.render('sq/success.html' , data);
		});
	},

	'fail' : function(){
		var order_id = this.readData('order_id',this.req.__get, 0)
			, msg = this.readData('msg', this.req.__get, 0) || ''

		var  php = {'connect_sq' : '/connect/shouq'}

		var status = 0
			, titleText = msg ? msg : "下单失败"
			, btnText = "去逛逛"
			, url = "/sq"

		if(order_id){
			status = 1
			titleText = "您的订单尚未支付成功"
			btnText = "查看订单"
			url = "/sq/orderDetail?order_id=" + order_id
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);

			data.order_id = order_id
			// data.msg = msg
			data.titleText = titleText
			data.btnText = btnText
			data.url = url
			data.pageTitle = '美丽说';
			data._CSSLinks = ['sq/order'];
			this.render('sq/fail.html' , data);
		});
	},
	'findPwd' : function(args){
		var php = {'connect_sq' : '/connect/shouq'};
		var args = args || 'form'; //args:form|send|reset|finish
		//#9510
		var wapMod = base.loadModel('wap/tools.js');
		var os = wapMod.uaos(this.req);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);

			if(args == 'send_sms'){
				data.mobile = this.readData('mobile',this.req.__get, '');
			}
			else if(args == 'reset'){
				data.validate_code = this.readData('vc',this.req.__get, '');
			}
			data.isNewest = wapMod.isNewest(this.req , data.os.android ? '3.7.5' : '4.1.0');
			data.runInApp = data.appVersion && data.accessToken
			data.headTag = 'find_pwd_' + args;
			data._CSSLinks = ['sq/findPwd'];
			data.pageTitle = '找回密码';
			this.render('sq/find_password.html' , data);
		});
	},
	'find_pass' : function (args){
		this.ajaxTo('/user/find_pass_' + args);
	},
	'auth' : function(args){
		var php = {'connect_sq' : '/connect/shouq'};

		var frm = this.readData('frm',this.req.__get, '');
		var r = this.readData('r',this.req.__get, '');
		var xnc = this.readData('xnc',this.req.__get, '');
		var position = this.readData('position',this.req.__get, '');
		var content = this.readData('content',this.req.__get, '');
		var image = this.readData('image',this.req.__get, '');
		if(content != '') delete this.req.__get.content;
		if(image != '') delete this.req.__get.image;

		var code = this.readData('code',this.req.__get, ''),
			state = this.readData('state',this.req.__get, '');
		var url = '/connect/auth/' + args + '?baseUrl=' + this.req.headers.host;
		// this.debugSnake({target : 'devlab3'})
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data = data[args];
			if(data.result == true){
				if (data.err_bind && data.err_bind != 0 ) {
					delete this.req.__get.state;
					delete this.req.__get.code;
					this.req.__get.err_bind = data.err_bind;
				};
				return this.redirectTo('http://' + this.req.headers.host + '/' + data.destUrl, true);
			}else if(data.result == false && data.flag == 1){
				if(frm != '') delete this.req.__get.frm;
				if(r != '') delete this.req.__get.r;
				if(xnc != '') delete this.req.__get.xnc;
				if (position != '') delete this.req.__get.position;
				return this.redirectTo(data.redirectUrl, true);
			}else if(data.result == false && data.error){
				//互联失败且有错误信息
				this.req.__get.e_msg = data.error;
				return this.redirectTo('http://' + this.req.headers.host + '/' + data.destUrl, true);
			}
			else{
				return this.redirectTo('http://' + this.req.headers.host + '/sq', true);
			}
		}, true);
	},
	'connect' : function(args){
		var php = {'connect_sq' : '/connect/shouq'};
		var url = '/connect/connect/' + args;
		this.bridgeMuch(php);
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			delete this.req.__get.baseUrl;
			delete this.req.__get.code;
			delete this.req.__get.state;
			delete this.req.__get.openid;
			delete this.req.__get.openkey;
			data = data[args];
			// if(data.new_comer == 1){
			// 	return this.redirectTo('http://' + this.req.headers.host + '/connect/newComer/', true);
			// }else{
				var destUrl = data.destUrl || 'sq'
				return this.redirectTo('http://' + this.req.headers.host + '/' + destUrl, true);
			// }
		}, true);
	},
	'address_edit' : function(){
		// this.debugSnake({target : 'devlab1'});
		var user_id = this.readData('addr_id',this.req.__get, '');
		var user_name = this.readData('user_name',this.req.__get, '');
		var user_tel = this.readData('user_tel',this.req.__get, '');
		var user_add = this.readData('user_add',this.req.__get, '');
		var user_str = this.readData('user_str',this.req.__get, '');
		var user_pid = this.readData('_pid',this.req.__get, '');
		var user_cid = this.readData('_cid',this.req.__get, '');
		var user_did = this.readData('_did',this.req.__get, '');
		var edit_type = this.readData('edit_type',this.req.__get, '');
		var php  = {
			'addr_list_all' : 'doota::/address/addr_select'
			,'addr_list_city' : 'doota::/address/addr_select?pid=' + user_pid
			,'addr_list_dis' : 'doota::/address/addr_select?cid=' + user_cid + '&pid=' + user_pid
			,'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.parms = this.req.__get
			data.addr_id = user_id
			data.user_name = user_name
			data.user_tel = user_tel
			data.user_add = user_add
			data.user_str = user_str
			data.edit_type = edit_type
			data.user_pid = user_pid
			data.user_cid = user_cid
			data.user_did = user_did
			data.pageTitle = '我的收货地址';
			data._CSSLinks = ['sq/address_edit'];
			this.render('sq/address_edit.html' , data);

		});
	},
	'address_normal' : function(){
		// this.debugSnake({target : 'devlab1'});
		var addr_id = this.readData('addr_id', this.req.__get, '')
		var php  = {
			'addr_list' : 'doota::/address/addr_list'
			,'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.parms = this.req.__get
			// data.addr_id = addr_id
			data.pageTitle = '我的收货地址';
			data._CSSLinks = ['sq/address_normal'];
			this.render('sq/address_normal.html' , data);

		});
	},
	'sync_addr' : function(){
		var php  = {'connect_sq' : '/connect/shouq'}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.pageTitle = '美丽说';
			this.render('sq/sync_addr.html' , data);
		});
	},
	'qq_first' : function(){
		var cate_id = this.readData('cate_id',this.req.__get, 6);
		var page_name = this.readData('page_name',this.req.__get, 'clothes');
		var php = {
			// 'goods' : '/shouq/ShouQ_mall_normal_goods?page_name='+ page_name +'&cate_id=' + cate_id,
			'pageInfo' : '/customactivity/CustomActivity_common_tool_single?id=qq_act'
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.cate_id = cate_id;
			data.pageName = page_name;
			// data.goods_length = data.goods.tInfo.length;
			data.pageTitle = '美丽说';
			data._CSSLinks = ['sq/qq_first'];
			this.render('sq/qq_first.html' , data);

		});
	},
	'cart' : function(){
		var php  = {'connect_sq' : '/connect/shouq'}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.pageTitle = '购物车';
			data._CSSLinks = ['sq/cart'];
			this.render('sq/cart.html' , data);

		});
	},
	'egg_act' : function(){
		var php  = {
			'share' : '/shouq/ShouQ_d11_my_coupons_shared',
			'info' : '/shouq/ShouQ_d11_qualification',
			'connect_sq' : '/connect/shouq'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectSQ(this, data);
			data.coupon_id = this.readData('coupon_id',this.req.__get, '0');
			data.persons = data.share.coupons ? data.share.coupons.length : 0;
			data.no_persons = 3 - data.persons;
			data.pageTitle = '美丽说';
			if (data.info && data.info.self == 0) {
				data._CSSLinks = ['sq/friend'];
				this.render('sq/friend.html' , data);
			}else if (data.info && data.info.self == 1) {
				data._CSSLinks = ['sq/egg_act'];
				this.render('sq/egg_act.html' , data);
			}else{
				data._CSSLinks = ['sq/friend'];
				this.render('sq/friend.html' , data);
			}
		});
	},

	search : function (){
		var pageName = this.readData('page_name', this.req.__get, '')
		var section  = this.readData('section', this.req.__get, 'hot')
		var key      = this.readData('key', this.req.__get, '')
		var DR       = this.readData('d_r', this.req.__get, '')
		var php      = {
			'cart'   : 'doota::/cart/number',
			'banner' : '/customactivity/CustomActivity_common_tool_single?id=shouq_choice_banner',
			'searchDefaultKeyWord' : '/shouq/ShouQ_mall_DefaultSearchWord'
		}

		if (pageName){
			php['category'] = '/shouq/ShouQ_mall_choice_category'
		}

		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function (data){
			var cart     = data.cart
			var category = data.category || [{}]

			if(cart && cart.code == 0){
				var count    = cart.info.count
				data.cartNum = count > 0 ? count : 0
			}
			
			data.key       = key ? key : (pageName ? category[0].key : '')
			data.pageName  = pageName || '全部'
			data.section   = section
			data.DR        = DR
			data.searchNav = 1
			data.pageTitle = '美丽说'
			data._CSSLinks = ['sq/search']
			this.render('sq/search.html' , data)
		})
	},

	activity : function (mark){
		//this.debugSnake({target : 'xiaolongrong.rdlab'})
		var interfaces = {}

		switch(mark){
			case '818':
				interfaces.coupon = '/shouq/ShouQ_818_couponStatus'
				interfaces.pageData = '/shouq/ShouQ_mall_818_main'
				interfaces.connect_sq = '/connect/shouq'
				break
		}

		this.setMDefault(interfaces)
		this.bridgeMuch(interfaces)
		this.listenOver(function (data){
			wapMod.connectSQ(this, data);
			switch(mark){
				case '818':
					data.pageTitle = '精彩专题-美丽说'
			}
			data.bottomNav = 1
			data.tabIndex  = 3
			data.useRemToFitWindowSize = true
			data._CSSLinks = ['sq/activity']
			this.render('sq/activity.html', data)
		})
	},

	category : function (level){
		//this.debugSnake({target: 'xiaolongrong.rdlab'})
		var interfaces = {}

		switch(level){
			case 'level2':
				interfaces.pageData = '/shouq/ShouQ_mall_secondClassification'
				break
			default:
				interfaces.dataOfHot = '/shouq/ShouQ_mall_firstClassification'
				interfaces.dataOfCollocation = '/shouq/ShouQ_mall_match'
		}

		this.setMDefault(interfaces)
		this.bridgeMuch(interfaces)
		this.listenOver(function (data){
			data.useRemToFitWindowSize = true

			var pathName = ''

			switch(level){
				case 'level2':
					data.pageTitle = this.readData('firstClass', this.req.__get, '分类') 
					data._CSSLinks = ['sq/category_level2']
					pathName       = 'sq/category_level2.html'
					break
				default:
					data.bottomNav = 1
					data.tabIndex  = 3
					data.pageTitle = '分类'
					data._CSSLinks = ['sq/category_level1']
					pathName       = 'sq/category_level1.html'
			}

			this.render(pathName, data)
		})
	},

	'sqcall' : function(args){
		var php  = {
			'wxcall' : '/connect/sqcall'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.wxcall && data.wxcall.jumpUrl) {
				return this.redirectTo(data.wxcall.jumpUrl, true);
			}
			else{
				var redirect = this.readData('redirect', this.req.__get, '/sq/index');
				return this.redirectTo(redirect, true);
			}
		})
	}
}

exports.__create = controller.__create(sq , controlFns);
