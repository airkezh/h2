/*common*/
var shareTmp = require('component/shareTmp')
    , emo2img = require('app/emoji').emo2img
    , userStatus = require('app/im/userStatus')
    , sendObj = {}
    , htmlFilter = require('component/filterhtml')
    , pastePic = require('ui/pastePic')
    , uploadPic = require('app/im/uploadPic_higo')
    , message = require('app/im/messageObj')
    , intoView = require('app/im/intoView');

window.groupListObj = {};
var userInfos = {};
var urls = {
    'higo_goods': 'http://v.higo.meilishuo.com/goods/get_simple_detail'
    ,'higo_coupon': 'http://v.higo.meilishuo.com/shop_coupon/GetShopCoupon'
    ,'higo_share': 'http://v.higo.meilishuo.com/show/get_detail'
    ,'higo_img': 'http://v.higo.meilishuo.com/image/Get_detail'
};
var groupSocket;
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

var strRegex = '((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    + '|' // 允许IP和DOMAIN（域名）
    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
    + '[a-z]{2,6})' // first level domain- .com or .museum
    + '(:[0-9]{1,4})?' // 端口- :80
    + '((/?)|' // a slash isn't required if there is no file name
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';

Date.prototype.getT = function(){
    var h = this.getHours()+''
        ,m = this.getMinutes() + '';
    if(h.length<2) h ='0'+h;
    if(m.length<2) m ='0'+m;
    return h+':'+m;
};

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

var Config = {
    token: co.im_id
    , url: "http://v.higo.meilishuo.com"
    // , url: "http://midian.lehe.com"
};

var init = function(cxt , socket){
    console.log("group is init!");
    $.post('/www/aj/group_list', {access_token : Config.token, channel_id: 2}, function(res){
        console.log("get group list", res);
        //var res = {"code":0,"error_code":0,"message":"success!","data":{"datas":[{"group_id":"7552","msg":"","group_info":{"id":"7552","account_id":"176576012983714988","shop_id":"176576012984834981","group_name":"东京魅惑","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-08-10/16bfd73807e8b79fc4923f95303e7419.png","group_desc":"店主在日定居十余年，周末最爱和先森带着两个宝贝逛遍日本的大街小巷，熟悉各种化妆品，保健品，药品，母婴用品等等，欢迎各位亲亲咨询，定当竭诚为您服务*^_^*","group_status":"1","group_type":"1","country":"日本","city":"大阪府","store_name":"","area":"","group_tags":"物美价廉,正品,奶粉,纸尿裤,母婴,化妆品,低价","reject_reason":"","members_count":"374","certification_flag":"3","official_express":"0","approve_num":"0","weixin_uid":"樱花雪","group_goods":"238","new_goods":"36","fashion_score":"0","main_category_name":"母婴","purchasing_advantages":"以爱之名，保证正品","local_time":"","msg_mode":1,"shop_account_id":"176576012983714988","shop_logo":"http://pic.higo.meilishuo.com/higo/orig/2015-08-10/16bfd73807e8b79fc4923f95303e7419.png","shop_desc":"店主在日定居十余年，周末最爱和先森带着两个宝贝逛遍日本的大街小巷，熟悉各种化妆品，保健品，药品，母婴用品等等，欢迎各位亲亲咨询，定当竭诚为您服务*^_^*","shop_name":"东京魅惑","shop_status":"1","goods_number":"总共225个单品，今日更新了4个单品","admin_account_id":"165672804706849911","admin_account_mobile":"","admin_account_weixin":"","admin_account_name":"","shop_operating_status":"0"}},{"group_id":"6980","msg":"","group_info":{"id":"6980","account_id":"175185848732039950","shop_id":"175185848733154981","group_name":"白菜淘欧洲","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-07-22/8b1f85b5c1fa8baba575c9007a60f2fb.png","group_desc":"欧洲一手打折资讯，为年轻mm挑选合适的品牌款式，主营二线轻奢和知名潮牌","group_status":"1","group_type":"1","country":"法国","city":"法兰西岛","store_name":"","area":"","group_tags":"奢侈品初体验","reject_reason":"","members_count":"87","certification_flag":"3","official_express":"0","approve_num":"0","weixin_uid":"tt62360512","group_goods":"17","new_goods":"3","fashion_score":"0","main_category_name":"包包","purchasing_advantages":"","local_time":"","msg_mode":1,"shop_account_id":"175185848732039950","shop_logo":"http://pic.higo.meilishuo.com/higo/orig/2015-07-22/8b1f85b5c1fa8baba575c9007a60f2fb.png","shop_desc":"欧洲一手打折资讯，为年轻mm挑选合适的品牌款式，主营二线轻奢和知名潮牌","shop_name":"白菜淘欧洲","shop_status":"1","goods_number":"总共20个单品，今日更新了3个单品","admin_account_id":"177157674375634927","admin_account_mobile":"15501288313","admin_account_weixin":"higozhaoshang","admin_account_name":"郭馨雅","shop_operating_status":"0"}},{"group_id":"3622","msg":"","group_info":{"id":"3622","account_id":"168449722166396950","shop_id":"168449722169046909","group_name":"米粒韩国妆园","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-05-10/006697ac24d4164d8778fae22cf4ca4e.jpg","group_desc":"掌柜是两位韩国留学生，小艾和米粒。在韩七年有余，吃喝玩乐样样精通，对生活品质追求一直不懈，希望把我们认为最好滴韩国资讯以及产品分享给小伙伴们！本店所有韩国产品均为韩国采购韩国直邮，少量欧美产品从香港发货 ，直达亲手中，购物无忧！正品保证！","group_status":"1","group_type":"1","country":"韩国","city":"首尔","store_name":" ","area":"","group_tags":"韩国品质生活","reject_reason":"","members_count":"25068","certification_flag":"3","official_express":"0","approve_num":"464","weixin_uid":"18688788881","group_goods":"236","new_goods":"2","fashion_score":"0","main_category_name":"美妆","purchasing_advantages":"良心做事","local_time":"","msg_mode":1,"shop_account_id":"168449722166396950","shop_logo":"http://pic.higo.meilishuo.com/higo/orig/2015-05-10/006697ac24d4164d8778fae22cf4ca4e.jpg","shop_desc":"掌柜是两位韩国留学生，小艾和米粒。在韩七年有余，吃喝玩乐样样精通，对生活品质追求一直不懈，希望把我们认为最好滴韩国资讯以及产品分享给小伙伴们！本店所有韩国产品均为韩国采购韩国直邮，少量欧美产品从香港发货 ，直达亲手中，购物无忧！正品保证！","shop_name":"米粒韩国妆园","shop_status":"1","goods_number":"总共180个单品","admin_account_id":"177169915250170944","admin_account_mobile":"18610635898","admin_account_weixin":"HIGO-chendan","admin_account_name":"陈丹","shop_operating_status":"0"}},{"group_id":"1139","msg":"","group_info":{"id":"1139","account_id":"164550145865736930","shop_id":"164550145868052988","group_name":"败家败到美国去","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-07-29/344f695186e2d971cee11ed70ce7edbb.jpg","group_desc":"美国留学生一枚，爱好shopping。亲自去商场专柜采购，加入群圈看不定期现场直播采购，让大家买的放心！本店特色：1、100%真货正品；2、价格更便宜--已与美国部分品牌专柜达成合作，可享内部折扣价！报价已包括税、国内外运费。不定时上新，给大家找物美价廉的货。欢迎关注，收藏！","group_status":"1","group_type":"1","country":"美国","city":"CA","store_name":"  ","area":"","group_tags":"美国专柜正品代购","reject_reason":"","members_count":"2698","certification_flag":"3","official_express":"0","approve_num":"301","weixin_uid":"chanel-gy","group_goods":"139","new_goods":"1","fashion_score":"0","main_category_name":"包包","purchasing_advantages":"由于长期大量代购，已经和Mk、Coach、KS、天梭、浪琴、欧米茄、Prada、LV、burberry等部分品牌达成合作，可帮大家享受内部折扣，更优价格代购！要代购，欢迎锁定我们Go！","local_time":"","msg_mode":1,"shop_account_id":"164550145865736930","shop_logo":"http://pic.higo.meilishuo.com/higo/orig/2015-07-29/344f695186e2d971cee11ed70ce7edbb.jpg","shop_desc":"美国留学生一枚，爱好shopping。亲自去商场专柜采购，加入群圈看不定期现场直播采购，让大家买的放心！本店特色：1、100%真货正品；2、价格更便宜--已与美国部分品牌专柜达成合作，可享内部折扣价！报价已包括税、国内外运费。不定时上新，给大家找物美价廉的货。欢迎关注，收藏！","shop_name":"败家败到美国去","shop_status":"1","goods_number":"总共131个单品","admin_account_id":"177169942705490917","admin_account_mobile":"15110167144","admin_account_weixin":"13051764386","admin_account_name":"汪麦伦","shop_operating_status":"0"}},{"group_id":"953","msg":"","group_info":{"id":"953","account_id":"163903902219319958","shop_id":"163903902228183974","group_name":"萤火点点LA乐淘","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-04-08/122b3657ad6288a31e77a53866819e60.jpg","group_desc":"不止是单纯的代购，也为与你分享在天使之城看到的一切美好事物，温暖的阳光，漂亮的服饰，新奇好玩的东西，与你为伴，分享生活的点滴。","group_status":"1","group_type":"1","country":"美国","city":"洛杉矶","store_name":"萤火点点LA乐淘","area":"","group_tags":"Coach,KateSpade,J.CrewFactory,Anthropologie,Francesca's等等","reject_reason":"","members_count":"227","certification_flag":"3","official_express":"0","approve_num":"20","weixin_uid":"cherry_hcl2013","group_goods":"92","new_goods":"3","fashion_score":"0","main_category_name":"","purchasing_advantages":"","local_time":"","msg_mode":1,"shop_account_id":"163903902219319958","shop_logo":"http://d21.higo.res.meilishuo.net/higo/normal/2015-03-13/00f41b852987c4784716881491ac1a67.jpg","shop_desc":"不止是单纯的代购，也为与你分享在天使之城看到的一切美好事物，温暖的阳光，漂亮的服饰，新奇好玩的东西，与你为伴，分享生活的点滴。","shop_name":"萤火点点LA乐淘","shop_status":"1","goods_number":"总共56个单品，今日更新了1个单品","admin_account_id":"177169927689445981","admin_account_mobile":"15011461711","admin_account_weixin":"higococo","admin_account_name":"安然","shop_operating_status":"0"}},{"group_id":"731","msg":"","group_info":{"id":"731","account_id":"163684119691851922","shop_id":"163684119701124946","group_name":"依依带你逛日本","group_header":"http://pic.higo.meilishuo.com/higo/orig/2015-04-10/99f8d361fbc07db41f60fa50e12dd581.png","group_desc":"来日已有十年，现在是宝妈=^_^=日本是所有爱美妹纸的天堂，产品琳琅满目，应有尽有，想与大家分享日本的美丽。日本的母婴产品也大力推荐，吃着放心，用着安心，宝妈也要美美哒！本店产品不敢说是最便宜的，但绝对是最优惠的正品，最到位的服务。新店开张，欢迎光临。","group_status":"1","group_type":"1","country":"日本","city":"大阪","store_name":"日本","area":"","group_tags":"资生堂,DHC,Kanebo,Kose,吉尔•斯图尔特（JillStuart）彩妆,各种药妆,贝亲,康贝,母婴产品","reject_reason":"","members_count":"3558","certification_flag":"3","official_express":"0","approve_num":"27","weixin_uid":"meimei0117","group_goods":"332","new_goods":"4","fashion_score":"0","main_category_name":"美妆","purchasing_advantages":"","local_time":"","msg_mode":0,"shop_account_id":"163684119691851922","shop_logo":"http://d21.higo.res.meilishuo.net/higo/normal/2015-03-10/25bc6c94ad4d9c5a25db802fb5f559fb.png","shop_desc":"来日已有十年，现在是宝妈=^_^=日本是所有爱美妹纸的天堂，产品琳琅满目，应有尽有，想与大家分享日本的美丽。日本的母婴产品也大力推荐，吃着放心，用着安心，宝妈也要美美哒！本店产品不敢说是最便宜的，但绝对是最优惠的正品，最到位的服务。新店开张，欢迎光临。","shop_name":"依依带你逛日本","shop_status":"1","goods_number":"总共279个单品","admin_account_id":"177169915250170944","admin_account_mobile":"18610635898","admin_account_weixin":"HIGO-chendan","admin_account_name":"陈丹","shop_operating_status":"0"}}],"prev_id":0,"next_id":0,"is_last":1,"count":9},"r":"im-open_group_list"};
        getGroupList({
            groups: res.data.datas,
            cxt: cxt
        });
    }, 'json');
    groupSocket = socket;
};
var getGroupList = function(opts){
    var cxt = opts.cxt;
    $.each(opts.groups, function(i, v){
        var group = shareTmp("im_grouplist_item", v.group_info);
        var groupMain = shareTmp("im_groupMain_item", v.group_info);
        cxt.append(group);
        $("#im_main").append(groupMain);
        groupListObj[v.group_info.id] = {
            name: v.group_info.group_name,
            groupList: $("#list_group [gid='" + v.group_info.id + "']"),
            mainBox: $("#im_main").children("[gid='" + v.group_info.id + "']"),
            avatar: v.group_info.group_header,
            num: 0,
            history: 0,
            isPull: 0
        };

    });
    return groupListObj;
};

var create = function(groupId){
    if(!item){
        Api({
            url: Config.url+"/group_chat/getGroupInfoById",
            params: {access_token: Config.token, id: groupId},
            success: function(res){
                console.log("getGroupInfoById", res);
                //res = {"code":0,"data":[{"id":"264","group_id":"d163cec63faa9f638","account_id":"151941080138160925","shop_id":"151941080145348943","group_name":"D&G官方旗舰店","group_header":"http://192.168.190.2/pic/higo/orig/2014-10-28/89bf7d7607cbf0091f40b8caa31070f1.png","group_desc":"这是个伟大的群。。。","group_status":"1","group_type":"1","country":"美国","city":"纽约","store_name":"时代广场B1层","area":"","group_tags":"美国,小清新","reject_reason":"","members_count":"10","certification_flag":"3","official_express":"0","approve_num":"0","weixin_uid":"","group_goods":"31","new_goods":"0","fashion_score":"0","main_category_name":"","purchasing_advantages":"","local_time":"","msg_mode":1,"shop_account_id":"151941080138160925","shop_logo":"http://192.168.190.2/pic/higo/normal/2014-10-31/65f2659d7a1b9b9400cddb6145bec04a.jpg","shop_desc":"这是个伟大的群。。。","shop_name":"D&G官方旗舰店","shop_status":"1","goods_number":"总共25个单品","admin_account_id":"165672804809814963","admin_account_mobile":"","admin_account_weixin":"","admin_account_name":"","shop_operating_status":"0"}]};
                if(res.data && res.data[0]) return;
                var group = shareTmp("im_grouplist_item", res.data[0]);
                var groupMain = shareTmp("im_groupMain_item", res.data[0]);
                cxt.append(group);
                $("#im_main").append(groupMain);
                groupListObj[res.data[0].id] = {
                    name: res.data[0].group_name,
                    groupList: $("#list_group [gid='" + res.data[0].id + "']"),
                    mainBox: $("#im_main").children("[gid='" + res.data[0].id + "']"),
                    avatar: res.data[0].group_header,
                    num: 0,
                    history: 0,
                    isPull: 0
                };
            },
            error: function(){}
        });
    }
};

var changeUserPush = function(data, fn){
    var groupId = data.group_id;
    freshGroupList(groupId);

    var history = getHistory(groupId);

    emptyUnreadNum(data.group_id);

    fn && fn(groupId);
};

var freshGroupList = function(groupId){
    var $mainBox = groupListObj[groupId].mainBox;
    var $groupList = groupListObj[groupId].groupList;
    $mainBox.siblings(".act").removeClass("act").addClass("rightHide");
    $mainBox.removeClass("rightHide").addClass("act");
    $(".list_now").children(".user_info").removeClass("act");
    $groupList.siblings(".act").removeClass("act");
    $groupList.addClass("act");
};

var history = function(res, gid){
    console.log("group history resp", res);
    var groupId = gid;
    var chatfroms = [];
    if(res.data.datas.length == 0){
        return;
    }
    groupListObj[groupId].mainBox.find(".history").removeClass("hide");
    $.each(res.data.datas, function(i, v){
        var options = {
            who: fml.vars.im.fromid == v.chatfrom ? 'd_m' : 'd_u',
            type: v.type,
            send: '',
            messageId: v.msg_id,
            content: v.msg,
            ctime: v.ctime,
            group_id: groupId,
            isHistory: 1,
            chatfrom: v.chatfrom
        };
        chatfroms.push(v.chatfrom);
        add(options, v.ext);
    });
    groupListObj[groupId].isPull = 1;
    groupListObj[groupId].history = res.data.datas[res.data.datas.length - 1].msg_id;
    Api({
        url: Config.url+"/account/GetHigoUserInfoByMlsUserIds",
        params: {mls_user_ids: chatfroms.join(",")},
        success: function(res){
            console.log("GetHigoUserInfoByMlsUserIds", res);
            var avatar = "http://d21.higo.res.meilishuo.net/higo/orig/2015-04-28/d8f9e339d1edb5ff2b894cf91d786e61.png";
            $.each(res.data.map, function(idx, val){
                if ( val.avatar == '' ){
                    val.avatar = avatar
                }
                groupListObj[groupId].mainBox.find(".im_dialog").find("[chatfrom='" + val['mls_user_id'] + "']").attr({src: val.avatar||avatar});
            });
        },
        error: function(){}
    });
};

var getHistory = function(groupId, next_id){
    if(groupListObj[groupId].isPull) return;
    var unread = groupListObj[groupId].num || 0;
    $.get('/www/aj/open_history_new', {
        group_id: groupId,
        count: 10 + unread,
        channel_id: 2,
        next_id: next_id || 0
    }, function(res){
        console.log("group history", res);
        var chatfroms = [];
        //res = {"error_code":0,"data":{"datas":[{"msg_id":"811612793","chatfrom":"765","chatto":"","group_id":"77","shop_id":"0","pub_id":"0","channel_id":"1","msg":"777","ctime":"2015-08-18 21:06:14","ext":null,"source":"web","type":"text","timestamp":1439903174}],"prev_id":811612793,"next_id":811612765,"is_last":0,"count":15}};
        //if(!groupListObj[groupId].isPull){
            if(res.data.datas.length == 0){
                return;
            }
            groupListObj[groupId].mainBox.find(".history").removeClass("hide");
            $.each(res.data.datas, function(i, v){
                if(i >= unread){
                    var options = {
                        who: fml.vars.im.fromid == v.chatfrom ? 'd_m' : 'd_u',
                        type: v.type,
                        send: '',
                        messageId: v.msg_id,
                        content: v.msg,
                        ctime: v.ctime,
                        group_id: groupId,
                        isHistory: 1,
                        chatfrom: v.chatfrom
                    };
                    chatfroms.push(v.chatfrom);
                    add(options, v.ext);
                }
            });
        //}
        groupListObj[groupId].isPull = 1;
        groupListObj[groupId].history = res.data.datas[res.data.datas.length - 1].msg_id;
        Api({
            url: Config.url+"/account/GetHigoUserInfoByMlsUserIds",
            params: {mls_user_ids: chatfroms.join(",")},
            success: function(res){
                console.log("GetHigoUserInfoByMlsUserIds", res);
                var avatar = "http://d21.higo.res.meilishuo.net/higo/orig/2015-04-28/d8f9e339d1edb5ff2b894cf91d786e61.png";
                $.each(res.data.map, function(idx, val){
                    if ( val.avatar == '' ){
                        val.avatar = avatar
                    }
                    groupListObj[groupId].mainBox.find(".im_dialog").find("[chatfrom='" + val['mls_user_id'] + "']").attr({src: val.avatar||avatar});
                });
            },
            error: function(){}
        });
    }, 'json');
};

function sendFail(messageId){
    // var bubbleObj = sendObj[messageId].conp
    // bubbleObj.addClass('fail')
    // if(!bubbleObj.find('.fail_tip').length)
    //     bubbleObj.append('<span class="fail_tip">发送失败</span>')
    var failMain = $("#mid_" + messageId );
    failMain.addClass('fail');
    if( !failMain.find(".fail_tip").length ){
        failMain.append( '<span class="fail_tip">发送失败</span>' );
    }
}

var sendMsgCall = function(resp){
    console.log("sendMsgCall", resp);
    if(resp.sendStatus == 0){
        switch(resp.data[0].type){
            case 'text':
                $("#mid_" + resp.data[0].messageId).removeClass("wait");
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
                $("#mid_" + resp.data[0].messageId).find('p').html(data.data[0].msg)
                break;
            default:
                break;
        }
    } else {
        sendFail(resp.messageId)
    }

};

var send = function(msg, groupId){
    console.log("group send", msg);
    if(!msg) return;
    var data = {
        type: 'text'
        , messageId : (new Date()).getTime()
        , from: fml.vars.im.fromid
        , group_id : groupId
        , source : fml.vars.im.source
        , text : msg
        , channel_id: 2
    }
    if(data.type == 'text'){
        data.text = htmlFilter.filterHtmlToText(data.text) || '';
    }
    sendMsg(data, sendMsgCall);

    var options = {
        who: 'd_m',
        type: 'text',
        send: 1,
        messageId: data.messageId,
        content: data.text,
        ctime: (new Date()).getT(),
        group_id: groupId,
        isHistory: 0,
        chatfrom: fml.vars.im.head,
        avatar: fml.vars.im.head,
        msgStyle : ''
    };
    //add(options);

    var $box = $(shareTmp("higo_dialog_item", options));
    var $dialog = $(".im_mainitem[gid='" + groupId + "']").find(".im_dialog")

    $box.appendTo($dialog);

    intoView($box, $dialog);
};

var sendMsg = function(data, callback){
    $.post('/www/aj/publish', data, function(res){
        if(callback) callback(res)
    }, 'json');
};

var receiveMsg = function(data){
    console.log("group receiveMsg data", data);
    if(!data) return;
    var options = {
        who: 'd_u',
        type: data.type,
        send: 0,
        messageId: data.messageId,
        content: data.msg,
        ctime: data.ctime,
        group_id: data.group_id,
        isHistory: 0,
        avatar: "http://d21.higo.res.meilishuo.net/higo/orig/2015-04-28/d8f9e339d1edb5ff2b894cf91d786e61.png"
    };
    Api({
        url: Config.url+"/account/GetHigoUserInfoByMlsUserIds",
        params: {mls_user_ids: data.chatfrom},
        success: function(res){
            console.log("receiveMsg GetHigoUserInfoByMlsUserIds", res);
            if(res.data && res.data.map && res.data.map[0] && res.data.map[0].avatar){
                options.avatar = res.data.map[0].avatar ;
            }
            var $box = add(options , data.ext );
            //add(options , data.ext );
            //var $box = $('#mid_'+messageId);

            if($box && $box.length){
                intoView($box, $box.parents(".im_dialog"));
            }
            unreadNumList(data);
        },
        error: function(){}
    });
};

var unreadNumList = function(data){
    var groupId = data.group_id;
    if(data.group_id == parseInt($("#list_group").children(".act").attr("gid"), 10)){
        return ;
    }
    groupListObj[groupId].num += 1;
    var num = groupListObj[groupId].num;
    groupListObj[groupId].groupList.find(".num").css({
        display: "block"
    }).html(num > 99 ? "99+" : num);
    freshTotalNum();
};

var emptyUnreadNum = function(groupId){
    groupListObj[groupId].num = 0;
    groupListObj[groupId].groupList.find(".num").css({
        display: "none"
    }).empty();
    freshTotalNum();
};

var freshTotalNum = function(){
    var totalNum = 0;
    for(var key in groupListObj){
        totalNum += groupListObj[key].num;
    }
    if(totalNum == 0){
        $(".tab_group").find(".unread_tip").css({
            display: "none"
        }).empty();
    } else {
        $(".tab_group").find(".unread_tip").css({
            display: "block"
        }).html(totalNum > 99 ? "99+" : totalNum);
    }

};

var add = function(options , ext ){
    console.log('groupObj add options', options);
    var defaults = {
        send : 1
        , name : Meilishuo.config.nickname
        , avatar : fml.vars.im.head
        , who : 'd_m'
        , messageId : (new Date()).valueOf()
        , chatfrom : 0
        , ctime : (new Date()).getT()
        , msgStyle : ''
    };
    var opts = $.extend({}, defaults, options);
        uploadPic.bind(groupListObj[ opts.group_id].mainBox, message.send, groupSocket)

        pastePic.bind({
            //'behind' : '/imageupload/pic_upload'
            'behind' : '/higo/imageupload?token='+co.im_id
            , 'input' : groupListObj[ opts.group_id].mainBox.find('.im_inputbox_input')
            , 'success' : function(data,$obj){
                if (typeof data.code != 'number') {
                    var $tmp = $(shareTmp('im_inputbox_picbox_item', data))
                    $tmp
                        .children('a')
                        .append($obj)

                    $tmp.prependTo(this.input.parent().children('.im_inputbox_picbox'))

                } else {
                    new alert({content:data.msg, width:370});
                    $obj.remove()
                    groupListObj[ opts.group_id].upLoadPicNum--
                    if(groupListObj[ opts.group_id].upLoadPicNum == 0)
                        this.input.parent().removeClass('havePic')
                }
            }
            , 'onStart' : function(cbk, inp){
                if(groupListObj[ opts.group_id].upLoadPicNum >= 5){
                    if(!fml.vars.saveItem)
                        new alert({content:'一次最多发送5张图片噢', width:370})

                    $(inp).remove()

                }else{
                    if(!groupListObj[ opts.group_id].upLoadPicNum){
                        groupListObj[ opts.group_id].upLoadPicNum = 1
                        this.input.parent().addClass('havePic')
                    }else{
                        groupListObj[ opts.group_id].upLoadPicNum++
                    }

                    cbk()
                }
            }
        })

    if(opts.type == 'text'){
        var patt = new RegExp(strRegex);
        var result = patt.exec(opts.content);
        if(result) {
            result = result[0];
            var link = "<a href='" + result + "' target='_blank'>" + result + "</a>";
            opts.content = opts.content.replace(patt, function(a, b){
                return '<a href="'+(b ? "" : "http://") + a +'" target="_blank">'+ a +'</a>';
            });
            console.log(result, link, opts.content);
        }
    }
    var $item = $(shareTmp("higo_dialog_item", opts));
    switch(opts.type){
        case 'text':
            //var $item = $(shareTmp("higo_dialog_item", opts));
            if(opts.isHistory){
                groupListObj[opts.group_id].mainBox.find(".historyBtn").after($item);
            } else {
                groupListObj[opts.group_id].mainBox.find(".im_dialog").append($item);
            }
            return $item;
            break;
        case 'higo_goods':
        case 'higo_goodstag':
            console.log(opts.type);
            //var $item = $(shareTmp("higo_dialog_item", opts));
            Api({
                url: urls['higo_goods'],
                params: {
                    goods_id: ext.goodsId || ext.higo_goodstag
                },
                success: function(resp){
                    console.log('success', resp);
                    var img = new Image();
                    img.src = resp.data[0]['goods_image'];
                    if(img.complete) {
                        var $goodsPanel = shareTmp('higo_goods_panel', resp.data[0]);
                        var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                        $item.find(".bubble p").html($goodsPanel);
                        if(opts.isHistory){
                            $dialog.find(".historyBtn").after($item);
                        } else {
                            $dialog.append($item);
                        }
                        intoView($item, $dialog);
                    } else {
                        img.onload = function () {
                            var $goodsPanel = shareTmp('higo_goods_panel', resp.data[0]);
                            var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                            $item.find(".bubble p").html($goodsPanel);
                            if(opts.isHistory){
                                $dialog.find(".historyBtn").after($item);
                            } else {
                                $dialog.append($item);
                            }
                            intoView($goodsPanel, $dialog);
                            img.onload = null;
                        };
                    };
                }
            });
            break;
        case 'higo_coupon':
            console.log(opts.type);
            Api({
                url: urls['higo_coupon'],
                params: {
                    shop_coupon_id: ext.couponId
                },
                success: function(resp){
                    console.log('success', resp);
                    var $couponPanel = shareTmp('higo_coupon_panel', resp.data);
                    var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                    $item.find(".higoCouponPanel p").html($couponPanel);
                    if(opts.isHistory){
                        $dialog.find(".historyBtn").after($item);
                    } else {
                        $dialog.append($item);
                    }
                    $couponPanel.addClass("higoCouponPanel").removeClass('bubble');
                    intoView($couponPanel, $dialog);
                }
            });
            break;
        case 'higo_share':
            console.log(opts.type);
            Api({
                url: urls['higo_share'],
                params: {
                    show_id: ext.shareId
                },
                success: function(resp){
                    console.log('success', resp);
                    var img = new Image();
                    img.src = resp.data[0]['share_pic'];
                    if(img.complete) {
                        var $sharePanel = shareTmp('higo_share_panel', resp.data[0]);
                        var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                        $item.find(".bubble p").html($sharePanel);
                        if(opts.isHistory){
                            $dialog.find(".historyBtn").after($item);
                        } else {
                            $dialog.append($item);
                        }
                        intoView($sharePanel, $dialog);
                    } else {
                        img.onload = function () {
                            var $sharePanel = shareTmp('higo_share_panel', resp.data[0]);
                            var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                            $item.find(".bubble p").html($sharePanel);
                            if(opts.isHistory){
                                $dialog.find(".historyBtn").after($item);
                            } else {
                                $dialog.append($item);
                            }
                            intoView($sharePanel, $dialog);
                            img.onload = null;
                        };
                    };
                }
            });
            break;
        case 'higo_order':
            console.log(opts.type);
            Api({
                url: urls['higo_order'],
                params: {
                    order_id: ext.orderId
                },
                success: function(resp){
                    console.log('success', resp);
                }
            });
            break;
        case 'higo_img':
            console.log(opts.type);
            var imgId = ext.imgId;
            Api({
                url: urls['higo_img'],
                params: {
                    image_id: imgId
                },
                success: function(resp){
                    console.log('success', resp);
                    opts.content = {};
                    opts.content.pic_url = resp.data[0].image_thumbnail;
                    opts.content.o_pic_url = resp.data[0].image_thumbnail;
                    var $img = $(shareTmp("higo_dialog_item", opts));
                    var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
                    if(opts.isHistory){
                        $dialog.find(".historyBtn").after($img);
                    } else {
                        $dialog.append($img);
                    }
                    intoView($img, $dialog);
                }
            });
            break;
        default :
            break;
    }
    var $dialog = groupListObj[opts.group_id].mainBox.find(".im_dialog");
    intoView($item, $dialog);
    return $item;
};

exports.init = init;
exports.create = create;
exports.send = send;
exports.receiveMsg = receiveMsg;
exports.history = history;
exports.changeUserPush = changeUserPush;