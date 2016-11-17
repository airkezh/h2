function korea(){
	return this;
}

var controlFns = {
	'index': function() {
		// this.debugSnake({'target': 'chonglishi.rdlab'});
		var self = this;
		var cid = self.req.__get.cid;
		var pageShareURL = encodeURIComponent('/korea?cid=' + cid);
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var wapMod = self.loadModel('tools.js');
		var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
		var mlsApp = os.mlsApp;
		var php  = { 
				'koreaInfo' : '/koreahall/korea_list?cid=' + cid+'&__get_r=1'
			};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			data.XR = true;
			data.koreaInfo_XR=data.koreaInfo.r;
			var dataBanner = (data.koreaInfo && data.koreaInfo.data.tInfo.bannerArr) || [];
			dataBanner.forEach(function(v, i) {
				if(!v.url){
					return;
				}
			});
			data.mlsApp = mlsApp;
			data.bannerArr=(dataBanner.length?dataBanner:false);
			/*share*/
			var shareList = data.koreaInfo.data.tInfo.share_list || {};
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
			if (!data.os.iphone ||	wapMod.isNewest(this.req , '6.2.0') ) params.shareImg = true
			//iphone 6.2.0 才支持
			////params.shareImg = false 
			//图还没准备好 先关闭
			// data.share = wapMod.shareTo(self.req , params);

			//分享类型
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
				data.params = params;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(self.req , params);
			}

			data.pageTitle = data.koreaInfo.data.tInfo.title ? data.koreaInfo.data.tInfo.title : '韩国品牌街' ;
			data._CSSLinks = ['korea/korea_new'];
			self.render('korea/korea_new.html', data);
		});
	},
	'xiaobao': function() {
		var self = this,
			php = {

			};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data) {
			data.pageTitle = '韩国馆服务保障说明';
			data._CSSLinks = ['korea/xiaobao'];
			self.render('korea/xiaobao.html', data);
		});
	}
};

exports.__create = controller.__create(korea, controlFns);
