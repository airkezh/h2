/*common*/

var $                  = require( 'wap/zepto/touch' ),
    ShareTmp           = require( 'wap/component/shareTmp' ),
    OpenApp            = require( 'wap/app/openAppCustom' ),
    Tracking           = require( 'wap/app/tracking' ),
    CheckLogin         = require( 'circle/app/checkLogin' ),
    SignWX             = require( 'wx/sign' ),
    ShareWX            = require( 'wx/share' ),
    ShareTo            = require( 'wap/app/shareTo' ),
    os                 = Meilishuo.config.os,
    isInApp            = os.mlsApp,
    isInWx             = os.weixinBrowser,

    randomHeadContents = [
        '本喵被摸累了，铲屎官你也歇会儿吧...',
        '本喵已被摸晕在厕所，群红包发完惹~',
        '红包发光啰~今天不准再摸我！<br> o(¯ヘ¯*o)',
        '今日红包已被早到的猫奴们领光咯~ 明天再来喵~',
        '红包一抢而空~本喵如此受欢迎真是伤脑筋~'
    ],

    randomContents     = [
        '不开罐头就来摸我？真他喵的不爽！',
        '你们这些愚蠢的人类！别摸这里！！',
        '把你的脏手拿开！人家也是有尊严的！',
        '正在思考喵生.....警告你不要打扰朕！',
        '我想离家出走，做只自由的喵.... ',
        '摸的这么大力，你的口味太重辣！',
        '本喵高贵冷艳，再怎么摸也不为所动~'
    ],

    bubbleContents     = [
        '摸爽了封你个铲屎大将军！',
        '摸摸伦家的头嘛~',
        '摸摸伦家的耳朵嘛~',
        '敢摸伦家尾巴嘛？',
        '敢摸伦家肉爪嘛？'
    ],

    tipData            = {
        bingo: {
            extra: '6月18日23:59前<br>分享有效',
            btn: '给好友发红包',
            hasClose: true,
            btnHandler: hideTip
        },

        paws: {
            title: '一般般啦',
            content: '你们这些愚蠢的人类！别摸这里！！',
            btn: '我错了',
            btnHandler: hideTip
        },

        head: {
            title: '一般般啦',
            btn: '我错了',
            btnHandler: hideTip
        },

        stomach: {
            title: '愚蠢的人类',
            btn: '我错了',
            btnHandler: hideTip
        },

        ear: {
            title: '愚蠢的人类',
            btn: '我错了',
            btnHandler: hideTip
        },

        tail: {
            title: '一般般啦',
            btn: '我错了',
            btnHandler: hideTip
        }
    },

    $win               = $( window ),
    $html              = $( 'html' ),
    $body              = $( document.body ),

    $tip               = $( '#tip' ),
    $mask              = $( '#mask' ),
    $kitty             = $( '.kitty' ),
    $rule              = $( '#rule' ),
    $wxShareTip        = $( '.js-wx-share-tip' ),
    $kittyNormal       = $( '.js-kitty-normal' ),
    $kittyShock        = $( '.js-kitty-shock' ),
    $bubble            = $( '.bubble' ),

    docWidth           = $( document ).width(),
    ratio              = ( 640 / docWidth ).toFixed( 2 ),
    _offset            = $kitty.offset(),
    kittyTop           = _offset.top,
    kittyLeft          = _offset.left,

    isTipShown         = false,
    SHARE_IMG          = 'http://d02.res.meilishuo.net/pic/_o/ae/ec/2757c3fb71471cd35799bc300220_100_100.cg.jpg',
    SHARE_TEXT         = '红包里都是美丽说直减券哟~大概率 10 元、20 元大额直减券呢!',
    HAS_TIP            = 'has-tip',

    TAP                = 'tap',

    SHARE_TITLE        = '喵主子赐我x个群红包，见者有份！',
    timeoutID

function hideTip() {
    $mask.hide()
    $tip.hide()
    $kittyNormal.show()
    $kittyShock.hide()

    $win.triggerHandler( 'hide-tip' )

    isTipShown = false
}

function renderTip( data, tmpl ) {
    isTipShown = true

    $tip.html( ShareTmp( tmpl || 'tmpl_tip', {
        data: data
    } ) )
        .one( 'touchstart', '.js-btn', data.btnHandler )

    $mask.show()
    $tip.show()
    $win.triggerHandler( 'show-tip' )
}

function handleTouchType( type ) {
    Tracking.cr( 'promotion_groupred', {
        action: 'touchmove',
        name: 'cat',
        area: type
    } )

    var tData   = tipData[ type ]
    tData.kitty = type
    tData.extra = '听说摸喵头有红包拿噢'

    //摸头才有可能得群红包
    if ( type == 'head' ) {
        $.ajax( {
            url: '/aj/mew_lucky/check',
            dataType: 'json',
            timeout: 5000,
            success: function( data ) {
                var code = data.code,
                    _data

                if ( code >= 0 ) {
                    data = data.shareData

                    _data         = tipData.bingo
                    _data.title   = data.title
                    _data.content = data.text
                    _data.bid     = data.bid
                    _data.num     = data.num
                    _data.kitty   = 'bingo'
                    renderTip( _data )
                    //todo 有群红包
                } else if ( code == -1 ) {
                    tData.title   = '不要太贪心哦~'
                    tData.content = '本喵最多给你3个群红包哦，让其他猫奴领赏吧~'
                    renderTip( tData )
                } else {
                    badLuck()
                }
            },

            complete: function() {
                $kittyShock.hide()
            },

            error: badLuck
        } )
    } else {
        tData.content = randomContents[ parseInt( Math.random() * randomContents.length ) ]
        renderTip( tData )
    }

    function badLuck() {
        tData.content = randomHeadContents[ parseInt( Math.random() * randomHeadContents.length ) ]
        renderTip( tData )
    }
}

/**
 * kitty 宽度 580
 *
 * 左耳  40,50
 *      w 120
 *      h 77
 *
 * 右耳 440 31
 *      w 130
 *      h 80
 *
 * 头   184 0
 *      w 260
 *      h 126
 *
 * 肚皮
 *      254, 300
 *      w 105
 *      h 94
 *
 * 左爪
 *      185 330
 *      w 50
 *      h 80
 *
 * 右爪
 *      372 332
 *      w 55
 *      h 85
 *
 * 尾巴
 *      23 278
 *      w 130
 *      h 140
 */
function handleTouch( x, y ) {
    var type

    if ( x >= 40 && x <= 160 &&
        y >= 50 && y <= 128 ) {
        type = 'ear'
    }

    if ( x >= 440 && x <= 570 &&
        y >= 31 && y <= 111 ) {
        type = 'ear'
    }

    if ( x >= 184 && x <= 444 &&
        y >= 0 && y <= 126 ) {
        type = 'head'
    }

    if ( x >= 254 && x <= 359 &&
        y >= 300 && y <= 394 ) {
        type = 'stomach'
    }

    if ( x >= 185 && x <= 235 &&
        y >= 330 && y <= 410 ) {
        type = 'paws'
    }

    if ( x >= 372 && x <= 427 &&
        y >= 332 && y <= 417 ) {
        type = 'paws'
    }

    //后腿
    if ( x >= 156 && x <= 216 &&
        y >= 446 && y <= 500 ) {
        type = 'paws'
    }

    if ( x >= 395 && x <= 444 &&
        y >= 460 && y <= 500 ) {
        type = 'paws'
    }

    if ( x >= 23 && x <= 153 &&
        y >= 278 && y <= 418 ) {
        type = 'tail'
    }

    if ( type ) {
        $kittyNormal.hide()
        $kittyShock.show()

        setTimeout( function() {
            handleTouchType( type )
        }, 500 )
    }
}

function convertPosition( x, y ) {
    if ( isTipShown ) {
        return
    }

    clearTimeout( timeoutID )
    timeoutID = setTimeout( function() {
        !isTipShown && handleTouch( ratio * ( x - kittyLeft ),
            ratio * ( y - kittyTop + $win.scrollTop() ) )
    }, 500 )
}

function showBubbleContent() {
    setTimeout( function() {
        var content = bubbleContents[ parseInt( bubbleContents.length * Math.random() ) ]
        $bubble
            .css( 'opacity', 1 )
            .find( '.js-bubble-content' )
            .html( content )

        setTimeout( function() {
            $bubble.css( 'opacity', 0 )
            showBubbleContent()
        }, 3000 )
    }, 3000 )
}

/**
 * 微信分享
 */
function initWxShare() {
    var title,
        from,
        rednum,
        link

    if ( isInWx ) {
        SignWX()

        ShareWX.bind( {
            'imgUrl': SHARE_IMG,
            'title': '快来摸摸喵星人！摸爽了就能得红包~',
            'desc': '红包里都是美丽说直减券哟~大概率10元、20元大额直减券呢！',
            'link': 'http://m.meilishuo.com/wx/mew_lucky/main?frm=wxred_from_share'
        } )
    }

    $body.on( TAP, '.js-share-btn, .js-btn', function() {
        var $el = $( this ),
            bid = $el.data( 'bid' ),
            num = $el.data( 'num' )

        rednum = num
        from   = $el.attr( 'className' ).indexOf( 'js-btn' ) != -1 ? 'pop_layer' : 'goto_reward'

        if ( bid == 0 ) {
            return
        }

        if ( $el.data( 'status' ) == 'normal' ) {
            link  = 'http://m.meilishuo.com/wx/mew_lucky/?frm=wxred_from_share&bid=' + bid
            title = SHARE_TITLE.replace( 'x', num )

            if ( isInWx ) {
                ShareWX.bind( {
                    'imgUrl': SHARE_IMG,
                    'title': title,
                    'desc': SHARE_TEXT,
                    'link': link
                } )

                $wxShareTip.show()
                $win.triggerHandler( 'show-tip' )
            } else if ( isInApp ) {
                renderTip( {
                    btnHandler: hideTip,
                    from: from
                }, 'tmpl_wx_share' )
            } else {
                //todo
            }
        }
    } )

    $wxShareTip.on( TAP, function() {
        $win.triggerHandler( 'hide-tip' )
        $wxShareTip.hide()
    } )

    $body.on( TAP, '.js-share-option-btn', function() {
        var $el  = $( this ),
            type = $el.data( 'type' )

        Tracking.cr( 'promotion_groupred', {
            action: 'qunshare',
            name: type == 'timeline' ? 'pyq' : 'wx',
            rednum: rednum,
            area: from
        } )

        if ( type == 'timeline' ) {
            ShareTo.shareToPengYouQuan( {
                title: title,
                pic: SHARE_IMG,
                url: link,
                text: SHARE_TEXT
            } )
        } else {
            ShareTo.shareToPengYou( {
                title: title,
                pic: SHARE_IMG,
                url: link,
                text: SHARE_TEXT
            } )
        }
    } )
}

function init() {
    CheckLogin()

    $win.on( TAP, '.js-close', function() {
        hideTip()
    } )
        .on( TAP, '.js-rule-btn', function() {
            $win.triggerHandler( 'show-tip' )
            $mask.show()
            $rule.show()
        } )
        .on( TAP, '.js-rule-close-btn', function() {
            $win.triggerHandler( 'hide-tip' )
            $mask.hide()
            $rule.hide()
        } )
        .on( TAP, '.js-use-coupon', function() {
            if ( isInApp || isInWx ) {
                OpenApp.jump( 'http://m-promotion.meilishuo.com/promotion/sale_1506/mv/?frm=qunhongbao' )
            } else {
                location.href = '/download/latest'
            }
        } )
        .on( 'show-tip', function() {
            $html.addClass( HAS_TIP )
        } )
        .on( 'hide-tip', function() {
            $html.removeClass( HAS_TIP )
        } )

    $kitty.on( 'touchstart touchmove', function( e ) {
        var touches = e.touches,
            point, x, y

        if ( touches.length ) {
            point = touches[ 0 ]
            x     = point.clientX
            y     = point.clientY

            convertPosition( x, y )
        }
    } )

    initWxShare()
    showBubbleContent()
}

init()
