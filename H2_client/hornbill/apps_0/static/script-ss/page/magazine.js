fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('component/lazyLoad' , function(){
	this.load('.imgBox>span' ,'asrc');
});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'magazine');
});
fml.use(['app/tracking', 'component/windowScroll'], function(){
	var log = this.tracking;
	var scroll = this.windowScroll;
	var num = Math.floor(($('body').height()-150)/700);
	var logs = [];
	var $win = $(window);
	for (var i=0;i<num;i++) logs[i] = 0;
	scroll.bind(function(pos){
		var p = Math.floor(($(window).scrollTop()-150)/700)
		p = p < 0 ? 0 : p;
		if(!logs[p]) {
			log.cr('magScroll', {p:p*700+150});
			logs[p] = 1;
		}
	});
});
fml.define('page/magazine' , [] , function(){});
