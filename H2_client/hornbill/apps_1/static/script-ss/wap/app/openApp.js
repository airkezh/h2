/*common*/
var Confirm = require("wap/ui/confirm");
var a = function(msg, callback) {
    return new Confirm({
        content: msg,
        onSure: function() {
            callback && callback();
        }
    });
};
/**
 * 微信或者浏览器直接打开客户端APP
 * @author 徐德明
 * @param {url} string 打开APP的页面
 * @param {daownUrl} string 下载APP的链接，不是必须
 * @param {text} string 提示下载的文案，不是必须
 * @param {isPop} boolean 是否跳过弹层，默认弹，不是必须
 * @param {source} string 页面来源，不是必须 // add huangke
 */
function Open(url, daownUrl, text, isPop, source) {
    this.url = url;
    this.daownUrl = daownUrl;
    this.text = text;
    this.isPop = isPop;
    this.source = source;
    //如果不是在客户端APP里面打开页面才执行
    if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
        this.init();
    }
}
Open.prototype = {
    constructor: Open,
    //判断打开的是APP里面的WAP还是native
    isWap: function() {
        var self = this;
        return self.url.match(/meilishuo:\/\//g) ? false : true;
    },
    //判断是否微信浏览器
    isWeixin: function() {
        var ua = window.navigator.userAgent;
        return (ua.indexOf("MicroMessenger") != -1) ? true : false;
    },
    //监听 WeixinJSBridgeReady 事件
    JSBridgeListen: function(callback) {
        var self = this;
        if (window.WeixinJSBridge) {
            callback(self);
        } else {
            document.addEventListener("WeixinJSBridgeReady", function() {
                callback(self)
            }, false);
        }
    },
    // bind
    bind: function(self) {
        var obj = event && event.target;
        var isWap = self.isWap();
        WeixinJSBridge.invoke('getInstallState', {
            "packageName": "com.meilishuo",
            "packageUrl": "meilishuo://",
        }, function(res) {
            var status = res.err_msg.split(":")[1];
            var str = self.daownUrl ? self.daownUrl : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo';
            //没安装APP时
            if (!status.match(/yes/g)) {
                // 兼容会员中心页面（微信二维码扫描会员中心wap页面时跳下载页面）add huangke
                if (self.source && (self.source == 'member')) {
                    location.href = 'http://m.hk.fedevot.meilishuo.com/member/download/';
                } else {
                    if (!self.isPop) {
                        a(self.text ? self.text : '亲，请先下载美丽说客户端~', function() {
                            location.href = str;
                        });
                    } else {
                        location.href = str;
                    }
                }
            } else {
                if (isWap) {
                    var urlObj = {
                        url: self.url,
                        inApp: '1',
                        require_app_info: '1'
                    }
                    var u = encodeURIComponent(JSON.stringify(urlObj));
                    location.href = "meilishuo://openURL.meilishuo?json_params=" + u;
                } else {
                    location.href = self.url
                }
            }
        });
    },
    //init
    init: function() {
        var self = this;
        var obj = event && event.target;
        var isWap = self.isWap();
        //不是微信打开时
        if (!self.isWeixin()) {
            var label = document.createElement("label");
            obj && obj.id && label.setAttribute("id", obj.id);
            obj && obj.className && label.setAttribute("class", obj.className);
            obj && (label.innerHTML = obj.innerHTML);
            // 防止动态插入的元素
            window.onload = function() {
                obj && document.body.insertBefore(label, obj);
                obj && document.body.removeChild(obj);
            }
            $(label).off('click').on('click', function() {
                if (isWap) {
                    location.href = "http://m.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(self.url);
                } else {
                    location.href = "http://m.meilishuo.com/goto/open/?url=" + encodeURIComponent(self.url);
                }
            })
            $(label).click();
            //解决浏览器里面要点击两次才执行
            // $(label).click();
        } else {
            self.JSBridgeListen(self.bind);
        }
    }
}
return function(url, daownUrl, text, isPop, source) {
    return new Open(url, daownUrl, text, isPop, source);
}