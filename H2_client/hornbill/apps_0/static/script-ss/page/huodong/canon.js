fml.use('app/follow' , function(){
    this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/countdown', function(){
    this();
});
fml.use('app/scrollPhotos',function(){
	this('darenPhoto',{speed:50,direction:'horizontal'});
	this('photoPlay',{speed:50,direction:'horizontal'});
});
fml.define('page/huodong/canon' , ['jquery' , 'app/fancybox' , 'app/tracking'] , function(require , exports){
	var $ = require('jquery');
	var logTrack = require('app/tracking');
	$("a[rel=group1] , a[rel=group2] , a[rel=group3] , a[rel=group4] , a[rel=group5] , a[rel=group6]").fancybox({ 'overlayShow' : false });
	//监控track
	$('.weibo').on('click' , function(){
		logTrack.cr('canon' , {'frm':'weibo'});
	});
	$('.pro').on('click' , function(){
		logTrack.cr('canon' , {'frm':'pro'});
	});
	$('.miao').on('click' , function(){
		logTrack.cr('canon' , {'frm':'miao'});
	});
	$('.ca_center8').on('click' , function(){
		logTrack.cr('canon' , {'frm':'introduction'});
	});
});
