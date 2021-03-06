/*common*/

// ## 名称: 瀑布流组件
// ## 版本: 0.2.0
// ### 注意:
// - 瀑布流使用了绝对定位，需要自己在样式中设置
// - 组件发出的请求中会自动携带 `frame` 和 `trace` 属性
// - 组件中所有事件函数的 `this` 值都是组件实例对象

// ### 如何使用:
//```
// var WaterFall = require( 'circle/component/waterfall' );
//
// var waterFallInstance = WaterFall.init({
//     el: '.goods-wall',
//     url: '/test/xxxx'
// })
// // 组件默认不会加载数据，需要手动启动
// waterFallInstance.start()
// ```

// ### 配置:
// init() 方法中传入的 config 对象包含如下属性(加 * 属性表示可以不传):

//> - el*:
//
//>     (string|DOM|Zepto Object) 瀑布流的容器，默认值是 `.goods-wall`
//
//> - url:
//
//>    (string) 请求数据的 url
//
//> - tmpl*:
//
//>    (string) 数据模板的 ID，默认是 `posterWall`
//
//> - data*:
//
//>    (object) ajax 请求中的 data 参数，默认包含：
//
//>    - frame*
//
//>    (number) 请求的数据处于第几帧，默认是 0
//
//>    - trace*
//
//>    (string) 服务器返回数据所带的 `trace` 属性，用于瀑布流分帧加载，默认获取返回数据的属性
//
//>    - limit*
//
//>    (string|number) 返回数据量的限制，默认是 10
//
//>    - offset*
//
//>    (string|number) 用于分帧加载，默认是 0
//
//> - dataName*:
//
//>    (string) 默认值是 `tInfo`，用来过滤服务端返回的数据，如果需要更复杂的操作，请自定义 `dataFilter` 函数
//
//> - colGap*:
//
//>    (number|string) 瀑布流元素四周的空白，默认是 8px
//     可以按照 CSS margin 的格式传入字符串值，例如 "5 10" 表示上下间距 5px，左右间距 10px
//
//> - hasSideGap*:
//
//>    (boolean) 瀑布流距离屏幕两侧是否有间隙，默认没有间隙，元素紧贴屏幕两侧
//
//> - helpers*:
//
//>   (object) 包含工具函数的对象，用于模板渲染：
//
//>    ```
//     helpers: {
//          parseDate: function() {
//              ....
//          }
//     }
//     ```
//
//>    如果传入如上 `helpers`，那么在模板中，可以使用 `this.parseDate()` 来调用。
//
//> - optimiseFn*:
//
//>   (function) 优化函数，这里需要传入 `waterfallOptimise.js` 中定义的函数。
//>   这里的『优化』指的是解决『由于显示的 DOM 节点过多而导致 iPhone 6P 页面崩溃』的问题。
//
//>   ```
//    var optimiseFn = require('circle/component/waterfallOptimise')
//    ...
//    {
//      ...
//      optimiseFn: optimiseFn
//    }
//    ```
//
//>   注意：使用该优化时，必须要在 LESS 中提供两个 class：
//
//>  ```
//      .show { display: block; }
//      .hide { display: none; }
//   ```
//
//> - canFetch*:
//
//>    (function) 判断页面在什么位置可以发请求，函数的第一个参数是 `window` 的 `scrollTop`，
//>     第二个参数是 `isDown`，表示页面是否在向下滑动。
//>     这个函数需要返回 Boolean 值，`true` 表示能够获取数据,默认的函数是我随便写的，这个参数应该尽量覆盖掉
//
//> - dataFilter*:
//
//>    (function) 用来过滤服务端返回的数据，该函数的返回值应该是个数组
//
//>   默认的函数会获取返回值的 `tInfo` 属性，就是 `dataName` 定义的值
//
//> - onBeforeFetch*:
//
//>    (function) 发送请求*前*的事件，如果该函数返回 `false`，那么组件将不再发送请求
//
//> - onFetchStart*:
//
//>    (function) 发送请求*前*的事件，看起来和 `onBeforeFetch` 很像，但用途不同，它主要用于动态修改请求参数的需求，函数的第一个参数为 `config` 对象
//
//> - onFetchFinished*:
//
//>    (function) 发送请求*后*的事件，无论请求失败或者成功均会触发，
//     并且一定在 `onFetchSuccess` 与 `onFetchError` 之前执行
//     它的第一个参数是 `XMLHttpRequest` 对象实例，第二个是请求状态，比较少用到
//
//> - onFetchSuccess*:
//
//>    (function) 发送请求*成功*的事件，第一个参数是服务端返回的数据对象，
//     第二个参数是实例的 `config` 对象
//
//> - onFetchError*:
//
//>    (function) 发送请求*失败*的事件，一般是在断网或服务器端未响应的情况触发
//     第一个参数是错误内容，第二个参数是错误类型
//
//> - onLayoutFinished*:
//
//>    (function) 布局结束事件。
//     参数是 `config` 对象
//
// ### API:
// WaterFall 提供了如下方法：
//
//> - start():
//
//>    请求数据。组件默认会监听 `window` 的 `scroll` 事件来自动发请求，所以 `start()` 方法最多需要调用一次。
//
//> - isLoading():
//
//>   瀑布流是否正在请求数据。
//
//> - getColsInfo():
//
//>   获得瀑布流的列信息。
//
//> - setColsInfo():
//
//>   设置瀑布流的列信息。
//
//> - findHighestCol():
//
//>   获得最高的列
//
//> - findLowestCol():
//
//>   获得最低的列
//
//> - getColsHistoryInfo():
//
//>   获取列的历史位置信息。
//
//> - setColsHistoryInfo():
//
//>   更新列的历史位置信息。这两个函数均用于 `biWaterfallPlugin` 中使用。
//
//> - updateLayoutDirection():
//
//>   更新布局顺序，目前支持 `Waterfall.NORMAL` 和 `Waterfall.RERVERSE`
//
//> - triggerScroll( dir ):
//
//>   手动触发滚动事件。`dir` 的取值为 `down` 和 `up`，表示触发滚动的方向，默认为 `down`
//
//> - isFrameLoaded( frameIndex ):
//
//>   frameIndex 这一帧是否加载过
//
//> - lock():
//
//>    锁定瀑布流，不响应 `scroll` 事件。
//
//> - unlock():
//
//>    解锁瀑布流。
//
//> - destroy():
//
//>    销毁瀑布流，目前的操作就是移除 `scroll` 事件监听。

// source begin
var ShareTmp                 = require( 'wap/component/shareTmp' ),
    $                        = require( 'wap/zepto' ),
    doc                      = document,
    $doc                     = $( doc ),
    $win                     = $( window ),
    $winHeight               = $win.height(),
    // 每个 WaterFall 的实例都有独自的 id，该 id 目前用于 `destroy()` 方法
    guid                     = 1,
    AJAX_TIMEOUT             = 3000,
    DIR_DOWN                 = 'down',
    DIR_UP                   = 'up',
    FALSE                    = false,
    TRUE                     = true,
    // 设置在瀑布流元素的类名，标记它的布局已经计算完毕
    LAYOUTED                 = 'js-layouted',

    SHOW                     = 'show',
    HIDE                     = 'hide',
    // 空函数，叫 NOOP 是约定俗成
    NOOP                     = function() {
        return TRUE
    },

    NORMAL                   = 'NORMAL',
    REVERSE                  = 'REVERSE',

    // 默认的列宽度，200 像素，这个值是其他瀑布流里设置的，这里直接抄了过来
    DEFAULT_COL_WIDTH        = 200,
    DEFAULT_OFFSET           = $winHeight / 2,
    SCROLL_EVENT             = 'scroll.waterfall',
    TOUCHMOVE_EVENT          = 'touchmove.waterfall',
    TOUCHEND_EVENT           = 'touchend.waterfall',
    TIMEOUT_ID,

    defaultConfig            = {
        el: '.goods-wall',
        tmpl: 'posterWall',
        type: 'get',
        dataType: 'json',
        data: {
            offset: 0,
            frame: 0,
            trace: 0,
            limit: 10
        },
        dataName: 'tInfo',
        // 该参数用于双向瀑布流，不需要手动设置。目前支持 "normal" 和 "reverse" 两种
        layoutDirection: NORMAL,
        colGap: 8,
        hasSideGap: false,
        // 这个参数暂时没有用，以后可以选择废除
        layout: 'normal',
        canFetch: defaultScroll,
        dataHandler: defaultConstruct,
        dataFilter: defaultFilter,
        onBeforeFetch: NOOP,
        onFetchStart: NOOP,
        onFetchFinished: NOOP,
        onFetchSuccess: NOOP,
        onFetchError: NOOP,
        onLayoutFinished: NOOP,
        optimise: null
    },

    findCurCol               = buildFindCondition( function( a, b ) {
        return a.max - b.max
    } ),

    findHighestCol           = buildFindCondition( function( a, b ) {
        return b.max - a.max
    } ),

    // 这里所谓 "最矮" 的列是指 min 值最大的
    findLowestCol            = buildFindCondition( function( a, b ) {
        return b.min - a.min
    } ),

    waterFallInstances       = [],
    waterFallInstancesLength = 0,
    prevScrollTop            = 0

// 使用 curry 来简化代码
// 如果 col 的高度相同，那么优先获取左边的 col。findHighestCol() 也需要这样处理
function buildFindCondition( custom ) {
    return function( cols ) {
        if ( !cols ) {
            return null
        }

        return cols.sort( function( a, b ) {
            return custom( a, b ) || ( a.left - b.left )
        } )[ 0 ]
    }
}

function defaultConstruct( list, config ) {
    var helpers = config.helpers,
        obj     = {},
        key, layoutFn

    if ( !list || !list.length ) {
        return
    }

    for ( key in helpers ) {
        if ( helpers.hasOwnProperty( key ) ) {
            obj[ key ] = helpers[ key ]
        }
    }

    // TODO，布局函数需要处理的内容比较多，对于自定义来说很困难，目前自定义布局的需求不明显，暂时不考虑优化这部分。
    layoutFn = generalLayout

    layoutFn.call( this, list, config, obj )
    config.onLayoutFinished.call( this, config )

    if ( config.useOptimise ) {
        config.hasMoved     = true
        this._boxes._curTop = -9999
        $doc.triggerHandler( config.touchEndEventName )
    }
}

function defaultFilter( data ) {
    return data[ this._config.dataName ]
}

function defaultScroll( scrollTop ) {
    if ( $doc.height() - $winHeight - scrollTop < DEFAULT_OFFSET ) {
        return true
    }
}

function generalLayout( datas, config, obj ) {
    var $el           = this.$el,
        tmpl          = config.tmpl,
        initTopOffset = config.initTopOffset,
        colWidth      = config.colWidth,
        useOptimise   = config.useOptimise,
        //这里只用到了 colGapT 属性，colGapB 是不是可以去掉?
        colGap        = config.colGapT,
        frame         = config.data.frame,
        str           = '',
        curCol        = null,
        // this._cols 的 max 应该始终为最高
        cols          = this._cols,
        colsHistory   = this._colsHistory,
        oldCol        = colsHistory[ frame ],
        boxes         = this._boxes,
        tmpContainer  = [],
        $boxes, tmpHeight

    if ( oldCol ) {
        // 这里重新定义了 cols，下面对 cols 的操作就会导致它与 this._cols 的数据不同步
        // 应该将两次结果合并
        cols = oldCol.map( function( obj ) {
            return {
                min: obj.min,
                max: obj.min,
                left: obj.left,
                frame: frame
            }
        } )
    } else {
        oldCol = cols.map( function( obj ) {
            return {
                min: obj.max,
                max: obj.max,
                left: obj.left,
                frame: frame
            }
        } )
    }

    datas.forEach( function( v, index ) {
        obj.v     = v
        obj.index = index
        str += ShareTmp( tmpl, obj )
    } )

    $boxes = $el.append( str ).children().not( '.' + LAYOUTED )

    // 设置和获取 DOM 属性需要分开，这是一种优化的手段，
    // 但下面这个循环里对 `width` 进行了设置，分成两个循环就没有什么必要了
    $boxes.each( function( i, el ) {
        // 高度会依赖于宽度，因此要先设置
        el.style.width = colWidth + 'px'

        var height = el.offsetHeight,
            topStyle

        curCol   = findCurCol( cols )
        findCurCol( oldCol )
        topStyle = curCol.max + 'px'

        tmpContainer.push( {
            left: curCol.left + 'px',
            relativeTopStyle: topStyle,
            top: curCol.max + initTopOffset,
            height: height,
            el: el,
            state: useOptimise ? ( config.isFirstFrame ? SHOW : HIDE ) : SHOW
        } )

        curCol.max += height + colGap
    } )

    config.isFirstFrame = false

    if ( !colsHistory[ frame ] ) {
        colsHistory[ frame ] = cols.map( function( v, i ) {
            return {
                min: oldCol[ i ].max,
                max: v.max,
                left: v.left,
                frame: frame
            }
        } )
    }

    tmpContainer.forEach( function( box ) {
        var el        = box.el
        el.style.top  = box.relativeTopStyle
        el.style.left = box.left
        box.baseClass = el.className += ' ' + LAYOUTED + ' waterfall-frame-' + frame
        el.className += ' ' + box.state
    } )

    // 确保 boxes 中的元素是按照高度来排列的
    // 因为 waterfallOptimise 中使用了二分法查找，如果顺序不对，结果就乱了。
    if ( useOptimise ) {
        if ( !boxes.length || boxes[ boxes.length - 1 ].top <= tmpContainer[ 0 ].top ) {
            this._boxes = boxes.concat( tmpContainer )
        } else {
            this._boxes = tmpContainer.concat( boxes )
        }
    }

    tmpHeight = findHighestCol( cols ).max
    if ( !this._curTop || tmpHeight > this._curTop ) {
        this.$el.height( this._curTop = tmpHeight )
    }

    this._cols = cols.map( function( obj, i ) {
        var oldValue = this[ i ]
        return {
            min: obj.min < oldValue.min ? obj.min : oldValue.min,
            max: obj.max > oldValue.max ? obj.max : oldValue.max,
            left: obj.left,
            frame: frame
        }
    }, this._cols )
}

// 参考了 CSS 中设置 `margin` 的方式，`colGap` 可以按照上右下左的方式传值
function parseColGap( config ) {
    var originValue = config.colGap,
        iterateLen  = 4,
        gapArr, len, val

    if ( originValue !== originValue ) {
        return console.error( originValue + ' is not a valid number.' )
    }

    if ( typeof originValue == 'number' ) {
        config.colGapT = config.colGapR = config.colGapB = config.colGapL = originValue
    } else {
        gapArr = String( originValue ).split( ' ' )
        len    = gapArr.length

        if ( len == 0 || len > 4 ) {
            return console.error( originValue + '\'s format is not right.' )
        }

        while ( iterateLen-- ) {
            val = gapArr[ iterateLen ]
            if ( val === undefined ) {
                continue
            }

            if ( isNaN( val = +val ) ) {
                return console.error( originValue + ' contains unvalid number.' )
            }

            gapArr[ iterateLen ] = val
        }

        switch ( len ) {
            case 1:
                config.colGapT = config.colGapR = config.colGapB = config.colGapL = gapArr[ 0 ]
                break

            case 2:
                config.colGapT = config.colGapB = gapArr[ 0 ]
                config.colGapR = config.colGapL = gapArr[ 1 ]
                break

            case 3:
                config.colGapT = gapArr[ 0 ]
                config.colGapR = config.colGapL = gapArr[ 1 ]
                config.colGapB = gapArr[ 2 ]
                break

            case 4:
                config.colGapT = gapArr[ 0 ]
                config.colGapR = gapArr[ 1 ]
                config.colGapB = gapArr[ 2 ]
                config.colGapL = gapArr[ 3 ]
                break
        }
    }
}

function WaterFall( config ) {
    this._config = config
    this._id     = guid++
    this._boxes  = []
    this._frames = {
        loaded: {},
        cur: 0,
        max: 0,
        min: 0 // @TODO：这里存在问题，在设置列信息的时候，这里也应该更新
    }

    this.init()
}

WaterFall.prototype = {
    constructor: WaterFall,

    init: function() {
        var config     = this._config,
            colNum     = config.colNum,
            hasSideGap = config.hasSideGap,
            i          = 0,
            sideGap    = 0,
            left       = 0,
            gapL, gapR, maxGap, $el, cols, colWidth

        $el = this.$el = $( config.el )
        this._cols = cols = []
        this._colsHistory = []

        config.initTopOffset = $el.position().top
        config.isFirstFrame  = true

        parseColGap( config )

        gapL   = config.colGapL
        gapR   = config.colGapR
        maxGap = Math.max( gapL, gapR )

        if ( hasSideGap ) {
            sideGap = gapL + gapR
        }

        if ( !colNum ) {
            colNum = config.colNum = Math.ceil( $el.width() / DEFAULT_COL_WIDTH )
        }

        if ( colNum <= 0 ) {
            return console.error( 'colNum is wrong.' )
        }

        // colGap 在计算时，如果两个边距相邻，那么取两个值中最大的
        colWidth = config.colWidth = ( $doc.width() - sideGap - ( colNum - 1 ) * maxGap ) / colNum

        for ( ; i < colNum; i++ ) {
            if ( i == 0 ) {
                left = hasSideGap ? gapL : 0
            } else {
                left += ( colWidth + maxGap ) * i
            }

            cols.push( {
                min: 0,
                max: 0,
                left: left,
                frame: 0
            } )
        }

        if ( config.useOptimise = !!config.optimiseFn ) {
            this.bindTouchmoveEvent()
            config.optimiseFn.initRange( colNum )
        }
    },

    bindTouchmoveEvent: function() {
        var _this  = this,
            config = _this._config,
            id     = '.' + _this._id,
            touchMoveEventName, touchEndEventName

        touchMoveEventName = config.touchMoveEventName = TOUCHMOVE_EVENT + id
        touchEndEventName = config.touchEndEventName = TOUCHEND_EVENT + id

        $doc.on( touchMoveEventName, function() {
            config.hasMoved = true
        } ).on( touchEndEventName, function() {
            if ( config.hasMoved ) {
                config.optimiseFn.optimise( _this._boxes, $win.scrollTop() )
            }

            config.hasMoved = false
        } )
    },

    fetch: function() {
        var _this  = this,
            config = _this._config,
            cData  = config.data

        if ( _this._isLoading ) {
            return
        }

        _this._isLoading = true
        clearTimeout( TIMEOUT_ID )
        TIMEOUT_ID       = setTimeout( function() {
            _this._isLoading = false
        }, AJAX_TIMEOUT )

        if ( config.onBeforeFetch.call( _this, config ) === FALSE ) {
            _this._isLoading = false
            return
        }

        _this._config.onFetchStart.call( _this, config )

        if ( this.isFrameLoaded( config.data.frame ) ) {
            _this._isLoading = false
            return
        }

        $.ajax( {
            type: config.type,
            dataType: config.dataType,
            data: cData,
            url: config.url,
            timeout: AJAX_TIMEOUT,
            success: function( data ) {
                var frames   = _this._frames,
                    curFrame = cData.frame

                data = config.dataFilter.call( _this, data )
                config.onFetchSuccess.call( _this, data, config )
                config.dataHandler.call( _this, data, config )

                frames.loaded[ cData.frame ] = 1
                if ( frames.max < curFrame ) {
                    frames.max = curFrame
                }

                if ( frames.min > curFrame ) {
                    frames.min = curFrame
                }

                if ( config.layoutDirection == NORMAL ) {
                    cData.frame++
                } else {
                    cData.frame--
                }

                cData.trace = data.trace || 0
            },

            error: function( xhr, errorType, error ) {
                config.onFetchError.call( _this, error, errorType )
            },

            complete: function( xhr, status ) {
                config.onFetchFinished.call( _this, xhr, status )
                _this._isLoading = false
            }
        } )
    },

    // 默认初始化结束后，不会主动请求数据，需要手动执行 start() 方法
    // 对 fetch 的封装，名字看起来更清晰一些
    start: function() {
        this.fetch()
        return this
    },

    // 被锁定的对象不响应 window 的 scroll 事件
    lock: function() {
        this._isLock = true
        return this
    },

    // 瀑布流是否正在加载数据
    isLoading: function() {
        return this._isLoading
    },

    // API 不应该将内部对象直接暴露出去，这样的引用会造成不必要的麻烦
    getColsInfo: function() {
        return $.extend( true, [], this._cols )
    },

    getColsHistoryInfo: function() {
        return $.extend( true, [], this._colsHistory )
    },

    setColsHistoryInfo: function( history ) {
        this._colsHistory = $.extend( true, [], history )
        return this
    },

    setColsInfo: function( cols ) {
        if ( cols && cols.length ) {
            this._cols = $.extend( true, [], cols )
        }
        return this
    },

    updateLayoutDirection: function( dir ) {
        if ( dir in this.CONS ) {
            this._config.layoutDirection = dir
        } else {
            throw Error( dir + ' is not a valid direction.' )
        }
        return this
    },

    findLowestCol: function() {
        return findLowestCol( this._cols )
    },

    findHighestCol: function() {
        return findHighestCol( this._cols )
    },

    isFrameLoaded: function( frameIndex ) {
        return !!this._frames.loaded[ frameIndex ]
    },

    getCurrentFrame: function() {
        return this._config.data.frame
    },

    unlock: function() {
        this._isLock = false
        return this
    },

    destroy: function() {
        var len = waterFallInstancesLength
        while ( len-- ) {
            if ( waterFallInstances[ len ]._id === this._id ) {
                waterFallInstances.splice( len, 1 )
                waterFallInstancesLength--
            }
        }
    },

    triggerScroll: function( dir ) {
        $win.triggerHandler( SCROLL_EVENT, [ dir || DIR_DOWN ] )
        return this
    },

    CONS: {
        NORMAL: NORMAL,
        REVERSE: REVERSE
    }
}

// 开始初始化，绑定滚动加载事件，所有瀑布流实例都在同一个 `scroll` 事件中
$win.on( SCROLL_EVENT, function( e, dir ) {
    var isDown, scrollTop
    if ( !waterFallInstancesLength ) {
        return
    }

    scrollTop = $win.scrollTop()
    if ( dir == DIR_DOWN ) {
        isDown = true
    } else {
        if ( dir == DIR_UP ) {
            isDown = false
        } else {
            isDown = scrollTop >= prevScrollTop
        }
    }

    prevScrollTop = scrollTop

    waterFallInstances.forEach( function( instance ) {
        if ( !instance._isLock ) {
            if ( instance._config.canFetch.call( instance, scrollTop, isDown ) === TRUE ) {
                instance.fetch()
            }
        }
    } )
} )

exports.init = function( config ) {
    var instance
    config = $.extend( true, {}, defaultConfig, config )
    waterFallInstances.push( instance = new WaterFall( config ) )
    waterFallInstancesLength++
    return instance
}
