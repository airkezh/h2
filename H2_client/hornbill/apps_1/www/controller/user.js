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
	'login' : function(args){
		var php = {
			'logonBack' : '/user/logon_back',
			'captcha' : '/user/logon_need_captcha'
		}, mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo.user_id == 0){
				data._CSSLinks = ['login'];
				data.pageTitle = '登录 － 美丽说';
				data.headTag = 'login';
				var _or = false
				if (this.req.__get._or) {
					var appMod = base.loadModel('mls/application.js');
					_or =  appMod.unGenToken(this.req.__get._or)
					_or = _or && _or.key
				}
				data._OrginRequest = _or;

				//base.var_dump(data , false , 5);
			
				mSelf.render('user/login_new.html' , data);

			}else{
				delete mSelf.req.__get.r;
				delete mSelf.req.__get.frm;
				mSelf.req.__get.c = data.logonBack.redirect;
				return mSelf.redirectTo(config.site.MAIN_SITE_DOMAIN + '/cookie/distribute/',true);
			}
		});
	},
	'register' : function(args){
		var php = { };
		var	self = this;

		args = args || 'form';

		function listenOver(obj,cb){
			obj.setDefaultData(php);
			obj.bridgeMuch(php);
			obj.listenOver(cb);
		}

		//接口数据选择
		listenOver(self,function(data){
			if(args == 'form'){//取正常注册的接口
				php = {'registerInit' : '/register/init_register'};
			}else if (args == 'success' || args == 'step4' || args == 'step3'){//取注册完成后的步骤的接口
				if(data.userInfo.user_id == 0){
					return self.redirectTo('/welcome' ,true);	
				}
				if(args == 'step4'){
					php = {'registerRecommend' : '/register/register_follow'};
				}
				if(args == 'success'){//邮件激活相关接口
					self.req.__get.email = data.userInfo.email;
					php = {'registerSuccess' : '/register/activate_message'};
				}
			}else if(args == 'feedback') {//这个是活动相关的接口 可以去掉
				return self.redirectTo('/biz/reg_feedback/newyear/' ,true);
			}

			//页面渲染
			listenOver(self,function(data){
				data.headTag = 'register_' + args;

				if (args == 'step3' || args == 'step4'){
					data.fluid = true;
				}

				//debug 
				// if(args == 'debug'){
				// 	data.pageTitle = '注册 － 美丽说';
				// 	data._CSSLinks = ['register_new'];
				// 	self.render('register/register.html' , data);
				// }
				
				if(args == 'form' || args == 'new'){
					data.pageTitle = '注册 － 美丽说';
					data._CSSLinks = ['register_new'];
					self.render('register/register_new.html' , data);
				}else{ //这里看逻辑可能是step3，step4或success时会走
					data._CSSLinks = ['register'];
					self.render('user/register.html' , data);
				}
			});
		});

	},
	'logon' : function(){
		this.ajaxTo('/user/user_log_on');	
	},
	'logout' : function(){
		var	php = {'logout' : '/user/log_out'},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.req.__get.c = data.logout.redirect;
            mSelf.req.__get.is_delete = 1;
            return mSelf.redirectTo(config.site.MAIN_SITE_DOMAIN + '/cookie/distribute/',true);
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
	'registerActivate' : function(args){
		var mSelf = this;
		var php = {
			'registerActivate' : '/register/register_activate?activecode=' + args
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// var	url = '/user/register/step3';
			/* 优惠劵投放 春节注册活动 */
			var startTime = '2014/02/20 00:00:00'
				,endTime = '2014/03/07 00:00:00'
				,today = new Date();
			startTime = new Date(Date.parse(startTime));
			endTime = new Date(Date.parse(endTime));
			if(startTime < today && today < endTime){
				var	url = '/user/register/feedback';
			} else {
				var	url = '/user/register/step3';
			}
			if(data.registerActivate != 0 ) url = '/ihome';
			return mSelf.redirectTo(url ,true);	
		});
	},
	'activateEmail' : function(){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id || data.userInfo.level == 0)  return mSelf.redirectTo('/welcome');
			data._CSSLinks = ['register'];
			mSelf.req.__get.email = data.userInfo.email;
			data.pageTitle = '亲爱的用户，您的账号存在安全问题，动一动手指让它更安全 - 美丽说';
			mSelf.render('user/level_one.html' , data);
		});
	},
	'resetpw' : function(){
		var mSelf = this;
		var php = {
			'spam' : '/spam/spam_activate'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.spam.status){
				return mSelf.redirectTo('/settings/setPassword?frm=spam_email');	
			}else{
				return mSelf.redirectTo('/ihome');
			}
		});
	},
	'trlogin' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['login'];
			mSelf.render('user/trlogin.html' , data);
		 });
	 },
	'appeal_tb' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo.user_id)  return mSelf.redirectTo('/ihome');
			data._CSSLinks = ['appealTaobao'];
			data.pageTitle = '账号申诉';
			mSelf.render('user/appealTaobao.html' , data);
		});
	},
	'findPwd' : function(args){
		var php = {}
		var mSelf = this;
		var args = args || 'form'; //args:form|send|reset|finish
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(args == 'send_email'){
				data.email = this.readData('email',this.req.__get, '');
				data.email_host = this.readData('email_host',this.req.__get, '');
			}
			else if(args == 'send_sms'){
				data.mobile = this.readData('mobile',this.req.__get, '');
				data.nicheng = this.readData('nicheng',this.req.__get, '');
			}
			else if(args == 'reset'){
				data.validate_code = this.readData('vc',this.req.__get, '');
			}
			else if(args == 'check'){
				data.mobile = this.readData('mobile',this.req.__get, '');
				data.email = this.readData('email',this.req.__get, '');
				data.nicheng = this.readData('nicheng',this.req.__get, '');

			}

			data.headTag = 'find_pwd_' + args;
			data._CSSLinks = ['findPwd'];
			data.pageTitle = '找回密码';
			if(args == 'canvas'){
				mSelf.render('register/canvas.html' , data);
				return;
			}
			mSelf.render('user/find_password.html' , data);
		});
	},
	'find_pass' : function (args){
		this.ajaxTo('/user/find_pass_' + args);
	},
	'sendMobCode' : function(){
		//发送手机验证码
		//this.debugSnake({'target':'devlab3'});
		this.ajaxTo('/user/opensendvcode');
	},
	'bindMob' : function(){
		//绑定手机号
		this.ajaxTo('/user/openbindmobile');
	},
	/** 用户再激活 */
	'activeAccount' : function (){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			//if(data.userInfo.user_id){ return this.redirectTo('/ihome'); }
			data._CSSLinks = ['active_account'];
			data.pageTitle = '用户再激活';
			this.render('user/active_account.html' , data);
		});
	}
};
exports.__create = controller.__create(user , controlFns);
