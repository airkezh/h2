function coupon(){
	return this;
}
var controlFns = {
	out : function(coupon_apply_code){
		var	php = {
			'coupon_get' : '/coupon/outspread_apply?coupon_apply_code='+coupon_apply_code
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '优惠券领取 - 美丽说';
			data._CSSLinks = ['coupon_get'];
			this.render('coupon_get.html' , data);
		});
	},
	list : function(){
		var	php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = '640_mate';
			data.page_tag = 'coupon';

			data.pageTitle = '我的优惠券';
			data._CSSLinks = ['coupon_list'];
			this.render('coupon_list.html' , data);
		});
	},
	order_share : function(){
		this.req.__get.template_id = this.req.__get.template_id || '12547'
		var	php = {
			'template':'/newcomer/Get_order_redpackage_land_setting'
			,'mobile_info':'/newcomer/Get_order_redpackage_mobile'
			,'connect_weixin' : '/connect/weixin?type=1'
			,'package_apply':'/newcomer/Redpackage_apply'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.os.weixinBrowser && data.connect_weixin && data.connect_weixin.redirect)
				return this.redirectTo(data.connect_weixin.redirect ,true)
			data.pageTitle = '跑男团给你发红包';
			data.use_rem_screen = true;
			data._CSSLinks = ['order_share'];
			this.render('coupon/order_share.html' , data);
		});
	},
	modify_phone : function(){
		var	php = {
			'connect_weixin' : '/connect/weixin?type=1'
			,'mobile_info':'/newcomer/Get_order_redpackage_mobile'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.connect_weixin && data.connect_weixin.redirect)
				return this.redirectTo(data.connect_weixin.redirect ,true)
			data.pageTitle = '修改领取优惠券手机号';
			data.use_rem_screen = true;
			data._CSSLinks = ['modify_phone'];
			this.render('coupon/modify_phone.html' , data);
		});
	}
}
exports.__create = controller.__create(coupon , controlFns);
