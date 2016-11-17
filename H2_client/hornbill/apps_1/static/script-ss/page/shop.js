fml.use('app/adPoster', function(){
	this.carousel('.ad_bnr',{'width':220,'height':380,'gap':3500,'type':2});
});
fml.use('app/like' , function(){
	this.posterLike('.all_goods' , '.poster_likes');
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.hover_pic' , '.like_merge'); 
	this.hoverShow('.hoverpic' , '.onpic');
});
fml.use('app/forward' , function(){
	this.posterForward('.all_goods' , '.poster_forward');
});

fml.define('page/shop' , [] , function(){ });
