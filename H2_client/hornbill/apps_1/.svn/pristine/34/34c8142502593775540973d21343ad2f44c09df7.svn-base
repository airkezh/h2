/*common*/
require( 'circle/zepto/fastclick' )
require( 'circle/core/promise' )
/**
 * 微信或者浏览器直接打开客户端APP
 * @author xudeming
 * @param {url} string 打开APP的页面
 */
var win            = window,
    isInApp        = Meilishuo.config.os.mlsApp,
    isWeixin       = win.navigator.userAgent.indexOf( 'MicroMessenger' ) != -1,
    defaultPromise,

    OPEN_URL = 'meilishuo://openURL.meilishuo?json_params='

//判断打开的是APP里面的WAP还是native
function isWap( url ) {
    return !url.match( /meilishuo:\/\//g )
}

function weixinCheck( resolve ) {
    win.WeixinJSBridge.invoke( 'getInstallState', {
        'packageName': 'com.meilishuo',
        'packageUrl': 'meilishuo://'
    }, function( res ) {
        //装了APP
        if ( res.err_msg.split( ':' )[ 1 ].match( /yes/g ) ) {
            resolve( true )
        } else {
            resolve( false )
        }
    } )
}

function check() {
    return new Promise( function( resolve ) {
        if ( isInApp ) {
            resolve( true )
        } else if ( !isWeixin ) {
            resolve( false )
        } else {
            //在微信内判断
            if ( win.WeixinJSBridge ) {
                weixinCheck( resolve )
            } else {
                document.addEventListener( 'WeixinJSBridgeReady', function() {
                    weixinCheck( resolve )
                }, false )
            }
        }
    } )
}

defaultPromise = check()

/**
 * 检查是否安装了 app
 * @param callback 参数为布尔值，表示是否安装 app
 * @returns {*|Promise}
 */
exports.check = function( callback ) {
    return defaultPromise.then( callback )
}

/**
 * 根据是否安装 app 来决定如何跳转
 * @param url
 * @returns {*}
 */
exports.jump  = function( url ) {
    if ( isInApp ) {
        return location.href = url
    }

    defaultPromise.then( function( isInstalled ) {
        var href = url,
            urlObj

        if ( isInstalled && isWap( url ) ) {
            urlObj = {
                url: url,
                inApp: '1',
                require_app_info: '1'
            }
            href = OPEN_URL + encodeURIComponent( JSON.stringify( urlObj ) )
        }

        location.href = href
    })
}
