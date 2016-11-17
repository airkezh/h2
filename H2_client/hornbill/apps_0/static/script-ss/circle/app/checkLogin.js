fml.define( 'circle/app/checkLogin', [], function() {
    var win          = window,
        loc          = win.location,
        CONFIG       = Meilishuo.config,
        NORMAL_LOGIN = '//m.meilishuo.com/user/login',
        APP_LOGIN    = 'meilishuo://login.meilishuo/',
        WX_LOGIN     = '//m.meilishuo.com/wx/connectCircle?goback='

    win.MLS.didLogin = win.MLS.didLogout = function() {
        loc.reload()
    }

    return function() {
        if ( CONFIG.user_id == 0 ) {
            /**
             * 在微圈的微信互联需要跳转到 wap 页进行登录，然后再回跳
             */
            if ( navigator.userAgent.indexOf( 'MicroMessenger' ) != -1 ) {
                loc.href = WX_LOGIN + encodeURIComponent( loc.href )
            } else if ( CONFIG.os.mlsApp ) {
                loc.href = APP_LOGIN
            } else {
                loc.href = NORMAL_LOGIN
            }

            return false
        }

        return true
    }
} )
