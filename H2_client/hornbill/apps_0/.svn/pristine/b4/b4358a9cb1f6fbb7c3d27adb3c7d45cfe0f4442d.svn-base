fml.use('component/waterfall' , function(){
	this.init({
		containerId : '.goods_wall',
		colNumMin : 3
	});
});
fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = {
	    'frame' : query.frame || 0,
		'page' : query.page || 0
    };          
    var opts = this.jquery.extend({}, urlData, query);
	if(Meilishuo.config.mini_group_id){
		this.posterWalls(opts , '/aj/minisite/' + Meilishuo.config.brand_name + '?group_id=' + Meilishuo.config.mini_group_id );
	}else{
		this.posterWalls(opts , '/aj/minisite/' + Meilishuo.config.brand_name);
	}
});   
fml.use('app/deletePoster_guang' , function(del){
    del.deleteTrigger();
});

