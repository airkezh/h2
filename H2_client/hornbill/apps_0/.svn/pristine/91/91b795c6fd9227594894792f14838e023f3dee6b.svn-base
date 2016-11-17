/*common*/
/**
 * @page 群圈分类点击“显示更多”后页面功能，主要分帧加载
 * @author xiaojingwang@meilishuo.com
 * @date 2015-03-20
 * @todo 所有内容都加载完成之后，去掉滚动事件的绑定;
 */

require( 'circle/zepto/fastclick' )
var $              = require( 'circle/zepto' ),
    touchSlide     = require( 'circle/app/touchSlide' ),
    shareTmp       = require( 'circle/component/shareTmp' ),
    scroll         = require( 'circle/component/windowScroll' ),
    cid            = fml.vars.cid,
    posterData     = {
        url: '/aj/circle/get_category',
        type: 'circle',
        poster_frame: 0,
        is_end: false
    }
    , page_size    = 30
    , $pullUp      = $( '.pullUp' )
    , win_h        = $( window ).height()
    , isPosterLoad = false
    , bodyEl       = document.body

if ( fml.vars.type == 'new' ) {
    posterData.url = '/aj/circle/get_newest_list'
} else if ( fml.vars.type == 'promote' ){
    posterData.url = '/aj/circle/get_promote_list'
}

/**
 * @function 滚动侦听，是否加载海报
 */
var scrollPoster = function() {
    function scrollPoster( pos, isDown ) {
        if ( isDown ) {
            pullUp_top = $pullUp[ 0 ].getBoundingClientRect().top
            if ( pullUp_top - 100 <= win_h && !isPosterLoad )
                getData()
        }
    }
    scroll.bind( scrollPoster, 'scrollPoster' )
}

/**
 * @function ajax拉去数据
 */
function getData() {
    if ( posterData.is_end ) return false
    isPosterLoad = true
    $pullUp.attr( 'status', 'loading' )
    $.get( posterData.url, { 'cid': cid, 'frame': posterData.poster_frame, 'page_size': page_size }, addPoster, 'json' )
}

/**
 * @function 将内容append进页面
 */
function addPoster(data) {
    var tpl, $wall = $( '.circle_wall' )

    tpl = shareTmp( 'circlePosterWall', { 'circle': data } )

    $wall.append( tpl )

    isPosterLoad = false
    $pullUp.attr( 'status', 'tap' )
    posterData.poster_frame++

    if ( data.length < page_size ) {
        end()
    }
}

/**
 * @function 结束瀑布流加载
 */
function end() {
    posterData.is_end = true
    $pullUp.attr( 'status', 'stop' )
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
 * @function 回顶部事件绑定
 */
function backToTop() {
    $( '.gotop' ).on( 'click', funScroll )

    var $gotop_wrap = $( '.gotop_wrap' )

    function gotop( pos, isDown ) {
        if ( pos < 400 ) {
            $gotop_wrap.hide()
        } else {
            $gotop_wrap.show()
        }
    }

    scroll.bind( gotop, 'gotop_wrap' )
}

/**
 * @function 回顶部动画
 */
function funScroll() {
    var top   = bodyEl.scrollTop,
        speed = parseInt( top / 20 ),
        animId

    ;(function scroll() {
        top -= speed
        bodyEl.scrollTop = top

        if ( top > 1 ) {
            animId = requestAnimationFrame( scroll )
        } else {
            cancelAnimationFrame( animId )
        }
    })()
}


(function() {

    // // 加载默认的第一类
    getData()

    // // 绑定滚动事件，加载更多
    scrollPoster()


    // // 回顶部初始化
    backToTop()

}())
