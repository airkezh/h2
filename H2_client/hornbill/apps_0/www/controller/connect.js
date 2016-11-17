function connect(){
	return this;
}
var controlFns = {
	'index' : function(){
		this.auth();
	},
	'auth' : function(args){
		var php = {}, mSelf = this;

		var frm = this.readData('frm',this.req.__get, '');
		var r = this.readData('r',this.req.__get, '');
		var xnc = this.readData('xnc',this.req.__get, '');
		var position = this.readData('position',this.req.__get, '');
		var content = this.readData('content',this.req.__get, '');
		var image = this.readData('image',this.req.__get, '');
		if(content != '') delete mSelf.req.__get.content;
		if(image != '') delete mSelf.req.__get.image;

		//418
		///if (['douban','baidu', 'renren',  'wangyi'].indexOf(args) > -1 ) return this.errorPage()


		var code = this.readData('code',this.req.__get, ''),
			state = this.readData('state',this.req.__get, '');
		if(args == 'baidu' || args == 'taobao'){
			var url = '/connect/auth/' + args;
		}else if ('weixin' == args){
			var url ='/connect/weixin_web'
		}else {
			var url = '/connect/auth/' + args + '?baseUrl=' + mSelf.req.headers.host;
		}
		// this.debugSnake({target : 'devlab3'});
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			//console.log('url' , url , data)
			data = data[args];
		//	if(frm != '') mSelf.req.__get.frm = frm;
			if ('weixin' == args){
				//data.redirect = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx28b165b5a629bb11&redirect_uri=http://m.meilishuo.com/wx/connectWeb&response_type=code&scope=snsapi_login'
				return this.redirectTo(data.redirect)
			}else if(data.result == true){
				if (data.err_bind && data.err_bind != 0 ) {
					delete mSelf.req.__get.state;
					delete mSelf.req.__get.code;
					mSelf.req.__get.err_bind = data.err_bind;
				};
				return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/' + data.destUrl, true);
			}else if(data.result == false && data.flag == 1){
				if(frm != '') delete mSelf.req.__get.frm;
				if(r != '') delete mSelf.req.__get.r;
				if(xnc != '') delete mSelf.req.__get.xnc;
				if (position != '') delete mSelf.req.__get.position;
				return mSelf.redirectTo(data.redirectUrl, true);
			}else{
				return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/welcome', true);
			}
		}, true);
	},
	'connect' : function(args){
		var php = {}, mSelf = this;
		var url = '/connect/connect/' + args;
		if ('weixin' == args){
			var url = '/connect/wxcall_web'
			}
		this.bridgeMuch(php);
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			delete mSelf.req.__get.baseUrl;
			delete mSelf.req.__get.code;
			delete mSelf.req.__get.state;
			delete mSelf.req.__get.openid;
			delete mSelf.req.__get.openkey;
			data = data[args];

			if(data.new_comer == 1){
				if(data.need_bind){
					return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/' + data.destUrl, true);
				}
				return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/connect/newComer/', true);
			}else{
				var destUrl = data.destUrl || 'welcome'
				return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/' + destUrl, true);
			}
		}, true);
	},
	'newComer' : function(args){
		var php = {}, mSelf = this;
		var url = '/register/register_actionconnect/' + args
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			data = data[args];
			return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/' + data, true);
		});
	},
	'fail' : function(args){
		var php = {}, mSelf = this;
		var url = '/connect/fail/' + args;
		this.listenOn(this.bridge(url) , args)();
		this.listenOver(function(data){
			data = data[args];
			data.fail = args;
			return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/welcome?fail=' + args, true);
		});
	},
	'shareToWeibo' : function(){
		this.ajaxTo('/connect/share_to_weibo');
	},
	'fanli' : function(args) {
		// this.debugSnake({'target':'xiaolongrong.rdlab'});
		var mSelf = this;
		var url = '/fanli/UnionLogin/' + args;
		this.listenOn( this.bridge(url) , args )();
		this.listenOver(function(data){
			data = data[args];
			console.dir( data );
			var redirect_url = data.data.redirect_url;
			return mSelf.redirectTo('http://' + mSelf.req.headers.host + '/' + redirect_url);
		});
	}
}
exports.__create = controller.__create(connect , controlFns);
