/*common*/
var $     = require( 'wap/zepto' ),
    WXShare = require('wx/share'),
    WXSign = require('wx/sign'),
    openAppCustom =  require('wap/app/openAppCustom'),
    Danmu = require( 'wap/component/danmu/index' ),
    danmu,
    danmuMode = 'auto',

    WIN = window,
    LOCATION = WIN.location,

    index = 0,
    danmakuDatas = fml.vars.danmakuDatas,

    $input    = $( '#input' ),
    $errorMsg = $( '#error-msg' ),
    stage     = document.getElementById('stage'),

    isRequestMsg = false,

    MIN_MSG_LEFT         = 5,
    URL_REQUEST_MSG      = '/aj/danmu/divergent',
    URL_POST_MESSAGE     = '/aw/danmu_message/divergent',
    MESSAGE_HIDE_TIMEOUT = 3000,

    /**
     * 是否为美丽说 APP
     */
    isMeilishuoApp        = Meilishuo.config.os.mlsApp,

    /**
     * 是否为微信浏览器
     */
    isWeixinBrowser       = navigator.userAgent.indexOf( 'MicroMessenger' ) != -1,

    EventHandlers, 
    Tools,
    /**
     * 预制弹幕
     */
    danmuDataPreset = [ 
       '疯爱什么鬼！！',
       '穿越剧又来了',
        '感觉陈大发会比刘诗诗演若曦好一点，大发多萌啊！',
        '大发！我的元气女神！',
        '我擦！应该叫郭采洁和杨佑宁演对手戏啊！',
        '我要穿越到唐朝马震！',
        '是又要虐恋了！！我要男朋友！',
        '抢抢抢！',
        '没有吴奇隆不想看',
        '我喜欢看《宫》',
        '我看过的穿越剧是《寻秦记》，会不会暴露年龄了！',
        '那个要男朋友的，留下微信号啊！抢到票一起看啊！',
        '微信号po出来啊！哈哈哈',
        '对啊妹子，抢到票和你一起看啊！',
        '男主不够帅'
    ]

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
            url: URL_REQUEST_MSG + '?actid=804',
            success: function( data ) {
                if ( data.error_code == 0 ) {
                    var info  = data.data.info
                    var len = Array.isArray(info) ? info.length : 0;
                    if(len > 49){
                        danmakuDatas = data.data.info
                    }else{
                        danmakuDatas = danmuDataPreset
                    } 
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
            $.post( URL_POST_MESSAGE, {
                barrage: val,
                actid: 804
            }, function( data ) {
                if ( data.error_code ) {
                    Tools.showError( data.message )
                }else {
                    danmu.load({
                        type: 'mine',
                        content: val
                    });
                    $input.val( '' )
                }
            }, 'json' )
            setTimeout( function() {
                $input.blur()
            }, 0 )
        }
    },

    chatItOut: function (){
        /**
         * 判断是否安装了美丽说客户端
         */
        var circleId = 795807
        openAppCustom.check(function (hasApp){
            if(hasApp){
                location.href = 'meilishuo://circle.meilishuo/?json_params=' 
                                + encodeURIComponent(JSON.stringify({circle_id:circleId}))
            }else{
                location.href = 'http://circle.meilishuo.com/circle/chat?circle_id=' + circleId
            }
        })
    }
}

;(function() {
    if(danmakuDatas.length < 50) danmakuDatas = danmuDataPreset
    danmu = Danmu( {
        el: '#stage',
        mode: danmuMode,
        bulletHeight: 35,
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
    }).on('blur', function (){
        stage.scrollIntoView()
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
        if ( e.target.tagName !== 'INPUT' ) {
            setTimeout( function() {
                $input.blur()
            }, 0 )
        }

        return true
    })

    /**
     * 设置微信二次分享
     */
    WXSign()
    var shareData = {
        title: '0.1元疯抢《新步步惊心》电影票',
        desc: '8月4日/9日/10日每晚21点 0.1元看陈意涵穿越新剧《新步步惊心》！只要0，1元全国通兑影券限量抢！',
        imgUrl: 'http://d01.res.meilishuo.net/pic/_o/aa/15/5ca21b55b2133fd97c9544fe48c5_128_179.ch.jpg'
    };

    WXShare.bind(shareData)
}())
