function client(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.apparel_alert = false;
			data.ad_leftPic = false;
			data._CSSLinks = ['client'];
			data.pageTitle = '专业时尚购物应用，美丽说让你购流行 - 美丽说';
			data.headTag = 'client'
			mSelf.render('client/client2.html' , data);
		});
	},
	'audio' : function(args){
		var activity_id = this.readData('activity_id',this.req.__get, 0)
		if(activity_id == 0)
			return this.redirectTo('/client/', true);

		var php = {
			'audio' : '/activity/Activity_show?activity=' + activity_id
		}
		, mSelf = this
		, u = mSelf.req.headers['user-agent']
		, isMobile = !!u.match(/Mobile/)
//		, isMobile = !!u.match(/AppleWebKit.*Mobile.*/)
//		, isIOS = !!u.match(/Mac/)
		, isIphone = !!u.match('Iphone')
		, isIpad = !!u.match('Ipad')
		, isAndroid = !!u.match('Android')

		mSelf.setDefaultData(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data.apparel_alert = false;
			data.ad_leftPic = false;
			data.pageTitle = '美丽说时尚小课堂';
			data.headTag = 'client'
			data.isMobile = isMobile;
			data.isIphone = isIphone;
			data.isIpad = isIpad;
			data.isAndroid = isAndroid;
			if(isMobile)
				data.noBasecss = true;
			data._CSSLinks = ['client/audio'];
			mSelf.render('client/return.html' , data);
		});
	},
	'sjzs' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.apparel_alert = false;
			data.ad_leftPic = false;
			data._CSSLinks = ['sjzs'];
			data.pageTitle = '专业时尚购物应用，美丽说让你购流行 - 美丽说';
			data.headTag = 'client'
			mSelf.render('sjzs.html' , data);
		});
	},
	'client-android':function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.apparel_alert = false;
			data.ad_leftPic = false;
			data._CSSLinks = ['client-android'];
			data.pageTitle = '专业时尚购物应用，美丽说让你购流行 - 美丽说';
			data.headTag = 'client'
			mSelf.render('client/client-android.html' , data);
		});
	}
}
exports.__create = controller.__create(client , controlFns);
