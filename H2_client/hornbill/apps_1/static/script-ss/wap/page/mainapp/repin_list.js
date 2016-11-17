/*common*/
var $              = require( 'wap/zepto/touch' ),
    ShareTmp       = require( 'wap/component/shareTmp' ),
    WindowScroll   = require( 'wap/component/windowScroll' ),
    GoTop          = require( 'wap/component/gotop' ),

    $win           = $( window ),
    $doc           = $( document ),
    $main          = $doc.find( '.js-main' ),
    $loadingBar    = $( '#loading-bar' ),

    documentHeight = $doc.height(),
    offset         = fml.vars.offset,
    msgID          = fml.vars.msg_id,
    isLoading      = false,
 
    MIN_OFFSET     = 4 * $win.height(),
    TIME_GAP       = 400,

    timeoutID

function end() {
    $win.off( 'scroll' )
}

function fetch() {
    if ( isLoading ) {
        return
    }

    $loadingBar.attr( 'status', 'loading' )
    isLoading = true

    $.ajax( {
        url: '/aj/mainapp/repin_list',
        method: 'get',
        dataType: 'json',
        data: {
            limit: 10,
            offset: offset,
            msg_id: msgID
        },
        success: function( data ) {
            isLoading = false

            if ( data && data.length ) {
                $main.append( ShareTmp( 'repin-list-tmpl', {
                    list: data,
                    offset: offset
                } ) )
                offset += data.length
                documentHeight = $doc.height()
            } else {
                end()
            }

            $loadingBar.attr( 'status', 'stop' )
        }
    } )
}

;
(function init() {
    var $gotop      = $doc.find( '.gotop-wrap' ),
        isGotopHide = true

    GoTop.init( {
        el: $gotop
    } )

    if ( !offset ) {
        $main.addClass( 'is-empty' )
            .html( '没有更多内容了!' )
        return
    }

    /**
     * 使用 isGotopHide 来避免对 DOM 的过多操作(其实没什么必要……)
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

    $win.on( 'scroll', function() {
        clearTimeout( timeoutID )

        timeoutID = setTimeout( function() {
            if ( documentHeight - $win.scrollTop() <= MIN_OFFSET ) {
                fetch()
            }
        }, TIME_GAP )
    } )
}())
