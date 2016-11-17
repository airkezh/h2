function penny(){
	return this;
}

var controlFns = {
	page : function(){
		var mSelf = this;
		var pageShareURL = encodeURIComponent('/activity/penny/page/?cid='+this.req.__get.cid)
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=wap_penny',
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			var shareList = data.pageData.share_list;
			if(!data.pageData) return this.errorPage();
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');
			/*share*/
			var params = {
					'title' : shareList.share_title,
					'text' : shareList.share_text,
					'pic' : {
						"weixin" : shareList.weixin_pic,
						"weixin_timeline" : shareList.weixin_pic,
						"default" : shareList.qzone_pic
					},
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);

			data.pageTitle = '一分钱试穿';
			data.headTag = 'penny';
			data._CSSLinks = ['activity/penny'];
			mSelf.render('activity/penny.html' , data);
		});
	}
}

exports.__create = controller.__create(penny , controlFns);
