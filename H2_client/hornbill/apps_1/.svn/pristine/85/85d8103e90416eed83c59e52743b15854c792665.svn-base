fml.use('page/poster_guang');
fml.use(['jquery' , 'app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
        'page' : query.page || 0,
		'section' : query.section || 'hot',
		'price' : query.price || 'all',
		'view' : '1',
		'word' : query.word || 0,
		'nid' : query.nid || 11,
		'donotworry' : 1
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/catalog');
});
fml.use('app/deletePoster_guang' , function(del){
    del.deleteTrigger();
}); 
fml.define('page/huodong/togobuy' , [] , function(){});
