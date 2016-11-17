/*common*/
require( 'wap/zepto/touch' )
require( 'wap/page/mainapp/audio' )

var ShareTmp         = require( 'wap/component/shareTmp' ),
    WindowScroll     = require( 'wap/component/windowScroll' ),
    GoTop            = require( 'wap/component/gotop' ),
    OpenAppLink      = require( 'wap/app/openAppLink' ),
    ShareTo          = require( 'wap/app/shareTo' ),
    LimitRangeToggle = require( 'wap/component/limitRangeToggle' ),
    Like             = require( 'wap/component/like' ),

    $win             = $( window ),
    $html            = $( 'html' ),
    $doc             = $( document ),
    $tabs            = $doc.find( '.js-tab' ),
    $contents        = $doc.find( '.js-content' ),
    $loadingBar      = $( '#loading-bar' ),
    $share           = $( '.share' ),
    $wShare          = $( '.wShare' ),
    winHeight        = $win.height(),
    documentHeight   = $doc.height(),
    initTopOffset    = $contents.position().top,

    /**
     * isLock: 表示锁定当前 tab，不对 tap 事件产生响应
     * isInit: 标签是否初始化完成
     * isEnded: 是否没有更多数据，如果为 true，则不响应滚动事件
     */
    tabConfig        = {
        'tab-a': {
            name: 'tab-a',
            url: '/aj/mainapp/tranCircle?type=left',
            offset: 0,
            $tab: $tabs.eq( 0 ),
            $content: $contents.eq( 0 )
        },

        'tab-b': {
            name: 'tab-b',
            url: '/aj/mainapp/tranCircle?type=right',
            offset: 0,
            $tab: $tabs.eq( 1 ),
            $content: $contents.eq( 1 )
        }
    },

    layoutBoxes      = {},

    /**
     * 『回到顶部』动作是否正在执行，在此期间不执行 LimitRangeToggle
     * @type {boolean}
     */
    isGotopRunning   = false,

    ACTIVE           = 'active',
    HEIGHT           = 'height',
    MIN_OFFSET       = 3 * winHeight,
    NAME             = 'name',
    LAYOUTED         = 'is-layouted',
    IS_LIKE          = 'is-like',
    NOT_LIKE         = 'not-like',
    IMG_LOAD_EVENT   = 'img.loaded',
    LOAD_END         = 'load.end',
    TAB_CHANGED      = 'tab.changed',

    TIME_GAP         = 30,
    GAP              = 20,
    SHOW             = 'show',
    HIDE             = 'hide',
    TAP              = 'tap',
    CUR_TOP_VAL      = -999,
    defaultTag       = fml.vars.default_tag,
    source           = fml.vars.source,
    _str             = 'meilishuo://publish_post.meilishuo/?json_params=' +
        encodeURIComponent( '{"default_tag" : "' +
            defaultTag + '", "source" : "' +
            source + '"}' ),

    opt, url, curTab, timeoutID, curLayoutBox

/**
 * 以下三个方法均用于模板渲染
 */
function getAppLink( protocal, params ) {
    return OpenAppLink.getAppLink( {
        protocol: protocal,
        param: params
    } )
}

function parseTime( time ) {
    var date = new Date( 1000 * time ),
        text = (date.getMonth() + 1) + '月' + date.getDate() + '日'

    if ( date.getFullYear() === (new Date).getFullYear() ) {
        return text
    } else {
        return date.getFullYear() + '年' + text
    }
}

function parseAudioDuration( duration ) {
    var MINUTE = 60,
        mins, remain

    if ( duration < MINUTE ) {
        return duration + '\'\''
    } else {
        mins   = parseInt( duration / MINUTE, 10 )
        remain = duration - mins * MINUTE
        return mins + '\'' + ( remain ? remain + '"' : '' )
    }
}

/**
 * 设置 documentHeight
 * 尽量避免调用 $doc.height()
 */
function setDocHeight() {
    var h

    if ( h = curTab.$content.data( HEIGHT ) ) {
        documentHeight = h + initTopOffset
    } else {
        documentHeight = $doc.height()
    }
}

/**
 * 使用绝对定位布局，便于优化
 * @param $container
 */
function layout( $container ) {
    var $els         = $container.find( '.item' ).not( '.' + LAYOUTED ),
        /**
         * height() 会强制 synchronous layout，影响性能
         */
        initHeight   = $container.data( HEIGHT ) || $container.height(),
        tmpContainer = []

    /**
     * 读写 DOM 属性分成两个循环操作，避免反复读写造成的 layout thrashing
     * http://wilsonpage.co.uk/preventing-layout-thrashing/
     */
    $els.each( function( _, el ) {
        var height = el.offsetHeight

        tmpContainer.push( {
            relativeTopStyle: initHeight + 'px',
            top: initHeight + initTopOffset,
            height: height,
            el: el,
            state: curTab.isInit ? HIDE : SHOW
        } )

        initHeight += height + GAP
    } )

    tmpContainer.forEach( function( box ) {
        var el        = box.el
        el.style.top  = box.relativeTopStyle
        box.baseClass = el.className += ' ' + LAYOUTED
        if ( curTab.isInit ) {
            el.className += ' hide'
        }
    } )

    layoutBoxes[ curTab.name ] = curLayoutBox = curLayoutBox.concat( tmpContainer )

    $container.data( HEIGHT, initHeight )

    /**
     * zepto 的 height( val ) 会默认调用 height()，重复计算高度
     * https://github.com/madrobby/zepto/blob/master/src/zepto.js#L832
     */
    $container[ 0 ].style.height = initHeight + 'px'
}

function fetch( config ) {
    config.isLock = true

    $loadingBar.attr( 'status', 'loading' )

    $.ajax( {
        type: 'get',
        url: config.url,
        dataType: 'json',
        data: {
            cid: fml.vars.cid,
            offset: config.offset,
            limit: 10,
            is_after: 1
        },
        success: function( data ) {
            var list     = data.list,
                $content = config.$content

            if ( list && list.length ) {
                $content.append( ShareTmp( 'circle-list-tmpl', {
                    circles: list,
                    parseTime: parseTime,
                    parseAudioDuration: parseAudioDuration,
                    getAppLink: getAppLink,
                    app: Meilishuo.config.os.mlsApp
                } ) )

                layout( $content )

                config.offset = data.offset + 10;
            } else {
                config.isEnd = true
            }
            /**
             * layout 里会用到 isInit，所以挪到这里赋值
             */
            config.isInit = true
            config.isLock = false

            $win.triggerHandler( LOAD_END )
            $doc.triggerHandler( 'audio-preload' )
        }
    } )
}

function show( tab ) {
    tab.$tab.addClass( ACTIVE )
    tab.$content.show()
}

function hide( tab ) {
    tab.$tab.removeClass( ACTIVE )
    tab.$content.hide()
}

/**
 * 页面顶部的图片加载可能会比较慢，很可能在获取 initTopOffset 的值时高度为 0
 * 造成 LimitRangeToggle 组件计算误差
 */
function fixInitTopOffset() {
    var $imgs = $doc.find( '.wrap-rule img' ),
        len   = $imgs.length

    $imgs.each( function( _, el ) {
        if ( !el.complete ) {
            el.onload = imgLoad
        } else {
            len--
        }
    } )

    function imgLoad() {
        this.onload = null
        len--
        if ( !len ) {
            $win.trigger( IMG_LOAD_EVENT )
        }
    }
}

/**
 * 『回到顶部』执行后，将对象的 _curTop 重置
 * 为什么要设置成 -999，这个数字是随便选的，只要是小一点的负值就可以
 * 为了绕过 limitRangeToggle 中的 isSmallOffsetScroll() 验证
 */
function fixGotopRunning() {
    $doc.on( 'gotop.begin', function() {
        isGotopRunning = true
    } ).on( 'gotop.finish', function() {
        isGotopRunning = false

        for ( var key in layoutBoxes ) {
            layoutBoxes[ key ]._curTop = CUR_TOP_VAL
        }
    } )
}

/**
 * 微信分享
 */
function wxShare() {
    if ( fml.vars.CONFIG_SHARE && fml.vars.isWx ) {
        var signWX         = require( 'wx/sign' ),
            shareWX        = require( 'wx/share' );
        signWX();
        fml.vars.shareData = {
            'desc': fml.vars.CONFIG_SHARE.text,
            'imgUrl': fml.vars.CONFIG_SHARE.pic,
            'title': fml.vars.CONFIG_SHARE.title
        };
        shareWX.bind( fml.vars.shareData );
    }
    if ( Meilishuo.config.os.mlsApp ) {
        url = _str
        opt = fml.vars.CONFIG_SHARE
        $share.on( 'click', function() {
            ShareTo.shareToPengYouQuan( opt )
        } )
    } else {
        url = '/goto/open/?url=' + encodeURIComponent( _str )
        $share.on( TAP, function() {
            $wShare.show()
            $html.addClass( 'has-mask' )
        } )

        $wShare.on( TAP, function() {
            $wShare.hide()
            $html.removeClass( 'has-mask' )
        } )
    }
}

function initGotop() {
    var $gotop      = $doc.find( '.gotop-wrap' ),
        isGotopHide = true

    GoTop.init( {
        el: $gotop,
        isImmediate: true
    } )

    /**
     * 使用 isGotopHide 来避免对 DOM 的过多操作
     */
    WindowScroll.bind( function( pos, isDown ) {
        if ( pos < 400 ) {
            if ( !isGotopHide ) {
                $gotop.hide()
                isGotopHide = true
            }
        } else {
            if ( isDown ) {
                if ( !isGotopHide ) {
                    $gotop.hide()
                    isGotopHide = true
                }
            } else if ( isGotopHide ) {
                $gotop.show()
                isGotopHide = false
            }
        }
    }, 'gotop-wrap' )
}

/**
 * 事件处理函数
 */
function tapHandler() {
    var $el     = $( this ),
        name    = $el.data( NAME ),
        nextTab = tabConfig[ name ]

    /**
     * 容纳所有 post 元素
     */
    if ( !layoutBoxes[ name ] ) {
        layoutBoxes[ name ] = []
    }

    /**
     * 点击当前被激活的 tab
     */
    if ( !$el.hasClass( ACTIVE ) && !nextTab.isLock ) {
        hide( curTab )
        show( nextTab )
        curTab = nextTab
        $win.triggerHandler( TAB_CHANGED )

        if ( !curTab.isInit ) {
            fetch( curTab )
        }
    }
}

function loadEndHandler() {
    setDocHeight()

    $loadingBar.attr( 'status', 'stop' )
}

function tabChangedHandler() {
    curLayoutBox         = layoutBoxes[ curTab.name ]
    curLayoutBox._curTop = CUR_TOP_VAL
    setDocHeight()
}

function imgLoadHandler() {
    var pre = initTopOffset,
        offset, key, boxes
    //重新计算 initTopOffset
    initTopOffset = $contents.position().top
    offset        = initTopOffset - pre

    if ( offset ) {
        for ( key in layoutBoxes ) {
            boxes = layoutBoxes[ key ]

            if ( boxes.length ) {
                boxes.forEach( function( box ) {
                    //将差值补上
                    box.top += offset
                } )
            }
        }
    }
}

function initFetchAndOptimise() {
    var hasMoved

    WindowScroll.bind( function() {
        clearTimeout( timeoutID )
        timeoutID = setTimeout( function() {
            if ( isGotopRunning ) {
                return
            }

            var scrollTop
            /**
             * 如果滑动过快，此时获取的 scrollTop 不准确，需要重新获取
             */
            scrollTop = $win.scrollTop()
            LimitRangeToggle.optimise( curLayoutBox, scrollTop )
            if ( documentHeight - scrollTop <= MIN_OFFSET ) {
                !curTab.isEnd && !curTab.isLock && fetch( curTab )
            }
        }, TIME_GAP )
    } )

    $doc.on( 'touchmove', function() {
        hasMoved = true
    } ).on( 'touchend', function() {
        if ( hasMoved && !isGotopRunning ) {
            var scrollTop = $win.scrollTop()

            /**
             * 在滑动过程中保证不出现白块
             */
            LimitRangeToggle.optimise( curLayoutBox, scrollTop )
        }
        hasMoved = false
    } )
}

function init() {
    wxShare()
    /**
     * 初始化『回到顶部』
     */
    initGotop()

    /**
     * 修复『回到顶部』对 LimitRangeToggle 计算的影响
     */
    fixGotopRunning()

    $( '.act' ).on( TAP, function() {
        /* weibo hack */
        if ( navigator.userAgent.indexOf( 'weibo' ) != -1 ) {
            $( '<div><img style="width:100%;" src="http://d03.res.meilishuo.net/pic/_o/10/61/b9bb6d4f3508e4b1fecf207af8b7_640_1052.cf.png"></div>' )
                .css( {
                    position: 'fixed'
                    , left: 0
                    , top: 0
                    , width: '100%'
                    , height: '100%'
                    , backgroundSize: '100%'
                    , background: '#fff'
                    , opacity: 0.9
                    , zIndex: 1000
                    , textAlign: 'center'
                } )
                .appendTo( 'body' )
                .on( TAP, function() {
                    $( this ).remove()
                } )
        } else {
            window.location.href = url
        }
    } )

    var name = $tabs.filter( '.' + ACTIVE ).data( NAME )

    curTab       = tabConfig[ name ]
    curLayoutBox = layoutBoxes[ name ]

    if ( !curLayoutBox ) {
        curLayoutBox = layoutBoxes[ name ] = []
    }

    $tabs.on( TAP, tapHandler )

    /**
     * 标签切换事件
     * 每个标签对应内容的高度不同
     */
    $win.on( LOAD_END, loadEndHandler )
        .on( TAB_CHANGED, tabChangedHandler )
        .on( IMG_LOAD_EVENT, imgLoadHandler )

    /**
     * 滚动加载数据 + 瀑布流优化
     */
    initFetchAndOptimise()

    //等绑定完 IMG_LOAD_EVENT 之后再执行这个 fix
    fixInitTopOffset()

    Like( '.js-like', function( isLike ) {
        var num         = +this.data( 'num' ),
            addClass    = NOT_LIKE,
            removeClass = IS_LIKE

        if ( isLike ) {
            num++
            addClass    = IS_LIKE
            removeClass = NOT_LIKE
        } else {
            num--
        }

        this
            .removeClass( removeClass )
            .addClass( addClass )
            .data( 'num', num )
            .find( 'em' )
            .html( num )
    } )

    /**
     * 默认初始化
     */
    fetch( curTab )
}

init()
