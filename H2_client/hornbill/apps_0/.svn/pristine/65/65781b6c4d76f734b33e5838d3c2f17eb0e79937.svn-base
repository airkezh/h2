/*common*/
var $                       = require( 'circle/zepto/touch' ),
    Input                   = require( 'circle/page/chat/input' ),
    Area                    = require( 'circle/page/chat/area' ),
    CheckLogin              = require( 'circle/app/checkLogin' ),

    $win                    = $( window ),
    $doc                    = $( document ),
    $applyBtn               = $( '#apply-btn' ),
    $noticeText             = $( '.js-info-text' ),
    vars                    = fml.vars,
    isIn                    = vars.isIn,
    circleId                = vars.circle_id,
    needWait                = vars.needWait,
    notices                 = vars.notices,
    noticesLen              = notices.length,
    curNoticeIndex          = 0,
    isLoading               = false,

    HAS_INTENT              = 'has-intent',
    HAS_TRIED               = 'has-tried',
    IS_BUSY                 = 'is-busy',
    NOT_IN                  = 'not-in',
    TAP                     = 'tap',
    INFO_TIMEOUT            = 3000,

    sessionStorage          = window.sessionStorage,
    isSupportSessionStorage = !!sessionStorage

Input.init( '.js-input-area' )
Area.init( '.main' )

;
(function checkCSS3Feature() {
    var a              = document.createElement( 'a' ),
        $html          = $( 'html' ),
        style          = a.style,
        webkitBox      = '-webkit-flex',
        webkitClipPath = '-webkit-clip-path:none;'

    style.display = webkitBox
    if ( style.display !== webkitBox ) {
        $html.addClass( 'old-webkit' )
    }

    style.cssText = webkitClipPath
    if ( style.cssText ) {
        $html.addClass( 'support-clip-path' )
    }
}())

/**
 * 轮播显示公告
 */
function displayInfos() {
    if ( noticesLen == 1 ) {
        return
    }

    setTimeout( function() {
        if ( ++curNoticeIndex >= noticesLen ) {
            curNoticeIndex = 0
        }
        $noticeText.html( notices[ curNoticeIndex ] )
        displayInfos()
    }, INFO_TIMEOUT )
}

/**
 * 用户主动点击了进入圈子，如果 ta 没有登录，则在互联登录后自动进入圈子，不必再次点击
 * 这个操作只执行一次，否则会导致在测试的时候无限跳转的问题
 */
function checkRegisterIntent() {
    if ( !isIn && isSupportSessionStorage && sessionStorage.getItem( HAS_INTENT ) ) {
        if ( sessionStorage.getItem( HAS_TRIED ) ) {
            sessionStorage.removeItem( HAS_TRIED )
        } else {
            sessionStorage.removeItem( HAS_INTENT )
            sessionStorage.setItem( HAS_TRIED, 1 )
            $applyBtn.triggerHandler( TAP )
        }
    }
}

/**
 * 隐私浏览模式下，调用 setItem 会报错
 */
function saveRegisterIntent() {
    try {
        !isIn && isSupportSessionStorage && sessionStorage.setItem( HAS_INTENT, '1' )
    } catch ( e ) {
    }
}

!needWait && $applyBtn.on( TAP, function( e ) {
    e.preventDefault()

    if ( isLoading ) {
        return
    }

    if ( !Meilishuo.config.user_id ) {
        $applyBtn.addClass( IS_BUSY )
        saveRegisterIntent()
        CheckLogin()
    }

    isLoading = true

    $.ajax( {
        url: '/aw/circle/join',
        data: {
            'circle_id': circleId
        },
        type: 'POST',
        dataType: 'json',
        success: function( data ) {
            if ( data.error_code == 0 ) {
                $applyBtn.parent().removeClass( NOT_IN )

                $doc.trigger( 'user.join' )
            } else {
                alert( data.message )
            }
        },

        complete: function() {
            isLoading = false
            $applyBtn.removeClass( IS_BUSY )
        }
    } )
} )

displayInfos()
checkRegisterIntent()
