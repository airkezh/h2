function shop(){
	return this;
}
var controlFns = {
	'index' : function (spid){
		this.shop(spid);
	},
	'shop' : function(id){
		var php = {
			'shopInfo' : '/shop/Wap_shop_info?useNewDsr=1&shop_id=' + id
			, 'shop_category' : '/shop/Wap_shop_category_menu?shop_id=' + id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.shopId = parseInt(id);
			data.pageTitle = data.shopInfo.shop_nick;

			data._CSSLinks = ['shop/shop'];
			this.render('shop/shop.html' , data);
		});
	},
	'detail' : function(id){
		var php = {
			'shopInfo' : '/shop/Wap_shop_info?useNewDsr=1&shop_id=' + id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.shopId = parseInt(id);
			data.pageTitle = '店铺详情页';

			data._CSSLinks = ['shop/detail'];
			this.render('shop/detail.html' , data);
		});
	},
	'special' : function(id){
		//this.debugSnake({'target':'devlab2'});
		this.req.__get.id = id;
		var php  = {
			'info' : '/shop/shop_special?id=' + this.req.__get.id,
			'coupon' : '/shop/shop_special_coupon_apply?subject_id=' + this.req.__get.id
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if (!data.info) return this.errorPage();
			data._CSSLinks = ['activity/fwindow'];
			data.pageTitle = data.info.title+ '-美丽说';
			mSelf.render('shop/special.html' , data);
		});
	},

	new : function (){
		var shopId = this.req.__get.shop_id
		var tId    = this.req.__get.tid
		var php    = {
			'basic'    : '/shop/shop_new_detail?topic_id=' + tId,  // @require shop_id
			'coupon'   : '/shop/shop_special_coupon_apply'  // @require shop_id
		}

		this.setMDefault(php)
		this.bridgeMuch(php)
		this.listenOver(function (data){

			if (!data.basic){
				return this.errorPage()
			}

			data.topicId   = tId
			data.use_rem_screen = true
			data.pageTitle = '新品到货'
			data._CSSLinks = ['shop/new']
			this.render('shop/new.html', data)
		})
	},

	'activity' : function (cid){
		//this.debugSnake({'target':'devlab1'});
		this.req.__get.cid = cid || this.req.__get.cid;
		var php = {
			'act_info' : '/customactivity/CustomActivity_common_tool_singleNew?id=act&cid='+this.req.__get.cid,
			'coupons' : '/customactivity/CustomActivity_common_coupon_list_1022?type=mob'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			// console.log(data.coupons);
			data._CSSLinks = ['shop/activity'];
			data.pageTitle = data.act_info.page_title + '';
			mSelf.render('shop/activity.html', data);
		});
	},
	'guang' : function(id){
		var php = {};
		var item_name = this.readData('item_name',this.req.__get, '全部商品');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.goTop = true;
			data.shopId = parseInt(id);
			data.pageTitle = item_name;

			data._CSSLinks = ['shop/guang'];
			this.render('shop/guang.html' , data);
		});
	}
};
exports.__create = controller.__create(shop , controlFns);
