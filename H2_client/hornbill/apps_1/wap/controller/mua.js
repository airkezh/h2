function mua() {
	return this;
}
var controlFns = {
	index: function() {
		// this.debugSnake({'target':'devlab1'});
		//临时举措
		var cid = "";
		var date = new Date(),
			day = date.getDay();
		switch (day) {
			case 2:
			case 3:
				cid = 3281;
				break;
			case 4:
			case 5:
				cid = 4761;
				break;
			case 6:
			case 0:
			case 1:
				cid = 4763;
				break;
		}
		var php = {
			'tab': '/mua/getTabs',
			'shop': '/mua/getCoupons?shop_id=171023',
			'pageData': '/customactivity/CustomActivity_common_tool_single?id=mua&cid=' + cid
		};
		var wapMod = this.loadModel('tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.tab || !data.shop) {
				return this.errorPage();
			}
			if (data.pageData.share) {
				var shareData = data.pageData.share;
				var params = {
					'title': shareData.title,
					'text': shareData.text,
					'pic': {
						"weixin": shareData.pic_weixin,
						"weixin_timeline": shareData.pic_weixin,
						"default": shareData.pic
					},
					'url': shareData.link
				};
				data.share = wapMod.shareTo(this.req, params);
			} else {
				data.share = false;
			}
			data._CSSLinks = ['mua/main'];
			data.pageTitle = 'mua - 美丽说';
			this.render('mua/main.html', data);
		});
	},
	main: function() {
		this.index();
	}
};

exports.__create = controller.__create(mua, controlFns);