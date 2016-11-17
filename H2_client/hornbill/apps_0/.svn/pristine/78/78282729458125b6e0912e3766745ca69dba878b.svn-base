/*common*/
var slipPage = require('h5/app/slipPage');
// var action = require('m/app/h5/action')
var pt = require('wap/app/lark/pt');
var tracking = require('wap/app/tracking');
require('wap/zepto/fastclick');
var ShareTo = require('wap/app/shareTo');
var share = require('wap/app/lark/wxShare')
var opt = {
    'img_url' : Meilishuo.config.picture_url + '/images/lark/pt_game/sharePic.jpg',
    'link' : 'm.meilishuo.com/wx/pt/',
    'title' : '美丽说圣诞拼图乐，多款拼图等你来玩！',
    'desc' : '来美丽说玩拼图，每天20万张全场直减券等你抢！',
    'appid' : 'wx28b165b5a629bb11',
    'img_width' : '200',
    'img_height': '200'
}
share.init(opt,function(){
	//是否分享
    $.get('/aj/wx_new/pt_send',{'act':'share','activity_id':'23'},function(data){
        var share = JSON.parse(data);
        window.location.reload();
    });
    window.location.reload();
},function(){
	$.get('/aj/wx_new/pt_send',{'act':'share','activity_id':'23'},function(data){
        var share = JSON.parse(data);
        window.location.reload();
    });
    window.location.reload();
});
var isWeixinBrowser = !Meilishuo.config.os.mlsApp;
if (!fml.vars.sharedId && !isWeixinBrowser) {
    window.location.href = 'meilishuo://login.meilishuo/?json_params=';
};
require('wap/zepto/touch')

var opts = {
	outer : $('.wrap')
	, page : $('.wrap').find('.page')
}

var slipPage = require('h5/app/slipPage').init(opts);
// var action = require('m/app/h5/action').init(slipPage);
$('#page_2').on('touchstart',function(){
	slipPage.setMove(0);
	$(this).off('touchstart');
});

// window.action = action
window.slipPage = slipPage

//demo 翻页
slipPage.setFinish(1)
//demo 带动作翻页
// action.init(slipPage)
slipPage.setMove(0);

/**************page_1************************/
var screenHeight = $(window).height();
var screenWidth = $(window).width();
var imgHeight = 0;
//开始游戏
$('.start').on('touchend',function(event) {
    if (!fml.vars.sharedId) {
        window.location.reload();
        slipPage.setMove(0);
        return false;
    }else if (!fml.vars.shared && !fml.vars.count) {
        //再获两次机会
        popwin();
        resultsHum();
        $('.time-over').hide();
        btnShareChance(25);
        btnClose($('.popup-img'),$('.popup-container'),true);
        slipPage.setMove(0);
        return false;
    }else if (fml.vars.shared && !fml.vars.count) {
        //明天再来
        popwin();
        resultsHum();
        $('.time-over').hide();
        btnPlayTomorrowBig();
        btnClose($('.popup-img'),$('.popup-container'),true);
        slipPage.setMove(0);
        return false;
    };
    slipPage.setMove(1);
    $('#page_2').css({"visibility":"visible"});
    tracking.cr(' /cr/m/statistics_action', {'action' : 'pintuGameStart', 'value' : '0'});
    slipPage.goNext();
    slipPage.setMove(0);
    countdown();
});
$('.share').on('touchend',function(){
    tracking.cr(' /cr/m/statistics_action', {'action' : 'pintuShareGame', 'value' : '0'});
    shareBar();
});
var shareBar = function(opt){
    opt = opt || {};
    opt = {
        'text' : opt.text || '来美丽说玩拼图，每天20万张全场直减券等你抢！',
        'title' : opt.text || '美丽说圣诞拼图乐，多款拼图等你来玩！',
        'pic' : Meilishuo.config.picture_url + '/images/lark/pt_game/sharePic.jpg',
        'url' : '/wx/pt'
    }
    if (!isWeixinBrowser) {
        $.get('/aj/wx_new/pt_send',{'act':'share','activity_id':'23'},function(data){
            if(!fml.vars.shared){
                fml.vars.shared = 1;
            }
            
            //hack
            setTimeout(function(){
                window.location.reload();
            },4000);

            ShareTo.shareToPengYouQuan(opt);
        });
    }else{
        $.get('/aj/wx_new/pt_send',{'act':'share','activity_id':'23'},function(data){
            setTimeout(function(){
                showWxDiv();
            },0);
        });
    }
}

var showWxDiv = function(){
    $('.popwin').show();
    $('.popwin-share').show();
    $('.popwin-share').on('touchstart',function(){
        $('.popwin').hide();
        $('.popwin-share').hide();
    });
}

//游戏规则
$('.rules').on('touchend',function(){
    $('.popwin').show();
    $('.rules-popup').show();
    btnClose($('.rules-popup'));
    btnKnow($('.rules-popup'),$('.rules-popup > img').get(0).getBoundingClientRect().height);
});
//获奖名单
$('.winner-list').on('touchend',function(){
    $('.popwin').show();
    $('.winner-list-popup').show();
    $('.popup-container').css('visibility','visible');
    imgHeight = $('.winner-list-popup > img').get(0).getBoundingClientRect().height;
    $('.popup-container').show().css({"height":(imgHeight * 0.7) + 'px',"top":imgHeight*0.23 + 50 + 'px'});
    var _padding = $('.winner-content p').css("padding-top");
    if (!parseInt(_padding)) {
        $('.winner-content p').css({
            "padding-top":($('.popup-container').height()-$('.winner-content p').height()*5)/10,
            "padding-bottom":($('.popup-container').height()-$('.winner-content p').height()*5)/10
        });
    }
    var j=0;
    var pHeight = $('.winner-content p').get(0).getBoundingClientRect().height;
    var timer = setInterval(function(){
        // debugger;
        $('.winner-content').css({"top":-pHeight*j+'px'});
        var _eq = Math.round($('.winner-content').get(0).getBoundingClientRect().top - Math.round(+$('.popup-container').css('top').replace(/px/g,''))) + $('.winner-content p').height()*($('.winner-content p').length - 5);
        if(Math.abs(_eq) < 8){
            $('.winner-content').css("top","0");
            j = -1;
        }
        j++;
    },1000);
    $('.popwin').show();
    btnClose($('.winner-list-popup'),timer);
    btnKnow($('.winner-list-popup'),$('.winner-list-popup img').get(0).getBoundingClientRect().height,timer);
});
//关闭按钮
function btnClose(img,timer,pageNum){
    var $btnClose = $("<image class='btn-close' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-close.png'>");
    $btnClose.css({"width":"10%","position":"absolute","z-index":"20","top":'50px',"right":"0","display":"block"});
    $('body').append($btnClose);
    $('img.btn-close').off('touchend').on('touchend',function(){
        window.location.reload();
        // slipPage.setMove(0);
        // close(img,timer);
        // if(pageNum){
        //     window.location.reload();
        // }
    });
};
//知道了按钮
function btnKnow(img,imgHeight,timer){
    var $btnKnow = $("<image class='btn-know' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-know.png'>");
    $btnKnow.css({"width":"40%","position":"absolute","z-index":"20","top":50+imgHeight+10+'px',"display":"block"});
    $('body').append($btnKnow);
    $btnKnow.css({"left":(screenWidth-$btnKnow.width())/2});
    $btnKnow.on('touchend',function(){
        close(img,timer);
    });
};
//关闭事件
function close(img,timer){
    img.hide();
    $('.btn-close').hide();
    $('.btn-know').hide();
    $('.popwin').hide();
    if($('.popup-container')){
        $('.popup-container').css("visibility","hidden");
    }
    if(timer){
        clearInterval(timer);
    }
   
};
/**************page_1************************/

function countdown(){
    $pTime = $("#test");
    $pTime.show();
    $pTime.css({"width":"100%","font-size":"40px","color":"#ffd200","z-index":"30","position":"absolute","top":"20px","text-align":"center"});
    $('.popwin').show();
    $pTime.html("请记住原图哦");
    var time = 3;
    var timer = setInterval(function(){
        $pTime.show();
        $pTime.removeClass('last-count' + (time + 1));
        $pTime.html(time--).addClass('last-count' + time);
        if(time<0){
            $pTime.html("Ready");
            $pTime.removeClass('last-count0');
            $pTime.addClass('last-count4');
            clearInterval(timer);
            setTimeout(function(){
                $pTime.html("GO!");
                $pTime.removeClass('last-count4');
                $pTime.addClass('last-count5');
                setTimeout(function(){
                    $pTime.hide();
                    $('.popwin').hide();
                    countTime();
                    var aImg = $('.pt-board img');
                    var imgWidth = ($('.game-board').width()*0.86)/3;
                    pt.start(3,aImg,imgWidth,function(){
                        clearInterval(data);
                        var completeTime = $('.count-time').html();
                        useTime = 25.0 - completeTime;
                        results(useTime.toFixed(1));
                        fml.vars.wxopt = {
                            'img_url' : Meilishuo.config.picture_url + '/images/lark/pt_game/sharePic.jpg',
                            'link' : 'm.meilishuo.com/wx/pt/',
                            'title' : '美丽说圣诞拼图乐，多款拼图等你来玩！',
                            'desc' : '棒呆！你只用了' + (+useTime).toFixed(2) + '秒完成拼图，打败了' + (-0.47 * useTime + 100).toFixed(2) + '%  的用户！！~继续加油喔',
                            'appid' : 'wx28b165b5a629bb11',
                            'img_width' : '200',
                            'img_height': '200'
                        }
                    });
                },1300);
            },1300);
         }
    },1300);
};
function countTime(){
    var i = 1;
    data = setInterval(function(){
        var dataTime = 25.0-0.1*i;
        dataTime = Math.round(10 * dataTime) / 10;
        dataTime = dataTime .toFixed(1);
        if(dataTime < 10){
            dataTime = '0' + dataTime;
        }
        $(".count-time").html(dataTime);
        i++;
        if(25.0-0.1*i < 0){
            $(".count-time").html("00.0");
            clearInterval(data);
            if($(".count-time").html()=="00.0"){
                results(25);
            }
        }
    },100);
}
/******************拼图界面***********************/
var topCount = function(){
    $('.count-down').css({
        "top":$('.game-top-banner').height(),
        "left":(screenWidth-$('.count-down').width())/2+'px'
    });
    $('#page_2 p').css({
        "top":$('.game-top-banner').height()+$('.count-down').height()*0.15+'px',
        "left":(screenWidth-$('#page_2 p').width())/2+'px'
    });
    $('.pt-board').css({
        "width":$('.game-board').width()*0.86+4+'px',
        "height":$('.game-board').width()*0.86+4+'px',
        "top":$('.game-top-banner').get(0).getBoundingClientRect().height+Math.round(0.119140625*$(window).width()) + 5 +'px',
        "left":$('.game-board').get(0).getBoundingClientRect().left+$('.game-board').width()*0.07-2+'px',
    });
    $('.pt-board img').css({
        "width":($('.game-board').width()*0.86)/3,
    });
}
// topCount();
if ($('.game-top-banner').get(0).getBoundingClientRect().height) {
    topCount();
}else{
    $('.game-top-banner').on('load',function(){
        topCount();
    });
}
/****************游戏结果弹层情况****************/
var shared = fml.vars.shared;
function results(useTime){
    //是否中奖
    if (useTime < 25) {
        $.get('/aj/wx_new/pt_send',{'act':'set','activity_id':'23'},function(data){
            var data = JSON.parse(data);
            chance = data.data.leftTimes;  //剩余次数
            coupons = data.error_code > 0 ? data.error_code : 0;  //1-中奖  0-未中
            money = (data.data.award && data.data.award.awardname) || '0元直减券';
            popresult(useTime,coupons,chance,money);
        });
    }else{
        $.get('/aj/wx_new/pt_send',{'act':'fail','activity_id':'23'},function(data){
            var data = JSON.parse(data);
            chance = data.data.leftTimes;  //剩余次数
            coupons = 0;  //1-中奖  0-未中
            money = '0元直减券';
            popresult(useTime,coupons,chance,money);
        });
    }
    
    // 弹出层
        // coupons = 0;
        // chance = 0;
        // popresult(useTime,coupons,chance);
    //<30  未中
    function popresult(useTime,coupons,chance,money){  //youwenti know
        // shared = 0;
        $('.play-chance').html(chance);
        if(useTime < 25 && coupons==0 && chance >= 1){
            popwin();
            resultsGood();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            btnPlayAgain();
            btnShareResults(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime < 25 && coupons==0 && chance < 1 && shared == 0){ //noshare
            popwin();
            resultsGood();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            btnShareChance(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime < 25 && coupons==0 && chance < 1 && shared != 0){ //share
            popwin();
            resultsGood();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            btnPlayTomorrow();
            btnShareResults(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }
        // <30 中奖
        else if(useTime < 25 && coupons==1 && chance >= 1){
            popwin();
            resultsLucky();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            $('.coupons-money').html(money);
            btnPlayAgain();
            btnShareResults(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime < 25 && coupons==1 && chance < 1 && shared == 0){
            popwin();
            resultsLucky();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            $('.coupons-money').html(money);
            btnShareChance(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime < 25 && coupons==1 && chance < 1 && shared != 0){//share
            popwin();
            resultsLucky();
            $('.use-time').html(useTime);
            $('.bat-user').html((-0.47*useTime+100).toFixed(2));
            $('.coupons-money').html(money);
            btnPlayTomorrow();
            btnShareResults(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }
        // >30
        else if(useTime >= 25 && chance >= 1){ //share
            popwin();
            resultsPity();
            btnPlayAgainBig();
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime >= 25 && chance < 1 && shared == 0){ //noshare
            popwin();
            resultsPity();
            btnShareChance(useTime);
            btnClose($('.popup-img'),$('.popup-container'),true);
        }else if(useTime >= 25 && chance < 1 && shared != 0){ //share
            popwin();
            resultsHum();
            $('.time-over').show();
            btnPlayTomorrowBig();
            btnClose($('.popup-img'),$('.popup-container'),true);
        }
    }
}
//弹出层
function popwin(){
    $('.popwin').show();
}
//弹出层-帮帮哒
function resultsGood(){
    $('.results-good').show();
    imgHeight = $('.results-good > img').get(0).getBoundingClientRect().height;
    $('.popup-container').css({"height":(imgHeight * 0.7) + 'px',"top":imgHeight*0.23 + 50 + 'px',"visibility":"visible"});
};
//弹出层-简直棒呆
function resultsLucky(){
    $('.results-lucky').show();
    imgHeight = $('.results-lucky > img').get(0).getBoundingClientRect().height;
    $('.popup-container').css({"height":(imgHeight * 0.7) + 'px',"top":imgHeight*0.23 + 50 + 'px',"visibility":"visible"}).show();

};
//弹出层-真遗憾
function resultsPity(){
    $('.results-pity').show();
    imgHeight = $('.results-pity > img').get(0).getBoundingClientRect().height;
    $('.popup-container').css({"height":(imgHeight * 0.7) + 'px',"top":imgHeight*0.23 + 50 + 'px',"visibility":"visible"}).show();
};
//弹出层-真遗憾
function resultsHum(){
    $('.results-hum').show();
    imgHeight = $('.results-hum > img').get(0).getBoundingClientRect().height;
    $('.popup-container').css({"height":(imgHeight * 0.7) + 'px',"top":imgHeight*0.23 + 50 + 'px',"visibility":"visible"}).show();
};
// 按钮－再玩一次（小）
function btnPlayAgain(){
    $palyAgain = $("<img class='play-again' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-palyagain.png'>")
    $palyAgain.css({"width":"45%","float":"left"});
    $palyAgain.addClass('result-btn');
    $('.popup-container').append($palyAgain);
    $('img.play-again').on('touchend',function(){
        window.location.reload();
    });
};
// 按钮－分享战绩（小）
function btnShareResults(useTime){
    $shareResults = $("<img class='share-results' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-shareresults2.png'>")
    $shareResults.css({"width":"45%","float":"right"});
    $shareResults.addClass('result-btn');
    $('.popup-container').append($shareResults);
    $('img.share-results').on('touchend',function(){
        tracking.cr(' /cr/m/statistics_action', {'action' : 'pintuShareScore', 'value' : '0'});
        // close($('.popup-container').parent());
        opt = {
            'text' : '棒呆！你只用了' + (+useTime).toFixed(2) + '秒完成拼图，打败了' + ( -0.47 * useTime + 100).toFixed(2) + '%  的用户！！~继续加油喔',
            'pic' : Meilishuo.config.picture_url + '/images/lark/pt_game/sharePic.jpg',
            'url' : '/wx/pt'
        }
        shareBar(opt);
    });
};
// 按钮－再玩一次（大）
function btnPlayAgainBig(){
    $playAgainBig = $("<img class='play-again-big' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-playagain-big.png'>")
    $playAgainBig.css({"width":"70%"});
    $playAgainBig.addClass('result-btn');
    $('.popup-container').append($playAgainBig);
    $('img.play-again-big').on('touchend',function(){
        window.location.reload();
    });
}
// 按钮－明天再来（小）
function btnPlayTomorrow(){
    $playTomorrow = $("<img class='play-tomorrow' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-play-tomorrow.png'>")
    $playTomorrow.css({"width":"45%","float":"left"});
    $playTomorrow.addClass('result-btn');
    $('.popup-container').append($playTomorrow);
    $('img.play-tomorrow').on('touchend',function(){
        window.location.reload();
        popwin();
        $('.popwin-tomorrow').show();
    });
}
// 按钮－明天再来（大）
function btnPlayTomorrowBig(){
    $playTomorrowBig = $("<img class='play-tomorrow-big' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-play－tomorrow-big.png'>")
    $playTomorrowBig.css({"width":"70%"});
    $playTomorrowBig.addClass('result-btn');
    $('.popup-container').append($playTomorrowBig);
    $('img.play-tomorrow-big').on('touchend',function(){
        window.location.reload();
        popwin();
        $('.popwin-tomorrow').show();
    });
}
// 按钮－分享获机会
function btnShareChance(useTime){
    $shareChance = $("<img class='share-chance' src='http://i.meilishuo.net/css//images/lark/pt_game/btn-share-chance2.png'>")
    $shareChance.css({"width":"70%"});
    $shareChance.addClass('result-btn');
    $('.popup-container').append($shareChance);
    $('img.share-chance').on('touchend',function(){
        tracking.cr(' /cr/m/statistics_action', {'action' : 'pintuShareScore', 'value' : '0'});
        // close($('.popup-container').parent());
        opt = {
            'text' : '棒呆！你只用了' + (+useTime).toFixed(2) + '秒完成拼图，打败了' + ( -0.47 * useTime + 100).toFixed(2) + '%  的用户！！~继续加油喔',
            'pic' : Meilishuo.config.picture_url + '/images/lark/pt_game/sharePic.jpg',
            'url' : '/wx/pt'
        }
        shareBar(opt);
    });
}
// 阻止下拉事件
$('.popwin').on('touchstart',function(e){
    if(e && e.preventDefault) {  
        //阻止默认浏览器动作(W3C)  
        e.preventDefault();  
    } else {  
        //IE中阻止函数器默认动作的方式   
        window.event.returnValue = false;   
    }
    return false;
});

window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};