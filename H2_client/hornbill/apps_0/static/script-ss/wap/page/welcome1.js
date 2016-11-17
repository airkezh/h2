fml.define('wap/page/welcome1',['wap/zepto/touch'] ,function(){	
	var down_url = $('.getJson').attr('down_url')
		,weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
		,weiboBrowser = navigator.userAgent.indexOf('Weibo')
	//appinfo 非微信客户端
	//openapp 微信客户端
	/*
		appinfo暂不支持参数
		openapp支持对应页面(两种格式的参数)
		1. scheme=meilishuo://onekeyregister.meilishuo
		2. scheme=http://m.meilishuo.com
	*/
	function getData(port,errorfn){
		$.ajax({
        	url: weixinBrowser != -1 || weiboBrowser != -1 ? 'http://127.0.0.1:'+ port +'/openapp?scheme=meilishuo://open.meilishuo' : 'http://127.0.0.1:'+ port +'/appinfo',
        	dataType: "jsonp",
		    jsonp: "callback",
		    timeout: 3000,
	        success: function (data) {
	            var is_mls = data.version;
	            if(is_mls != 'undefined' && weixinBrowser == -1) {
	            	setTimeout(function(){
	            		window.location.href = 'meilishuo://open.meilishuo'
	            	},1000)
	            }
	        },
	        error: function(){
	       		errorfn && errorfn();
		    }
	    });
	}


		getData(10006,function(){
			getData(10007,function(){
				setTimeout(function(){
	        		window.location.href = weixinBrowser != -1 ? 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo' : down_url
	        	},1000)
			})
		})

});
