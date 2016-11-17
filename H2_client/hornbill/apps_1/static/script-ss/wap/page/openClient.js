fml.use(['wap/app/openClient'] , function(){
	this.openClient();
});
fml.define('wap/page/openClient' , ['wap/zepto/touch'], function(){
	//download下的share页面
    $('#downloadShare').on('tap',function(){
    	//axis统计代码
		_fxcmd.push(['trackEvent','event','download','label','0']);

    	var appUrl = $(this).attr('appUrl')
    	window.location.href = appUrl
    })
});
