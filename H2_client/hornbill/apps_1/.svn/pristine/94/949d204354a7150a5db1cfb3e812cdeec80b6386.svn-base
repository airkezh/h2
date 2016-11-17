function order(){
	return this;
}
var controlFns = {
	'index' : function(){
		this.list();
	},
	'list' : function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;
		var mSelf = this;
		var php  = {
			'order_list' : 'doota::/order/list_info',
			//'order_status': 'doota::/order/order_status',
			'success_pay' : 'doota::/order/success_pay'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.order_list.info, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www + '/user/login' ,false ,{"r": "/order/"});
				return;
			}
			data._CSSLinks = ['order_pc/order/index'];
			data.pageTitle = '订单列表页 - 美丽说';
			data.SaleChannel = true;
			data.groupPg = {};
			data.groupPg.total_num = data.order_list.total_num;
			data.groupPg.page_size = 20
			data.groupPg.current_page = page;
			data.showSaleSideBar = true;
			data.topbanner = false;
			mSelf.render('order/index.html' , data);
		});
	},
	'init' : function(){
		var mSelf = this;
		var sid = this.req.__get.sid;
		var shop_id = this.req.__get.shop_id;
		var addr_id = this.req.__get.the_addr_id||'';

		if(typeof addr_id == 'object' && addr_id.length>1){
			addr_id = addr_id.pop();
		}
		var php = {
			'order' : 'doota::/order/init',
			'addr' : 'doota::/address/addr_list',
			//'bank' : 'doota::/bank/bank_list?shop_id=' + shop_id, //去掉获取银行列表
			'address_select' : 'doota::/address/addr_select'
		};
		var isShowFestivalMsg = (function(){
			var result = true;
			if(new Date().getTime() > new Date('2015-03-02 00:00:00').getTime()){
				result = false;
			}
			return result
		})();

		this.setDefaultData(php);
		this.bridgeMuch(php);

		this.listenOver(function(data){
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login');
				return;
			}
			if (data.order.code != 0) {
				mSelf.redirectTo('/cart/');
				return ;
			}
			data.isShowFestivalMsg = isShowFestivalMsg;

			if (data.order.info.is_haitao){
				data._CSSLinks = ['order_pc/common/confirm_haitao'];
				data.pageTitle = '订单确认页 - 美丽说';
				data.showSaleSideBar = true;
				data.topbanner = false;
				mSelf.render('order/order_confirm_haitao.html',data);
			}else{
                data._CSSLinks = ['order_pc/common/confirm'];
                data.pageTitle = '订单确认页 - 美丽说';
                data.showSaleSideBar = true;
                data.topbanner = false;
                data.addr_id = addr_id;
                // data.order.info.goods[0].goods[0].amount="11";测试提交订单失败的数据
                mSelf.render('order/order_confirm.html',data);
            }
		});
	},
	'post':function(){
		//读php接口切记不可直接在普通js中访问
		//http://redmine.meilishuo.com/projects/doota/wiki/%E4%B9%9D%E3%80%81Hornbill_MVC%E4%B9%8BController#
		this.ajaxTo('doota::/address/addr_list');
	},

	'init_haitao' : function(){
		/*
		if ('share' == this.req.__get.ori && ! this.isTokenLive(20,'_cd' , this.req.__get)) {
			return this.errorPage(403)
			}
		*/
		// order/init_haitao
		// order/add_haitao
		var mSelf = this;

		var sid = this.req.__get.sid;
		var shop_id = this.req.__get.shop_id;

		var php = {
			//'order' : 'fedev::/haitao/init',
			'order' : 'doota-bj::/order/init',
			 'addr' : 'doota-bj::/address/addr_list',
			//'addr' : 'fedev::/haitao/init',
			'bank' : 'doota-bj::/bank/bank_list?shop_id=' + shop_id,
			'address_select' : 'doota-bj::/address/addr_select'
		}
		//console.log('111111' + php.bank);
		//var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.order, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login');
				return;
			}
			if (data.order.code != 0) {
				mSelf.redirectTo('/cart/');
				return ;
			};
			data._CSSLinks = ['order_pc/common/confirm_haitao'];
			data.pageTitle = '订单确认页 - 美丽说';
			data.showSaleSideBar = true;
			data.topbanner = false;

			mSelf.render('order/order_confirm_haitao.html',data);
		});
	},
	'check_init' : function(){
		this.ajaxTo('doota::/order/init');
	},
	'detail' : function(){
		var order_id = this.readData('order_id',this.req.__get, 0);
		var mSelf = this;
		var php  = {
			'order_info' : 'doota::/order/detail?order_id='+order_id
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.order_info, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login',true ,{"r": "/order/detail/?order_id="+order_id});
				return;
			}
			try{
				data.order_id = data.order_info.info.order.order_id
			}catch(e){
				return mSelf.errorPage();
			}
			/*
			*/
			data._CSSLinks = ['order_pc/order/detail'];
			data.pageTitle = '订单详情页 - 美丽说';
			data.showSaleSideBar = true;
			data.isHideBindTip = true;//orderDetail.html不显示header绑定提示黄条
			data.topbanner = false
			mSelf.render('order/detail.html' , data);
		});
	},
	'create' : function(){
		var php = {
		};
		if (this.req.__post.goods_id !== undefined) {
			// 从单品页过来的
			php.order = 'doota::/order/add';
		}else{
			// 从购物车过来的
			php.order = 'doota::/order/add_multi';
		};
		var mSelf = this;
		//this.debugSnake({target : 'devlab3'});
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.order, false , 5);
			//data.order = false
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,false ,{"r": "/order/"});
				return;
			}
			var orderFail = false
			data.topbanner = false
			if (!data.order || data.order.code > 0 ) orderFail = true

			if (data.order === false) {
				data.order.msg = '系统错误，请重新提交订单';
			};
			if (data.order.code > 0) {
				data.order.msg = data.order.info.msg;
			}
			/*
			if (data.order.code == 1) {
				data.order.msg = '您选择的商品'+data.order.info[0].goods_title + '库存不足，请重新下单';
			};
			if (data.order.code == 2) {
				data.order.msg = '您选择的商品'+data.order.info[0].goods_title + '已下架，请重新下单';
			};
			if (data.order.code == 3) {
				data.order.msg = '您选择的商品'+data.order.info[0].goods_title + '价格发生了变化，请重新下单';
			};

			if (data.order.code == 4) {
				data.order.msg = '您选择的商品价格发生了变化，请重新下单';
			//	data.order.msg = '您选择的商品'+data.order.info[0].goods_title + '价格变更为:￥'+data.order.info[0].new_price+'，请重新下单';
			};
			// 订单创建失败后向用户报告错误
			if (data.order.code !== '0') {
			};
			*/
			if (orderFail){
				data._CSSLinks = ['order_pc/refund/error'];
				data.pageTitle = '创建订单失败 - 美丽说';
				data.showSaleSideBar = true;
				mSelf.render('order/createFail.html',data);
				return ;
			}

      //0元购
			if (data.order && data.order.no_paid_purchase && data.order.no_paid_purchase == '1') {
				if(data.order.total_id){
					mSelf.redirectTo('/order/');
				}else if(data.order.order_id){
					mSelf.redirectTo('/order/detail/?order_id=' + data.order.order_id);
				}
				return;
			}

			// 没有异常直接提交到收银台
			mSelf.redirectTo(data.DOMAIN.zhifu + '/wallet/index/?' + (data.order.total_id ? 'totalId=' + data.order.total_id : 'orderId=' + data.order.order_id));
		});
	},
	'select_bank': function(){

		var php = {
			'bank': 'doota::/bank/bank_list'
		};
		var self = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.userInfo || !data.userInfo.user_id){
				self.redirectTo(data.DOMAIN.www+'/user/login' ,false ,{"r": "/order/"});
				return;
			}
			data._CSSLinks = ['order_pc/common/confirm','order/order/select_bank'];
			data.order_id = self.req.__get.order_id;
			data.total_price = self.req.__get.total_price;
			data.total_id = self.req.__get.total_id;
			data.pageTitle = '选择支付方式 - 美丽说';
			self.render('order/selectBank.html',data);
		});
	},
	'pay': function(){

		!this.req.__post.order_id && (this.req.__post.order_id = this.req.__get.order_id);
        !this.req.__post.total_id && (this.req.__post.total_id = this.req.__get.total_id);
		!this.req.__post.total_price && (this.req.__post.total_price = this.req.__get.total_price);
		!this.req.__post.total_id && (this.req.__post.total_id = this.req.__get.total_id);
		!this.req.__post.bank_name && (this.req.__post.bank_name = this.req.__get.bank_name);
		!this.req.__post.pay_channel && (this.req.__post.pay_channel = this.req.__get.pay_channel);
		!this.req.__post.frm && (this.req.__post.frm = this.req.__get.frm);
		this.req.method = 'POST';
		var php = {
			'order': (this.req.__post.total_id === undefined && false) ? 'doota::/order/fetch_url' : 'doota::/order/send_to_pay'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,false ,{"r": "/order/"});
				return;
			}
			//base.var_dump(data.order, false , 5);

			// 从wap下订单到PC支付会出现没有支付方式的错误，所以到这里要中转到选择购买方式的页面
			data.showSaleSideBar = true;
			data.topbanner = false;

			if(data.order.code == 5){
				//跳订单详情页
				return mSelf.redirectTo('/order/detail?order_id='+(mSelf.req.__post.order_id||''))
			} else if (data.order.code === '4') {
				// console.log(data.order);
				// data._CSSLinks = ['doota/confirm'];
				mSelf.redirectTo(
					'/order/select_bank/?order_id='+(mSelf.req.__post.order_id||'')+
					'&total_id='+(mSelf.req.__post.total_id||'')+
					'&total_price='+(mSelf.req.__post.total_price||'')
				);
			}else if(data.order.code !== '0'){
				// 购买错误，比如订单里有商品已经下架
				if(!data.order)
					data.order = {
						msg : '支付失败，请重试。'
					}
				data._CSSLinks = ['order_pc/refund/error'];
				data.pageTitle = '订单支付失败 - 美丽说';
				mSelf.render('order/createFail.html',data);
			}else if (data.order.is_wechat){
				//微信
				return this.redirectTo('/order/weixin_pay/?order_id='+data.order.order_id,false);
			}else if (data.order.is_pc_to_mob){
				//美丽说收银台
				return this.redirectTo('/order/mlsapp_pay/?order_id='+data.order.order_id,false);
			}else{
				// 正常情况下会返回form字段，自动提交到银行网关
				// 如果是GBK编码需要用iconv转一下
				if (data.order.charset === 'GBK') {
					var iconv = require('../../lib/iconv-lite');
					var str = '<!doctype html><head><meta http-equiv="Content-Type" content="text/html; charset=GBK"><title>美丽说支付网关接口</title></head><body>'+data.order.form+'</body></html>';
					str = iconv.encode(str,'GBK');
					mSelf.res.writeHead( 200, {'Content-Type': 'text/html;charset=gbk','Cache-Control': 'no-cache,no-store'});
					mSelf.res.end(str);
				}else{
					// 暂时没有其他编码的，不是GBK全部用默认的UTF-8
					mSelf.render('order/payForm.html',data.order);
				}
			}
		});
	},

	'compute' : function(){
		this.ajaxTo('doota::/order/init');
	},
	'error' : function(){
		var mSelf = this;
		var php  = {}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '支付系统报错提示 - 美丽说';
			data.showSaleSideBar= true;
			data.topbanner = false
			mSelf.render('order/error.html' , data);
		});
	},
	'express_info': function(){
		var self = this;
		var php = {
			'express': 'doota::/order/express_info'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '物流信息 - 美丽说';
			data._CSSLinks = ['order_pc/order/detail'];
			self.render('order/express_info.html' , data);
		});
	},
	confirm_receive: function(){
		var self = this;
		var php = {
			"order":"doota::/order/detail"
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.userInfo || !data.userInfo.user_id){
				return self.redirectTo(data.DOMAIN.www+'/user/login',true);
			}
			// if (!data.order.code != 0 || !data.order.info) return self.errorPage();
			data.pageTitle = '确认收货 - 美丽说';
			data._CSSLinks = ['order_pc/order/detail'];
			data.order_id = self.req.__get.order_id;
			self.render('order/confirmReceive.html' , data);
		});
	},
	weixin_pay: function(){
		this.req.__post.order_id = this.req.__get.order_id;
		this.req.method = 'POST';
		var php = {
			"order" : "doota::/order/wechat_pc_fetch"
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.order || data.order.code!=0){
				data.order =  data.order || {
					msg : '支付失败，请重试。'
				}
				data._CSSLinks = ['order_pc/refund/error'];
				data.pageTitle = '订单支付失败 - 美丽说';
				this.render('order/createFail.html',data);

				return;
			};
			data.pageTitle = '美丽说微信支付 - 美丽说';
			data._CSSLinks = ['order_pc/order/weixin_pay'];
			this.render('order/weixin_pay.html' , data);
		});
	},
	mlsapp_pay: function(){
		this.req.__post.order_id = this.req.__get.order_id;
		this.req.method = 'POST';
		var php = {
			"order" : "doota::/order/wallet_pc_fetch"
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.order || data.order.code!=0){
				data.order =  data.order || {
					msg : '支付失败，请重试。'
				}
				data._CSSLinks = ['order_pc/refund/error'];
				data.pageTitle = '订单支付失败 - 美丽说';
				this.render('order/createFail.html',data);
				return;
			};
			data.pageTitle = '美丽说钱包支付 - 美丽说';
			data._CSSLinks = ['order_pc/order/app_pay'];
			this.render('order/mlsapp_pay.html', data);
		});
	},
	alter_pay: function(){
        var total_id = this.readData('total_id',this.req.__get, 0);
		var order_id = this.readData('order_id',this.req.__get, 0);
		var total_price = this.readData('total_price',this.req.__get, 0);
		var php = {
			'bank' : 'doota::/bank/bank_list?order_id=' + order_id
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.order, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login');
				return;
			}
            data.total_id = total_id;
			data.order_id = order_id;
			data.total_price = total_price;
			data._CSSLinks = ['order_pc/order/alter_pay'];
			data.pageTitle = '更改支付方式 - 美丽说';
			data.showSaleSideBar = true;
			data.topbanner = false
			mSelf.render('order/alter_pay.html',data);
		});
	},

	alter_pay_haitao: function(){
        var total_id = this.readData('total_id',this.req.__get, 0);
		var order_id = this.readData('order_id',this.req.__get, 0);
		var total_price = this.readData('total_price',this.req.__get, 0);
		var php = {
			'bank' : 'doota-bj::/bank/bank_list?order_id=' + order_id
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.order, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login');
				return;
			}
            data.total_id = total_id;
			data.order_id = order_id;
			data.total_price = total_price;
			data._CSSLinks = ['order_pc/order/alter_pay_haitao'];
			data.pageTitle = '更改支付方式 - 美丽说';
			data.showSaleSideBar = true;
			data.topbanner = false
			mSelf.render('order/alter_pay_haitao.html',data);
		});
	}


};

exports.__create = controller.__create(order , controlFns);
