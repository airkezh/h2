function user(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		if(args == 'register') this.register();
		else if(args == 'logout') this.logout();
		else if(args == 'findPwd') this.findPwd();
		else this.login();
	},
	'login' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo.user_id == 0){
				data._CSSLinks = ['login'];
				data.pageTitle = '登录 － 美丽说';
				data.headTag = 'login';
				mSelf.render('user/login.html' , data);
			}else{
				delete mSelf.req.__get.r;
				delete mSelf.req.__get.frm;
				return mSelf.redirectTo('/guang/hot' ,true);	
			}
		});
	},
	'logon' : function(){
		this.ajaxTo('/user/log_on');	
	},
	'logout' : function(){
		var	php = {'logout' : '/user/log_out'},
			mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			return mSelf.redirectTo('/' + data.logout.redirect ,true);	
		});
	},
	'register' : function(args){
		var args = args || 'form'
			, php = {}
			, mSelf = this;

		if(args == 'form')
			php = {'registerInit' : '/register/init_register'};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if (args == 'success'){
		//		if(data.userInfo.user_id === 0)
					return mSelf.redirectTo('/welcome' ,true);	
		//		}
			}

			data.headTag = 'register_' + args;
			
			data._CSSLinks = ['register'];
			mSelf.render('user/register.html' , data);
				
		});
	},
	'reg' : function(args){
		var mSelf = this;
		if ('action' == args && !this.isTokenLive( 10 )){
			console.log('reg token fail')
			return this.res.end('{"status":-21}')
			}
		this.ajaxTo('/register/register_' + args);	
	},

	'findPwd' : function(args){
		var php = {}
		var mSelf = this;
		var args = args || 'form'; //args:form|send|reset|finish
		//#9510
		var wapMod = base.loadModel('wap/tools.js');
		var os = wapMod.uaos(this.req);
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mobile = this.readData('mobile',this.req.__get, ''); 
		this.listenOver(function(data){
			data.mobile = mobile;
			if(args == 'send_sms'){
				data.mobile = this.readData('mobile',this.req.__get, '');
			}
			else if(args == 'reset'){
				data.validate_code = this.readData('vc',this.req.__get, '');
			}
			data.isNewest = wapMod.isNewest(mSelf.req , data.os.android ? '3.7.5' : '4.1.0');
			//console.log(data.isNewest)
			data.runInApp = data.appVersion && data.accessToken 
			data.headTag = 'find_pwd_' + args;
			data._CSSLinks = ['findPwd'];
			data.pageTitle = '找回密码';
			mSelf.render('user/find_password.html' , data);
		});
	},
	'find_pass' : function (args){
		this.ajaxTo('/user/find_pass_' + args);
	}
}
exports.__create = controller.__create(user , controlFns);
