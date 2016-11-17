function region99(){
	return this;
}
var controlFns = {
	index : function(args){
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
	}
}
exports.__create = controller.__create(region99 , controlFns);
