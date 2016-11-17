/*common*/
var init = function(opt,cbk,cbkErr){
    opt = {
        'img_url' : opt.img_url || '',
        'link' : opt.link || 'm.meilishuo.com/wx/',
        'desc' : opt.desc || '精选款式，实在的价格，供你选择',
        'title' : opt.title || '美丽说 购时尚',
        'appid' : opt.appid || Meilishuo.config.appId,
        'img_width' : '200',
        'img_height': '200',
        'content' : opt.desc || '精选款式，实在的价格，供你选择',
        'url' : opt.link || 'm.meilishuo.com/wx/'
    }
    var send_intergal = cbk || function(){
    }
    var send_err = cbkErr || function(){
    }
    var sendCbk = function(resp){
        switch (resp.err_msg) {
        // send_app_msg:cancel 用户取消
        case 'send_app_msg:cancel':
            send_err();
        break;
        // send_app_msg:fail　发送失败
        case 'send_app_msg:fail':
            send_err();
        break;
        // send_app_msg:confirm 发送成功
        case 'send_app_msg:confirm':
        case 'send_app_msg:ok':
            send_intergal();
        break;
        }
    }
    function shareMsg(opt) {
        opt = fml.vars.wxopt || opt;
        WeixinJSBridge.invoke('sendAppMessage',opt,function(data){
            sendCbk(data);
        })
    }
    function shareQuan(opt) {
        opt = fml.vars.wxopt || opt;
        WeixinJSBridge.invoke('shareTimeline',opt,function(data){
            sendCbk(data);
        });
    }
    function shareWeibo(opt) {
        opt = fml.vars.wxopt || opt;
        WeixinJSBridge.invoke('shareWeibo',opt,function(data){
            sendCbk(data);
        });
    }
    var WeixinListenerInit = function(){
         // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            shareMsg(opt);
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareQuan(opt);
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo(opt);
        });
    }
    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    if (window.WeixinJSBridge) {
        WeixinListenerInit();
    } else {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinListenerInit();
        }, false);
    }
}
exports.init = init;