/*common*/
var shareTmp = require('component/shareTmp')
    , emo2img = require('app/emoji').emo2img
    , userStatus = require('app/im/userStatus')
    , sendObj = {}
    , htmlFilter = require('component/filterhtml')
    , intoView = require('app/im/intoView')

Date.prototype.getT = function(){
    var h = this.getHours()+''
        ,m = this.getMinutes() + ''
    if(h.length<2) h ='0'+h
    if(m.length<2) m ='0'+m
    return h+':'+m
}
var co = (function(cookie){
    //cookie.setDomain(".meilishuo.com");
    var arr = cookie.split(";");
    var cookies = {};
    for(var i = 0; i < arr.length; i++){
        var key = arr[i].split("=")[0].replace(/(^\s*)|(\s*$)/g, "");
        var value = arr[i].split("=")[1].replace(/(^\s*)|(\s*$)/g, "");
        cookies[key] = value;
    }
    return cookies;
})(document.cookie);
Date.prototype.getN = function(){
    var n = this.getFullYear()+''
        , m = (this.getMonth() + 1) + ''
        , d = this.getDate() + '';
    if(m.length<2) m ='0'+m;
    if(m.length<2) d ='0'+d;
    return n+'.'+m+'.'+d;
}
var urls = {
    'higo_img': 'http://v.higo.meilishuo.com/image/Get_detail',
    'higo_goods': 'http://v.higo.meilishuo.com/goods/get_simple_detail',
    'higo_coupon': 'http://v.higo.meilishuo.com/shop_coupon/GetShopCoupon' ,
    'higo_share' : 'http://v.higo.meilishuo.com/show/get_detail',
    'higo_order' : 'http://v.higo.meilishuo.com/order/get_detail4IM'
};

var sendStatus = function(data){

    console.log('sendStatus', data)

    if(!sendObj[data.messageId]) return;

    sendObj[data.messageId].conp.removeClass('wait')

    if(fml.vars.im.toid){
        userStatus.change(userListObj[data.to].mainBox.children('.im_top'), data.status|0, 'sl', true)
    }

    if(data.sendStatus == 0){
        if(data.data[0].type =='text') {
            //data.data[0].msg = "shttp://www.meilishuo.com";
            var patt = new RegExp(strRegex);
            var result = patt.exec(data.data[0].msg);
            if(result){
                result = result[0];
                var link = "<a href='"+result+"' target='_blank'>"+result+"</a>";
                data.data[0].msg = data.data[0].msg.replace(patt, function(a, b){
                    return '<a href="'+(b ? "" : "http://") + a +'" target="_blank">'+ a +'</a>';
                });
                console.log(result, link, data.data[0].msg);
            }
            sendObj[data.messageId].conp.find('p').html(data.data[0].msg)
        }
        delete sendObj[data.messageId]

        if(!userListObj[data.to].history){
            userListObj[data.to].history = data.msg_id
        }

    }else{
        sendFail(data.messageId)
    }

    var ctime = (new Date(data.data[0].timestamp*1000)).getT();
    $("#mid_"+data.messageId).closest(".con").siblings(".ctime").html(ctime);

    if(data.autoreply != ''){
        add({
            uid : data.to
            , data : [
                {
                    msg : data.autoreply
                    , chatfrom : data.to
                }
            ]
            , msgStyle : 'sys'
        })
    }
}

function sendFail(messageId){
    var bubbleObj = sendObj[messageId].conp
    bubbleObj.addClass('fail')
    if(!bubbleObj.find('.fail_tip').length)
        bubbleObj.append('<span class="fail_tip">发送失败</span>')
}

function changeUserPush(data, sound, fn){
    var toid = data.toid

    //if(data.history){
    //    history(data.history, toid)
    //}
    $.post("/www/aj/open_history_new", {to: toid, count: 5, channel_id: 2}, function(resp){
        console.log("open_history_new", resp);
        resp.data && history(resp.data, toid);
    }, 'json');

    if(data.welcome){
        if(!data.welcome.data){
            userListObj[toid].welcome = 2

        }else{
            userListObj[toid].welcome = 1

            add({
                uid : toid
                , data : [
                    {
                        msg : data.welcome.data
                        , chatfrom : toid
                    }
                ]
            }, {type : 'welcome'})
        }
    }

    if(data.messageList){
        /*hack sb*/
        var sb = {
            status : data.messageList.status
            ,is_mobile : data.messageList.is_mobile
            ,status_des : data.messageList.status_des
        }
        data.messageList.status = sb
        /*---*/
        messageList(data.messageList, toid, sound, fn)
    }

}
//
//var init = function(socket, toid, sound, fn, receiveFn){
//    socket.on('unReadMsgPush', function(data){
//        console.log('unReadMsgPush', data);
//        if(toid == data.data[0].chatfrom){  //当前聊天人
//            var s = fml.vars.im.toid==data.data[0].chatfrom ? sound : null;
//            messageList(data, data.data[0].chatfrom, s, fn);
//        } else {    //非当前聊天人
//            receiveFn({
//                data: data
//            });
//        }
//    });
//}

var messageList = function(data, toid, sound, fn){
    var haveMsg = 0
        , msg

    if(!userListObj[toid]) return

    if(fml.vars.im.source == 'web' && data.status){
        var statusData = data.status
        userStatus.update({status:statusData.status|0,is_mobile:statusData.is_mobile|0}, toid)
    }

    if(data.transdata && data.transdata.length){
        haveMsg = 1
        msg = data.transdata[0].msg
        // console.log(JSON.stringify(data.transdata))
        if(data.transdata[0].type === 'user'){
            data.transdata[0].mtype = data.transdata[0].type //add()中type字段有用 hack
            data.transdata[0].type = 'text' //add()中type字段有用 hack
            add({
                uid : toid
                , data : data.transdata
                , msgStyle : 'sys'
            })
        } else {
            trans_history({
                uid : toid
                , data : data.transdata
            })
        }


    }

    if(data.data && data.data.length){
        haveMsg = 1
        //msg = (data.data[0].type == 'img' ? '[图片]':data.data[0].msg)
        switch (data.data[0].type){
            case 'img':
                msg = '[图片]';
                break;
            case 'text':
                msg = data.data[0].msg;
                break;
            case 'file':
                msg = '不支持的消息类型';
                break;
            default :
                msg = data.data[0];
                break;
        }

        add({
            uid : toid
            , data : data.data
        })
    }

    if(haveMsg){
        if(fml.vars.im.nosound){
            fml.vars.im.nosound = 0
            return;
        }

        if(sound){
            if(userListObj[toid].utype == 'public')
                sound.newOrder && sound.newOrder.play()
            else
                sound.newMsg && sound.newMsg.play()
        }

        fn && fn({
            uid :toid
            ,msg : msg
        })
    }
}

var trans_history = function(obj){
    var history = obj.data[0].history
    var uid = obj.uid;
    if(history && history.length){
        // history.reverse();
        add_transdata(obj.data[0],uid)
    }
}

var history = function(data, toid){
    var msg_id;
    if(data.is_last == 0){
        msg_id = data.next_id;
    } else {
        msg_id = data.prev_id;
    }
    var data = data.datas
        , $this = userListObj[toid].mainBox.find('.historyBtn')

    if(!data || !data.length){
        $this.hide()

        if(!userListObj[toid].history)
            $this.parent().hide()
        return;
    }
    if(data.length < 5)
        $this.hide()

    userListObj[toid].history = msg_id;

    $this.parent().removeClass('hide')

    add({
        uid : toid
        , data : data
    }, {type : 'history', btn: $this, bthHeight:$this.height() + 24})
}

var Api = function(obj){
    $.ajax({
        url: obj.url,
        dataType: 'jsonp',
        data: obj.params,
        jsonp:'callback',
        success: obj.success,
        error: obj.error
    });
};

var higoCallback = function(data){

    console.log('higoCallback', data)

    if(!sendObj[data.messageId]) return;

    sendObj[data.messageId].conp.removeClass('wait');

    if(!fml.vars.im.groupId){
        userStatus.change(userListObj[data.to].mainBox.children('.im_top'), data.status|0, 'sl', true);
    }

    if(data.sendStatus == 0){
        //if(data.data[0].type =='text')
        //    sendObj[data.messageId].conp.find('p').html(data.data[0].msg)
        //delete sendObj[data.messageId]
        switch(data.data[0].type){
            case 'higo_goods':
                console.log('higo_goods', data.data[0]);
                Api({
                    url: urls['higo_goods'],
                    params: {
                        goods_id: data.data[0].ext.goodsId
                        //goods_id: eval("(" + data.data[0].ext + ")").goodsId.toString()
                        //goods_id: '177877812444586943'
                    },
                    success: function(resp){
                        console.log('success', resp);
                        var $goodsPanel = shareTmp('higo_goods_panel', resp.data[0]);
                        sendObj[data.messageId].conp.html($goodsPanel);
                        intoView(sendObj[data.messageId].conp, sendObj[data.messageId].conp.parents(".im_dialog"));
                    }
                });
                break;
            case 'higo_coupon':
                console.log('higo_coupon', data.data[0]);
                //Api({
                //    url: urls['higo_coupon'],
                //    params: {
                //        couponId: data.data[0].ext.couponId
                //    },
                //    success: function(resp){
                //        console.log('success', resp);
                //        //resp.data = [{"face_value" : "10", "batch_id" : "386", "coupon_title" : "商家券", "show_desc" : "2015.7.15至2015.7.16", "coupon_name" : "无门槛", "coupon_desc" : "无门槛现金券", "start_date" : "1436889600", "end_date" : "1437062399"}];
                //        var $goodsPanel = shareTmp('higo_coupon_panel', resp.data[0]);
                //        sendObj[data.messageId].conp.html($goodsPanel);
                //        sendObj[data.messageId].conp.addClass("higoCouponPanel").removeClass('bubble');
                //        intoView(sendObj[data.messageId].conp, sendObj[data.messageId].conp.parents(".im_dialog"));
                //    }
                //});
                $("#mid_"+data.data[0].messageId).removeClass("wait");
                break;
            default:
                break;
        }

        if(!userListObj[data.to].history){
            userListObj[data.to].history = data.msg_id
        }

    }else{
        sendFail(data.messageId)
    }

    var ctime = (new Date(data.data[0].timestamp*1000)).getT();
    $("#mid_"+data.messageId).closest(".con").siblings(".ctime").html(ctime);
}

var sendHigo = function(options){
    var defaults = {
        send : 1
        , name : Meilishuo.config.nickname
        , avatar : fml.vars.im.head
        , who : 'd_m'
        , messageId : (new Date()).valueOf()
        , chatfrom : 0
        , ctime : (new Date()).getT()
        , msgStyle : ''
    }
    var opts = $.extend({}, defaults, options);
//	console.log(opts)
    var data = {
        type: opts.type,
        messageId : opts.messageId
        , to : fml.vars.im.toid
        , source : fml.vars.im.source
        , channel_id: 2
    }
    if(fml.vars.im.groupId){
        data.group_id = fml.vars.im.groupId;
        data.from = fml.vars.im.fromid;
        delete data.to;
    }
    if(opts.type == 'text' && !opts.notHtmlToText){
        data.text = htmlFilter.filterHtmlToText(opts.content) || ''
    } else if(opts.type == 'img'){
        data.picids = opts.content.pic_id;
    } else if(opts.type == 'higo_img'){
        data['imgId'] = opts.content.image_id;
    } else if(opts.type == 'higo_goods') {
        data['goodsId'] = opts.msgId;
    } else if(opts.type == 'higo_coupon') {
        data['couponId'] = opts.msgId;
        console.log("higo_coupon opts", opts);
    }

    if (opts.main) {
        data.main = opts.main;
    }
    if(!opts.black){
        if(opts.type == 'higo_coupon'){
            sendMsg(data, higoCouponCb)
        } else {
            sendMsg(data, higoCallback)
        }
    }

    if(!opts.notHtmlToText && opts.type == 'text' && (fml.vars.im.source == 'web' || fml.vars.im.source == 'win')){
        opts.content = htmlFilter.filterSendHtml(opts.content) || ''
        opts.content = emo2img(opts.content) || ''
    }

    if(opts.type == 'higo_coupon'){
        var $box = $(shareTmp('higo_coupon_item', opts));
    } else {
        var $box = $(shareTmp('higo_dialog_item', opts));
    }

    sendObj[opts.messageId] = {
        'conp' : $box.find('.con .bubble')
        , 'data' : data
    }
    $box.appendTo(options.dialogBox);

    intoView($box, options.dialogBox);

    return $box
}

var higoCouponCb = function(resp){
    if(resp.sendStatus == 0){
        $("#mid_"+resp.data[0].messageId).removeClass("wait");
    }else{
        sendFail(resp.messageId)
    }
}

var send = function(options){
//		console.log('send', options)
// options.noSend:是否发送消息到服务端，或是只展示
    var defaults = {
        send : 1
        , name : Meilishuo.config.nickname
        , avatar : fml.vars.im.head
        , who : 'd_m'
        , messageId : (new Date()).valueOf()
        , chatfrom : 0
        , ctime : (new Date()).getT()
        , msgStyle : ''
    }
    var opts = $.extend({}, defaults, options);
//	console.log(opts)
    var data = {
        messageId : opts.messageId
        , to : fml.vars.im.toid
        , source : fml.vars.im.source
        , channel_id: 2
    }
    if(fml.vars.im.groupId){
        data.group_id = fml.vars.im.groupId;
        data.from = fml.vars.im.fromid;
        delete data.to;
    }
    if(opts.type == 'text' && !opts.notHtmlToText){
        data.text = htmlFilter.filterHtmlToText(opts.content) || '';
        data.type = "text";
    } else {
        //data.picids = opts.content.pic_id;
        data.type = "higo_img";
        data.imgId = opts.content.image_id;
    }

    if (opts.main) {
        data.main = opts.main;
    }
    if(!opts.black){
        sendMsg(data, sendStatus)
    }

    if(!opts.notHtmlToText && opts.type == 'text' && (fml.vars.im.source == 'web' || fml.vars.im.source == 'win')){
        opts.content = htmlFilter.filterSendHtml(opts.content) || ''
        opts.content = emo2img(opts.content) || ''
    }

    var $box = $(shareTmp('im_dialog_item', opts))

    sendObj[opts.messageId] = {
        'conp' : $box.find('.con .bubble')
        , 'data' : data
    }
    $box.appendTo(options.dialogBox)

    intoView($box, options.dialogBox)

    return $box
}

var sendMsg = function(data, callback){
    $.post('/www/aj/publish', data, function(res){
        if(callback) callback(res)

    }, 'json')
}

var resend = function(){
    console.log('resend')
    var msg_id = ($(this).attr('id').split('_'))[1]
    sendObj[msg_id].conp.removeClass('fail').addClass('wait')
    sendObj[msg_id].data.channel_id = 2;
    sendMsg(sendObj[msg_id].data,sendStatus)
}

//var strRegex = '((https|http|ftp|rtsp|mms)?://)'
//    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
//    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
//    + '|' // 允许IP和DOMAIN（域名）
//    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
//    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
//    + '[a-z]{2,6})' // first level domain- .com or .museum
//    + '(:[0-9]{1,4})?' // 端口- :80
//    + '((/?)|' // a slash isn't required if there is no file name
//    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
var strRegex = /http:\/\/([^\/]+)\//i;

var add = function(data, ext){
//	console.log(userListObj[data.uid])
	console.log('add', data, ext);

    var addCF = document.createDocumentFragment()
        , exts = ext || {}
        , defaults = {
            send : 0
            , name : Meilishuo.config.nickname
            , avatar : fml.vars.im.head
            , who : 'd_m'
            , type : 'text'
            , msgStyle : data.msgStyle || ''
            , chatfrom : 0
            , content : ''
            , chatfrom : 0
        }
        , uid = data.uid
        , $tmp


//	console.log(data.data)
    $.each(data.data, function(k,v){
        var options = {
            messageId : v.msg_id || ''
            , ctime : v.ctime || ''
        }
        //filter
        if(options.messageId && $('#mid_'+options.messageId).length ) return

        options.type = v.type || 'text'
        //options.content = options.type == 'img' ?  v.picInfo[0] : v.msg

        if(v.chatfrom != fml.vars.im.fromid){
            options.who = 'd_u'
            options.name = userListObj[uid].name
            options.avatar = userListObj[uid].avatar
        }
        var opts = $.extend({}, defaults, options);
        console.log("messageObj add", opts);
        switch(opts.type){
            case 'text':
                var patt = new RegExp(strRegex);
                var result = patt.exec(v.msg);
                if(result) {
                    result = result[0];
                    var link = "<a href='" + result + "' target='_blank'>" + result + "</a>";
                    v.msg = data.data[0].msg.replace(patt, function(a, b){
                        return '<a href="'+(b ? "" : "http://") + a +'" target="_blank">'+ a +'</a>';
                    });
                    console.log(result, link, data.data[0].msg);
                }
                opts.content = v.msg;
                break;
            case 'img':
                opts.content = v.picInfo[0];
                break;
            case 'higo_img':
                Api({
                    url: urls['higo_img'],
                    params: {
                        image_id: v.ext.imgId
                    },
                    success: function(resp){
                        console.log('success', resp);
                        $("#mid_"+v.msg_id).find('img').attr("src", resp.data[0].image_thumbnail);
                        $("#mid_"+v.msg_id).find('a').attr("href", resp.data[0].image_middle);
                    }
                });
                break;
            case 'higo_goods':
                console.log('type', opts.type, data  );
                Api({
                    url: urls['higo_goods'],
                    params: {
                        goods_id: v.ext.goodsId
                    },
                    success: function(resp){
                        console.log('success', resp);
                        if(resp.code){
                            $("#mid_"+options.messageId).find("p").html("发送失败");
                            return;
                        }
                        var img = new Image();
                        img.src = resp.data[0]['goods_image'];
                        if(img.complete) {
                            var $goodsPanel = shareTmp('higo_goods_panel', resp.data[0]);
                            $("#mid_"+options.messageId).html($goodsPanel);
                            intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                        } else {
                            img.onload = function () {
                                var $goodsPanel = shareTmp('higo_goods_panel', resp.data[0]);
                                $("#mid_"+options.messageId).html($goodsPanel);
                                intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                                img.onload = null;
                            };
                        };

                    }
                });
                break;
            case 'higo_coupon':
                console.log('type', opts.type, data  );
                Api({
                    url: urls['higo_coupon'],
                    params: {
                        shop_coupon_id: v.ext.couponId
                    },
                    success: function(resp){
                        console.log('success', resp);
                        if(resp.code){
                            $("#mid_"+options.messageId).find("p").html("发送失败");
                            return;
                        }
                        var $couponPanel = shareTmp('higo_coupon_panel', resp.data);
                        $("#mid_"+options.messageId).html($couponPanel);
                        $("#mid_"+options.messageId).addClass("higoCouponPanel").removeClass('bubble');
                        intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                    }
                });
                break;
            case 'higo_share':
                console.log( 'type' , opts.type , data);
                Api({
                    url : urls['higo_share'],
                    params : { 
                        show_id : v.ext.shareId
                    },
                    success: function( shareDate ){
                        console.info( 'shareDate' , shareDate );
                        var img = new Image();
                        img.src = shareDate.data[0]['share_pic'];
                        if(img.complete) {
                            var $goodsPanel = shareTmp('higo_share_panel', shareDate.data[0]);
                            $("#mid_"+options.messageId).html($goodsPanel);
                            intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                        } else {
                            img.onload = function () {
                                var $goodsPanel = shareTmp('higo_share_panel', shareDate.data[0]);
                                $("#mid_"+options.messageId).html($goodsPanel);
                                intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                                img.onload = null;
                            };
                        };
                    }
                });
                break;
            case 'higo_goodstag' :
                console.log( 'type' , opts.type , data);
                Api({
                    url: urls['higo_goods'] ,
                    params: {
                        goods_id: v.ext.goodstagId
                    },
                    success: function(resp){
                        console.log('higo_goodstag', resp);
                        var img = new Image();
                        img.src = resp.data[0]['goods_image'];
                        if(img.complete) {
                            var $goodsPanel = shareTmp('higo_goodstag_panel', resp.data[0]);
                            $("#mid_"+options.messageId).html($goodsPanel);
                            intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                        } else {
                            img.onload = function () {
                                var $goodsPanel = shareTmp('higo_goodstag_panel', resp.data[0]);
                                $("#mid_"+options.messageId).html($goodsPanel);
                                intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                                img.onload = null;
                            };
                        };

                    }
                });
                break;
            case 'higo_order' :
                console.log( 'type' , opts.type , data);
                Api({
                    url: urls['higo_order'] ,
                    params: {
                        order_id: v.ext.orderId,
                        access_token: co.im_id
                    },
                    success: function(resp){
                        console.log('higo_order', resp);
                        var img = new Image();
                        img.src = resp.data['avatar'];
                        resp.data['ctime'] = new Date(Number(resp.data['order_ctime'])*1000).getN();
                        if(img.complete) {
                            var $ordersPanel = shareTmp('higo_order_panel', resp.data);
                            $("#mid_"+options.messageId).html($ordersPanel);
                            intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                        } else {
                            img.onload = function () {
                                var $ordersPanel = shareTmp('higo_order_panel', resp.data);
                                $("#mid_"+options.messageId).html($ordersPanel);
                                intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));
                                img.onload = null;
                            };
                        };

                    }
                });
                break;
            default:
                console.log('type', opts.type);
                break;
        }
        $tmp = $(shareTmp('higo_dialog_item', opts));

        addCF.appendChild($tmp[0])

        $("#mid_"+opts.messageId).addClass("higoCouponPanel").removeClass('bubble');
        intoView($("#mid_"+opts.messageId).closest(".d_u"), $(".im_dialog"));

        intoView($tmp, $(".im_dialog"));
    })

    var $dialog = userListObj[uid].mainBox.find('.im_dialog')

    if(!$tmp) return
    if(exts.type == 'history'){
        exts.btn.after(addCF)
        $dialog.parent().scrollTop($tmp.offset().top - exts.bthHeight)

    }else if(exts.type == 'welcome'){
        $dialog.append(addCF)
        // userListObj[uid].mainBox.find('.history').after(addCF)
        intoView($tmp, $dialog)

    }else{
        $dialog.append(addCF)
        if(!$dialog[0].hidden)
            intoView($tmp, $dialog)

        if(!userListObj[uid].history){
            userListObj[uid].history = data.data[0].msg_id
        }

    }
}

var add_transdata = function (transdata,uid){
    var opts = {
        u_id : uid
    }
    var $tmp = $(shareTmp('im_transHistory_item',$.extend({},transdata,opts)))
    //console.log($tmp)
    var $dialog = userListObj[uid].mainBox.find('.im_dialog')
    $dialog.append($tmp)
    intoView($tmp, $dialog)
}

var syncSend = function(data){
    add(data)
}

exports.changeUserPush = changeUserPush
exports.messageList = messageList
//exports.init = init
exports.add = add;
exports.send = send
exports.resend = resend
exports.history = history
exports.syncSend = syncSend
exports.sendHigo = sendHigo;