/*common*/
require( 'm/zepto/touch' )

var infoWX            = require( 'wx/info' ),
    connectWX         = require( 'wx/connect' ),
    signWX            = require( 'wx/sign' ),
    shareWX           = require( 'wx/share' ),
    shareTmp          = require( 'm/component/shareTmp' ),
    video             = require( 'm/component/video' ),
    userId            = Meilishuo.config.user_id,

    popmessage        = document.getElementById( 'popmessage' ),
    appmessage        = document.getElementById( 'appmessage' ),

    $body             = $( document.body ),
    $chatPage         = $( '#chatPage' ),
    $messageList      = $chatPage.find( '.messageList' ),
    $morePal          = $chatPage.find( '.morePal' ),
    $input            = $chatPage.find( '.input' ),
    $redMask          = $( '.redMask' ),
    $blueMask         = $( '.blueMask' ),
    $yellowMask       = $( '.yellowMask' ),
    $mobileBtn        = $( '#mobileBtn' ),
    $mobileInput      = $( '#mobileInput' ),
    isIOS             = Meilishuo.config.os.ios,
    sys               = {
        '邓超':   'http://d02.res.meilishuo.net/pic/_o/26/d9/ec5bd7b6ef8f07a7ea630c9d3c25_68_68.cf.jpg',
        '陈赫':   'http://d02.res.meilishuo.net/pic/_o/b8/b4/cbded00343638dabebdb3a870ca2_68_68.ch.jpg',
        '李晨':   'http://d05.res.meilishuo.net/pic/_o/4a/4e/011189b68fabab27070509e6091b_68_68.cg.jpg',
        '郑恺':   'http://d05.res.meilishuo.net/pic/_o/ba/97/6e5da1e8d781163bd35499de1db1_68_68.cg.jpg',
        '王祖蓝':  'http://d02.res.meilishuo.net/pic/_o/b3/6b/3b8e6a4eb7766f80ff2184ff67f1_68_68.cg.jpg',
        'baby': 'http://d01.res.meilishuo.net/pic/_o/26/46/d7ec267b892fe39b6039ec9ece3f_68_68.ch.jpg',
        '鹿晗':   'http://d04.res.meilishuo.net/pic/_o/af/69/d923bcb64d708fe888662a86f3c2_68_68.ch.jpg'
    },
    nicknames         = {
        '邓超':   '学霸',
        '陈赫':   '天才',
        '李晨':   '大黑牛',
        '郑恺':   '小猎豹',
        '王祖蓝':  '蓝蓝',
        'baby': 'BABY',
        '鹿晗':   '小鹿'
    },
    textgap           = 400,
    texttime          = 60,
    isSpeaking        = false,
    isReciveBonus     = false,
    rnumber           = /^\d{11}$/,
    maxImgTimeout     = 100,
    EVENT_TOUCHSTART  = 'touchmove.redmask',
    globalGiftState   = 'done',
    isRequesting      = false,

    BONUS_URL         = 'http://d03.res.meilishuo.net/pic/_o/50/be/2c064664f3790b3c1896196ff0e3_338_145.ch.png',
    VIDEO_PREVIEW_URL = 'http://d05.res.meilishuo.net/pic/_o/2f/b4/50875771ef782489c01981a05480_136_264.ch.png',
    VIDEO_URL         = 'http://i.meilishuo.net/css/images/staticbed/yaoyiyao2.mp4',

    curUser, cardData, imgLoadTimeout, userNickname

connectWX()
if ( Meilishuo.config.os.weixinBrowser ) {
    signWX()
    infoWX( action )

    shareWX.bind( {
        'desc':   fml.vars.CONFIG_SHARE.desc,
        'title':  fml.vars.CONFIG_SHARE.title,
        'imgUrl': fml.vars.CONFIG_SHARE.imgUrl,
        'link':   fml.vars.CONFIG_SHARE.link
    } )
}

//头像预加载
preloadImg()

$chatPage
    .on( 'tap', '.messageList .audio', function() {
        var audio    = document.getElementById( $( this ).attr( 'audio' ) )
            , $audio = $( this )

        audio.onplay  = function() {
            $audio.addClass( 'audioon' )
        }
        audio.onpause = function() {
            $audio.removeClass( 'audioon' )
        }

        if ( $audio.is( '.audioon' ) ) {
            audio.pause()

        } else {
            audio.play()
        }
    } )
    .on( 'tap', '.video', function() {
        video.play( $( this ).attr( 'video' ) )
    } )
    .on( 'tap', '.messageCon>img', function() {
        var url = $( this ).attr( 'src' )

        if ( (/.gif$/g).test( url ) ) return;

        wx.previewImage( {
            current: url,
            urls:    [ url ]
        } );

    } )
    .on( 'tap', '.input', function() {
        var state      = $morePal.attr( 'state' )
            , stateNew = $( this ).attr( 'state' )

        $morePal.attr( 'state', stateNew )
        $chatPage.addClass( 'open' )
        setTimeout( function() {
            var lastEl = $messageList.children().last()[ 0 ]
            lastEl && lastEl.scrollIntoView()
        }, 0 )

        if ( state == stateNew ) {
            closePal()
        }
    } )
    .on( 'tap', '.js-key', function() {
        if ( !isSpeaking ) {
            var key = $( this ).data( 'value' )
            addChats( [ {
                isUser:  true,
                content: key
            } ], function() {
                resetSpeaking()
                handleInput( key )
                closePal()
            } )
        }
    } )
    .on( 'click', '.js-bonus', function( e ) {
        e.stopPropagation()
        closePal()

        if ( !isRequesting ) {
            isRequesting = true

            $.ajax( {
                type:     'get',
                dataType: 'json',
                url:      '/aj/wx_shake/gift/',
                success:  function( res ) {
                    /**
                     * type:
                     *      done 已领取
                     *      ing  可领取
                     *      none 已抢光
                     */
                    if ( res && res.apply_info ) {
                        globalGiftState = res.apply_info.type
                        cardData        = res

                        if ( globalGiftState == 'ing' ) {
                            disableGlobalTouch()
                            $redMask.show()
                        } else if ( globalGiftState == 'none' ) {
                            showMask( $yellowMask )
                        } else {
                            showMask( $blueMask )
                        }
                    } else {
                        globalGiftState = 'done'
                        showMask( $blueMask )
                    }
                },
                complete: function() {
                    isRequesting = false
                }
            } )
        }
    } )

$messageList.on( 'tap', closePal )

$( '.js-mask' ).on( 'click', function( e ) {
    if ( e.target.nodeName.toLowerCase() != 'a' ) {
        $( this ).hide()
    }
} )

$mobileInput.on( 'focus', function() {
    !isIOS && setTimeout( function() {
        $( '.js-bonus' )[ 0 ].scrollIntoView()
    }, 50 )

    $( this )[ 0 ].scrollIntoView()
} )

$mobileBtn.on( 'tap', function() {
    var mobile = $mobileInput.val().trim()

    if ( !mobile || !rnumber.test( mobile ) ) {
        return alert( '请输入正确的手机号码' )
    }

    //记录手机号
    $.ajax( {
        url:      '/aj/wx_shake/record/',
        type:     'get',
        dataType: 'json',
        data:     {
            mobile:    mobile,
            'user_id': userId
        }
    } )

    addCard( cardData.apply_info.card_id, {
        timestamp:   cardData.time_stamp
        , signature: cardData.card_sign
        , nonce_str: cardData.nonce_str
    } )

    enableGlobalTouch()
    $redMask.hide()
} )

//为了防止穿透, 弹窗显示会有一个延迟
function showMask( $el ) {
    $el.parent().show()
}

function resetSpeaking() {
    var lastEl = $messageList.children().last()[ 0 ]
    isSpeaking = false
    lastEl && lastEl.scrollIntoView()
}

function disableGlobalTouch() {
    $body.on( EVENT_TOUCHSTART, function( e ) {
        return false
    } )
}

function enableGlobalTouch() {
    $body.off( EVENT_TOUCHSTART )
}

function addCard( cardId, cardInfo ) {
    wx.addCard( {
        cardList: [ {
            cardId:  cardId,
            cardExt: JSON.stringify( cardInfo )
        } ], // 需要添加的卡券列表
        success:  function() {
        }
    } );
}

function action( data ) {
    fml.vars.camry = data
    userNickname   = data.nickname || ''
    shareWX.bind( {
        'desc':   fml.vars.CONFIG_SHARE.desc,
        'title':  userNickname + fml.vars.CONFIG_SHARE.title,
        'imgUrl': fml.vars.CONFIG_SHARE.imgUrl,
        'link':   fml.vars.CONFIG_SHARE.link
    } )

    ;
    ( new Image ).src = data.headimgurl
    addChats( fml.vars.chat.talking, resetSpeaking )
}

function closePal() {
    $morePal.removeAttr( 'state' )
    $chatPage.removeClass( 'open' )
}

function handleInput( value ) {
    if ( isReciveBonus ) {
        return
    }

    var contents = [ {
        nick:    '鹿晗',
        content: '<div class="js-bonus chat-inner-img"><img src="' + BONUS_URL + '"></div>',
        isImg:   true
    } ]

    if ( value == 'C' ) {
        contents.unshift( {
            nick:    '鹿晗',
            content: '恭喜你，回答正确！姿势摆好，红包收好！'
        } )
    } else {
        contents.unshift( {
            nick:    '鹿晗',
            content: '哎，你答错了，不过我还是给你一个鼓励红包，继续关注跑男吧！'
        } )
    }
    //无论答对答错都给红包
    isReciveBonus = true
    addChats( contents, resetSpeaking )
    closePal()
}

function getChat( message, isuser, isImg ) {
    var data = {
        message: message,
        isImg:   !!isImg
    }

    if ( !isuser ) {
        data.headimgurl = sys[ curUser ]
    }

    data.nickname = curUser in nicknames ? nicknames[ curUser ] : userNickname

    return $( shareTmp( 'chatTpl', data ) )
}

function addChat( data, args ) {
    var time      = 0
        , isuser  = !!data.isUser
        , message = data.content
        , $msg
        , t

    if ( !isuser )
        time = textgap

    if ( typeof args == 'number' )
        time = args

    t = setTimeout( function() {
        var date    = new Date,
            isValid = true,
            img

        curUser = data.nick

        if ( !(/<img|<video|<div|<audio/g).test( message ) ) {
            message = '<p>' + message + '</p>'
        }

        $msg = getChat( message, isuser, data.isImg )
        img  = $msg.find( 'img' )

        if ( img.length ) {
            setTimeout( function() {
                isValid = false
            }, maxImgTimeout )

            img[ 0 ].onload = function() {
                var _this = this

                clearTimeout( imgLoadTimeout )
                imgLoadTimeout = setTimeout( function() {
                    isValid && _this.scrollIntoView()
                }, 50 )
            }
        }

        $msg.appendTo( $messageList )
        $msg[ 0 ].scrollIntoView()
        appmessage.play()

        if ( data.fn ) {
            data.fn()
        }

    }, time )

    return $msg
}

function addChats( chats, cbk ) {
    var timelen = 0,
        ttime

    isSpeaking = true

    chats.forEach( function( v ) {
        var tlen    = 10,
            content = v.content

        if ( v.pic ) {
            //对视频特殊处理
            // video.bind()
            if ( v.pic.match( /mp4$/ ) ) {
                v.content = content = '<div style="margin-left:2px;width: 103px;height: 200px;background:url(' + VIDEO_PREVIEW_URL + ') no-repeat center center;background-size:100%;" class="video" video="video1" url="' + VIDEO_URL + '"></div>'
                v.fn = function() {
                    video.bind()
                }
            } else {
                v.isImg   = true
                v.content = content = '<div class="chat-inner-img"><img src="' + v.pic + '"></div>'
            }
        }

        if ( !(/<img|<video|<div|<audio|<a|shaizi/g).test( content ) ) {
            tlen = content.length

            if ( tlen < 10 ) {
                tlen = 10
            }
        }

        ttime = tlen * texttime

        addChat( v, timelen, ttime )

        timelen += ttime + textgap
    } )

    cbk && setTimeout( cbk, timelen + textgap - ttime )
}

function preloadImg() {
    var u

    for ( u in sys ) {
        if ( sys.hasOwnProperty( u ) ) {
            (new Image()).src = sys[ u ]
        }
    }

    //红包图片
    ;
    (new Image()).src = BONUS_URL
}
