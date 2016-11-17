/*common*/
var $ = require( 'circle/zepto' )

exports.fix = function( fixedClass, el ) {
    var $body = $( document.body ),
        $el = $( el || 'input,textarea' )

    $el.on( 'focus', function() {
        $body.addClass( fixedClass )
    } ).on( 'blur', function() {
        $body.removeClass( fixedClass )
    })
}

/*
http://dansajin.com/2012/12/07/fix-position-fixed/

http://stackoverflow.com/questions/14492613/ios-ipad-fixed-position-breaks-when-keyboard-is-opened
*/
