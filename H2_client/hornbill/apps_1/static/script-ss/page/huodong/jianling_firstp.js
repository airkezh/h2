fml.define('page/huodong/jianling_firstp',['jquery' , 'app/fancybox'],function(require , exports){
	$ = require('jquery');

	$('.person a').on('mouseover' , function(){
		var index = $('.person a').index($(this));
		$(this).addClass('act'+ (index+1));
		$('#text').attr('class' , 'txt' + index);
		if(index != 4) $('.per5').removeClass('act5');
	}).on('mouseout',function(){
		var index = $('.person a').index($(this));
		$(this).removeClass('act'+ (index+1));
	});

	$('.person').on('mouseout',function(){
		$('.per5').addClass('act5');
		$('#text').attr('class','txt4');
	});

	$("a[rel=group1] , a[rel=group2] , a[rel=group3] , a[rel=group4]").fancybox();

	$('.like_btn').on('click' , function(){
		$(this).siblings('.jl_num').html(parseInt($(this).siblings('.jl_num').html()) + 1);
		$(this).html('已喜欢').removeClass('like_btn cursor_f').off('click');
		$.post('/aw/twitter/like' , { 'stid': $(this).attr('stid')} , function(){} , 'json');
	});
});
