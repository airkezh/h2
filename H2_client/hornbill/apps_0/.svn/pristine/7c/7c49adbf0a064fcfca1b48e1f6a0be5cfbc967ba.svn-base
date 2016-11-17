function tuan() {
	return this;
}
var controlFns = {
	'tg512' : function(event_id)
	{
		var event_id = event_id||this.req.__get.event_id || 1010;
		this.req.__get.event_id = event_id;
		var php = {
			'rush' :'groupon::/groupon/grouponEventPoster?event_id='+event_id
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.apparel_alert =false;
			data.event_id = event_id;
			if(data.rush.data.tuan_event_info.is_top_nav_tab){
				data.secondNavHold = true;
			}
			else{
				data.hideGoTop = true;
			}			
			data.headTag = 'tuan_activity';
			data._CSSLinks = ['huodong/tg512'];
			data.pageTitle = data.rush.data.tuan_event_info.title;
			data.reg_feedback=null;
			this.render('tuan/tg512.html' , data);
		});
	},
	'factory' : function(cid){
		var php = {
			'finfo' : 'groupon::/groupon/groupon_image_template_pc?cid=' + cid 
		};
		
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.finfo.error_code != 0) return this.errorPage();
			data.headTag = 'tuan_activity';
			data._CSSLinks = ['tuan/factory'];
			data.pageTitle = '工厂直供';
			this.render('tuan/factory.html' , data);
		});
	}
}
exports.__create = controller.__create(tuan, controlFns);
