function self() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]()
	},
	main: function() {
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'indexData': '/recommend/recommend_b2c'
		};
		share(php);
		//r参数
		getR(php);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//r参数
			setR(data, php);
			setShare(data, this, wapMod);
			data.use_rem_screen = true;
			data.banner = (data.indexData && data.indexData.data && data.indexData.data.b2c_banner) || [];
			data.pageTitle = '百搭良品';
			data._CSSLinks = ['self'];
			this.render('self.html', data);
		});
	}
};

var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.data.redirect)
		return mSelf.redirectTo(data.connect_weixin.data.redirect, true);
};

//分享信息
function share(php) {
	php['connect_weixin'] = '/connect/weixin?type=0';
	// php['share_info'] = '/customactivity/CustomActivity_common_tool_single?id=zulily_index';
}

function setShare(data, self, wapMod) {
	var weixinBrowser = data.os.weixinBrowser;
	if (weixinBrowser) {
		connectWX(self, data);
	};
	/*share*/
	var shareList = (data.indexData && data.indexData.data && data.indexData.data.b2c_share) || {};
	var shareHost = 'http://' + self.req.headers.host;
	var params = {
		'title': shareList.title,
		'text': shareList.text,
		'pic': shareList.pic,
		'url': shareHost + "/self"
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
		//不会把浏览器的参数带到PHP接口里面
		if (php[i].indexOf('&$') > 0) {
			php[i] = php[i].replace('&$', '') + '&$';
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

exports.__create = controller.__create(self, controlFns);