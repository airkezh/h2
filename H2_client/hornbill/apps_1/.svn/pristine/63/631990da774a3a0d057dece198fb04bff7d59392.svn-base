/*common*/	
require('m/zepto')
require('m/zepto/touch')
require('wap/app/openApp')

var open_client_goto_download = function(btn) {
	open_client_default(btn)
	goto_downLoad(btn)	
};

//下载
var goto_downLoad = function(btn) {
    var storage = require('component/iStorage')
    var channel = storage.getCookie('channel_mark')

	var appNtURL = btn.attr('red_url')
    
    if (channel && (appNtURL.indexOf('app.qq.com') == -1)){
        var param = appNtURL.indexOf('?') > 0 ? "&":"?"
        appNtURL += param + "channel=" + channel;
    } 

    var testOpen = setTimeout(function() {
        window.location.href = appNtURL || '/goto/download/';
    }, 2000);
    var testHide = function(){
        if(document.webkitHidden)
            clearTimeout(testOpen)
        else
            setTimeout(arguments.callee, 100)
    }
    testHide()
};

//唤起
var open_client_default = function(btn) {
    var storage = require('component/iStorage')
    var channel = storage.getCookie('channel_mark')
	var appURl = btn.attr('href')
    if(channel && channel == '40106') return
	if(Meilishuo.config.os.ios){
        var storage = require('component/iStorage')
        if(navigator.userAgent.indexOf('MicroMessenger') != -1){
            openApp(appURl)
        } else {
            if(!storage.getCookie('open_client')){
                window.location.href = appURl
                setTimeout(function(){ window.location.reload() }, 100)
                storage.setCookie('open_client' , new Date().getTime() ,{'duration' : 5});
            }
        }
    } else {
        var _iframe = $('<iframe src="' + appURl + '" width="0" height="0" frameborder="0" style="display:none;"></iframe>')
        btn.after(_iframe)
    }
};

var bind = function(){
    $('.openBtn').on('tap', function(event){
		event.preventDefault();
        open_client($(this))
    })
};

/*
5.0版本以上支持微信或微博中唤起或是下载客户端（支持Android,不支持ios）

    1.appinfo 非微信客户端接口
    2.openapp 微信客户端接口
    
    appinfo不支持参数
    openapp支持对应页面(两种格式的参数，客户端或WAP)
    1. scheme=meilishuo://onekeyregister.meilishuo
    2. scheme=http://m.meilishuo.com

*/
var openApp_gotoDownload = function(btn,cb){
    var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
        , weiboBrowser = navigator.userAgent.indexOf('Weibo')
        , storage = require('component/iStorage')
        , channel = storage.getCookie('channel_mark')
        , appURl = btn.attr('href')
        , encodeAppURl = encodeURIComponent(appURl)
        , downloadURl = btn.attr('red_url')

    if(channel && channel == '40106') return

    if (channel && (downloadURl.indexOf('app.qq.com') == -1)){
        var param = downloadURl.indexOf('?') > 0 ? "&":"?"
        downloadURl += param + "channel=" + channel;
    } 
    
    function getData(port,errorfn){
        var url = weixinBrowser != -1 || weiboBrowser != -1 ? 'http://127.0.0.1:'+ port +'/openapp?scheme=' + encodeAppURl : 'http://127.0.0.1:'+ port +'/appinfo'
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            timeout: 3000,
            success: function (data) {
                var is_mls = data.version;
                if(is_mls != 'undefined' && weixinBrowser == -1) {
                    window.location.href = appURl
                }
            },
            error: function(){
                errorfn && errorfn();
            }
        });
    }

    getData(10006,function(){
        getData(10007,function(){
            btn.on('click',function(){
               window.location.href = weixinBrowser != -1 ? 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo' : downloadURl
               
            })
            //解决浏览器里面要点击两次才下载
            cb && cb();
        })
    })

};

//因IOS不支持，故判断系统
exports.open = Meilishuo.config.os.android ? openApp_gotoDownload : open_client_goto_download 

exports.opencd = Meilishuo.config.os.android ? openApp_gotoDownload : open_client_default

exports.bind = bind;

