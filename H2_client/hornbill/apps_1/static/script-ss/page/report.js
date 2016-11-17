fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/report');
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'report');
});
fml.define('page/report' , [] , function(){});
