function cashier() {
    return this
}
/**
 WAP_PAD_WINDOWS("8"),
 WAP_PAD_ANDROID("9"),
 WAP_PAD_IOS("10"),
 WAP_PAD_UNKOWN("11"),
 WAP_MOB_WINDOWS("12"),
 WAP_MOB_ANDROID("13"),
 WAP_MOB_IOS("14"),
 WAP_MOB_UNKOWN("15");
 */
function getSource( userAgent ) {
    // android 平板判断不严谨
    if ( /Android/i.test( userAgent ) ) {
        if ( /mobile/i.test( userAgent ) ) {
            return 13
        } else {
            return 9
        }
    } else if ( /iPhone|iPad|iPod/i.test( userAgent ) ) {
        if ( /iPad/i.test( userAgent ) ) {
            return 10
        } else {
            return 14
        }
    } else if ( /IEMobile/i.test( userAgent ) ) {
        return 12
    } else {
        return 15
    }
}

var controlFns = {
    index: function() {
        var php     = {
                'channel_info': '/customactivity/CustomActivity_common_tool_single?id=wap_channel',
                'leadApp':      '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu',
                'apks':         '/url/Package_get',
                //http://redmine.meilishuo.com/projects/doota/wiki/%E8%8E%B7%E5%8F%96%E6%94%AF%E4%BB%98%E6%B8%A0%E9%81%93%E5%88%97%E8%A1%A8
                'channels':     'mpay::/payaccess/getchannellist'
            },

            wapMod  = base.loadModel( 'wap/wrap.js' ),
            getData = this.req.__get,
            channel = getData.channel,
            param   = channel || param,
            content = {
                orderno:      getData.orderno,
                merchantcode: getData.merchantcode,
                biztype:      getData.biztype,
                transtype:    getData.transtype,
                source:       getSource( this.req.headers[ 'user-agent' ] ) + '-5.2', //待定
                version:      '20131111' //固定的
            },

            cookies = this.req.headers.cookie.split( ';' ),
            token   = ''

        cookies && cookies.forEach( function( c ) {
            var parts = c.split( '=' )
            if ( parts[ 0 ].trim() == 'santorini_mm' ) {
                token = parts[ 1 ].trim()
            }
        } )

        php.channels += '?' + wapMod.getZhifu( content ) + '&access_token=' + token
        content.access_token   = token
        this.req.__get.channel = param
        this.req.method        = 'POST'

        this.setDefaultData( php )
        this.bridgeMuch( php )

        this.listenOver( function( data ) {
            if ( data.os.iphone || data.os.ipad ) {
                data.appUrl = 'http://itunes.apple.com/cn/app/meilishuo/id431023686'
            } else {
                if ( !param || (data.apks && !data.apks[ param ]) ) {
                    param = 'web'
                }

                if ( data.apks && data.apks[ param ] && data.apks[ param ].src ) {
                    data.appUrl = data.apks[ param ].src
                } else {
                    data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Android6.2.1/Meilishuo_10008.apk?frm=wap_link_download'
                }
            }

            if ( data.channels.code != '000000' ) { //不成功
                //错误处理
                data.hasError = true
                data.errorMsg = data.channels.message
            }

            data.order = {
                access_token: content.access_token,
                orderno:      content.orderno,
                merchantcode: content.merchantcode,
                source:       content.source,
                version:      content.version //固定的
            }

            data.XR             = true
            data.topbanner      = false
            data._CSSLinks      = [ 'doota/cashier' ]
            data.pageTitle      = '收银台 - 美丽说'
            data.use_rem_screen = '640'

            this.render( 'doota/cashier.html', data )
        } )
    }
}

exports.__create = controller.__create( cashier, controlFns );
