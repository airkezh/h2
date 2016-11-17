/*common*/	
var checkcode = function(callback,is_store,host){
	var imageUrl = (Meilishuo.config.captcha_url|| 'http://captcha.meilishuo.com/') + 'Register/Captcha?token=asde39ad9' + '&session=' + Math.random();
	if (is_store) {
		var host = host || 'e.meilishuo.com';
		imageUrl = "https://"+host+"/home/Captcha?_r="+Math.random();
	};
	$('.checkImage').find('img').attr('src', imageUrl);
	callback();
}

var showCode = function(){
	checkcode(function(){
		$('.checkImage').unbind('click');
		var t = setTimeout(function(){
			$('.checkImage').bind('click',changeCode);
		}, 600);
	});
};
var initCode = function(){
	if($('.checkImage').find('img').attr('isblank') === 'true'){
		$('.checkImage').find('img').attr('isblank', 'false');
	}
	$('.checkImage').bind('click',changeCode);
	showCode();
};
var changeCode = function(){
	showCode();
	$('#checkcode').val('').focus();
};

exports.checkcode = checkcode
exports.initCode = initCode
exports.changeCode = changeCode

