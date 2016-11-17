function order(){
	return this;	
}
var controlFns = {
	'index' : function(){
		this.list();
	},
	'list' : function(){
		var php={};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var page = this.readData('page',this.req.__get, 0)|0;
		var status = this.readData('status',this.req.__get, 0)|0;
		var mSelf = this;
		this.listenOver(function(data){
		//	base.var_dump(data.order_list.info, false , 5);
			console.log(data.userInfo)
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login' ,false ,{"r": "/order/"});		
				return;	
			}
			data._CSSLinks = ['doota/orderList'];
			data.pageTitle = '订单列表页 - 美丽说';
			data._status=status;

			// data.groupPg = {}; 
			// data.groupPg.total_num = data.order_list.total_num;
			// data.groupPg.page_size = 20 
			// data.groupPg.current_page = page;
			data.showSaleSideBar = true;
			data.topbanner = false
			data.headName = 'order'
			mSelf.render('doota/orderList.html' , data);
		});
	},
	'init' : function(){
		//this.debugSnake({target : 'devlab2'});
		/*
		if ('share' == this.req.__get.ori && ! this.isTokenLive(20,'_cd' , this.req.__get)) {
			return this.errorPage(403)
			} 
		*/
		var php = {}
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.bank, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login');		
				return;	
			}
			//自己注释的
			// if (data.order.code != 0) {
			// 	mSelf.redirectTo('/cart/');
			// 	return ;
			// };
			data._CSSLinks = ['doota/confirm'];
			data.pageTitle = '订单确认页 - 美丽说';
			data.showSaleSideBar = true;
			data.topbanner = false
			mSelf.render('doota/confirm.html',data);
		});
	},
	'detail' : function(){
		var order_id = this.readData('order_id',this.req.__get, 0);
		var mSelf = this;
		var php  = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login',true ,{"r": "/order/detail/?order_id="+order_id});
				return;	
			}
			/*try{
				data.order_id = data.order_info.info.order.order_id
			}catch(e){
				return mSelf.errorPage();
			}*/
			data.order_id = order_id;
			data._CSSLinks = ['doota/orderDetail'];
			data.pageTitle = '订单详情页 - 美丽说';
			data.showSaleSideBar = true;
			data.isHideBindTip = true; //orderDetail.html不显示header绑定提示黄条
			data.topbanner = false;
			mSelf.render('doota/orderDetail.html' , data);
		});
	},
	'create' : function(){
		//this.debugSnake({target : 'devlab2'});
		var php = {};
		if (this.req.__post.goods_id !== undefined) {
			// 从单品页过来的
			php.order = 'doota::/order/add';
		}else{
			// 从购物车过来的
			php.order = 'doota::/order/add_multi';
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			base.var_dump(data.order, false , 5);
			//data.order = false
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login' ,false ,{"r": "/order/"});		
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

			if (orderFail){
				data._CSSLinks = ['doota/refund'];
				data.pageTitle = '创建订单失败 - 美丽说';
				data.showSaleSideBar = true;
				mSelf.render('doota/createOrderFail.html',data);
				return ;
			}
				
			// 没有异常直接提交到银行网关
		//	console.log(data.order)
			if (data.order.form) {
				if (data.order.charset === 'GBK') {
					var iconv = require('../../lib/iconv-lite');
					var str = '<!doctype html><head><meta http-equiv="Content-Type" content="text/html; charset=GBK"><title>美丽说支付网关接口</title></head><body>'+data.order.form+'</body></html>';
					str = iconv.encode(str,'GBK');
					mSelf.res.writeHead( 200, {'Content-Type': 'text/html;charset=gbk','Cache-Control': 'no-cache,no-store'});
					mSelf.res.end(str);
				}else{
					// 暂时没有其他编码的，不是GBK全部用默认的UTF-8
					//on mob  just jump
					return mSelf.redirectTo(data.order.form)
					//mSelf.render('doota/payForm.html',data.order);


					//此处添加微信的判断
				}
			}else{
				if (data.order.total_id) {
					mSelf.redirectTo('/order/');
				}else{
					mSelf.redirectTo('/order/detail/?order_id='+data.order.order_id);
				}
			}
		});
	},
	'pay': function(){
		!this.req.__post.order_id && (this.req.__post.order_id = this.req.__get.order_id);
		!this.req.__post.total_price && (this.req.__post.total_price = this.req.__get.total_price);
		!this.req.__post.total_id && (this.req.__post.total_id = this.req.__get.total_id);
		!this.req.__post.frm && (this.req.__post.frm = this.req.__get.frm);
		this.req.method = 'POST';
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.order, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login' ,false ,{"r": "/order/"});		
				return;	
			}
			console.log(data.userInfo);
			data.order_id = mSelf.req.__post.order_id;
			data.total_price = mSelf.req.__post.total_price;
			data.total_id = mSelf.req.__post.total_id;
			data.source = mSelf.req.__post.source;
			data.frm = mSelf.req.__post.frm;
			mSelf.render('doota/pay.html',data);
		});
	},
	'error' : function(){
		var mSelf = this;
		var php  = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '支付系统报错提示 - 美丽说';
			data.showSaleSideBar= true;
			data.topbanner = false
			mSelf.render('doota/error.html' , data);
		});
	},
	'express_info': function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			try{
				data.order_id = mSelf.readData('order_id',this.req.__get, 0);
				data.express_id = mSelf.readData('express_id',this.req.__get, 0);
				data.express_company = mSelf.readData('express_company',this.req.__get, 0);
			}catch(e){
				return mSelf.errorPage();
			}
			data.pageTitle = '物流信息 - 美丽说';
			data._CSSLinks = ['doota/orderDetail'];
			mSelf.render('doota/express_info.html' , data);
		});
	}
};
exports.__create = controller.__create(order , controlFns);
