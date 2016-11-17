/*common*/
var $ = require( 'wap/zepto' ),
    CheckLogin = require('wap/app/checkLogin'),
    twitterApi = require('app/twitterApi').twitterApi

return function( el, callback ) {
    callback = callback || function() { return true }

    $( el ).on( 'tap', function() {
        var $el    = $( this )

        if ( !CheckLogin() ) {
            return
        }

        if ( $el.data( 'loading' ) ) {
            return
        }

        $el.data( 'loading', true )

        twitterApi( 'like', {
            stid: $el.data( 'tid' )
        }, function( data ) {
            callback.call( $el, data )
            $el.data( 'loading', false )
        })
    } )
}
