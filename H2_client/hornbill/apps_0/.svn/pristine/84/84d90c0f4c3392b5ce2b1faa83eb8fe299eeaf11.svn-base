/*common*/
require('wap/zepto');
require('wap/app/dialog');

var a = require("wap/ui/alert");
var shareTmp = require('wap/component/shareTmp');
var tracking = require('wap/app/tracking');

var $turntable = $(".luck p span");
var $fire = $('.fire');
var $addBtn = $('#address_cancel_btn');
var isRotate = false;
var isWin, award;




//客户端分享数据
var appShare = require('wap/app/appShare');

fml.vars.params = {
    'title': fml.vars.shareTitle ,
    'text': {
        'weixin': fml.vars.shareTimelineText ,
        'weixin_timeline': '',
        'default': fml.vars.shareTimelineText 
    },
    'pic': fml.vars.imgUrl,
    'url': fml.vars.lineLink 
};

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
    appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}



//app 登录
if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
    setTimeout(function(){
        window.location.href = "meilishuo://login.meilishuo/";  
    }, 1000);
}

$('body').click(function(){
    if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
        window.location.href = "meilishuo://login.meilishuo/";  
    }
});

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};


if(fml.vars.isWx){
    //初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
    shareData = {
        'desc' : fml.vars.shareTimelineText,
        'imgUrl' : fml.vars.imgUrl ,
        'title' : fml.vars.shareTitle ,
        'link' : fml.vars.lineLink
    };
    shareWX.bind(shareData);
}

if(+fml.vars.myId){
    $.ajax({
        url : "/aj/activity/wxadd?from="+fml.vars.myId,
        type : "get",
        dataType : "json",
        async : false,
        success : function(data) {
        },
        error : function(data) {
            // alert("error:" + JSON.stringify(data));
        }
    }); 
}

$fire.on('tap',function(){

    $fire.addClass('fire2')
    isWin = false;
    var result;
    tracking.cr('wx/statistics_action', {'action': 'clickFire', 'value' : 'yes'})
    if (!isRotate) {
            isRotate = true;
            /*ajax请求，判断是否获奖、填充图片地址*/
            $.post("/aw/sale/turntab?activity_id=21", {"act" : "set"}, function(data) {
                console.log(JSON.stringify(data))
                if (data.error_code == -10) {
                    var alt = new a({
                        content : "用户账号异常，请稍后再试！",
                        onSure : function () {
                            isRotate = false;
                            return;
                        }
                    });
                }
                var result;
                fml.vars.leftTimes = data.data.leftTimes;
                $("#leftTimes").html(data.data.leftTimes);
                if (data.error_code == -1) {
                    var alt = new a({
                        content : "今天没有抽奖机会了，马上邀请好友增加抽奖机会！",
                        onSure : function () {
                            isRotate = false;
                            return;
                        }
                    });
                    tracking.cr('wx/statistics_action', {'action': 'clickFire', 'value' : 'no'})
                    return;
                }
                // alert(JSON.stringify(data.data.award));
                if (!data.data.award) { //没中奖
                    //alert(data.data.award);
                    /*判断haveShare leftTimes 构建 award*/
                    result = 0;
                    window.setTimeout(function() {
                        location.href = '/activity/christmas/pagno/';
                    },5000);
                } else {
                    isWin = true;
                    result = parseInt(data.data.award.prize_level);
                    // alert(JSON.stringify(data));
                    // award = awards[result];
                    //alert(result);
                    window.setTimeout(function() {
                        switch(result){
                            case 1://百元优惠券
                            location.href = '/activity/christmas/pagwatch/?tid=100';
                            break;
                            case 2://60元优惠券
                            location.href = '/activity/christmas/pagwatch/?tid=60';
                            break;
                            case 3://20元优惠券
                            location.href = '/activity/christmas/pagwatch/?tid=20';
                            break;
                            case 4://5元优惠劵
                            location.href = '/activity/christmas/pagwatch/?tid=5';
                            break;
                            case 5://3元优惠劵
                            location.href = '/activity/christmas/pagwatch/?tid=3';
                            break;
                        }
                    },5000);
                }
                rotate(result);
            },"json");

        }
});

var rank = [2,7,5,6,1,3];
function rotate(result, callback) {
    isRotate = true;
    var runTime = 70 + rank[result];
    for (var i = 0; i < runTime; i++) {
        !function(m) {
            window.setTimeout(function() {
                setPointer(m%7);
            }, m * 50);
        }(i)
    }
}
function setPointer(i) {
    $turntable.eq(i-1).addClass('gray')
    $turntable.eq(i).removeClass('gray')         
}

$('.share').on('tap' , function(){
    tracking.cr('wx/statistics_action', {'action': 'clickShare', 'value' : '1'})
    var tpl = shareTmp('share_md')
    $.fn.dialog({dialogContent : tpl , dialogTitle : '',dialogWidth : 320})
    $('#dialogLayer').css('top',$(window).scrollTop())
    $('#dialogLayer').css('height','240px')
    $('#dialogLayer .dialogTitle .close').text('')      
})
$addBtn.on('tap' ,function(){
    // alert('hoho')
    data = {
        "name": $(".name").val()
        ,"tel" : $(".tel").val()
        , "addr" : $(".addr").val()
    };
    $.post("/aw/sale/wxChrim", data, function(res) {
        // alert(JSON.stringify(res))
        if (res.code == 0 && data.name && data.tel && data.addr) {
            location.href = "/wx/pagsucss?tid=" + fml.vars.tid
            return;
        }else if(res.code == -2){
             var alt = new a({
                content : "信息不全"
            });
            return;
        }
    }, "json");
});


