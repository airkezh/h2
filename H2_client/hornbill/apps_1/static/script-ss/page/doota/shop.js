fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	//var vid = parseInt(window.location.pathname.split('/')[2],10)
	var urlData = { 
		//'vid' : vid || query.vid,
		'frame' : query.frame || 0,
		'page' : query.page || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/doota/shop_info');
});
fml.use('app/adPoster', function(){
		this.carousel('.shop_bnr',{'width':946,'height':340,'gap':4000,'type':2});
});

fml.define('page/doota/shop' , [] , function(){ });
