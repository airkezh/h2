function welcome(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var wapMod = base.loadModel('m/tools.js')
		var php = {
			'essential' : '/navigate/navigation_cover_m'
			, 'homeBanner' : '/banner/home_banner_m'
			, 'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		};
		var channel = this.readData('channel',this.req.__get, ''); 
		var frm = this.readData('frm',this.req.__get, '');
		var mSelf = this;
		var refer = this.req.headers.referer;
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
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

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;

			data.frm = frm;
		//	base.var_dump(data.homeBanner, false , 5);
			if(channel == '30930' || channel == '30931') data.isIqiyiApp = true;
			data._CSSLinks = ['welcome'];
			data.headTag = 'welcome';
			mSelf.render('welcome.html' , data);
		});
	}
}
exports.__create = controller.__create(welcome , controlFns);
