function summer_match(){
	return this;	
}
var controlFns = {
	match : function(){
		var mSelf = this;	
		var ac_id = this.readData('ac_id' , this.req.__get , '1');
		var access_token = this.readData('access_token' , this.req.__get , '');
		var download = this.readData('download' , this.req.__get , '');
		var php = {
			'top_banner' : '/Wapactivity/Activity_banner?ac_id='+ac_id,
			//'summer_goods' : '/Wapactivity/Activity_goods?ac_id='+ac_id,
			'summer_goods' : '/Wapactivity/Activity_goods?ac_id='+ac_id + '&frame=0',
			'act_ads' : '/Wapactivity/Activity_ads?ac_id='+ac_id,
			'shareApi' : '/Wapactivity/activity_words?ac_id='+ac_id
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.ac_id = ac_id;
			data.download = download;
			data.access_token = access_token;
			//var isAndroid = data.os.android
			//var isIphone = data.os.iphone
			var isIpad = data.os.ipad
			//data.phoneType = isAndroid ? 'android' : (isIphone ? 'iphone' : (isIpad ? 'ipad' : ''));
			data.phoneType = isIpad ? 'ipad' : 'other';
			if(data.top_banner.ac_template == 1){
				data.actTpl = 'activity/sale/summer_match_drag.html';
			}else if(data.top_banner.ac_template == 2){
				data.actTpl = 'activity/sale/summer_match_drag2.html';
			}else{
				return this.errorPage();	
			}
			//share
			var shares = false
			if (data.shareApi) {
				var params = {
					'title' : {
						'weixin' : data.shareApi.weixin_title,
						'weixin_timeline' : data.shareApi.weixin_title,
						'default' : data.shareApi.weixin_title
					},
					'text' : {
						'weixin' : data.shareApi.weixin_words,
						'weixin_timeline' : data.shareApi.weixin_words,
						'default' : data.shareApi.weibo_words
					},
					'pic' : {
						'weixin' : data.shareApi.weixin_picture,
						'weixin_timeline' : data.shareApi.weixin_picture,
						'default' : data.shareApi.weibo_picture
					},
					// 郭昶3.5 'url' : data.shareApi.link
					'url' : 'http://m.meilishuo.com/activity/summer_match/match/?ac_id='+ ac_id
					
				};
				var shares = wapMod.shareTo(mSelf.req , params);
			}
			data.share = shares;
			data._CSSLinks = ["activity/summer_match"];
			mSelf.render("activity/sale/act_basic.html" , data);
		});
	}

};
exports.__create = controller.__create(summer_match , controlFns); 
