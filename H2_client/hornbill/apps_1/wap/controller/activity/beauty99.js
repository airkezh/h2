function beauty99(){
	return this;	
}
var controlFns = {
	hot : function(cid){
		var mSelf = this;	
		var act_id = this.readData('cid' , this.req.__get , '1');
		var r = this.readData('r' , this.req.__get , '');
		var channelId = this.readData('channelId' , this.req.__get , '');
		var app_access_token = this.readData('app_access_token' , this.req.__get , '');
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			"beauty99" : "/customactivity/CustomActivity_common_tool_single?id=beauty99",
			"wake" : "/customactivity/CustomActivity_wap_user_mark?act_name=beauty99"
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var isLogin = false;
			data.userInfo.data.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data.act_id = act_id;
			data.r = r;
			data.channelId = channelId;
			data.app_access_token = app_access_token;
			var isIpad = data.os.ipad;
			data.phoneType = isIpad ? 'ipad' : 'other';
			//share
			var shareURL = 'http://mlab2.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(data.beauty99.wap_link)+'&bg='+encodeURIComponent(data.beauty99.noclient_link)+'&bg2='+encodeURIComponent(data.beauty99.pc_link); 
			var params = {
				'title' : {
					'weixin' : data.beauty99.weixin_tit,
					'weixin_timeline' : data.beauty99.weixin_tit,
					'default' : data.beauty99.qzone_tit
				},
				'text' : {
					'weixin' : data.beauty99.weixin_text,	
					'weixin_timeline' : data.beauty99.weixin_text,
					'default' : data.beauty99.qzone_text
				},
				'pic' : {
					'weixin' : data.beauty99.weixin_pic,	
					'weixin_timeline' : data.beauty99.weixin_pic,
					'default' : data.beauty99.qzone_pic
				},
				'url' : shareURL
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data._CSSLinks = ["activity/beauty99"];
			mSelf.render("activity/beauty99.html" , data);
		});
	}

};
exports.__create = controller.__create(beauty99 , controlFns); 
