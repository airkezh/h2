fml.use('app/tracking' , function(){
	this.logClick('.pins' , 'twitter_id' , 'cr/pin')
	});
fml.use(['jquery' , 'app/paipaiWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word' : query.word || 0,
		'cata_id' : query.cata_id || 2000000000000,
		'section' : query.section || 'hot',
		'price' : query.price || 'all'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.paipaiWalls(opts , '/paipaiguang/getGoods/');
	//this.posterWall(opts , '/aj/getGoods/catalog' );
});

fml.use('app/userFollow' , function(){
	this('.addBrand' , '.removeBrand' , '.removeBrand', 'red_follow' , 'pink_follow');
});
fml.use('app/deletePoster' , function(del){
	    del.deleteTrigger();
}); 
fml.define('page/paipai/catalog' , [] , function(){});
