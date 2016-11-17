/*common*/
require( 'wap/zepto/touch' )

var ShareTmp       = require( 'wap/component/shareTmp' ),
    $doc           = $( document ),
    $menus         = $( '#menus' ),
    $cur           = $menus.children().first(),
    searchParam    = fml.vars.searchParam,

    ACTIVE         = 'active',
    stickerCatalog = {},
    $area          = $( '#list' )

/**
 * 根据页面宽度修改 tab 的空隙，让人能意识到此处可以滚动(让某个 tab 项露出一部分)
 * 算法随便写的
 */
function fixMenuPosition() {
    var docWidth    = $doc.width(),
        $items      = $menus.find( 'li' ),
        itemLen     = $items.size(),
        perMinWidth = docWidth / itemLen,
        sum         = [],
        gap         = [],
        finalGap, v

    $items.each( function( i, el ) {
        var w = el.offsetWidth

        if ( i == 0 ) {
            sum.push( w )
        } else {
            v = parseInt( ( docWidth - sum[ sum.length - 1 ] ) / ( 2 * ( i + 1 )) )
            sum.push( sum[ sum.length - 1 ] + w )
        }

        if ( v < perMinWidth ) {
            gap.push( v )
        }
    } )

    finalGap = ( gap[ 0 ] / 4 ) || 30

    $items.each( function( i, el ) {
        if ( !i ) {
            el.style.cssText = 'margin-right:' + finalGap + 'px;'
        } else if( i == ( itemLen - 1 ) ) {
            el.style.cssText = 'margin-left:' + finalGap + 'px; margin-right:' + 2 * finalGap + 'px;'
        } else {
            el.style.cssText = 'margin-left:' + finalGap + 'px; margin-right:' + finalGap + 'px;'
        }
    } )
}

$menus.on( 'tap', 'li', function() {
    var $this   = $( this ),
        cata    = $this.data( 'cata' ),
        sticker = stickerCatalog[ cata ],
        $container, preCata

    if ( this !== $cur[ 0 ] || !sticker ) {
        $cur.removeClass( ACTIVE )
        preCata = stickerCatalog[ $cur.data( 'cata' ) ]

        if ( preCata && preCata.el ) {
            preCata.el.hide()
        }

        $cur = $( this ).addClass( ACTIVE )

        if ( !sticker ) {
            $container = $( '<div/>', {
                class: 'container'
            } )
            $area.append( $container )
            sticker    = stickerCatalog[ cata ] = {
                el: $container
            }

            searchParam.catalog_id = cata

            $.ajax( {
                type: 'get',
                url: '/aj/sticker/list',
                data: searchParam,
                dataType: 'json',
                success: function( data ) {
                    if ( data && data.length ) {
                        sticker.el.html( ShareTmp( 'sticker-list', {
                            list: data,
                            JSON: JSON
                        } ) )
                    }
                }
            } )
        }

        sticker.el.show()
    }
} )

fixMenuPosition()
$cur.trigger( 'tap' )
