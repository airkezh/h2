/*common*/

var $             = require( 'wap/zepto' ),
    win           = window,
    $win          = $( win ),
    winHeight     = $win.height(),
    dataPool      = [],
    lastScrollPos = win.scrollY,
    gap           = parseInt( win.innerWidth / 100 ),
    dataIndex     = 0,  //数据索引
    dataRange, doms, $parent, perHeight, perWidth, maxHeight, dir,
    scrollStartPos, layoutStartPos, curTop

function checkScroll() {
    var scrollY = win.scrollY

    if ( scrollY > lastScrollPos ) {
        dir = 'down'
    } else if ( scrollY < lastScrollPos ) {
        dir = 'up'
    }

    lastScrollPos = scrollY

    //将最后一个单元格移动上来          将第一个单元格移动下去
    if ( ( lastScrollPos <= curTop && ( curTop > perHeight ) ) ||
        ( lastScrollPos + winHeight ) >= curTop + maxHeight ) {
        shift()
    }
}

function shift() {
    var shiftEls, data

    if ( !dir ) {
        return
    }

    if ( !( data = searchData( dir ) )) {
        return
    }

    if ( dir == 'down' ) {
        shiftEls = doms.slice( 0, 2 )
        doms = doms.slice( 2 ).concat( shiftEls )
    } else if ( dir == 'up' ) {
        shiftEls = doms.slice( doms.length - 2 )
        doms = shiftEls.concat( doms.slice( 0, doms.length - 2 ) )
    }

    update( shiftEls, data )

    checkScroll()
}

function searchData( dir ) {
    var tmp = dataIndex

    if ( dir == 'up') {
        dataIndex -= 1
        tmp = dataIndex

        if ( tmp < 0 ) {
            dataIndex = 0
            return null
        }
    } else {
        tmp = dataIndex + dataRange
        dataIndex += 1

        if ( tmp > dataPool.length - 1 ) {
            dataIndex = dataPool.length - dataRange
            return null
        }
    }
    return dataPool[ tmp ]
}

function update( els, data ) {
    updateLayout( els, data )
    updateContent( els, data )
}

function updateContent( els, data ) {
}

function updateLayout( els, data ) {
    els[ 0 ].style.top = els[ 1 ].style.top  = data.layoutPos + 'px'

    if ( dir == 'down' ) {
        curTop += perHeight
    } else {
        curTop -= perHeight
    }
}

function initLayout() {
    var i      = 0,
        len    = doms.length,
        tmpPos = layoutStartPos

    for ( ; i < len; i += 2 ) {
        doms[ i ].style.cssText = 'top:' + tmpPos + 'px;left:0;';
        doms[ i + 1 ].style.cssText = 'top:' + tmpPos + 'px;left:' +
            ( perWidth + gap ) + 'px;';
        tmpPos += perHeight
    }

    $parent.css( 'height',  tmpPos )
}

function render( data ) {
    var i   = 0,
        len = data.length

    for ( ; i < len; i += 2 ) {
        dataPool.push( {
            pos: scrollStartPos,
            layoutPos: layoutStartPos,
            datas: [ data[ i ], data[ i + 1 ] ],
            index: dataPool.length - 1
        })

        scrollStartPos += perHeight
        layoutStartPos += perHeight
    }

    $parent.css( 'height',  layoutStartPos )
}

exports.render = function( data ) {
    render( data )
}

exports.init = function( $els, data ) {
    var $first,
        len = data.length

    $parent    = $els
    doms       = Array.prototype.slice.call( $parent.find( 'li' ), 0 )
    $first     = $( doms[ 0 ] )
    perHeight  = $first.height()  //每一个 cell 的高度
    perWidth   = $first.width()
    maxHeight  = perHeight * len / 2  //全部 cell 的高度
    scrollStartPos = curTop = $first.offset().top
    layoutStartPos = 0

    dataRange = data.length / 2

    initLayout()
    render( data )

    $win.on( 'scroll', checkScroll )
}
