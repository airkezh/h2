function fwindow(){
	return this;
}
var controlFns = {
	'index' : function(){
		this.fuider_special();
	},
	fuider : function(){
		var php = {};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');

			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data._CSSLinks = ['activity/fanchor'];
			mSelf.render('activity/project/fanchor.html', data);
		});
	},
	fuider_special : function (){
		var code = this.req.__get.code || 'fuider_wap_special';
		var cid = this.readData('cid',this.req.__get, '');
		var php = {
			'special_data' : '/customactivity/CustomActivity_common_tool_singleNew?id='+code
		};
		delete this.req.__get.header;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
			if (!data.special_data) return this.errorPage();
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/fwindow/fuider_special/?id='+ code +'&cid='+ cid)+'&bg='+encodeURIComponent('/activity/fwindow/fuider_special/?id='+ code +'&cid='+ cid)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/');
			//wap page share
			data.CONFIG_SHARE = data.special_data.share;
			var params = {
				'title' : data.CONFIG_SHARE.title,
				'text' :  data.CONFIG_SHARE.text,
				'pic' : data.CONFIG_SHARE.src,
				'url' : shareURL,
			};
			var shares = wapMod.shareTo(this.req , params);
			data.share = shares;
			data.supportShare = wapMod.supportShare(this.req);
			data.pageTitle = '精彩专题 - 美丽说';
			data.meta_description = data.CONFIG_SHARE.text;
			data._CSSLinks = ['activity/fuider_special'];
			this.render('activity/project/fuider_special.html' , data);
		});
	},
	fuider_specials : function (){
		//专题分类id
		var classifyId = this.readData( 'classify_id', this.req.__get, false ),
			type = this.readData( 'type', this.req.__get, 1 ),
			code = '';

		if ( classifyId ) {
			code = 'ac_id=' + classifyId + '&type=' + type
		} else {
			code = 'type=' + type
		}

		var php = {
			'specials_data': '/activity/Activity_feed?' + code
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if (!data.specials_data) return this.errorPage();
			data.isSecondPage = classifyId === false ? false : true;
			data.type = type
			data.pageTitle = '往期回顾';
			data._CSSLinks = ['activity/fuider_specials'];
			this.render('activity/project/fuider_specials.html' , data);
		});
	},
	dapei : function (){
		var code = this.req.__get.code || 'dapei_wap_special';
		var cid = this.readData('cid',this.req.__get, '');
		var php = {
			'special_data' : '/customactivity/CustomActivity_common_tool_singleNew?id='+code
			},
			mSelf = this;
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		mSelf.listenOver(function (data){
			if (!data.special_data) return this.errorPage();
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/fwindow/dapei/?id='+ code +'&cid='+ cid)+'&bg='+encodeURIComponent('/activity/fwindow/dapei/?id='+ code +'&cid='+ cid)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/')
			//wap page share
			data.CONFIG_SHARE = data.special_data.share;
			var params = {
				'title' : data.CONFIG_SHARE.title,
				'text' :  data.CONFIG_SHARE.text,
				'pic' : data.CONFIG_SHARE.src,
				'url' : shareURL,
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data.supportShare = wapMod.supportShare(mSelf.req);
			data.pageTitle = '美丽说';
			data.meta_description = data.CONFIG_SHARE.text;
			data._CSSLinks = ['activity/fuider_special'];
			mSelf.render('activity/project/fuider_special.html' , data);
		});
	}

};
exports.__create = controller.__create(fwindow , controlFns);

