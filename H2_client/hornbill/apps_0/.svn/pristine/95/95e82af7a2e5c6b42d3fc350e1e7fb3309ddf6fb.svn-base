function tuan() {
	return this;
}
var controlFns = {
	'index' : function(param){
		var php = {
			'b_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_big_banner',
			'mid_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_double11_big_banner',
			'q8_banner' : 'groupon::/groupon/groupon_get_fixed_qiang8_banner_mob',
			's_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_right_banners_new'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['tuan/tuan_new'];
			data.pageTitle = '团购';
			data.geturl= '/aj/tuan/ajlist';
			data.hostnm=this.req.headers.host;
			data.cata = this.readData('cata',this.req.__get, 0);
			this.render('tuan/tuan_new.html' , data);
		});
	},
	'list' : function(event_id){		
		var php = {};
		var ua = this.req.headers['user-agent'];
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isIphone = platform;
			data._CSSLinks = ['tuan/tuan_new'];
			data.pageTitle = '团购';
			data.geturl='/aj/tuan/batch?event_id='+event_id;
			mSelf.render('tuan/juhe.html' , data);
		});
	}	
}
exports.__create = controller.__create(tuan, controlFns);
