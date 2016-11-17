/*common*/

var $ = require('wap/zepto');
var signWX = require('wx/sign');
var	shareWX = require('wx/share');

var weixinBrowser = (navigator.userAgent.indexOf('MicroMessenger') != -1);

var resultShare = fml.vars.resultShare;

function init() {

	$('.ball').click(function(){
		var link = $(this).data('link');
		if(link){
			link = '/goto/open/?appUrl=' + encodeURIComponent(link) + '&bg=' + encodeURIComponent(link);
			location.href = link;
		}
	});

	$('.sharebtn').click(function(){
		if(weixinBrowser){
			$('.wxshare').show();
		}else{
			$('.appshare').show();
		}
		return false;
	});

	$('.wxshare').click(function(){
		$(this).hide();
	});

	$(document).click(function(e){
		var ele = $(e.target).closest('.appshare');
		if(!ele.length){
			$('.appshare').hide();
		}
	});

	signWX(); 
	shareWX.bind({
	    'desc':resultShare.desc,
	    'imgUrl':resultShare.imgUrl,
	    'title':resultShare.title,
	    'link': resultShare.link
	});
}

init();


