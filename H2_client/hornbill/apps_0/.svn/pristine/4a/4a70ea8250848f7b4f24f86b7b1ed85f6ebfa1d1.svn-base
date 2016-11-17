function defaultAction(php) {
    if (!php) {
        console.log('php not assign ' + this.req.url)
        return
    }
    php.userInfo = 'doota::/user/headinfo';
    var mSelf = this;
    this.eventHandle.onOver = function(data) {
        if (mSelf.req.headers.encrypted) { /* 除去https的页面 */
            data.apparel_alert = false;
        }
        if (mSelf.req.headers.host == data.IPAD_SITE_DOMAIN) {
            data.is_iPad = true;
            data.DOMAIN.order = data.DOMAIN.hdapp || 'http://hdapp.meilishuo.com';
        }
        if (mSelf.req.url.indexOf('/biz/') == 0) {
            data.SVERSION = 'bizz.' + data.SVERSION
        }
        if (mSelf.req.headers.encrypted) {
            //support https
            data.JCSTATIC_BASE = data.HTTPS_JCSTATIC_BASE || '/'
            data.PICTURE_URL = data.HTTPS_PICTURE_URL || '/'
            data.CAPTCHA_ULR = data.HTTPS_CAPTCHA_ULR || '/'
        }
        var url = mSelf.req.url;
        if (url.indexOf('?') != -1) {
            url = url.substring(0, url.indexOf('?'));
        }
        if (data.userInfo && (data.userInfo.level == 1 || data.userInfo.level == 2) && url != '/user/activateEmail/' && url != '/user/resetpw/' && url != '/settings/setPassword' && url != '/settings/emailPsSuccess') {
            return mSelf.redirectTo('/user/activateEmail/', false);
        }

        //是否为双十一活动期间
        var curTime = new Date().getTime();
        data.curTime = curTime;
        if (curTime < new Date('2014-11-12 00:00:00')) {
            data.isAct = true;
        } else {
            data.isAct = false;
        }

        //是否为双十一空档期
        if (curTime < new Date('2014-11-12 12:00:00') && curTime > new Date('2014-11-11 00:00:00')) {
            data.isActBlank = true;
        } else {
            data.isActBlank = false;
        }

        //是否为双十一返场
        if (curTime < new Date('2014-11-13 00:00:00') && curTime > new Date('2014-11-12 12:00:00')) {
            data.isActBack = true;
        } else {
            data.isActBack = false;
        }

        //双十二活动开始时间(暂时不要删除，因为此时间决定了平台券的样式)
        data.proStartDay = (new Date('2014-12-11')).getTime();

        //圣诞节活动
        data.proStart = (new Date('2014-12-22 20:00:00')).getTime();
        data.proEnd = (new Date('2014-12-26 00:00:00')).getTime();
    }

    var appMod = base.loadModel('mls/application.js');
    var wapMod = base.loadModel('wap/tools.js');
    this.listenOn(function(evt) {
        var isNewUser = appMod.isNewUser(mSelf.req, mSelf.res);
        return evt(isNewUser);
    }, 'isNewUser')();
    this.listenOn(function(evt) {
        var isQQNewUser = appMod.isQQNewUser(mSelf.req, mSelf.res);
        return evt(isQQNewUser);
    }, 'isQQNewUser')();

    this.listenOn(function(evt) {
        var os = function() {
            return wapMod.uaos(mSelf.req);
        }
        return evt(os);
    }, 'os')();

    this.listenOn(function(evt) {
        /*
         var isTest = appMod.isTest(mSelf.req, mSelf.res);
         var isFlowPercent = appMod.isPercent(mSelf.req , mSelf.res , 4);
         isTest = isTest || isFlowPercent
         return evt(isTest);
         */
        return evt(0);
    }, 'isTest')();
    this.listenOn(function(evt) {
        var access_token = wapMod.getMobToken(mSelf.req, mSelf.res);
        return evt(access_token);
    }, 'accessToken')()

    this.listenOn(function(evt) {
        appMod.getGlobalKey(mSelf.req, mSelf.res);
        var token = appMod.genToken('this.req.headers.clientIp');
        return evt(token);
    }, 'nToken')();

    require(config.path.base + 'webSpam.js').init(this);
}

exports.bind = defaultAction
exports.bindBiz = function(php) {
    var mSelf = this;
    defaultAction.call(this, php)
    var onOver = this.eventHandle.onOver

    this.eventHandle.onOver = function(data) {
        onOver(data)
        data.SVERSION = 'biz.' + data.SVERSION
    }
}