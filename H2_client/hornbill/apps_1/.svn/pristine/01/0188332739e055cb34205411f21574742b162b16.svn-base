/*common*/


var scrash = require('wap/app/scrash')
var openApp = require('wap/app/openApp')

$('#openAppBut').click(function(){
    openApp('meilishuo://open.meilishuo','http://m.meilishuo.com/download/latest/wap')
})

var quans = {
    0 : 0,
    1 : '100',
    2 : '60',
    3 : '10',
    4 : '5'
};

var level = 0;
var url = '/aj/guaguale/set';

function scrashCallback(f,t,cvs){
    if (cvs){
        cvs.parentNode && cvs.parentNode.removeChild(cvs)
    }
    setTimeout(function(){
        $('#main').hide();

        $('#result').show();
        $('#resultQuanNub').html(quans[level]);
    }, 2000)
};

function scrashNext(f,t,cvs){
    if (cvs){
        cvs.parentNode && cvs.parentNode.removeChild(cvs)
    }
    setTimeout(function(){
        myajax();
    }, 2000)
}

function myajax(){
    $.ajax({
        type : 'get',
        url : url,
        success : function(data){
            res = JSON.parse(data);
            console.log(res);
            if (res.error_code == 1) {
                if (res.data.award) {
                    scrash.createScratchCard('.quan_cover',70,scrashCallback,true)
                    level = res.data.award.prize_level;
                    $('#quanNub').html(quans[level]);
                    $('#quanWin').show().siblings('.quan_text').hide();
                }
            }else if(res.error_code == 0){
                //alert(res.error_code);
                scrash.createScratchCard('.quan_cover',70,scrashNext,true);
                $('#quanLoad').html('再努力吧~').show().siblings('.quan_text').hide();
            }else if(res.error_code == -1){
                scrash.createScratchCard('.quan_cover',70);
                $('#quanLoad').html('别贪心哦，明天再来').show().siblings('.quan_text').hide();
            }else if(res.error_code == -2){
                myajax();
            }
        },
        beforeSend : function(xhr){
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
            scrash.createScratchCard('.quan_cover',70);
            $('#quanLoad').html('券没有进来！').show().siblings('.quan_text').hide();
        },
        complete : function(xhr,status){
        }
    });
};

myajax();


//微信分享 分享imgUrl与title
var shareWX = require('wx/share');

var shareData = {
    'desc' : '515美丽说夏日狂欢，10亿现金券热辣来袭',
    'imgUrl' : 'http://d03.res.meilishuo.net/pic/_o/90/4e/20a5656bdfda94b6adca7d63336f_100_100.cg.png',
    'title' : '进来玩个刮刮卡，出去就变白富美，515来美丽说一起变美'
};
shareWX.bind(shareData);


//分享引导层show hide
// $('.share_but').click(function(){
//     $('#mypopbox').show();
// });

$('#mypopbox').click(function(){
    $(this).hide();
});

//抽奖规则 show hide
var ruleButFlag = 'main';
$('.rule_but a').click(function(){
    ruleButFlag = $(this).attr('name');
    console.log(ruleButFlag);
    $('#main , #result').hide();
    $('#rule').show();
});

$('#ruleClose').click(function(){
    $('#'+ruleButFlag).show();
    $('#rule').hide();
});







