function region99(){
	return this;
}
var controlFns = {
	index : function(){
		this.redirectTo("/activity/region99/rush/",true);
		return;
		var	php = {
			'miaosha' : 'groupon::/groupon/groupon_marketing_miaosha?type=0&event_id=1065',
			'tuan' : 'groupon::/groupon/groupon_marketing_tuangou',
			'qingcang' : '/customactivity/CustomActivity_common_tool_single?id=region99_qingcang'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
			
			/*微信里没有清仓频道页*/
			if(weixinBrowser) data.qingcang = false;
			
			data.isWx = weixinBrowser;
			if(!data.miaosha || !data.tuan || data.miaosha.error_code || data.tuan.error_code) return this.errorPage();
			data.pageTitle = '今日特惠';
			data.host = (this.req.headers && this.req.headers.host) || 'm.meilishuo.com';
			data.use_rem_screen = true;
			data._CSSLinks = ['activity/region99'];
			this.render('activity/region99.html' , data);
		});
	},
	rush : function(){
		var php = {
			'miaosha' : 'groupon::/groupon/groupon_marketing_miaosha?type=0&event_id=1065&page_code=DailyCoupon&__get_r=1'
			, 'banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=jrth_miaosha_banner&page_code=DailyCoupon&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.miaosha) return this.errorPage();
			data.use_rem_screen = true;
			data.pageTitle = '今日特惠';
			data._CSSLinks = ['activity/region99/rush'];
			this.render('activity/region99/rush.html', data);
		})
	},
	tuan : function(){
		var php = {
			'tuan' : 'groupon::/groupon/groupon_marketing_tuangou?page_code=DailyCoupon&__get_r=1'
			, 'banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=jrth_tuan_banner&page_code=DailyCoupon&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.tuan) return this.errorPage(); 
			data.use_rem_screen = true;
			data.pageTitle = '今日特惠';
			data._CSSLinks = ['activity/region99/tuan'];
			this.render('activity/region99/tuan.html', data);
		})
	},
	clearance : function(){
		var php = {
			'qingcang' : 'groupon::/qingcang/Qingcang_Content_List?code=549e84f42ae826ca4b9d46944b5c8964&page_code=DailyCoupon&good_num=6&__get_r=1'
			, 'banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mrth_qingcang_top_banner&page_code=DailyCoupon&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data.use_rem_screen = true;
			data.pageTitle = '今日特惠';
			data._CSSLinks = ['activity/region99/clearance'];
			this.render('activity/region99/clearance.html', data);
		})
	}
}
exports.__create = controller.__create(region99 , controlFns);
