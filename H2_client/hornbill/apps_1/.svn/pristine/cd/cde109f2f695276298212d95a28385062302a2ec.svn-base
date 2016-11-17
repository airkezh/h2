/*common*/
/**
 * @copy circle/page/tagshow.js
 */

require( 'wap/zepto/fastclick' )
var $             = require( 'wap/zepto' ),
    num           = 0,
    users         = fml.vars.users,
    msgs          = fml.vars.msgs,
    maxNum        = users.length,
    msgNum        = msgs.length,
    $users        = $( 'img[data-num]' ),
    $msgs         = $( '.msg p' ),
    baseIndexes   = '01234567'.split( '' ),
    NORMAL_IMG    = 'normal-img',
    BIG_IMAGE     = 'big-img',
    HIDE          = 'msg-hide',
    SHOW          = 'msg-show',
    RESET_TIMEOUT = 2000,
    times         = 0,

    checkingStr

function move() {
    var selector
    setTimeout( function() {
        selector = '[data-num="' + num + '"]'

        if ( checkingStr.indexOf( num ) != -1 ) {
            if ( num == 6 || num == 7 || num < msgNum ) {
                speak( selector )
            } else {
                silent( selector )
            }
        } else {
            silent( selector )
        }
        num++

        if ( num < maxNum ) {
            move()
        } else {
            num = 0

            setTimeout( reset, RESET_TIMEOUT )
        }
    }, parseInt( 50 * ( 1 + Math.random() ) ) )
}

function speak( num ) {
    $users.filter( num )
        .removeClass( NORMAL_IMG )
        .addClass( BIG_IMAGE )

    $msgs.filter( num )
        .removeClass( HIDE )
        .addClass( SHOW )
}

function silent( num ) {
    $users.filter( num )
        .removeClass( BIG_IMAGE )
        .addClass( NORMAL_IMG )

    $msgs.filter( num )
        .removeClass( SHOW )
        .addClass( HIDE )
}

function reset() {
    if ( maxNum == 0 ) {
        return;
    }
    if ( times++ % 2 ) {
        checkingStr = fetchRestIndex()
    } else {
        checkingStr = randomIndex()
    }
    move()
}

function fetchRestIndex() {
    var arr     = checkingStr.substring( 0, checkingStr.length - 1 ),
        tmp     = baseIndexes.concat(),
        indexes = '',
        len     = tmp.length,
        num

    while ( len-- ) {
        num = tmp[ len ]
        if ( arr.indexOf( num ) == -1 ) {
            indexes += num
        }
    }
    return indexes
}

function randomIndex() {
    var indexes      = '',
        needIndexLen = 5,
        tmp          = baseIndexes.concat()

    while ( needIndexLen-- ) {
        indexes += tmp.splice( +( tmp.length * Math.random() ), 1 )
    }

    return indexes
}

reset()

$( '.head-wall .num' ).on( 'animationend, webkitAnimationEnd', function() {
    $( this ).addClass( 'end-num' );
} )
