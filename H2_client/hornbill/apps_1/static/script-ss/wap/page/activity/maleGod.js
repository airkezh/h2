/*common*/
require( 'wap/zepto' );
var shareTmp = require( 'component/shareTmp' );
// 客户端微信分享
var ShareTo           = require( 'wap/app/shareTo' )
    // 微信浏览器里的分享
    , WXShare         = require( 'wx/share' )
    , WXSign          = require( 'wx/sign' )
    , openAppCustom   = require( 'wap/app/openAppCustom' )
    , Alert           = require( 'wap/ui/alert' )
    , isWeixinBrowser = Meilishuo.config.os.weixinBrowser
    , godName         = 'xxx'
    , myChoice        = ''
    , jumpHerf        = ''
    , appInstalled
    , opt
    , searchKey
    , AjaxIsComplete  = true
    , $wholePages     = $( '.page' )
    , $testPages      = $( '.test' )
    , $resultPage     = $( '.result' )
    , shareData       = {
        'desc'  : '我的风格竟然最吸引"xxx"，你也快来美丽说试试，每天百款上新，约男神不单调！',
        'imgUrl': 'http://d03.res.meilishuo.net/pic/_o/c0/b8/5314b82155e1493be184c4e99e9c_100_100.cg.png',
        'title' : '男神约不约',
        'link'  : 'http://m.meilishuo.com/activity/amazingTest/maleGod/'
    };

/* 弹窗 */
var newAlert = function( param ) {
    new Alert( {
        'content': param,
        'onSure' : function() {
        }
    } );
};

$( '.start_btn' ).on( 'click', function() {
    showPage( $( '.ques1' ) );
} );

$testPages.on( 'click', '.item', function() {
    var $newChoosed = $( this );
    if ( !$newChoosed.hasClass( 'choosed' ) ) {
        var $oldChoosed = $newChoosed.parent().find( '.choosed' );
        if ( $oldChoosed.length > 0 ) {
            $oldChoosed.removeClass( 'choosed' );
            $oldChoosed.children( '.decorate' ).remove();
        }
        $newChoosed.addClass( 'choosed' );
        $newChoosed.append( '<span class="decorate"></span>' );
    }
    var $testBtn = $newChoosed.parents( '.content' ).find( '.red_btn' );
    var num      = $newChoosed.find( 'span' ).html();
    $testBtn.data( 'choose', num );
} )

$testPages.on( 'click', '.next_btn', function() {
    if ( checkChoosed( $( this ) ) ) {
        var quesNum  = $( this ).data( 'next-ques' );
        var nextPage = $( '.ques' + quesNum );
        myChoice += $( this ).data( 'choose' );
        myChoice += ',';
        showPage( nextPage );
    } else {
        newAlert( '请选择一项' );
    }

} )

$( '.ques3 .result_btn' ).on( 'click', function() {
    if ( checkChoosed( $( this ) ) ) {
        myChoice += $( this ).data( 'choose' );
        showPage( $( '.waiting' ) );
        getResult();
    } else {
        newAlert( '请选择一项' );
    }
} )

$( document ).on( 'click', '.more_btn', function() {
    location.href = jumpHerf;
} );

$( document ).on( 'click', '.share_box a', function() {
    if ( Meilishuo.config.os.mlsApp ) {
        opt = opt || {
                'text' : '我的风格竟然最吸引"' + godName + '"，你也快来美丽说试试，每天百款上新，约男神不单调!',
                'title': shareData.title,
                'pic'  : shareData.imgUrl,
                'url'  : shareData.link,
            }
        if ( $( this ).attr( 'class' ) == 'share_pengyou' ) {
            ShareTo.shareToPengYou( opt );
        } else {
            ShareTo.shareToPengYouQuan( opt );
        }
    } else if ( isWeixinBrowser ) {
        $( '.share_mask' ).show();
    }
} )

$( document ).on( 'click', '.share_mask', function() {
    $( this ).hide();
} )


function showPage( $currentPage ) {
    $wholePages.hide();
    $currentPage.show();
}

function checkChoosed( $btn ) {
    var choosedItem = $btn.parents( '.content' ).find( '.choosed ' );
    if ( choosedItem.length > 0 ) {
        return true;
    } else {
        return false;
    }
}

function getResult() {
    if ( AjaxIsComplete == true ) {
        AjaxIsComplete = false;
        $.ajax( {
            url     : '/aj/maleGod/getMaleGod',
            type    : 'get',
            dataType: 'json',
            data    : { 'answer': myChoice },
            success : function( data ) {
                AjaxIsComplete = true;
                showPage( $resultPage );
                var tpl        = shareTmp( 'result', { 'result': data } );
                var godmsg     = data.data.godman;
                searchKey      = data.data.keyword;
                $resultPage.append( tpl );
                godName        = godmsg.name;
                wxInit();
                setJumpHref();
            },
            error   : function() {
                AjaxIsComplete = true;
                newAlert( '系统繁忙，请稍后再试' );
            }
        } )
    }
}

function setJumpHref() {
    if ( appInstalled ) {
        jumpHerf = 'meilishuo://search_goods_result.meilishuo?json_params='
            + encodeURIComponent( JSON.stringify( { tag_word: searchKey } ) );
    } else {
        jumpHerf = 'http://m.meilishuo.com/search?keyword=' + searchKey;
    }
}

/**
 * 判断是否安装了美丽说客户端
 */
function checkAppInstalled() {
    openAppCustom.check( function( hasApp ) {
        if ( hasApp ) {
            appInstalled = true;
        } else {
            appInstalled = false;
        }
    } )
}

function wxInit() {
    //设置微信二次分享
    if ( isWeixinBrowser ) {
        WXSign();
        shareData.desc = '我的风格竟然最吸引"' + godName + '"，你也快来美丽说试试，每天百款上新，约男神不单调!',
            WXShare.bind( shareData );
    }
}

// start
;
(function() {
    showPage( $( '.start' ) );
    wxInit();
    checkAppInstalled();
}())

