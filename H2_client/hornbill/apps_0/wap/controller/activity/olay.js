function olay() {
	return this;
}
var controlFns = {
	mm: function(params) {
		var wapMod = base.loadModel('wap/tools.js');
		var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res));
		var mlsApp = os.mlsApp;
		var php = {
			'mobUserInfo': '/customactivity/CustomActivity_wap_user_info',
			'praisenum': '/praise/get_Mocklist?act_code=brand_oppo&content_id=14873&password=praise_limit&item_id=99882&project_id=3&season_id=2',
			'connect_weixin': '/connect/weixin?type=1'
				// 'myInfo' : 'vip::/vip/GetTimeMachine'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '女神的选择  Olay大红瓶免费抢 ';
			data.use_rem_screen = true;
			data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
			var praiselist = {};
			var likenum = '';
			praiselist = data.praisenum.data.praise_list;
			for (x in praiselist) {
				data.likenum = praiselist[x].total_like;
			}
			var weixinBrowser = data.os.weixinBrowser;
			if (weixinBrowser) {
				connectWX(this, data);
			};
			data.content = '';
			data.friend_title = '';
			data.group_title = '';
			data.icon = 'http://d01.res.meilishuo.net/pic/_o/f7/96/0c14bdb64114ba8c9b06eaa96b45_500_680.ch.jpg';
			data.image = 'http://d01.res.meilishuo.net/pic/_o/f7/96/0c14bdb64114ba8c9b06eaa96b45_500_680.ch.jpg';
			var shareparams = {
				'title': {
					'weixin': data.friend_title,
					'weixin_timeline': data.group_title
				},
				'text': data.content,
				'pic': data.image || data.icon,
				'url': 'http://www.baidu.com'
			};

			if (wapMod.isNewest(this.req, '6.6.0') && data.image) {
				data.appShare = true;
				data.shareparams = shareparams;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(this.req, shareparams, ['weixin_timeline', 'weixin']);
			}
			data._CSSLinks = ['activity/olay'];
			mSelf.render('activity/olay.html', data);
		});
	},
	'olay_yuyue': function() {
		var yygz=this.req.__get.yygz;
		var php = {};
		this.bindDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data) {
			data.use_rem_screen = true;
			data.gz=yygz;
			data.pageTitle = 'Olay,加班少一点,年轻多一点!';
			data._CSSLinks = ["activity/olay_yuyue"];
			this.render('activity/olay_yuyue.html', data);
		})
	},
	'olay_yuyue_success': function() {
		var php = {};
		this.bindDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data) {
			data.use_rem_screen = true;
			data.pageTitle = 'Olay,加班少一点,年轻多一点!';
			data._CSSLinks = ["activity/olay_yuyue"];
			this.render('activity/olay_yuyue_success.html', data);
		})
	}
}
var connectWX = function(mSelf, data) {
	if (data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect, true);
}
exports.__create = controller.__create(olay, controlFns);