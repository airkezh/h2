function debug(){
	return this;
}

var controlFns = {
	'index' : function(args){
		args = (args in controlFns) ? args  : 'home'
		this[args]()
	},
	'bigger_detail' : function(args) {
		var mSelf = this, php = {
			'bigger' : 'midian::/bigger/get_detail'
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (check_login(mSelf, php, data)) {
				mSelf.render('debug/bigger_detail.html', data)
			}
		});
	}
}

var check_login = function(mSelf, php, data) {
	for (key in php) {
		if (data[key] && data[key].code == 40102 && !mSelf.req.__get.is_callback) {
			var url = 'http://' + mSelf.req.headers.host + mSelf.req.url
			if (url.indexOf('?') >= 0)
				url += '&is_callback=1'
			else
				url += '?is_callback=1'
			mSelf.redirectTo('/auth/connect?type=weixin&callback_uri=' + encodeURIComponent(url))
			return false;
		}
	};

	return true;
}

exports.__create = controller.__create(debug , controlFns);