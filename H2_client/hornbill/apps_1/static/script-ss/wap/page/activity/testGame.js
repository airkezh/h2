/*common*/
var $=require('wap/zepto'),
Alert = require('wap/ui/alert');
function alertCon(msg){
    var a = new Alert({
        content : msg
    });
};
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
var shareUrl =  window.location.href;
if(fml.vars.isWx){
	//初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
    shareData = {
        'desc' : shareText ,
        'imgUrl' : shareImg ,
        'title' : shareTitle ,
        'url' : shareUrl
    };
	shareWX.bind(shareData);
}
$('.subBtn').on('click',function(e){
	var test = $('.inputName').val().trim();
	if( test == ''){
		alertCon( fml.vars.alertText );
        e.preventDefault();
	}
}) 