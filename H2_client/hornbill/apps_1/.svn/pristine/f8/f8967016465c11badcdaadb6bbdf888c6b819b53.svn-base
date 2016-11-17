fml.use('app/deletePoster_guang' , function(del){
	    del.deleteTrigger();
		del.deleteTwitter();
		del.deleteComment();
});
fml.use('app/userInfoTips' , function(){
	this('.comments' , '.userInfoTips');
});
fml.use('jquery' , function(){
	var $ = this;
	var img = $('.twitter_pic');
	img.bind('load' , function(){
		if(img.width() > 450){
			img.width(fml.vars.isTaobaoPic ? 310 : 450);	
		}
		$('.content .code_pic').width(img.width());
	});
	img[0].src = img[0].src;
});
fml.use('app/twitterReport' , function(){
	this('#twitter_report');	
});
fml.use('app/page' , function(){
	this({
		'totalNum' : fml.vars.count_discuss
	});	
});
fml.use('app/twitter_comment' , function(){
	this();	
});
fml.use('app/like' , function(){
	this.twitterLike('.twitter' , '.twitter_like');
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.code_pic' , '.view_pic')	
});
fml.use('app/forward' , function(){
	this.twitterForward('.twitter' , '.twitter_forward');
});
fml.use('app/follow' , function(){
    this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.define('page/paipai/twitter' , [] , function(){});
