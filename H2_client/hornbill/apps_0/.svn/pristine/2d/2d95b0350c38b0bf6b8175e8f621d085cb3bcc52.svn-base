/*common*/

var os         = Meilishuo.config.os,
    downloadEl = document.getElementById( 'download' ),
    appURL

if ( os.weixinBrowser ) {
    appURL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo&g_f=992263'
} else if ( os.iphone || os.ipad ) {
    appURL = 'https://itunes.apple.com/cn/app/id431023686?mt=8'
} else {
    appURL = fml.vars.appURL
}

downloadEl.ontouchend = downloadEl.onclick = function() {
    location.href = appURL
}
