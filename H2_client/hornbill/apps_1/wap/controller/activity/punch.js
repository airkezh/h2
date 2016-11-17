function punch(){
		return this;
}
var controlFns = {
	sign : function(){
		var mSelf = this;
		// var access_token = '159fd342863550ce5ec5769160e9fdd4';
		var php = {
			'punch_check' : '/customactivity/CustomActivity_wap_user_check_punch',
			'punch_userInfo':'/customactivity/CustomActivity_wap_user_punch_num',
			'punch_work' :'/customactivity/CustomActivity_common_tool_single?id=punch'
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.punch_userInfo){
				data.user_name = '';
				data.punch_num = 0;
				data.access_token = '';
			}else {
				data.user_name = data.punch_userInfo.data.user_name;
				data.punch_num = data.punch_userInfo.data.num;
				data.access_token = data.accessToken;
			}
			if(!data.user_name){
				data.punch_msg = {
					'msg': '登录签到'
				};
			} else{
				data.isLogin = true;
				if(data.punch_check.data == 0){
					data.punch_msg = {
						'msg': '签一下'
					};
				} else {
					data.punch_msg = {
						'msg': '已签到'
					};
					data.isPunch = true;
				}
				data.prev_width = (38+564*data.punch_num/7)/6.40 + '%';
			}

			if (data.punch_work && data.punch_work.share) {
				var punchShare = data.punch_work.share
				var shareURL = 'http://'+punchShare.net_en+'.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(punchShare.wap_link)+'&bg='+encodeURIComponent(punchShare.noclient_link)+'&bg2='+encodeURIComponent(punchShare.pc_link)
				var params = {
					'title' : punchShare.title,
					'text' : punchShare.text,
					'pic' : {
						'default' : punchShare.pic
					},
					'url' : shareURL
				};
				if (punchShare.pic_weixin){
					params.pic.weixin = punchShare.pic_weixin
					params.pic.weixin_timeline = punchShare.pic_weixin
					}
				var shares = wapMod.shareTo(mSelf.req , params);
				data.share = shares;
			}

			data._CSSLinks = ['activity/punch'];
			mSelf.render('activity/punch.html' , data);
		});
	}
};
exports.__create = controller.__create(punch , controlFns);
