/*common*/

var $           = require( 'wap/zepto/touch' ),
    CheckLogin  = require( 'circle/app/checkLogin' ),
    SignWX      = require( 'wx/sign' ),
    ShareWX     = require( 'wx/share' ),
    Tracking    = require( 'wap/app/tracking' ),
    OpenApp     = require( 'wap/app/openAppCustom' ),

    bid         = fml.vars.bid,

    LINK        = 'http://m.meilishuo.com/wx/mew_lucky/?frm=catred_from_goqunred&bid=' + bid,
    SHARE_IMG   = 'http://d02.res.meilishuo.net/pic/_o/ae/ec/2757c3fb71471cd35799bc300220_100_100.cg.jpg',
    SHARE_TITLE = '快来领红包哦~喵大人赏的红包哦~',
    TAP         = 'tap'

CheckLogin()
SignWX()

ShareWX.bind( {
    'imgUrl': SHARE_IMG,
    'title': SHARE_TITLE,
    'desc': '红包里都是美丽说直减券哟~大概率 10 元、20 元大额直减券呢!',
    'link': LINK
} )

$( '.js-download' ).on( TAP, function() {
    OpenApp.check( function( isInstall ) {
        if ( isInstall ) {
            OpenApp.jump( 'http://m-promotion.meilishuo.com/promotion/sale_1506/mv/?frm=cat_myqunred' )
        } else {
            Tracking.cr( 'promotion_groupred', {
                action: 'downloadapp'
            } )
            location.href = '/download/latest'
        }
    })
} )

$( '.js-open-app' ).on( TAP, function() {
    OpenApp.check( function( isInstall ) {
        if ( isInstall ) {
            OpenApp.jump( 'http://m-promotion.meilishuo.com/promotion/sale_1506/sv/?aid=2234&cid=9839&pid=2464&mid=103&nid=5&pstrc=&frm=qunhongbao' )
        } else {
            location.href = '/download/latest'
        }
    })
} )

if ( fml.vars.code == 1 ) {
    $.ajax( {
        url: '/aj/mew_lucky/info',
        data: {
            bid: bid
        },
        dataType: 'json',
        success: function( data ) {
            if ( data.credit ) {
                $( '.js-lucky-num' ).html( '￥<i class="num">' + data.credit + '</i>无门槛' )
            }
        }
    } )
}

if ( fml.vars.isOver ) {
    $( 'html' ).addClass( 'has-tip' )
}
