/*common*/

require('wap/zepto/fastclick')
require('wap/page/mainapp/audio')
require('wap/page/mainapp/repin_list')

var $ = require('wap/zepto/touch')
var WXShare = require('wx/share')
var WXSign = require('wx/sign')
var shareTmp = require('wap/component/shareTmp')
var openApp = require('wap/app/openAppCustom')
var openAppLink = require('wap/app/openAppLink')

var $doc = $(document)
var $tags = $('.picture .tag')
var $voiceBtn = $('.voice')
var $imageWrap = $('#imageSlide')
var $image = $imageWrap.find('li')
var $bookmark = $('.bookmark')
var imgAmounts = $image.length
var pageNum = imgAmounts
var wrapWidth = $imageWrap.width()
var basicStep = 20
var _index = 0
var clicked = false
var PLAYING = 'playing'
var IS_PLAYING = 'is-playing'
var shareInfo = fml.vars.shareInfo
var circleId = fml.vars.circleId
var uInfo = fml.vars.uInfo
var $curr, $next, $prev, startX, xStep, p1, p2, p3

;
(function init() {
    $doc.triggerHandler('audio-preload')

    $('.js-banner-ft').on('tap', function() {
        openApp.check(function(isInstalled) {
            var url
            if (isInstalled) {
                url = openAppLink.getAppLink({
                    protocol: 'rich_message',
                    param: {
                        type: 'miscpic',
                        msg_id: fml.vars.msg_id
                    }
                })
            } else {
                if (Meilishuo.config.os.ios) {
                    url = 'http://itunes.apple.com/cn/app/meilishuo/id431023686'
                } else {
                    url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo&g_f=992263'
                }
            }
            window.location.href = url
        })
    })
    if (imgAmounts > 1) {

        if(imgAmounts == 2){
            $image.clone().appendTo($image.parent())
            $image = $imageWrap.find('li')
            imgAmounts += 2
        }

        $imageWrap.on({
            'touchstart': touchStart,
            'touchmove': touchMove,
            'touchend': touchEnd
        })
        prepare()
        $bookmark.show()
        updateBookmark() 
    }
}())

function prepare() {
    rectifier(_index)

    for (var i = 0; i < imgAmounts; i++) {
        $image.eq(i).css('left', -100 * i + '%')
    }

    $image.css({
        '-webkit-transform': 'translate3d(100%,0,0)',
        'transform': 'translate3d(100%,0,0)'
    })
    translate()
}

function rectifier(index) {
    if (index >= imgAmounts) index %= imgAmounts
    if (index < 0) index = imgAmounts - 1

    var pi, ci, ni

    _index = index

    switch (index) {
        case 0:
            ci = index
            pi = imgAmounts - 1
            ni = 1
            break
        case imgAmounts - 1:
            ci = index
            pi = index - 1
            ni = 0
            break
        default:
            ci = index
            pi = index - 1
            ni = index + 1
    }

    $prev = $image.eq(pi)
    $curr = $image.eq(ci)
    $next = $image.eq(ni)
}

function translate(direction) {
    $prev.css({
        '-webkit-transform': 'translate3d(-100%,0,0)',
        'transform': 'translate3d(-100%,0,0)'
    })
    $curr.css({
        '-webkit-transform': 'translate3d(0,0,0)',
        'transform': 'translate3d(0,0,0)'
    })
    $next.css({
        '-webkit-transform': 'translate3d(100%,0,0)',
        'transform': 'translate3d(100%,0,0)'
    })
}

function touchStart(e) {
    e.preventDefault()
    if (!e.touches.length) return
    var touch = e.touches[0]
    startX = touch.pageX
    $image.removeClass('onmove')
}

function touchMove(e) {
    e.preventDefault()

    if (!e.touches.length) return

    var touch = e.touches[0]
    xStep = touch.pageX - startX
    p2 = xStep / wrapWidth * 100
    p1 = -100 + p2
    p3 = 100 + p2

    $prev.css({
        '-webkit-transform': 'translate3d(' + p1 + '%,0,0)',
        'transform': 'translate3d(' + p1 + '%,0,0)'
    })
    $curr.css({
        '-webkit-transform': 'translate3d(' + p2 + '%,0,0)',
        'transform': 'translate3d(' + p2 + '%,0,0)'
    })
    $next.css({
        '-webkit-transform': 'translate3d(' + p3 + '%,0,0)',
        'transform': 'translate3d(' + p3 + '%,0,0)'
    })
}

function touchEnd(e) {
    if (xStep > basicStep) {
        _index--
        $prev.addClass('onmove')
    } else if (xStep < -1 * basicStep) {
        _index++
        $next.addClass('onmove')
    } else {
        translate()
        return
    }

    $curr.addClass('onmove')
    rectifier(_index)
    updateBookmark();
    translate()
}

function updateBookmark() {
    var currPage = $curr.data('index')
    var content = currPage + ' / ' + pageNum
    $bookmark.text(content)
}

/**
 设置微信二次分享
 */
;
(function() {
    WXSign()
    var desc = shareInfo.price ? '售价' + shareInfo.price + '元，美丽说精选优品' : '美丽说精选优品';
    var shareData = {
        title: shareInfo.title,
        desc: desc,
        imgUrl: shareInfo.image
    };

    WXShare.bind(shareData)
}())