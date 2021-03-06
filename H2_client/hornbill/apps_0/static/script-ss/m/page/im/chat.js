/*common*/
require('m/zepto/touch')
require('m/zepto/detect')
require('m/zepto/form')
require('m/zepto/ajax')
require('wap/zepto')
require('wap/zepto/fastclick')
var openApp = require('wap/app/openApp');

var uploadPic = require('m/app/im/uploadPic')
    , shareTmp = require('component/shareTmp')
    , init = require('app/im/init')
    , message = require('app/im/messageNew')
//	, Dialog = require('wap/ui/dialog')

    , $mainBox = $('#im_main')
    , $goodsBox = $('#im_goods')
    , urlHandle = require("wap/component/urlHandle")

window.userListObj = {}
var isActionHistory = 0;

$("body").on("click", ".buy",function(e) {
    e.preventDefault();
    if (window.slidPanelIsOpen == true) {
        return;
    }
    window.slidPanelIsOpen = true;
    var $panel = $(".select_goods_param");
    if ($panel.length > 0) {
        if (parseInt($panel.css("bottom")) != 0) {
            $(".select_goods_param").animate({
                    bottom : 0
                }, 300,
                'ease');
        }
        return;
    }
    var tid = urlHandle.getParams(window.location.search).tid;
    $.post("/aw/goods/specification", {"tid" : tid}, function(data) {
        data = JSON.parse(data);
        if (data.error_code == 0) {
            data = data.data;
            if (!data.color || JSON.stringify(data.color).indexOf(":") < 0) {
                location.href = $(".buy").attr("href");
            }
            window.goodsData = data;
            build(data);
        }
    }, "text");

    function build(data) {
        $("body").append(shareTmp('select_goods_param_tpl', {"data" : data}));
        var $first = $(".goods_color_category li").eq(0);
        var colorKey = data.sku[$first.attr("key") + "_"];
        //默认选择第一个规格
        $first.addClass("goods_color_selected");
        //获取第一个规格的库存
        $(".goods_leave").text(colorKey["repertory"]);
        //获取第一个规格的价格
        $(".goods_price").text("￥" + colorKey["price"]);
        var $panel = $(".select_goods_param");
        $panel.css("bottom", $panel.height()*-1);
        $panel.animate({
                bottom : 0
            }, 300,
            'ease');
    }

});
//注册规格面板上的事件
$("body").on("tap", ".select_goods_param_close", function() {
    var $obj = $(".select_goods_param");
    var targetBottom = ($obj.height() * -1) + "px";
    $obj.animate({
            bottom : targetBottom
        }, 500,
        'ease-in', function() {
            window.slidPanelIsOpen = false;
        });
}).on("tap", ".goods_guige", function() {
    $(this).addClass("goods_color_selected").siblings().removeClass("goods_color_selected");
    $(".goods_leave").text(window.goodsData.sku[$(this).attr("key")]["repertory"]);
    $(".goods_price").text("￥" + window.goodsData.sku[$(this).attr("key") + "_"]["price"]);
    $(".goods_amount .num").text(1);
}).on("tap", ".minus", function() {
    var $obj = $(this).next();
    var cVal = +$obj.text();
    if (cVal > 1) {
        $obj.text(cVal - 1);
    } else {
        $(".select_goods_param_tips").text("最少买一件商品").animate({opacity : 1},500, 'ease', function() {
            setTimeout(function() {
                $(".select_goods_param_tips").animate({opacity : 0}, 500, 'ease-in');
            }, 1500);

        })
    }
}).on("tap", ".plus", function() {
    var $obj = $(this).prev();
    var cVal = +$obj.text();
    if (cVal < +$(".goods_leave").text()) {
        $obj.text(cVal + 1)
    } else {
        $(".select_goods_param_tips").text("不能大于商品库存").animate({opacity : 1},500, 'ease', function() {
            setTimeout(function() {
                $(".select_goods_param_tips").animate({opacity : 0}, 500, 'ease-in');
            }, 1500);

        })
    }

}).on("tap", ".complete_btn", function() {
    var colorKey = $(".goods_color_selected").attr("key") + "_";
    var colorName = window.goodsData.sku[colorKey].color_name;
    var color = window.goodsData.sku[colorKey].color;
    var price = window.goodsData.sku[colorKey].price;
    var goods_id = window.goodsData.sku[colorKey].goods_id;
    var sku_id = window.goodsData.sku[colorKey].sku_id;
    var amount = $(".num").text();
    var orgParams = urlHandle.getParams(window.location.search);
    var param = "&color=" + colorName + "__" + color + "&amount=" + amount + "&price=" + price + "&goods_id=" + goods_id + "&sku_id=" + sku_id;
    var orgLink = $(".buy").attr("href");
    var nLink = orgLink.substring(0, orgLink.indexOf("?")) + "?" + "tid=" + orgParams.tid + "&shop_id=" + orgParams.shop_id + "&source_c=" + orgParams.source_c + "&source=" + orgParams.source + "&type=" + orgParams.type + "&toid=" + orgParams.toid + param;
    location.href = nLink;
});

$("body").on("tap", ".app-download-tips", function() {
    /*if (window.navigator.userAgent.indexOf("MicroMessenger") == -1) {
     location.href = "http://m.meilishuo.com/download/latest/";
     } else {*/
    openApp(location.href);
    console.log(location.href)
    // }
})

var socket = io.connect(fml.vars.im.im_url+"?source="+fml.vars.im.source);//Meilishuo.config.im_url    http://im.weiwang.rdlab.meilishuo.com

var prependUserList = function(data, fn){
    if(!data) return;

    var boxCF = document.createDocumentFragment()
        userListObj[data.uid] = {
            mainBox : $(shareTmp('im_main_item', {v:data}))
            , history : 0
            , name : data.nickname
            , avatar : data.avatar_b
        }

        boxCF.appendChild(userListObj[data.uid].mainBox[0])

        fn && fn(v.uid)

    $mainBox.html(boxCF);
    //$mainBox.find('.im_dialogbox').css({'min-height': $(window).height()});
}

window.changeUser = function(toid, opt){

    if(!toid) return;

    if(!userListObj[toid]) return;

    var opts = opt || {}
    userListObj[toid].mainBox.addClass('act').siblings().removeClass('act')

    var data = {
        toid : toid
        , welcomed : userListObj[toid].welcome | 0
    }
    opts.history && (data.history = opts.history)
    opts.sync && (data.sync = opts.sync)
    socket.emit('changeUser', data);


    //if(urlHandle.getParams(window.location.search).toid || urlHandle.getParams(window.location.search).tid){
        var goodsReq = $.ajax({
            type : 'GET'
            , url : '/www/aj/goods'
            , data : {
                 to : toid
                , from: fml.vars.im.fromid
            }
            , dataType: 'json'
            , success : function(res){
                console.log('goods',res);
                if(res.data && res.data && res.data.goods_title){
                    var good_data = res.data;
                    // good_data.goods_buy = 'http://m.meilishuo.com/wx/orderconfirm?source=8-0.0.8&goods_id='+getQueryString('goods_id')+'&sku_id=' + getQueryString('sku_id') + '&price=' + getQueryString('price') + '&amount=1'
                    good_data.goods_buy = 'http://m.meilishuo.com/wx/orderconfirm' + window.location.search;//.replace(/&amp;/g,'&')
                    userListObj[toid].mainBox.removeClass('rightHide');
                    var $box = userListObj[toid].mainBox.find('.goods');
                    $box.html(shareTmp('im_goods_item', good_data));
                    $('#goodsTag').on('tap',function(){
                        location.href = good_data.url;
                    });
                } else {
                    $('.im_dialog').css('padding-top', '4%');
                }

            }
            , error : function(){
                $('.im_dialog').css('padding-top', '4%');
            }
        });
        $('.im_dialog').css('padding-top', '4%');
    //}

    /*console.log("changeUser Fn", toid, opt);
    if(!toid) return;
    var opts = opt || {};
    var data = {
        toid: toid,
        version: 1,
        welcomed: 0,
        history: opts.history
    };

    socket.emit('changeUser', data);
    */
}

init(socket);
message.init(socket);

socket.on('connectPush', function (data) {

    //alert('height: '+ $(window).height()+', '+$('body').height()+', '+$('#im_main').height());

    if(fml.vars.im.fromid != data.fromid){
        return;
    }
    if(socket.io.connected > 1) return;
	if(getQueryString('source_c') == 'circle_detail') return;

    $.ajax({
        type : 'GET'
        , url : '/www/aj/user_info_by_id'
        , data : {
            user_ids : fml.vars.im.toid
            , fields: 0
        }
        , dataType: 'json'
        , success : function(res){
            if(!(res.data && res.data.length)) return ;
            prependUserList({
                uid: fml.vars.im.toid,
                nickname: res.data[0].nickname,
                avatar_b: res.data[0].avatar_b
            });
            changeUser(fml.vars.im.toid, {history:1})
            $('.layout').hide();
            $(".im_mainitem")[0].scrollIntoView();
        }
        , error : function(){

        }
    });

});
socket.on('changeUserPush', function(data){
    console.log("changeUserPush", data);
    var toid = data.toid;
    var messageList = data.messageList;
    var data = {};
    data.messageList = messageList;
    data.toid = toid;
    message.changeUserPush(data);
    //var historyReq = $.ajax({
    //    type : 'GET'
    //    , url : '/www/aj/history'
    //    , data : {
    //        to : toid
    //        //to : 132148787
    //        , limit: 5
    //        , prev_id: data.messageList.last_msg_id
    //        , source: fml.vars.im.source
    //    }
    //    , dataType: 'json'
    //    , success : function(res){
    //        message.history(res, toid)
    //        $mainBox.removeClass('eventnone');
    //        if(urlHandle.getParams(window.location.search).chat){
    //            $(".im_dialog").css("padding-top", "1%");
    //        }
    //    }
    //    , error : function(){
    //        $mainBox.removeClass('eventnone').text('加载失败，请重试')
    //    }
    //});
    $(".im_mainitem")[0].scrollIntoView();
})

socket.on('unReadMsgPush', function(data){
    console.log('unReadMsgPush', data);

    if(!data.data || data.data.length == 0) return;

    //暂时每次unreadmsgPush只会推送一条消息
    var chatfrom = data.data[0].chatfrom;

    if(userListObj[chatfrom]){  //联系人在列表中
        if(chatfrom == fml.vars.im.toid){ //与其正在聊天
            message.messageList(data, chatfrom, null, function(){
                //alert(1);
                if(!$mainBox.find('textarea').is(":focus") && $.os.ios){
                    //alert(2);
                    //$("body").scrollTop( $("body")[0].scrollHeight);
                    //$mainBox
                    //    .parents('.im_mainbox').addClass('focus')
                    //    .children('.im_dialogbox').css({
                    //        'min-height': ($(window).height()/2)
                    //    })
                    //$mainBox.find('textarea').focus();
                } else {
                    $mainBox.find('textarea').blur();
                }
            });

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
    if(data.length){
        var toid = data[0].chatfrom;
        if(fml.vars.im.toid != toid){   //如果不是当前聊天人
            userListObj[toid].num = 0;
            userList.unreadNumFresh();
        }
    }
});

$mainBox
    .on('tap', '.imgUpload', function(){
        var $this = $(this)
        var url = 'meilishuo://open_img.meilishuo?json_params='  + encodeURIComponent('{' + '"url":"' + $this.attr('ahref') + '","img_width":"' + $this.attr('n_w') + '","img_height":"' + $this.attr('n_h') + '"}')
        location.href = url
    })
    .on('tap', '.fail', message.resend)
    .on('tap', '.historyBtn', function(){
        var $this = $(this)
            , toid = $this.attr('toid')

        if($this.is('.eventnone')) return;

        $this.addClass('eventnone').text('加载中...')

        $.ajax({
            type : 'GET'
            , url : '/www/aj/open_history_new'
            , data : {
                next_id : userListObj[toid].history || 0
                , count : 10
                , to : toid
                , source: fml.vars.im.source
            }
            , dataType: 'json'
            , success : function(res){
                isActionHistory = 1;
                message.history(res.data, toid)
                $this.removeClass('eventnone').text('查看历史聊天记录')
                $(".im_mainitem")[0].scrollIntoView();
            }
            , error : function(){
                $this.removeClass('eventnone').text('加载失败，请重试')
            }
        })
    })

var submit = function(){
    var $message = $(this).find('textarea')

    if(fml.vars.im.offLineInfo){
        //alert(fml.vars.im.offLineInfo)
        return false;
    }

    var msg = $.trim($message.attr('value'))
    if(!msg) return false;
    var $dialogBox = userListObj[fml.vars.im.toid].mainBox.find('.im_dialog')
    var $msg = message.send({
        type : 'text'
        , content : msg
        , dialogBox : $dialogBox
    })
    $message.val('').focus()
    $msg.appendTo($dialogBox)

    $msg[0].scrollIntoView()
    if(socket.disconnected){
        alert("网络不给力")
    }
    return false;
}

if($.os.ios){
    $('body').css({
        'height': '100%',
        'overflow': 'hidden'
    });
    $mainBox
        .on('touchstart', 'form', function(event){
            event.preventDefault();
            //$(window).scrollTop($(window)[0].scrollHeight);
            //alert(1);
            $("body").scrollTop( $("body")[0].scrollHeight);
            //alert(2);
            //$(".im_dialog").scrollTop( $(".im_dialog")[0].scrollHeight);
            //alert(3);
            //$(".im_dialog")[0].scrollIntoView();
            //alert(4);
            //$(".im_mainitem")[0].scrollIntoView();
            $(this)
                .parents('.im_mainbox').addClass('focus')
                .children('.im_dialogbox').css({
                    'min-height': ($(window).height()/2)
                })
            //if(isActionHistory){
            //    $('.im_inputbox').css({
            //        'position': 'absolute',
            //        'bottom': 0,
            //        'left': 0
            //    });
            //}

            //$('.im_main').css({'height':'100%'});
            //$('body').css({'height': '100%'});
            //alert('1focus: '+ $(this).parents('.im_mainbox').attr('class'));
            //alert('height: '+ $(window).height());
            $(this).find('textarea').focus()
        })

        .on('blur', 'textarea', function(){
            $(this)
                .parents('.im_mainbox').removeClass('focus')
                .children('.im_dialogbox').css({'min-height': $(window).height()})
            //$('.im_inputbox').css({
            //    'position': 'fixed',
            //    'bottom': 0,
            //    'left': 0
            //});
        })
        .on('submit', 'form', submit)

        .on('touchstart touchend', '.sentBtn', function(event){
            event.preventDefault();
        })
        .on('tap', '.sentBtn', function(){
            $(this).parents('form').submit()
            return false;
        })

}else{
	//alert('version: '+ Meilishuo.config.os.version)
    if(/2.3/.test($.os.version)){
        $mainBox
            .on('touchstart', '.sentBtn',  function(){
                $(this).parents('form').submit()
                return false;
            })

    }else{
        $mainBox
            /*
             .on('touchstart touchend', function(){
             $message.focus()
             return false;
             })
             */
            .on('submit', 'form', submit)
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
uploadPic(message.send)



window.MLS.onStop = function(){
    socket.io.disconnect();
}