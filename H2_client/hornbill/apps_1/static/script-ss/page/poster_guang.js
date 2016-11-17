fml.use('component/menu' , function(){
	    this('.show_price' , 'poster_price');   
});
//左侧侧边栏功能
fml.use(['jquery'],function(){
	var $ = this.jquery;
	$('.sidebar_rec .list').hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass('active');
	});
});
fml.use('app/userInfoTips' , function(){
	    this('.goods_wall' , '.userInfoTips');
});
fml.use('app/shopInfoTips' , function(){
		this('.goods_wall' , '.shopTips');
});
fml.use('app/like' , function(){
	    this.posterLike('.goods_wall' , '.poster_likes');
});
fml.use('app/comment_guang' , function(){
	this('.goods_wall' , '.poster_comment , .comment_reply');
});
fml.use('app/eventHover' , function(){
	    this.hoverShow('.hover_pic' , '.like_merge');  
});
fml.use('component/autoTextarea_guang' , function(){
	    this('.goods_wall' , '.poster_textarea' , 22 , function(){});   
});
fml.use('app/forward' , function(){
	    this.posterForward('.goods_wall' , '.poster_forward');
});
fml.define('page/poster_guang' , [] , function(){});
