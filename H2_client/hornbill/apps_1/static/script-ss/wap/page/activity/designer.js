/*common*/
require('wap/zepto');

//调用ui的提示框
var Alert = require('wap/ui/alert');
function alertCon(msg){
    var a = new Alert({
        content : msg
    });
};


  
//app 登录
if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
    window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}


///* 图片轮播hack */
var touchSlide = require('wap/app/touchSlide')
if($('#imageSlide li').length != 0){
    var winWidth = $(document).width()
        ,slideHeight = 240 * winWidth / 640

    $("#imageSlide, #imageSlide li").width(winWidth).height(slideHeight + "px")
    if($('#imageSlide li').length > 1){
        $("#imageSlide").touchSlide({
            autoTime:5000,
            speed:300,
            enableScroll : 1
        })
    }
}


//弹出框提示的交互设置
var $mypopbox = $('#mypopbox')
    ,$dialogAlert = $('#dialogAlert')
    ,$dialogRule = $('#dialogRule')
    ,$wxGuide = $('#wxGuide')

$mypopbox.css({
    left: '-9999px',
}).show();

$dialogRule.css({
    left: '-9999px',
}).show();

var windowWidth = $(window).width()
    ,windowHeight = $(window).height()
    ,conSetH =  windowHeight - $('#dialogRuleBottom').height() - $('#dialogRuleTit').height() - 100
    ,conOldH =  $('#dialogRuleCon').height() ;

$mypopbox.css({
    left: '0',
}).hide();
$dialogRule.css({
    left: '50%',
}).hide();

if( conSetH  < conOldH ){
    $('#dialogRuleCon').css({
        height : conSetH
    })
    $('#dialogRule').css({
        top : '50px'
    })
}else{
    $('#dialogRule').css({
        top : 50 + (conSetH - conOldH)/2
    })
}

$('#openRule').click(function(){
    $mypopbox.show();
    $dialogRule.show();
})

$('#dialogAlertClose').click(function(){
    $mypopbox.hide();
    $dialogAlert.hide(); 
})

$('#dialogRuleClose').click(function(){
    $mypopbox .hide();
    $dialogRule.hide(); 
})

$mypopbox.click(function(){
    $mypopbox.hide();
    $dialogAlert.hide(); 
    $dialogRule.hide();
    $('#wxGuide').hide();
})

//touchmove禁止事件冒泡
function touchmoveStop(dom){
    if(dom){
        $(dom).on('touchmove', function(e) {
            //e.preventDefault();
            e.stopPropagation();
        });
    }
};
touchmoveStop('#mypopbox');

//分享 
if(fml.vars.isWx){
        
    //初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
        
    var shareData = {
        'desc' : fml.vars.shareContent,
        'imgUrl' : fml.vars.shareIcon,
        'title' : fml.vars.shareTitle,
        'url' : fml.vars.shareLink
    };
 
    shareWX.bind(shareData);

    $('#designer_share').click(function(){
        $mypopbox.show();
        $wxGuide.show();
    })
}else{
    $('#designer_share').click(function(){
        window.scrollTo(0,30000)
    })
}


//投票
$('.vt').click(function(){
    vote( $(this).attr('data-tid') )
})
function vote(tid){
    $.ajax({
        type : 'get',
        url : '/aj/designer/vote',
        data : {
            'project_id' : 3,
            'season_id' : 1,
            'item_id' : tid
        },
        success : function(data){
            res = JSON.parse(data);
            //console.log(res);
            if(res.error_code == 0){
                $mypopbox .show();
                $dialogAlert.show();
            }else if(res.error_code == 10100){
                alertCon('请先登录哦！');
            }else if(res.error_code == 40400){
                alertCon('没能成功投票！再试一试吧！');
            }else{
                alertCon('没能成功投票！');
            }
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
            alertCon('额，error！');
        }
    });
}




