/*common*/	
require('wap/zepto/fastclick')
var signWX = require('wx/sign'), 
	shareWX = require('wx/share'),
	tracking = require('wap/app/tracking'),
	openApp = require('wap/app/openApp');
	var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger');
	var mlsApp = Meilishuo.config.os.mlsApp;

	$('.mark-share').on('click',function(){
		tracking.cr('mark_share');
		if(weixinBrowser != -1){
			$('.popwin').show();
		}else{
			$('.appshare').show();
		}
		return false;
	});
	$('.popwin').on('click',function(){
		$(this).hide();
	});

	$(document).click(function(e){
		var ele = $(e.target).closest('.appshare');
		if(!ele.length){
			$('.appshare').hide();
		}
	});

	$('.go-link').on('click',function(){
		var urlLink = 'http://m.meilishuo.com/wx/tranCircle/?cid=9597&hdtrc=luhan0615_circleTopBanner';
		mlsApp ? window.location.href = urlLink : openApp(urlLink);
	});

	signWX();
	shareWX.bind({
		'desc':'我是美丽说认证的资深'+fml.vars.desc+'！快来测试，和鹿晗一起开启你最时髦的热力summer吧！',
		'imgUrl':'http://d01.res.meilishuo.net/pic/_o/ed/d4/eaa1c2ec43ec14714f2ff6d9fac7_100_100.cg.jpg',
		'title': '暑假约男神 霸占时尚圈',
		'link': 'http://m.meilishuo.com/activity/summerFuide/home/'
	});

