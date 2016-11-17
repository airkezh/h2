exports.bind = function(php){
	if (!php) {
		console.log('php not assign ' + this.req.url)
		return
	}
	 var wapMod = base.loadModel('wap/tools.js');
	 var mSelf = this;
	 php.userInfo = '/user/headinfo';
	 php.xr = '/statistics/referer?__get_r=1';
	 php.log = '/customactivity/log'
	 php.pro_spec_banner = '/customactivity/CustomActivity_common_tool_single?id=promote_banner&$';

	 /*入口风控*/
	 php.urlRiskControl = '/risk/risk_common_check_url'
	 this.listenOn(function(evt){
			 var app_token = wapMod.getMlsAppVersion(mSelf.req )
			 return evt(wapMod.uaos(mSelf.req , !!app_token))
			 },'os')();

	 var appMod = base.loadModel('mls/application.js');
	 this.listenOn(function(evt){
			 appMod.getGlobalKey(mSelf.req ,mSelf.res);
			 var access_token =wapMod.getMobToken(mSelf.req ,mSelf.res);
			 return evt(access_token);
			 },'accessToken')();
	 this.listenOn(function(evt){
			 appMod.getGlobalKey(mSelf.req ,mSelf.res);
			 var access_version =wapMod.getMobVersion(mSelf.req ,mSelf.res);
			 return evt(access_version);
			 },'appVersion')();
	// #8945
	 this.listenOn(function(evt){
			 var r = wapMod.getParamR(mSelf.req ,mSelf.res);
			 wapMod.setRMark(mSelf.req, mSelf.res, r)
			 return evt(r);
			 },'r')();

	 this.listenOn(function(evt){
			 var frm = wapMod.getChnlMark(mSelf.req ,mSelf.res);
			 return evt(frm);
			 },'_channel')();

	this.listenOn(function(evt){
		appMod.getGlobalKey(mSelf.req ,mSelf.res);
		var token = appMod.genToken('this.req.headers.clientIp');
		return evt(token);
		},'nToken')();

	this.listenOn(function(evt){
		// var url = require('url')
		// var pathname = url.parse(mSelf.req.url).pathname || '/'
		// if(pathname==='/'){
		// 	if(config.etc.hostDafault){
		// 		pathname += config.etc.hostDafault.wap
		// 	} else {
		// 		pathname += config.etc.defaultAction
		// 	}
		// }
		// var mainSites = ['welcome','guang','share','search','book','group','club','address','coupon','order','cart','user','shop']
		// var isMainSite = mainSites.some(function(item){
		// 	return pathname.indexOf(item)===1
		// })
		return evt(true)
		},'isMainSite')();

	this.eventHandle.onOver = function(data){

		if (mSelf.req.headers.encrypted){
            //support https
            data.JCSTATIC_BASE = data.HTTPS_JCSTATIC_BASE || '/'
            data.M_JCSTATIC_BASE = data.HTTPS_JCSTATIC_BASE || '/'
            data.PICTURE_URL = data.HTTPS_PICTURE_URL || '/'
			data.CAPTCHA_ULR = data.HTTPS_CAPTCHA_ULR || '/'
        }
		if(data.urlRiskControl && data.urlRiskControl.code){
			data.pageTitle = '账号异常';
			data.isEnter = true; //入口风控标识
			data.use_rem_screen = true;
			data._CSSLinks = ['secuity_code'];
			data.riskInfo = data.urlRiskControl.info
			this.render('check_code.html',data)
			return;
		}

	}.bind(this)


	//微信token
/*
	 this.listenOn(function(evt){
		 appMod.getGlobalKey(mSelf.req ,mSelf.res);
		 var wx =wapMod.getWXAddrSign(mSelf.req ,mSelf.res);
		 return evt(wx);
		 },'wx')();
*/
}
