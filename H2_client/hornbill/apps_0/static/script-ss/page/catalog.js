fml.use('app/tracking' , function(){
	this.logClick('.pins' , 'twitter_id' , 'cr/pin')
});
fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	if(fml.vars.search_totalNum == 0){
		$('.goods_wall').height(300).html('<div class="filter_empty">筛选条件加的太多啦，未找到相关结果</div>');
		return;
	}
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word' : query.word || 0,
		'cata_id' : fml.vars.cata_id || query.cata_id || 2000000000000,
		'section' : query.section || 'hot'
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
fml.use('app/sizer');

fml.define('page/catalog' , [] , function(){});
