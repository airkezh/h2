/*common*/

var $ = require('wap/zepto')
    ,WXShare = require('wx/share')
    ,WXSign = require('wx/sign')
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
var shareText =  fml.vars.shareData.desc;
var shareImg = fml.vars.shareData.imgUrl;
var shareTitle =  fml.vars.shareData.title;
if(Meilishuo.config.os.weixinBrowser){
	//初始化加载分享的资源。
    WXSign();
        var shareData = {
            'desc': shareText,
            'imgUrl': shareImg,
            'title': shareTitle,
            'link': window.location.protocol +"//"+window.location.host+'/activity/testGame/index/'+fml.vars.testId
        };
        WXShare.bind(shareData);
}
$('.shareBtn').on('click',function(){
	$('.shareImg').show();
});
$('.shareImg').on('click',function(){
	$('.shareImg').hide();
})