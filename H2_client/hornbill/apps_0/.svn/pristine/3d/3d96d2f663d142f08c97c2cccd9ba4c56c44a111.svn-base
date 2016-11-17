/*common*/
var $ = require('jquery')
	,countdown = require('app/countdown')
require('app/welfare_apply')
countdown();

//fancy box
$('.my_fancy img').on('click', function(event) {
	event.preventDefault();
	$('.my_fancy').fadeOut(500);
});
$('a[rel^=dr]').on('click', function(event) {
	event.preventDefault();
	var img_url =$(this).attr('href')
	$('.my_fancy img').attr('src',img_url)
	$('.my_fancy').css({
		top : $(document).scrollTop() + ($(window).height() - 573)/2
	}).fadeIn(500);
});

//顶部视频切换
$('.top_video_b_w').on('click', 'a', function(event) {
	event.preventDefault();
	if($(this).hasClass('s')) return;
	var	index = $(this).index()
	$('.top_video_b_w a').removeClass('s').eq(index).addClass('s')
	$('.top_video_wrapper .video:visible').fadeOut(200,function(){
		$('.top_video_wrapper .video:eq('+index+')').fadeIn(200)
	})
});

//tab 1 2
bindTap('.l1_btn_wrapper','.l1_content');
bindTap('.l2_btn_wrapper','.l2_content');
bindTap3();
bindTap4()
function bindTap(tabParent,contentParent){
	$(tabParent).on('click', 'a', function(event) {
		event.preventDefault();
		if($(this).hasClass('s')) return;
		$(tabParent).find('.s').removeClass('s')
		var cla = $.trim($(this).attr('class'))
		$(this).addClass('s')
		$(contentParent+' div').fadeOut(200,function(){
			$(this).removeClass().addClass(cla).fadeIn(200);
		})
	});
}

function bindTap3(){
	$('.tab_wrapper').on('click', 'a', function(event) {
		event.preventDefault();
		if($(this).hasClass('s')) return;
		$('.tab_wrapper').find('.s').removeClass('s')
		var cla = $.trim($(this).attr('class'))
		$(this).addClass('s')
		$('.video_wrapper img').show()
		$('.video_wrapper .v_w').hide()
		$('.step_wrapper div,.video_wrapper p,.video_wrapper .video div:visible').fadeOut(200,function(){
			var objs = $(this)
			$('.step_wrapper div,.video_wrapper p').removeClass().addClass(cla)
			$('.step_wrapper div,.video_wrapper p,.video_wrapper .video div.'+cla).fadeIn(200);
		})
	});
}
function bindTap4(){
	$('.brand_tab_wrapper').on('click', 'div', function(event) {
		event.preventDefault();
		if($(this).hasClass('s')) return;
		$('.brand_tab_wrapper').find('.s').removeClass('s')
		var cla = $.trim($(this).attr('class'))
		$(this).addClass('s')
		var video = $('.brand_video .video')
			,p = $('.brand_video p')
		$('.brand_video .video img').show()
		$('.brand_video .video .v_w').hide()
		video.find('div:visible').add(p).fadeOut(200,function(){
			p.removeClass().addClass(cla)
			video.find('.'+cla).add(p).fadeIn(200);
		})
	});
}

$('.stay_img').on('click' , function(event) {
	$(this).next().show();
	$(this).hide();
});

//veet2 blood twitter
var blood = $('.blood_box').find('a');
blood.on('click' , function(){
	$.get('/aj/huodong/post_twitter' , { 'pid':' 1454126017' , 'actUrl':'/biz/huodong/veet2/' , 'actTitle':'薇婷量身打造女神范' , 'actContent':'的蜕变计划'} , function(){} , 'json');
})











