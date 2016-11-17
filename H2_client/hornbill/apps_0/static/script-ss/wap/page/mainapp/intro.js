/*common*/
require( 'wap/zepto/touch' )

var WindowScroll  = require( 'wap/component/windowScroll' ),
    GoTop         = require( 'wap/component/gotop' ),
    OpenAppCustom = require( 'wap/app/openAppCustom' ),
    defaultTag    = fml.vars.default_tag || '我要卖脸赚10万现金',
    source        = fml.vars.source || 'sellface',
    _str          = 'meilishuo://publish_post.meilishuo/?json_params=' +
        encodeURIComponent( '{"default_tag" : "' +
            defaultTag + '", "source" : "' +
            source + '"}' ),

    $nav          = $( '#nav' ),
    $gotop        = $( '#gotop' ),
    $cur          = $nav.find( '.cur' ),
    $anchors      = $( '#main' ).find( '.anchor' ),
    $links        = $nav.find( 'a' ),
    positions     = [],

    OFFSET        = 20,
    TAP           = 'tap',
    url

GoTop.init( {
    el: '#gotop'
} )

if ( Meilishuo.config.os.mlsApp ) {
    url = _str
} else {
    url = '/goto/open/?url=' + encodeURIComponent( _str )
}

$anchors.each( function( index ) {
    positions.push( $anchors.eq( index ).offset().top - OFFSET )
} )

$( '#btn' ).on( TAP, function() {
    window.location.href = url
} )

$( '.js-download' ).on( TAP, function() {
    OpenAppCustom.check(function( isInstalled ) {
        var _url

        if ( isInstalled ) {
            _url = 'meilishuo://open.meilishuo/?json_params='
        } else {
            _url = url
        }

        location.href = _url
    })
})

$( '#tutorial' ).on( TAP, function() {
    $nav.toggleClass( 'hide show' )
} )

function highlight( index ) {
    var $el = $links.eq( index )
    if ( $el[ 0 ] !== $cur[ 0 ] ) {
        $cur.removeClass( 'cur' )
        $cur = $el.addClass( 'cur' )
    }

}

WindowScroll.bind( function( scrollTop ) {
    if ( scrollTop < 400 ) {
        $gotop.hide()
    } else {
        $gotop.show()
    }
} )

WindowScroll.bind( function( scrollTop ) {
    var i   = 0,
        len = positions.length,
        v

    for ( ; i < len; i++ ) {
        v = positions[ i ]
        if ( v > scrollTop ) {
            highlight( i > 0 ? i - 1 : 0 )
            return
        }
    }

    highlight( len - 1 )
} )

$nav.on( TAP, 'a', function() {
    if ( $cur[ 0 ] !== this ) {
        $cur.removeClass( 'cur' )
        $cur = $( this ).addClass( 'cur' )
        location.replace( this.href )
    }
} )
