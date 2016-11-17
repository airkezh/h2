/*common*/
var $ = require('wap/zepto')
	,Alert = require('wap/ui/alert')
    ,tracking = require('wap/app/tracking');
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
//分享
var shareText =  '一加入跑男伐木累就擦出如此耀眼的火花！明天的头条被我承包了!';
var shareImg =  'http://d03.res.meilishuo.net/pic/_o/62/b5/5f58baf79bd5e53342b3554a1493_200_200.cf.jpg';
var shareTitle =  '如果我参加跑男，我的命运竟是这样！';
var shareUrl =  window.location.protocol+'//'+window.location.host+'/activity/runMan/index/';
if(Meilishuo.config.os.weixinBrowser){
	//初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
    shareData = {
        'desc' : shareText ,
        'imgUrl' : shareImg ,
        'title' : shareTitle ,
        'link' : shareUrl
    };
	shareWX.bind(shareData);
}
function alertCon(msg){
	var a = new Alert({
		content : msg
	});
};
//埋点
$('.name').focus(function (){                
    tracking.cr('page_element',{action:'click',r:'_page_code=game_running_man:_pos_name=textbox'});
});
//判断名字是否符合条件
$('.start').on('click',function(e){
        //app 登录
    if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
            window.location.href = 'meilishuo://login.meilishuo/?json_params=';
            return;
    }
    window.MLS = {
        didLogin : function(){  
            //美丽说app 登录后回调  成功登录后，返回刷新页面。
            window.location.reload();
        }
    }
    $.ajax({
        type:"get",
        url:"/activity/runMan/aj/resultInfo",
        data : {
           name:$('.name').val()
        },
        dataType:'json',
        success : function(res){
            if( res.error_code ==400 ){
                alertCon(res.message);
                e.preventDefault();
                tracking.cr('page_element',{action:'click',r:'_page_code=game_running_man:_pos_name=button:alert=0'});
            } 
            else if(res.error_code==0){
                tracking.cr('page_element',{action:'click',r:'_page_code=game_running_man:_pos_name=button:alert=1'});
                window.location.href = '/activity/runMan/result/?name='+res.data.name +'&nameId='+res.data.nameId+'&scenesId='+res.data.scenesId+'&eventId='+res.data.eventId;
                
            }
        },
        error : function(){   
         alertCon("失败");              
        }

    });
});




