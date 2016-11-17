exports.bind = function (php) {
    if (!php) {
        console.log('php not assign ' + this.req.url)
        return
    }
    var wapMod = this.loadModel('tools.js');
    var mSelf = this;
    php.userInfo = '/user/headinfo';
    php.log = '/customactivity/log';
    this.eventHandle.onOver = function (data) {
      data.JCSTATIC_BASE = data.WAP_JCSTATIC_BASE || data.JCSTATIC_BASE;
    };
    this.listenOn(function (evt) {
        var access_token = wapMod.getMobToken(mSelf.req, mSelf.res);
        return evt(wapMod.uaos(mSelf.req, !!access_token))
    }, 'os')();

    var appMod = this.loadModel('application.js');
    this.listenOn(function (evt) {
        appMod.getGlobalKey(mSelf.req, mSelf.res);
        var access_token = wapMod.getMobToken(mSelf.req, mSelf.res);
        return evt(access_token);
    }, 'accessToken')();
    this.listenOn(function (evt) {
        appMod.getGlobalKey(mSelf.req, mSelf.res);
        var access_version = wapMod.getMobVersion(mSelf.req, mSelf.res);
        return evt(access_version);
    }, 'appVersion')();
    // #8945
    this.listenOn(function (evt) {
        var r = wapMod.getParamR(mSelf.req, mSelf.res);
        return evt(r);
    }, 'r')();

    this.listenOn(function (evt) {
        var frm = wapMod.getChnlMark(mSelf.req, mSelf.res);
        return evt(frm);
    }, '_channel')();

    this.listenOn(function (evt) {
        appMod.getGlobalKey(mSelf.req, mSelf.res);
        var token = appMod.genToken('this.req.headers.clientIp');
        return evt(token);
    }, 'nToken')();
}
