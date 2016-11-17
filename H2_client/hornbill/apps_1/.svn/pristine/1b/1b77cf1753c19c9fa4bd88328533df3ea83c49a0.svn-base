fml.define('wap/app/checkcode' , ['wap/zepto/touch'] , function(require , exports){
	var $input = $('#checkcode')
		, $code = $('.checkImage')
		, $link = $('.change_img')
		, is_store

	var initCode = function(opt){
		is_store = opt.is_store || false;
		var imageUrl = (Meilishuo.config.captcha_url|| 'http://captcha.meilishuo.com/') + 'Register/Captcha?token=asde39ad9' + '&session=' + Math.random();
		if (opt.is_store) {
			imageUrl = "https://e.meilishuo.com/home/Captcha?_r="+Math.random();
		};
		
		$code.find('img').attr('src', imageUrl);
		if($code.find('img').attr('isblank') === 'true'){
			$code.find('img').attr('isblank', 'false');
		}
		$code.bind('tap',changeCode);
		if(opt.link_change) 
			$link.bind('tap',changeCode);
	};

	var checkCode = function(opt){
		initCode(opt);

		if(opt.cbk)
			opt.cbk();
	};

	var changeCode = function(){
		showCode();
		$input.val('').focus();
	};
	var showCode = function(){
		checkCode({
			'is_store':is_store
		   ,'cbk':function(){
				$code.unbind('tap');
				var t = setTimeout(function(){
					$code.bind('tap',changeCode);
				}, 600);
			}
		});
	};

	exports.initCode = initCode;
	exports.changeCode = changeCode;
});