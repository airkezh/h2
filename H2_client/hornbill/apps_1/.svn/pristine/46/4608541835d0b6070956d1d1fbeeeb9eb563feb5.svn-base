function specialActivity(){
	return this;	
}
var controlFns = {
	hot : function(){
		var access_token = this.readData('access_token' ,this.res.__get ,'');
		var banner_id = this.readData('banner_id' ,this.res.__get ,'');
		if(!banner_id) return this.errorPage();
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/specialActivity/hot/?banner_id='+ banner_id)+'&bg2='+encodeURIComponent('http://meilishuo.com/biz/huodong/specialActivity/?banner_id='+banner_id);
		var mSelf = this;
		var php = {
			'magicBoxMain' : '/customactivity/CustomActivity_common_box?id='+banner_id+'&type=mob&access_token='+access_token
			,'shortURL' : '/url/shorturl?url='+encodeURIComponent(shareURL)
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.shareInfo = data.magicBoxMain.shareInfo;
			var params = {
				'title' : data.shareInfo.subject,
				'text' : data.shareInfo.desc,
				'pic' : data.shareInfo.pic,
				'url' : (data.shortURL && data.shortURL.url) || shareURL
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data.boxPage = data.magicBoxMain.boxPage;
			if ( !data.os.phone && !data.os.android) return mSelf.redirectTo('//www.meilishuo.com/biz/huodong/specialAcrivity/?banner_id='+banner_id); 
			data._CSSLinks = ['activity/beautyBox'];
			mSelf.render('activity/specialTmp.html' , data);
		});
	}
};
exports.__create = controller.__create(specialActivity , controlFns);
