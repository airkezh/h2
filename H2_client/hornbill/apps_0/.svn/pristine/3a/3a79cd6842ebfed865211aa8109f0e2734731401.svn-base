/*common*/

var $           = require( 'wap/zepto' ),

    /**
     * 客户端微信分享
     */
    ShareTo     = require( 'wap/app/shareTo' ),

    /**
     * 微信浏览器里的分享
     */
    WXShare     = require( 'wap/app/lark/wxShare' ),

    /**
     * 发送统计信息
     */
    Tracking    = require( 'wap/app/tracking' ),

    /** 下雪特效 start */
    Fall             = require('wap/page/activity/fall'),
    picPicPublicPart = 'http://i.meilishuo.net/css/images/activity/danmu/aquarius/',
    images           = {
        'bird'     : { 'img' : picPicPublicPart + 'bird1.png', 'width' : 239, 'height' : 93 },
        'face'     : { 'img' : picPicPublicPart + 'face2.png', 'width' : 38, 'height' : 38 },
        'heart'    : { 'img' : picPicPublicPart + 'heart2.png', 'width' : 32, 'height' : 31 },
        'a_symble' : { 'img' : picPicPublicPart + 'a_symble1.png', 'width' : 43, 'height' : 27 },
        'lip'      : { 'img' : picPicPublicPart + 'lip1.png', 'width' : 68*0.8, 'height' : 40*0.8 },
        'yuanbao'  : { 'img' : picPicPublicPart + 'yuanbao1.png', 'width' : 47*0.8, 'height' : 34*0.8 },
        'sheep'    : { 'img' : picPicPublicPart + 'sheep.png', 'width' : 43, 'height' : 51},
        'cake'     : { 'img' : picPicPublicPart + 'cake1.png','width' : 36, 'height' : 39}
    },
    keywords         = {
        'bird'     : ['飘过','路过','安静','一个人','...',' 。。。','孤独','寂寞','冷'],
        'face'     : ['233','哈哈','嘿嘿','嘻嘻','呵呵','hoho','haha','哇咔咔','笑','乐','开心','快乐','幸福','星湖','幸胡','开森'],
        'heart'    : ['爱','love','老虎油','赞','心水','喜欢','稀饭'],
        'a_symble' : ['瓶纸','水瓶','瓶男','瓶女','水平','shuiping','aquarius ','Aquarius'],
        'lip'      : ['么么','吻','亲爱','honey','达令','哈尼','mua','亲亲'],
        'yuanbao'  : ['财','钱','福','金','一百块','100块','money','100元','金元宝'],
        'sheep'    : ['本命','羊','咩','yang'],
        'cake'     : ['生日','破蛋','诞辰','生快','大一岁','老一岁','蛋糕']
    },
    timeout,
    /** 下雪特效 end */

    WIN         = window,
    DOC         = document,
    DOCELEMENT  = document.documentElement,
    DUMMY       = DOC.createElement( 'div' ),
    LOCATION    = WIN.location,
    PERFORMANCE = WIN.performance || {},

    $win        = $( WIN ),
    $body       = $( DOC.body ),

    /**
     * 弹幕根元素
     *
     * 弹幕暂停和启动的自定义事件绑定在这里
     */
    $danmu    = $( '#danmu' ),

    /**
     * 显示错误信息
     */
    $errorMsg = $( '#error-msg' ),

    /**
     * 输入框
     */
    $input    = $( '#input' ),

    /**
     * 规则元素
     */
    $rule    = $( '#rule' ),

    /**
     * 发射按钮
     */
    $shoot     = $( '#shoot' ),
    $wxTips    = $( '#wx-tips' ),
    ftEl       = $danmu.find( '.ft' )[ 0 ],
    signaleEl  = $( '#bullet-signal' )[ 0 ],

    /** 快速发射相关 start */
    randomIndex= 0 ,

    /** 按钮 */
    $fsBtn1    = $('.fs-btn1'),
    $fsBtn2    = $('.fs-btn2'),
    $fsBtn3    = $('.fs-btn3'),

    /** 按钮数据 */
    fsBtnText = [
        ['我是水瓶座','飘过','生日快乐'],
        ['我要发大财','么么','摩西摩西'],
        ['本命羊咩咩','233','泥萌壕'],
        ['爱你喔','吖咪','什么鬼'],
        ['好吐艳','羞羞','刚巴爹']
    ],
    /** 快速发射相关 end */

    /**
     * 弹幕实例
     */
    danmaku,

    /**
     * 保存服务器端传来的普通弹幕信息
     */
    danmakuDatas,

    /**
     * 保存服务器端传来的官方弹幕信息
     */
    danmakuOfficialDatas  = [],

    /**
     * 奖品信息
     * http://redmine.meilishuo.com/projects/meilishuo-web/wiki/CustomactivityCustomActivity_lottery
     */
    lotteryData,

    /**
     * 弹层实例
     */
    panel,

    /**
     * 『发射』按钮是否可点击
     */
    isBtnOn               = false,

    /**
     * 12 月 25 日活动结束之后，不显示红包
     */
    isNobonus             = $danmu.data( 'nobonus' ) == '1',

    /**
     * 是否为美丽说 APP
     */
    isMeilishuoApp        = Meilishuo.config.os.mlsApp,

    /**
     * 是否为微信浏览器
     */
    isWeixinBrowser       = navigator.userAgent.indexOf( 'MicroMessenger' ) != -1,

    /**
     * https://github.com/julianshapiro/velocity/blob/master/velocity.js#L464
     */
    oldStyleMove = (function() {
        var timeLast = 0

        return function( callback ) {
            var timeCurrent = Tools.getCurrentTime(),
                timeDelta

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max( 0, 16 - ( timeCurrent - timeLast ))
            timeLast  = timeCurrent + timeDelta

            return setTimeout( function() { callback( timeCurrent + timeDelta ) }, timeDelta )
        }
    })(),

    requestAnimationFrame = WIN.requestAnimationFrame       ||
        WIN.webkitRequestAnimationFrame ||
        WIN.mozRequestAnimationFrame    ||
        oldStyleMove,

    cancelAnimationFrame  = WIN.cancelAnimationFrame       ||
        WIN.webkitCancelAnimationFrame ||
        WIN.webkitCancelRequestAnimationFrame||
        WIN.mozCancelAnimationFrame    ||
        function( timeoutID ) {
            clearTimeout( timeoutID )
        },

    /**
     * 事件处理方法
     */
    EventHandlers,

    /**
     * 跟分享相关的操作
     */
    Share,

    /*
     * 工具方法
     */
    Tools,

    vendorTransform = [
        '-webkit-transform:translate3d(',
        'px,0,0);-moz-transform:translate3d(',
        'px,0,0);-ms-transform:translate3d(',
        'px,0,0);transform:translate3d(',
        'px,0,0);'
    ],

    /**
     * 生成红包的频率，单位是秒
     */
    BONUS_GENERATE_MIN   = 3,
    BONUS_GENERATE_MAX   = 10,

    /**
     * 检查『空闲通道』的间隔时间
     */
    CHECK_IDLE_TIMEOUT   = 5000,

    /**
     * 弹幕活动的 id
     */
    DANMAKU_ACTIVITY_ID  = 27,

    /**
     * 错误信息 3 秒钟后自动隐藏
     */
    MESSAGE_HIDE_TIMEOUT = 3000,

    /**
     * 每一帧允许的最小时间误差，超过该值会修改 flying bullet 的 startTime
     */
    MIN_FRAME_OFFSET     = 500,

    /**
     * 还剩下多少条信息未显示完时才去请求新数据
     */
    MIN_MSG_LEFT         = 5,

    /**
     * 取数据的最短间隔时间
     */
    MIN_REQUEST_TIMEOUT  = 5000,

    /**
     * 红包被打开
     */
    BONUS                = 'bonus',
    BONUS_CLICKED        = 'bullet-b-clicked',

    /**
     * 每个红包上都有一个图标『点击我有惊喜』，红包被点击过一次后
     * 所有红包都不再显示该图标
     */
    BONUS_GLOBAL_CLICKED = 'global-bullet-clicked',

    /**
     * 打开的红包会被隐藏
     */
    BONUS_OPENED         = 'bullet-b-opened',

    BTN_ON               = 'btn-on',

    /**
     * 不是微信和客户端的分享操作会提示以下内容
     */
    DEFAULT_SHARE_TEXT   = '无法分享到微信哦，要用美丽说客户端才可以分享哦~',
    EVE_PAUSE            = 'danmaku:pause',
    EVE_RESTORE          = 'danmaku:restore',
    MINE                 = 'mine',
    NORMAL               = 'normal',
    OFFICIAL             = 'official',

    URL_DANMAKU_LOTTERY  = '/aj/danmu_lottery/',
    URL_POST_MESSAGE     = '/aw/danmu_message/interior',
    URL_REQUEST_MSG      = '/aj/danmu/aquarius',

    WX_APPID             = 'wxd00a5f16e02bed58',
    WX_SHARE_PIC         = 'http://d06.res.meilishuo.net/img/_o/a0/ad/90b44add4f08bf5e0aa5b83ae906_200_200.ch.jpg',
    WX_SHARE_TEXT        = "嘿 水瓶星人在哪里 来美丽说bibi领百元福利惹(●'◡'●)",
    WX_SHARE_TEXT_SUC    = '美丽说 $ 到手~终于等到你 还好我没放弃>ω<',
    WX_SHARE_TEXT_FAIL   = '含泪握拳状～美丽说优惠券我一定要得到你！',
    WX_SHARE_URL         = 'http://' + LOCATION.host + '/wx/aquarius/'

/**
 * 弹幕
 */
function Danmaku( el ) {
    this.$el          = el
    this.width        = el.width()
    this.height       = el.height()
    this.clip         = []  //弹夹
    this.flying       = []  //正在飞行的子弹
    this.mineBullets  = []  //用户自己发送的信息
    this.bonusBullets = []  //红包

    this.init()
}

Danmaku.prototype = {
    constructor: Danmaku,

    /**
     * 初始化通道，开启动画
     *
     * stage-border
     * -----------------------
     *     ↑
     *  channelHeight    <---  Bullet
     *     ↓
     * -----------------------
     *
     *      <---
     *
     * -----------------------
     * stage-border
     */
    init: function() {
        var bullet, channel, index,
            height        = signaleEl.offsetHeight,
            channelOffset = this.channelOffset = ( height / 6 ) << 0,

            //bullet 高度 = bullet 内容高度 + 偏移
            channelHeight = this.channelHeight = height + channelOffset,

            /*
             * 每个通道最多拥有的子弹数
             * 这个 4 是初始值，随便取的
             */
            maxBulletsPerChannel = 4,
            channels = this.channelSizes = parseInt(this.height / channelHeight),
            clipSize = maxBulletsPerChannel * channels,
            clip     = this.clip,
            flying   = this.flying,
            i        = 0,
            that     = this,
            msg

        for ( ; i < clipSize; i++ ) {
            index  = i % channels
            bullet = new Bullet( {
                context: this,
                channel: index
            })

            if ( i < channels ) {
                flying.push( bullet )
                msg = Tools.getMessage()
                bullet.initAttr( msg.content, msg.type )
            } else {
                channel = clip[ index ]
                channel || ( channel = clip[ index ] = [] )
                channel.push( bullet )
            }
        }

        this.start()

        /*
         * 开始生成红包
         */
        !isNobonus && this.generateBonus()

        /**
         * 检测空闲通道
         * TODO 应该去检查两次 requestAnimationFrame 的时间差
         */
        setTimeout( function() {
            that.checkIdleChannels()
        }, CHECK_IDLE_TIMEOUT)

        /**
         * 弹幕的暂停与恢复事件
         *
         * 暂停会影响动画效果，要手动为每颗飞行的子弹补上暂停的时间
         */
        $danmu.on( EVE_PAUSE, function() {
            that.pauseStartTime = Tools.getCurrentTime()
            cancelAnimationFrame( that.animationID )
        }).on( EVE_RESTORE, function() {
            var costTime,
                flying = that.flying,
                len    = flying.length

            costTime = Tools.getCurrentTime() - that.pauseStartTime

            while ( len-- ) {
                flying[ len ].startTime += costTime
            }

            that.start()
        } )
    },

    /**
     * 空闲通道检测
     * 在特殊情况下，通道中的所有子弹都出现在弹幕中，并且都已设置过 next 状态
     * 等这些子弹飞行结束后，flying 数组中已没有该通道的子弹，该通道即视为『空闲』
     */
    checkIdleChannels: function() {
        clearTimeout( this._checkIdleChannelsID )

        var size    = this.channelSizes,
            checker = new Array( size ),
            flying  = this.flying,
            len     = flying.length,
            i       = 0,
            j       = 0,
            that    = this

        for ( ; i < len; i++ ) {
            checker[ flying[ i ].channel ] = 1
        }
        for ( j = 0; j < size; j++ ) {
            !checker[ j ] && that.emit( j )
        }

        this._checkIdleChannelsID = setTimeout( function() {
            that.checkIdleChannels()
        }, CHECK_IDLE_TIMEOUT)
    },

    /**
     * 5 ~ 30 秒间随机生成红包
     */
    generateBonus: function() {
        var that = this

        setTimeout( function() {
            that.bonusBullets.push( true )
        }, parseInt( BONUS_GENERATE_MIN +
        Math.random() *
        ( BONUS_GENERATE_MAX - BONUS_GENERATE_MIN ) ) *
        1000 )
    },

    /**
     * 发射子弹
     */
    emit: function( channelNum ) {
        var myMsg, msg, bonus, type, content,
            channel = this.clip[ channelNum ],
            bullet  = channel.shift()

        if ( bullet ) {
            myMsg = this.mineBullets.shift()

            if ( myMsg ) {
                content = myMsg
                type    = MINE
            } else {
                bonus = this.bonusBullets.shift()
                if ( bonus ) {
                    content = ''
                    type    = BONUS
                } else {
                    msg = Tools.getMessage()
                    content = msg.content
                    type    = msg.type
                }
            }

            bullet.initAttr( content, type )
            this.flying.push( bullet )
        } else {
            channel.push( new Bullet({
                context: this,
                channel: channelNum
            }) )
        }
    },

    emitMineBullet: function( content ) {
        this.mineBullets.push( content )
        Tracking.cr( 'shoot' )
    },

    /**
     * 处理子弹飞行中的状态
     * @param state 子弹飞行状态
     *              end:   飞行结束
     *              next:  下一颗子弹可以出现
     * @param index 子弹在 flying 数组中的下标
     */
    handle: function( state, index ) {
        var clip       = this.clip,
            flying     = this.flying,
            bullet     = flying[ index ],
            channelNum = bullet.channel,
            remains    = clip[ channelNum ]

        switch ( state ) {
            //发射下一颗子弹
            case 'next':
                this.emit( channelNum )
                break

            /*
             *   bullet 飞行结束，放回到弹夹中
             *   如果是红包飞过去，那么生成下一个红包
             */
            case 'end':
                flying.splice( index,  1 )
                remains.push( bullet )
                bullet.type == BONUS && this.generateBonus()
                break
        }
    },

    /**
     * 启动主循环，开启动画
     */
    start: function() {
        var that   = this,
            flying = that.flying

        function frame( timestamp ) {
            var bullet, result,
                len = flying.length

            while ( len-- ) {
                bullet = flying[ len ]
                result = bullet.move( timestamp )
                result && that.handle( result, len )
            }

            that.animationID = requestAnimationFrame( frame )
        }

        this.animationID  = requestAnimationFrame( frame )
    }
}

/**
 * 子弹
 */
function Bullet( config ) {
    this.context = config.context
    this.channel = config.channel
    this.init()
}

Bullet.prototype = {
    constructor: Bullet,

    tmpl: '<div><i></i><span></span></div>',

    init: function() {
        var el

        DUMMY.innerHTML = this.tmpl
        el = this.el    = DUMMY.firstChild
        this.contentEl  = el.getElementsByTagName( 'span' )[ 0 ]
        this.iconEL     = el.getElementsByTagName( 'i' )[ 0 ]
        this.context.$el.append( el )
    },

    /**
     * 初始化和子弹运动有关的属性
     * @param content 子弹内容
     * @param type    子弹类型
     */
    initAttr: function( content, type ) {
        var speedRatio, style, width, left, dist,
            r            = Math.random().toFixed( 2 ),
            el           = this.el,
            iconEL       = this.iconEL,
            ctx          = this.context,
            ctxWidth     = ctx.width,
            topOffset    = r * ctx.channelOffset,
            contentEl    = this.contentEl,

            /**
             * 子弹类型是否改变
             * 如果类型没有变化，就没有必要修改元素的 className
             * 绝大部分情况下，子弹都是 normal 类型
             */
            isTypeChange = this.oldType !== type,

            /**
             * 红包上有『点击我有惊喜』的图标，宽度和红包差不多，要额外计算在内
             */
            ratio        = type == BONUS ? 2 : 1

        if ( type == NORMAL ) {
            isTypeChange && ( el.className = 'bullet' )
            //iconEL.className = 'balloon-' + ( 1 + ( r * 3 ) << 0 )
        } else if ( type == MINE && isTypeChange ) {
            el.className     = 'bullet-m'
            //iconEL.className = 'balloon-m'
        } else if ( type == OFFICIAL && isTypeChange ) {
            el.className     = 'bullet-o'
        } else if ( type == BONUS ) {
            el.className     = 'bullet-b bonus-' + ( ( r * 3 ) << 0 )
            //iconEL.className = ''
        }

        this.type = type
        signaleEl.innerHTML = contentEl.innerHTML = content
        style = this.style = this.style || el.style

        /*
         这里使用 signaleEl 似乎并没有性能提升
         */
        this.width = width = type == BONUS ?
        this.bonusWidth || ( this.bonusWidth = el.offsetWidth ) :
            signaleEl.offsetWidth

        /**
         * 子弹初始化完毕后，top 是不会发生变化的
         * 设置 left 是为了控制 translate 的原点
         *
         * 自己发的子弹要尽快出现，所以不设置 left
         */
        left = this.left = type == MINE ? ctxWidth : ( ctxWidth + r * width )

        this.stylePrefix = 'left:' + left + 'px;top:' +
        ( this.channel * ctx.channelHeight + topOffset ) + 'px;'

        style.cssText = this.stylePrefix +
        vendorTransform.join( left )

        dist = this.dist = -1 * ( ratio * width + left )

        /**
         * 速度
         * 红包在 1 秒钟内飞过屏幕
         * 因为 dist 是负值，所以速度也是负的，方便计算
         *
         * 速度是尝试出来的，没有什么规律
         */
        if ( type == BONUS ) {
            el.setAttribute( 'data-action', BONUS )
            this.speed = dist / 1800
        } else {
            el.removeAttribute( 'data-action' )
            this.speed = -.2
        }

        /**
         * 避免弹幕出现过快导致太多重叠
         */
        this.next      = -1 * ( r * ctxWidth * 1.15 + width )
        this.oldType   = type
        this.passNext  = false
        this.startTime = 0
    },

    /**
     * 移动子弹
     */
    move: function( timestamp ) {
        var left

        this.startTime || ( this.startTime = timestamp )

        left = this.left = this.speed * ( timestamp - this.startTime )

        this.style.cssText = this.stylePrefix +
        vendorTransform.join( left )

        if ( left <= this.dist ) {
            return 'end'
        } else if ( !this.passNext && left <= this.next ) {
            this.passNext = true
            return 'next'
        }
    }
}

/**
 * 弹层
 */
function Panel( el ) {
    this.$el      = el //弹层
    this.title    = DOC.getElementById( 'panel-title' )
    this.desc     = DOC.getElementById( 'panel-desc' )
    this.okBtn    = DOC.getElementById( 'hide-panel-btn' )
    this.shareBtn = DOC.getElementById( 'share-panel-btn' )
}

Panel.prototype = {
    constructor: Panel,

    config: {
        success: {
            ok: '我要低调',
            share: '炫耀一下',
            desc: [
                '人品要不要这么好 超开森耶 ~',
                '偶买噶 开心cry思密达！',
                '托水瓶座の好运呐  ≥▽≤',
                '买买买才是人生头等大事嘛',
                '好运挡都挡不住 真吐艳～'
            ]
        },

        fail: {
            ok: '我要低调',
            share: '吐槽一下',
            title: '矮油  就差一点儿> <',
            desc: [
                '快呼唤水瓶星人来江湖救急！~',
                '人品好像不够用了喂！',
                '你造么~集齐十个空瓶可以召唤神兽',
                '表不开心啦~ 我煮面给你次好么',
                '眼睛要花啦 快去做眼保健操',
                '这个水瓶君是来打酱油哒 不要乱戳伦家啦',
                '水瓶君穿的衣服口袋太小 放不下红包~',
                '矮油 又被你抓到啦 木有钱 求放过',
                '也许下一只瓶纸就有啰 满含希望',
                '戳的太重啦 水瓶君被戳死了= ='
            ]
        }
    },

    /**
     * 显示弹层
     * 处理文案
     * @param type  success 中奖， fail 没中奖
     * @param id    奖品 id
     */
    show: function( type, id ) {
        var money, title,
            config   = this.config[ type ],
            desc     = config.desc,
            shareBtn = this.shareBtn,
            face     = 'face' + Math.floor( Math.random() * 3 +1 ),
            $face    = $('#panel').find('.wrapper')

        this.okBtn.innerHTML = config.ok
        shareBtn.innerHTML   = config.share
        shareBtn.setAttribute( 'data-type', type )

        if ( id ) {
            title = '哇 ' + lotteryData.awards[ id ].awardname + '!'
            //money = title.match( /\d+/ )[ 0 ]
            shareBtn.setAttribute( 'data-money', title )
            $face.addClass('wow')
        } else {
            title = config.title
            shareBtn.removeAttribute( 'data-money' )
            $face.addClass(face)
        }

        this.title.innerHTML = title
        this.desc.innerHTML  = desc[ parseInt( Math.random() * desc.length ) ]

        this.$el.show()
        this.$el[ 0 ].className = 'panel-' + type
    },

    hide: function() {
        this.$el.hide()
        $danmu.trigger( EVE_RESTORE )
    }
}

/**
 * 初始化
 */
;(function() {
    var msgIndex, msgLength, oMsgLength, msgNextPoint, isRequestMsg, i, j, k, step, msgType, len, item,
        initClientHeight = DOCELEMENT.clientHeight,
        shareObj         = {},
        params           = LOCATION.search,
        fixShareCallback = function() {
            $danmu.trigger( EVE_RESTORE )
            setTimeout( function() {
                danmaku.checkIdleChannels()
            }, 1000 )
        },
        callback         = function() {
            $wxTips.hide()
            fixShareCallback()
        }

    /**
     * 初始化微信分享状态
     */
    if ( isWeixinBrowser ) {
        params = params.replace( /^\?/, '' ).split( '&' )
        i      = 0
        len    = params.length

        for ( ; i < len; i++ ) {
            item = params[ i ].split( '=' )
            shareObj[ item[ 0 ] ] = item[ 1 ]
        }

        Share = {
            normal: function() {
                $wxTips.show()
                WXShare.init( {
                    'img_url': WX_SHARE_PIC,
                    'link': WX_SHARE_URL,
                    'desc': WX_SHARE_TEXT,
                    'title': WX_SHARE_TEXT,
                    'appid': WX_APPID
                }, callback, callback )
            },

            success: function( money ) {
                var text = WX_SHARE_TEXT_SUC.replace( '$', money )
                $wxTips.show()

                WXShare.init( {
                    'img_url': WX_SHARE_PIC,
                    'link': WX_SHARE_URL,
                    'desc':  text,
                    'title': text,
                    'appid': WX_APPID
                }, callback, callback )
            },

            fail: function() {
                $wxTips.show()
                WXShare.init( {
                    'img_url': WX_SHARE_PIC,
                    'link': WX_SHARE_URL,
                    'desc': WX_SHARE_TEXT_FAIL,
                    'title': WX_SHARE_TEXT_FAIL,
                    'appid': WX_APPID
                }, callback, callback )
            }
        }

        WXShare.init( {
            'img_url': WX_SHARE_PIC,
            'link': WX_SHARE_URL,
            'desc': WX_SHARE_TEXT,
            'title': WX_SHARE_TEXT,
            'appid': WX_APPID
        }, callback, callback )

        shareObj.from === 'timeline' && Tracking.cr( 'barrage_from_share' )
    } else if ( isMeilishuoApp ) {
        Share = {
            normal: function() {
                ShareTo.shareToPengYouQuan( {
                    title: WX_SHARE_TEXT,
                    pic:   WX_SHARE_PIC,
                    url:   WX_SHARE_URL
                } )
                fixShareCallback()
            },

            success: function( money ) {
                ShareTo.shareToPengYouQuan( {
                    title: WX_SHARE_TEXT_SUC.replace( '$', money ),
                    pic:   WX_SHARE_PIC,
                    url:   WX_SHARE_URL
                } )
                fixShareCallback()
            },

            fail: function() {
                ShareTo.shareToPengYouQuan( {
                    title: WX_SHARE_TEXT_FAIL,
                    pic:   WX_SHARE_PIC,
                    url:   WX_SHARE_URL
                } )
                fixShareCallback()
            }
        }
    } else {
        /**
         * 非微信或 app 环境，直接提示文案
         */
        Share = {}
        Share.normal = Share.success = Share.fail = function() {
            alert( DEFAULT_SHARE_TEXT )
        }
    }

    /**
     * 刷新页面
     */
    function pageReload() {
        LOCATION.reload()
    }

    /**
     *  检测是否输入关键字
     */
     function keywordDetector(msg){
        var p, index, result, imgData, data, flag = false, Result = {}, Sort = []
        for( p in keywords ){
            keywords[p].forEach(function (v){ 
                index = msg.indexOf(v)
                if( index >= 0 ){
                    flag = true
                    Result[ index ] = p
                    Sort.push( index )
                }
            })
        }
        if(flag){
            result  = Result[ Math.min.apply( Math, Sort ) ]
            imgData = images[ result ] 
            data    = { 
                'imgSrc'      : imgData.img,
                'flakeWidth'  : imgData.width,
                'flakeHeight' : imgData.height
            };
            if( result == 'bird' ){ 
                data.isFlyBird = true;
            }
            Fall.go(data)
        }

     }

    EventHandlers = {
        /**
         * 红包
         */
        bonus: function( el ) {
            /**
             * 未登录/红包已经打开过
             */
            if ( !Tools.login() || el.hasClass( BONUS_CLICKED ) ) {
                return
            }

            $danmu.hasClass( BONUS_GLOBAL_CLICKED ) || $danmu.addClass( BONUS_GLOBAL_CLICKED )
            Tracking.cr( 'barrage_bonus_click' )
            el.addClass( BONUS_CLICKED )

            //发请求验证是否中奖
            $.getJSON( URL_DANMAKU_LOTTERY, {
                act: 'set',
                activity_id: DANMAKU_ACTIVITY_ID
            }, function( data ) {
                el.addClass( BONUS_OPENED )
                /**
                 * 中奖/未中奖的分享
                 */
                var state, id = 0

                if ( data.error_code == 1 && ( data = data.data ) && data.award ) {
                    state = 'success'
                    id    = data.award.id
                } else {
                    state = 'fail'
                }

                $danmu.trigger( EVE_PAUSE )
                panel.show( state, id )
            })
        },

        hidePanel: function() {
            panel.hide()
        },

        hideWxTip: function() {
            $danmu.trigger( EVE_RESTORE )
            $wxTips.hide()
        },

        /**
         * 弹层上的分享
         */
        sharePanel: function( el ) {
            panel.hide()
            var type = el.data( 'type' )
            Tracking.cr( 'barrage_share_' + type )
            setTimeout(function (){
                $danmu.trigger( EVE_PAUSE )
                Share[ type ]( el.data( 'money' ) )
            }, 0)
        },

        showRule: function() {
            $rule.show()
        },

        closeRule: function() {
            $rule.hide()
        },

        /**
         * 分享到好友圈
         */
        share: function() {
            Tracking.cr( 'barrage_share_normal' )
            $danmu.trigger( EVE_PAUSE )
            Share.normal()
        },

        /**
         * 提交弹幕信息
         */
        shoot: function() {
            if ( !Tools.login() || !isBtnOn ) {
                return
            }

            var msg = msg || $input.val()

            danmaku.emitMineBullet( msg )
            keywordDetector( msg )
            $input.val( '' )
            $shoot.removeClass( BTN_ON )
            isBtnOn = false

            setTimeout( function() {
                $input[ 0 ].blur()
            }, 0 )

            $.post( URL_POST_MESSAGE, {
                barrage: msg
            }, function( data ) {
                if ( data.error_code ) {
                    Tools.showError( data.message )
                }
            }, 'json' )
        },
        fastShoot: function( el ) {
            if ( !Tools.login() ) {
                return
            }
            var msg = el.text();

            danmaku.emitMineBullet( msg )

            if( el.hasClass('surprice') ){
                keywordDetector( msg )
                el.removeClass('surprice')
                setTimeout( function (){
                    el.addClass('surprice')
                }, 7000 )
            }
            $.post( URL_POST_MESSAGE, {
                barrage: msg
            }, function( data ) {
                if ( data.error_code ) {
                    Tools.showError( data.message )
                }
            }, 'json' )
        },
        fresh: function() {
            //randomIndex = Math.floor( Math.random() * 5 );
            randomIndex = randomIndex % 5;
            $fsBtn1.text(fsBtnText[randomIndex][0]);
            $fsBtn2.text(fsBtnText[randomIndex][1]);
            $fsBtn3.text(fsBtnText[randomIndex][2]);
            randomIndex++;

        }
    }

    Tools = {
        /**
         * 获取更精确的时间
         * https://gist.github.com/Cederfjard/4113434
         */
        getCurrentTime: PERFORMANCE.now ? function() {
            return PERFORMANCE.now()
        } :
            PERFORMANCE.webkitNow ? function() {
                return PERFORMANCE.webkitNow()
            } : (function() {
                return Date.now ? Date.now : function() {
                    return ( new Date ).getTime()
                }
            }()),

        /**
         * 为每颗子弹设置内容
         */
        getMessage: function() {
            (msgIndex >= msgLength + oMsgLength) && ( msgIndex = 0 )
            if ( msgIndex >= msgNextPoint && !isRequestMsg ) {
                this.requestMessage( Tools.getCurrentTime() )
            }
            if(oMsgLength > 0 && msgIndex === 0 ) { 
                msgType = OFFICIAL
            } else {
                msgType = NORMAL
            }
            //return danmakuDatas[ msgIndex++ ]
            return { 'content' : danmakuDatas[ msgIndex++ ], 'type' : msgType }
        },
        /** 合并数组 */
        mergeArray: function() {
            if( oMsgLength === 0 ){ 
                return
            }
            danmakuDatas.unshift( danmakuOfficialDatas[0] )
        },
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

        lastRequestTime: 0,

        /**
         * 向服务器端拉取弹幕内容
         * 避免后端压力，保证获取信息的最小间隔为 MIN_REQUEST_TIMEOUT 秒
         */
        requestMessage: function( timestamp ) {
            var timeout, offset,
                that            = this,
                lastRequestTime = that.lastRequestTime

            if ( timestamp ) {
                if ( ( offset = timestamp - lastRequestTime ) > MIN_REQUEST_TIMEOUT ) {
                    timeout = 0
                } else {
                    timeout = MIN_REQUEST_TIMEOUT - offset
                }
            } else {
                timeout = MIN_REQUEST_TIMEOUT
            }

            setTimeout( function() {
                isRequestMsg = true

                $.ajax( {
                    dataType: 'json',
                    url: URL_REQUEST_MSG,
                    success: function( data ) {
                        /**
                         * TODO 是否需要判断 data.data.info 存在？
                         */
                        if ( data.error_code == 0 ) {
                            danmakuDatas         = data.data.info.user
                            danmakuOfficialDatas = data.data.info.official
                            msgLength            = danmakuDatas.length 
                            oMsgLength           = danmakuOfficialDatas.length
                            msgIndex             = 0
                            msgNextPoint         = msgLength + oMsgLength - MIN_MSG_LEFT
                            Tools.mergeArray();
                        } else {
                            Tools.showError( data.message )
                        }
                    },

                    complete: function() {
                        that.lastRequestTime = Tools.getCurrentTime()
                        isRequestMsg = false
                    }
                } )
            }, timeout )
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

    /**
     * 获取奖品信息
     */
    $.getJSON( URL_DANMAKU_LOTTERY, {
        act: 'get',
        activity_id: DANMAKU_ACTIVITY_ID
    }, function( data ) {

        if ( !data.error_code ) {
            lotteryData = data.data
        }
    })

    $body.on( 'touchstart', '[data-action]', function( e ) {
        var $target = $(e.currentTarget),
            action  = EventHandlers[ $target.data( 'action' )]

        action && action.call( null, $target )
        e.preventDefault()
    }).on( 'touchend', function( e ) {
        /**
         * 点击页面其他位置，收回键盘
         */
        if ( e.target.tagName !== 'input' ) {
            setTimeout( function() {
                $input[ 0 ].blur()
            }, 0 )
        }

        return true
    }).on( 'touchmove', function( e ) {
        /**
         * ios 下点住屏幕，动画停止
         */
        //e.preventDefault()
    })

    /**
     * 『活动规则』还是得要能滚动的
     */
    $rule.find( '.content').on( 'touchmove', function( e ) {
        //e.stopPropagation()
    })

    $input.on( 'input', function() {
        var value = this.value
        if ( value != '' ) {
            if ( !isBtnOn ) {
                isBtnOn = true
                $shoot.addClass( BTN_ON )
            }
        } else {
            isBtnOn = false
            $shoot.removeClass( BTN_ON )
        }
    }).on( 'focus', function() {
        Tools.login()
        setTimeout(function (){
            $win.scrollTop(WIN.innerHeight + ftEl.offsetHeight)
        }, 0)
    })

    /**
     * 手机方向改变就刷新整个页面
     */
    $win.on( 'orientationchange', pageReload )

    /*
     *  登陆成功后的回调函数
     */
    WIN.MLS = {
        didLogin: pageReload
    }

    danmakuDatas = fml.vars.danmakuDatas.user
    danmakuOfficialDatas = fml.vars.danmakuDatas.official
    msgLength    = danmakuDatas.length 
    oMsgLength   = danmakuOfficialDatas.length
    msgIndex     = 0
    msgNextPoint = msgLength + oMsgLength - MIN_MSG_LEFT

    Tools.mergeArray()

    danmaku      = new Danmaku( $( '#stage' ) )
    panel        = new Panel( $( '#panel' ) )

    /**
     * FIXBUG:
     *  Android 下弹出虚拟键盘，会改变 Visual viewport 区域大小，挡住了输入框
     *
     *  Reference:
     *      http://www.quirksmode.org/dom/events/resize_mobile.html
     */
    if ( Meilishuo.config.os.android ) {
        $body[ 0 ].style.cssText = 'position:absolute !important; bottom: 0 !important; min-height:' + initClientHeight + 'px !important;'
        ftEl.style.cssText = 'position:absolute !important; top:' + danmaku.height + 'px !important;'
    }
    if ( Meilishuo.config.os.iphone ){
        $input.on('focus', function (){
            $body.addClass('hack_for_keyboard_bug')
        }).on('blur', function (){
            $body.removeClass('hack_for_keyboard_bug')
        })
    }
})()
