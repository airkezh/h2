function appWelcome(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var wapMod = base.loadModel('wap/tools.js')
		var channel = wapMod.getChnlMark(this.req ,this.res)
		var php = {
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		}
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		var mSelf = this;
		var refer = this.req.headers.referer;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src
				
				else 
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}
			data.refer = '/welcome';//refer;
			data._CSSLinks = ['welcome'];
			data.headTag = 'appWelcome';
			mSelf.render('appWelcome.html' , data);
		});
	},
	'test' : function(){
		var php = {}
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['welcome'];
			data.headTag = 'appWelcome';
			mSelf.render('appWelcome1.html' , data);
		});
	}
}
exports.__create = controller.__create(appWelcome , controlFns);
