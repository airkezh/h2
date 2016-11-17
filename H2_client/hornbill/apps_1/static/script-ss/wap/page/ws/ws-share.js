/*common*/
require('wap/zepto');
var ShareTo = require('wap/app/shareTo'),
	Alert = require('wap/ui/alert');

var isWeixin = navigator.userAgent.indexOf('MicroMessenger') > 0 ;

var windowWidth = $(window).width()
    ,windowHeight = $(window).height();
// $('#shareBut').click(function(){
// 	if(isWeixin){   //isWeixin
// 		$('#mypopbox').show();
// 	};

// })

$('#mypopbox').click(function(){
	$(this).hide();
})

