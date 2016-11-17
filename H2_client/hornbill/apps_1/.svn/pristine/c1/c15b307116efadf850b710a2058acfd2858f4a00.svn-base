var controlFns = {
	'index' : function(){
		this.dialog();
	},
	'dialog' : function(){
		var toid = this.req.__get.toid | 0 ;
		var php = {
			'black' : '/im/blacklist?type=exists&to='+toid
			,'im_user_info' : 'im::/im/user_info'
			, 'recently' : 'im::/im/recently?source=web&to=' + toid
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			data.pageTitle = '美丽说客服'
			data._CSSLinks = ['im/windows'];
			this.render('www/windows.html' , data);
		});
	},
	'tab' : function(){
		var toid = this.req.__get.toid | 0 ;
		var php = {
			'recent_order' : '/im/orders?to='+toid
			,'goods' : 'im::/im/goods?to='+toid
			,'shop_info' : 'im::/im/im_shop?to='+toid

		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			data.pageTitle = '美丽说客服'
			data._CSSLinks = ['im/tab'];
			this.render('www/tab.html' , data);
		});
	},
	'test' : function(){
		var php = {}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说客服'
			data._CSSLinks = ['im/windows'];
			this.render('test1.html' , data);
		});
	},
	'login' :function(){
		var php = {}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '登录'
			data._CSSLinks = ['im/win/login'];
			this.render('win/login.html' , data);
		});
	},
	'chat' : function(){
		var toid = this.req.__get.toid | 0 ;
		var php = {}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			data.pageTitle = '聊天窗口'
			data._CSSLinks = ['im/win/chat'];
			this.render('win/chat.html' , data);
		});
	},
	'info' : function(){
		this.debugSnake({target : 'shuaihuang.rdlab'});
		var toid = this.req.__get.toid | 0 ;
		var php = {
			'recent_order' : 'im::/im/orders?to='+toid
			,'goods' : 'im::/im/goods?to='+toid
			,'shop_info' : 'im::/im/im_shop?to='+toid
			,'remark_get' : 'im::/im/open_remark_get'
			,'ulabel_get' :'im::/im/open_ulabel_get'
			,'order_status_list' :'im::/im/open_order_status_list'
			,'to_info' : 'im::/im/official_user_info'
			,'open_vip_info': 'im::/im/open_vip_info?user_id='+toid
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log(data.open_vip_info);
			data.pageTitle = '店铺信息'
			data._CSSLinks = ['im/win/info'];
			this.render('win/info.html' , data);
		});
	},
    'buyer_platform_info' : function() {
        var toid = this.req.__get.toid | 0 ;
        var php = {
            'recent_order' : 'im::/im/orders?to='+toid
            ,'order_status_list' :'im::/im/open_order_status_list'
        }
        this.bindDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.pageTitle = '店铺信息'
            data._CSSLinks = ['im/win/info'];
            this.render('win/buyer_platform_info.html' , data);
        });
    },
    'buyer_detail' : function() {
        var toid = this.req.__get.toid | 0 ;
        var php = {
            'recent_order' : 'im::/im/orders?to='+toid
            ,'order_status_list' :'im::/im/open_order_status_list'
        }
        this.bindDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.pageTitle = '用户信息'
            data._CSSLinks = ['im/win/buyer_detail'];
            this.render('win/buyer_detail.html' , data);
        });
    },
	'infosy' : function(){
		var toid = this.req.__get.toid | 0 ;
		console.log(toid+'^^^^^*****^^^^^')
		var php = {
			'recent_order' : 'im::/im/orders?to='+toid
			,'goods' : 'im::/im/goods?to='+toid
			,'remark_get' : 'im::/im/open_remark_get'
			,'ulabel_get' :'im::/im/open_ulabel_get'
			,'order_status_list' :'im::/im/open_order_status_list'
			,'shop_info' : 'im::/im/im_shop?to='+toid
			,'to_info' : 'im::/im/official_user_info'
			,'data_info' : 'im::/im/official_shop_dailydata'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('%%%', JSON.stringify(data.data_info))
			data.pageTitle = '店铺信息'
			data._CSSLinks = ['im/win/infosy'];
			this.render('win/infosy.html' , data);
		});
	},
	/*'infosy' : function(){
		var toid = this.req.__get.toid | 0 ;
		var shopid = this.req.__get.shop_id || 0 ;
		console.log(toid+'^^^^^*****^^^^^')
		var php = {
			'goods' : 'im::/im/goods?to='+toid
			,'shop_info' : 'im::/im/im_shop?to='+toid
			,'to_info' : 'im::/im/official_user_info'
			,'data_info' : 'im::/im/official_shop_dailydata?shop_id='+shopid
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){		
			console.log('%%%', JSON.stringify(data.data_info))
			data.pagetitle = '店铺信息';
			data._csslinks = ['im/win/infosy'];
			this.render('win/infosy.html' , data);
		});
	},*/
	'infosj' : function(){
		var toid = this.req.__get.toid || 0 ;
		var shopid = this.req.__get.shopid || 0 ;
		console.log(toid+'^^^^^*****^^^^^')
		var php = {
			'shop_info' : 'im::/im/im_shop?to='+toid
			,'to_info' : 'im::/im/official_user_info'
			,'data_info' : 'im::/im/open_official_shop_info?shop_id='+shopid
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('%%%', JSON.stringify(data.data_info))
			data.pagetitle = '店铺信息';
			data._CSSLinks = ['im/win/info'];
			this.render('win/infosj.html' , data);
		});
	},

	'blank':function(){
		var cookieStr = this.req.__get.cook
		if(cookieStr){
			cookieStr = decodeURIComponent(cookieStr)
			var arr = []
			cookieStr.split(';').forEach(function(item,i,a){
				if(item) arr[i] = item+";domain=.meilishuo.com;path=/;"
			})
			this.res.setHeader("Set-Cookie", arr)
		}
		this.res.write('')
		this.res.end()
	},
	'setting' : function(){
		var php = {
			'udr' : 'im::/im/udr_get'
			,'autoreply_msg' : 'im::/im/open_autoreply?action=getting'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '设置'
			data._CSSLinks = ['im/win/setting'];
			this.render('win/setting.html' , data);
		});
	},
	aj : function(params){
		var php = {
			'remark_update' : 'im::/im/open_remark_update'
			,'ulabel_add':'im::/im/open_ulabel_add'
			,'ulabel_del' :'im::/im/open_ulabel_delete'
			, 'udr_update' : 'im::/im/udr_update'
			, 'udr_add' : 'im::/im/udr_add'
			, 'udr_del' : 'im::/im/udr_delete'
			, 'update_autoreply' : 'im::/im/open_autoreply'
			, 'add_seller_remark' : 'im::/im/open_order_remark'
			, 'recent_order' : 'im::/im/orders'
		}
		this.ajaxTo(php[params])
	}

};
exports.__create = controller.__create(new Function(), controlFns);
