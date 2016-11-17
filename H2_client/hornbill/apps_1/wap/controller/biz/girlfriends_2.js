function girlfriends_2(){
	return this;
}
var controlFns = {
	'page' : function(params){
		var mSelf = this;
		var access_token = this.readData('app_access_token' ,this.res.__get ,'');
		var app_version = this.readData('app_version' ,this.res.__get ,'');
		var r = this.readData('r' ,this.res.__get ,'');
		var php = {
			'pageSettings' : '/customactivity/CustomActivity_common_tool_single?id=girlfriends_2'
		};
		var cid = this.readData('cid', this.req.__get, 0);
		if(params != 'welcome'){
			var order = this.readData('order' ,this.res.__get ,0);
			php['candidate_info'] = '/customactivity/CustomActivity_wap_share_photo_user_info?id=girlfriends_2&cid='+cid+'&access_token='+access_token+'&r='+r;
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(params == 'myPic' && !data.candidate_info){return this.errorPage();}
			data.cid = cid;
			data.id = 'girlfriends_2';
			data.r = r;
			data.access_token = access_token || data.accessToken;
			data.app_version = app_version || data.appVersion;
			data.goAppWelcome = false;

			if(params == 'welcome'){
				data._CSSLinks = ['biz/girlfriends_2/welcome'];
				mSelf.render('biz/girlfriends_2/welcome.html' , data);
			} else {
				data.order = order;
				data.headTag = params;
				data._CSSLinks = ['biz/girlfriends_2/page'];
				mSelf.render('biz/girlfriends_2/page.html' , data);
			}
		});
	},
	'vote' : function(params){
		var mSelf = this;
		var cid = this.readData('cid', this.req.__get, 0);
		var access_user = this.readData('access_user', this.req.__get, '');
		var app_version = this.readData('app_version' ,this.res.__get ,'');
		var access_token = this.readData('app_access_token' ,this.res.__get ,'');
		var r = this.readData('r' ,this.res.__get ,'');
		var php = {
			'pageSettings' : '/customactivity/CustomActivity_common_tool_single?id=girlfriends_2',
			'candidate_info' : '/customactivity/CustomActivity_wap_share_photo_user_info?id=girlfriends_2&cid='+cid+'&access_user='+access_user+'&r='+r
		};

		var wap_link = 'http://m.meilishuo.com/biz/girlfriends_2/vote/vote?cid='+cid+'&access_user='+access_user;
		php['shareURL'] = '/url/shorturl?url='+encodeURIComponent(wap_link);
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.gotoLead = 'gotoOpenLead'
			data.cid = cid;
			data.id = 'girlfriends_2';
			data.access_token = access_token || data.accessToken;;
			data.app_version = app_version || data.appVersion;
			data.r = r;
			data.goAppWelcome = false;

			var _share = data.pageSettings.share;
			if(params == 'invite' && _share){
				
				var pic = data.candidate_info.data.pic_url;
				var pic_weixin = data.candidate_info.data.pic_url_200;
				var share_data = {
					'title' : _share.title,
					'text' : _share.text,
					'pic' : {
						'default' : pic
					},
					'url' : data.shareURL.url
				};
				if (pic_weixin){
					share_data.pic.weixin = pic_weixin
					share_data.pic.weixin_timeline = pic_weixin
				}
				var shares = wapMod.shareTo(mSelf.req , share_data);
				data.share = shares;
			}
			data._CSSLinks = ['biz/girlfriends_2/vote'];
			data.pageTag = params;
			mSelf.render('biz/girlfriends_2/vote.html' , data);
		});
	}
};
exports.__create = controller.__create(girlfriends_2 , controlFns);
