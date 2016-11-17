fml.use('app/scrollPhotos',function(){
	this('photoPlay',{speed:50,direction:'horizontal'});
});
fml.use('app/publishor' , function(){});
fml.use('app/replyBox' , function(){});
fml.define('page/huodong/aupres_424' , ['jquery' , 'app/checkLogin' , 'app/fancybox'] , function(require , exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	$("a[rel=group]").fancybox({ 'overlayShow' : false });
	$('.pf span').on('click' , function(){
		$('.pf').hide();
	});
	$('.sign').click(function(){
		if(!check()) return;
		var data = {};
		var url = '/aj/huodong/oubolai_signin';
		$.post(url, data, function(r){
			if(r.data == 1){
				$('.sign').removeClass('sign').addClass('signed').remove('click');
			}
		}, 'json');
	});

});
