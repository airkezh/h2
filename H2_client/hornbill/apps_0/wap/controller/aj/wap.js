function wap(){
	return this;
}
var controlFns = {
	search : function(params){
		var php = {
			'Search_autocomplete' :'/search/Search_autocomplete'
			, 'Search_without_result_recommend' : '/search/Search_without_result_recommend'
		};
		this.ajaxTo(php[params]);
	},
	welcome : function(params){
		var php = {
			'Search_word_recommend' : '/welcome/Search_word_recommend'
		};
		this.ajaxTo(php[params]);
	},
	shop : function(params){
		var php = {
			'Shop_follow' : '/shop/Shop_follow'
			, 'Shop_unfollow' : '/shop/Shop_unfollow'
			, 'Wap_shop_category_goods' : '/shop/Wap_shop_category_goods'
			, 'Wap_shop_inner_goods_search' : '/shop/Wap_shop_inner_goods_search'
		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(wap, controlFns);
