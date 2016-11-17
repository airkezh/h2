fml.define('wap/app/openClient' , ['wap/jquery.mobile'] , function(require , exports){
	 var ua = window.navigator.userAgent
	 var isIphone = /iPhone/.test(ua)
		,isAndroid = /Android/.test(ua)

	 var open_client = function(evt,btn) {
        evt.preventDefault();
		var appURl = btn.attr('href')
			,appNtURL = btn.attr('red_url')

		if (isAndroid){
			var _iframe = $('<iframe src="' + appURl + '" width="0" height="0" frameborder="0" style="display:none;"></iframe>')
		//	var _iframe = $('<iframe src="/download/page/' + encodeURIComponent(appURl) + '" width="0" height="0" frameborder="0" style="display:none;"></iframe>')
			btn.after(_iframe)
		}else{
			window.location.href = appURl 
		}
        setTimeout(function() {
            window.location.href = appNtURL || '/goto/download/';
        }, 2000);
    };
    return function(){
        $('.openBtn,#openBtn').on('tap', function(evt){
            open_client(evt,$(this))
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
        })
    };
});
