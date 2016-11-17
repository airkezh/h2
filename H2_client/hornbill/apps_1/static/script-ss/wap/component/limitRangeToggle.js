/*common*/
/**
 * 将限定范围内的元素 show/hide
 * 用于优化瀑布流，尤其是针对在 iPhone 6plus 下的页面崩溃问题
 *
 * 该方法依赖 Box 对象，它包含如下属性：
 *      top: Number          距离页面顶部的真实距离，即 offsetHeight
 *      height: Number       元素高度
 *      el: DOM/Zepto Object 元素对象
 *      state: String        show 或是 hide，表示元素的初始状态。默认是 show
 *
 * TODO:
 *      <del>处理小范围内的滚动</del>
 *      <del>处理回到顶部(在 circle.js 中做了处理)</del>
 */
require( 'wap/zepto/touch' );

var $win      = $( window ),
    $doc      = $( document ),
    winHeight = $win.height(),

    NAME      = 'name',
    HIDE      = 'hide',
    SHOW      = 'show',

    OFFSET    = 3,

    timeoutID, globalBoxes

/**
 * 小范围内移动
 * 未优化前，每当页面发生滚动事件，即便只滚动了 1px，binarySearch() 仍然会执行
 *
 * 在判断当前滚动的距离小于某个值时，不执行操作
 */
function isSmallOffsetScroll( curTop ) {
    var _curTop = globalBoxes._curTop,
        minOffset

    if ( _curTop ) {
        minOffset = globalBoxes[ 0 ].height / 2

        if ( Math.abs( curTop - _curTop ) > minOffset ) {
            globalBoxes._curTop = curTop
            return false
        }
    } else {
        globalBoxes._curTop = curTop
    }

    return true
}

/**
 * 处理 iPhone 6p 下的崩溃问题，不在 viewport 内的元素 display:none
 * @param _globalBoxes 包含 Box 的数组
 * @param curTop 当前距离页面顶部的距离
 */
function optimise( _globalBoxes, curTop ) {
    globalBoxes = _globalBoxes

    if ( !globalBoxes.length ) {
        return
    }

    if ( isSmallOffsetScroll( curTop ) ) {
        return
    }

    var len   = globalBoxes.length,
        index = binarySearch( curTop ),
        start = index - OFFSET,
        end   = index + OFFSET

    if ( start < 0 ) {
        start = 0
    } else {
        toggleglobalBoxes( 0, start - 1, HIDE )
    }

    if ( end >= len ) {
        end = len - 1
    } else {
        toggleglobalBoxes( end + 1, len - 1, HIDE )
    }

    toggleglobalBoxes( start, end, SHOW )

    globalBoxes = null
}

/**
 * 在当前的浏览器实现中(不存在尾递归优化)，放弃了递归的写法。
 */
function binarySearch( curTop ) {
    var _globalBoxes = globalBoxes,
        start        = 0,
        end          = _globalBoxes.length,
        curHeight    = curTop + winHeight,
        index, box, top, total

    while ( 1 ) {
        if ( start >= end ) {
            return start
        }

        index = parseInt( ( start + end ) / 2 )
        box   = _globalBoxes[ index ]
        top   = box.top
        total = top + box.height

        if ( total < curTop ) {
            start = index + 1
        } else if ( top > curHeight ) {
            end = index - 1
        } else {
            return index
        }
    }
}

/**
 * 隐藏或显示元素
 * 优化：只有当元素的 state 状态改变时，才去修改对应 DOM 元素的 display 属性
 * @param begin
 * @param end
 * @param state
 */
function toggleglobalBoxes( begin, end, state ) {
    var box

    for ( ; begin <= end; begin++ ) {
        box = globalBoxes[ begin ]
        box.state || ( box.state = SHOW )

        if ( box.state !== state ) {
            box.el.className = box.baseClass + ' ' + state
            box.state        = state
        }
    }
}

/**
 * optimise 函数需要传入当前页面的 scrollTop，避免对该数值的重复获取
 * @type {optimise}
 */
exports.optimise = optimise
