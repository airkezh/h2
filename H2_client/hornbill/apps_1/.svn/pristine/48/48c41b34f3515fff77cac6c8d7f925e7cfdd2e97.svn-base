fml.use('app/countdown' , function(){
	this();	
});
fml.use('app/userFollow' , function(){
	this('.addUserFollow' , '.removeUserFollow' , '.removeUserFollow', 'red_follow' , 'pink_follow');
});
fml.use('app/publishor', function(){});
fml.use('app/replyBox', function(){});
fml.define('page/huodong/beautyBox' , ['jquery' , 'app/shareTo'] , function(require , exports){
	$ = require('jquery');
	var share = require('app/shareTo');

	$('.share').on('click' , function(){
		var url = location.href;
		var desp = '#美丽说花样美盒#别说我没告诉你，美丽说APP上有超赞的限量秒杀礼盒，超美的阳伞，搭配超值美白护肤品，赶紧转走！';
		var img = Meilishuo.config.picture_url +'images/huodong/beauty/share1.jpg';
		share.shareToWeibo(url , desp , img);
	});	
});
