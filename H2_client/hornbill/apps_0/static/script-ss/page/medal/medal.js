/*common*/
require('jquery');

$(".xz-tab li a").click(function(){

	$(".xz-tab li a").removeClass('active');
	$(this).addClass('active');

	$("#xz ul").eq($(this).parent().index()).addClass('on').siblings().removeClass('on');
	return false;
	
});

