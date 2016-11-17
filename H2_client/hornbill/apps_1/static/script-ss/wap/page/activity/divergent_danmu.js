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
        '凡是科幻片都喜欢行不？',
        '博学派珍宁挺漂亮的',
        '老四背部好性感，呼呼～',
        '喜欢《超体》',
        '钢铁侠',
        '这一部的女主角头发变短了，丑',
        '我说哈利波特会不会out了',
        '小鲜肉主演的都喜欢',
        '现在也没搞清楚电影里面那五大派别是啥',
        '女主的粉裙子还行，美丽说有卖的吗',
        '温斯莱特，必须的！',
        '不喜欢科幻片',
        '3D的效果超好',
        '把钱省下来买衣服多好',
        '啦啦啦啦～开心',
        '感觉比饥饿游戏好看',
        '都教授！！！！！',
        '杰克船长',
        '博学派的一个女孩子',
        '无畏派好man',
        '时代姐妹花哈哈哈哈',
        '没有',
        '诚实派没看明白',
        '里面那个男的好像演过迷失？',
        '期待那个限量版T恤！！！！！',
        '抢到了！',
        '怎么还不下课，我想看电影',
        '买了分歧者的书～',
        '喜欢我自己',
        '准备先看第一部',
        '什么鬼，我去看看',
        '我要电影票',
        '阿凡达',
        '王宝强算分歧者吗',
        '我想加入友好派',
        '电影里有五个派别',
        '肌肉男美国队长',
        '魔戒那个主人公',
        '擎天柱',
        '金刚狼，虽然有点老',
        '黑客帝国男主角，型男',
        '科幻迷心中的第九区',
        '我是霍比特人的骨灰粉',
        '电影限量版T恤哪里卖',
        '不看科幻片',
        '～～～～～',
        '有人看过移动迷宫么',
        '机器猫哈哈哈哈哈',
        '美丽说的花花',
        '必须老四，那个刺青啊啊～～'
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
            url: URL_REQUEST_MSG + '?actid=622',
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
            danmu.load({
                type: 'mine',
                content: val
            })

            $.post( URL_POST_MESSAGE, {
                barrage: val,
                actid: 622
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

    chatItOut: function (){
        /**
         * 判断是否安装了美丽说客户端
         */
        var circleId = 601549
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
        title: '0.1元抢购《分歧者2》电影周边',
        desc: '6月24/25日，限量版T恤和全国通兑影券限量抢！只要0.1元～6月19日上映的《分歧者2》等你来看！',
        imgUrl: 'http://d04.res.meilishuo.net/pic/_o/2f/06/92133e19b95d96e270787302b866_200_200.cf.jpg'
    };

    WXShare.bind(shareData)
}())
