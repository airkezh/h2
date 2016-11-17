fml.use('app/countdown', function(){
	this();	
});
fml.use('app/userFollow' , function(){
	this('.addUserFollow' , '.removeUserFollow' , '.removeUserFollow', 'red_follow' , 'pink_follow');	
});
fml.use('app/letter' , function(){
	this('#sendPrivateLetter');	
});
fml.use('app/publishor', function(){});
fml.use('app/replyBox', function(){});
fml.use('component/lazyLoad', function(ll){
	setTimeout(function(){
		ll.load('a>span', 'asrc', null, '#subWindow');
	}, 1000);
});
fml.use('app/welfare_apply' , function(){});
fml.define('page/welfare_con' , ['jquery'] , function(require, exports){
	var $ = require('jquery');
	if (location.href.indexOf('fr=welfare') > -1 && Meilishuo.config.begin == 1) 
		$('.wf_apply').click();
	$('.wx_2code span').on('click' , function(){
		$('.wx_2code').hide();	
	});
});
