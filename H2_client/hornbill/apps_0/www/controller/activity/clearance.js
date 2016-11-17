function clearance() {
	return this;
}
var controlFns = {
	'index' : function(event_id){
		var event_id = event_id || this.req.__get.event_id || 2005;
		this.req.__get.event_id = event_id;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'banner' : 'groupon::/groupon/Groupon_get_banners_pc?locationKey=pc_qingcang_top_banner'
			, 'poster0' : 'groupon::/qingcang/Qingcang_Pc?event_id=' + event_id
			, 'nav' : 'groupon::/qingcang/Qingcang_Pc_Tab?event_id=' + event_id
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hideGoTop = true;
			data.cata = this.req.__get.cata;
			data.sort = this.req.__get.sort || 0;
			data.sbase = this.req.__get.sbase || 0;
			// 获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.poster0.data.totalNum;
			data.groupPg.page_size = 220;
			data.groupPg.current_page = page; 
			data.event_id = event_id;
			data.pageTitle = "超值特卖";
			data._CSSLinks = ['activity/clearance'];
			this.render('activity/clearance.html' , data);
		});
	}
}
exports.__create = controller.__create(clearance, controlFns);