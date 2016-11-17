fml.define('app/referrer' , ['component/urlHandle','component/storage','jquery'] , function(require , exports){
	var $ = require('jquery');
	var queryString = require('component/urlHandle');
	var storage = require('component/storage');
	var session = '';
	var checkRefer = function(){
		var refer = document.referrer;
		var query = queryString.getUrl(refer);
		var rootDomain = query.rootDomain;
		var hostDomain = query.hostDomain;
		if(rootDomain == undefined || hostDomain == undefined){
		}else if(rootDomain == 'meilishuo.com'){
		}else if(rootDomain == 'sina.com' || rootDomain == 'weibo.com'){
			storage.setCookie('MEILISHUO_REFER' , 'weibo');
		}else if(hostDomain == 'c.gdt.qq.com' || hostDomain == 'cn.qzs.qq.com' || query.qz_gdt || rootDomain == 'qq.com' || rootDomain == 'pengyou.com' || rootDomain == 'gtimg.cn'){
			storage.setCookie('MEILISHUO_REFER' , 'gdt.qq');
		}else if(rootDomain == 'renren.com'){
			storage.setCookie('MEILISHUO_REFER' , 'renren');
		}else if(query.frm == 'gad'){
			storage.setCookie('MEILISHUO_REFER' , 'others');	
		}
		session = storage.getCookie('MEILISHUO_REFER');
	}
	checkRefer();
	return session;
});
