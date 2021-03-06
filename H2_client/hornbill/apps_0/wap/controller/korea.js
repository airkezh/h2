function korea() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'new'
		this[args]()
	},
	'main': function() {
		// this.debugSnake({'target': 'chonglishi.rdlab'});
		var self = this;
		var cid = self.req.__get.cid;
		var pageShareURL = encodeURIComponent('/korea?cid=' + cid);
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg=' + pageShareURL + '&bg2=' + encodeURIComponent('http://www.meilishuo.com/welcome/');
		var wapMod = self.loadModel('tools.js');
		var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res));
		var mlsApp = os.mlsApp;
		var php = {
			'koreaInfo': '/koreahall/korea_list?cid=' + cid + '&__get_r=1'
		};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data) {
			data.XR = true;
			data.koreaInfo_XR = data.koreaInfo.r;
			var dataBanner = (data.koreaInfo && data.koreaInfo.data.tInfo.bannerArr) || [];
			dataBanner.forEach(function(v, i) {
				if (!v.url) {
					return;
				}
			});
			data.mlsApp = mlsApp;
			data.bannerArr = (dataBanner.length ? dataBanner : false);
			/*share*/
			var shareList = data.koreaInfo.data.tInfo.share_list || {};
			var params = {
				'title': shareList.share_title,
				'text': shareList.share_text,
				'pic': {
					"weixin": shareList.weixin_pic,
					"weixin_timeline": shareList.weixin_pic,
					"default": shareList.qzone_pic
				},
				'url': shareURL
			};
			// if (!data.os.iphone ||	wapMod.isNewest(this.req , '6.2.0') ) params.shareImg = true
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
				data.share = wapMod.shareTo(self.req, params);
			}

			data.pageTitle = data.koreaInfo.data.tInfo.title ? data.koreaInfo.data.tInfo.title : '韩国品牌街';
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
	},
	new: function() {
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'shop': '/customactivity/CustomActivity_common_tool_single?id=korea-shop',
			'kinds': '/customactivity/CustomActivity_common_tool_single?id=korea-kinds'
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			data.use_rem_screen = true;
			data.banner = (data.share_info && data.share_info.data && data.share_info.data.banner) || [];
			data.tips = (data.share_info && data.share_info.data && data.share_info.data.tips) || {};
			data.pageTitle = '韩国馆';
			data._CSSLinks = ['korea/new'];
			this.render('korea/new.html', data);
		});
	},
	newList: function(cid) {
		var cid = cid || parseInt(this.req.__get.cid);
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'banner': '/customactivity/CustomActivity_common_tool_single?id=korea-list&cid=' + cid,
		};
		weixinShare(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setWeixinShare(data, this, wapMod);
			data.use_rem_screen = true;
			data.cid = cid;
			data.banner = (data.banner && data.banner.data) || [];
			data.pageTitle = '韩国馆';
			data._CSSLinks = ['korea/newList'];
			this.render('korea/newList.html', data);
		});
	}
};
var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.data.redirect)
		return mSelf.redirectTo(data.connect_weixin.data.redirect, true);
};

//微信互联和分享信息
function weixinShare(php) {
	php['connect_weixin'] = '/connect/weixin?type=1';
	php['share_info'] = '/customactivity/CustomActivity_common_tool_single?id=korea-banner';
}

function setWeixinShare(data, self, wapMod) {
	var weixinBrowser = data.os.weixinBrowser;
	if (weixinBrowser) {
		connectWX(self, data);
	};
	/*share*/
	var shareList = (data.share_info && data.share_info.data.share_list) || {};
	var params = {
		'title': shareList.title,
		'text': shareList.text,
		'pic': shareList.pic,
		'url': 'http://' + self.req.headers.host + self.req.url
	};
	//分享类型
	if (wapMod.isNewest(self.req, '6.6.0')) {
		data.appShare = true;
		data.params = params;
	} else {
		data.appShare = false;
		data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
	}
}

//获取R参数
function getR(php) {
	for (var i in php) {
		if (php[i].indexOf('?') == -1) {
			php[i] = php[i] + '?__get_r=1';
		} else {
			php[i] = php[i] + '&__get_r=1';
		}
	}
	php.common_r = '/statistics/referer?__get_r=1';
}
// 开启并设置R
function setR(data, php) {
	data.XR = true;
	for (var i in php) {
		data[i + '_XR'] = (data[i] && data[i].r) || '';
	}
}

exports.__create = controller.__create(korea, controlFns);