var cookie = require(config.path.base + 'cookie.js'),
    crypto = require('crypto'),
    urlHandle = require('url'),
    querystring = require('querystring'),
    cryseed = config.etc.token || ''

exports.genToken = function(key , rand , stamp){
    rand = rand || Math.random().toFixed(2)
    //head['clientIp'] rand = (rand * Math.pow(2, Math.ceil(rand*10)) ).toFixed(2)
    var seed =  [key , rand ,  stamp || new Date().getTime()]
    var text = seed.join('|')
    var encrypt = crypto.createCipher('aes-256-cbc',cryseed)
    var crypted = encrypt.update(text, 'utf8', 'base64')
    crypted += encrypt.final('base64')

    /*
     function toConfuse(str){
     var rand = Math.ceil(Math.random() * str.length) % 10
     return  rand + str.substr(0, rand) + String.fromCharCode(65+(Math.random()*25)|0)  + str.substr(rand)
     }
     crypted = toConfuse( crypted)
     */
    return crypted
}
exports.unGenToken = function(token  ){
    token = token.trim()
    if (!token || token.length<2) return false
    /*
     function unConfuse(str){
     var rand = str.charAt(0)|0
     str = str.substr(1)
     if (rand)
     str = str.substr(0,rand) + str.substr(rand+1)
     return str
     }
     token = unConfuse(token)
     */
    try{
        var decipher = crypto.createDecipher('aes-256-cbc',cryseed)
        var dec = decipher.update(token, 'base64', 'utf8')
        dec += decipher.final('utf8')

        dec = dec.split('|')
        if (dec.length < 3) return false
        return {key: dec[0], salt : dec[1] ,stamp : dec[2]}

    }catch(err){
        dec = false
    }
    return dec
}

exports.isTokenLive = function(token , key , ttl){
    var dec = exports.unGenToken(token,key)
    if (!dec || !dec.stamp) return false
    if (dec.key != key ) return false
    return (parseInt(dec.stamp) + ttl*60000) > new Date
}
exports.getRefer = function(req , res){
    //if (/iPad/i.test(req.headers['user-agent'])) return 'iPad';

    var  ref =  cookie.getHandler(req).get('MEILISHUO_REFER');
    if (!ref && res){
        var refer  = req.headers.referer
        if (!refer) return ref
        refer = urlHandle.parse(refer)
        var query = refer.query ? querystring.parse(refer.query) : {}
        var hostDomain = refer.hostname || ''
        var rstr = hostDomain.replace(/\.(com|cn|net|org)/g,'')
        rstr = rstr.substr(rstr.lastIndexOf('.')+1)
        var rootDomain = hostDomain.substr(hostDomain.indexOf(rstr))
        //console.log(req.headers.referer , refer , query, hostDomain , rootDomain)

        if (query.qz_gdt ||
            ['c.gdt.qq.com' ,'cn.qzs.qq.com'].indexOf(hostDomain) > -1 ||
            ['qq.com','pengyou.com','gtimg.cn'].indexOf(rootDomain) > -1){
            ref = 'gdt.qq'
        }else{
            switch (rootDomain){
                case 'sina.com':
                case 'weibo.com':
                    ref = 'weibo'
                    break
                case 'renren.com':
                    ref = 'renren'
                    break
                default:
                    if (query.frm == 'gad') ref = 'others'
            }
        }

        ref && cookie.getHandler(req , res).set('MEILISHUO_REFER', ref)
    }
    return ref
}

var getGlobalKey = function(req , res){
    /*
     $currentStamp = date('ymdHis', $time) . rand(0, 9) . rand(0, 9) . rand(0, 9);
     $globalKey = substr(commFun::getUniqueId (), 0, 17);
     $globalKey .= $currentStamp;
     */
    var cookieHandle = cookie.getHandler(req ,res)
    var globalKey = cookieHandle.get('MEILISHUO_GLOBAL_KEY')
    if (!globalKey){
        var seashell = req.headers.seashell
        if (seashell && seashell.length > 30) {
            seashell = seashell.substr(seashell.indexOf('=') + 1)
            var str = seashell.substring(8 , 16),
                revert = ''

            for(var i = str.length ; i>0 ; i = i-2){
                revert +=  str.substr(i-2 , 2)
            }
            var timestamp = new Date(parseInt(revert,16) * 1000),
                code = base.md5(seashell)
            globalKey = code.substr(0 , 17) + base.date('ymdHis' , timestamp) + code.substr(-6,3)
        }else{
            globalKey = base.md5(base.uuid() + new Date).substr(0, 17) +  base.date('ymdHis') +  (Math.floor(Math.random()*899 )+ 100)
        }

        var expires = new Date
        expires.setFullYear(expires.getFullYear() + 600)
        cookieHandle.set('MEILISHUO_GLOBAL_KEY' , globalKey , expires)
        req.headers.cookie += ';MEILISHUO_GLOBAL_KEY='+globalKey
    }

    var santorini = cookieHandle.get('santorini_mm')
    if (!santorini){
        santorini =  base.md5(globalKey + new Date)
        cookieHandle.set('santorini_mm' , santorini)
        req.headers.cookie += ';santorini_mm='+ santorini

    }
    return globalKey
}

exports.getGlobalKey = getGlobalKey;

exports.getBrowser = function(req){
    var browser = {},
        ua = req.headers['user-agent']
    if (!ua) return browser;
    if (/msie/i.test(ua)) {
        browser.msie = true;
        if (/6.0/i.test(ua)) browser.version = '6.0';
        else if (/7.0/i.test(ua)) browser.version = '7.0';
        else if (/8.0/i.test(ua)) browser.version = '8.0';
        else if (/9.0/i.test(ua)) browser.version = '9.0';
    } else if (/chrome/i.test(ua)) {
        browser.chrome = true;
    } else if (/safari/i.test(ua)) {
        browser.safari = true;
    }
    return browser;
}

// when visitDate >= newDate, consider it's new;
exports.isNewUser = function(req, res, newDate){
    var globalKey = getGlobalKey(req, res);
    var regDate = globalKey.substr(17, 6);
    if (!newDate) return regDate == base.date('ymdHis').substr(0,6);    //default the same day
    if ((regDate - newDate) || (regDate - newDate) === 0)   //regDate of some old users is not reg date...
        return regDate >= newDate;
    return false;
}
// when visitDate >= newDate, consider it's new;
exports.isQQNewUser = function(req, res){
    var refer = exports.getRefer(req , res)
    return  ('gdt.qq'  == refer  && exports.isNewUser(req,res) )? true : false  //regDate of some old users is not reg date...
}

// if denominator is 5, then return 1/5
exports.isPercent = function(req, res, denominator ,remainder){
    var globalKey = getGlobalKey(req, res);
    remainder = remainder ||  1
    return (req.__get['abtest'] == remainder ) || (parseInt(globalKey.substr(0,2), 16) % denominator == remainder);
}

// when visitDate > useDate + gap, return true; date unit is miliseconds
exports.isOvertime = function(useDate, gap) {
    if (typeof gap == 'undefined') gap = 7;
    gap = gap*24*3600*1000;
    var visitDate = new Date
    return (visitDate - gap) > useDate;
}

// for test -> use some id's globalKey
exports.isTest = function(req, res){
    var globalKey = getGlobalKey(req, res);
    var tester = ['fafdbfb246afde5f01d824c6179b668c', '19776e176e1399d1d700828112524291', '58220fcc9ead5e898f150bf571f69bf2', 'b2a3024778aa948eaba92da1df7deac3', 'f16da3bff540ca2c8fe866c4a78f08f8', '2dda61a8625d1c9b01306141534354fa', 'f2401efc193b6124425d48d18226a56c', '6979a0267d3f51114110625221444485', 'f612c38e26ee019b9110804095955002', '1cb28f5acb2a362bb111026163848219', '2046488351c7226ce120621170253864', '379f0fbc2791ae70a111213170722734', 'c1f9cdac60f0c8e33110622162237722', '5c5ba82dd4a680de9111226154444416', '51e75a621925a1e95120511153224467', '98fa2a9150e9c1104110615193926448', '6e752d7e3278a9e0513022321113712c','3838a574efdf5c6cb111229111201587','3ef3502a30cc23ff4e11ed33222a4bd9','00b475ffd538cf7b6121031172255c55'];
    return !!( (tester.indexOf(globalKey)) != -1 );
}