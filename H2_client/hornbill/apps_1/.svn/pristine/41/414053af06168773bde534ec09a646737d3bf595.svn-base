fml.define('wap/app/showPerson' , ['wap/jquery.mobile'] , function(require , exports){
	return function(){
		var personArea = $('#personArea')
		$('#personBtn').on('tap', function(){
			if(Meilishuo.config.user_id == '0')
				window.location = '/user/login'

			if(personArea.attr('isShow') == "0")
				personArea.attr('isShow', "1")
			else
				personArea.attr('isShow', "0")
		})	
	};
});
