function defaultAction(php , channel){
	var mSelf = this;
	if (!php) {
		console.log('php not assign ' + this.req.url)
		return
	}
	if ('wap' == channel){
		var wapMod = this.loadModel('tools.js');
		this.listenOn(function(evt){
			var access_token = wapMod.getMobToken(mSelf.req ,mSelf.res);
			return evt(access_token);
		},'accessToken')()
	}
	php.userInfo = '/user/headinfo';

	this.eventHandle.onOver = function(data){
		if (mSelf.req.headers.encrypted){
			//support https
			data.JCSTATIC_BASE = data.HTTPS_JCSTATIC_BASE || '/'
			data.PICTURE_URL = data.HTTPS_PICTURE_URL || '/'
			data.CAPTCHA_ULR = data.HTTPS_CAPTCHA_ULR || '/'
		}
	}
}

exports.bind = defaultAction
