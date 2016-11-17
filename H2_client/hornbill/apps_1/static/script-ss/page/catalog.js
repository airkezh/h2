fml.use('app/tracking' , function(){
	this.logClick('.pins' , 'twitter_id' , 'cr/pin')
});
fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word' : query.word || 0,
		'cata_id' : fml.vars.cata_id || query.cata_id || 2000000000000,
		'section' : query.section || 'hot',
		'price' : query.price || 'all'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/catalog');
	//this.posterWall(opts , '/aj/getGoods/catalog' );
});

fml.use('app/userFollow' , function(){
	this('.addBrand' , '.removeBrand' , '.removeBrand', 'red_follow' , 'pink_follow');
	this('.addAds' , '.removeAds' , '.removeAds', 'red_sbtn' , 'pink_sbtn');
});
fml.use('app/admClick', function(){
    this.monitor();
})

fml.use('app/deletePoster_guang' , function(del){
	    del.deleteTrigger();
}); 
fml.use('component/focus' , function(){
	this.inputFocus('.searchKeyCatalog');	
});
fml.use('component/lazyLoad' , function(){
    this.load('.ad_pic span.h270' ,'asrc');
});
fml.use('app/sharePortal');
fml.use('app/attention');

fml.define('page/catalog' , [] , function(){});
