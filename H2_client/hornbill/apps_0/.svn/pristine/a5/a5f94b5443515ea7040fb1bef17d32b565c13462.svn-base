/*common*/
//收银台

require( 'wap/core/3des' )
require( 'wap/core/jsencrypt' )
require( 'wap/core/sha1' )
require( 'wap/core/Base64' )

var $               = require( 'wap/zepto' ),
    ShareTmp        = require( 'wap/component/shareTmp' ),
    EncryptMod      = require( 'wap/page/doota/encrypt' ),
    Confirm         = require( 'wap/ui/confirm' ),

    $body           = $( document.body ),
    $payPrice       = $body.find( '.js-pay-price' ),
    $downloadApp    = $body.find( '.js-download-app' ),
    $deepLink       = $( '#deepLink' ),
    CHECKED         = 'state-check',
    NONE            = 'none',
    NOT_IMPL        = 'js-not-impl',
    order           = fml.vars.order,
    isRequesting    = false,
    $curCheckedBank = $body.find( '.' + CHECKED )

require( 'wap/zepto/fastclick' )

$body.on( 'click', '.js-bank', function() {
    var $el = $( this )

    if ( $el.hasClass( NOT_IMPL ) ) {
        return $downloadApp.removeClass( NONE )
    }

    if ( isRequesting ) {
        return
    }

    if ( !$el.hasClass( CHECKED ) ) {
        $curCheckedBank.removeClass( CHECKED )
        $el.addClass( CHECKED )
        $curCheckedBank = $el

        changeChannel()
    }
} ).on( 'click', '.js-download-btn', function() {
    $downloadApp.addClass( NONE )
    window.open( '/download/latest/?channel=30902%20&frm=baiduwappz_xiazai', '_blank' )
} ).on( 'click', '.js-cancel-btn', function() {
    $downloadApp.addClass( NONE )
} )

function changeChannel() {
    isRequesting = true
    var data     = EncryptMod.encryptData( {
        access_token: order.access_token,
        orderno:      order.orderno,
        merchantcode: order.merchantcode,
        paytype:      $curCheckedBank.data( 'paytype' ),
        pmcode:       $curCheckedBank.data( 'pmcode' ),
        source:       order.source,
        version:      order.version
    }, [] )

    $.ajax( {
        url:      '/aj/doota/cashier/setChannel',
        type:     'post',
        data:     data,
        dataType: 'json',
        success:  function( data ) {
            if ( data.code == '000000' ) {
                $payPrice.html( '￥' + data.info.payamount )
            } else {
                alert( '设置支付渠道出错，请稍后再试。' )
            }
        },
        complete: function() {
            isRequesting = false
        }
    } )
}

$( '#pay' ).on( 'click', function() {
    if ( isRequesting ) {
        return
    }

    if ( !$curCheckedBank.length ) {
        return alert( '请选择支付渠道' )
    }

    var data = {
        'orderno':      order.orderno,
        'merchantcode': order.merchantcode,
        'source':       order.source,
        'version':      order.version,
        'payamount':    $payPrice.html().slice( 1 ),
        'terms':        3,
        'usedamount':   '',
        'password':     '',
        'paytype':      $curCheckedBank.data( 'paytype' ),
        'pmcode':       $curCheckedBank.data( 'pmcode' ),
        'bankcode':     $curCheckedBank.data( 'bankcode' )
    }

    data              = EncryptMod.encryptData( data, [ 'password' ] )
    data.access_token = order.access_token

    $.ajax( {
        url:      '/aj/doota/cashier/pay',
        data:     data,
        type:     'post',
        dataType: 'json',
        success:  function( data ) {
            if ( data.code == '000000' ) {
                var url = data.info.body

                if ( data.info.bankcode == 'WECHAT' ) {

                    $deepLink.attr( 'href', url )
                    //不知道为什么需要执行两遍，但是就神奇的能调起微信了~
                    $deepLink.click()
                    $deepLink.click()
                } else {
                    //使用 window.open() 会被浏览器阻止掉
                    return location.href = url
                }

                new Confirm( {
                    confirmTxt: '已付款',
                    cancelTxt:  '未付款',
                    content:    '<h3>注意</h3>请在新打开的页面上完成支付，支付完成前不要关闭此窗口',
                    onSure:     function() {
                        location.href = '/order/list/'
                    }
                } )
            } else {
                alert( data.message )
            }
        },

        fail: function() {
            alert( '网络请求出错，请稍后重试。' )
        }
    } )
} )
