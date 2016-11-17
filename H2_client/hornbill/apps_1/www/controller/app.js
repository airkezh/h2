function app(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		if(args == 'summer') this.summer();
		else if(args == '360dev') this['360dev']();
	},
	'summer' : function(args){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['app/summer'];
			data.pageTitle = '美丽说 360桌面应用——酷夏搭配';
			data.headTag = 'summer';
			mSelf.render('app/summer.html' , data);
		});
	},
	'getPoster' : function(){
		this.ajaxTo('/app360/app360_poster');	
	},
	'360dev' : function(args){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.noBasecss = 1;
			data._CSSLinks = ['app/360dev'];
			data.pageTitle = '美丽说 360浏览器插件';
			if(args == 'boyfail'){
				data.headTag = 'fail';
				mSelf.render('app/360dev/boyfail.html' , data);
			}else if(args == 'success'){
				data.headTag = 'success';
				mSelf.render('app/360dev/success.html' , data);
			}else{
				data.headTag = 'connect';
				mSelf.render('app/360dev/login.html' , data);
			}
		});
	},
	'360' : function(args){
		var php = {
			'notice' : '/msg/getmsg360',
			'login' : '/user/check_user_360',
			'redirect' : '/user/redirect_360',
			'relogin' : '/user/log_on_360',
			'log_on' : '/user/log_on_360'
		};
		var mSelf = this;
		if(args == 'redirect'){
			var username = encodeURIComponent(this.req.__get.username),
				password = this.req.__get.password,
				redirecturl = this.req.__get.redirecturl;
			this.listenOn(this.bridge(php[args]) , args)();
			this.listenOver(function(data){
				data = data.redirect;
				if (data.status == 1){ 
					data = {
						'result' : {
							'code' : 200,
							'msg' : '成功',
							'url' : 'http://www.meilishuo.com/app/360/relogin?username=' + username + '&token=' + password + '&redirecturl=' + redirecturl
						}
					}
				}else if(data.status == -2){
					data = {
						'result' : {
							'code' : 401,
							'msg' : '该用户正在审核中',
							'url' : 'http://www.meilishuo.com/app/360/relogin?username=' + username + '&token=' + password + '&redirecturl=' + redirecturl
						}
					}
				}else if(data.status == -1){
					data = {
						'result' : {
							'code' : 403,
							'msg' : '用户名或密码不正确',
							'url' : 'http://www.meilishuo.com/app/360/relogin?username=' + username + '&token=' + password + '&redirecturl=' + redirecturl
						}
					}
				}
				mSelf.res.end(JSON.stringify(data))	
			}, true);
		}else if(args == 'relogin'){
			var redirecturl = this.req.__get.redirecturl;
			this.listenOn(this.bridge(php[args]) , args)();
			this.listenOver(function(data){
				data = data.relogin;
				if(data.status == 1){
					return mSelf.redirectTo(redirecturl ,true);
				}
			}, true);
		}else{
			this.ajaxTo(php[args]);
		}
	},
	'qqsale' : function(param) {
		var mSelf = this;
		var php = {
			'todayList' : '/qzone/today_list',
			'fans' : '/qzone/userinfo'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['app/qqsale'];
			data.pageTitle = '美丽说QQ空间站内应用';
			mSelf.render('app/qq/sale_everyday.html' , data);	
		});
	},
	'trunk_sale' : function(){
		var mSelf = this;
		var type = this.readData('type',this.req.__get, '');
		//var frame = this.readData('frame',this.req.__get, 0);
		var php = {};
		if (type == 1){
			php['saleList'] = '/qzone/specialoffer_list';
		}else if(type == 0){
			php['todayList'] = '/qzone/today_list';
			php['fans'] = '/qzone/userinfo';
		}

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (type == 1) {
				//data.frame = frame;
				mSelf.render('app/qq/limit_sale.html' , data);	
			} else if(type == 0) {
				mSelf.render('app/qq/select_sale.html' , data);	
			}
		});

	}
}
exports.__create = controller.__create(app , controlFns);
