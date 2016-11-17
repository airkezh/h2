fml.use('component/menu' , function(){
	    this('.show_price' , 'poster_price');   
});
fml.use('app/userInfoTips' , function(){
	    this('.goods_wall' , '.userInfoTips');
});
fml.use('app/like' , function(){
	    this.posterLike('.goods_wall' , '.poster_likes');
});
fml.use('app/comment' , function(){
	this('.goods_wall' , '.poster_comment , .comment_reply');
});
fml.use('app/eventHover' , function(){
	    this.hoverShow('.hover_pic' , '.like_merge');  
});
fml.use('component/autoTextarea' , function(){
	    this('.goods_wall' , '.poster_textarea' , 22 , function(){});   
});
fml.use('app/forward' , function(){
	    this.posterForward('.goods_wall' , '.poster_forward');
});
fml.define('page/poster' , [] , function(){});
