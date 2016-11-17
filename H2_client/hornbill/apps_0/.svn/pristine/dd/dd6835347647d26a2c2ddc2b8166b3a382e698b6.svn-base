function marioaward(){
	return this;
}
var controlFns = {
	award : function(params){
		var php = {}
		, mSelf = this
		, u = mSelf.req.headers['user-agent']
		, isIphone = !!u.match('iPhone')
		, isAndroid = !!u.match('Android')

		var app_version = this.readData('app_version',this.req.__get, '')
			, app_mac = this.readData('app_mac',this.req.__get, '') 

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isIphone = isIphone;
			data.isAndroid = isAndroid;
			data.app_mac = app_mac;
			data.pageTitle = '微信领奖活动 - 美丽说';
			data._CSSLinks = ['activity/marioaward'];
			if(params == 'userinfo'){
				if(isIphone && app_version != '3.0.3')
					mSelf.redirectTo('/download/iphone/')
				else if(isAndroid && app_version !='3.7.3')
					mSelf.redirectTo('/goto/download/?apk=/u/EIJ3W3')
				else
					mSelf.render('activity/marioaward/userinfo.html' , data);
			}else if(params == 'success'){
				data.success = true;
				mSelf.render('activity/marioaward/success.html' , data);
			}else if(params == 'fail'){
				data.success = false;
				mSelf.render('activity/marioaward/success.html' , data);
			}else if(params == 'goClient'){
				mSelf.render('activity/marioaward/android_client.html' , data);
			}else{
				mSelf.render('activity/marioaward/award.html' , data);
			}
		});
	},
	'set' : function(args){
		var php = {
			'submit' : '/customactivity/CustomActivity_weixin_release'
		};
		this.ajaxTo(php[args]);
	}
}
exports.__create = controller.__create(marioaward , controlFns);
