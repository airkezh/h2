function hiGoods(){
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]()
	},
	'main': function() {
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this;
		var pageShareURL = encodeURIComponent('/hiGoods/index');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg=' + pageShareURL + '&bg2=' + encodeURIComponent('http://www.meilishuo.com/welcome/');
		var wapMod = self.loadModel('tools.js');
		var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res));
		var mlsApp = os.mlsApp;
		var host = this.req.headers.host;
		var php = {
			'classify' : '/street/shop_classes?offset=0&limit=5'
			,'banner' : '/street/Shop_hi_banner?offset=0&limit=10&__get_r=1'
			,'hiGoods' : '/street/Shop_hi_goods?__get_r=1'
			,'spike' : '/street/Shop_hi_spike?__get_r=1'
			,'hishare' : '/street/Shop_hi_share?__get_r=1'
			,'category' : '/street/Shop_hi_category?__get_r=1'
		};
		var ua = this.req.headers['user-agent']
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data){
			var shareParam = data.hishare.data || {};
			var params = {
				'title': shareParam.title,
				'text': shareParam.text,
				'pic': {
					"weixin": shareParam.image_url,
					"weixin_timeline": shareParam.image_url,
					"default": shareParam.image_url
				},
				'url': shareURL
			};
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
				data.params = params;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(self.req, params);
			}
			data.XR = true;
			data.host = host;
			data.isIphone = platform;
			data.pageTitle = 'Hi范儿';
			data._CSSLinks = ['hiGoods'];
			this.render('hiGoods.html', data);
		})
	},
	'result': function() {
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this;
		var key_word = this.readData('keyword',this.req.__get, 0);
		var category = this.readData('category',this.req.__get, 0);
		var search = this.readData('search',this.req.__get, 0);
		var php = {
			'resultNum' : '/street/Shop_hi_search?key_word='+ encodeURIComponent(key_word)
			,'category' : '/street/Shop_hi_category?__get_r=1'
		};
		var ua = this.req.headers['user-agent']
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data){
			data.XR = true;
			data.key_word = key_word;
			data.search = search;
			data.isIphone = platform;
			data.use_rem_screen = 640;
			data.pageTitle = 'Hi范儿';
			data._CSSLinks = ['hiGoods/result'];
			this.render('hiGoods/result.html', data);
		})
	}
	,'classify' : function(){
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var self = this;
		var key_word = this.readData('keyword',this.req.__get, 0);
		var category = this.readData('category',this.req.__get, 0);
		var php = {
			'resultNum' : '/street/Shop_hi_search?key_word='+ encodeURIComponent(key_word)
			,'bannerCate' : '/street/Shop_hi_category?key_word=' + encodeURIComponent(category)
		};
		var ua = this.req.headers['user-agent']
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data){
			data.XR = true;
			data.key_word = key_word;
			data.isIphone = platform;
			data.use_rem_screen = 640;
			data.pageTitle = 'Hi范儿';
			data._CSSLinks = ['hiGoods/result'];
			this.render('hiGoods/classify.html', data);
		})
	}
	,'aj': function(params){
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var php = {
			'classList' : '/street/Shop_hi_shop'
			,'searchGoods' : '/street/Shop_hi_search'
			,"like" : "/twitter/like"
		};
		this.ajaxTo(php[params]);
	}
};

exports.__create = controller.__create(hiGoods, controlFns);