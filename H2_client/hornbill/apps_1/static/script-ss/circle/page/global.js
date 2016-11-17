/*common*/
require('m/zepto/touch')
;(function(){
	var btn = $('#backBtn')

	var t = setTimeout(function(){
		$('.icon-home').removeClass('eventnone')
		t = null	
	}, 300)

	var history = window.history;
	if(history && history.length > 1){
		btn.show()
		btn.on('tap', function(){
			if($('#openClientDanbao').length > 0){
				if(document.referrer == ''){
					history.go(-2)
				}else{
					history.back()
				}
			}else{
				history.back()
			}
		})
	}
})()