fml.define('app/checkcode' , [] , function(require , exports){
	return function(callback,is_store,host){
		var imageUrl = (Meilishuo.config.captcha_url|| 'http://captcha.meilishuo.com/') + 'Register/Captcha?token=asde39ad9' + '&session=' + Math.random();
		if (is_store) {
			var host = host || 'e.meilishuo.com';
			imageUrl = "https://"+host+"/home/Captcha?_r="+Math.random();
		};
		$('.checkImage').find('img').attr('src', imageUrl);
		callback && callback();
	}
});
