function girlfriends(){
	return this;	
}
var controlFns = {
	'upload' : function(params){
		var options = [];
		var access_token = this.readData('access_token', this.req.__get, '');
		if (access_token) {
			options.push('access_token='+access_token);
		}
		var mac = this.readData('mac', this.req.__get, '') || this.readData('app_mac', this.req.__get, '') || this.readData('app_imei', this.req.__get, '');
		if (mac) {
			options.push('mac='+mac);
		}
		var app_version = this.readData('app_version', this.req.__get, '');
		options.push('app_version='+app_version);
		var access_user = this.readData('access_user', this.req.__get, '');
		if(access_user) options.push('access_user='+access_user);
		var php = {};
		if(params == 'show') {
			php['uinfo'] = '/customactivity/CustomActivity_girlfriend_user_info';
		} else if(params == 'invite') {
			php['share'] = '/customactivity/CustomActivity_wap_share?act_name=guimizhao';
			php['uinfo'] = '/customactivity/CustomActivity_girlfriend_user_info';
		}
		var mSelf = this
		//, u = mSelf.req.headers['user-agent']
		
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			//base.var_dump(data.uinfo, false, 8);
			data.access_token = access_token;
			data.app_version = app_version;
			data.mac = mac;
			data.tokeninfo = options.join('&');
			data.pageTitle = '闺蜜活动 - 美丽说';
			data._CSSLinks = ['activity/girlfriends'];
			if(params == 'show'){
				mSelf.render('activity/girlfriends/show.html' , data);
			}else if(params == 'invite'){
				mSelf.render('activity/girlfriends/invite.html' , data);
			}else if(params == 'winners'){
				mSelf.render('activity/girlfriends/result.html' , data);
			} else {
				mSelf.render('activity/girlfriends/upload.html' , data);
			}
		});
	},
	'vote' : function(params){
		var options = [];
		var access_token = this.readData('access_token', this.req.__get,'');
		if (access_token) {
			options.push('access_token='+access_token);
		}
		var mac = this.readData('mac', this.req.__get, '') || this.readData('app_mac', this.req.__get, '') || this.readData('app_imei', this.req.__get, '');
		if (mac) {
			options.push('mac='+mac);
		}
		var app_version = this.readData('app_version', this.req.__get, '');
		options.push('app_version='+app_version);
		var access_user = this.readData('access_user', this.req.__get, '');
		if (access_user) options.push('access_user='+access_user);
		var php = {}
		, mSelf = this
		//, u = mSelf.req.headers['user-agent']
		php['uinfo'] = '/customactivity/CustomActivity_girlfriend_user_info';
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data.access_token = access_token;
			data.app_version = app_version;
			data.mac = mac;
			data.tokeninfo = options.join('&');
			data.pageTitle = '闺蜜投票 - 美丽说';
	//		base.var_dump(data.share, false, 8);
			data._CSSLinks = ['activity/girlfriends'];
			if(params == 'vote'){
				data.install = true;
				mSelf.render('activity/girlfriends/vote.html' , data);
			}else if(params == 'down'){
				mSelf.render('activity/girlfriends/vote.html' , data);
			}else if(params == 'success'){
				mSelf.render('activity/girlfriends/success.html' , data);
			}
		});
	}

};
exports.__create = controller.__create(girlfriends , controlFns);
