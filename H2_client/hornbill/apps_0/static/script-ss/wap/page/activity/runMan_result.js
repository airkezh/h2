/*common*/
var $ = require('wap/zepto')
    ,WXShare = require('wx/share')
    ,WXSign = require('wx/sign')
    ,tracking = require('wap/app/tracking');

//分享
var shareText =  '一加入跑男伐木累就擦出如此耀眼的火花！明天的头条被我承包了!';
var shareImg =  'http://d03.res.meilishuo.net/pic/_o/62/b5/5f58baf79bd5e53342b3554a1493_200_200.cf.jpg';
var shareTitle =  "【本期跑男剧透】"+fml.vars.name1+'和'+fml.vars.runner+fml.vars.scene+fml.vars.event1;
var shareUrl =  window.location.href;
if(Meilishuo.config.os.weixinBrowser){
	//初始化加载分享的资源。
        WXSign();
        var shareData = {
            'desc': shareText,
            'imgUrl': shareImg,
            'title': shareTitle,
            'link': shareUrl+ '&gid='+fml.vars.gid+'&times='+fml.vars.times
        };
        WXShare.bind(shareData);
}
 //app分享   
if(Meilishuo.config.os.mlsApp){
    var schemeJsonWx = {
            type : 'weixin' , 
            message_type : 'webpage' ,
            title : shareTitle,
            text : shareText,
            url : shareUrl + '&gid='+fml.vars.gid+'&times='+fml.vars.times+'&r=_page_code=game_runman_end:_pos_name=button_share:plat=mlsapp:friend',
            thumb_url : shareImg
        }
        ,schemeLinkWx = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));
        $('#shareBut_wx').attr('href',schemeLinkWx);
    var schemeJsonPyq = {
            type : 'weixin_timeline' , 
            message_type : 'webpage' ,
            title : shareTitle,
            text : shareText,
            url : shareUrl+'&gid='+fml.vars.gid+'&times='+fml.vars.times+'&r=_page_code=game_runman_end:_pos_name=button_share:plat=mlsapp:circle',
            thumb_url : shareImg
        }
        ,schemeLinkPyq = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonPyq));
    $('#shareBut_pyq').attr('href',schemeLinkPyq);  
    $(".shareBut_close").on("click",function(){
        $("#mypopbox").hide();
    })
};
//埋点
$(".restartBtn").on("click",function(event){
     tracking.cr('page_element',{action:'click',r:'_page_code=game_runman_end:_pos_name=button_play_again'});
     event.preventDefault();
     window.location.href = '/activity/runMan/index/';
});
$(".restartBtnC").on("click",function(){
     tracking.cr('page_element',{action:'click',r:'_page_code=game_runman_end:_pos_name=button_play_too'});
});
/*点击以后分享*/
$('.shareBtn').on('click',function(){
    if(Meilishuo.config.os.mlsApp){
        tracking.cr('page_element',{action:'click',r:'_page_code=game_runman_end:_pos_name=button_share:plat=app:star_name='+fml.vars.nameId+':position='+fml.vars.scenesId+':text='+fml.vars.eventId});
        $(".mypopbox").show();
        $("#dialog_appshare").show();
    }
    if(Meilishuo.config.os.weixinBrowser){  
        tracking.cr('page_element',{action:'click',r:'_page_code=game_runman_end:_pos_name=button_share:plat=weixin:star_name='+fml.vars.nameId+':position='+fml.vars.scenesId+':text='+fml.vars.eventId});
        $(".mypopbox").show();
        $("#dialog_wxshareguide").show().on("click",function(){
        $("#mypopbox").hide();
        });
    }
});

