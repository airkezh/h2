var cookie = require(config.path.base + 'cookie.js')
var apis = {
	'init':'passport::/passport/init'
	, 'login':'passport::/passport/login'
	, 'logout':'passport::/passport/logout'
	, 'riskreactive':'/user/reactive'
	, 'riskpic':'/risk/Captcha_pic_validate'
	//, 'riskpic':'/risk/Captcha_picvalidate'
	, 'risksms':'/risk/Captcha_sms_pc_validate'
	, 'sendsms':'/risk/Captcha_sms_pc'
}

function user(){
	return this;	
}
var controlFns = {
	'aw' : function(params){
		this.ajaxTo(apis[params])
	},
	'cookies' : function(){
		var mSelf = this
		var cookieHandle = cookie.getHandler(mSelf.req , mSelf.res);

//		console.log(mSelf.req.__get)

//		var cookies = 

		cookieHandle.set('a', '333', false, true)
		mSelf.res.end()

	},
	/*
	'reactive' : function(args){
		var php = {}
			, mSelf = this

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '用户再激活';
			data._CSSLinks = ['reactive'];

			this.render('passport/reactive.html' , data);
		})
	},
	*/
	'blank' : function(args){
		var php = {res:apis[args]}
			, mSelf = this;

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '登录 － 美丽说';
			data.headTag = 'login';

			data.jcstatic = mSelf.req.__get['jcstatic']

			data.bridge_type = mSelf.req.__get['bridge_type']
			data.bridge_src =  mSelf.req.__get['bridge_src']
			data.action = mSelf.req.__get['action']

			data.bridge_params = 'action=' + data.action + '&res=' + encodeURIComponent(JSON.stringify(data.res)) 

			mSelf.render('passport/blank.html', data);
		})
	}
};


exports.__create = controller.__create(user , controlFns);
