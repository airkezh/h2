fml.use('app/publishor',function(){});
fml.use('app/magaCommon', function(){});
fml.use('app/replyBox', function(){});
fml.define('page/magazine_topic',['jquery'],function(require, exports){
	var $ = require('jquery');
	$('.editor').html('#' + Meilishuo.config.topic_title + '#')
});
