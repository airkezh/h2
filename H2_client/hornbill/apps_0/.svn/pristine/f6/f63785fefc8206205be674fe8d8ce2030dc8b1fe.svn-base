exports.bind = function(php){
	if (!php) {
		console.log('php not assign ' + this.req.url)
		return
	}	
	 var wapMod = this.loadModel('tools.js');
	 var mSelf = this;
	 //php.userInfo = '/customactivity/CustomActivity_wap_user_info';
     php.userInfo = '/user/headinfo';
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


	//微信token
/*
	 this.listenOn(function(evt){
		 appMod.getGlobalKey(mSelf.req ,mSelf.res);
		 var wx =wapMod.getWXAddrSign(mSelf.req ,mSelf.res);
		 return evt(wx);
		 },'wx')();
*/
}
