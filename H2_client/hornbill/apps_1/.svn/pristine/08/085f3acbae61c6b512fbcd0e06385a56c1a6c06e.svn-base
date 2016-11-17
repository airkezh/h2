/*common*/
var shareTmp     = require( 'circle/component/shareTmp' ),
    $            = require( 'circle/zepto/touch' ),
    WXShare      = require( 'wx/share' ),
    WXSign       = require( 'wx/sign' ),
    shopID       = fml.vars.shop_id,
    circleID     = fml.vars.circle_id,
    circleInfo   = fml.vars.circle_info,
    $pullUp      = $( '.pullUp' ),
    isPosterLoad = false,
    $goodsWall   = $( '.js-goods-wall' )

require( 'circle/page/tagshow' )

//得到圈子中的商品
function getPosterData() {
    isPosterLoad = true
    $pullUp.attr( 'status', 'loading' )
    $.ajax( {
        url: '/aj/circle/get_goods_list',
        data: {
            circle_id: circleID,
            goods_status: 1,
            limit: 6
        },
        type: 'get',
        dataType: 'json',
        success: function( data ) {
            addPoster( data );
        },
        error: function() {
            alert( '系统繁忙，请稍后再试' );
        }
    } )
}

/**
 * @function 将内容append进页面
 */
function addPoster( poster ) {
    var tpl = shareTmp( 'posterWall', { 'poster': poster.list } )
    $goodsWall.append( tpl )
    if ( poster.list.length == 0 ) {
        $goodsWall.hide()
    }
    isPosterLoad = false
    $pullUp.hide()
}

//店铺 id 为 0，就不发送请求
if ( shopID != 0 ) {
    getPosterData()
} else {
    $goodsWall.hide()
}

$( '#wei-btn' ).on( 'tap', function( e ) {
    var url

    e.preventDefault()
    e.stopPropagation()

    if ( Meilishuo.config.os.ios ) {
        url = 'http://itunes.apple.com/cn/app/meilishuo/id977898163'
    } else {
        url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo.circle'
    }

    location.href = url
} )

/**
 设置微信二次分享
 */
;
(function() {
    WXSign()

    var shareText

    if ( circleInfo.admin_id == Meilishuo.config.user_id ) {
        shareText = '大家好，我在美丽说开通了' + circleInfo.name + '圈子，邀请大家一起来边聊边逛'
    } else {
        shareText = '我在美丽说加入了' + circleInfo.name + '买手圈，邀请你一起来玩儿哦～'
    }

    WXShare.bind( {
        title: shareText,
        desc: shareText,
        link: 'http://' + location.host + '/circle/landing?circle_id=' + circleInfo.id,
        imgUrl: circleInfo.img
    } )
}())
