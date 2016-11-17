/*common*/
/**
 * @page 微圈的图文页
 * @author xiaojingwang@meilishuo.com
 * @date 2015-03-18
 * @todo 图片轮播
 */

require( 'circle/zepto/fastclick' )
var $            = require( 'circle/zepto' )
    , touchSlide = require( 'circle/app/touchSlide' )
    , like       = require( 'circle/app/like' )

function imageSlide() {
    if ( $( '#imageSlide li' ).length != 0 ) {
        var winWidth = $( document ).width()
            , slideHeight = 520 * winWidth / 640

        $( '#imageSlide, #imageSlide li' ).width( winWidth ).height( slideHeight + 'px' )
        if ( $( '#imageSlide li' ).length > 1 ) {
            $( '#imageSlide' ).touchSlide()
        }
    }
}

like( '.js-like', function( isLike ) {
    if ( isLike ) {
        this.addClass( 'is-liked' )
    } else {
        this.removeClass( 'is-liked' )
    }
} )

imageSlide( { numBox: '.num' } );


