function exo_fans(){
	return this;
}
var controlFns = {
    signature : function(params){
		var php = {
			'exo_fans_sig' :'/customactivity/CustomActivity_common_tool_single?id=wap_4years_prepare&cid=1959'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
			data.pageTitle = data.exo_fans_sig.share.title;
			data._CSSLinks = ['activity/exo_fans_sig'];
			if (data.exo_fans_sig && data.exo_fans_sig.share) {
				var cid = mSelf.req.__get.cid
				var punchShare = data.exo_fans_sig.share
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
				if (punchShare.pic_weixin){
					params.pic.weixin = punchShare.pic_weixin
					params.pic.weixin_timeline = punchShare.pic_weixin
					}
				var shares = wapMod.shareTo(mSelf.req , params , null,'weixin_timeline');
				data.share = shares;
			}
			mSelf.render('activity/wap_4years_prepare/exo_fans_sig.html' , data);
		});
	}
}
exports.__create = controller.__create(exo_fans , controlFns);
