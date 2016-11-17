function excellentShop(){
	return this;
}

var controlFns = {
	'index': function() {
		var php = {
			'classify' : '/street/shop_classes_weixin?offset=0&limit=5'
			,'shopNew' : '/street/shop_new_good_select?offset=0&limit=10' + '&__get_r=1'
			,'class_list': '/street/shop_class_list_weixin?key=GARMENT'+ '&__get_r=1'
			,'banner' : '/street/shop_new_banner_weixin?offset=0&limit=10'+ '&__get_r=1'
		};
		var ua = this.req.headers['user-agent'];
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.isIphone = platform;
			data.pageTitle = '优质店铺';
			data._CSSLinks = ['wx_new/excellentShop'];
			this.render('wx_new/excellentShop.html', data);
		})
	},
	'aj': function(params){
		var php = {
			'class_list': '/street/shop_class_list_weixin'
		};
		this.ajaxTo(php[params]);
	}
};

exports.__create = controller.__create(excellentShop, controlFns);