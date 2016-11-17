/*common*/
/**
 * 判断APP版本是否为某个版本及以上
 * @author 徐德明 demingxu@meilishuo.com
 * @param {newthan} string 版本号，如'7.3.1'
 */


function isNewest(newthan) {
    var ua = navigator.userAgent || '',
        app_version = Meilishuo.config.os.app_version

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
        // if(Array.isArray(app_version))
        if (({}).toString.call(app_version) === '[object Array]') app_version = app_version.pop()
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

return isNewest;