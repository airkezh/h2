function md(){
	return this;
}

var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'home'
		this[args]()
	},
	'home' : function(args){
		
		var categoryId = this.readData('category_id',this.req.__get, '');
		var mSelf = this
		    , php = {
			   'shopInfo' : 'meidian::/shop/detail'
			   ,'poster0' : 'meidian::/goods/get_list'
			   ,'categoryInfo' : 'meidian::/goods_category/get_list'
			}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.categoryInfo, false , 5);
			var categoryIndex = 0;
			for(var i = 0; i < data.categoryInfo.data.length ;i++){
				if (categoryId == data.categoryInfo.data[i].category_id) {
					categoryIndex = i + 1;
					break;
				}
			}

			var a = data.categoryInfo.data
				, categoryShowArr = [{'index':0,'id':'','name':'全部'}]
				, begin = categoryIndex > 0 ? categoryIndex:1
				, end

			data.categoryInfo.data.unshift({'index':0,'id':'','name':'全部'})
			if(a && a.length >0){
				if(a.length <= 3) {
					begin = 1
					end = a.length - 1
					data.tabCur = categoryIndex
				}
				else if(a.length - categoryIndex > 2){
					if(categoryIndex > 1){
						end = parseInt(begin) + 1
						begin -= 1
						data.tabCur = 2;
					}
					else {
						end = parseInt(begin) + 2
						data.tabCur = categoryIndex
					}
				}
				else {
					end = a.length - 1
					begin = end - 2
					data.tabCur = a.length - 1 == categoryIndex ? 3:2
				}
				//console.log(begin + "-" + end)
				for(var i=begin; i<=end; i++){
					var categoryShow = {}
					categoryShow.index = i
					categoryShow.id = a[i].category_id
					categoryShow.name = a[i].category_name
					categoryShowArr.push(categoryShow)
				}

			}
			data.categoryInfo.data.shift()
			data.categoryShowArr = categoryShowArr;
			//console.log(data.categoryShowArr)
			data.categoryIndex = categoryIndex;
			data.categoryId = categoryId;
			data.pageTitle = '美店';
			data._CSSLinks = ['meidian/home'];
			mSelf.render('home.html', data);
		});
	},
	'detail' : function(){
		var mSelf = this

		var cookie = require(config.path.base + 'cookie.js')
		var cookieHandle = cookie.getHandler(this.req ,this.res)
		var is_mls = (cookieHandle.get('mls_in_app') == 1)

		var php = {
		    	'goods_detail' : 'meidian::/goods/detail'
			}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.is_mls = is_mls;
			data.pageTitle = '美店 - 商品详情';
			data._CSSLinks = ['meidian/detail'];
			mSelf.render('detail.html', data);
		});
	},
	'orderConfirm' : function(){
		//this.debugSnake({target : 'devlab3'});
		var is_callback = this.req.__get.is_callback;
		var mSelf = this

		var cookie = require(config.path.base + 'cookie.js')
			var cookieHandle = cookie.getHandler(this.req ,this.res)
			var is_mls = (cookieHandle.get('mls_in_app') == 1)
			if(is_mls){
					var php = { 
						'order' : 'meidian::/order/init' 
					}
			}else{
				var php = { 'order' : 'meidian::/order/init' 
					, 'connect_weixin' : 'meidian::/weixin/connect?gotoUrl=orderConfirm'
				}
			}


		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(mSelf, data);
			//base.var_dump(data, false , 5);
			data.is_mls = is_mls;
			data.headTag = 'md';
			data.pageTitle = '美店 - 订单确认';
			data._CSSLinks = ['meidian/order'];
			mSelf.render('orderConfirm.html', data);
		});
	},
	'payCBK' : function(){
		var mSelf = this
		    , php = { 
				'pay_callback' : 'meidian::/pay/callback'
			}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.redirectTo('/md/success?order_id=' + this.req.__get.order_id, false)
		});
	},
	'weixinCBK' : function(args){
		var mSelf = this
		    , php = { 
				'callback_weixin' : 'meidian::/weixin/callback'
			}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			return mSelf.redirectTo('/md/' + args ,true);
		});
	},
	'prohibit' : function(){
		var mSelf = this
		    , php = {}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美店禁售商品管理';
			data._CSSLinks = ['meidian/md'];
			mSelf.render('prohibit.html' ,data);
		});
	},
	'agreement' :  function(){
		var mSelf = this
		    , php = {}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美店注册使用协议';
			data._CSSLinks = ['meidian/md'];
			mSelf.render('agreement.html' ,data);
		});
	},
	'success' : function(){
		var mSelf = this;
		var php  = {
				'md_orderDetail' : 'meidian::/order/detail'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '支付成功';
			data._CSSLinks = ['meidian/md'];
			mSelf.render('success.html' , data);
		});
	},
	'treasure' : function(){
		var mSelf = this

		var cookie = require(config.path.base + 'cookie.js')
		var cookieHandle = cookie.getHandler(this.req ,this.res)
		var is_mls = (cookieHandle.get('mls_in_app') == 1)

		var php = {
		    	'treasure_detail' : 'meidian::/event/get_detail',
			}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.is_mls = is_mls;
			data.pageTitle = '美店 - 单品预售';
			data._CSSLinks = ['meidian/treasure'];
			mSelf.render('treasure.html', data);
		});
	},
	'md_chan' : function(){
		var mSelf = this
		var cookie = require(config.path.base + 'cookie.js')
		var cookieHandle = cookie.getHandler(this.req ,this.res)
		var is_mls = (cookieHandle.get('mls_in_app') == 1)

		var php = {
		    	'md_chan_list' : 'meidian::/event/get_list'
			}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.is_mls = is_mls;
			data.pageTitle = '美店精选';
			data._CSSLinks = ['meidian/md_chan'];
			mSelf.render('md_chan.html', data);
		});
	},
	'orderDetail' : function(){
		var mSelf = this;
		var php  = {
			'md_orderDetail' : 'meidian::/order/detail'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美店 - 订单详情';
			data._CSSLinks = ['meidian/order'];
			mSelf.render('orderDetail.html' , data);
		});
	},
	'orderList' : function(){
		var mSelf = this;
		var php  = {
			'md_orderList' : 'meidian::/order/get_list'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (check_login(mSelf, php, data)) {
				data.pageTitle = '美店 - 订单列表';
				data._CSSLinks = ['meidian/orderList'];
				mSelf.render('orderList.html' , data);
			}
		});
	}
}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.data.redirect_uri)
		return mSelf.redirectTo(data.connect_weixin.data.redirect_uri ,true);	
}

var go_to_auth = function(mSelf, scope) {
	var url = 'http://' + mSelf.req.headers.host + mSelf.req.url
	mSelf.redirectTo('/auth/connect?type=weixin&scope=' + scope + '&callback_uri=' + encodeURIComponent(url))
}

var check_login = function(mSelf, php, data) {
	for (key in php) {
		if (data[key] && data[key].code == 40102) {
			go_to_auth(mSelf, 'base')
			return false;
		}
	};

	return true;
}

exports.__create = controller.__create(md , controlFns);
















