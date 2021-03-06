/*common*/
var $          = require( 'jquery' );
var shareTmp   = require( 'component/shareTmp' );
var checkcode  = require( 'app/checkcode' );
var activityId = 12963;
var $body      = $( document.body );
var timeGap    = 60;    //倒计时的时间间隔
var getAjaxIsComplete  = true;
var sendAjaxIsComplete = true;
var $pcMobWrapper;
var $warning;
var $beforeWin;
var $afterWin;


init();

//页面初始化
function init() {
    // 进页面就判断是否显示弹层
    $.get( '/aj/pc_mob/show_win', { 'activity_id': activityId }, function( data ) {
        var showStatus = data.data.status;
        var tpl        = shareTmp( 'pcmob_window' );
        if ( $( '.pc_to_mob' ).length == 0 ) {
            if ( showStatus == 1 ) {

                $body.append( tpl );

                pcMobEventInit();

                // 获取图片验证码
                checkcode();

                // 将原来的左下角图标上移
                if ( $( '.activity_ad11' ).length == 0 ) {
                    $( document ).on( 'ad11_ok', function() {
                        $( '.activity_ad11' ).css( 'bottom', '152px' );
                    } );
                } else {
                    $( '.activity_ad11' ).css( 'bottom', '152px' );
                }
            }
        }
    }, 'json' );
}


function pcMobEventInit() {

    $pcMobWrapper = $( '.pc_to_mob ' );
    $warning      = $pcMobWrapper.find( '.warning' );
    $beforeWin    = $pcMobWrapper.find( '.before' );
    $afterWin     = $pcMobWrapper.find( '.after' );

    // 点击验证码图片可换一张
    $pcMobWrapper.on( 'click', '.checkImage', function() {
        checkcode();
    } );

    // 点击小图标，弹出弹层，并移除此小图标
    $pcMobWrapper.on( 'click', '.min_logo', function() {
        $( '.min_logo' ).hide();
        $( '.extend_bg' ).show();
    } );

    // 点击『领取福利』按钮，收集手机号和验证码发送到后台
    $pcMobWrapper.on( 'click', '.get_btn', function() {
        var checkResult = checkInput();
        if ( checkResult.status ) {
            goAndGet( checkResult.sendData );
        }
    } );

    //点击『不再显示』，以后都不再显示
    $pcMobWrapper.on( 'click', '.close_long_btn', function() {
        $( '.pc_to_mob' ).remove();
        $.get( '/aj/pc_mob/close_long', '', function() {
        }, 'json' )
    } );

    // 点击『没收到短信』，显示倒计时的重新发送框
    $pcMobWrapper.on( 'click', '.no_recive', function() {
        $( '.pc_to_mob .no_recive' ).hide();
        $( '.pc_to_mob .re_send' ).show();
    } );

    // 点击右上角的叉号，隐藏弹层
    $pcMobWrapper.on( 'click', '.close_btn', function() {
        $( '.min_logo' ).show();
        $( '.extend_bg' ).hide();
    } );

    $pcMobWrapper.on( 'focus', '.mobile, .verity_code', function() {
        $warning.empty();
    } );
}

// 检查手机号正确后再检查验证码
function checkInput() {
    var $mobile    = $pcMobWrapper.find( '.mobile' );
    var $picCode   = $pcMobWrapper.find( '.verity_code' );
    var mobileNum  = $mobile.val().trim();
    var picCode    = $picCode.val().trim();
    var sendData   = {};
    var returnData = { status: true };
    var res1       = checkMobile( mobileNum, $mobile );
    if ( res1 ) {
        var res2 = checkPicCode( picCode, $picCode );
        if ( res2 ) {
            sendData            = {
                'activity_id' : activityId,
                'mobile'      : mobileNum,
                'inputCaptcha': picCode
            };
            returnData.sendData = sendData;
        } else {
            returnData.status = false;
        }
    } else {
        returnData.status = false;
    }
    return returnData;
}

// 简单验证手机号，检查手机号位数是否是11位，并且全数字
function checkMobile( mobile, $mobile ) {
    if ( /^[0-9]*$/g.test( mobile ) && mobile.length == 11 ) {
        return true;
    } else {
        $mobile.val( '' );
        $warning.html( '请输入11位正确格式的手机号码' );
        return false;
    }
}

// 简单验证图片验证码，检查是否为4位
function checkPicCode( picCode, $picCode ) {
    if ( /^[0-9a-zA-Z]*$/g.test( picCode ) && picCode.length == 4 ) {
        return true;
    } else {
        $picCode.val( '' );
        $warning.html( '请输入4位正确的验证码' );
        return false;
    }
}

// 将信息发到后台，去领取优惠券
function goAndGet( sendData ) {
    if ( getAjaxIsComplete == true ) {
        getAjaxIsComplete = false;
        $.get( '/aj/pc_mob/apply', sendData, function( data ) {
            showResult( data );
            getAjaxIsComplete = true;
        }, 'json' )
    }
    // showResult();
}

// 展示结果
function showResult( data ) {
    var resultData  = data;
    var $scanNotice = $pcMobWrapper.find( '.scan_notice' );
    var resultCode  = resultData.error_code;

    //验证码错误
    if ( resultCode == -1 ) {
        $( '.input_msg .verity_code' ).val();
        $warning.html( '请输入4位正确的验证码' );
        checkcode();
        return;
    } else {
        $beforeWin.hide();
        $afterWin.show();
        if ( resultCode != 0 && resultCode != 1 ) {
            $pcMobWrapper.find( '.common_imgs' ).hide();
        }
        var tpl = shareTmp( 'result', { 'result': resultData } );
        $afterWin.append( tpl );
        $pcMobWrapper.find( '.re_mobile' ).val( resultData.data.mobile );
    }

    if ( resultCode == 0 || resultCode == 1 ) {
        cbk();
        $scanNotice.html( '扫描下载客户端' );
    } else if ( resultCode == 2 ) {
        $scanNotice.html( '下载享更多福利' );
    } else {
        $scanNotice.html( '先下载，坐等红包' );
    }
}

// 重新发送信息
function resend() {
    var $timeBox = $pcMobWrapper.find( '.resend_btn' );
    var mobile   = $pcMobWrapper.find( '.re_mobile' ).val();
    $timeBox.off( 'click', resend );
    $( ' .resend_btn ' ).css( { 'background': '#ccc', 'color': '#999' } );
    if ( sendAjaxIsComplete == true ) {
        sendAjaxIsComplete = false;
        $.get( '/aj/pc_mob/resend_msg', { 'mobile': mobile }, function( data ) {
            if ( data.error_code == 0 ) {
                $pcMobWrapper.find( '.re_send' ).hide();
                $pcMobWrapper.find( '.success' ).css( { 'top': '37.5%' } );
            } else {
                alert( '系统繁忙，请稍后再试' );
                $timeBox.css( { 'background': '#ffcc00', 'color': '#000' } );
                $timeBox.html( '重新发送' ).bind( 'click', resend );
            }
            sendAjaxIsComplete = true;
        }, 'json' );
    }
}

// 倒计时
function timeDown( times, cbk ) {
    window.setTimeout( function() {
        if ( !times ) {
            return;
        }
        else {
            times--;
            cbk( times );
            timeDown( times, cbk );
        }
    }, 1000 );
}

// 『重新发送』按钮的倒计时
function cbk() {
    var $timeBox = $( '.resend_btn' );
    $timeBox.css( { 'background': '#ccc', 'color': '#999' } );
    $timeBox.unbind( 'click' ).html( '<b>' + timeGap + '</b>s后发送' );
    var $time    = $timeBox.find( 'b' );
    timeDown( $time.html(), function( times ) {
        if ( !times ) {
            $timeBox.css( { 'background': '#ffcc00', 'color': '#000' } );
            $timeBox.html( '重新发送' ).one( 'click', resend );
        }
        else {
            $time.html( times );
        }
    } );
}
