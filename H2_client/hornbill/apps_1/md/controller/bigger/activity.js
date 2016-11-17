function activity(){
	return this;
}
var controlFns = {
	'rank_tab' : function(){
		var mSelf = this
		    , php = {
		    	'bg_rank' : 'midian::/bigger/get_top'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '逼格榜';
			data._CSSLinks = ['md/bigger'];
			if (check_login(mSelf, php, data)) {
				mSelf.render('bigger/rank_tab.html', data);
			}
		});
	},
	'my_list' : function(){
		var mSelf = this
		    , php = {
		    	'bg_my_list' : 'midian::/bigger/get_list'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '测试结果';
			data._CSSLinks = ['md/bigger'];
			if (check_login(mSelf, php, data)) {
				mSelf.render('bigger/my_list.html', data);
			}
		});
	},
	'test' : function(){
		var mSelf = this
		    , php = {
		    	'bg_user' : 'midian::/auth/current_user'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			// 检查登录，否则图片需要上传两次
			if (data.bg_user && data.bg_user.data && data.bg_user.data.user_id == 0) {
				go_to_auth(mSelf, 'base')
				return;
			}

			data.pageTitle = '逼格测试';
			data._CSSLinks = ['md/bigger'];
			mSelf.render('bigger/test.html', data);
		});
	},
	'result' : function(){
		var mSelf = this
		    , php = {
		    	'bg_detail' : 'midian::/bigger/get_detail',
		    	'bg_comments' : 'midian::/bigger_comment/get_list',
		    	'bg_user' : 'midian::/auth/current_user'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '逼格测试';
			data._CSSLinks = ['md/bigger'];
			mSelf.render('bigger/result.html', data);
		});
	},
	'mark' : function(){
		var mSelf = this
		    , php = {
		    	'bg_mark' : 'midian::/bigger_comment/get_example',
		    	'bg_remind' : 'midian::/bigger/get_detail',
				'bg_user' : 'midian::/auth/current_user'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// 检查登陆
			if (data.bg_user && data.bg_user.data && data.bg_user.data.user_id == 0) {
				go_to_auth(mSelf, 'base')
				return;
			}

			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '留一手';
			data._CSSLinks = ['md/bigger'];
			mSelf.render('bigger/mark.html', data);
		});
	},
	'remind' : function(){
		var mSelf = this
		    , php = {
		    	'bg_remind' : 'midian::/bigger/get_detail'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '预览';
			data._CSSLinks = ['md/bigger'];
			mSelf.render('bigger/remind.html', data);
		});
	},
	'retest' : function(){
		var mSelf = this
		    , php = {
		    	'bg_retest' : 'midian::/bigger/get_detail'
		    }

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//base.var_dump(data.goods_detail, false , 5);
			data.pageTitle = '我也要测试';
			data._CSSLinks = ['md/bigger'];
			mSelf.render('bigger/retest.html', data);
		});
	}
}

var go_to_auth = function(mSelf, scope) {
	var url = 'http://' + mSelf.req.headers.host + mSelf.req.url
	mSelf.redirectTo('/auth/connect?type=weixin&scope=' + scope + '&callback_uri=' + encodeURIComponent(url))
}

var check_login = function(mSelf, php, data) {
	for (key in php) {
		if (data[key] && data[key].code == 40102) {
			go_to_auth(mSelf, 'base')
			return false;
		}
	};

	return true;
}

exports.__create = controller.__create(activity, controlFns);

























