fml.use('m/app/goBack' , function(){
	this();
});

fml.define('m/page/doota/address_default' , ['m/zepto','m/zepto/touch','m/component/callApi','m/component/shareTmp'] , function(require , exports){
	
	var callApi = require('m/component/callApi');
	var shareTmp = require('m/component/shareTmp');

	callApi.read({'url':'/address/addr_list'},function(data){
		if(data && data.addrInfo){
			var html = shareTmp('addr_list',data);
			$('.addrShow').html(html);
			addtInit();
		}
	});

	function addtInit(){
		$('.addrShow .adrl_list').on('tap', function(){
			var $this = $(this);
			$this.attr('is_default', '1');

			callApi.write({'url':'/address/addr_default'}, {'addr_id' : $this.attr('addr_id')}, function(res){
				if(res.code == '0'){
					window.location.href = document.referrer || '/welcome'	
				}else{
					alert(res.msg)
				}
			}, 'json')
		});
	}

});



	
