/*common*/
require('jquery');
var windowScroll = require('component/windowScroll');

var $win = $( window ),
    $body = $( document.body );

/*导航吸顶*/
var $snapGoodsItem  = $( '#snap-goods-item' ),
    $itemDetailNav = $( '#item-detail-nav'),
    FIXED_CLASS      = 'snap-detail-item-nav-fixed',
    $navFixed = 0;

$snapGoodsItem.css( 'height', $snapGoodsItem.height() )

windowScroll.yIn( $itemDetailNav.offset().top, function() {
    $itemDetailNav.addClass( FIXED_CLASS )
    $navFixed = 1
}, function() {
    $itemDetailNav.removeClass( FIXED_CLASS )
    $navFixed = 0
})
/*导航吸顶结束*/


/*
 * @name: scrollHighLight 滚动高亮
 * @desc: 滚动页面时，商品详情下拉菜单中的菜单项会根据当前位置进行高亮
 *
 * $sentry 是用来标记高亮区域的截止位置
 */
;(function() {
    var prev, len, pos, $anchors,
        $parent  = $( '.detail_items' ),
        $sentry  = $( '#anchor-boundry-sentry' ),
        /* 该高度需要计算在内 */
        parentHeight = $parent.height(),

        /* 小于该值就高亮 */
        minOffset = 100,
        rhash     = /#.+$/g,
        CUR_CLASS = 'cur'

    function initPos() {
        pos = []
        $anchors = $parent.find( '.js-anchor-btn' )

        $anchors.each( function( i, el ) {
            var match = el.href.match( rhash ),
                $el

            if ( match ) {
                $el = $( match[ 0 ] )
                $el.length && pos.push( $el.offset().top )
            }
        })

        pos.push( $sentry.offset().top )

        len = pos.length
    }

    /**
     *  layout.is.changed 『精选好评』与『查看更多详情』触发
     */
    $body.on( 'layout.is.changed', function() {
        setTimeout( initPos, 0 )
    } )

    initPos()

    if ( len = pos.length ) {
        $win.on( 'scroll', function() {
            /*
             用了延时就不能及时高亮~所以妥协一下
             */
            checkPos()
        })
        /* 默认先执行一次 */
        checkPos()
    }

    function checkPos() {
        var offset = $win.scrollTop() + parentHeight,
            i      = 0,
            dis

        for ( ; i < len; i++ ) {
            dis = pos[ i ] - offset

            if ( dis >= 0 ) {
                /* 防止滚动到上面的时候第一个 tab 始终高亮 */
                if ( dis > minOffset ) {
                    if ( i == 0 ) {
                        break
                    } else {
                        i -= 1
                    }
                }

                return highLight( $anchors.eq( i ) )
            }
        }

        unHighLight()
    }

    function highLight( anchor ) {
        /*
         减少不必要的操作
         */
        if ( !prev || ( prev && prev[0] != anchor[0] ) ) {
            prev && prev.removeClass( CUR_CLASS );
            ( prev = anchor ).addClass( CUR_CLASS )
        }
    }

    /*
     使用 prev 保存上一个高亮元素，因此这里不需要传值。
     */
    function unHighLight() {
        prev && prev.removeClass( CUR_CLASS )
        prev = null
    }
    $parent.on( 'click', 'a', function() {
        var anchor = $(this).attr('href').slice(1);
        anchor = $('#'+anchor)
        if (anchor.length){
        	if($navFixed == 0){
        		window.scrollTo(0 , anchor.offset().top - parentHeight*2 );
        	}else{
        		window.scrollTo(0 , anchor.offset().top - parentHeight );
        	}
        }
        this.blur()
        return false
    })
}())

 var lazyLoad = require('component/lazyLoad')
        lazyLoad.load('.more_pic span' ,'asrc');

