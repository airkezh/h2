var cookie = require(config.path.base + 'cookie.js')
    , util = require('util')
    , querystring = require('querystring')
var crypto = require('crypto');
var sha1 = function (text) {
    return crypto.createHash('SHA1').update(text).digest('hex');
}


function isNewest(req, newthan) {
    var ua = req.headers['user-agent'] || ''
        , app_version = getMobVersion(req) //req.__get.app_version
    function ver2Num(ver) {
        if (!ver) return 0
        var verArr = ver.toString().split('.')
        if (verArr.length < 2) verArr.push(0)
        if (verArr.length < 3) verArr.push(0)
        var vn = verArr[0] * 1e6 + verArr[1] * 1e3 + verArr[2] * 1
        if (verArr.length > 3) vn += verArr[3] / 100
        return vn
    }

    if (newthan) {
        if (util.isArray(app_version)) app_version = app_version.pop()
        app_version = ver2Num(app_version)
        newthan = ver2Num(newthan)
        return app_version >= newthan
    }

    if (!!ua.match('iPhone'))
        return '3.0.6' == app_version
    else if (!!ua.match('Android'))
        return '3.7.5' == app_version
    else
        return null
}
function supportShare(req) {
    var os = uaos(req)
    var v = os.android ? '3.7.3.5' :
        os.iphone ? '3.0.4' : null
    return isNewest(req, v)
}
// {pic: '', title:'',url:''}
exports.shareTo = function (req, param, channels, defaultChannel) {
    defaultChannel = defaultChannel || 'weixin_timeline'

    if (!supportShare(req)) return false
    if (!channels) channels = ['weixin_timeline', 'weixin' , 'qzone', 'weibo', 'txweibo']
    var ret = []

    var host = (req.headers && req.headers.host) || 'm.meilishuo.com'

    if (param.url && -1 == param.url.indexOf('//')) param.url = 'http://' + host + (param.url[0] == '/' ? '' : '/') + param.url
    var os = uaos(req)
        , pars = [ 'title' , 'text']
    var isIPhone = os.iphone || os.ipad
        , isPad = os.ipad
    channels.forEach(function (chan) {
        var unit_param = {
            "type": chan,
            "r": param.r || '',
            "url": param.url || ''
        }
        for (var i = pars.length - 1; i >= 0; i--) {
            var parv = param[pars[i]]
            if (parv)
                unit_param[pars[i]] = parv[chan] || parv.default || parv || ''
        }

        if (param.pic)
            var pic = param.pic[chan] || param.pic.default || param.pic
        switch (chan) {
            case 'weixin_timeline':
            case 'qzone':
            case 'weixin':
                if (!pic) return
                unit_param['thumb_url'] = pic
                if (isIPhone) unit_param.message_type = 'webpage'
                break
            default:
                if (param.pic)
                    unit_param['pic_url'] = pic
                break
        }

        ret.push({"type": chan, "isDefault": chan == defaultChannel, "share_url": "meilishuo" + (isPad ? "hd" : "") + "://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(unit_param))})
    })
    return ret
}
function uaos(req, mlsApp) {
    var ua = req.headers['user-agent']
    if (!ua)
        return {};
    if (req.__os__) return req.__os__
    var os = this.os = {},
        webkit = ua.match(/WebKit\/([\d.]+)/),
        android = ua.match(/(Android)\s+([\d.]+)/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        apad = ua.match(/(androidpad)\s+([\d.]+)\s+([\d.]+)/)

    if (android) os.android = true, os.version = android[2]
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (apad) os.apad = true, os.version = apad[3]

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)))
    os.phone = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 ||
        (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))

    os.mlsApp = mlsApp
    req.__os__ = os
    return os
}

exports.getMobToken = function (req, res) {
    return readQueryOrCookie(req, res, ['app_access_token' , 'access_token'], 'app_access_token')
}

exports.getMobVersion = getMobVersion

function getMobVersion(req, res) {
    return readQueryOrCookie(req, res, ['app_version'], 'app_version')
}

function readQueryOrCookie(req, res, queryName, cookieName) {
    if (!req.app_param) req.app_param = {}
    if (req.app_param[cookieName]) return req.app_param[cookieName]
    var cookieHandle = cookie.getHandler(req, res)
    var app_param = req.__get[queryName[0] ] || req.__get[queryName[1]]

    if (app_param)
        cookieHandle.set(cookieName, app_param)
    else
        app_param = cookieHandle.get(cookieName)

    req.app_param[cookieName] = app_param
    return app_param
};

exports.getAndClearR = function (req, res) {
    var cookieHandle = cookie.getHandler(req, res)
    var r = cookieHandle.get('query_param_r')
    cookieHandle.set('query_param_r', '', new Date)
    return r
}
exports.getChnlMark = function (req, res) {
    var cookieHandle = cookie.getHandler(req, res)
    var frm = req.__get.channel
    if (frm) {
        cookieHandle.set('channel_mark', frm)
    } else
        frm = cookieHandle.get('channel_mark')

    return frm
}
exports.getParamR = function (req, res) {
    var cookieHandle = cookie.getHandler(req, res)
    var r = req.__get.r
    if (r) {
        //#8945
        //console.log(req.url ,  req.headers.host , req.__get)
        var newR = req.headers.host == 'mapp.meilishuo.com' ? '2_mapp-' : '1_m-'
        var path = req.url.split('?')[0]
        var rw_param_1 = ''
        if (!path || '/' == path) {
            path = 'main'
        } else {
            path = path.split('/')
            if (path[0] == '') path.shift()
            if (path[path.length - 1] > 0) rw_param_1 = path.pop()
            if ('' == path[path.length - 1]) path.pop()
            path = path.join('_')
        }
        newR += path
        //var param = querystring.stringify(req.__get, ':', '=')
        var param = ''
        if (rw_param_1) param = 'rw_param_1=' + rw_param_1 + ':' + param
        if (param) newR += ':' + param

        r += '.' + newR
        cookieHandle.set('query_param_r', r)
    } else
        r = cookieHandle.get('query_param_r')

    return r

}

exports.isNewest = isNewest
exports.supportShare = supportShare
exports.uaos = uaos

//channel号判断
exports.gotoDownload = function (req, res, arr, obj) {
    var ua = req.headers['user-agent'];
    if (ua && /(iPhone|iPad|iPod|iOS)/i.test(ua) && ua.indexOf('UCBrowser') > 0) {
        return false;
    }
    if (arr && arr.length > 0 && obj) {
        var cookieHandle = cookie.getHandler(req, res)
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === obj) {
                var expires = new Date
                expires.setHours(expires.getHours() + 1)
                cookieHandle.set('appwel_skip', expires)
                return false
            }
        }
    } else {
        return true;
    }

}


/*微信相关*/
function getWXToken(req, res) {

    var cookieHandle = cookie.getHandler(req, res)
    var wx_token = req.__get.WXACCESSTOKEN

    //暂时写死
//	wx_token = 'OezXcEiiBSKSxW0eoylIeKXFlVnukv4fq0uyG16KCluM8AOvYruQLiTvxgo4Uc0HCIuTiTG4zVeq4mof7x-ujIDxCKr861QvkzorG-3WyKEY_Su2CWuLE1kZai2CXqc12XBAvhLBtk5Hj_bK8gA4Iw'
//	cookieHandle.clear('WXACCESSTOKEN')

    if (wx_token)
        cookieHandle.set('WXACCESSTOKEN', wx_token)
    else
        wx_token = cookieHandle.get('WXACCESSTOKEN')

    return wx_token
};
exports.getWXToken = getWXToken;
exports.getWXAddrSign = function (req, res) {

    var accesstoken = getWXToken(req, res)
        , appId = 'wx28b165b5a629bb11'
        , noncestr = '123456'//Math.random() + ''
        , timeStamp = '1384841012'//parseInt(new Date().valueOf()/1000) + ''
        , url = 'http://' + req.headers.host + req.url

    console.log('testurl', url)

    var addrSignStr = 'accesstoken=' + accesstoken
        + '&appid=' + appId
        + '&noncestr=' + noncestr
        + '&timestamp=' + timeStamp
        + '&url=' + url

    var wx_addr = {
        accesstoken: accesstoken, noncestr: noncestr, timeStamp: timeStamp, addrSign: sha1(addrSignStr), url: url, appId: appId
    }
    return wx_addr
}

//是否是weixin或者手q
exports.isWxOrSq = function(req, res) {
    var ua = req.headers['user-agent'];
    ua = ua.toLowerCase();

    if (/micromessenger/i.test(ua) || /qq\/(\/[\d\.]+)*/.test(ua) || /qzone\//.test(ua)) {
//        console.log("微信OR手Q");
//        console.log(ua);
        return true;
    }
    return false;
}

exports.plat = function(req,res){
//    1	Android
//    2	Iphone
//    3	iPad
//    4	PC
//    5	WAP
//    8	微信
//    9	手Q
//    if (android) os.android = true, os.version = android[2]
//    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
//    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
//    if (webos) os.webos = true, os.version = webos[2]
    var ua = req.headers['user-agent'];
    ua = ua.toLowerCase();
    var os = uaos(req);
    var plat ="5"; //wap

    if(os.android){
        plat = "1";
    }
    if(os.iphone){
        plat = "2";
    }
    if(os.ipad){
        plat = "3";
    }
    if (/micromessenger/i.test(ua)) {
        plat = "8";
    }
    if(/qq\/(\/[\d\.]+)*/.test(ua) || /qzone\//.test(ua)){
        plat = "9";
    }
    return plat;
}
