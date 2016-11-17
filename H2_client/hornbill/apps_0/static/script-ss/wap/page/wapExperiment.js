fml.define('wap/page/wapExperiment' , ['jquery'] , function(){
	$('.wrap-1 p span').click(function(event) {
		$('.wrap-1').hide();
		$('.wrap-2').show();
	});
	$('.wrap-2 p span').click(function(event) {
		$('.wrap-2').hide();
		$('.wrap-3').show();
	});
	$('.wrap-3 p span').click(function(event) {
		$('.wrap-3').hide();
		$('.wrap-4').show();
	});
	$('.wrap-4 p span').click(function(event) {
		$('.wrap-4').hide();
		$('.wrap-5').show().find('img').attr('src','http://i.meilishuo.net/css/images/wap/weixin_experiment/result/g_' + ran() + '.jpg');
	});
	var ran = function(){
		return Math.round((Math.random())*24) + 1;
	}
});
