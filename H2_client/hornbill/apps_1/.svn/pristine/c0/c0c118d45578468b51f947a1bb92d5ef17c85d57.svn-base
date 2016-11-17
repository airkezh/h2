fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/eshop/poster', {'subScroll': '.len_fixheight'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});

fml.define('page/eshop', [], function(require , exports){});