/*common*/
/*
 var io = require('app/im/io')
 //Meilishuo.config.im_url = 'ws://192.168.128.11:3090/'
 Meilishuo.config.im_url = 'ws://xhimserver.meilishuo.com/'
 */

var socket = io.connect(Meilishuo.config.im_url+"?channel_id=2");

//window.socket = socket

var uploadPic = require('app/im/uploadPic_higo')
    , shareTmp = require('component/shareTmp')
    , init = require('app/im/higo_init')
    , ioStatus = require('app/im/ioStatus')
    , pc = require('app/im/pc_higo')
    , smile = require('app/im/smile')
    , reply = require('app/im/reply_higo')
    , intro = require('app/im/intro')
    , black = require('app/im/black')
    , info = require('app/im/info')
    , userList = require('app/im/userList_higo')
    , userObj = require('app/im/userObj')
    , userListHistory = require('app/im/userListHistory')
    , userStatus = require('app/im/userStatus')
    , transfer = require('app/im/transfer')
    , changeTab = require('app/im/changeTab')
    , audio = require('component/audio')
    , client = require('app/im/client')
    //, message = require('app/im/message')
    , message = require('app/im/messageObj')
    , groupObj = require('app/im/groupObj')
    , intoView = require('app/im/intoView')
    , encrypt = require('wap/app/encrypt')

    , $imTab = $('#im_tab')
    , $mainBox = $('#im_main')
    , $userTab = $('#user_tab')
    , $userListNowBox = $('#list_now')
    , $list_group = $("#list_group")

    , sound = {};


//require(['jquery','app/datetimepicker']);

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
console.log(co.im_id);

var idObj = {
    "425914467": {nick_name: "朱姝", user_id: "425914467", server_id: "1537"},
    "425914475": {nick_name: "张玉玲", user_id: "425914475", server_id: "1531"},
    "425914435": {nick_name: "谷文", user_id: "425914435", server_id: "1579"},
    "425914439": {nick_name: "陈晓彤", user_id: "425914439", server_id: "1955"},
    "425914441": {nick_name: "马艳杰", user_id: "425914441", server_id: "1957"}
};

var serverId = [
    430384427, 432802161, 432802191,
    432829625, 432829639, 432829725,
    432829763, 432993725, 432829801,
    432829895, 432862577, 432862605,
    430246297, 432862663, 432862699,
    432990341, 432990409, 432990461,
    425914435, 425914439, 425914441,
    425914451, 425914455, 425914461
];

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

function getInterceptedStr(sSource, iLen){
    if(sSource.replace(/[^x00-xff]/g,"xx").length <= iLen)
    {
        return sSource;
    }
    var str = "";
    var l = 0;
    var schar;
    for(var i=0; schar=sSource.charAt(i); i++)
    {
        str += schar;
        l += (schar.match(/[^x00-xff]/) != null ? 2 : 1);
        if(l >= iLen)
        {
            break;
        }
    }
    return str+'...';
}

window.userListObj = {};
//window.groupListObj = {};
var Config = {
    URL: {
        getGoods: "http://v.higo.meilishuo.com/goods/get_group_goods",
        coupon: {
            pri: "http://v.higo.meilishuo.com/shop_coupon/couponList4Pri",
            //pri: "http://v.higo.meilishuo.com/shop_coupon/GetShopCouponInfoByBatchId",
            pub: "http://v.higo.meilishuo.com/shop_coupon/couponList4Pri"
            //pub: "http://v.higo.meilishuo.com/shop_coupon/GetShopCouponInfoByBatchId"
        }
    },
    //token: "747fa55391b1dcaa06923f93d7561906",
    token: co.im_id,
    shop_id: co.im_shop_id,
    toid: 0,
    higoUrl: "http://v.higo.meilishuo.com",
    //higoUrl: "http://midian.lehe.com",
    isGroup: 0, //0: 私聊   1: 群聊
    type: 0     //0: 商品   1: 优惠卷
};
Date.prototype.getN = function(){
    var n = this.getFullYear()+''
        , m = (this.getMonth() + 1) + ''
        , d = this.getDate() + '';
    if(m.length<2) m ='0'+m;
    if(d.length<2) d ='0'+d;
    return n+'.'+m+'.'+d;
}
if(fml.vars.im.imClient){
    client.init()
    sound.newMsg = ($(shareTmp('im_sound_client')).appendTo($('body')))[0]
    sound.newOrder = ($(shareTmp('im_sound_client_order')).appendTo($('body')))[0]

}else{
    sound.newMsg = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_sound2.mp3', {tag:'newMsg'})
    sound.newOrder = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_order.mp3',{tag:'newOrder'})
}

smile.init('#im_main' , '.smile');
changeTab('#im_left', '#user', 200)
changeTab('#im_main', '.intro')

window.changeUser = function(idObj, opt){
    if(idObj.uid){
        var toid = idObj.uid;
        if(!toid) return;
        if(!userListObj[toid]) return;

        var opts = opt || {}
        _changeUser(toid)



        if(socket.disconnected) return;

        if(userListObj[toid].num){
            fml.vars.im.nosound = 1
        }

        //update order
        if(!userListObj[toid].welcome && fml.vars.im.isShop){
            $.get('/www/aj/recent_order', {to:toid, channel_id: 2} , function(res) {
                if(res.code===0){
                    // console.log(res)
                    userListObj[toid].mainBox.find('.list_order')
                        .prepend($(shareTmp('im_order_item',{list : res.data.datas || []})))
                }
            },'json');
        }

        userListObj[toid].mainBox.find('.im_inputbox_input').focus()

        var data = {
            toid : toid
            , welcomed : userListObj[toid].welcome | 0
            , toType : userListObj[toid].utype
        }
        opts.history && (data.history = opts.history)
        opts.sync && (data.sync = opts.sync)
        if(!opts.sync)
            socket.emit('changeUser', data)
        if(userListObj[toid].num){
            userListObj[toid].num = 0
            userList.topDialog(toid, 'read')
        }

        userListObj[toid].num = 0;
        userListObj[toid].userList.find(".num").empty().hide();
        userObj.freshTotalNum();
        /*更改地址栏url*/
        /*if(window.history.replaceState){
         window.history.replaceState({},'change user',location.pathname+'?toid='+toid)
         }*/
    } else if(idObj.gid){   //群 changeUser
        if(socket.disconnected) return;
        socket.emit('changeUser', {
            group_id: idObj.gid
        });
        //groupObj.changeUserPush({group_id: idObj.gid, "error_code" : 0, msg : "切换成功"});
    }

}

var pageState = {};
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

function _changeUser(toid){
    fml.vars.im.toid = toid
    userListObj[toid].userList.addClass('act').siblings().removeClass('act')
    userListObj[toid].mainBox.addClass('act').siblings().removeClass('act')
}

var submit = function(){
    if(!Config.isGroup){
        var $form = $(this)
        var $message = $form.find('.im_inputbox_input')
            , $picbox = $form.find('.im_inputbox_picbox')
            , $dialogBox = $form.parents('.im_mainbox').find('.im_dialog')
            , toid = $dialogBox.attr('uid')

        if(socket.disconnected){
            info.info(userListObj[toid].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')
            return;
        }

        var msg = $.trim($message.html())
            , $pics = $picbox.children('li')
            , len = $pics.length
            , black = (userListObj[toid].black) | 0
            , $pic

        if(black){
            info.info(userListObj[toid].mainBox, '发起会话请先移除黑名单')
            return;
        }

        //for firefox
        if(msg==='<br>'){
            msg=''
            $message.html('')
        }

        if(msg){
            var $msg = message.send({
                type : 'text'
                , content : msg
                , black : black
                , dialogBox : $dialogBox
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

        if(msg || len)
            userList.topDialog(toid, 'read')
    } else {
        var $form = $(this);
        var $message = $form.find('.im_inputbox_input')
            , $picbox = $form.find('.im_inputbox_picbox')
            , $dialogBox = $form.parents('.im_mainbox').find('.im_dialog')
            , groupId = $form.attr('gid');
        if(socket.disconnected){
            info.info(groupListObj[groupId].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')
            return;
        }

        var msg = $.trim($message.html())
            , $pics = $picbox.children('li')
            , len = $pics.length
            , $pic;


        //for firefox
        if(msg==='<br>'){
            msg=''
            $message.html('')
        }

        groupObj.send(msg, groupId);
        $message.empty();
    }


}

/*
* opts = {
*      uid: '123123',
*      goodsId: '123123123',
*      type: 'higo_goodsId'
* }
* */
var submitHigo = function(opts){
    var toid = opts.toid;

    if(socket.disconnected){
        info.info(userListObj[toid].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')
        return;
    }

    if(Config.isGroup){
        var black = 0;
    } else {
        var black = parseInt(userListObj[toid].black) || 0;
    }


    if(black){
        info.info(userListObj[toid].mainBox, '发起会话请先移除黑名单')
        return;
    }

    message.sendHigo({
        type : opts.type
        , msgId: opts.msgId
        //, content : msg
        , black : black
        , dialogBox : opts.dialogBox
        , coupon: opts.coupon || {}
    });
};

$mainBox
    .on('click', '.fail', message.resend)
    .on('click', '.historyBtn', function(){
        if(Config.isGroup){
            var $this = $(this)
                , gid = $this.attr('gid');
            if($this.is('.eventnone')) return;

            $this.addClass('eventnone').text('加载中...');
            console.log($this);
            var ajUrl = '/www/aj/open_history_new';
            $.get(ajUrl, {
                group_id: gid,
                count: 10,
                channel_id: 2,
                source: fml.vars.im.source,
                next_id: groupListObj[gid].history || 0

            }, function(res){
                groupObj.history(res, gid)
                $this.removeClass('eventnone').text('查看历史聊天记录')

            }, 'json')
                .fail(function(){
                    $this.removeClass('eventnone').text('加载失败，请重试')

                })
        } else {
            var $this = $(this)
                , toid = $this.attr('toid')

            if($this.is('.eventnone')) return;

            $this.addClass('eventnone').text('加载中...')
            console.log($this)
            var utype = userListObj[toid].utype
            var ajUrl = utype==='public' ? '/www/aj/publicHistory' : '/www/aj/open_history_new'
            $.get(ajUrl, {
                next_id : userListObj[toid].history || 0
                , limit : 10
                , to : toid
                , source: fml.vars.im.source
                , channel_id: 2

            }, function(res){
                if(utype!=='public') res = res.data;
                message.history(res, toid)
                $this.removeClass('eventnone').text('查看历史聊天记录')

            }, 'json')
                .fail(function(){
                    $this.removeClass('eventnone').text('加载失败，请重试')

                })
        }

    })
    .on('click', '.d_u a', function(){
        fml.vars.im.mustleave = 1
    })
    .on('submit', '.im_inputbox form', submit)
    .on('submit', '.order_box form', intro.searchOrder)

    .on('mouseenter', '.im_inputbox_picbox li', function(){
        $(this).children('.cleanPicBtn').show()
    })
    .on('mouseleave','.im_inputbox_picbox li', function(){
        $(this).children('.cleanPicBtn').hide()
    })
    .on('click', '.im_inputbox .goodsBtn', function(){
        Config.type = 0;
        var url = Config.URL.getGoods;
        Api({
            url: url,
            params: {
                access_token: Config.token,
                shop_id: Config.shop_id,
                type: 1,
                size: 6,
                p: 1
            },
            success: function(resp){
                console.log('success', resp);
                var list = (resp.data && resp.data.list) ? resp.data.list : [];
                var total = (resp.data && resp.data.total) ? resp.data.total : 0;
                var goodsPanel = shareTmp('goods_panel', {title:"发送商品", list: list, noInfo:"暂无商品信息", isCoupon:false});
                $('body').append(goodsPanel);
                pageState.total = parseInt(total, 10);
                for(var i = 0; i < list.length; i++){
                    list[i].goods_name = getInterceptedStr(list[i].goods_name, 40);
                }
                var $table = shareTmp('panel_goods_table', {list: list});
                if(list.length){
                    $('.panelBody').prepend($table);
                }

            }
        });
    })
    .on('click', '.im_inputbox .couponBtn', function(){
        Config.type = 1;
        var url = Config.isGroup ? Config.URL.coupon.pub : Config.URL.coupon.pri;
        Api({
            url: url,
            params: {
                access_token: Config.token,
                qry_batch_status: "20",
                type: 1,
                size: 6,
                p: 1
            },
            success: function(resp){
                //resp = {code: 0, data: {total: 2, p: 1, size: 10, list: [{batch_no: "HGSP20150811_167856413302083073_055", coupon_type: "20", coupon_name: "test", valid_range: 20, face_value: 111, limit_value: 111, start_date: 1439222400, end_date: 1441036799, batch_status: 20, supply_quantity: 11, origin_channel: 10, budget_no: "", budget_amount: 0, frozen_amount: 0, ctime: "1439289295", shop_id: "167856413302083073", id: "852", remain: "8", coupon_title: "商家券", remark: "已领3/11张", coupon_desc: "直减现金券", used_count: 0, show_desc: "2015.8.11至2015.8.31", batch_id: "852"}, {batch_no: "HGSP20150803_167856413302083073_053", coupon_type: "20", coupon_name: "我问问", valid_range: 20, face_value: 1, limit_value: 1, start_date: 1438531200, end_date: 1441036799, batch_status: 20, supply_quantity: 11, origin_channel: 10, budget_no: "", budget_amount: 0, frozen_amount: 0, ctime: "1438596648", shop_id: "167856413302083073", id: "841", remain: "7", coupon_title: "商家券", remark: "已领4/11张", coupon_desc: "直减现金券", used_count: 0, show_desc: "2015.8.3至2015.8.31", batch_id: "841"}]}};
                console.log('success', resp);
                var list = (resp.data && resp.data.list) ? resp.data.list : [];
                for(var i = 0; i < list.length; i++){
                    list[i].end_date = new Date((+list[i].end_date)*1000).getN();
                }
                var total = (resp.data && resp.data.total) ? resp.data.total : 0;
                var goodsPanel = shareTmp('goods_panel', {title:"发送优惠卷", list: list, noInfo:"暂无优惠卷信息", isCoupon:true, isGroup:Config.isGroup});
                $('body').append(goodsPanel);
                pageState.total = parseInt(total, 10);
                for(var i = 0; i < list.length; i++){
                        list[i].coupon_name = getInterceptedStr(list[0].coupon_name, 15);
                }
                var $table = shareTmp('panel_coupon_table', {list: list});
                if(list.length){
                    $('.panelBody').prepend($table);
                }
            }
        });
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
    .on("click", ".d_u .con .avatar", function(){
        console.log("click", ".con .avatar");
        if(!fml.vars.im.groupId) return;
        var chatfrom = $(this).attr("chatfrom");
        if(!userListObj[chatfrom]){
            var data = {
                data:[{
                    "chatfrom": chatfrom
                }]
            };
            userObj.addUserObj(data, function(){
                changeUser({uid: chatfrom});
                Config.isGroup = 0;
            });
        } else {
            changeUser({uid: chatfrom});
            Config.isGroup = 0;
        }
    });

$list_group
    .on('mouseenter', '.user_info', function(){
        $(this).children('.closeBtn').show();
    })
    .on('mouseleave','.user_info', function(){
        $(this).children('.closeBtn').hide();
    })
    .on('click', '.closeBtn', function(e){
        e.stopPropagation();
        var gid = $(this).parent('.user_info').attr('gid');
        groupListObj[gid].groupList.remove();
        groupListObj[gid].mainBox.remove();
        delete groupListObj[gid];
    })
    .on('click', '.user_info', function(){
        changeUser({gid: $(this).attr('gid')});
        Config.isGroup = 1;
    });

$userListNowBox
    .on('mouseenter', '.user_info', function(){
        $(this).children('.closeBtn').show()
    })
    .on('mouseleave','.user_info', function(){
        $(this).children('.closeBtn').hide()
    })
    .on('click', '.closeBtn', function(e){
        e.stopPropagation()
        var uid = $(this).parent('.user_info').attr('uid')
        userList.closeDialog(uid)

    })
    .on('click', '.user_info', function(){
        //changeUser($(this).attr('uid'))
        changeUser({uid: $(this).attr('uid')});
        Config.isGroup = 0;
    })

$('body')
    .on("click", "tr", function(){
        if($(this).closest("thead").length) return;
        $("tr").find("td").removeClass("trActive");
        $(this).find("td").addClass("trActive");
    })
    .on("click", "#closePanelBtn", function(){
        $(".goodsPanelBack").remove();
        $(".goodsPanel").remove();
        pageState = {};
    })
    .on("click", ".searchBtn1", function(){
        pageState.keyword = $("#searchInput").val();
        if(Config.type){    //优惠卷
            if(Config.isGroup){     //群聊
                var url = Config.URL.coupon.pub;
            } else {        //私聊
                var url = Config.URL.coupon.pri;
            }
        } else {    //商品
            var url = Config.URL.getGoods;
        }
        Api({
            url: url,
            params: {
                access_token: Config.token,
                shop_id: Config.shop_id,
                qry_batch_status: "20",
                type: 1,
                size: 6,
                p: 1,
                keyword: pageState.keyword
            },
            success: function(resp) {
                console.log(resp);
                var total = (resp.data && resp.data.total) ? resp.data.total : 0;
                pageState.total = parseInt(total, 10);
                var list = (resp.data && resp.data.list) ? resp.data.list : [];
                $('tbody').empty();
                for(var i = 0; i < list.length; i++){
                    if(Config.type == 'panel_table_body'){
                        list[i].goods_name = getInterceptedStr(list[0].goods_name, 40);
                    } else if(Config.type == 'panel_coupon_body'){
                        list[i].coupon_name = getInterceptedStr(list[0].coupon_name, 15);
                    }
                }
                var tbody = shareTmp(Config.type?'panel_coupon_body':'panel_table_body', {list: list});
                $('tbody').html(tbody);
            }
        });
    })
    .on("click", "#prevPage", function(){
        var p = pageState.page || 1;
        p = (p - 1) < 1 ? 1 : (p - 1);
        pageState.page = p;
        $("#pageNum").html(p);
        if( p == 1 ){ 
            $(this).addClass('noHover');
        }else{
            $(this).removeClass("noHover");
        }
        if(Config.type){    //优惠卷
            if(Config.isGroup){     //群聊
                var url = Config.URL.coupon.pub;
            } else {        //私聊
                var url = Config.URL.coupon.pri;
            }
        } else {    //商品
            var url = Config.URL.getGoods;
        }
        Api({
            url: url,
            params: {
                access_token: Config.token,
                shop_id: Config.shop_id,
                qry_batch_status: "20",
                type: 1,
                size: 6,
                p: p,
                keyword: pageState.keyword
            },
            success: function(resp) {
                console.log(resp);
                var list = (resp.data && resp.data.list) ? resp.data.list : [];
                $('tbody').empty();
                for(var i = 0; i < list.length; i++){
                    if(Config.type == 'panel_table_body'){
                        list[i].goods_name = getInterceptedStr(list[0].goods_name, 40);
                    } else if(Config.type == 'panel_coupon_body'){
                        list[i].coupon_name = getInterceptedStr(list[0].coupon_name, 15);
                    }
                }
                var tbody = shareTmp(Config.type?'panel_coupon_body':'panel_table_body', {list: list});
                $('tbody').html(tbody);
            }
        });
    })
    .on("click", "#nextPage", function(){
        var p = pageState.page || 1;
        // p = (p + 1) >= Math.ceil(pageState.total / 6) ? Math.ceil(pageState.total / 6) : (p + 1);
        if( p + 1 >= Math.ceil(pageState.total / 6) ){
            p = Math.ceil(pageState.total / 6) ;
            $(this).addClass('noHover');
        }else{
            p = p + 1;
            $(this).removeClass('noHover')
        }
        pageState.page = p;
        $("#pageNum").html(p);
        if(Config.type){    //优惠卷
            if(Config.isGroup){     //群聊
                var url = Config.URL.coupon.pub;
            } else {        //私聊
                var url = Config.URL.coupon.pri;
            }
        } else {    //商品
            var url = Config.URL.getGoods;
        }
        Api({
            url: url,
            params: {
                access_token: Config.token,
                shop_id: Config.shop_id,
                qry_batch_status: "20",
                type: 1,
                size: 6,
                p: p,
                keyword: pageState.keyword
            },
            success: function(resp) {
                console.log(resp);
                var list = (resp.data && resp.data.list) ? resp.data.list : [];
                $('tbody').empty();
                for(var i = 0; i < list.length; i++){
                    if(Config.type == 'panel_table_body'){
                        list[i].goods_name = getInterceptedStr(list[0].goods_name, 40);
                    } else if(Config.type == 'panel_coupon_body'){
                        list[i].coupon_name = getInterceptedStr(list[0].coupon_name, 15);
                    }
                }
                var tbody = shareTmp(Config.type?'panel_coupon_body':'panel_table_body', {list: list});
                $('tbody').html(tbody);
            }
        });
    })
    .on("click", ".createCouponBtn", function(){
        var $createCoupon = shareTmp('createCoupon', {title: "创建优惠卷"});
        $('.goodsPanel').html($createCoupon);
        $('#couponStartDate').datetimepicker({
            lang:'ch',
            datepicker:true,
            timepicker:false,
            format:'Y-m-d',
        });
        $('#couponEndDate').datetimepicker({
            lang:'ch',
            datepicker:true,
            timepicker:false,
            format:'Y-m-d',
            onShow:function( ct ){
                this.setOptions({
                    minDate:$('#couponStartDate').val()?$('#couponStartDate').val():false
                })
            }
        });
    })
    .on("click", "#sendPanelBtn", function(){
        var type = Config.type == 0 ? 'goods' : 'coupon';
        var $dialogBox =  $("#im_main").children(".act").find(".im_dialog");
        var typeId = $("#panel_list").find(".trActive").closest("tr").attr(type+"_id");
        if(!typeId){return;}
        if(type == 'coupon'){
            var couponTr = $("#panel_list").find(".trActive").closest("tr");
            var couponOpt = {
                coupon_title: couponTr.find('.nameCoupon').html(),
                face_value: couponTr.find('.priceCoupon').html(),
                coupon_desc: couponTr.find('.des').html(),
                end_date: couponTr.find('.endTime').html(),
                coupon_id: typeId
            };
        }
        if(Config.isGroup){
            submitHigo({
                msgId: typeId,
                toid: $("#list_group").find(".act").attr("gid"),
                type: 'higo_'+type,
                dialogBox: $dialogBox,
                coupon: couponOpt || {}
            });
        } else {
            if(type == 'coupon'){
                Api({
                    url: Config.higoUrl+"/account/GetHigoUserInfoByMlsUserIds",
                    params: {
                        mls_user_ids: fml.vars.im.toid
                    },
                    success: function(res){
                        var account_id = res.data.map[0].higo_account_id;
                        var event_id = '5060038009';
                        var getCouponKey = "j/Iev47WD5ZWpHhHJ7owlarhE3S7GCn2wWFXKk7wFm16";
                        var md5Str = ((encrypt.MD5(account_id + typeId + event_id + getCouponKey).toString()).toLowerCase()).toString();
                        Api({
                            url: Config.higoUrl+"/shop_coupon/CollectCoupon",
                            params: {
                                client_sendmesctr: 20,
                                access_token: Config.token,
                                account_id: account_id,
                                event_id: event_id,
                                batch_id: typeId,
                                private_flag: 1,
                                sign: md5Str
                            },
                            success: function(resp){
                                console.log("CollectCoupon", resp);
                                if(resp.code == 0){
                                    submitHigo({
                                        msgId: typeId,
                                        toid: $("#list_now").find(".act").attr("uid"),
                                        type: 'higo_'+type,
                                        dialogBox: $dialogBox,
                                        coupon: couponOpt || {}
                                    });
                                }
                            }
                        });
                    }
                });
            } else if(type == 'goods') {
                submitHigo({
                    msgId: typeId,
                    toid: $("#list_now").find(".act").attr("uid"),
                    type: 'higo_'+type,
                    dialogBox: $dialogBox,
                    coupon: couponOpt || {}
                });
            }
        }

        $(".goodsPanelBack").remove();
        $(".goodsPanel").remove();
        pageState = {};
    })
    .on("click", "#sendCreateCouponBtn", function(){
        //创建和发送优惠卷的接口
        var couponName = $("#couponName").val();
        var couponPrice = $("#couponPrice").val();
        var couponInfo = $("#couponInfo").val();
        var couponStartDate = $("#couponStartDate").val();
        var couponEndDate = $("#couponEndDate").val();

        Api({
            url: Config.higoUrl+"/account/GetHigoUserInfoByMlsUserIds",
            params: {
                mls_user_ids: Config.toid
                //mls_user_ids: '765'
            },
            success: function(res){
                console.log(res);
                Api({
                    url: Config.higoUrl+"/shop_coupon/CreateOrientedCoupon",
                    params: {
                        coupon_name: couponName,
                        face_value: couponPrice,
                        limit_value: couponInfo,
                        start_date: couponStartDate,
                        end_date: couponEndDate,
                        coupon_type: 21,
                        receiver_accountid: res.data.map[0].higo_account_id,
                        access_token: Config.token
                    },
                    success: function(resp){
                        console.log('success', resp);
                        if(resp.code){
                            $(".panelFooter .info").show().html(resp.message);
                            return ;
                        }
                        var couponOpt = {
                            coupon_title: resp.data.coupon_title,
                            face_value: resp.data.face_value,
                            coupon_desc: resp.data.coupon_desc,
                            end_date: new Date((+resp.data.end_date)*1000).getN(),
                            coupon_id: resp.data.batch_id
                        };
                        var $box = $(shareTmp('higo_dialog_item', opts));
                        submitHigo({
                            msgId: resp.data.batch_id,
                            toid: $("#list_now").find(".act").attr("uid"),
                            type: 'higo_coupon',
                            dialogBox: $("#im_main").children(".act").find(".im_dialog"),
                            coupon: couponOpt || {}
                        });
                        //submitCoupon({
                        //    msgId: resp.data.batch_id,
                        //    toid: $("#list_now").find(".act").attr("uid"),
                        //    type: 'higo_coupon',
                        //    dialogBox: $("#im_main").children(".act").find(".im_dialog"),
                        //    coupon: couponOpt || {}
                        //});
                        $(".goodsPanelBack").remove();
                        $(".goodsPanel").remove();
                        pageState = {};
                    }
                });
            }
        });
    });

var submitCoupon = function(options){
    Api({
        url: Config.higoUrl+"/shop_coupon/GetShopCoupon",
        params: {
            shop_coupon_id: options.msgId
        },
        success: function(resp){

        }
    });
};

init(socket)
ioStatus(socket, $('#io_status'))
pc.init(socket)
userObj.init({socket:socket});
intro.init(socket)
userStatus.init(socket, $imTab, $mainBox)
userList.init({
    mainBox : $mainBox
    , listBox : $userListNowBox
    , listTab : $userTab.children('.tab_now')
    , sound : sound
    , socket : socket
})

var messageFn = function(v){
//	if(userListObj[uid].num == v.msg_num) return;
    if(!fml.vars.im.imClient) return;
    client.notify({
        "title":userListObj[v.uid].name
        ,"text":v.msg
        ,"uid":v.uid
        ,'img':userListObj[v.uid].avatar
    })
}

socket.on('unReadMsgPush', function(data){
    console.log('unReadMsgPush', data);
    if(data.data && data.data[0] && !data.data[0].group_id){
        if(data.data && data.data[0] && fml.vars.im.toid == data.data[0].chatfrom){  //当前聊天人
            var s = fml.vars.im.toid==data.data[0].chatfrom ? sound : null;
            message.messageList(data, data.data[0].chatfrom, s, function(v){
                messageFn(v)
                userList.topDialog(v.uid,'new')
            });
        } else {    //非当前聊天人
            //userList.talkList();
            if(!userListObj[data.data[0].chatfrom]){
                userObj.addUserObj(data, function(data, resp){   //聊天人不在列表中
                    userObj.unreadNumList(data);

                    console.log("工单 uid", fml.vars.im.fromid, idObj);
                    //fml.vars.im.fromid = 441006103;
                    if(idObj[fml.vars.im.fromid+""]){
                        $.post('/www/aj/ticket_create', {
                            server_id: idObj[fml.vars.im.fromid].server_id,
                            //user_id: fml.vars.im.fromid,
                            user_id: data.data[0].chatfrom,
                            //user_name: idObj[fml.vars.im.fromid].nick_name
                            user_name: resp.data.map[0].nick_name
                        }, function(res){
                            console.log("工单", res);
                            if(res && res.data && res.data.data){
                                var id = res.data.data;
                                var url = "http://kfadmin.meilishuo.com/online/higo_online_detail?higo_online_ticket_id=" + id;
                                window.open(url);
                            }
                        }, 'json');
                    }
                });

            }else{       //聊天人在列表中
                userObj.receiveMsg(data);
            }
        }
    } else {
        //var data = {"data":[{"msg_id":"1037675909","type":"text","source":"mob","chatfrom":54079675,"chatto":0,"msg":"456","group_id":7552,"shop_id":0,"pub_id":0,"ext":null,"picIds":null,"ctime":"2015-08-25 22:37:10","timestamp":1440513430,"messageId":1440513430391}]};
        if(!groupListObj[data.group_id]){    //列表里不存在此群
            //groupObj.create(data.group_id);
        }
        groupObj.receiveMsg(data.data[0]);
    }

});

userListHistory.init({box:'list_history', data:{page:1}, url:'/www/aj/historyUser'})
userListHistory.init({box:'list_public'})

socket.on('connectPush', function (data) {

    if(fml.vars.im.fromid != data.fromid){
        //pc.backLogin()
        //return;

        alert("请重新登录");
        window.opener=null;
        window.open('','_self');
        window.close();
        return;
    }

    userList.talkList()

    if(socket.io.connected > 1){
        return;
    }

    $('#im_layout').hide()

    Api({
        url: Config.higoUrl+"/account/GetHigoUserInfoByMlsUserIds",
        params: {
            mls_user_ids: fml.vars.im.fromid
            //mls_user_ids: '425035715'
        },
        success: function(resp){
            console.log('success GetHigoUserInfoByMlsUserIds', resp);
            fml.vars.im.head = resp.data.map[0].avatar ? resp.data.map[0].avatar : 'http://d21.higo.res.meilishuo.net/higo/orig/2015-04-28/d8f9e339d1edb5ff2b894cf91d786e61.png';
            $imTab.find('.user_img').html('<img src="' + fml.vars.im.head + '"/>');
            $(".d_m").find(".con img").attr("src", fml.vars.im.head);

            $("#im_tab .user_info .user_name").html(resp.data.map[0].nick_name);
            fml.vars.im.name = resp.data.map[0].nick_name;
        }
    });

    //$imTab.find('.user_img').html('<img src="' + fml.vars.im.head + '"/>')

    userList.topDialog(fml.vars.im.toid, 'auto', true)

    if(data.req.data.isShop){

        $('#im_body').removeClass('user_model').addClass('shop_model')

        transfer.init('#im_main', '.im_transfer', fml.vars.im.transfer)

        reply.init('.fastReply', fml.vars.im.udr, socket)

        black.init($mainBox)

    }

    //运营客服搜索权限
    for(var i = 0; i < serverId.length; i++){
        if(fml.vars.im.fromid == serverId[i]){
            $("#im_search").show();
        }
    }

    //group
    groupObj.init($list_group , socket);

    //加入商运和客服的入口
    var toid = (function(pathStr){
        if(!pathStr){ return "";}
        var str = pathStr.substr(1);
        var params = str.split("&");
        var param = {};
        for(var i = 0; i < params.length; i++){
            var key = params[i].split("=")[0];
            var value = params[i].split("=")[1];
            param[key] = value;
        }
        return param;
    })(location.search).toid;
    if(toid && !userListObj[toid]){
        userObj.addUserObj({data:[{chatfrom: toid}]}, function(){   //聊天人不在列表中
            changeUser({uid: toid});
        });
    } else {
        changeUser({uid: toid});
    }

})

socket.on('ImMsgSysPush', function (data) {
    console.log('ImMsgSysPush', data);

    var fn = (new Function('return ' + data.fn))()
    fn()

})

socket.on('changeUserPush', function (data) {
    console.log('changeUserPush', data)
    if(data.toid){
        var toid = data.toid;
        fml.vars.im.toid = toid;
        fml.vars.im.groupId = 0;
        if(!toid) return;
        Config.toid = toid;
        if(!userListObj[toid]) return;

        if(data.userStatus && data.userStatus.data){
            userStatus.update(data.userStatus.data, toid)
        }

        if(data.goods && data.goods.data){
            intro.update(data.goods.data, toid, 'goods')
        }

        $(".list_group").children(".user_info").removeClass("act");
        message.changeUserPush(data, sound, messageFn)

        if(data.shop && data.shop.data){
            intro.update(data.shop.data, toid, 'shop')
        }
        if(data.black){
            black.set(data.black.data, toid)
        }
    } else if(data.group_id) {
        fml.vars.im.toid = 0;
        fml.vars.im.groupId = data.group_id;
        var groudId = data.group_id;
        if(!groupListObj[groudId]) return;

        groupObj.changeUserPush(data);
    }

})

socket.on('talkListPush', function (data) {
    console.log('talkListPush', data)

    /*	if(!data.req) return;

     userList.talkList(data.req)*/
})

window.onbeforeunload = function (e) {
    if(fml.vars.im.imClient || !fml.vars.im.isShop)
        return;

    if(fml.vars.im.mustleave){
        fml.vars.im.mustleave = 0
        return;
    }

    e = e || window.event;
    var txt = "关闭浏览器将不能及时的收到新消息和声音提醒。"
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
        e.returnValue = txt
    }

    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return txt
};

//socket.on('talkListNewPush',function(data){
//    console.log('talkListNewPush',data)
//    if(!data.req) return
//    userList.talkList(data.req)
//
//})
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

function importCss(file){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = file+'?t=1210' //+ (new Date).getTime()
    head.appendChild(link);
}
function importJS(file , cbk){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('script');
    link.src = file +'?t=1030'
    link.onload = link.onreadystatechange = function() {
        if (!cbk) return
        var state = this.readyState;
        if (!state || 'loaded' == state || 'complete' == state) {
            cbk();
            head.removeChild(link)
        }
    }
    head.appendChild(link)
}
importCss('http://b.higo.meilishuo.com/statics/css/datetimepicker.css');
importJS('http://b.higo.meilishuo.com/statics/js/jquery.ui.timeslider.js');

function toChat(){}

socket.on('syncStatusPush',function(data){
    console.log('syncStatusPush',data)
})
