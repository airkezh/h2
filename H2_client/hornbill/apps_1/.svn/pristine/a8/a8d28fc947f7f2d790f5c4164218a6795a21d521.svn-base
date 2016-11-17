function wap_brand(){
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
			"wap_brand" : "/customactivity/CustomActivity_common_tool_single?id=wap_brand"
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.act_id = act_id;
			data.r = r;
			data.channelId = channelId;
			data.app_access_token = app_access_token;
			var isIpad = data.os.ipad;
			data.phoneType = isIpad ? 'ipad' : 'other';
			//share
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(data.wap_brand.wap_link)+'&bg='+encodeURIComponent(data.wap_brand.noclient_link)+'&bg2='+encodeURIComponent(data.wap_brand.pc_link); 
			var params = {
				'title' : {
					'weixin' : data.wap_brand.weixin_tit,
					'weixin_timeline' : data.wap_brand.weixin_tit,
					'default' : data.wap_brand.qzone_tit
				},
				'text' : {
					'weixin' : data.wap_brand.weixin_text,	
					'weixin_timeline' : data.wap_brand.weixin_text,
					'default' : data.wap_brand.qzone_text
				},
				'pic' : {
					'weixin' : data.wap_brand.weixin_pic,	
					'weixin_timeline' : data.wap_brand.weixin_pic,
					'default' : data.wap_brand.qzone_pic
				},
				'url' : shareURL
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data._CSSLinks = ["activity/wap_brand"];
			mSelf.render("activity/wap_brand.html" , data);
		});
	}

};
exports.__create = controller.__create(wap_brand , controlFns); 
