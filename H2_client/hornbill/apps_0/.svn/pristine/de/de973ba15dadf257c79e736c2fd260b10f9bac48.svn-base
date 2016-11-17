/*common*/

var $               = require( 'jquery' ),
    scroll          = require( 'component/windowScroll' ),
    ajax            = require( 'component/ajax' ),
    Alert           = require( 'ui/alert' ),
    callApi         = require( 'component/callApi' ),
    fengkongRelease = require( 'page/doota/check_code' ),
    Fly             = require( 'component/fly' ),

    subNav          = $( '.tab_tle' ),
    subOrgParent    = subNav.parent(),
    $navBar         = $( '#navbar' ),
    subHolder       = $navBar.find( '.sec_nav' ),
    wheader         = $navBar.find( '.wheader, .sale_nav' ),
    $nowPrice       = $( '#price-now' ),
    $tabPrice       = $( '.js-item-price' ),
    $flyItem        = $( '<div id="fly-to-cart-item"></div>' ),
    FLY_ITEM_SIZE   = 50,
    $firstAnchor, $parent, hasTabWrap, minHeight, maxHeight, frstNavHeight, y,

    TAB_WRAP        = 'js-tab-wrap'

$flyItem.css( {
    width:      FLY_ITEM_SIZE,
    height:     FLY_ITEM_SIZE,
    background: 'center no-repeat',
    'z-index':  999999
} )
$( 'body' ).append( $flyItem )

if ( !subNav.length ) {
    return
}

$parent      = subNav.parent()
$firstAnchor = subNav.find( '.tabArea' ).first()
hasTabWrap   = $parent.hasClass( TAB_WRAP )
maxHeight    = subNav.height()
minHeight    = subNav.find( '.tab_top' ).height()

frstNavHeight = $navBar.find( '.wheader' ).height() || 0
y             = subNav.offset().top - frstNavHeight

scroll.yIn( y, function() {
    if ( hasTabWrap ) {
        if ( $firstAnchor.hasClass( 'cur' ) ) {
            $parent.css( 'height', maxHeight )
        } else {
            $parent.css( 'height', minHeight )
        }
    }
    subHolder.append( subNav )
    wheader.stop().animate( {
        'margin-top': -frstNavHeight
    }, function() {
        if ( subNav.parent().is( subHolder ) ) {
            $( this ).hide()
        }
    } )
    /*
     * 显示当前价格
     * 价格有可能是区间，并且不断变化
     */
    $tabPrice.html( '￥' + $nowPrice.html() )
}, function() {
    if ( hasTabWrap ) {
        $parent.css( 'height', 'auto' )
    }
    subOrgParent.prepend( subNav )
    wheader.show().stop().animate( {
        'margin-top': 0
    } )
    $tabPrice.html( '' )
} )

if ( $( '#fixWidget' )[ 0 ] ) {
    var fixWidget = $( '#fixWidget' )[ 0 ].style
} else {
    var fixWidget = {}
}

var tab = require( 'app/doota/tab' )

function setTab( callback ) {
    var detail_items     = $( '.tab_tle .detail_items' )
        , tab_tle_height = $( '.tab_tle' ).height()
    tab.bind( {
        'tagPnl':           '.tab_tle'
        , 'tabTag':         '.tabArea'
        , 'activeTagClass': 'cur'
        , 'contents':       '.contentArea'
        , 'onShowed':       function( context, last, now ) {
            detail_items[ now > 0 ? 'hide' : 'show' ]()
            if ( !$( '.wrap .tab_tle' ).length )
                window.scrollTo( 0, context.parent().offset().top )

            callback && callback( context );
        }
    } )
    detail_items.on( 'click', 'a', function() {
        var anchor = $( this ).attr( 'href' ).slice( 1 );
        anchor     = $( '#' + anchor )
        if ( anchor.length ) {
            window.scrollTo( 0, anchor.offset().top - tab_tle_height );
        }
        this.blur()
        return false
    } )
}

function flyToCart( start, callback ) {
    var img     = $( '.js-pic-thumb .active img' )[ 0 ].src,
        $target = $( '#side-cart' ),
        end     = $target.offset()

    end.width = end.height = 5

    $flyItem.css( {
        left:               start.left,
        top:                start.top,
        'background-image': 'url(' + img + ')',
        visibility:         'visible'
    } )

    Fly( {
        el:     $flyItem,
        target: '#side-cart',
        start:  start,
        end:    end,
        onEnd:  function() {
            setTimeout( function() {
                $flyItem.css( 'visibility', 'hidden' )
                callback()
            }, 10 )
        }
    } )
}

exports.setTab = setTab

var lazyLoad     = require( 'component/lazyLoad' )
exports.lazyLoad = function() {
    lazyLoad.load( '.more_pic span', 'asrc' );
    lazyLoad.load( '.pro_pic span', 'asrc' );
}

exports.addToCart = function( orderInfo, event ) {
    callApi.write( { 'url': '/cart/add' }, orderInfo, function( res ) {
        var sid = res && res.info && res.info.sid
        if ( sid ) {
            var cartHref = '/cart/addToCart/' + orderInfo.twitter_id + '?sid=' + sid;
            if ( fml.vars.shop_id ) cartHref += '&shop_id=' + fml.vars.shop_id

            flyToCart( {
                left:   event.clientX,
                top:    event.clientY,
                width:  FLY_ITEM_SIZE,
                height: FLY_ITEM_SIZE
            }, function() {
                Biu.addCart( orderInfo.amount, fml.vars.tid, fml.vars.shop_id );
            } )
        } else {
            var errMsg;
            if ( !res ) {
                errMsg = 'opps,有点错误,一会儿再试试吧'
            }
            else if ( res.code != 7 ) {
                errMsg = res.info.msg;
            } else {
                fengkongRelease.showFKRelsWin( res.info.rule_id );
            }

            if ( errMsg ) {
                new Alert( {
                    width:      370,
                    title:      '我的购物车',
                    confirmTxt: res && '去整理购物车',
                    content:    errMsg
                } ).onSure( function() {
                    /*
                     韩国馆要跳到『韩国馆商品』tab
                     */
                    if ( res ) window.open( '/cart' );
                } )
            }

        }
    } )
}
