/*common*/

var $ = require('wap/zepto')
    ,WXShare = require('wx/share')
    ,WXSign = require('wx/sign')
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
    //埋点
    tracking.cr('activity_test',{action:'share',activity_id:fml.vars.testId,area:'wechat'});
});
$('.shareImg').on('click',function(){
	$('.shareImg').hide();
})
//中间banner埋点
$('.bannerLink').on( 'click',function(){
    window.location.href = window.__get_r( fml.vars.bannerLink , $(this).data('xr')+
    ':frm=center' );
})
//底层banner埋点
$('.fixedLink').on( 'click',function(){
    window.location.href = window.__get_r( fml.vars.fixedLink , $(this).data('xr')+ ':frm=bottom' );
})
//单品埋点
$('.goodsLink').on( 'click' , function(){
    var ahref = $(this).data('ahref')
    window.location.href = window.__get_r( ahref , $('.recommentInfo').data('xr') );
})
