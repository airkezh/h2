/*common*/
require( 'circle/zepto/touch' )
var $ = require( 'circle/zepto' ),
    $download = $( '.download' ),
    $ios      = $( '.ios_down' ),
    $android  = $( '.android_down' );

$ios.delegate( '.btn', 'tap', function() {
    var $el      = $( this ),
        $clicked = $ios.find( '.btn_clicked' )

    $el.hide();
    $clicked.show();
    window.location.href = 'http://www.pgyer.com/hNXi';

    setTimeout( function() {
        $el.show()
        $clicked.hide()
    }, 0)
} )

$android.delegate( '.btn', 'tap', function() {
    var $el      = $( this ),
        $clicked = $android.find( '.btn_clicked' )

    $el.hide();
    $clicked.show();
	window.location.href = 'http://i.meilishuo.net/css/images/mobile/weiquan/weiquan.apk?' + +( new Date );

    setTimeout( function() {
        $el.show()
        $clicked.hide()
    }, 0)
} )


