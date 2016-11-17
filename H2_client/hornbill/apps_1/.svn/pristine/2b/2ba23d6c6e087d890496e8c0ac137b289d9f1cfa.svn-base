function im(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		return this.redirectTo(config.site.IM_ULR + 'www/' , true)
		var toid = this.req.__get.toid || 0

		var php = {
			'service' : '/share/service_guarantee?src=share'
		}
		var mSelf = this

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(/MLS-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-IMclient'
/*
				if(data.userInfo.user_id == 0)
					return mSelf.redirectTo('/im/login' ,true);	
					*/
			}

			data.host = 'http://' + mSelf.req.headers.host
			data.isH5 = true
			data.toid = toid
			delete mSelf.req.__get.toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			data.headTag = 'im';

			if(args)
				data.isLoad = true

			mSelf.render('im/im.html' , data);
		});
	},

	'login' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'im';

			if(data.userInfo.user_id == 0){
				data._CSSLinks = ['im/login'];
				data.pageTitle = '登录 － 美丽说';
				data.headTag = 'login';
				mSelf.render('im/login.html' , data);
			}else{
				delete mSelf.req.__get.r;
				delete mSelf.req.__get.frm;
				return mSelf.redirectTo('/im/' ,true);	
			}
		});
	},
};

exports.__create = controller.__create(im , controlFns);
