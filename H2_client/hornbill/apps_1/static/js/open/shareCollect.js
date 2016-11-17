var appid = Meilishuo.config.appId;
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
                            "appid": typeof customAppId != 'undefined' ? customAppId : appid,
                            "img_url": imgUrl,
                            "img_width": "640",
                            "img_height": "640",
                            "link": lineLink,
                            "desc": descContent,
                            "title": shareTitle
                            }, function(res) {
                            	// alert('send_msg: ' + res.err_msg);
                            })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
                            "img_url": imgUrl,
                            "img_width": "640",
                            "img_height": "640",
                            "link": lineLink,
                            "desc": descContent,
                            "title": (window.shareTimelineText?shareTimelineText:shareTitle)
                            }, function(res) {
                            	// alert('timeline: ' + res.err_msg);
                            });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
                            "content": descContent,
                            "url": lineLink,
                            }, function(res) {
                            	// alert('weibo: ' + res.err_msg);
                            });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
var WeixinListenerInit = function () {
    // 显示菜单
    WeixinJSBridge.invoke("showOptionMenu");

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
        });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
        });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
        });
};

if (window.WeixinJSBridge) {
    WeixinListenerInit();
} else {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinListenerInit();
    }, false);
}