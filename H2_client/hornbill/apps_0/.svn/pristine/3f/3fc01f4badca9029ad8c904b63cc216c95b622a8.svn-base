function timeMachine(){
	return this;
}
var controlFns = {
	mm : function(params){
		// var mlsApp = os.mlsApp;
		// var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			'mobUserInfo': '/customactivity/CustomActivity_wap_user_info',
			'myInfo' : 'vip::/vip/GetTimeMachine'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '时光机';
			data.use_rem_screen = true;
			data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
		// data.myInfo.data = [];
		// console.log(JSON.stringify(data.myInfo))
			if(data.isLogin && data.myInfo.data.weixin){
				data.share_title = data.myInfo.data.weixin.title;
				data.share_text = data.myInfo.data.weixin.content;
			}else{
				data.share_title = '潜力女神';
				data.share_text = '爱美之路，现在启程还不晚！';
			}
			data.share_pic = 'http://d05.res.meilishuo.net/pic/_o/a4/74/94862503ddb66627e4a4e72e7419_100_100.cg.jpg';
			data.share_url = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/timeMachine/mm/?frm=wx') + '&bg='+ encodeURIComponent('/activity/timeMachine/mm/?frm=wx');
			var params = {
				'title': {
					'weixin' : data.share_title,
					'weixin_timeline' : data.share_text
				},
				'text': data.share_text,
				'pic': data.share_pic,
				'url': data.share_url
			};
			data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
		// console.log(JSON.stringify(params));
			data._CSSLinks = ['activity/timeMachine'];
			mSelf.render('activity/timeMachine.html' , data);
		});
	}
}
exports.__create = controller.__create(timeMachine , controlFns);
