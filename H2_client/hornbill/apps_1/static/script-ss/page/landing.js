fml.use(['jquery' , 'app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word' : query.word || fml.vars.word_id,
		'word_name' : query.word_name || fml.vars._guang_word_name,
		'section' : query.section || 'hot',
		'price' : query.price || 'all'
	};
	var options = {
		'frame_size' : 7
	};
	if (query.nocheck) options.noCheck = true;
	var url = '/aj/getGoods/attr_landing'; 
	// hack for 衣服
	if (fml.vars._guang_word_name == '衣服') {
		urlData['word'] = 0;
		urlData['cata_id'] = 2000000000000;
		urlData['bob'] = 'landing';
		delete urlData['word_name'];
		url = '/aj/getGoods/catalog';
		function onData(response){
			return response.catalog
		}
		options['onData'] = onData;
	}
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , url, options);
});
fml.use('component/poster' , function(){
	this.posterWall({cornerStampId : '.corner_stamp' , cornerNoticId : '.corner_notic'});	
});
fml.use('app/deletePoster' , function(del){
	    del.deleteTrigger();
}); 
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/tracking' , function(){
	this.logPoster()	
});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'attr');
});
fml.use('component/lazyLoad' , function(){
    this.load('.imgBox>span' ,'asrc');
});
fml.define('page/landing' , ['jquery'] , function(require, exports){
	//nav add _blank
	$ = require('jquery');
	$('.nav_new').find('a').attr('target','_blank');
});

