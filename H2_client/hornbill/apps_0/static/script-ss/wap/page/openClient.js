fml.use(['wap/app/openClient'] , function(){
	this.openClient();
});
fml.define('wap/page/openClient' , ['wap/zepto/touch'], function(){
	//download下的share页面
    $('#downloadShare').on('tap',function(){
    	//axis统计代码
    	var _fxcmd=_fxcmd||[];
			_fxcmd.sid='f13cc91387963845156f4c204bc63e9a';
			_fxcmd.trackAll= false;
			(function () {
			   var _pzfx=document['createElement']('script');
			   _pzfx.type='text/javascript';
			   _pzfx.async=true;
			   _pzfx.src='//static.w3t.cn/fx/1/1/fx.js';
			  var sc=document.getElementsByTagName('script')[0];
			  sc.parentNode.insertBefore(_pzfx,sc);
			  })();
			  
		_fxcmd.push(['trackEvent','event','download','label','0']);

    	var appUrl = $(this).attr('appUrl')
    	window.location.href = appUrl
    })
});
