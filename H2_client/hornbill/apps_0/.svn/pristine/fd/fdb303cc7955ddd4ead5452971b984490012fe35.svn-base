function season(){
	return this;	
}
var controlFns = {
	'list' : function(seaid){
		var php = {
			'list' : '/customactivity/CustomActivity_wap_seasonal_special_list'
		}
		delete this.req.__get.header
		, mSelf = this
		//, u = mSelf.req.headers['user-agent']
		
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data._CSSLinks = ['activity/season'];
			mSelf.render('activity/season/list.html' , data);
		});
	},
	'goods' : function(seaid){
		if (!this.req.__get.banner_id) return this.errorPage()
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/season/goods/?banner_id='+ this.req.__get.banner_id)+'&bg2='+encodeURIComponent('http://meilishuo.com/welcome')
		var php = {
			'audio' : '/customactivity/CustomActivity_wap_seasonal_special_header'
			,'logo' : '/customactivity/CustomActivity_wap_seasonal_special_partner'
			,'notice' : '/customactivity/CustomActivity_wap_seasonal_special_review'
			,'frend' : '/customactivity/CustomActivity_wap_seasonal_special_brand'
			,'attr' : '/customactivity/CustomActivity_wap_seasonal_special_attribute'
			,'keywords' : '/customactivity/CustomActivity_wap_seasonal_special_popular_keyword'
			,'goods' : '/customactivity/CustomActivity_wap_seasonal_special_hotrecommend'
			,'shortURL' : '/url/shorturl?url='+encodeURIComponent(shareURL)
		}
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var params = {
				'title' : data.audio.page_title,
				'text' : data.audio.description,
				'pic' : data.audio.share_pic,
				'url' : (data.shortURL && data.shortURL.url) || shareURL 
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			//base.var_dump(data.notice, false, 5);
			data._CSSLinks = ['activity/season'];
			mSelf.render('activity/season/season.html' , data);	
		});	
	}

};
exports.__create = controller.__create(season , controlFns);
