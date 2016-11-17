/*common*/
/**
 * @page 品牌墙二级页面，瀑布流加载方式
 * @author yunqian@meilishuo.com
 * @date 2015-03-03
 */

require('wap/zepto/fastclick')
var $ = require('wap/zepto')
    , shareTmp = require('wap/component/shareTmp')
    , scroll = require('wap/component/windowScroll')
	, query = require('component/urlHandle')
query = query.getParams(window.location.href.toString())

var posterData = {url : '/aj/promote/brand_get', 'poster_frame' : 1, 'page_size':24}
    , page_size = 30
    , $pullUp = $('.pullUp')
    , win_h = $(window).height()
    , isPosterLoad = false

/**
 * @function 滚动侦听，是否加载海报
 */
var scrollPoster = function () {
    function scrollPoster(pos, isDown) {
        if (isDown) {
            pullUp_top = $pullUp[0].getBoundingClientRect().top
            if (pullUp_top - 100 <= win_h && !isPosterLoad)
                getData()
        }
    }

    scroll.bind(scrollPoster, 'scrollPoster')
}

/**
 * @function 结束瀑布流加载
 */
function end() {
    posterData.is_end = true
    $pullUp.attr('status', 'stop')
}

/**
 * @function ajax拉去数据
 */
function getData() {
    if (posterData.is_end) return false
    isPosterLoad = true
    $pullUp.attr('status', 'loading')

    $.get(posterData.url, {'frame': posterData.poster_frame, 'page_size': page_size, 'brand_id': query.brand_id}, addPoster, 'json')
}

/**
 * @function 将内容append进页面
 */
function addPoster(poster_data) {
    var tpl = shareTmp('posterWall', {'tInfo': poster_data.tInfo})
    $('.goods_wall').append(tpl)

    isPosterLoad = false
    $pullUp.attr('status', 'tap')
    posterData.poster_frame++

    if (poster_data.tInfo.length < page_size) {
        end()
    }
}


/**
 * @function 兼容requestAnimationFrame方法
 */
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}())

/**
 * @function 回顶部动画
 */
var gototop = ''
function funScroll() {
    var top = document.body.scrollTop
    top -= 100
    if (top <= 1) {
        top = 0
        cancelAnimationFrame(gototop)
    } else {
        gototop = requestAnimationFrame(funScroll)
    }
    document.body.scrollTop = top
}

/**
 * @function 回顶部事件绑定
 */
function backToTop() {
    $('.gotop').on('click', funScroll)

    var $gotop_wrap = $('.gotop_wrap')

    function gotop(pos, isDown) {
        if (pos < 400) {
            $gotop_wrap.hide()
        } else {
            $gotop_wrap.show()
        }
    }

    scroll.bind(gotop, 'gotop_wrap')
}
// start
;
(function () {
    // 加载默认的第一类
    getData()

    // 绑定滚动事件，加载更多
    scrollPoster()

    // 回顶部初始化
    backToTop()

}())
