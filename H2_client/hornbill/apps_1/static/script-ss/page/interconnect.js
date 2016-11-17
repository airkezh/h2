/*common*/

var $ = require('jquery');
var timedown = require('app/doota/timedown');
var checkcode = require('app/checkcode');


function validPhone (phone) {
    var $msg = $('.phone .reminder');
    $msg.html('');

    if(/^\d+$/.test(phone)){
        return true;
    }
    $msg.html('手机号填写有误');
    return false;
}

function validCode(code){
    var $msg = $('.verify .reminder');
    $msg.html('');

    if(/^\d+$/.test(code) && code.length == 6){
        return true;
    }
    $msg.html('验证码为6位数字');
    return false;
}

function validPicCode (code){
    var $msg  = $('.pic-code .reminder');
    $msg.html('');

    if(/^[0-9a-zA-Z]*$/g.test(code) && code.length == 4){
        return true;
    }
    $msg.html('图片验证码填写错误');
    return false;
}

function sendCode (cb) {

    var mobile = $.trim($('#mobile').val());
    var picCode = $.trim($('#picCode').val());

    if(validPhone(mobile) && validPicCode(picCode) && !countDown.flag){

        $.post('aj/interconnect/sendCode' , { 'mobile' : mobile, 'checkcode' : picCode } , function(data) {
            if(data.code == 0){
                cb && cb();
            }else{
                if(data.code == -4){
                    checkcode();
                    $('.pic-code .reminder').html(data.message);
                }else if(data.code == -3){
                    $('.phone .reminder').html(data.message);
                }else{
                    $('.success').html(data.message);
                }
            }

        } ,'json');
    }
}

function countDown () {
    if(countDown.flag){
        return;
    }
    countDown.flag = true;
    var $ele = $('.time');
    timedown.down($ele, parseInt($ele.data('remain'))).onAction(function(args) {
        $ele.html('<span class="timedown">' + args.s + '</span>秒后可重新发送');
    }).onTimeOver(function() {
        $ele.html('发送验证码');
        countDown.flag = false;
    });
}

function bindCb(){
    //延迟，显示成功,然后跳转
    $('.success').html('绑定成功');
    setTimeout(function(){
        location.href = '/welcome';
    },3000);
}

function bindPhone(cb){
    var mobile = $('#mobile').val();
    var code = $('#code').val();
    var picCode = $('#picCode').val();


    if(!validPhone(mobile) || !validCode(code) || !validPicCode(picCode)){
        return;
    }

    $.post('/aj/interconnect/bindPhone' , { 'mobile' : mobile, 'captcha' : code, 'picCode' : picCode } , 
        function(data) {
            if(data.code == 0){
                cb();
            }else{
                $('.success').html(data.message);
            }
            
    } , 'json');
}

function init(){

    checkcode();

    $('.exchange').on('click', function() {
        checkcode();
    });


    // $('input').on('blur', function(){
    //     var id = $(this).attr('id');
    //     var val = $.trim($(this).val());

    //     if(id == 'mobile'){
    //         validPhone(val);
    //     }
    //     else if(id == 'code'){
    //         validCode(val);
    //     }
    //     else if(id == 'picCode'){
    //         validPicCode(val);
    //     }

    // });

    $('.time').on('click', function() {
        sendCode(countDown);
    });


    $('.submit').on('click', function() {
        bindPhone(bindCb);
    });
}

init();






