/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var WXShare = require('wx/share')
var WXSign = require('wx/sign')
var scroll = require('wap/component/windowScroll')
var WaterFall = require('circle/component/biWaterfallPlugin')
var urlHandle = require('wap/component/urlHandle')

var query = urlHandle.getParams(location.href.toString())
var defaultOrder = 'goods_ctime'
var $goTop = $('#gotop')
var $pullUp = $('.pullUp')
var win_h = $(window).height()
var data = {
        'shop_id': fml.vars.shopId,
        '_orderby': defaultOrder,
        'limit': 15
    }

/**
 * 设置微信二次分享
 * @focus  biWaterfallPlugin组件会动态改变页面url，需将验证（WXSign）置于组件之前
 * @reason 微信分享会先进行一次权限验证，当页面url变化会导致验证失败
 */

WXSign()
var shareData = {
    title: fml.vars.shopName,
    desc: '这是我的美丽微店，欢迎你进来逛逛，好货多多，进店有惊喜哦！',
    imgUrl: fml.vars.shopLogo
};

WXShare.bind(shareData)

/* 埋点参数 pstrc */
if (query.pstrc) data.pstrc = query.pstrc

var waterfallInstance = WaterFall.init({
    el: '#goods_wall',
    url: '/aj/shop/shop_main',
    tmpl: 'posterWall',
    colGap: '20 5',
    hasSideGap: true,
    colNum: 2,
    data: data,
    dataName: 'gInfo',
    dataFilter: dataFilter,
    canFetch: Scroll,
    onFetchSuccess: onFetchSuccess
})

//回到顶部
$goTop.on('click', function() {
    $.scrollTo({
        endY: 0,
        duration: 300
    })
})
scroll.bind(goTop, 'gotop')

function goTop(pos, isDown) {
    if (!isDown && pos > 100) {
        $goTop.show()
    } else {
        $goTop.hide()
    }
}

function Scroll(scrollTop) {
    var win_t = scrollTop + win_h

    if ($pullUp.offset().top - 300 <= win_t) {
        return true
    }
}

function dataFilter(data) {
    fml.vars.pstrc = data.pstrc
    return data.gInfo
}

function onFetchSuccess(data) {
    if (!data.length) {
        $pullUp.attr('status', 'stop')
        waterfallInstance.destroy()
    }
}
