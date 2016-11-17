fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var vid = parseInt(window.location.pathname.split('/')[2],10)
	var urlData = { 
		'vid' : vid || query.vid,
		'frame' : query.frame || 0,
		'page' : query.page || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/volume_poster');
});
fml.use('app/secondNav' , function(){
	this({'nav' : '.ptyNav'});
});


fml.use(['app/adPoster', 'component/urlHandle'], function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	this.adPoster.carousel('.ads_top');
	this.adPoster.adBanner('bottom', 'catalog?cata_id=' + query.cata_id);
});
fml.use('app/deletePoster_guang' , function(del){
	    del.deleteTrigger();
}); 
fml.use('component/focus' , function(){
	this.inputFocus('.searchKeyCatalog');	
});
fml.define('page/pretty' , [] , function(){});
