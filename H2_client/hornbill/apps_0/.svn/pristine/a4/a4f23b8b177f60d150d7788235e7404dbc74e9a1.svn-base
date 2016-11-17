/*common*/
/**
 * @page 群圈页面功能，主要分帧加载
 * @author yunqian@meilishuo.com
 * @date 2015-02-06
 * @todo 所有内容都加载完成之后，去掉滚动事件的绑定；tab切换的时候回顶部加动画效果
 */

require('wap/zepto/fastclick')
var $ = require('wap/zepto')
    , touchSlide = require('wap/app/touchSlide')
    , shareTmp = require('wap/component/shareTmp')
    , scroll = require('wap/component/windowScroll')

var tab_url = {
    'all': {url: '/aj/circle/get_all_list', poster_frame: 0, is_end: false}, 'join': {url: '/aj/circle/get_my_join_list', poster_frame: 0, is_end: false}, 'newest': {url: '/aj/circle/get_newest_list', poster_frame: 0, is_end: false}, 'promote': {url: '/aj/circle/get_promote_list', poster_frame: 0, is_end: false}
}
var posterData = tab_url[$('.active').data('tab').split(' ')[0]]
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

    $.get(posterData.url, {'frame': posterData.poster_frame, 'page_size': page_size}, addPoster, 'json')
}

/**
 * @function 将内容append进页面
 */
function addPoster(circle) {
    var tpl = shareTmp('posterWall', {'circle': circle})
    $('.circle_wall').append(tpl)

    isPosterLoad = false
    $pullUp.attr('status', 'tap')
    posterData.poster_frame++

    if (circle.length < page_size) {
        end()
    }
}

/**
 * @function：tab切换
 * @desc：使用DocumentFragment保存每个分类下的内容
 */

function navInit() {
    var nav_k = $('.nav_in div').length
        , fragments = []

    for (var i = 0; i < nav_k; i++) {
        fragments.push(document.createDocumentFragment())
    }

    $('.nav_in div').on('click', function () {
        var $this = $(this)
            , now_i = $this.index()
            , active_i = $('.active').index()
            , nav_i = $this.data('tab').split(' ')[0]

        if ($this.hasClass('active')) return

        // todo：先回顶部,优化点
        document.body.scrollTop = 0

        posterData = tab_url[nav_i]
        if (posterData.is_end) {
            $pullUp.attr('status', 'stop')
        } else {
            $pullUp.attr('status', 'tap')
        }
        $('.active').removeClass('active')
        $this.addClass('active')

        if ($this.attr('data-tab').indexOf('guide') != -1) {
            $this.attr('data-tab', 'newest');
        }

        fragments[active_i].appendChild($('.circle_wall')[0])
        if (fragments[now_i].hasChildNodes()) {
            $pullUp.before(fragments[now_i])
        } else {
            $pullUp.before('<div class="circle_wall js_circle_wall"></div>')
            getData()
        }
    })
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

/**
 * @function 回顶部事件绑定
 */
function imageSlide() {
    if ($('#imageSlide li').length != 0) {
        var winWidth = $(document).width()
            , slideHeight = 240 * winWidth / 640

        $("#imageSlide, #imageSlide li").width(winWidth).height(slideHeight + "px")
        if ($('#imageSlide li').length > 1) {
            $("#imageSlide").touchSlide()
        }
    }
}

/**
 * @function 检查是否登录、查看【我】的时候
 */
function checkLogin() {
    if (!fml.vars.isLogin) {
        window.location.href = 'meilishuo://login.meilishuo/'
    }
}

window.MLS = {
    didLogin: function () {
        window.location.reload();
    },
    didLogout: function () {
        window.location.reload();
    }
}


/**
 * @function 检测是否为iphone 并且 r参数为note-home_toptabs。做 goto 兼容
 * */

function CompatibleIOS() {
    var c1 = fml.vars.r && fml.vars.r.indexOf('note-home_toptabs') != -1 && $.os.iphone
        ,c2 = location.search.indexOf("inAppTabbar=1")!=-1;
    if(c1 || c2){
     $('.gotop_wrap').css('bottom', '60px');
    }
}
// start
;




(function () {

    // 检查时候登陆
    if ($('.active').data('tab') == 'join') {
        checkLogin()
    } else {
        $('.nav_in div').last().one('click', function () {
            checkLogin()
        })
    }

    // 初始化tab导航
    navInit()

    // 加载默认的第一类
    getData()

    // 绑定滚动事件，加载更多
    scrollPoster()

    // 点击之后，去掉消息提示
    $('.js_content').on('click', 'a', function () {
        $(this).find('.msg_num').hide()
    })

    // bannar位图片轮播
    imageSlide()

    // 适配ios
    CompatibleIOS()

    // 回顶部初始化
    backToTop()

}())