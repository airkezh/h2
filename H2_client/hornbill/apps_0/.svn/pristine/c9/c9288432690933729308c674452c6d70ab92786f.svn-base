fml.define('wap/app/openClient40' , ['wap/jquery.mobile'] , function(require , exports){
	 var open_client = function(btn) {
		var appURl = btn.attr('href')
			,appNtURL = btn.attr('red_url')

		if(Meilishuo.config.os.ios){
			window.location.href = appURl 

		}else if(Meilishuo.config.os.android){
			var _iframe = $('<iframe src="' + appURl + '" width="0" height="0" frameborder="0" style="display:none;"></iframe>')
			btn.after(_iframe)

		}else{
			window.location.href = appURl 

		}
        setTimeout(function() {
            window.location.href = appNtURL || '/goto/download/';

        }, 2000);
    };
	var bind = function(){
        $('.openBtn').on('tap', function(event){
			event.preventDefault();
            open_client($(this))
        })
    };
	exports.open = open_client;
	exports.bind = bind;
});
