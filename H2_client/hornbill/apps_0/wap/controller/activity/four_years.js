function four_years(){
	return this;
}
var controlFns = {
	prepare : function(params){
		var php = {
			'wap_4years_prepare' :'/customactivity/CustomActivity_common_tool_single?id=wap_4years_prepare'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
			var $wapPrepare = data.wap_4years_prepare;
			if (!$wapPrepare) return mSelf.errorPage();
			if ($wapPrepare.share.title) {
				var cid = mSelf.req.__get.cid
				var punchShare = $wapPrepare.share
				if ('343' == cid || '363' == cid || '365' == cid){
					punchShare.wap_link = '/activity/project/audio/?banner_id=2f5f4716b81d7a03d329424eb8f89a9d'
				}
				var shareURL = 'http://'+punchShare.net_en+'.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(punchShare.wap_link)+'&bg='+encodeURIComponent(punchShare.noclient_link)+'&bg2='+encodeURIComponent(punchShare.pc_link)
				var params = {
					'title' : punchShare.title,
					'text' : punchShare.text,
					'pic' : {
						'default' : punchShare.pic
					},
					'url' : shareURL
				};
				if (!data.os.iphone ||  wapMod.isNewest(this.req , '6.2.0')) params.shareImg = true
				params.shareImg = false

				if (punchShare.pic_weixin){
					params.pic.weixin = punchShare.pic_weixin
					params.pic.weixin_timeline = punchShare.pic_weixin
				}
				var shares = wapMod.shareTo(mSelf.req, params, null,'weixin_timeline');
				data.share = shares;
			}
			data.XR = true
			data.pageTitle = $wapPrepare.share.title || '活动 - 美丽说';
			data._CSSLinks = ['activity/wap_4years_prepare'];
			mSelf.render('activity/wap_4years_prepare/wap_4years_prepare.html' , data);
		});
	}
}
exports.__create = controller.__create(four_years , controlFns);
