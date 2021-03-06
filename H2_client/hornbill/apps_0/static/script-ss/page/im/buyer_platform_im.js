/*common*/
var socket = io.connect(Meilishuo.config.im_url); //"im.qingyuzhong.rdlab.meilishuo.com"  Meilishuo.config.im_url
var uploadPic = require('app/im/uploadPic')
    , shareTmp = require('component/shareTmp')
    , init = require('app/im/init')
    , ioStatus = require('app/im/ioStatus')
    , pc = require('app/im/pc_simple')
    , message = require('app/im/messageNew')  //send消息 历史消息  changeUserPush
    , smile = require('app/im/smile')
    , intro = require('app/im/intro_simple')
    , black = require('app/im/black')
    , info = require('app/im/info')
   , userList = require('app/im/userList')
   // , userListHistory = require('app/im/userListHistory')
    , userStatus = require('app/im/userStatus')
    , changeTab = require('app/im/changeTab')
    , audio = require('component/audio')
    , postMessage = require('app/im/postMessage')
    , dialogUI = require('ui/dialog')
    , cookie = require('component/iStorage')

    , $imTab = $('#im_tab')
    , $mainBox = $('#im_main')
    , $userTab = $('#user_tab')
    , $userListNowBox = $('#list_now')
    , sound = {}
    , nowTime = new Date()

sound.newMsg = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_sound2.mp3', {tag:'newMsg'})
sound.newOrder = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_order.mp3',{tag:'newOrder'})

//连接socket
init(socket);
//重连需要重新changeUser
socket.on('reconnect', function (data) {
    if (fml.vars.im.toid) {
        console.log('重连接成功,重新changeuser')
        var cuData = {
            toid : fml.vars.im.toid
            , welcomed : 0
            , toType : 'plantform_service'
        }
        socket.emit('changeUser', cuData);
    }

})

if( nowTime.getTime() > new Date().setHours(9,00,00) &&  nowTime.getTime() < new Date().setHours(22,00,00)){
    serverId();     //工作时间分配客服
    // var getCookieId = cookie.getCookie("serverId");
    // if( getCookieId ){
    //     $.post( '/www/aj/open_get_num_service' , { serviceid : getCookieId } , function( res ){
    //         if( res.error_code == 0 ){
    //             if( res.data.data == 0){
    //                 serverId();     //工作时间分配客服
    //             }else{
    //                 $(".wait-connect").html('<p style="padding:10px 20px;line-height:1.4em">爱美丽您好，已有客服与您交谈</p>');                    
    //             }
    //         }
    //     },'json')
    // }else{
    //     serverId();     //工作时间分配客服
    // }
    
}else{
    //$(".wait-connect").html('<p style="padding:10px 20px;line-height:1.4em">爱美丽您好，非常抱歉由于在线人工服务时间为早9:00至晚22:00，非工作时间MIXI智能客服机器人随时为您解答各类咨询问题，小美非常感谢您的支持与理解。<br>由此进入<a href="http://www.meilishuo.com/help/robot" style="color:#f69">MIXI智能客服机器人</a>。</p>');
    $(".wait-connect").html('<p style="padding:10px 20px;line-height:1.4em">爱美丽您好，非常抱歉，现在系统繁忙。您是否需要智能机器人MIXI为您服务？由此点击进入<a href="http://www.meilishuo.com/help/robot" style="color:#f69">MIXI智能客服机器人</a>。小美非常感谢您的支持与理解。</p>');
}

/*
*  接口 /im/open_get_service
*  {
         "code": 0,
         "error_code": 0,
         "message": "success!",
         "data": "8888",
         "r": "im-open_get_service"
         }

      data:
            －1: 正在排队， 0: 未分流， 其他: changeUser聊天
* */

//请求接入客服
function serverId(){
    $.post("/www/aj/get_service", null, function(resp){
        console.info('get_service', resp);
        if(resp.code != 0) return;
        //resp.data = "13049116";
        if(resp.data == -1 || resp.data == 0){      //－1: 正在排队， 0: 未分流
            $.post("/www/aj/platform", null, function(datatt) {
                console.info("请求接入：",datatt);
                $(".wait-connect").hide();
                var $wq = $(".wait-queue");
                if (datatt.error_code ==0 && datatt.data.to ==0 && datatt.data.num > 0 ) {
                    $wq.find("span").text(datatt.data.num);
                    $wq.show();
                    if (+window.location.href.substr(window.location.href.lastIndexOf("/") + 1)  > 0) {
                    } else {
                        return;
                    }
                } else {
                    $(".wait-connect").hide();
                    buildSession(datatt.data.to);
                    cookie.setCookie("serverId", datatt.data.to , {"duration" : 3600*24*10});
                }
                //if (datatt.error_code ==0 && datatt.data.to != 0) {
                //    buildSession(datatt.data.to);
                //    cookie.setCookie("serverId", datatt.data.to , {"duration" : 3600*24*10});
                //} else {
                //    console.error("没有分配成功");
                //    startTimeFirst(0);
                //    $wq.hide();
                //    var tto = window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
                //    buildSession(tto);
                //}
            }, "json")
        } else {
            $(".wait-connect").hide();
            buildSession(resp.data);
            cookie.setCookie("serverId", datatt.data.to , {"duration" : 3600*24*10});
        }
    }, 'json');

}
//获取订单列表
$.ajax({
    url : "/windows/aj/recent_order",
    data:{
        to : Meilishuo.config.user_id
    },
    type : "get",
    dataType : "json",
    timeout : 5000,
    success : function(res) {
        var orders = (res.data && res.data.datas) ? res.data.datas : []
        for(var i = 0; i < orders.length; i++){
            orders[i].url = "http://order.meilishuo.com/order/detail/?order_id="+orders[i].id;
        }
        $('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:orders}))
    },
    complete : function(xhr, status) {
        if (status == "timeout") {
            alert("请求超时！");
        } else if (status == "error") {
            console.error("请求订单出错:" + xhr.responseText);
            //var orders = ooo;
            //$('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:orders}))
        }
    }
});


smile.init('#im_main' , '.smile');
changeTab('#im_left', '#user', 200)

$('.im_main').on('click', '.im_inputbox_picbox', function(event) {
    userListObj[fml.vars.im.toid].mainBox.find('.im_inputbox_input').focus()
})

window.changeUser = function() {

}


var submit = function(){
    if (window.stopSession) {
        console.warn("会话已经结束！");
        return;
    }
    startTime(0);
    var $form = $(this)
    var $message = $form.find('.im_inputbox_input')
        , $picbox = $form.find('.im_inputbox_picbox')
        , $dialogBox = $form.parents('.im_mainbox').find('.im_dialog')
        , toid = $dialogBox.attr('uid')

    if(socket.disconnected){
       // info.info(userListObj[toid].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')
        return;
    }

    var msg = $.trim($message.html())
        , $pics = $picbox.children('li')
        , len = $pics.length
        //, black = (userListObj[toid].black) | 0
        , $pic
    /*if(black){
        //info.info(userListObj[toid].mainBox, '发起会话请先移除黑名单')
        return;
    }*/

    //for firefox
    if(msg==='<br>'){
        msg=''
        $message.html('')
    }

    if(msg){
        var $msg = message.send({
            type : 'text'
            , content : msg
            //, black : black
            , dialogBox : $dialogBox
            , main : 1
        })
        $message.html('').focus()
    }

    if(len){
        for(var i = 0; i < len; i++){
            $pic = $($pics[i])

            uploadPic.send($dialogBox, message.send, {
                'pic_id' : $pic.attr('pic_id')
                , 'pic_url' : $pic.attr('pic_url')
                , 'o_pic_url' : $pic.children('a').attr('href')
            })

        }
        $picbox.html('')
        userListObj[toid].upLoadPicNum = 0
        $form.removeClass('havePic')
    }

   /* if(msg || len)
        userList.topDialog(toid, 'read')*/
}

$mainBox
    .on('click', '.fail', message.resend)
    .on('click', '.historyBtn', function(){
        var $this = $(this)
            , toid = $this.attr('toid')

        if($this.is('.eventnone')) return;

        $this.addClass('eventnone').text('加载中...')
        console.log($this)
        var utype = userListObj[toid].utype
        var ajUrl = utype==='public' ? '/www/aj/publicHistory' : '/www/aj/open_history_new'
        $.get(ajUrl, {
            next_id : userListObj[toid].history || 0
            , count : 10
            , to : toid
            , source: fml.vars.im.source

        }, function(res){
            message.history(res.data, toid)
            $this.removeClass('eventnone').text('查看历史聊天记录')

        }, 'json')
            .fail(function(){
                $this.removeClass('eventnone').text('加载失败，请重试')

            })
    })
    .on('click', '.d_u a', function(){
        fml.vars.im.mustleave = 1
    })
    .on('submit', '.im_inputbox form', submit)

    .on('mouseenter', '.im_inputbox_picbox li', function(){
        $(this).children('.cleanPicBtn').show()
    })
    .on('mouseleave','.im_inputbox_picbox li', function(){
        $(this).children('.cleanPicBtn').hide()
    })
    .on('click', '.cleanPicBtn', function(e){
        e.stopPropagation()
        $(this).parent('li').fadeOut(100, function(){
            var $this = $(this)
                , $form = $this.parents('form')
                , uid = $form.attr('uid')

            userListObj[uid].upLoadPicNum--
            if(userListObj[uid].upLoadPicNum == 0)
                $form.removeClass('havePic')

            $form.find('.im_inputbox_input').focus()
            $this.remove()
        })
    })



function buildSession(to) {
    $(".wait-queue").hide();
    startTimeFirst(0);
    fml.vars.im.toid = to;
    //获取客服信息
    $.post("/www/aj/user_info_by_id", {user_ids : fml.vars.im.toid}, function(data) {
        if (data.error_code == 0 && data.data.length > 0) {
            userList.optInit({"socket" : socket, "mainBox" : $('#im_main')});
            userList.prepend(data.data);
            var cuData = {
                toid : fml.vars.im.toid
                , welcomed : 0
                , toType : 'plantform_service'
            }

            socket.emit('changeUser', cuData);
        } else {
            alert("未能获取到客服信息");
        }

    }, "json")
}


ioStatus(socket, $('#io_status'))
pc.init(socket)
intro.init(socket)
userStatus.init(socket, $imTab, $mainBox)
/*userList.init({
    mainBox : $mainBox
    , listBox : $userListNowBox
    , listTab : $userTab.children('.tab_now')
    , sound : sound
    , socket : socket
})*/
message.init(socket, sound, function(o){
    return;
    var toid = o.uid

    userList.topDialog(toid,'read')
})
//userListHistory.init({box:'list_history', data:{page:1}, url:'/www/aj/historyUser'})

socket.on('connectPush', function (data) {
    if(fml.vars.im.fromid != data.fromid){
        pc.backLogin('buyer_platform')
        return;
    }

    //userList.talkList()

    if(socket.io.connected > 1){
        return;
    }

    $('#im_layout').hide()

    $imTab.find('.user_img').html('<img src="' + fml.vars.im.head + '"/>')

    //userList.topDialog(fml.vars.im.toid, 'auto', true)

})

socket.on('ImMsgSysPush', function (data) {
    console.log('ImMsgSysPush', data);

    var fn = (new Function('return ' + data.fn))()
    fn()

})



socket.on('changeUserPush', function (data) {
    console.log('changeUserPush', data)
    var toid = data.toid
    if(!toid) return;
    if(!userListObj[toid]) return;

    if(data.userStatus && data.userStatus.data){
        userStatus.update(data.userStatus.data, toid)
    }

    //if(data.goods && data.goods.data){
    //    intro.update(data.goods.data, toid, 'goods')
    //}
    $.post('/www/aj/goods', {from: fml.vars.im.fromid, to: toid, uid: fml.vars.im.fromid, source: 'web'}, function(data){
        console.log('goods', data);
        if(data.goods && data.goods.data){
            intro.update(data.goods.data, toid, 'goods');
        }
    }, 'json');
    message.changeUserPush(data,sound)
    //if(data.black){
    //    black.set(data.black.data, toid)
    //}
})

socket.on('talkListPush', function (data) {
    console.log('talkListPush', data)

    // if(!data.req) return;

    // userList.talkList(data.req)
})

socket.on('talkListNewPush',function(data){
    console.log('talkListNewPush',data)
    return;
    if(!data.req) return
    userList.talkList(data.req)

})
socket.on('sendSyncPush',function(res){
    console.log('sendSyncPush',res)

    var toid=res.toid
        ,$imDialog = $('.im_dialog[uid='+toid+']')
    if($imDialog.length==0) return

    for (var i = 0; i < res.data.length; i++) {
        var data = res.data[i]
        if($('#mid_'+data.messageId).length) continue
        if($('#mid_'+data.msg_id).length) continue
        var sendData = {
            data:[data]
            ,uid:toid
        }
        message.syncSend(sendData)
    }
})

socket.on('syncStatusPush',function(data){
    console.log('syncStatusPush',data)
})

//监听客服评价事件
socket.on('evaluatePush', function(data) {
    console.log("客服主动要求评价", data);
    if ($(".evaluate").length > 0 || window.alreadyEvaluate) {
        return;
    }
    window.is_evaluate = 1;
    $("body").append((shareTmp("evaluate_dialog_tpl", {})));
})

//监听结束会话事件
socket.on('stopSessionPush', function(data) {
    console.log('stopSessionPush', data);
    serviceStopSession( data.uid );
})

//监听排队等待：
socket.on('queueUpPush', function(data) {
    console.log("排队消息", data);
    var $s = $(".wait-queue").find("span");
    var n = +$s.text() - 1;
    $s.text(n > 1 ? n : 1);
})
//排队结束消息
socket.on('queueUpOverPush', function(data) {
    buildSession(data.uid);
    console.log("排队结束，开始接入", data);
})

//关闭或刷新浏览器结束会话
/*window.onbeforeunload = function() {
    clientStopSession();
}*/

function serviceStopSession( fromId ) {
    if( fromId != fml.vars.im.toid ) {return;}
    var $msg = message.send({
        type : 'text'
        , content : '非常感谢您的咨询，本次会话已经结束。感谢您对美丽说的支持，祝您生活愉快。'
        , dialogBox : $('.im_mainbox').find('.im_dialog')
        ,msgStyle : 'sys'
        ,who : ''
        ,black : true
    });
    $(".sentBtn").attr("disabled", "true");
    $(".sentBtn").css("background", "#ccc");
    window.stopSession = true;
    $(".ntBdaolpu input").remove(); //结束会话后禁止传图片
    clearTimeout(overtimeWarn); //清除超时警告
    console.log("服务端主动结束会话");
    window.is_stop = true;
}
function clientStopSession(msg) {
    $.ajax({
        url : "/www/aj/feedback",
        data:{
            from: Meilishuo.config.user_id,
            to : fml.vars.im.toid,
            type : 5
        },
        type : "post",
        dataType : "json",
        timeout : 5000,
        async: false,
        success : function(data) {
            var $msg = message.send({
                type : 'text'
                , content : msg || '会话关闭，如需重新咨询，<a href="javascript:window.reloadSession=true;location.reload()" style="text-decoration: underline;color:#fa6ea1">请点击此处。</a>'
                , dialogBox : $('.im_mainbox').find('.im_dialog')
                ,msgStyle : 'sys'
                ,who : ''
                ,black : true
                ,notHtmlToText : true
            });
            $(".sentBtn").attr("disabled", "true");
            $(".sentBtn").css("background", "#ccc");
            window.stopSession = true;
            $(".ntBdaolpu input").remove(); //结束会话后禁止传图片
            console.log("结束会话", data);
        },
        complete : function(xhr, status) {
            if (status == "timeout") {
                console.log("请求超时！");
            } else if (status == "error") {
                console.log("请求出错:" + xhr.responseText);
            }
        }
    });
    
}

/*$(window).on('beforeunload',function(){
   confirm('123');
});*/

//服务评价
$("body").on("click", ".evaluate-btn-js", function() {
    var flag = $(".evaluate-selected-js").data("val");
    var user_comment = $(".evaluate-desc").val();
    var _this = $(this);
    var is_evaluate = window.is_evaluate == 1 ? 1 : 0;
    _this.attr("disabled", "true")
    $.post("/www/aj/evaluate_servicer", {"online_ticket_id" : window.ticketID, "flag" : flag, "user_comment" : user_comment , "is_push_comment" : is_evaluate }, function(data) {
        window.alreadyEvaluate = true;
        console.log("提交评价：", data);
        _this.parent().remove();
    });
    window.is_evaluate = 0;

}).on("click", ".evaluate-opt>div", function() {
    $(this).addClass("evaluate-selected-js").siblings().removeClass("evaluate-selected-js");
}).on("click", ".evaluate-close", function() {
    $(this).parent().parent().remove();
})


//用户订单
/*$('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:fml.vars.orderList}))
fml.vars.orderList = null;*/
$('.order_ul_wrapper').on('click', '.order_header', function(event) {
    //收放隐藏
    $(this).parent('li').siblings().removeClass('show_detail')
    $(this).parent('li').toggleClass('show_detail')
})


$('[name=order_select]').on('change', function(event) {
    var val = $(this).val();
    $.get('/windows/aj/recent_order',{
        to : Meilishuo.config.user_id
        ,status : val
    }, function(res) {
        var orders = (res.data && res.data.datas) ? res.data.datas : []
        $('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:orders}))
    },'json')
    //tmp_order_list
})

//右侧信息
$(".right-info-tab").on("click", function() {
    $(this).addClass("right-info-tab-act").siblings().removeClass("right-info-tab-act");
    var tabIndex = $(this).index();
    $(".right-info").children("div").eq(tabIndex).show().siblings("div").hide();
})


var overTimeTipsFirst = [
    '爱美丽您好，小美很高兴能为您服务，麻烦您描述下需要咨询的问题，由于还有其它用户正在排队等待，系统将在2分钟后自动断线结束，给您带来的不便敬请谅解。',
    '爱美丽您好，小美5分钟没有聆听到您的问题了呢，由于还有其它用户正在焦急的等待小美服务，此次通话系统已经自动断线结束，小美万分希望您能谅解，如果您需要小美的帮助可以随时联系我们的哦，<a href="javascript:window.reloadSession=true;location.reload()" style="text-decoration: underline;color:#fa6ea1">请点击此处。</a>'
]
var overtimeWarnFirst;
var delayTimeFirst = 3*60*1000;
function startTimeFirst(index){
    clearTimeout(overtimeWarnFirst);
    var _arguments = arguments;
    overtimeWarnFirst = setTimeout(function() {
        if (window.stopSession) {return;}
        if (index == 1) { //结束会话
            clientStopSession(overTimeTipsFirst[index]);
            return;
        }

        var $msg = message.send({
            type : 'text'
            , content : overTimeTipsFirst[index]
            , dialogBox : $('.im_mainbox').find('.im_dialog')
            ,msgStyle : 'sys'
            ,who : ''
            ,black : true
            ,notHtmlToText : true
        });
        delayTimeFirst = 2*60*1000;
        _arguments.callee(index + 1)
    }, delayTimeFirst);
}


var overTimeTips = [
    '爱美丽您好，非常抱歉，由于还有其他用户正在焦急的等待小美服务，如果您没有其他的问题咨询，此次通话将在3分钟后结束，小美万分希望您能谅解一下啦。~^_^~'
    , '谢谢您对美丽说的支持，此次通话将在2分钟后结束，如果您需要小美的帮助可以随时联系我们哦，小美会第一时间处理您的问题的。~^_^~'
    , '小美非常感谢您对我们美丽说的支持！相信在您的支持下，美丽说能够越做越好。此次通话将在1分钟后结束，非常感谢您对我们的信任和理解。~^_^~'
]
var overtimeWarn;
var delayTime = 3*60*1000;
function startTime(index){
    clearTimeout(overtimeWarnFirst);
    clearTimeout(overtimeWarn);
    if( index == 0 ){
        delayTime = 3*60*1000
    }
    var _arguments = arguments;
    overtimeWarn = setTimeout(function() {
        if (window.stopSession) {return;}
        if (index > 2) { //结束会话
            clientStopSession();
            return;
        }

        var $msg = message.send({
            type : 'text'
            , content : overTimeTips[index]
            , dialogBox : $('.im_mainbox').find('.im_dialog')
            ,msgStyle : 'sys'
            ,who : ''
            ,black : true
        });
        delayTime = 60*1000;
        _arguments.callee(index + 1)
    }, delayTime);
}

//评价客服
$("body").on("click", ".evaluate_bar", function() {
    if ($(".evaluate").length > 0 || window.stopSession) {
        return;
    }
    if (window.alreadyEvaluate) {
        // new dialogUI({"content" : "您已经评价过了！", "onClose" : null});
        $("body").append((shareTmp("evaluation_through_tpl", {})));
        return;
    }
    $("body").append((shareTmp("evaluate_dialog_tpl", {})));
})

$("body").on("click" , '.evaluation_m .over' , function(){
    $(".evaluation_m").remove();
})
//关闭窗口
$("body").on("click", ".js-closeWindow", function() {
    socket.emit('disconnect');
    window.close();
})
$(window).on('beforeunload',function(){
    if (window.reloadSession) return ;
        if( fml.vars.im.toid ){
            $.get("/www/aj/feedback" , {from: Meilishuo.config.user_id,to : fml.vars.im.toid,type : 5} , function(){})    
        } else {
            $.get("/www/aj/del_queuing" , { uid : Meilishuo.config.user_id} , function(){},'json')
        }
    // return 'del'
});

//工单id
socket.on("ticketInfoSendPush", function(data){
    console.log("工单", data);
    window.ticketID = data.data[0].data.online_ticket_id;
});
setTimeout(function(){
    $(".ntBdaolpu").on("click", function(){
        startTime(0)
    });
},2000)

socket.on('unReadMsgPush', function(data){
    console.log('unReadMsgPush', data);

    if(!data.data || data.data.length == 0) return;

    //暂时每次unreadmsgPush只会推送一条消息
    var chatfrom = data.data[0].chatfrom;
    var s = fml.vars.im.toid==chatfrom ? sound : null;

    if(userListObj[chatfrom]){  //联系人在列表中
        if(chatfrom == fml.vars.im.toid){ //与其正在聊天
            message.messageList(data, chatfrom, s);
            socket.emit("readSyncmsg", {
                "event": "readSyncmsg",
                "data": {
                    "toid": chatfrom,
                    "pub_id":0,
                    "type": "unreadmsg",
                    "msgIds": [
                        data.data[0].msg_id
                    ]
                }
            });
        } else {    //没与其正在聊天
            userListObj[chatfrom].num += 1;
            userList.topDialog(chatfrom, 'new');
            message.playSound(sound, chatfrom);
        }

        if(data.data && data.data[0] && data.data[0].risk_tip){
            console.log('risk_tip',data.data[0].risk_tip);
            message.add_sys(data.data[0].risk_tip, data.uid);
        }
    }
});


//收消息同步，清楚消息数
socket.on("receiveSyncPush", function(data){
    console.log('receiveSyncPush', data);
    data = data.data;
    if(data.length){
        var toid = data[0].chatfrom;
        if(fml.vars.im.toid != toid){   //如果不是当前聊天人
            userListObj[toid].num = 0;
            $('#user_list #list_now').children("[uid='"+toid+"']").find('.num').empty().css({display: 'none'});
            userList.unreadNumFresh();
        }
    }
});

//window.open ('http://gyim.fedevot.meilishuo.com/www/buyer_platform_im/157064095','newwindow','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
