fml.define('wap/app/doota/addr_default' , ['wap/zepto/touch'] , function(require , exports){
	return function(){
		var frmConfirm = /order\/init/.test(document.referrer)
			, history = window.history
			, $addrItem = $('.addrShow .adrl_list')

		// if(!frmConfirm)
			// $('.addrShow .adrl_new').show()

		$addrItem.on('tap', function(){
			var $this = $(this)
			$addrItem.attr('is_default', '0')
			$this.attr('is_default', '1')

			$.post('/aj/doota/address_default', {'addr_id' : $this.attr('addr_id')}, function(res){
				if(res.code == '0'){
					if(history && history.length > 1){
						window.location.href = document.referrer;
					}else{
						window.location.href = '/welcome'	
					}

				}else{
					alert(res.msg)
				}
			}, 'json')
		})		

	}
});
