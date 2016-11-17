function semDownload(){
	return this;
}
var controlFns = {
	sem : function(){
		var wapMod = base.loadModel('wap/tools.js')
			, channel = wapMod.getChnlMark(this.req ,this.res)
			, refer = this.req.headers.referer
			, weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger')

		var php = {
			'dataInfo' : '/customactivity/CustomActivity_common_tool_single?id=semDownloadNew',
			'apks' : '/url/Package_get'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//download app

			if (weixinBrowser != -1) { 
				data.appUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo&g_f=992263'
			} else if (data.os.iphone || data.os.ipad){
				data.appUrl =  'https://itunes.apple.com/cn/app/id431023686?mt=8'
			} else {
				if (!channel || (data.apks && !data.apks[channel]) ) channel = 'web'
				if (data.apks && data.apks[channel] && data.apks[channel].src) 
					data.appUrl = data.apks[channel].src
				
				else 
					data.appUrl = 'http://apk.meilishuo.com/Meilishuo-0523/Meilishuo_baiduApp1_30900.apk'
			}

			data.refer = refer;

			data.pageTitle = data.dataInfo.title ? data.dataInfo.title : 'SEM品牌下载';
			data._CSSLinks = ['activity/semDownload'];
			this.render('activity/semDownload.html' , data);
		});
	}
}
exports.__create = controller.__create(semDownload , controlFns);
