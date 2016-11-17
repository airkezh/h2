function superBuyers(){
	return this;	
}
var controlFns = {
	'page' : function(args){
		var php = {
			'super_buyers' : '/customactivity/CustomActivity_common_tool_single?id=mSuperBuyer'
		}
		, mSelf = this

		//share must
		var wapMod = base.loadModel('wap/tools.js');

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			if(!data.super_buyers) return this.errorPage();

			//share must
			var _share = data.super_buyers.share
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
				data.shareID = 'superBuyers';
			}

			data.pageTitle = '双十二美丽买手团帮你挑衣服';
			data._CSSLinks = ['biz/superBuyers'];
			mSelf.render('biz/superBuyers.html' , data);
		});
	}
}
exports.__create = controller.__create(superBuyers , controlFns);
