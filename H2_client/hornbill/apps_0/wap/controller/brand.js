function brand() {
	return this;
}
var controlFns = {
	'activity' : function(param){
		var php = {
			'pageData' : '/activity/Activity_brand_pavilion_page?__get_r=1',
			'activitys' : '/activity/Activity_brand_pavilion_page_activitys?frame=0&limit=5&__get_r=1'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = 750;
			//data.host = (this.req.headers && this.req.headers.host) || 'm.meilishuo.com';
			data._CSSLinks = ['brand/activity'];
			data.pageTitle = '品牌馆';
			this.render('brand/activity.html' , data);
		});
	},
	'all' : function(params){
		var php = {
			'pageData' : '/activity/Activity_brand_pavilion_page_shop_list?__get_r=1'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = 750;
			data._CSSLinks = ['brand/all'];
			data.pageTitle = '所有品牌';
			this.render('brand/all.html' , data);
		});
	},
	'aj': function(params){
		var php = {
			'activity_poster_m': '/activity/Activity_brand_pavilion_page_activitys',
			'stats' : '/activity/Activity_brand_pavilion_page_activitys_click'
		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(brand, controlFns);
