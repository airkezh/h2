function myShop(){
	return this;	
}
var controlFns = {
	'page' : function(args){
		var php = {
			'm_myShop' : '/customactivity/CustomActivity_common_tool_single?id=m_myShop'
		}
		, mSelf = this
		var wapMod = base.loadModel('wap/tools.js');

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			if(!data.m_myShop) return this.errorPage();

			//share
			var _share = data.m_myShop.share
			if (_share) {
				var shareURL = 'http://'+_share.net_en+'.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(_share.wap_link)+'&bg='+encodeURIComponent(_share.noclient_link)+'&bg2='+encodeURIComponent(_share.pc_link)
				var params = {
					'title' : _share.title,
					'text' : _share.text,
					'pic' : {
						'default' : _share.pic
					},
					'url' : shareURL
				};
				if (_share.pic_weixin){
					params.pic.weixin = _share.pic_weixin
					params.pic.weixin_timeline = _share.pic_weixin
					}
				var shares = wapMod.shareTo(mSelf.req , params);
				data.share = shares;
				data.shareID = 'myShop';
			}

			data.pageTitle = '1212私房好店-美丽说';
			data._CSSLinks = ['biz/myShop'];
			mSelf.render('biz/myShop.html' , data);
		});
	}
}
exports.__create = controller.__create(myShop , controlFns);
