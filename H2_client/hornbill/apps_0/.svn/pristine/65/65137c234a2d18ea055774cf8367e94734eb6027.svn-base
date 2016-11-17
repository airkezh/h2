/*common*/
var shareTmp = require('component/shareTmp')
    , emo2img = require('app/emoji').emo2img
    , userStatus = require('app/im/userStatus')
    , sendObj = {}
    , htmlFilter = require('component/filterhtml')
    , message = require('app/im/messageObj')
    , pastePic = require('ui/pastePic')
    , uploadPic = require('app/im/uploadPic')
    , intoView = require('app/im/intoView');


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
var userSocket;
var addUserObj = function(data , socket){
    console.log('addUserObj data', data);
    userSocket = socket;
    Api({
        url: "http://v.higo.meilishuo.com/account/GetHigoUserInfoByMlsUserIds",
        params: {mls_user_ids: data.data[0].chatfrom},
        success: function(resp){
            console.log("addUserObj resp", resp);
            if( resp.data.map[0].avatar == "" ){
                resp.data.map[0].avatar = 'http://d21.higo.res.meilishuo.net/higo/orig/2015-04-28/d8f9e339d1edb5ff2b894cf91d786e61.png';
            }
            var value = {
                id: data.data[0].chatfrom,
                user_header: resp.data.map[0].avatar ,
                user_name: resp.data.map[0].nick_name
            };
            var main = {
                utype: '',
                uid: data.data[0].chatfrom,
                status: 1,
                avatar_b: resp.data.map[0].avatar,
                nickname: resp.data.map[0].nick_name
            };
            userListObj[data.data[0].chatfrom] = {
                userList : $(shareTmp('im_user_item', value))
                , mainBox : $(shareTmp('im_main_item', {v:main}))
                , name : resp.data.map[0].nick_name
                , avatar : resp.data.map[0].avatar
                , history : 0
                , status : 0
                , utype : ''
                , num : 0
            };

            $("#list_now").prepend(userListObj[data.data[0].chatfrom].userList);
            $("#im_main").append(userListObj[data.data[0].chatfrom].mainBox);

            uploadPic.bind(userListObj[data.data[0].chatfrom].mainBox, message.send, userSocket)

            pastePic.bind({
                'behind' : '/imageupload/pic_upload'    
                , 'input' : userListObj[data.data[0].chatfrom].mainBox.find('.im_inputbox_input')  
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
                        userListObj[data.data[0].chatfrom].upLoadPicNum--
                        if(userListObj[data.data[0].chatfrom].upLoadPicNum == 0)
                            this.input.parent().removeClass('havePic')
                    }
                }
                , 'onStart' : function(cbk, inp){
                    if(userListObj[data.data[0].chatfrom].upLoadPicNum >= 5){
                        if(!fml.vars.saveItem)
                            new alert({content:'一次最多发送5张图片噢', width:370})

                        $(inp).remove()

                    }else{
                        if(!userListObj[data.data[0].chatfrom].upLoadPicNum){
                            userListObj[data.data[0].chatfrom].upLoadPicNum = 1
                            this.input.parent().addClass('havePic')
                        }else{
                            userListObj[data.data[0].chatfrom].upLoadPicNum++
                        }

                        cbk()
                    }
                }
            })

            unreadNumList(data);
        }
    });
};

var receiveMsg = function(data){
    console.log("receiveMsg",data);
    if(!data) return;
    //var options = {
    //    who: 'd_u',
    //    type: data.data[0].type,
    //    send: 0,
    //    messageId: data.data[0].messageId,
    //    content: data.data[0].msg,
    //    ctime: data.data[0].ctime,
    //    isHistory: 0,
    //    chatfrom: userListObj[data.data[0].chatfrom].avatar
    //};

    //console.log("receiveMsg",data);
    //var $box = message.add({
    //    uid: data.data[0].chatto,
    //    data: data.data
    //});
    //console.log("receiveMsg",data);
    //
    //intoView($box, $box.parents(".im_dialog"));

    unreadNumList(data);
};

var unreadNumList = function(data){
    if(data.data[0].chatfrom == parseInt(fml.vars.im.toid)){
        return;
    } else {
        var toid = data.data[0].chatfrom;
        userListObj[toid].num += 1;
        var num = userListObj[toid].num;
        userListObj[toid].userList.find(".num").html(num).show();
        freshTotalNum();
    }
};

var freshTotalNum = function(){
    var num = 0;
    for(var key in userListObj){
        num += userListObj[key].num;
    }
    if(num == 0){
        $(".tab_now").find(".unread_tip").css({
            display: "none"
        }).empty();
    } else {
        $(".tab_now").find(".unread_tip").css({
            display: "block"
        }).html(num > 99 ? "99+" : num);
    }
};


exports.freshTotalNum = freshTotalNum;
exports.receiveMsg = receiveMsg;
exports.addUserObj = addUserObj;