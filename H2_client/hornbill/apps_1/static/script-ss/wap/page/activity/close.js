fml.use(['wap/app/activity/close'] , function(){
	this.close();
});
fml.define('wap/page/activity/close' , ['wap/zepto'] , function(){
	$('#winner_list') && $('#winner_list').on('click', function (){
		$('.banner').hide();
		$('.winner_list').show();
		$('#winner_list').hide();
	});
});
