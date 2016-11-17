/*common*/
/**
 * @page 微圈的新landing页的头部展示
 * @author xiaojingwang@meilishuo.com
 * @date 2015-03-25
 * @todo 头像和消息冒泡
 */

require( 'wap/zepto/fastclick' )
var $             = require( 'wap/zepto' ),
    num           = 0,
    users,
    msgs,
    maxNum        = 0,
    msgNum        = 0,
    $users,
    $msgs,
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

/**
 * 用户说话，显示信息
 * @param num
 */
function speak( num ) {
    $users.filter( num )
        .removeClass( NORMAL_IMG )
        .addClass( BIG_IMAGE )

    $msgs.filter( num )
        .removeClass( HIDE )
        .addClass( SHOW )
}

/**
 * 用户不说话~
 * @param num
 */
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

/**
 * 获取跟上一次随机数完全不同的数
 */
function fetchRestIndex() {
    var arr = checkingStr.substring( 0, checkingStr.length - 1 ),
        tmp = baseIndexes.concat(),
        indexes = '',
        len = tmp.length,
        num

    while ( len-- ) {
        num = tmp[ len ]
        if ( arr.indexOf( num ) == -1 ) {
            indexes += num
        }
    }
    return indexes
}

/**
 * 生成随机的顺序，用于动画展现
 *
 * 第 7 个用户始终说话
 * @returns {string}
 */
function randomIndex() {
    var indexes = '',
        needIndexLen = 5,
        tmp = baseIndexes.concat()

    while ( needIndexLen-- ) {
        indexes += tmp.splice( +( tmp.length * Math.random() ), 1 )
    }

    return indexes
}


exports.init = function init( _users, _msgs ){
    users = _users
    msgs = _msgs
    maxNum = users.length
    msgNum = msgs.length
    $users = $( 'img[data-num]' )
    $msgs  = $( '.msg p' )
    /**
     * 动画启动
     */
    reset();
    $( '.head-wall .num' ).on( 'animationend, webkitAnimationEnd', function() {
        $( this ).addClass( 'end-num' );
    })
};


