/*common*/
/**
 * @page 群圈页面功能，主要分帧加载
 * @author yunqian@meilishuo.com
 * @date 2015-02-06
 * @todo 所有内容都加载完成之后，去掉滚动事件的绑定；tab切换的时候回顶部加动画效果
 * @TODO 页面存在大量 Hack！亟需重构。
 */

require( 'circle/zepto/fastclick' )

var $              = require( 'circle/zepto/deferred' ),
    touchSlide     = require( 'circle/app/touchSlide' ),
    shareTmp       = require( 'circle/component/shareTmp' ),
    scroll         = require( 'circle/component/windowScroll' ),
    goTop          = require( 'circle/component/gotop' ),
    tab_url        = {
        'all': {
            url: '/aj/circle/get_all_list',
            type: 'circle',
            poster_frame: 0,
            is_end: false
        },
        'join': {
            url: '/aj/circle/get_my_join_list',
            type: 'circle',
            poster_frame: 0,
            is_end: false
        },
        'promote': {
            type: 'circle',
            poster_frame: 0,
            is_end: false,
            name: 'promote'
        },
        'hot': {
            url: '/aj/circle/get_suggest_item_list',
            type: 'item',
            poster_frame: 0,
            is_end: false
        }
    },

    bodyEl         = document.body,
    $body          = $( bodyEl ),

    posterData     = tab_url[ $( '.active' ).data( 'tab' ).split( ' ' )[ 0 ] ]
    , page_size    = 30
    , $pullUp      = $( '.pullUp' )
    , win_h        = $( window ).height()
    , isPosterLoad = false,

    categoryURL    = '/aj/circle/get_category?cid=',

    promoteCircles = [
        {
            name: '最佳推荐圈',
            url: '/aj/circle/get_promote_list',
            type: 'promote'
        }, {
            name: '最佳新晋圈',
            url: '/aj/circle/get_newest_list',
            type: 'new'
        }, {
            name: '时尚服装圈',
            url: categoryURL + '1',
            type: 'cat',
            cid: '1'
        }, {
            name: '珠宝配饰圈',
            url: categoryURL + '2',
            type: 'cat',
            cid: '2'
        }, {
            name: '美妆个护&海淘圈',
            url: categoryURL + '3,4',
            type: 'cat',
            cid: '3,4'
        }, {
            name: '鞋包圈',
            url: categoryURL + '5,6',
            type: 'cat',
            cid: '5,6'
        }, {
            name: '生活方式圈',
            url: categoryURL + '7,8,9,10,11',
            type: 'cat',
            cid: '7,8,9,10,11'
        }, {
            name: '发现更多好圈',
            url: categoryURL + '0',
            type: 'cat',
            cid: '0'
        }
    ],

    columns        = [ { top: 0 }, { top: 0 } ],
    gap            = 8,
    topGap         = 8,
    curColumn      = 0,
    columnWidth    = parseInt( ( $( document ).width() - 3 * gap ) / 2 ),
    curHeight      = 0,
    $circleWall

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
 * @function 结束瀑布流加载
 */
function end() {
    posterData.is_end = true
    $pullUp.attr( 'status', 'stop' )
}

/**
 * @function ajax拉去数据
 */
function getData() {
    if ( posterData.name == 'promote' ) {
        $pullUp.attr( 'status', 'loading' )
        return fetchPromoteData();
    }

    if ( posterData.is_end ) return false
    isPosterLoad = true
    $pullUp.attr( 'status', 'loading' )
    $.get( posterData.url, { 'frame': posterData.poster_frame, 'page_size': page_size }, addPoster, 'json' )
}

/**
 * @function 将内容append进页面
 */
function addPoster( data ) {
    var tpl, $wall = $( '.circle_wall' ), $tiles

    if ( posterData.type == 'item' ) {
        tpl = shareTmp( 'itemPosterWall', { 'items': data.tInfo } )
    } else {
        tpl = shareTmp( 'circlePosterWall', { 'circle': data } )
    }

    $wall.append( tpl )

    $tiles = $wall.find( '.js-tile' )

    if ( $tiles.length ) {
        layoutTile( $tiles )
    }

    isPosterLoad = false
    $pullUp.attr( 'status', 'tap' )
    posterData.poster_frame++

    if ( data.length < page_size ) {
        end()
    }
}

function layoutTile( $els ) {
    var curCol

    $els.forEach( function( el ) {
        var $el = $( el )

        curCol = columns[ curColumn ]

        if ( curCol.top > columns[ 1 - curColumn ].top ) {
            curColumn = 1 - curColumn
            curCol    = columns[ curColumn ]
        }

        $el.css( {
            width: columnWidth,
            left: ( curColumn + 1 ) * gap + curColumn * columnWidth,
            top: curCol.top
        } )

        curCol.top += topGap + $el.height()
    } )

    curHeight = Math.max( columns[ 0 ].top, columns[ 1 ].top )

    if ( !$circleWall ) {
        $circleWall = $( '.js_circle_wall' )
        $circleWall.addClass( 'items-wrap' )
    }

    $circleWall.height( curHeight )
    $els.removeClass( 'js-tile' )
}

/**
 * @function：tab切换
 * @desc：使用DocumentFragment保存每个分类下的内容
 */

function navInit() {
    var $navs       = $( '.nav_in div' ),
        nav_k       = $navs.length
        , fragments = []

    for ( var i = 0; i < nav_k; i++ ) {
        fragments.push( document.createDocumentFragment() )
    }

    $navs.on( 'click', function() {
        var $this    = $( this ),
            $active  = $( '.active' ),
            now_i    = $this.index(),
            active_i = $active.index(),
            nav_i    = $this.data( 'tab' ).split( ' ' )[ 0 ]

        if ( $this.data( 'tab' ) == 'join' ) {
            if ( !checkLogin() ) {
                return
            }
        }

        if ( $this.hasClass( 'active' ) ) return

        // todo：先回顶部,优化点
        document.body.scrollTop = 0

        posterData = tab_url[ nav_i ]

        if ( posterData ) {
            if ( posterData.is_end ) {
                $pullUp.attr( 'status', 'stop' )
            } else {
                $pullUp.attr( 'status', 'tap' )
            }
        }

        $active.removeClass( 'active' )
        $this.addClass( 'active' )

        if ( $this.attr( 'data-tab' ).indexOf( 'guide' ) != -1 ) {
            $this.attr( 'data-tab', 'newest' );
        }

        fragments[ active_i ].appendChild( $( '.circle_wall' )[ 0 ] )
        if ( fragments[ now_i ].hasChildNodes() ) {
            $pullUp.before( fragments[ now_i ] )
        } else {
            $pullUp.before( '<div class="circle_wall js_circle_wall"></div>' )
            getData()
        }

        if ( posterData && posterData.type == 'item' ) {
            $circleWall = $( '.js_circle_wall' ).height( curHeight ).addClass( 'items-wrap' )
        }
    } )
}

/**
 * @function 回顶部事件绑定
 */
function backToTop() {
    goTop.init( {
        el: '.gotop'
    } )

    var $gotopWrap = $( '.gotop_wrap' )

    scroll.bind( function( pos ) {
        if ( pos < 400 ) {
            $gotopWrap.hide()
        } else {
            $gotopWrap.show()
        }
    }, 'gotop_wrap' )
}

/**
 * @function 回顶部事件绑定
 */
function imageSlide() {
    if ( $( '#imageSlide li' ).length != 0 ) {
        var winWidth      = $( document ).width()
            , slideHeight = 240 * winWidth / 640

        $( "#imageSlide, #imageSlide li" ).width( winWidth ).height( slideHeight + "px" )
        if ( $( '#imageSlide li' ).length > 1 ) {
            $( "#imageSlide" ).touchSlide()
        }
    }
}

/**
 * 获取推荐圈子，目前一共 7 个分类，每个分类展示 6 个圈子。
 */
function fetchPromoteData() {
    if ( !promoteCircles.length ) {
        posterData.is_end = true
        end();
        return
    }

    var len         = 4,
        i           = 0,
        channelNums = promoteCircles.slice( 0, len ),
        channels    = [],
        channelNum

    promoteCircles = promoteCircles.slice( len )

    for ( len = channelNums.length; i < len; i++ ) {
        channelNum = channelNums[ i ]

        channels.push( $.ajax( {
            url: channelNum.url,
            dataType: 'json'
        } ) )
    }

    $.when.apply( $, channels ).then( function() {
        var $wall = $( '.circle_wall' ),
            html  = '',
            i     = 0,
            data, channel

        for ( ; i < len; i++ ) {
            channel = channelNums[ i ]
            data    = arguments[ i ][ 0 ]

            if ( !data.length ) {
                continue;
            }

            /**
             * 最多展示 6 个群
             */
            html += shareTmp( 'promoteCircles', {
                len: Math.min( data.length, 6 ),
                circles: data,
                name: channel.name,
                type: channel.type,
                cid: channel.cid
            } )
        }

        $wall.append( html )
        end()
    } )
}

/**
 * @function 检查是否登录、查看【我】的时候
 */
function checkLogin() {
    if ( !fml.vars.isLogin ) {
        window.location.href = 'meilishuo://login.meilishuo/'
        return false
    }

    return true
}
window.MLS = {
    didLogin: function() {
        window.location.reload();
    },
    didLogout: function() {
        window.location.reload();
    }
}

/**
 * @function 检测是否为iphone 并且 r参数为note-home_toptabs。做 goto 兼容
 * */
function CompatibleIOS() {
    var c1   = fml.vars.r && fml.vars.r.indexOf( 'note-home_toptabs' ) != -1 && $.os.iphone
        , c2 = location.search.indexOf( "inAppTabbar=1" ) != -1;
    if ( c1 || c2 ) {
        $body.addClass( 'has-tabbar' )
        $( '.gotop_wrap' ).css( 'bottom', '60px' );
    }
}
// start
;

(function() {

    // 检查时候登陆
    if ( $( '.active' ).data( 'tab' ) == 'join' ) {
        checkLogin()
    }

    // 初始化tab导航
    navInit()

    // 加载默认的第一类
    getData()

    // 绑定滚动事件，加载更多
    scrollPoster()

    // 点击之后，去掉消息提示
    $( '.js_content' ).on( 'click', 'a', function() {
        $( this ).find( '.msg_num' ).hide()
    } )

    // bannar位图片轮播
    imageSlide()

    // 适配ios
    CompatibleIOS()

    // 回顶部初始化
    backToTop()

}())
