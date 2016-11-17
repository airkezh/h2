/*common*/
var $     = require( 'wap/zepto' ),
    Danmu = require( 'wap/component/danmu/index' ),
    danmu,

    WIN = window,
    LOCATION = WIN.location,

    index = 0,
    danmakuDatas = fml.vars.danmakuDatas,

    $input    = $( '#input' ),
    $errorMsg = $( '#error-msg' ),

    isRequestMsg = false,

    MIN_MSG_LEFT         = 5,
    URL_REQUEST_MSG      = '/aj/danmu/interior',
    URL_POST_MESSAGE     = '/aw/danmu_message/interior',
    MESSAGE_HIDE_TIMEOUT = 3000,

    /**
     * 是否为美丽说 APP
     */
    isMeilishuoApp        = Meilishuo.config.os.mlsApp,

    /**
     * 是否为微信浏览器
     */
    isWeixinBrowser       = navigator.userAgent.indexOf( 'MicroMessenger' ) != -1,

    EventHandlers, Tools

function getMessage() {
    var len = danmakuDatas.length
    index >= len && ( index = 0 )

    if ( len - index <  MIN_MSG_LEFT ) {
        Tools.requestMessage()
    }
    return danmakuDatas[ index++ ]
}

function pageReload() {
    LOCATION.reload()
}

/*
*  登陆成功后的回调函数
*/
WIN.MLS = {
    didLogin: pageReload
}

Tools = {
    /**
     * 登录
     */
    login: (function() {
        if ( fml.vars.isLogin ) {
            return function() {
                return true;
            }
        } else {
            return function() {
                /**
                 * 客户端登录
                 */
                if ( isMeilishuoApp ) {
                    LOCATION.href = 'meilishuo://login.meilishuo/'
                } else if ( isWeixinBrowser ) {
                    LOCATION.href += ( location.search.length ? '&' : '?' ) + 'connect=1'
                } else {
                    LOCATION.href = 'http://m.meilishuo.com/user/login'
                }
                return false
            }
        }
    })(),

    requestMessage: function() {
        if ( isRequestMsg ) {
            return
        }

        isRequestMsg = true

        $.ajax( {
            dataType: 'json',
            url: URL_REQUEST_MSG + '?actid=123',
            success: function( data ) {
                if ( data.error_code == 0 ) {
                    danmakuDatas = data.data.info
                } else {
                    Tools.showError( data.message )
                }
                index = 0
                isRequestMsg = false
            }
        } )
    },

    /**
     * 显示错误信息
     */
    showError: function( msg ) {
        clearTimeout( this.errorMessageID )
        $errorMsg.html( msg ).show()

        this.errorMessageID = setTimeout( function() {
            $errorMsg.hide()
        }, MESSAGE_HIDE_TIMEOUT )
    }
}

EventHandlers = {
    shoot: function() {
        var val = $input.val().trim()

        if ( val ) {
            danmu.load({
                type: 'mine',
                content: val
            })

            $.post( URL_POST_MESSAGE, {
                barrage: val,
                actid: 123
            }, function( data ) {
                if ( data.error_code ) {
                    Tools.showError( data.message )
                }
            }, 'json' )

            $input.val( '' )
            setTimeout( function() {
                $input.blur()
            }, 0 )
        }
    },

    refresh: pageReload
}

;(function() {
    danmu = Danmu( {
        el: '#stage',

        bulletHeight: 58,
        bulletTmpl: '<div class="bullet"><span data-name="content"></span></div>',

        getMessage: getMessage,

        initBullet: function() {
            var bullet = this.bullet,
                els    = this.bullet.els

            bullet.speed = -.15

            if ( this.type == 'mine' ) {
                els.content.innerHTML = this.content
                els.el.className += ' bullet-m'
            }
        }
    } )

    $input.on( 'focus', function() {
        Tools.login()
    })

    $( document.body ).on( 'touchstart', '[data-action]', function( e ) {
        var $target = $( e.currentTarget ),
            action  = EventHandlers[ $target.data( 'action' ) ]

        action && action.call( null, $target )
        e.preventDefault()
    }).on( 'touchend', function( e ) {
        /**
         * 点击页面其他位置，收回键盘
         */
        if ( e.target.tagName !== 'textarea' ) {
            setTimeout( function() {
                $input.blur()
            }, 0 )
        }

        return true
    })
}())
