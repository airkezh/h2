fml.define('wap/app/goBack', ['wap/zepto', 'wap/zepto/touch'] , function(require , exports){
	var btn = $('#backBtn')

	var t = setTimeout(function(){
		$('.icon-home').removeClass('eventnone')	
		t = null	
	}, 300)

	return function(){
		var history = window.history;
		if(history && history.length > 1){
			btn.show()
			btn.on('tap', function(){
				history.back();	
			})
		}
	};
});
