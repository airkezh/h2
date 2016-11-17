fml.use('app/focus_banner', function(){
    this.bind({
        'unit' : '.top_bnr .banner li'
        ,'btn': '.round .adType a'
        ,'transition' : 'fade'
    });
    document.execCommand("BackgroundImageCache",false,true);
});
fml.define('page/huodong/phonepriv' , ['jquery','app/checkLogin','app/tracking'] , function(require, exports){
	var	$ = require('jquery'),
		tracking = require('app/tracking'),
		check = require('app/checkLogin');

	$('.t_right a,.act5 a').click(function(){
		$('#popup').css({
			display:'block',
			top:$(document).scrollTop() + 80 + 'px',
			left:($(window).width() - 640)/2 + 'px'
		});
	});
	$('#popup .close').click(function(){
		$('#popup').hide();
	})
});	

