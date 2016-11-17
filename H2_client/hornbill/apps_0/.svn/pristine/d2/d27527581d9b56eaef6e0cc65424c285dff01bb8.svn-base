function wx(){
	return this;
}
var controlFns = {
	wx : function(params){
		var php = {
			'info' :'/weixin/Weixin_wechat_info' //微信用户信息
		}	
		this.ajaxTo(php[params])
	},
	daily : function(params){
		// this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'coupon' : '/weixin/weixin_mall_promote_1225_coupon' //@require code
		}
		this.ajaxTo(php[params])
	},
	shop : function(params){
		// this.debugSnake({target : 'maoanli.rdlab'});
		var php = {
			'shop_coupon' : '/weixin/Weixin_mall_coupon_apply'
			, 'shop_follow' : '/weixin/Shop_follow'
			, 'shop_waterfall' : '/weixin/Weixin_mall_shop_goods'
		}
		this.ajaxTo(php[params])
	}
	,detail : function(params){
		var php = {
			'show_img_list':'/weixin/weixin_mall_goods_share_list'
			, 'info' :'/weixin/Weixin_wechat_info' //微信用户信息
		}
		this.ajaxTo(php[params])
	}
	,search : function(params){
		// this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'autocomplete':'/weixin/search_autocomplete'// require key_word=a
			,'hot_search' : '/welcome/search_word_recommend'
			,'waterfall' : '/weixin/search_tag_poster'
		}
		this.ajaxTo(php[params])
	}
	,ad_temp : function(params){
		// this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'waterfall' : '/weixin/weixin_mall_special_page' //@require cid & type
		}
		this.ajaxTo(php[params])
	}
	,new_temp : function(params){
		 this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'waterfall' : '/weixin/weixin_mall_general_special_page' //@require cid & type
		}
		this.ajaxTo(php[params])
	}
	,interfaces : function (params){
		var php = {
			'comment_submit' : '/weixin/Weixin_mall_comments'
		}

		this.ajaxTo(php[params])
	}
}
exports.__create = controller.__create(wx , controlFns);
