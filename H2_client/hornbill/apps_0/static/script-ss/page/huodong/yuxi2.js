fml.use('app/countdown', function(){
    this();
});
fml.use('app/welfare_apply' , function(){});
fml.use('app/replyBox', function(){});
fml.use('component/lazyLoad', function(ll){
	setTimeout(function(){
		ll.load('a>span', 'asrc', null, '#subWindow');
	}, 1000);
});
fml.define('page/huodong/yuxi2' , ['jquery'] , function(require, exports){
	var $ = require('jquery');
	$('.btn_apply .wf_apply').click(function(){
		_gaq.push(['_trackPageview', 'apply']);
	});
});
