function onSale() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]();
	},
	main: function() {
		var from_id = this.req.__get.from_id || 0;
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var php = {
			'connect_weixin': '/connect/weixin?type=0',
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale',
			'user': '/weixin/Weixin_activity_Config?from_id=' + from_id,
			'info': '/weixin/Weixin_activity_Check_friendsCircle?from_id=' + from_id,
		};
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (weixinBrowser) {
				connectWX(this, data);
			}
			var codeNum = data.info;
			switch (codeNum.code) {
				case 1:
					this.redirectTo('/onSale/nums?remain=' + codeNum.shengxia + '&from_id=' + from_id);
					break;
				case 2:
					this.redirectTo('/onSale/phone?status=2&from_id=' + from_id);
					break;
				case 3:
					this.redirectTo('/onSale/app?from_id=' + from_id);
					break;
				case 4:
					this.redirectTo('/onSale/nums?remain=0&from_id=' + from_id);
					break;
				case 5:
					this.redirectTo('/onSale/phone?status=0&from_id=' + from_id);
					break;
				case 6:
					this.redirectTo('/onSale/late?status=1&from_id=' + from_id);
					break;
				default:
					data.from_id = from_id;
					data.user_id = data.userInfo.user_id;
					data.pageTitle = '潮人T恤1元领';
					data._CSSLinks = ['onSale/main'];
					this.render('onSale/main.html', data);
			}
		});
	},
	share: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var clothes_id = this.req.__get.clothes_id;
		var from_id = this.req.__get.from_id || 0;
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale',
			'connect_weixin': '/connect/weixin?type=1',
			'clothes': '/weixin/Weixin_activity_GiveClothesInfoById?clothes_id=' + clothes_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (weixinBrowser) {
				connectWX(this, data);
			}
			data.from_id = from_id;
			data.clothes_id = clothes_id;
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/share'];
			this.render('onSale/share.html', data);
		});
	},
	nums: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var remain = parseInt(this.req.__get.remain);
		var from_id = this.req.__get.from_id || 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale',
			'info': '/weixin/Weixin_activity_Check_friendsCircle?from_id=' + from_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.remain = remain;
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/nums'];
			this.render('onSale/nums.html', data);
		});
	},
	phone: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var status = parseInt(this.req.__get.status);
		var from_id = this.req.__get.from_id || 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale',
			'info': '/weixin/Weixin_activity_Check_friendsCircle?from_id=' + from_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.status = status;
			data.from_id = from_id;
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/phone'];
			this.render('onSale/phone.html', data);
		});
	},
	app: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var from_id = this.req.__get.from_id || 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.from_id = from_id;
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/app'];
			this.render('onSale/app.html', data);
		});
	},
	late: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var status = parseInt(this.req.__get.status);
		var from_id = this.req.__get.from_id || 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale',
			'info': '/weixin/Weixin_activity_Check_friendsCircle?from_id=' + from_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.status = status;
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/late'];
			this.render('onSale/late.html', data);
		});
	},
	introduce: function() {
		// this.debugSnake({
		// 	'target': 'lab3'
		// });
		var from_id = this.req.__get.from_id || 0;
		var php = {
			'onSale': '/customactivity/CustomActivity_common_tool_singleNew?id=onSale'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.user_id = data.userInfo.user_id;
			data.pageTitle = '潮人T恤1元领';
			data._CSSLinks = ['onSale/introduce'];
			this.render('onSale/introduce.html', data);
		});
	}
}

var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect, true);
}

exports.__create = controller.__create(onSale, controlFns);