fml.define('page/campus_recruitment' , ['jquery', 'component/windowScroll'] , function(require,exports){
	var $ = require('jquery'),
		scroll = require('component/windowScroll');
	var y = $('div.head_info').offset().top;
	scroll.yIn(y,function (){
		$('.header').addClass('addShadow');
	},function (){
		$('.header').removeClass('addShadow');
	});
	$('.recruit_info .job_name').toggle(function show(){
		$(this).parent().siblings('div.details').show();
		$(this).parent().parent().css({'float':'none'});
		$(this).parent().parent().siblings('a').children('.apply_btn').addClass('btn_after');
	}, function hide(){
		$(this).parent().siblings('div.details').hide();
		$(this).parent().parent().css({'float':'left'});
		$(this).parent().parent().siblings('a').children('.apply_btn').removeClass('btn_after');
	});
});