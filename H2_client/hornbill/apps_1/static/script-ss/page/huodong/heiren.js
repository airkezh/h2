fml.use('app/countdown', function(){
    this();
});
fml.use('app/welfare_apply' , function(){});
fml.use('app/adPoster', function(){
		this.carousel('.darenshow_wrap',{'width':145,'height':179,'gap':2500,'type':1});
});
fml.define('page/huodong/heiren' , ['jquery' , 'app/checkLogin' ,'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	var logTrack = require('app/tracking');

	//tab切换
	$('.hr_nav a').click(function() {
		var clickedLink = $(this);
		var nextActConClass = clickedLink.attr('data');
		$('.hr_active').removeClass('hr_active');
		clickedLink.parent('li').addClass('hr_active');
		$('.hr_con_active').hide().removeClass('hr_con_active');
		$('.'+nextActConClass).show().addClass('hr_con_active');
	});

	$('.apply_test').click(function() {
		$('.hr_active').removeClass('hr_active');
		$('.nav_free').parent('li').addClass('hr_active');
		$('.hr_con_active').hide().removeClass('hr_con_active');
		$('.free').show().addClass('hr_con_active');

		logTrack.cr('heiren', {'frm': 'free_index'});
	});
	
	//监控 KPI
	$('.experience a').click(function(){
		logTrack.cr('heiren', {'frm': 'daren'});
	});

	$('.heirenweibo').click(function(){
		logTrack.cr('heiren', {'frm': 'heiren_weibo'});
	});

	$('.close_z').click(function(){
		if($('.apply_success_ok').length === 1){
			logTrack.cr('heiren', {'frm': 'apply_success_273'});
		}
	});

	$('.apply_success_ok').click(function(){
		logTrack.cr('heiren', {'frm': 'apply_success_273'});
	});

	//轮播图处理，在计算完图片数量之后加入第一张，解决显示两张图片的情况
	setTimeout(function(){
		$('._img').append('<li class="left_f"><a><img src="'+ Meilishuo.config.picture_url +'images/huodong/heiren/hr_1.jpg"></a></li>');
	}, 8000);
	$('.hr_nav a').click(function(){
		var linkdata = $(this).attr('data');
		logTrack.cr('heiren', {'frm': linkdata});
	});
	$('.experience a').click(function(){
		var darenname = $(this).html();
		logTrack.cr('heiren', {'frm': darenname});
	});
});
