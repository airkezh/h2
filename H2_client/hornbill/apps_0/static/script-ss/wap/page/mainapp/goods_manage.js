/*common*/

var $                     = require( 'wap/zepto/touch' )
    , shareTmp            = require( 'wap/component/shareTmp' )
    , scroll              = require( 'wap/component/windowScroll' )
    , openAppLink         = require( 'wap/app/openAppLink' )
    , GoTop               = require( 'wap/component/gotop' )
    , $doc                = $( document )
    , $tabs               = $( '.nav [data-tab]' )
    , $allWall            = $( '.wall' )
    , $emptyWall          = $( '.empty' )
    , $emptyDesc          = $( '.empty .desc' )
    , curTabName          = ''
    , oldTabName          = ''
    , $curWall
    , $addBtn             = $( '.add-goods ' )
    , supportReplaceState = false
    , legalTab            = {
        'selling': 1,
        'remove': 1
    }
    , tabUrl              = {
        'selling': {
            goodStatus: 1,
            posterFrame: 0,
            isEnd: false,
            isEmpty: false,
            isLoading: false
        },
        'remove': {
            goodStatus: 2,
            posterFrame: 0,
            isEnd: false,
            isEmpty: false,
            isLoading: false
        }
    }
    , posterData
    , LIMIT               = 10
    , $pullUp             = $( '.js-pull-up' )
    , winH                = $( window ).height()
    , bodyEl              = document.body


function getAppLink( protocol, params ) {
    return openAppLink.getAppLink( {
        protocol: protocol,
        param: params
    } )
}

function getGoodsList( targetTab ) {
    posterData = tabUrl[ targetTab ];
    //如果这个tab下已经没有可请求的数据或当前还有一个ajax在请求它的数据，那么就不执行
    if ( posterData.isEnd || posterData.isLoading ) return false
    posterData.isLoading = true;
    $pullUp.attr( 'status', 'loading' );
    $.ajax( {
        url: '/aj/mainapp/my_goods_list',
        data: {
            'goods_status': posterData.goodStatus,
            'offset': posterData.posterFrame * LIMIT,
            'limit': LIMIT
        },
        type: 'get',
        dataType: 'json',
        success: function( data ) {
            callBack( targetTab, data );
        },
        error: function() {
            alert( '系统繁忙，请稍后再试' );
        }
    } )
}


function callBack( targetTab, data ) {
    posterData = tabUrl[ targetTab ];
    if ( data.total_num == 0 ) {
        posterData.isEmpty = true;
        posterData.isEnd   = true;
        if ( targetTab == curTabName ) {
            showEmpty( targetTab );
        }
    } else {
        addToWall( targetTab, data );
        posterData.posterFrame++;
        var nextOffset = posterData.posterFrame * LIMIT;
        if ( nextOffset >= data.total_num ) {
            posterData.isEnd = true;
        }
    }
    posterData.isLoading = false;
    $pullUp.attr( 'status', 'tap' );
}

/**
 * @function 将数据塞到对应的模板中
 */
function addToWall( targetTab, data ) {
    var tpl = shareTmp( 'goods-tmpl', { 'list': data.list, getAppLink: getAppLink } )
    $allWall.filter( '.goods-' + targetTab + '-list' ).append( tpl );
}

/**
 * @function 回顶部事件绑定
 */
function backToTop() {
    var $gotop_wrap = $( '.js-gotop-wrap' )
    scroll.bind( function( pos, isDown ) {
        if ( pos < 400 ) {
            $gotop_wrap.hide();
        } else {
            $gotop_wrap.show();
        }
    }, 'gotop_wrap' );
}

/**
 * @function 滚动侦听，是否加载海报
 */
var scrollPoster = function() {
    function scrollPoster( pos, isDown ) {
        if ( isDown ) {
            var pullUpTop = $pullUp[ 0 ].getBoundingClientRect().top;
            if ( pullUpTop - 100 <= winH && !tabUrl[ curTabName ].isLoading );
            getGoodsList( curTabName );
        }
    }

    scroll.bind( scrollPoster, 'scrollPoster' );
}

function curInit( targetTab ) {
    curTabName = targetTab;
    oldTabName = curTabName;
    $curWall   = $allWall.filter( '.goods-' + targetTab + '-list' );
}

//改变history中的链接内容，记录下最后一次被点击的tab
function changeHash( targetTab ) {
    if ( supportReplaceState ) {
        var json = { time: new Date().getTime() };
        window.history.replaceState( json, '', '#' + targetTab );
    }
}

function showResult( targetTab ) {
    $tabs.removeClass( 'active' );
    $tabs.filter( '[data-tab="' + targetTab + '"]' ).addClass( 'active' );
    $allWall.hide();
    $emptyWall.hide();
    if ( tabUrl[ targetTab ].isEmpty ) {
        showEmpty( targetTab );
    } else {
        $curWall.show();
    }
}

function showEmpty( targetTab ) {
    if ( targetTab == 'remove' ) {
        $emptyDesc.html( '没有下架商品' );
        $addBtn.hide();
    } else {
        $emptyDesc.html( '你还没有发布任何商品' );
        $addBtn.show();
    }
    $emptyWall.show();
}


// 初始化tab
function tabInit() {
    var hash    = window.location.hash.substring( 1 );
    var tabName = 'selling';
    if ( hash && legalTab[ hash ] ) {
        tabName = hash;
    }
    curInit( tabName );
}

(function init() {
    tabInit();
    getGoodsList( curTabName );
    showResult( curTabName );
    backToTop();
    // 绑定滚动事件，加载更多
    scrollPoster();
    if ( 'replaceState' in window.history ) {
        supportReplaceState = true;
    }
    $( '.nav' ).on( 'tap', '[data-tab]', function() {
        curTabName = $( this ).data( 'tab' );
        if ( curTabName != oldTabName ) {
            oldTabName = curTabName;
            $curWall   = $allWall.filter( '.goods-' + curTabName + '-list' );
            showResult( curTabName );
            changeHash( curTabName );
            if ( tabUrl[ curTabName ].posterFrame == 0 ) {
                getGoodsList( curTabName );
            }
        }
    } );
    GoTop.init( {
        el: $( '.gotop' ),     // tap 事件会绑定在该元素上,点击后回到顶部
        isImmediate: false // 是否需要立即回到顶部,默认是 false
    } )
}())

/**
 * 操作完商品之后，再次返回到本页面会刷新
 */
document.addEventListener( 'visibilitychange', function() {
    !document.hidden && location.reload()
} )
