function tuan() {
	return this;
}
var controlFns = {
	'old' : function(param){
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
	},
	'index' : function(){
		var mSelf = this;
		var ua = this.req.headers['user-agent'];
		var platform = false;
        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }
        var wapMod = base.loadModel('wap/tools.js');
        var shareURL = 'http://m.meilishuo.com/tuan/';
		var php = {
			'b_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_big_banner&page_code=tuan_channel',
			'activity_recommend' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_newbanners&page_code=tuan_channel',
			'every_recommend' : 'groupon::/groupon/groupon_everyday_recommend?page_code=tuan_channel',
			'pop_recommend' : 'groupon::/groupon/groupon_popular_recommend?page_code=tuan_channel',
			'nav_info' : 'groupon::/groupon/groupon_poster_mob_tab?page_code=tuan_channel',
			'share_info' : 'groupon::/groupon/groupon_get_groupon_share'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			/*share*/
			var params = {
				'title' : data.share_info && data.share_info.data.share_info.share_title || '',
				'text' : data.share_info && data.share_info.data.share_info.share_text || '美丽说超值团',
				'pic' : data.share_info && data.share_info.data.share_info.share_image || '',
				'url' : shareURL
			};
			if(wapMod.isNewest(mSelf.req, '6.6.0')){
				data.appShare = true;
				data.params = params;
			}
			data._CSSLinks = ['tuan/tuan_beauty'];
			data.pageTitle = '团购';
			data.geturl = '/aj/tuan/ajlist';
			data.hostnm = this.req.headers.host;
			data.isIphone = platform;
			data.use_rem_screen = true;
			data.cata = this.readData('cata',this.req.__get, 0);
			this.render('tuan/tuan_beauty.html' , data);
		});
	}
}
exports.__create = controller.__create(tuan, controlFns);